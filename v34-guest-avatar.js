import { observeUI } from './ui-lifecycle.js';
(()=>{
  const STORE_KEY='tfa-clone-workspace-v3';
  const SESSION_KEY='wagstack-supabase-session-v1';
  const GUEST_FLAG='wagstack-guest-mode-v1';
  const GUEST_STORE='wagstack-guest-workspace-v1';
  const PRE_GUEST_STORE='wagstack-pre-guest-workspace-v1';
  let pendingPetUpload=null;

  const currentSetItem=Storage.prototype.setItem;
  Storage.prototype.setItem=function(key,value){
    const out=currentSetItem.call(this,key,value);
    if(this===localStorage&&key===STORE_KEY&&localStorage.getItem(GUEST_FLAG)==='1'){
      try{currentSetItem.call(localStorage,GUEST_STORE,String(value))}catch{}
    }
    return out;
  };

  const style=document.createElement('style');
  style.id='wagstack-v34-guest-avatar';
  style.textContent=`
    .wag-auth-guest{width:100%;margin-top:10px!important;background:transparent!important;color:#0b1e3f!important;box-shadow:inset 0 0 0 1px rgba(11,30,63,.14)!important}
    .wag-auth-guest:hover{background:#f6f7f9!important}.wag-auth-guest-note{margin:9px 0 0!important;text-align:center;color:#8490a3!important;font-size:9px!important}
    [data-theme="dark"] .wag-auth-guest{color:#f4f7fb!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.16)!important}
    [data-theme="dark"] .wag-auth-guest:hover{background:rgba(255,255,255,.07)!important}
    .wag-cloud-btn.is-guest .wag-cloud-dot{background:#ff7a1a!important}.wag-cloud-btn.is-guest .wag-cloud-email{max-width:none}
    .wag-pixel-avatar{image-rendering:pixelated!important;image-rendering:crisp-edges!important}
    .pet-profile-card .wag-pixel-avatar,.pet-switcher .wag-pixel-avatar,.pet-card .wag-pixel-avatar{object-fit:cover!important}
    body.wag-signed-out .rail__avatar,
    body.wag-signed-out .rail__name,
    body.wag-signed-out .rail__handle,
    body.wag-signed-out .rail__edit-profile{display:none!important}
  `;
  document.head.appendChild(style);

  function isGuest(){return localStorage.getItem(GUEST_FLAG)==='1'}
  function readSession(){
    try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch{return null}
  }
  function hasAccountSession(){
    const session=readSession();
    return !!(session?.access_token&&session?.user?.id);
  }
  function clearSignedOutAccountState(){
    if(isGuest()||hasAccountSession())return;
    try{
      localStorage.removeItem(STORE_KEY);
      localStorage.removeItem(PRE_GUEST_STORE);
    }catch{}
  }
  function patchSignedOutIdentity(){
    const signedOut=!isGuest()&&!hasAccountSession();
    document.body?.classList.toggle('wag-signed-out',signedOut);
    if(!signedOut)return;
    document.querySelectorAll('[data-owner-name],[data-owner-meta]').forEach(el=>{el.textContent=''});
    document.querySelectorAll('.rail__member-badge').forEach(el=>{el.hidden=true});
  }

  function enterGuest(){
    try{
      const existing=localStorage.getItem(STORE_KEY);
      if(existing!==null&&!localStorage.getItem(PRE_GUEST_STORE))localStorage.setItem(PRE_GUEST_STORE,existing);
      const guest=localStorage.getItem(GUEST_STORE);
      if(guest!==null)localStorage.setItem(STORE_KEY,guest);else localStorage.removeItem(STORE_KEY);
      localStorage.setItem(GUEST_FLAG,'1');
      localStorage.removeItem(SESSION_KEY);
    }catch{}
    location.reload();
  }
  function exitGuest(){
    try{
      const current=localStorage.getItem(STORE_KEY);
      if(current!==null)localStorage.setItem(GUEST_STORE,current);
      const previous=localStorage.getItem(PRE_GUEST_STORE);
      if(previous!==null)localStorage.setItem(STORE_KEY,previous);else localStorage.removeItem(STORE_KEY);
      localStorage.removeItem(PRE_GUEST_STORE);
      localStorage.removeItem(GUEST_FLAG);
    }catch{}
    location.reload();
  }
  function convertGuestToAccountIfNeeded(){
    if(!isGuest())return;
    try{
      const session=readSession();
      if(session?.access_token&&session?.user?.id){
        localStorage.removeItem(GUEST_FLAG);
        localStorage.removeItem(PRE_GUEST_STORE);
      }
    }catch{}
  }

  function patchCloudButton(){
    convertGuestToAccountIfNeeded();
    if(!isGuest())return;
    const btn=document.querySelector('.wag-cloud-btn');if(!btn)return;
    btn.classList.add('is-guest');
    const state=btn.querySelector('.wag-cloud-state');if(state&&state.textContent!=='Guest mode')state.textContent='Guest mode';
    let detail=btn.querySelector('.wag-cloud-email');
    if(!detail){detail=document.createElement('span');detail.className='wag-cloud-email';btn.appendChild(detail)}
    if(detail.textContent!=='Local only')detail.textContent='Local only';
  }

  function patchAuthModal(){
    const auth=document.querySelector('.wag-auth');if(!auth||auth.querySelector('[data-wag-guest]'))return;
    const actions=auth.querySelector('.wag-auth-actions');if(!actions)return;
    const btn=document.createElement('button');
    btn.type='button';btn.className='wag-auth-guest';btn.dataset.wagGuest='';
    btn.textContent=isGuest()?'Exit guest mode':'Continue as guest';
    btn.addEventListener('click',()=>isGuest()?exitGuest():enterGuest());
    actions.insertAdjacentElement('afterend',btn);
    const note=document.createElement('p');note.className='wag-auth-guest-note';
    note.textContent=isGuest()?'Guest data stays on this browser unless you create/sign in to an account.':'No account required. Guest data stays only on this browser.';
    btn.insertAdjacentElement('afterend',note);
  }

  function prepareOriginalPhoto(file){
    return new Promise((resolve,reject)=>{
      const reader=new FileReader();
      reader.onerror=()=>reject(new Error('Could not read pet photo.'));
      reader.onload=()=>{
        const img=new Image();
        img.onerror=()=>reject(new Error('Could not open pet photo.'));
        img.onload=()=>{
          const max=1280,scale=Math.min(1,max/Math.max(img.naturalWidth||img.width,img.naturalHeight||img.height));
          const w=Math.max(1,Math.round((img.naturalWidth||img.width)*scale));
          const h=Math.max(1,Math.round((img.naturalHeight||img.height)*scale));
          const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
          const ctx=canvas.getContext('2d',{alpha:false});ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);ctx.drawImage(img,0,0,w,h);
          const data=canvas.toDataURL('image/jpeg',.9);
          resolve({image_b64:data.split(',')[1],mime:'image/jpeg',width:w,height:h});
        };
        img.src=String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  document.addEventListener('change',e=>{
    const input=e.target?.closest?.('input[name="photo"][type="file"]');
    const file=input?.files?.[0];
    if(!file)return;
    pendingPetUpload=prepareOriginalPhoto(file).catch(()=>null);
  },true);

  const nativeFetch=window.fetch.bind(window);
  window.fetch=async function(input,init){
    const url=typeof input==='string'?input:(input?.url||'');
    if(!url.includes('/api/pet-avatar'))return nativeFetch(input,init);
    let nextInit=init?{...init}:{};
    try{
      const original=await pendingPetUpload;
      if(original&&typeof nextInit.body==='string'){
        const payload=JSON.parse(nextInit.body);
        payload.image_b64=original.image_b64;
        payload.mime=original.mime;
        payload.source_width=original.width;
        payload.source_height=original.height;
        nextInit.body=JSON.stringify(payload);
      }
    }catch{}
    const response=await nativeFetch(input,nextInit);
    try{
      const data=await response.clone().json();
      window.__wagstackLastAvatarResult=data;
    }catch{}
    pendingPetUpload=null;
    return response;
  };

  function markPixelAvatars(){
    document.querySelectorAll('.pet-profile-card img,.pet-switcher img,.pet-card img,[data-pet-avatar] img,[data-pet-image]').forEach(img=>{
      const mark=()=>{if(img.naturalWidth===64&&img.naturalHeight===64)img.classList.add('wag-pixel-avatar');else img.classList.remove('wag-pixel-avatar')};
      if(img.complete)mark();else img.addEventListener('load',mark,{once:true});
    });
  }

  function patch(){clearSignedOutAccountState();patchSignedOutIdentity();patchCloudButton();patchAuthModal();markPixelAvatars()}
  patch();
  observeUI(patch);
})();