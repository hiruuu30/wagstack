const STORE_KEY='tfa-clone-workspace-v3';
let syncTimer=0;
let syncing=false;
let hydrating=false;
const baseSetItem=Storage.prototype.setItem;

const cloud=()=>window.WagStackSupabase;
const readStore=()=>{try{return JSON.parse(localStorage.getItem(STORE_KEY)||'{}')}catch{return {}}};
const uid=()=>cloud()?.session?.user?.id||null;
const uuid=()=>crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;
const text=v=>String(v??'').trim();
const num=v=>{const m=String(v??'').replace(/,/g,'').match(/-?\d+(?:\.\d+)?/);return m?Number(m[0]):null};
const iso=v=>{if(!v)return null;const d=new Date(v);return Number.isNaN(d.getTime())?null:d.toISOString()};
const dateOnly=v=>{const s=text(v);if(!s)return null;if(/^\d{4}-\d{2}-\d{2}$/.test(s))return s;const d=new Date(s);return Number.isNaN(d.getTime())?null:d.toISOString().slice(0,10)};
const healthType=v=>({Vaccinations:'vaccination',Vaccination:'vaccination',Allergy:'allergy',Medication:'medication',Condition:'condition','Vet Visit':'vet_visit','Weight Record':'weight'}[v]||'note');

function ensureIds(state){
  let changed=false;
  for(const p of state.pets||[]){if(!p.cloudKey){p.cloudKey=uuid();changed=true}}
  for(const list of Object.values(state.healthByPet||{}))for(const h of Array.isArray(list)?list:[]){if(!h.cloudId){h.cloudId=text(h.id)||uuid();changed=true}}
  for(const b of state.bookings||[]){if(!b.cloudId){b.cloudId=text(b.id)||uuid();changed=true}}
  if(changed)baseSetItem.call(localStorage,STORE_KEY,JSON.stringify(state));
  return state;
}

async function upsert(table,rows,onConflict){
  if(!rows.length)return [];
  return cloud().db.insert(table,rows,{upsert:true,onConflict});
}
async function removeMissing(table,key,keep,extra=''){
  const query=`select=${key}${extra?`&${extra}`:''}`;
  const rows=await cloud().db.get(table,query);
  for(const r of rows){if(r[key]&&!keep.has(String(r[key])))await cloud().db.delete(table,`${key}=eq.${encodeURIComponent(r[key])}${extra?`&${extra}`:''}`)}
}

async function syncProfile(owner,state){
  const p=state.profile||{};
  await cloud().db.insert('profiles',{
    id:owner,
    full_name:text(p.name)||'Fur Parent',
    phone:text(p.phone)||null,
    avatar_url:text(p.image)||null,
    updated_at:new Date().toISOString()
  },{upsert:true,onConflict:'id'});
}

async function syncRewards(owner,state){
  const points=Math.max(0,Math.round(num(state.points)||0));
  const existing=await cloud().db.get('reward_wallets',`select=points_balance,lifetime_points&owner_id=eq.${encodeURIComponent(owner)}&limit=1`);
  const lifetime=Math.max(points,Number(existing?.[0]?.lifetime_points||0));
  await cloud().db.insert('reward_wallets',{owner_id:owner,points_balance:points,lifetime_points:lifetime,updated_at:new Date().toISOString()},{upsert:true,onConflict:'owner_id'});
}

async function syncMembership(owner,state){
  const m=state.membership||{};
  if(!m.active){
    await cloud().db.delete('user_memberships','legacy_key=eq.primary');
    return;
  }
  const plans=await cloud().db.get('memberships','select=id,name&active=eq.true');
  const wanted=String(m.tier||'').toLowerCase().includes('plus')?'Wag Club Plus':'Wag Club';
  const plan=plans.find(x=>x.name===wanted)||plans[0];
  if(!plan)return;
  await cloud().db.insert('user_memberships',{
    owner_id:owner,
    membership_id:plan.id,
    legacy_key:'primary',
    status:'active',
    starts_at:iso(m.since)||new Date().toISOString(),
    ends_at:null
  },{upsert:true,onConflict:'owner_id,legacy_key'});
}

async function syncCartOrder(owner,state){
  const cart=Array.isArray(state.cart)?state.cart.map(text).filter(Boolean):[];
  if(!cart.length){
    await cloud().db.delete('orders','legacy_key=eq.active-cart');
    return {orders:0,items:0};
  }
  const products=await cloud().db.get('products','select=id,legacy_key,name,price&active=eq.true');
  const byKey=new Map(products.map(p=>[String(p.legacy_key||''),p]));
  const counts=new Map();
  for(const key of cart)counts.set(key,(counts.get(key)||0)+1);
  let total=0;
  for(const [key,qty] of counts){const p=byKey.get(key);if(p)total+=Number(p.price||0)*qty}
  let orderRows=await cloud().db.insert('orders',{
    owner_id:owner,legacy_key:'active-cart',status:'pending',subtotal:total,total,updated_at:new Date().toISOString()
  },{upsert:true,onConflict:'owner_id,legacy_key'});
  if(!orderRows.length)orderRows=await cloud().db.get('orders','select=id&legacy_key=eq.active-cart&limit=1');
  const order=orderRows[0];if(!order)return {orders:0,items:0};
  const items=[];
  for(const [key,qty] of counts){
    const p=byKey.get(key);if(!p)continue;
    items.push({order_id:order.id,product_id:p.id,legacy_key:key,product_name:p.name,quantity:qty,unit_price:Number(p.price||0)});
  }
  await upsert('order_items',items,'order_id,legacy_key');
  await removeMissing('order_items','legacy_key',new Set(items.map(i=>i.legacy_key)),`order_id=eq.${encodeURIComponent(order.id)}`);
  return {orders:1,items:items.length};
}

async function hydrateAccountData(){
  if(hydrating||!uid()||!cloud()?.db)return false;
  hydrating=true;
  try{
    const owner=uid(),state=readStore();let changed=false;
    const profiles=await cloud().db.get('profiles',`select=full_name,phone,avatar_url&id=eq.${encodeURIComponent(owner)}&limit=1`);
    if(profiles.length){
      const p=profiles[0];state.profile={...(state.profile||{})};
      if(p.full_name&&p.full_name!==state.profile.name){state.profile.name=p.full_name;changed=true}
      if(p.phone&&p.phone!==state.profile.phone){state.profile.phone=p.phone;changed=true}
      if(p.avatar_url&&p.avatar_url!==state.profile.image){state.profile.image=p.avatar_url;changed=true}
      const email=cloud()?.session?.user?.email;if(email&&!state.profile.email){state.profile.email=email;changed=true}
    }
    const wallets=await cloud().db.get('reward_wallets',`select=points_balance&owner_id=eq.${encodeURIComponent(owner)}&limit=1`);
    if(wallets.length&&Number(wallets[0].points_balance)!==Number(state.points||0)){state.points=Number(wallets[0].points_balance||0);changed=true}
    const memberships=await cloud().db.get('user_memberships','select=status,starts_at,legacy_key,memberships(name)&legacy_key=eq.primary&limit=1');
    if(memberships.length){
      const row=memberships[0],name=row.memberships?.name||state.membership?.tier||'Club Member';
      const next={active:row.status==='active',since:row.starts_at?new Date(row.starts_at).toLocaleDateString('en-PH',{month:'short',year:'numeric'}):state.membership?.since,tier:name};
      if(JSON.stringify(next)!==JSON.stringify(state.membership||{})){state.membership=next;changed=true}
    }
    const orders=await cloud().db.get('orders','select=id&legacy_key=eq.active-cart&status=eq.pending&limit=1');
    if(orders.length){
      const items=await cloud().db.get('order_items',`select=legacy_key,quantity&order_id=eq.${encodeURIComponent(orders[0].id)}`);
      const next=[];for(const item of items)for(let i=0;i<Number(item.quantity||0);i++)if(item.legacy_key)next.push(item.legacy_key);
      if(JSON.stringify(next)!==JSON.stringify(state.cart||[])){state.cart=next;changed=true}
    }
    if(changed)baseSetItem.call(localStorage,STORE_KEY,JSON.stringify(state));
    return changed;
  }catch(err){console.error('[WagStack normalized hydrate]',err);return false}finally{hydrating=false}
}

async function syncNormalized(){
  if(syncing||hydrating||!uid()||!cloud()?.db)return;
  syncing=true;
  try{
    const owner=uid(),state=ensureIds(readStore());
    await syncProfile(owner,state);
    await syncRewards(owner,state);
    await syncMembership(owner,state);
    const cartStats=await syncCartOrder(owner,state);

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
      for(const h of Array.isArray(list)?list:[])health.push({owner_id:owner,pet_id:pet.id,legacy_id:h.cloudId,record_type:healthType(h.category||h.title),title:text(h.title)||text(h.category)||'Health note',details:text(h.note)||text(h.details)||null,status:text(h.status)||null,tone:text(h.tone)||null,record_date:dateOnly(h.date||h.recordDate)||new Date().toISOString().slice(0,10),expires_on:dateOnly(h.expiresOn),attachment_url:text(h.attachment)||null});
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
    window.dispatchEvent(new CustomEvent('wagstack:normalized-synced',{detail:{pets:pets.length,health:health.length,bookings:bookings.length,orders:cartStats.orders,orderItems:cartStats.items,points:Math.max(0,Math.round(num(state.points)||0)),membership:!!state.membership?.active}}));
  }catch(err){console.error('[WagStack normalized sync]',err)}finally{syncing=false}
}
function schedule(){clearTimeout(syncTimer);syncTimer=setTimeout(syncNormalized,650)}
Storage.prototype.setItem=function(key,value){const out=baseSetItem.call(this,key,value);if(this===localStorage&&key===STORE_KEY&&!hydrating)schedule();return out};
window.WagStackNormalized={sync:syncNormalized,hydrate:hydrateAccountData};
window.addEventListener('wagstack:cloud-hydrated',async()=>{await hydrateAccountData();schedule()});
const boot=()=>{let tries=0;const t=setInterval(async()=>{tries++;if(uid()){clearInterval(t);await hydrateAccountData();await syncNormalized()}else if(tries>120)clearInterval(t)},500)};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
