import { observeUI } from './ui-lifecycle.js';

(()=>{
  const STYLE_ID='wagstack-rail-auth-style';

  function injectStyles(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .wag-cloud-btn{display:none!important}
      .wag-rail-auth{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;margin:10px 0 4px;padding:10px 12px;border:0;border-radius:12px;background:#0b1e3f;color:#fff;font:700 9px/1 Poppins,Arial,sans-serif;cursor:pointer;box-shadow:0 10px 24px -18px rgba(11,30,63,.72);transition:transform .18s ease,box-shadow .18s ease,background .18s ease}
      .wag-rail-auth:hover{transform:translateY(-1px);box-shadow:0 14px 28px -18px rgba(11,30,63,.82)}
      .wag-rail-auth:focus-visible{outline:2px solid #ff7a1a;outline-offset:2px}
      .wag-rail-auth__dot{width:7px;height:7px;border-radius:50%;background:#ff7a1a;flex:0 0 auto}
      .wag-rail-auth[data-signed-in="true"]{background:rgba(11,30,63,.07);color:#0b1e3f;box-shadow:inset 0 0 0 1px rgba(11,30,63,.10)}
      .wag-rail-auth[data-signed-in="true"] .wag-rail-auth__dot{background:#22a06b}
      [data-theme="dark"] .wag-rail-auth[data-signed-in="true"]{background:rgba(255,255,255,.08);color:#f3f6fb;box-shadow:inset 0 0 0 1px rgba(255,255,255,.10)}
    `;
    document.head.appendChild(style);
  }

  function getSession(){
    try{return window.WagStackSupabase?.session||JSON.parse(localStorage.getItem('wagstack-supabase-session-v1')||'null')}catch{return null}
  }

  function ensureRailButton(){
    if(location.pathname==='/admin')return;
    const rail=document.querySelector('.rail__inner');
    if(!rail)return;
    let button=rail.querySelector('.wag-rail-auth');
    if(!button){
      button=document.createElement('button');
      button.type='button';
      button.className='wag-rail-auth';
      button.addEventListener('click',()=>document.querySelector('.wag-cloud-btn')?.click());
      const anchor=rail.querySelector('.rail__edit-profile')||rail.querySelector('.rail__actions');
      if(anchor)anchor.insertAdjacentElement('afterend',button);else rail.prepend(button);
    }
    const session=getSession();
    const signedIn=!!session?.user;
    button.dataset.signedIn=String(signedIn);
    button.innerHTML=`<span class="wag-rail-auth__dot" aria-hidden="true"></span><span>${signedIn?'Account':'Sign in'}</span>`;
    button.setAttribute('aria-label',signedIn?'Open WagStack account':'Sign in to WagStack');
  }

  function patch(){injectStyles();ensureRailButton()}
  patch();
  observeUI(patch);
  window.addEventListener('wagstack:auth-ready',patch);
})();