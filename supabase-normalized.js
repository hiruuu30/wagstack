const STORE_KEY='tfa-clone-workspace-v3';
const PENDING_KEY='wagstack-pending-owner-v1';
let syncTimer=0;
let syncing=false;
let syncQueued=false;
let syncWaiters=[];
let hydrating=false;
let booting=false;
let readyOwner=null;
const nativeSetItem=Storage.prototype.setItem;

const cloud=()=>window.WagStackSupabase;
const readStore=()=>{try{return JSON.parse(localStorage.getItem(STORE_KEY)||'{}')}catch{return {}}};
const writeCache=state=>nativeSetItem.call(localStorage,STORE_KEY,JSON.stringify(state));
const uid=()=>location.pathname==='/admin'?null:cloud()?.session?.user?.id||null;
const ownerFilter=()=>`owner_id=eq.${encodeURIComponent(uid()||'')}`;
const owned=query=>`${query}&${ownerFilter()}`;
const uuid=()=>crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;
const text=v=>String(v??'').trim();
const num=v=>{const m=String(v??'').replace(/,/g,'').match(/-?\d+(?:\.\d+)?/);return m?Number(m[0]):null};
const iso=v=>{if(!v)return null;const d=new Date(v);return Number.isNaN(d.getTime())?null:d.toISOString()};
const dateOnly=v=>{const s=text(v);if(!s)return null;if(/^\d{4}-\d{2}-\d{2}$/.test(s))return s;const d=new Date(s);return Number.isNaN(d.getTime())?null:d.toISOString().slice(0,10)};
const healthType=v=>({Vaccinations:'vaccination',Vaccination:'vaccination',Allergy:'allergy',Medication:'medication',Condition:'condition','Vet Visit':'vet_visit','Weight Record':'weight'}[v]||'note');
const healthCategory=v=>({vaccination:'Vaccinations',allergy:'Allergy',medication:'Medication',condition:'Condition',vet_visit:'Vet Visit',weight:'Weight Record',note:'Other'}[v]||'Other');
const statusLabel=v=>String(v||'pending').split('_').map(x=>x?x[0].toUpperCase()+x.slice(1):x).join(' ');

function ensureIds(state){
  let changed=false;
  for(const p of state.pets||[]){if(!p.cloudKey){p.cloudKey=uuid();changed=true}}
  for(const list of Object.values(state.healthByPet||{}))for(const h of Array.isArray(list)?list:[]){if(!h.cloudId){h.cloudId=text(h.id)||uuid();changed=true}}
  for(const b of state.bookings||[]){if(!b.cloudId){b.cloudId=text(b.id)||uuid();changed=true}}
  if(changed)writeCache(state);
  return state;
}
async function upsert(table,rows,onConflict){if(!rows.length)return [];return cloud().db.insert(table,rows,{upsert:true,onConflict})}
async function removeMissing(table,key,keep,extra=''){
  if(table!=='order_items')extra=[extra,ownerFilter()].filter(Boolean).join('&');
  const query=`select=${key}${extra?`&${extra}`:''}`;const rows=await cloud().db.get(table,query);
  for(const r of rows){if(r[key]&&!keep.has(String(r[key])))await cloud().db.delete(table,`${key}=eq.${encodeURIComponent(r[key])}${extra?`&${extra}`:''}`)}
}

async function syncProfile(owner,state){
  const p=state.profile||{};
  await cloud().db.insert('profiles',{id:owner,full_name:text(p.name)||'Fur Parent',phone:text(p.phone)||null,avatar_url:text(p.image)||null,updated_at:new Date().toISOString()},{upsert:true,onConflict:'id'});
}
async function syncRewards(owner,state){
  const points=Math.max(0,Math.round(num(state.points)||0));
  const existing=await cloud().db.get('reward_wallets',`select=points_balance,lifetime_points&owner_id=eq.${encodeURIComponent(owner)}&limit=1`);
  const lifetime=Math.max(points,Number(existing?.[0]?.lifetime_points||0));
  await cloud().db.insert('reward_wallets',{owner_id:owner,points_balance:points,lifetime_points:lifetime,updated_at:new Date().toISOString()},{upsert:true,onConflict:'owner_id'});
}
async function syncMembership(owner,state){
  const m=state.membership||{};
  if(!m.active){await cloud().db.delete('user_memberships',owned('legacy_key=eq.primary'));return}
  const plans=await cloud().db.get('memberships','select=id,name&active=eq.true');
  const wanted=String(m.tier||'').toLowerCase().includes('plus')?'Wag Club Plus':'Wag Club';const plan=plans.find(x=>x.name===wanted)||plans[0];if(!plan)return;
  await cloud().db.insert('user_memberships',{owner_id:owner,membership_id:plan.id,legacy_key:'primary',status:'active',starts_at:iso(m.since)||new Date().toISOString(),ends_at:null},{upsert:true,onConflict:'owner_id,legacy_key'});
}
async function syncCartOrder(owner,state){
  const cart=Array.isArray(state.cart)?state.cart.map(text).filter(Boolean):[];
  if(!cart.length){await cloud().db.delete('orders',owned('legacy_key=eq.active-cart'));return {orders:0,items:0}}
  const products=await cloud().db.get('products','select=id,legacy_key,name,price&active=eq.true');const byKey=new Map(products.flatMap(p=>[[String(p.legacy_key||''),p],[String(p.id),p]]));const counts=new Map();
  for(const key of cart)counts.set(key,(counts.get(key)||0)+1);
  let total=0;for(const [key,qty] of counts){const p=byKey.get(key);if(p)total+=Number(p.price||0)*qty}
  let orderRows=await cloud().db.insert('orders',{owner_id:owner,legacy_key:'active-cart',status:'pending',subtotal:total,total,updated_at:new Date().toISOString()},{upsert:true,onConflict:'owner_id,legacy_key'});
  if(!orderRows.length)orderRows=await cloud().db.get('orders',owned('select=id&legacy_key=eq.active-cart&limit=1'));const order=orderRows[0];if(!order)return {orders:0,items:0};
  const items=[];for(const [key,qty] of counts){const p=byKey.get(key);if(p)items.push({order_id:order.id,product_id:p.id,legacy_key:key,product_name:p.name,quantity:qty,unit_price:Number(p.price||0)})}
  await upsert('order_items',items,'order_id,legacy_key');await removeMissing('order_items','legacy_key',new Set(items.map(i=>i.legacy_key)),`order_id=eq.${encodeURIComponent(order.id)}`);
  return {orders:1,items:items.length};
}

async function syncNormalized({markReady=false}={}){
  if(!uid()||!cloud()?.db)return false;
  if(readyOwner!==uid()&&!booting){await initializeSourceOfTruth();if(readyOwner!==uid())return false;}
  if(syncing||hydrating){syncQueued=true;return new Promise(resolve=>syncWaiters.push(resolve));}
  syncQueued=false;syncing=true;let succeeded=false;cloud()?.setCloudState?.('syncing');
  try{
    const owner=uid(),state=ensureIds(readStore());
    await syncProfile(owner,state);await syncRewards(owner,state);await syncMembership(owner,state);const cartStats=await syncCartOrder(owner,state);
    const pets=(state.pets||[]).map(p=>({owner_id:owner,legacy_key:p.cloudKey,name:text(p.name)||'Pet',species:(text(p.species)||text(p.type)||'dog').toLowerCase().includes('cat')?'cat':'dog',breed:text(p.breed)||null,sex:['male','female','unknown'].includes(String(p.sex||'').toLowerCase())?String(p.sex).toLowerCase():'unknown',age_label:text(p.age)||null,weight_label:text(p.weight)||null,weight_kg:num(p.weight),avatar_url:text(p.image)||text(p.avatar)||null,pixel_avatar_url:text(p.pixelAvatar)||null,notes:text(p.notes)||null,updated_at:new Date().toISOString()}));
    const petRows=await upsert('pets',pets,'owner_id,legacy_key');const existingPets=petRows.length?petRows:await cloud().db.get('pets',owned('select=id,name,legacy_key'));const petByKey=new Map(existingPets.map(p=>[String(p.legacy_key||''),p]));const petByName=new Map(existingPets.map(p=>[String(p.name||''),p]));await removeMissing('pets','legacy_key',new Set(pets.map(p=>p.legacy_key)));
    const health=[];
    for(const [petName,list] of Object.entries(state.healthByPet||{})){const localPet=(state.pets||[]).find(p=>p.name===petName);const pet=localPet?petByKey.get(localPet.cloudKey):petByName.get(petName);if(!pet)continue;for(const h of Array.isArray(list)?list:[])health.push({owner_id:owner,pet_id:pet.id,legacy_id:h.cloudId,record_type:healthType(h.category||h.title),title:text(h.title)||text(h.category)||'Health note',details:text(h.note)||text(h.details)||null,status:text(h.status)||null,tone:text(h.tone)||null,record_date:dateOnly(h.date||h.recordDate)||new Date().toISOString().slice(0,10),expires_on:dateOnly(h.expiresOn),attachment_url:text(h.attachment)||null})}
    await upsert('health_records',health,'owner_id,legacy_id');await removeMissing('health_records','legacy_id',new Set(health.map(h=>h.legacy_id)));
    const bookings=[];
    for(const b of state.bookings||[]){const localPet=(state.pets||[]).find(p=>p.name===b.pet);const pet=localPet?petByKey.get(localPet.cloudKey):petByName.get(String(b.pet||''));if(!pet)continue;const kind=(String(b.type||b.category||b.service||'').toLowerCase().includes('hotel')||String(b.service||'').toLowerCase().includes('stay'))?'hotel':'grooming';const times=String(b.time||'').match(/\b\d{1,2}:\d{2}\b/g)||[];const start=iso(b.starts_at||b.startsAt||b.datetime||`${b.date||''}T${times[0]||(kind==='hotel'?'14:00':'10:00')}:00+08:00`);if(!start)throw new Error('Choose a valid booking date.');const end=iso(b.ends_at||b.endsAt||b.checkout||(b.endDate?`${b.endDate}T${times[1]||'12:00'}:00+08:00`:b.end));const allowed=new Set(['pending','confirmed','checked_in','completed','cancelled','no_show']);const raw=String(b.status||'pending').toLowerCase().replace(/\s+/g,'_');bookings.push({owner_id:owner,pet_id:pet.id,legacy_id:b.cloudId,booking_type:kind,service_name:text(b.service)||text(b.title)||null,starts_at:start,ends_at:end&&end>start?end:null,status:allowed.has(raw)?raw:'pending',special_requests:text(b.notes)||text(b.note)||text(b.specialRequests)||null,total_amount:num(b.total||b.amount||b.price),date_label:text(b.date)||null,time_label:text(b.time)||null,updated_at:new Date().toISOString()})}
    await upsert('bookings',bookings,'owner_id,legacy_id');await removeMissing('bookings','legacy_id',new Set(bookings.map(b=>b.legacy_id)));
    if(markReady)await cloud().db.update('profiles',`id=eq.${encodeURIComponent(owner)}`,{normalized_ready:true,updated_at:new Date().toISOString()});
    succeeded=true;
    if(uid()===owner&&!syncQueued)localStorage.removeItem(PENDING_KEY);
    cloud()?.setCloudState?.('synced');window.dispatchEvent(new CustomEvent('wagstack:normalized-synced',{detail:{pets:pets.length,health:health.length,bookings:bookings.length,orders:cartStats.orders,orderItems:cartStats.items}}));return true;
  }catch(err){console.error('[WagStack normalized sync]',err);cloud()?.setCloudState?.('error');return false}finally{syncing=false;if(syncQueued&&uid())schedule();else{syncWaiters.splice(0).forEach(resolve=>resolve(succeeded))}}
}

async function hydrateFromSupabase(){
  if(hydrating||!uid()||!cloud()?.db)return false;hydrating=true;cloud()?.setCloudState?.('syncing');
  try{
    const owner=uid(),current=readStore(),next={...current};
    const [profiles,wallets,memberships,pets,health,bookings,orders]=await Promise.all([
      cloud().db.get('profiles',`select=full_name,phone,avatar_url,normalized_ready&id=eq.${encodeURIComponent(owner)}&limit=1`),
      cloud().db.get('reward_wallets',`select=points_balance,lifetime_points&owner_id=eq.${encodeURIComponent(owner)}&limit=1`),
      cloud().db.get('user_memberships',owned('select=status,starts_at,ends_at,legacy_key,memberships(name)&legacy_key=eq.primary&limit=1')),
      cloud().db.get('pets',owned('select=id,legacy_key,name,species,breed,sex,age_label,weight_label,weight_kg,avatar_url,pixel_avatar_url,notes&order=created_at.asc')),
      cloud().db.get('health_records',owned('select=id,pet_id,legacy_id,record_type,title,details,status,tone,record_date,expires_on,attachment_url&order=created_at.asc')),
      cloud().db.get('bookings',owned('select=id,pet_id,legacy_id,booking_type,service_name,starts_at,ends_at,status,special_requests,total_amount,date_label,time_label&order=starts_at.asc')),
      cloud().db.get('orders',owned('select=id,status,legacy_key&legacy_key=eq.active-cart&status=eq.pending&limit=1'))
    ]);
    const profile=profiles[0]||{};next.profile={...(current.profile||{}),name:profile.full_name||current.profile?.name||'Fur Parent',phone:profile.phone||'',image:profile.avatar_url||current.profile?.image||'/assets/fur-parent-avatar.svg',email:cloud()?.session?.user?.email||current.profile?.email||''};
    next.points=Number(wallets[0]?.points_balance||0);
    if(memberships.length){const m=memberships[0];next.membership={active:m.status==='active',since:m.starts_at?new Date(m.starts_at).toLocaleDateString('en-PH',{month:'short',year:'numeric'}):'',tier:m.memberships?.name||'Wag Club'}}else next.membership={active:false,since:'',tier:'Wag Club'};
    const oldPetsByKey=new Map((current.pets||[]).map(p=>[String(p.cloudKey||''),p]));const oldPetsByName=new Map((current.pets||[]).map(p=>[String(p.name||''),p]));
    next.pets=pets.map(p=>({...oldPetsByKey.get(String(p.legacy_key||''))||oldPetsByName.get(String(p.name||''))||{},cloudKey:p.legacy_key||String(p.id),name:p.name,species:p.species,breed:p.breed||'',sex:p.sex||'unknown',age:p.age_label||'',weight:p.weight_label||(p.weight_kg!=null?`${p.weight_kg} kg`:''),image:p.avatar_url||'',pixelAvatar:p.pixel_avatar_url||'',notes:p.notes||''}));
    const petNameById=new Map(pets.map(p=>[String(p.id),p.name]));const oldHealthById=new Map();for(const list of Object.values(current.healthByPet||{}))for(const h of Array.isArray(list)?list:[])oldHealthById.set(String(h.cloudId||h.id||''),h);
    next.healthByPet={};for(const p of next.pets)next.healthByPet[p.name]=[];
    for(const h of health){const petName=petNameById.get(String(h.pet_id));if(!petName)continue;const key=String(h.legacy_id||h.id);const old=oldHealthById.get(key)||{};(next.healthByPet[petName] ||= []).push({...old,id:h.legacy_id||h.id,cloudId:h.legacy_id||h.id,category:healthCategory(h.record_type),title:h.title||healthCategory(h.record_type),note:h.details||'',status:h.status||'',tone:h.tone||'neutral',date:h.record_date||'',expiresOn:h.expires_on||'',attachment:h.attachment_url||''})}
    const oldBookingById=new Map((current.bookings||[]).map(b=>[String(b.cloudId||b.id||''),b]));
    next.bookings=bookings.map(b=>{const key=String(b.legacy_id||b.id),old=oldBookingById.get(key)||{},start=b.starts_at?new Date(b.starts_at):null,end=b.ends_at?new Date(b.ends_at):null;return {...old,id:b.legacy_id||b.id,cloudId:b.legacy_id||b.id,pet:petNameById.get(String(b.pet_id))||old.pet||'',type:b.booking_type==='hotel'?'Hotel':'Grooming',service:b.service_name||old.service||'',date:b.date_label||(start?start.toISOString().slice(0,10):''),time:b.time_label||(start?start.toTimeString().slice(0,5):''),endDate:end?end.toISOString().slice(0,10):old.endDate,status:statusLabel(b.status),notes:b.special_requests||'',total:b.total_amount==null?old.total:b.total_amount}});
    if(!next.pets.some(p=>p.name===next.activePet))next.activePet=next.pets[0]?.name||'';
    next.cart=[];
    if(orders.length){const items=await cloud().db.get('order_items',`select=legacy_key,quantity&order_id=eq.${encodeURIComponent(orders[0].id)}&order=created_at.asc`);for(const item of items)for(let i=0;i<Number(item.quantity||0);i++)if(item.legacy_key)next.cart.push(item.legacy_key)}
    if(uid()!==owner)return false;
    readyOwner=owner;
    const before=JSON.stringify(current),after=JSON.stringify(next);if(before!==after)writeCache(next);
    cloud()?.setCloudState?.('synced');window.dispatchEvent(new CustomEvent('wagstack:database-hydrated',{detail:{changed:before!==after}}));return before!==after;
  }catch(err){console.error('[WagStack database hydrate]',err);cloud()?.setCloudState?.('error');return false}finally{hydrating=false;if(syncQueued)schedule()}
}

async function initializeSourceOfTruth(){
  if(booting||!uid()||!cloud()?.db)return false;booting=true;
  const main=document.querySelector('#main-content');main?.setAttribute('inert','');main?.setAttribute('aria-busy','true');
  try{
    const owner=uid();const rows=await cloud().db.get('profiles',`select=normalized_ready&id=eq.${encodeURIComponent(owner)}&limit=1`);const ready=!!rows[0]?.normalized_ready;
    if(!ready){const migrated=await syncNormalized({markReady:true});if(!migrated)return false;readyOwner=owner;window.dispatchEvent(new CustomEvent('wagstack:database-migrated'));return false}
    if(localStorage.getItem(PENDING_KEY)===owner){const saved=await syncNormalized();if(!saved)return false;}
    return await hydrateFromSupabase();
  }catch(err){cloud()?.setCloudState?.('error');return false}finally{booting=false;if(readyOwner===uid()){main?.removeAttribute('inert');main?.removeAttribute('aria-busy')}}
}
function schedule(){clearTimeout(syncTimer);syncTimer=setTimeout(()=>syncNormalized(),120)}
Storage.prototype.setItem=function(key,value){const out=nativeSetItem.call(this,key,value);if(this===localStorage&&key===STORE_KEY&&uid()&&readyOwner===uid()){nativeSetItem.call(localStorage,PENDING_KEY,uid());if(!hydrating&&!booting)schedule();else syncQueued=true;}return out};
window.addEventListener('online',()=>{if(uid()&&localStorage.getItem(PENDING_KEY)===uid())schedule()});
window.WagStackNormalized={sync:syncNormalized,refresh:hydrateFromSupabase,initialize:initializeSourceOfTruth};
window.addEventListener('wagstack:auth-ready',async()=>{const changed=await initializeSourceOfTruth();if(changed&&!sessionStorage.getItem('wagstack-db-reloaded')){sessionStorage.setItem('wagstack-db-reloaded','1');location.reload()}else sessionStorage.removeItem('wagstack-db-reloaded')});
const boot=()=>{let tries=0;const t=setInterval(async()=>{tries++;if(uid()){clearInterval(t);const changed=await initializeSourceOfTruth();if(changed&&!sessionStorage.getItem('wagstack-db-reloaded')){sessionStorage.setItem('wagstack-db-reloaded','1');location.reload()}else sessionStorage.removeItem('wagstack-db-reloaded')}else if(tries>120)clearInterval(t)},250)};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
