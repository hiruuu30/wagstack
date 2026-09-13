(()=>{
  if(location.pathname==='/admin'||location.pathname.startsWith('/auth/'))return;
  const style=document.createElement('style');
  style.id='wag-public-mobile-fix';
  style.textContent=`
    body.wag-public-mode,body.wag-public-mode #root,body.wag-public-mode .shell,body.wag-public-mode .shell__panel,body.wag-public-mode #main-content{max-width:100%!important;overflow-x:hidden!important}
    body.wag-public-mode{min-height:100dvh!important;overflow-y:auto!important}
    body.wag-public-mode .shell,body.wag-public-mode .shell__panel,body.wag-public-mode #main-content{min-height:100dvh!important;height:auto!important;overflow-y:visible!important}
    body.wag-public-mode .wag-public-nav{box-sizing:border-box}
    body.wag-public-mode:not(.wag-public-home-route) #main-content>.clone-page,
    body.wag-public-mode:not(.wag-public-home-route) #main-content>.v27-shop{max-width:920px!important;width:calc(100% - 28px)!important;margin-left:auto!important;margin-right:auto!important;padding-left:0!important;padding-right:0!important}
    body.wag-public-mode:not(.wag-public-home-route) #main-content .clone-glass,
    body.wag-public-mode:not(.wag-public-home-route) #main-content .v27-shop-intro,
    body.wag-public-mode:not(.wag-public-home-route) #main-content .v27-shop-bag{max-width:100%!important}

    @media(max-width:700px){
      .wag-public-nav{width:calc(100% - 24px)!important;padding:12px 0!important;gap:10px!important;background:rgba(244,243,237,.96)!important;border-bottom:1px solid rgba(11,30,63,.08)!important;backdrop-filter:blur(14px)!important;-webkit-backdrop-filter:blur(14px)!important}
      .wag-public-brand{font-size:17px!important;gap:7px!important;min-width:0!important}.wag-public-brand img{width:25px!important;height:25px!important;flex:0 0 25px!important}
      .wag-public-links{gap:2px!important;min-width:0!important}.wag-public-link,.wag-public-auth{padding:9px 9px!important;font-size:8.5px!important;white-space:nowrap!important}
      .wag-public-auth{box-shadow:none!important}
      .wag-public-home.wag-editorial{width:calc(100% - 24px)!important;padding:4px 0 48px!important}
      .wag-editorial-hero{padding:30px 0 34px!important;gap:24px!important}
      .wag-editorial-copy{max-width:none!important}.wag-editorial-kicker{margin-bottom:14px!important;font-size:8px!important}.wag-editorial-copy h1{font-size:clamp(36px,11vw,44px)!important;line-height:.98!important;letter-spacing:-.055em!important}.wag-editorial-copy>p{margin-top:17px!important;font-size:11px!important;line-height:1.65!important}
      .wag-editorial-actions{margin-top:22px!important;gap:10px!important}.wag-editorial-primary{padding:13px 15px!important;font-size:10px!important}.wag-editorial-textlink{font-size:10px!important}
      .wag-editorial-meta{margin-top:25px!important;grid-template-columns:repeat(3,minmax(0,1fr))!important}.wag-editorial-meta div,.wag-editorial-meta div:nth-child(2),.wag-editorial-meta div:last-child{padding:11px 8px!important;border-bottom:0!important}.wag-editorial-meta strong{font-size:10px!important}.wag-editorial-meta span{font-size:7px!important}
      .wag-product-preview{min-height:0!important;width:100%!important;overflow:hidden!important}.wag-product-preview__bar{height:40px!important;padding:0 12px!important}.wag-product-preview__nav{gap:8px!important;font-size:7px!important}.wag-product-preview__body{display:block!important;min-height:0!important}.wag-product-preview__side{display:none!important}.wag-product-preview__main{padding:15px!important;min-width:0!important}.wag-product-preview__main h3{font-size:21px!important}.wag-product-preview__grid{grid-template-columns:1fr!important;gap:8px!important}.wag-product-preview__panel,.wag-product-preview__panel.wide{min-height:0!important;grid-row:auto!important}.wag-product-preview__event{grid-template-columns:48px minmax(0,1fr)!important}
      .wag-editorial-section{grid-template-columns:1fr!important;gap:22px!important;padding:46px 0!important}.wag-editorial-section__intro h2,.wag-editorial-shop__head h2{font-size:29px!important}.wag-editorial-row{grid-template-columns:28px minmax(0,1fr)!important;gap:10px!important;padding:18px 0!important}.wag-editorial-row h3{font-size:14px!important}.wag-editorial-row p{grid-column:2!important;font-size:9px!important}
      .wag-editorial-shop{padding-top:48px!important}.wag-editorial-shop__head{align-items:flex-start!important;gap:14px!important;flex-direction:column!important}.wag-editorial-products{grid-template-columns:repeat(2,minmax(0,1fr))!important}.wag-editorial-product img{height:125px!important}.wag-editorial-product div{padding:11px!important}.wag-editorial-product strong{font-size:10px!important}
      .wag-editorial-final{grid-template-columns:1fr!important;gap:18px!important;margin-top:48px!important;padding:27px 0!important}.wag-editorial-final h2{font-size:29px!important}.wag-editorial-footer{padding-top:20px!important;gap:8px!important}
      body.wag-public-mode:not(.wag-public-home-route) #main-content>.clone-page,
      body.wag-public-mode:not(.wag-public-home-route) #main-content>.v27-shop{width:calc(100% - 24px)!important;margin-bottom:36px!important}
      body.wag-public-mode:not(.wag-public-home-route) #main-content .clone-page{padding-top:12px!important}
      body.wag-public-mode .v27-shop-hero{grid-template-columns:1fr!important}.v27-shop-intro,.v27-shop-bag{padding:16px!important}.v27-products{grid-template-columns:1fr 1fr!important;gap:8px!important}.v27-product{min-height:245px!important;padding:12px!important;border-radius:16px!important}.v27-product__visual{height:100px!important;border-radius:12px!important}.v27-product h3{font-size:13px!important}.v27-product p{font-size:8px!important}.v27-product__foot{align-items:flex-end!important}.v27-product__price{font-size:14px!important}.v27-add{padding:8px 9px!important;font-size:8px!important}
    }
    @media(max-width:430px){
      .wag-public-nav{width:calc(100% - 18px)!important}.wag-public-brand span{font-size:15px!important}.wag-public-brand img{width:23px!important;height:23px!important}.wag-public-links{gap:0!important}.wag-public-link,.wag-public-auth{padding:8px 7px!important;font-size:8px!important}
      .wag-public-home.wag-editorial{width:calc(100% - 20px)!important}.wag-editorial-copy h1{font-size:36px!important}.wag-editorial-meta{grid-template-columns:1fr!important}.wag-editorial-meta div,.wag-editorial-meta div:nth-child(2),.wag-editorial-meta div:last-child{padding:10px 0!important;border-right:0!important;border-bottom:1px solid rgba(11,30,63,.08)!important}
      .wag-product-preview__nav span:not(:first-child){display:none!important}.wag-editorial-products,.v27-products{grid-template-columns:1fr!important}.wag-editorial-product img{height:180px!important}.v27-product__visual{height:150px!important}
    }
  `;
  document.head.appendChild(style);
})();
