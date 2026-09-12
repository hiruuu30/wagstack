const MODEL='@cf/stabilityai/stable-diffusion-xl-base-1.0';

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

  let imageBytes;
  try{ imageBytes=Buffer.from(image_b64,'base64'); }
  catch{ imageBytes=null; }
  if(!imageBytes?.length){
    res.status(400).json({error:'The uploaded pet photo could not be decoded.'});
    return;
  }
  if(imageBytes.length>1_800_000){
    res.status(413).json({error:'Pet photo is too large for AI processing. Please use a smaller photo.'});
    return;
  }

  const prompt=[
    `Create a polished friendly cartoon portrait of ${petName}${breed?`, a ${breed}`:''}.`,
    'Preserve the pet’s recognizable identity: species, coat colors, markings, ear shape, muzzle, eye color and face proportions.',
    'Match a premium modern pet-club app aesthetic: softly rounded illustrated forms, subtle texture, warm natural color, centered head-and-shoulders crop, clean light neutral background.',
    'No text, no logos, no frame, no extra animals, no invented clothing or accessories unless visible in the source photo.'
  ].join(' ');

  try{
    const upstream=await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${MODEL}`,{
      method:'POST',
      headers:{
        'Authorization':`Bearer ${apiToken}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        prompt,
        negative_prompt:'photorealistic, blurry, distorted face, duplicate animal, extra limbs, text, watermark, logo, frame, human, low detail',
        image:Array.from(imageBytes),
        width:512,
        height:512,
        num_steps:20,
        strength:0.52,
        guidance:7.5
      })
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