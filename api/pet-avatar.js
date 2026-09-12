const sharp=require('sharp');
const MODEL='@cf/black-forest-labs/flux-2-klein-4b';

module.exports = async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){
    res.status(405).json({error:'Method not allowed'});
    return;
  }

  const accountId=process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken=process.env.CLOUDFLARE_API_TOKEN;
  if(!accountId||!apiToken){
    res.status(503).json({error:'Cloudflare Workers AI is not configured yet. Add CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in Vercel.'});
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

  let input;
  try{
    const raw=Buffer.from(image_b64,'base64');
    if(!raw.length)throw new Error('empty image');
    input=await sharp(raw)
      .rotate()
      .resize(480,480,{fit:'cover',position:'attention'})
      .jpeg({quality:88,mozjpeg:true})
      .toBuffer();
  }catch{
    res.status(400).json({error:'The uploaded pet photo could not be prepared for AI processing.'});
    return;
  }

  const prompt=[
    `Use input image 0 as the identity reference for ${petName}${breed?`, a ${breed}`:''}.`,
    'Transform the same pet into a cute retro pixel-art cartoon avatar while preserving its recognizable identity: species, breed traits, coat colors, unique markings, ear shape, muzzle, eye color and face proportions.',
    'Style: crisp low-resolution pixel art, visible chunky square pixels, 16-bit / 32-bit game sprite aesthetic, simplified geometric shading, limited warm color palette, dark navy pixel outlines, expressive friendly face, clean handcrafted sprite look.',
    'Composition: centered front-facing or slight three-quarter head-and-shoulders pet portrait, symmetrical readable silhouette, square avatar composition, plain light cream background, no scenery.',
    'Keep fur texture translated into clustered pixel shapes rather than smooth brush strokes. Avoid anti-aliased edges, gradients, soft painterly rendering, photorealism, vector-smooth shapes, 3D rendering or glossy effects.',
    'Do not invent a different animal. No text, logos, frame, extra animals, clothing or accessories unless clearly visible in the source image.'
  ].join(' ');

  try{
    const form=new FormData();
    form.append('prompt',prompt);
    form.append('width','512');
    form.append('height','512');
    form.append('guidance','4');
    form.append('input_image_0',new Blob([input],{type:'image/jpeg'}),'pet.jpg');

    const upstream=await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${MODEL}`,{
      method:'POST',
      headers:{Authorization:`Bearer ${apiToken}`},
      body:form
    });

    const type=upstream.headers.get('content-type')||'';
    const buf=Buffer.from(await upstream.arrayBuffer());

    if(!upstream.ok){
      let detail=`Cloudflare Workers AI returned ${upstream.status}.`;
      try{
        const parsed=JSON.parse(buf.toString('utf8'));
        detail=parsed?.errors?.[0]?.message||parsed?.error||detail;
      }catch{}
      res.status(502).json({error:detail});
      return;
    }

    if(type.includes('application/json')){
      try{
        const parsed=JSON.parse(buf.toString('utf8'));
        const result=parsed?.result;
        const image=typeof result==='string'?result:(result?.image||result?.image_b64||result?.data);
        if(image){
          res.status(200).json({image:String(image).replace(/^data:image\/[^;]+;base64,/,''),mime:result?.mime_type||'image/png'});
          return;
        }
      }catch{}
      res.status(502).json({error:'Cloudflare returned an unexpected image response.'});
      return;
    }

    res.status(200).json({
      image:buf.toString('base64'),
      mime:type.startsWith('image/')?type.split(';')[0]:'image/png'
    });
  }catch(err){
    res.status(500).json({error:'AI avatar generation failed.'});
  }
};