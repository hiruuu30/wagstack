const sharp=require('sharp');
const IMAGE_MODEL='@cf/black-forest-labs/flux-2-klein-4b';
const DETECTION_MODEL='@cf/facebook/detr-resnet-50';

const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const mimeFor=format=>({jpeg:'image/jpeg',jpg:'image/jpeg',png:'image/png',webp:'image/webp',gif:'image/gif',avif:'image/avif'}[format]||'image/jpeg');

module.exports=async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){
    res.status(405).json({error:'Method not allowed'});
    return;
  }

  const body=req.body||{};
  const image_b64=String(body.image_b64||'').replace(/^data:image\/[^;]+;base64,/,'');
  const petName=String(body.petName||'pet').slice(0,80);
  const breed=String(body.breed||'').slice(0,120);
  const sourceMime=String(body.mime||'').startsWith('image/')?String(body.mime):null;

  if(!image_b64){
    res.status(400).json({error:'No pet photo was received.'});
    return;
  }

  let raw;
  let detectedMime=sourceMime||'image/jpeg';
  try{
    raw=Buffer.from(image_b64,'base64');
    if(!raw.length)throw new Error('empty image');
    const md=await sharp(raw).metadata();
    detectedMime=sourceMime||mimeFor(md.format);
  }catch{
    res.status(400).json({error:'The uploaded pet photo could not be read.'});
    return;
  }

  const fallback=(reason='fallback')=>res.status(200).json({
    image:image_b64,
    mime:detectedMime,
    fallback:true,
    faceDetected:false,
    reason
  });

  const accountId=process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken=process.env.CLOUDFLARE_API_TOKEN;
  if(!accountId||!apiToken){
    fallback('ai_not_configured');
    return;
  }

  let normalized;
  let width;
  let height;
  try{
    normalized=await sharp(raw)
      .rotate()
      .resize({width:1024,height:1024,fit:'inside',withoutEnlargement:true})
      .jpeg({quality:91,mozjpeg:true})
      .toBuffer();
    const md=await sharp(normalized).metadata();
    width=md.width;
    height=md.height;
    if(!width||!height)throw new Error('missing dimensions');
  }catch{
    fallback('image_preparation_failed');
    return;
  }

  let petDetection=null;
  try{
    const detector=await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${DETECTION_MODEL}`,{
      method:'POST',
      headers:{Authorization:`Bearer ${apiToken}`,'Content-Type':'image/jpeg'},
      body:normalized
    });
    if(!detector.ok){
      fallback('face_detection_failed');
      return;
    }
    const parsed=await detector.json();
    const detections=Array.isArray(parsed?.result)?parsed.result:(Array.isArray(parsed)?parsed:[]);
    const candidates=detections
      .filter(x=>['dog','cat'].includes(String(x?.label||'').toLowerCase()))
      .filter(x=>Number(x?.score||0)>=0.55&&x?.box)
      .sort((a,b)=>Number(b.score||0)-Number(a.score||0));
    petDetection=candidates[0]||null;
  }catch{
    fallback('face_detection_failed');
    return;
  }

  if(!petDetection){
    fallback('no_pet_face_detected');
    return;
  }

  let faceInput;
  try{
    const box=petDetection.box||{};
    const x1=clamp(Math.floor(Number(box.xmin)||0),0,width-1);
    const y1=clamp(Math.floor(Number(box.ymin)||0),0,height-1);
    const x2=clamp(Math.ceil(Number(box.xmax)||width),x1+1,width);
    const y2=clamp(Math.ceil(Number(box.ymax)||height),y1+1,height);
    const petW=x2-x1;
    const petH=y2-y1;

    // DETR finds the full cat/dog. The face is normally in the upper portion of that box.
    // Crop that region first, then use Sharp attention inside it for consistent eye/muzzle framing.
    const padX=Math.round(petW*0.12);
    const padTop=Math.round(petH*0.08);
    const headHeight=Math.min(petH,Math.max(petW*1.05,petH*0.62));
    const left=clamp(x1-padX,0,width-1);
    const top=clamp(y1-padTop,0,height-1);
    const right=clamp(x2+padX,left+1,width);
    const bottom=clamp(Math.round(y1+headHeight),top+1,height);

    faceInput=await sharp(normalized)
      .extract({left,top,width:right-left,height:bottom-top})
      .resize(384,384,{fit:'cover',position:'attention'})
      .jpeg({quality:94,mozjpeg:true})
      .toBuffer();
  }catch{
    fallback('face_crop_failed');
    return;
  }

  const prompt=[
    `Use input image 0 as the strict identity and color reference for ${petName}${breed?`, a ${breed}`:''}.`,
    'Create a 64x64 retro pixel-art profile avatar of this exact same pet.',
    'FACE ONLY: make the face fill roughly 80 to 90 percent of the square. Keep both eyes, nose, muzzle and both ears visible when they are visible in the reference. Do not show the body, legs, chest or a distant head-and-shoulders composition.',
    'Keep the head centered and straight-looking whenever the reference permits. Use the same framing across pets so the avatar collection looks uniform and neat.',
    'Identity fidelity is more important than stylization. Preserve species, breed traits, exact facial markings, ear shape, muzzle shape, eye color, nose color, face proportions and expression.',
    'Preserve coat colors exactly. Do not warm-shift, recolor, saturate, tint or invent patches. Derive the palette from the source pet.',
    'Render as deliberate chunky pixel art made for a true 64x64 game avatar: hard square pixels, clustered shading, limited palette, crisp silhouette, no antialiasing, no gradients, no painterly texture, no photorealism, no 3D.',
    'Use a simple pale neutral background with strong separation from the pet. No scenery, text, logo, frame, extra animals, clothing or invented accessories.'
  ].join(' ');

  const finish=async(buf)=>sharp(buf)
    .resize(64,64,{fit:'cover',position:'centre',kernel:sharp.kernel.nearest})
    .png({palette:true,colors:64,compressionLevel:9})
    .toBuffer();

  try{
    const form=new FormData();
    form.append('prompt',prompt);
    form.append('width','512');
    form.append('height','512');
    form.append('guidance','3.5');
    form.append('input_image_0',new Blob([faceInput],{type:'image/jpeg'}),'pet-face.jpg');

    const upstream=await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${IMAGE_MODEL}`,{
      method:'POST',
      headers:{Authorization:`Bearer ${apiToken}`},
      body:form
    });

    const type=upstream.headers.get('content-type')||'';
    const buf=Buffer.from(await upstream.arrayBuffer());
    if(!upstream.ok){
      fallback('avatar_generation_failed');
      return;
    }

    let generated=null;
    if(type.includes('application/json')){
      try{
        const parsed=JSON.parse(buf.toString('utf8'));
        const result=parsed?.result;
        const image=typeof result==='string'?result:(result?.image||result?.image_b64||result?.data);
        if(image)generated=Buffer.from(String(image).replace(/^data:image\/[^;]+;base64,/,''),'base64');
      }catch{}
    }else if(type.startsWith('image/')&&buf.length){
      generated=buf;
    }

    if(!generated?.length){
      fallback('avatar_generation_failed');
      return;
    }

    const pixel=await finish(generated);
    res.status(200).json({
      image:pixel.toString('base64'),
      mime:'image/png',
      fallback:false,
      faceDetected:true,
      pixelSize:64,
      detection:{label:petDetection.label,score:Number(petDetection.score||0)}
    });
  }catch{
    fallback('avatar_generation_failed');
  }
};