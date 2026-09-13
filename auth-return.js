// Support confirmation emails that return to the app root instead of the callback.
(() => {
  const html=document.documentElement;
  html.classList.add('wag-preinit');

  const style=document.createElement('style');
  style.id='wag-preinit-style';
  style.textContent='html.wag-preinit #root{visibility:hidden!important}';
  document.head.appendChild(style);

  const release=()=>html.classList.remove('wag-preinit');
  window.addEventListener('wagstack:ui-ready',release,{once:true});
  document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(()=>requestAnimationFrame(release)),{once:true});
  window.addEventListener('load',release,{once:true});

  const params = new URLSearchParams(location.hash.slice(1));
  if (['access_token', 'refresh_token', 'token_hash', 'error_code', 'error_description'].some(key => params.has(key))) {
    location.replace('/auth/confirm.html' + location.hash);
  }
})();
