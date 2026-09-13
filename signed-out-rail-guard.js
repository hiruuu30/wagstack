(()=>{
  if(location.pathname==='/admin')return;
  const SESSION_KEY='wagstack-supabase-session-v1';
  const GUEST_FLAG='wagstack-guest-mode-v1';
  const style=document.createElement('style');
  style.id='wagstack-signed-out-rail-guard';
  style.textContent=`
    body.wag-signed-out [data-message-count],
    body.wag-signed-out [data-notification-count]{display:none!important}
  `;
  document.head.appendChild(style);

  function readSession(){try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch{return null}}
  function isSignedOut(){return localStorage.getItem(GUEST_FLAG)!=='1'&&!readSession()?.user?.id}
  function sync(){
    const signedOut=isSignedOut();
    document.body?.classList.toggle('wag-signed-out',signedOut);
    if(signedOut){
      document.querySelectorAll('[data-message-count],[data-notification-count]').forEach(el=>{el.textContent='';el.hidden=true});
    }else{
      document.querySelectorAll('[data-message-count],[data-notification-count]').forEach(el=>{el.hidden=false});
    }
  }
  function openAuth(){document.querySelector('.wag-cloud-btn')?.click()}

  document.addEventListener('click',e=>{
    if(!isSignedOut())return;
    const chat=e.target.closest('[data-open-kape]');
    const notifications=e.target.closest('[data-rail-action="notifications"]');
    if(!chat&&!notifications)return;
    e.preventDefault();
    e.stopImmediatePropagation();
    openAuth();
  },true);

  sync();
  window.addEventListener('wagstack:auth-ready',sync);
  window.addEventListener('storage',sync);
})();
