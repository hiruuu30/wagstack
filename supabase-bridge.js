import { SUPABASE_URL, SUPABASE_KEY, SESSION_KEY, CONFIRM_REDIRECT_URL, resendConfirmation } from './auth-config.js';
const nativeSetItem=Storage.prototype.setItem;
let session=null;

const headers=(token,extra={})=>({
  apikey:SUPABASE_KEY,
  'Content-Type':'application/json',
  ...(token?{Authorization:`Bearer ${token}`}:{ }),
  ...extra
});

function readSession(){try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch{return null}}
function writeSession(value){session=value;nativeSetItem.call(localStorage,SESSION_KEY,JSON.stringify(value))}
function clearSession(){session=null;localStorage.removeItem(SESSION_KEY)}
function tokenExpiring(s){
  if(!s?.access_token)return true;
  try{const payload=JSON.parse(atob(s.access_token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));return !payload.exp||payload.exp*1000-Date.now()<60000}catch{return false}
}
async function refreshSession(){
  if(!session?.refresh_token)return null;
  const r=await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,{method:'POST',headers:headers(),body:JSON.stringify({refresh_token:session.refresh_token})});
  if(!r.ok){clearSession();renderAccount();return null}
  const data=await r.json();writeSession(data);return data;
}
async function ensureSession(){session=session||readSession();if(session&&tokenExpiring(session))await refreshSession();return session}
async function authRequest(path,options={}){
  const s=await ensureSession();
  if(!s?.access_token)throw new Error('Sign in required');
  let r=await fetch(`${SUPABASE_URL}${path}`,{...options,headers:headers(s.access_token,options.headers||{})});
  if(r.status===401&&s.refresh_token){const refreshed=await refreshSession();if(refreshed)r=await fetch(`${SUPABASE_URL}${path}`,{...options,headers:headers(refreshed.access_token,options.headers||{})})}
  return r;
}
async function getJson(table,query=''){
  const r=await authRequest(`/rest/v1/${table}?${query}`);if(!r.ok)throw new Error(await r.text());return r.json();
}
async function insertJson(table,payload,{upsert=false,onConflict=''}={}){
  const suffix=upsert&&onConflict?`?on_conflict=${encodeURIComponent(onConflict)}`:'';
  const r=await authRequest(`/rest/v1/${table}${suffix}`,{method:'POST',headers:{Prefer:upsert?'resolution=merge-duplicates,return=representation':'return=representation'},body:JSON.stringify(payload)});
  if(!r.ok)throw new Error(await r.text());return r.json();
}
async function patchJson(table,filters,payload){
  const r=await authRequest(`/rest/v1/${table}?${filters}`,{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify(payload)});if(!r.ok)throw new Error(await r.text());return r.json();
}
async function deleteJson(table,filters){
  const r=await authRequest(`/rest/v1/${table}?${filters}`,{method:'DELETE'});if(!r.ok)throw new Error(await r.text());return true;
}
function announceAuth(){window.dispatchEvent(new CustomEvent('wagstack:auth-ready',{detail:{user:session?.user||null}}))}
async function signIn(email,password){
  const r=await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`,{method:'POST',headers:headers(),body:JSON.stringify({email,password})});
  const data=await r.json();if(!r.ok)throw new Error(data?.msg||data?.error_description||'Unable to sign in');
  writeSession(data);renderAccount();announceAuth();return data.user;
}
async function signUp(email,password,fullName=''){
  const r=await fetch(`${SUPABASE_URL}/auth/v1/signup?redirect_to=${encodeURIComponent(CONFIRM_REDIRECT_URL)}`,{method:'POST',headers:headers(),body:JSON.stringify({email,password,data:{full_name:fullName}})});
  const data=await r.json();if(!r.ok)throw new Error(data?.msg||data?.error_description||'Unable to create account');
  if(data.access_token){writeSession(data);renderAccount();announceAuth()}
  return data;
}
async function signOut(){
  const s=await ensureSession();if(s?.access_token){try{await fetch(`${SUPABASE_URL}/auth/v1/logout`,{method:'POST',headers:headers(s.access_token)})}catch{}}
  clearSession();renderAccount();announceAuth();
}

function setCloudState(state){
  const dot=document.querySelector('.wag-cloud-dot'),label=document.querySelector('.wag-cloud-state');if(!dot||!label)return;
  dot.dataset.state=state;label.textContent=state==='synced'?'Database synced':state==='syncing'?'Saving…':state==='error'?'Sync issue':'Cloud';
}
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function injectStyles(){
  if(document.getElementById('wagstack-cloud-style'))return;
  const s=document.createElement('style');s.id='wagstack-cloud-style';s.textContent=`
  .wag-cloud-btn{position:fixed;top:14px;right:16px;z-index:10000;border:1px solid rgba(11,30,63,.14);background:rgba(255,255,255,.94);backdrop-filter:blur(16px);color:#0b1e3f;border-radius:999px;padding:8px 11px;display:flex;align-items:center;gap:7px;font:700 10px/1 Poppins,Arial,sans-serif;box-shadow:0 12px 32px -22px rgba(7,16,31,.6);cursor:pointer}.wag-cloud-dot{width:8px;height:8px;border-radius:50%;background:#9aa4b2}.wag-cloud-dot[data-state=synced]{background:#22a06b}.wag-cloud-dot[data-state=syncing]{background:#ff7a1a}.wag-cloud-dot[data-state=error]{background:#d64545}.wag-cloud-email{max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wag-auth-backdrop{position:fixed;inset:0;z-index:12000;background:rgba(4,11,24,.56);display:grid;place-items:center;padding:20px}.wag-auth{width:min(420px,100%);border-radius:26px;background:#fff;color:#0b1e3f;padding:24px;box-shadow:0 28px 90px rgba(4,11,24,.28);font-family:Poppins,Arial,sans-serif}.wag-auth h2{margin:0 0 6px;font-size:22px}.wag-auth p{margin:0 0 18px;color:#667085;font-size:11px;line-height:1.55}.wag-auth label{display:block;margin:11px 0 5px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}.wag-auth input{box-sizing:border-box;width:100%;border:1px solid rgba(11,30,63,.14);border-radius:14px;padding:12px 13px;font:500 13px Poppins,Arial,sans-serif;outline:none}.wag-auth input:focus{border-color:#ff7a1a;box-shadow:0 0 0 3px rgba(255,122,26,.1)}.wag-auth-actions{display:flex;gap:9px;margin-top:18px}.wag-auth button{border:0;border-radius:14px;padding:11px 14px;font:800 10px Poppins,Arial,sans-serif;cursor:pointer}.wag-auth-primary{background:#ff7a1a;color:white;flex:1}.wag-auth-secondary{background:#f2f4f7;color:#0b1e3f}.wag-auth-msg{min-height:18px;margin-top:12px!important;color:#b42318!important}.wag-auth-close{float:right;background:transparent!important;font-size:18px!important;padding:0!important}.wag-auth-account{font-size:12px;font-weight:700;margin:4px 0 16px}.wag-auth button:disabled{opacity:.6;cursor:wait}.wag-auth-resend{background:transparent;color:inherit;text-decoration:underline;text-underline-offset:3px;margin-top:12px;padding:8px 0!important}.wag-auth-danger{background:#fff0f0!important;color:#b42318!important}@media(max-width:720px){.wag-cloud-btn{top:auto;bottom:78px;right:12px}}[data-theme="dark"] .wag-cloud-btn{background:rgba(16,35,58,.94);color:#f5f7fb;border-color:rgba(255,255,255,.1)}
  `;document.head.appendChild(s);
}
function openAuth(){
  document.querySelector('.wag-auth-backdrop')?.remove();const signed=!!session?.user;const wrap=document.createElement('div');wrap.className='wag-auth-backdrop';
  wrap.innerHTML=signed?`<div class="wag-auth"><button class="wag-auth-close" aria-label="Close">×</button><h2>WagStack Cloud</h2><p>Your pets, care records and bookings, together in one account.</p><div class="wag-auth-account">${escapeHtml(session.user.email||'Signed in')}</div><div class="wag-auth-actions"><button class="wag-auth-secondary" data-sync>Refresh data</button><button class="wag-auth-danger" data-signout>Sign out</button></div><p class="wag-auth-msg" role="status" aria-live="polite"></p></div>`:`<div class="wag-auth"><button class="wag-auth-close" aria-label="Close">×</button><h2>WagStack Cloud</h2><p>Sign in or create an account to keep your pets, care records and bookings together.</p><label for="wag-auth-name">Name</label><input id="wag-auth-name" name="name" autocomplete="name" placeholder="Fur parent name"><label for="wag-auth-email">Email</label><input required id="wag-auth-email" name="email" type="email" autocomplete="email" placeholder="you@example.com"><label for="wag-auth-password">Password</label><input required minlength="6" id="wag-auth-password" name="password" type="password" autocomplete="current-password" placeholder="At least 6 characters"><div class="wag-auth-actions"><button class="wag-auth-primary" data-signin>Sign in</button><button class="wag-auth-secondary" data-signup>Create account</button></div><button class="wag-auth-resend" data-resend>Resend confirmation email</button><p class="wag-auth-msg" role="status" aria-live="polite"></p></div>`;
  document.body.appendChild(wrap);const msg=wrap.querySelector('.wag-auth-msg');
  wrap.addEventListener('click',e=>{if(e.target===wrap||e.target.closest('.wag-auth-close'))wrap.remove()});
  wrap.querySelector('[data-signin]')?.addEventListener('click',async()=>{try{msg.textContent='Signing in…';await signIn(wrap.querySelector('[name=email]').value.trim(),wrap.querySelector('[name=password]').value);msg.textContent='Loading account data…';setTimeout(()=>location.reload(),250)}catch(err){msg.textContent=err.message}});
  wrap.querySelector('[data-signup]')?.addEventListener('click',async event=>{const button=event.currentTarget;if(button.disabled||!wrap.querySelector('[name=email]').reportValidity()||!wrap.querySelector('[name=password]').reportValidity())return;button.disabled=true;try{msg.textContent='Creating account…';const data=await signUp(wrap.querySelector('[name=email]').value.trim(),wrap.querySelector('[name=password]').value,wrap.querySelector('[name=name]').value.trim());msg.textContent=data.access_token?'Account created. Loading your WagStack data…':'Check your inbox to confirm your email. Open the newest confirmation email to finish setting up your account.';if(data.access_token)setTimeout(()=>location.reload(),350)}catch(err){msg.textContent=err.message}finally{button.disabled=false}});
  wrap.querySelector('[data-resend]')?.addEventListener('click',async event=>{
    const input=wrap.querySelector('[name=email]'),button=event.currentTarget;
    if(!input.reportValidity()||button.disabled)return;
    button.disabled=true;msg.textContent='Sending confirmation email…';
    try{await resendConfirmation(input.value.trim());msg.textContent='If this email has an unconfirmed account, a new link is on its way. Check your inbox and spam folder, then open the newest email.';setTimeout(()=>{button.disabled=false},60000)}
    catch(err){msg.textContent=err instanceof TypeError?'We couldn’t connect. Please try again.':err.message;button.disabled=false}
  });
  wrap.querySelector('[data-sync]')?.addEventListener('click',async()=>{try{msg.textContent='Refreshing…';await window.WagStackNormalized?.refresh?.();msg.textContent='Loaded from Supabase.';setTimeout(()=>location.reload(),250)}catch(err){msg.textContent=err.message}});
  wrap.querySelector('[data-signout]')?.addEventListener('click',async()=>{await signOut();wrap.remove()});
}
function renderAccount(){
  injectStyles();session=session||readSession();let btn=document.querySelector('.wag-cloud-btn');
  if(!btn){btn=document.createElement('button');btn.className='wag-cloud-btn';btn.type='button';btn.addEventListener('click',openAuth);document.body.appendChild(btn)}
  const email=session?.user?.email;btn.innerHTML=`<span class="wag-cloud-dot" data-state="${email?'synced':'off'}"></span><span class="wag-cloud-state">${email?'Database synced':'Sign in'}</span>${email?`<span class="wag-cloud-email">${escapeHtml(email)}</span>`:''}`;
}

window.WagStackSupabase={url:SUPABASE_URL,signIn,signUp,resendConfirmation,signOut,ensureSession,setCloudState,get session(){return session},db:{get:getJson,insert:insertJson,update:patchJson,delete:deleteJson}};

async function boot(){
  session=readSession();renderAccount();
  if(session){try{await ensureSession();renderAccount();announceAuth();setCloudState('syncing')}catch(err){console.error('[WagStack auth boot]',err);setCloudState('error')}}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
