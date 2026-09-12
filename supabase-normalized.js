const STORE_KEY='tfa-clone-workspace-v3';
let syncTimer=0;
let syncing=false;
const baseSetItem=Storage.prototype.setItem;

const cloud=()=>window.WagStackSupabase;
const readStore=()=>{try{return JSON.parse(localStorage.getItem(STORE_KEY)||'{}')}catch{return {}}};
const uid=()=>cloud()?.session?.user?.id||null;
const uuid=()=>crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;
const text=v=>String(v??'').trim();
const num=v=>{const m=String(v??'').replace(/,/g,'').match(/-?\d+(?:\.\d+)?/);return m?Number(m[0]):null};
const iso=v=>{if(!v)return null;const d=new Date(v);return Number.isNaN(d.getTime())?null:d.toISOString()};
const healthType=v=>({Vaccinations:'vaccination',Vaccination:'vaccination',Allergy:'allergy',Medication:'medication',Condition:'condition','Vet Visit':'vet_visit','Weight Record':'weight'}[v]||'note');

function ensureIds(state){
  let changed=false;
  for(const p of state.pets||[]){if(!p.cloudKey){p.cloudKey=uuid();changed=true}}
  for(const [petName,list] of Object.entries(state.healthByPet||{}))for(const h of Array.isArray(list)?list:[]){if(!h.cloudId){h.cloudId=text(h.id)||uuid();changed=true}}
  for(const b of state.bookings||[]){if(!b.cloudId){b.cloudId=text(b.id)||uuid();changed=true}}
  if(changed)baseSetItem.call(localStorage,STORE_KEY,JSON.stringify(state));
  return state;
}

async function upsert(table,rows,onConflict){
  if(!rows.length)return [];
  return cloud().db.insert(table,rows,{upsert:true,onConflict});
}
async function removeMissing(table,key,keep){
  const rows=await cloud().db.get(table,`select=${key}`);
  for(const r of rows){if(r[key]&&!keep.has(String(r[key])))await cloud().db.delete(table,`${key}=eq.${encodeURIComponent(r[key])}`)}
}

async function syncNormalized(){
  if(syncing||!uid()||!cloud()?.db)return;
  syncing=true;
  try{
    const owner=uid(),state=ensureIds(readStore());
    const pets=(state.pets||[]).map(p=>({
      owner_id:owner,legacy_key:p.cloudKey,name:text(p.name)||'Pet',species:(text(p.species)||text(p.type)||'dog').toLowerCase().includes('cat')?'cat':'dog',breed:text(p.breed)||null,sex:['male','female','unknown'].includes(String(p.sex||'').toLowerCase())?String(p.sex).toLowerCase():'unknown',age_label:text(p.age)||null,weight_label:text(p.weight)||null,weight_kg:num(p.weight),avatar_url:text(p.image)||text(p.avatar)||null,pixel_avatar_url:text(p.pixelAvatar)||null,notes:text(p.notes)||null,updated_at:new Date().toISOString()
    }));
    const petRows=await upsert('pets',pets,'owner_id,legacy_key');
    const existingPets=petRows.length?petRows:await cloud().db.get('pets','select=id,name,legacy_key');
    const petByKey=new Map(existingPets.map(p=>[String(p.legacy_key||''),p]));
    const petByName=new Map(existingPets.map(p=>[String(p.name||''),p]));
    await removeMissing('pets','legacy_key',new Set(pets.map(p=>p.legacy_key)));

    const health=[];
    for(const [petName,list] of Object.entries(state.healthByPet||{})){
      const localPet=(state.pets||[]).find(p=>p.name===petName);const pet=localPet?petByKey.get(localPet.cloudKey):petByName.get(petName);if(!pet)continue;
      for(const h of Array.isArray(list)?list:[])health.push({owner_id:owner,pet_id:pet.id,legacy_id:h.cloudId,record_type:healthType(h.category||h.title),title:text(h.title)||text(h.category)||'Health note',details:text(h.note)||text(h.details)||null,status:text(h.status)||null,tone:text(h.tone)||null,record_date:(text(h.date)||text(h.recordDate)||new Date().toISOString().slice(0,10)),expires_on:text(h.expiresOn)||null,attachment_url:text(h.attachment)||null});
    }
    await upsert('health_records',health,'owner_id,legacy_id');
    await removeMissing('health_records','legacy_id',new Set(health.map(h=>h.legacy_id)));

    const bookings=[];
    for(const b of state.bookings||[]){
      const localPet=(state.pets||[]).find(p=>p.name===b.pet);const pet=localPet?petByKey.get(localPet.cloudKey):petByName.get(String(b.pet||''));if(!pet)continue;
      const kind=(String(b.type||b.category||b.service||'').toLowerCase().includes('hotel')||String(b.service||'').toLowerCase().includes('stay'))?'hotel':'grooming';
      const start=iso(b.starts_at||b.startsAt||b.datetime||`${b.date||''} ${b.time||''}`)||new Date().toISOString();
      const end=iso(b.ends_at||b.endsAt||b.checkout||b.end);
      const allowed=new Set(['pending','confirmed','checked_in','completed','cancelled','no_show']);const raw=String(b.status||'pending').toLowerCase().replace(/\s+/g,'_');
      bookings.push({owner_id:owner,pet_id:pet.id,legacy_id:b.cloudId,booking_type:kind,service_name:text(b.service)||text(b.title)||null,starts_at:start,ends_at:end&&end>start?end:null,status:allowed.has(raw)?raw:'pending',special_requests:text(b.notes)||text(b.note)||text(b.specialRequests)||null,total_amount:num(b.total||b.amount||b.price),date_label:text(b.date)||null,time_label:text(b.time)||null,updated_at:new Date().toISOString()});
    }
    await upsert('bookings',bookings,'owner_id,legacy_id');
    await removeMissing('bookings','legacy_id',new Set(bookings.map(b=>b.legacy_id)));
    window.dispatchEvent(new CustomEvent('wagstack:normalized-synced',{detail:{pets:pets.length,health:health.length,bookings:bookings.length}}));
  }catch(err){console.error('[WagStack normalized sync]',err)}finally{syncing=false}
}
function schedule(){clearTimeout(syncTimer);syncTimer=setTimeout(syncNormalized,900)}
Storage.prototype.setItem=function(key,value){const out=baseSetItem.call(this,key,value);if(this===localStorage&&key===STORE_KEY)schedule();return out};
window.WagStackNormalized={sync:syncNormalized};
window.addEventListener('wagstack:cloud-hydrated',schedule);
const boot=()=>{let tries=0;const t=setInterval(()=>{tries++;if(uid()){clearInterval(t);syncNormalized()}else if(tries>120)clearInterval(t)},500)};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
