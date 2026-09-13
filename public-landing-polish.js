(()=>{
  if(location.pathname==='/admin'||location.pathname.startsWith('/auth/'))return;

  const style=document.createElement('style');
  style.id='wag-public-landing-polish';
  style.textContent=`
    html:has(body.wag-public-mode),
    body.wag-public-mode{
      height:auto!important;
      min-height:100%!important;
      overflow-x:hidden!important;
      overflow-y:auto!important;
      overscroll-behavior-y:auto!important;
    }
    body.wag-public-mode #root,
    body.wag-public-mode .shell,
    body.wag-public-mode #main-content{
      height:auto!important;
      min-height:100vh!important;
      max-height:none!important;
      overflow:visible!important;
    }
    body.wag-public-mode #main-content{
      position:relative!important;
      inset:auto!important;
    }

    /* Desktop public header */
    body.wag-public-mode .wag-public-nav{
      width:min(1120px,calc(100% - 48px))!important;
      padding:14px 0!important;
    }
    body.wag-public-mode .wag-public-brand{font-size:20px!important}
    body.wag-public-mode .wag-public-links{gap:5px!important}
    body.wag-public-mode .wag-public-link,
    body.wag-public-mode .wag-public-auth{font-size:9px!important;padding:10px 14px!important}

    /* Make the first viewport feel complete instead of cropped. */
    body.wag-public-home-route .wag-public-home{
      width:min(1120px,calc(100% - 48px))!important;
      padding:18px 0 58px!important;
    }
    body.wag-public-home-route .wag-public-hero{
      grid-template-columns:minmax(0,1.03fr) minmax(330px,.82fr)!important;
      gap:34px!important;
      min-height:0!important;
      padding:40px 46px!important;
      border-radius:34px!important;
    }
    body.wag-public-home-route .wag-public-eyebrow{margin-bottom:14px!important;font-size:9px!important}
    body.wag-public-home-route .wag-public-copy h1{
      max-width:590px!important;
      font-size:clamp(44px,5vw,62px)!important;
      line-height:.94!important;
      letter-spacing:-.062em!important;
    }
    body.wag-public-home-route .wag-public-copy>p{
      max-width:555px!important;
      margin-top:18px!important;
      font-size:12px!important;
      line-height:1.65!important;
    }
    body.wag-public-home-route .wag-public-cta{margin-top:22px!important}
    body.wag-public-home-route .wag-public-primary,
    body.wag-public-home-route .wag-public-secondary{padding:12px 17px!important;font-size:10px!important}
    body.wag-public-home-route .wag-public-proof{margin-top:18px!important;gap:13px!important;font-size:8px!important}
    body.wag-public-home-route .wag-public-visual{min-height:350px!important}
    body.wag-public-home-route .wag-public-phone{
      right:3%!important;
      top:4px!important;
      width:min(286px,79%)!important;
      height:350px!important;
      padding:12px!important;
      border-radius:32px!important;
      transform:rotate(2.2deg)!important;
    }
    body.wag-public-home-route .wag-public-screen{padding:18px!important;border-radius:23px!important}
    body.wag-public-home-route .wag-public-screen-brand{font-size:14px!important}
    body.wag-public-home-route .wag-public-screen-dot{width:24px!important;height:24px!important}
    body.wag-public-home-route .wag-public-screen h3{margin:27px 0 7px!important;font-size:24px!important}
    body.wag-public-home-route .wag-public-stack{margin-top:15px!important;gap:7px!important}
    body.wag-public-home-route .wag-public-mini{min-height:75px!important;padding:10px!important;border-radius:15px!important}
    body.wag-public-home-route .wag-public-mini:nth-child(1){min-height:88px!important}
    body.wag-public-home-route .wag-public-mini b{font-size:8.5px!important}
    body.wag-public-home-route .wag-public-mini small{font-size:6.8px!important}
    body.wag-public-home-route .wag-public-product{
      left:2%!important;
      bottom:8px!important;
      width:148px!important;
      padding:9px!important;
      border-radius:21px!important;
      transform:rotate(-5deg)!important;
    }
    body.wag-public-home-route .wag-public-product img{height:98px!important;border-radius:14px!important}
    body.wag-public-home-route .wag-public-product b{font-size:8.5px!important;margin-top:7px!important}
    body.wag-public-home-route .wag-public-product small{font-size:7px!important}

    /* Public Shop / About pages: normal document scrolling + narrower content. */
    body.wag-public-mode:not(.wag-public-home-route) #main-content{
      overflow:visible!important;
      height:auto!important;
      min-height:100vh!important;
      padding-bottom:56px!important;
    }
    body.wag-public-mode:not(.wag-public-home-route) #main-content>.clone-page,
    body.wag-public-mode:not(.wag-public-home-route) #main-content>.v27-shop,
    body.wag-public-mode:not(.wag-public-home-route) #main-content>.clone-glass{
      width:min(940px,calc(100% - 48px))!important;
      max-width:940px!important;
      height:auto!important;
      min-height:0!important;
      max-height:none!important;
      overflow:visible!important;
      margin:18px auto 64px!important;
      border-radius:28px!important;
    }
    body.wag-public-mode:not(.wag-public-home-route) .clone-page,
    body.wag-public-mode:not(.wag-public-home-route) .clone-glass,
    body.wag-public-mode:not(.wag-public-home-route) .v27-shop{
      overflow:visible!important;
      max-height:none!important;
    }
    body.wag-public-mode:not(.wag-public-home-route) .clone-page{
      padding:24px!important;
    }
    body.wag-public-mode:not(.wag-public-home-route) .clone-page__head,
    body.wag-public-mode:not(.wag-public-home-route) .clone-hero{
      max-width:820px!important;
    }
    body.wag-public-mode:not(.wag-public-home-route) .v27-shop-hero{
      grid-template-columns:minmax(0,1.35fr) minmax(220px,.65fr)!important;
    }
    body.wag-public-mode:not(.wag-public-home-route) .v27-shop-intro,
    body.wag-public-mode:not(.wag-public-home-route) .v27-shop-bag{padding:20px!important}
    body.wag-public-mode:not(.wag-public-home-route) .v27-products{grid-template-columns:repeat(3,minmax(0,1fr))!important}

    @media (max-height:720px) and (min-width:861px){
      body.wag-public-home-route .wag-public-nav{padding:10px 0!important}
      body.wag-public-home-route .wag-public-home{padding-top:10px!important}
      body.wag-public-home-route .wag-public-hero{padding:31px 40px!important;gap:28px!important}
      body.wag-public-home-route .wag-public-copy h1{font-size:clamp(42px,4.6vw,56px)!important}
      body.wag-public-home-route .wag-public-copy>p{margin-top:14px!important;line-height:1.55!important}
      body.wag-public-home-route .wag-public-cta{margin-top:17px!important}
      body.wag-public-home-route .wag-public-proof{margin-top:13px!important}
      body.wag-public-home-route .wag-public-visual{min-height:318px!important}
      body.wag-public-home-route .wag-public-phone{height:318px!important;width:min(265px,76%)!important}
      body.wag-public-home-route .wag-public-product{width:135px!important}
      body.wag-public-home-route .wag-public-product img{height:84px!important}
    }

    @media(max-width:980px){
      body.wag-public-mode:not(.wag-public-home-route) .v27-products{grid-template-columns:repeat(2,minmax(0,1fr))!important}
      body.wag-public-mode:not(.wag-public-home-route) .v27-shop-hero{grid-template-columns:1fr!important}
    }
    @media(max-width:860px){
      body.wag-public-home-route .wag-public-hero{grid-template-columns:1fr!important;padding:32px!important}
      body.wag-public-home-route .wag-public-copy h1{font-size:clamp(43px,9vw,62px)!important}
      body.wag-public-home-route .wag-public-visual{min-height:330px!important}
    }
    @media(max-width:620px){
      html:has(body.wag-public-mode),body.wag-public-mode{overflow-y:auto!important}
      body.wag-public-mode .wag-public-nav{width:calc(100% - 24px)!important;padding:11px 0!important}
      body.wag-public-mode .wag-public-brand{font-size:17px!important}
      body.wag-public-mode .wag-public-link{padding:8px!important}
      body.wag-public-mode .wag-public-auth{padding:9px 11px!important}
      body.wag-public-home-route .wag-public-home{width:calc(100% - 20px)!important;padding-top:8px!important}
      body.wag-public-home-route .wag-public-hero{padding:24px 20px!important;border-radius:25px!important}
      body.wag-public-home-route .wag-public-copy h1{font-size:42px!important}
      body.wag-public-home-route .wag-public-proof{display:none!important}
      body.wag-public-home-route .wag-public-visual{min-height:300px!important}
      body.wag-public-mode:not(.wag-public-home-route) #main-content>.clone-page,
      body.wag-public-mode:not(.wag-public-home-route) #main-content>.v27-shop,
      body.wag-public-mode:not(.wag-public-home-route) #main-content>.clone-glass{
        width:calc(100% - 20px)!important;
        margin:10px auto 44px!important;
        border-radius:22px!important;
      }
      body.wag-public-mode:not(.wag-public-home-route) .clone-page{padding:16px!important}
      body.wag-public-mode:not(.wag-public-home-route) .v27-products{grid-template-columns:1fr!important}
    }
  `;
  document.head.appendChild(style);

  function syncPublicScroll(){
    const publicMode=document.body?.classList.contains('wag-public-mode');
    document.documentElement.classList.toggle('wag-public-scroll',!!publicMode);
    if(publicMode){
      document.documentElement.style.overflowY='auto';
      document.body.style.overflowY='auto';
      const main=document.querySelector('#main-content');
      if(main){
        main.style.removeProperty('height');
        main.style.removeProperty('max-height');
        main.style.setProperty('overflow','visible','important');
      }
    }else{
      document.documentElement.classList.remove('wag-public-scroll');
      document.documentElement.style.removeProperty('overflow-y');
      document.body.style.removeProperty('overflow-y');
    }
  }

  function routeTop(){
    if(document.body?.classList.contains('wag-public-mode')) requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'auto'}));
  }

  document.addEventListener('click',e=>{
    const a=e.target.closest?.('[data-public-link]');
    if(a) setTimeout(()=>{syncPublicScroll();routeTop()},0);
  },true);
  window.addEventListener('popstate',()=>setTimeout(()=>{syncPublicScroll();routeTop()},0));
  window.addEventListener('wagstack:auth-ready',()=>setTimeout(syncPublicScroll,0));
  window.addEventListener('resize',syncPublicScroll,{passive:true});
  const mo=new MutationObserver(()=>syncPublicScroll());
  if(document.body)mo.observe(document.body,{attributes:true,attributeFilter:['class']});
  syncPublicScroll();
})();
