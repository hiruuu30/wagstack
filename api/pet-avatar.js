const sharp=require('sharp');
const MODEL='@cf/black-forest-labs/flux-2-klein-4b';

module.exports = async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){
    res.status(405).json({error:'Method not allowed'});
    return;
  }

  const body=req.body||{};
  const image_b64=String(body.image_b64||'').replace(/^data:image\/[^;]+;base64,/,'');
  const petName=String(body.petName||'pet').slice(0,80);
  const breed=String(body.breed||'').slice(0,120);

  if(!image_b64){
    res.status(400).json({error:'No pet photo was received.'});
    return;
  }

  const fallback=()=>res.status(200).json({
    image:image_b64,
    mime:'image/jpeg',
    fallback:true
  });

  let input;
  try{
    const raw=Buffer.from(image_b64,'base64');
    if(!raw.length)throw new Error('empty image');
    input=await sharp(raw)
      .rotate()
      .resize(480,480,{fit:'cover',position:'attention'})
      .jpeg({quality:90,mozjpeg:true})
      .toBuffer();
  }catch{
    fallback();
    return;
  }

  const accountId=process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken=process.env.CLOUDFLARE_API_TOKEN;
  if(!accountId||!apiToken){
    fallback();
    return;
  }

  const prompt=[
    `Use input image 0 as the strict identity and COLOR reference for ${petName}${breed?`, a ${breed}`:''}.`,
    'Create a cute retro pixel-art cartoon avatar of this exact same pet. Identity fidelity is more important than stylization.',
    'CRITICAL COLOR RULE: preserve the source coat colors exactly. Do not recolor, warm-shift, saturate, tint, or invent patches. White fur must remain white, cream must remain cream, black must remain black, brown must remain the same brown, and every marking must stay in the same location and proportion as the reference photo.',
    'Derive the entire pet color palette from the source image itself. Do not use a generic orange, tan, golden, warm, or brand palette on the pet unless those colors are actually present in the uploaded photo.',
    'Preserve species, breed traits, unique markings, ear shape, muzzle, eye color, nose color, face proportions, and overall expression.',
    'Style only the rendering: crisp low-resolution pixel art with visible chunky square pixels, 16-bit / 32-bit game-sprite feel, simplified geometric shading, dark navy pixel outlines, expressive friendly face, clean handcrafted sprite look.',
    'Composition: centered head-and-shoulders pet portrait, square avatar, plain light cream background, no scenery.',
    'Translate fur texture into clustered pixel shapes. Avoid anti-aliased edges, gradients, smooth painterly rendering, photorealism, vector-smooth shapes, 3D rendering, glossy effects, or any color grading that changes the pet.',
    'Do not invent a different animal. No text, logos, frame, extra animals, clothing or accessories unless clearly visible in the source image.'
  ].join(' ');

  try{
    const form=new FormData();
    form.append('prompt',prompt);
    form.append('width','512');
    form.append('height','512');
    form.append('guidance','3');
    form.append('input_image_0',new Blob([input],{type:'image/jpeg'}),'pet.jpg');

    const upstream=await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${MODEL}`,{
      method:'POST',
      headers:{Authorization:`Bearer ${apiToken}`},
      body:form
    });

    const type=upstream.headers.get('content-type')||'';
    const buf=Buffer.from(await upstream.arrayBuffer());

    if(!upstream.ok){
      fallback();
      return;
    }

    if(type.includes('application/json')){
      try{
        const parsed=JSON.parse(buf.toString('utf8'));
        const result=parsed?.result;
        const image=typeof result==='string'?result:(result?.image||result?.image_b64||result?.data);
        if(image){
          res.status(200).json({image:String(image).replace(/^data:image\/[^;]+;base64,/,''),mime:result?.mime_type||'image/png',fallback:false});
          return;
        }
      }catch{}
      fallback();
      return;
    }

    if(type.startsWith('image/')&&buf.length){
      res.status(200).json({
        image:buf.toString('base64'),
        mime:type.split(';')[0],
        fallback:false
      });
      return;
    }

    fallback();
  }catch{
    fallback();
  }
};