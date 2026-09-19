const {put,list,get}=require('@vercel/blob');const {createHash,timingSafeEqual}=require('node:crypto');
function reply(res,status,body){res.setHeader('Cache-Control','no-store');return res.status(status).json(body)}
function configured(){return Boolean(process.env.BLOB_READ_WRITE_TOKEN)}
function guard(req,res){if(req.method!=='POST'){res.setHeader('Allow','POST');reply(res,405,{error:'Method not allowed'});return false}const origin=req.headers.origin,host=req.headers.host;if(!origin||new URL(origin).host!==host){reply(res,403,{error:'Origin not allowed'});return false}if(Buffer.byteLength(JSON.stringify(req.body||{}))>8000){reply(res,413,{error:'Request too large'});return false}if(!configured()){reply(res,503,{error:'Inquiry and analytics storage is not connected yet'});return false}return true}
const text=(v,max=100)=>typeof v==='string'?v.trim().slice(0,max):'';
const id=v=>text(v,80).replace(/[^a-zA-Z0-9_-]/g,'');
const hash=v=>createHash('sha256').update(v).digest('hex').slice(0,24);
async function save(path,value){await put(path,JSON.stringify(value),{access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:true})}
function isAdmin(req){const supplied=req.headers.authorization?.replace(/^Bearer /,'')||'',expected=process.env.DEMO_ADMIN_KEY||'';return expected.length>=24&&supplied.length===expected.length&&timingSafeEqual(Buffer.from(supplied),Buffer.from(expected))}
async function records(prefix,cursor){const page=await list({prefix,cursor,limit:200});const rows=await Promise.all(page.blobs.map(async b=>{const r=await get(b.url,{access:'private'});return r?JSON.parse(await new Response(r.stream).text()):null}));return {rows:rows.filter(Boolean),cursor:page.hasMore?page.cursor:null}}
module.exports={reply,configured,guard,text,id,hash,save,isAdmin,records};
