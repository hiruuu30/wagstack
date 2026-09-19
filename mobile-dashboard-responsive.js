(()=>{
  if (document.getElementById('branddemo-mobile-dashboard-responsive')) return;
  const style=document.createElement('style');
  style.id='branddemo-mobile-dashboard-responsive';
  style.textContent=`
/* Mobile/tablet dashboard refinement only. Desktop >=901px is intentionally untouched. */
@media (max-width:900px){
  body:not(.public-landing-active) .shell__panel{min-width:0!important}
  body:not(.public-landing-active) #main-content{min-width:0!important}

  body:not(.public-landing-active) .home__glass{
    border-radius:22px!important;
    padding:12px!important;
    margin-top:10px!important;
  }
  body:not(.public-landing-active) .home__glass--showcase{padding:10px!important}
  body:not(.public-landing-active) .home__showcase{min-width:0!important}

  body:not(.public-landing-active) .bento{
    display:grid!important;
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
    gap:9px!important;
    width:100%!important;
    min-width:0!important;
  }
  body:not(.public-landing-active) .bento__card{
    min-width:0!important;
    min-height:138px!important;
    height:138px!important;
    padding:13px!important;
    border-radius:18px!important;
    overflow:hidden!important;
  }
  body:not(.public-landing-active) .bento__head{
    min-width:0!important;
    gap:7px!important;
    align-items:flex-start!important;
  }
  body:not(.public-landing-active) .bento__label{min-width:0!important;gap:7px!important}
  body:not(.public-landing-active) .bento__icon{
    width:30px!important;
    height:30px!important;
    min-width:30px!important;
    border-radius:10px!important;
  }
  body:not(.public-landing-active) .bento__icon svg{width:17px!important;height:17px!important}
  body:not(.public-landing-active) .bento__title{
    font-size:12px!important;
    line-height:1.15!important;
    letter-spacing:-.015em!important;
  }
  body:not(.public-landing-active) .bento__desc{
    margin-top:5px!important;
    font-size:8.5px!important;
    line-height:1.35!important;
    display:-webkit-box!important;
    -webkit-line-clamp:2!important;
    -webkit-box-orient:vertical!important;
    overflow:hidden!important;
  }
  body:not(.public-landing-active) .bento__arrow{width:12px!important;height:12px!important;flex:0 0 auto!important}
  body:not(.public-landing-active) .bento__media{margin-top:8px!important;max-height:70px!important;overflow:hidden!important}
  body:not(.public-landing-active) .bento__card--projects .bento__booking-shot{
    width:154px!important;
    height:50px!important;
    border-radius:10px!important;
    padding:6px!important;
  }
  body:not(.public-landing-active) .bento__chips{height:61px!important}
  body:not(.public-landing-active) .bento__chip-row{height:27px!important;margin:0!important}
  body:not(.public-landing-active) .bento__chip{height:24px!important;padding:0 8px!important;font-size:8px!important;gap:4px!important}
  body:not(.public-landing-active) .bento__chip svg{width:12px!important;height:12px!important}
  body:not(.public-landing-active) .bento__fan{transform:scale(.78)!important;transform-origin:50% 18%!important}

  body:not(.public-landing-active) .home__promo-card.updates-enhanced{
    position:relative!important;
    display:block!important;
    min-height:0!important;
    height:auto!important;
    padding-top:29px!important;
    border-radius:20px!important;
    overflow:hidden!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced::before{
    content:'For you';
    position:absolute;
    left:14px;
    top:10px;
    z-index:40;
    font:700 11px/1 Poppins,system-ui,sans-serif;
    letter-spacing:-.01em;
    color:var(--ink,#0b1e3f);
    pointer-events:none;
  }
  [data-theme='dark'] body:not(.public-landing-active) .home__promo-card.updates-enhanced::before{color:#f6f8fc}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-head{
    position:absolute!important;
    top:4px!important;
    right:8px!important;
    left:auto!important;
    width:auto!important;
    min-height:32px!important;
    padding:0!important;
    z-index:45!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-controls{gap:4px!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-controls button{
    width:30px!important;height:30px!important;min-width:30px!important;border-radius:10px!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-viewport{
    min-height:126px!important;
    height:126px!important;
    overflow-x:auto!important;
    scroll-snap-type:x mandatory!important;
    scrollbar-width:none!important;
    overscroll-behavior-inline:contain!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-viewport::-webkit-scrollbar{display:none!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-track{
    min-height:126px!important;
    height:126px!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-slide{
    min-height:126px!important;
    height:126px!important;
    padding:14px!important;
    scroll-snap-align:start!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-copy{
    max-width:60%!important;
    min-width:0!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-copy>span{
    margin-bottom:4px!important;
    font-size:7px!important;
    letter-spacing:.11em!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-copy>strong{
    max-width:16ch!important;
    font-size:14px!important;
    line-height:1.05!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-copy>small{
    margin-top:5px!important;
    max-width:30ch!important;
    font-size:8px!important;
    line-height:1.3!important;
    display:-webkit-box!important;
    -webkit-line-clamp:2!important;
    -webkit-box-orient:vertical!important;
    overflow:hidden!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-cta{
    margin-top:6px!important;
    font-size:8px!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-image{
    width:42%!important;
    height:100%!important;
    object-fit:cover!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .adoption-slide .update-image{
    width:43%!important;
    object-fit:contain!important;
    object-position:center bottom!important;
    padding:5px 5px 2px 0!important;
    mask-image:linear-gradient(90deg,transparent 0,#000 16%)!important;
    -webkit-mask-image:linear-gradient(90deg,transparent 0,#000 16%)!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .weather-art{
    right:10px!important;
    gap:7px!important;
    min-width:0!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .weather-icon{
    width:48px!important;height:48px!important;border-radius:15px!important;font-size:23px!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .weather-metrics{gap:3px!important;font-size:7px!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .weather-metrics b{font-size:15px!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .weather-source{right:10px!important;bottom:6px!important;font-size:6px!important}
  body:not(.public-landing-active) .home__promo-dots{right:12px!important;bottom:7px!important;gap:4px!important}
  body:not(.public-landing-active) .home__promo-dots button{width:5px!important;height:5px!important}
}

@media (max-width:620px){
  body:not(.public-landing-active) .home__glass{padding:9px!important;border-radius:19px!important}
  body:not(.public-landing-active) .home__glass--showcase{padding:8px!important}
  body:not(.public-landing-active) .bento{gap:7px!important}
  body:not(.public-landing-active) .bento__card{
    min-height:126px!important;
    height:126px!important;
    padding:11px!important;
    border-radius:16px!important;
  }
  body:not(.public-landing-active) .bento__icon{width:28px!important;height:28px!important;min-width:28px!important}
  body:not(.public-landing-active) .bento__title{font-size:11px!important}
  body:not(.public-landing-active) .bento__desc{font-size:8px!important}
  body:not(.public-landing-active) .bento__media{max-height:61px!important;margin-top:6px!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced{padding-top:27px!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-viewport,
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-track,
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-slide{
    min-height:118px!important;height:118px!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-slide{padding:12px!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-copy{max-width:61%!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-copy>strong{font-size:13px!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-copy>small{font-size:7.5px!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .adoption-slide .update-image{width:41%!important}
}

@media (max-width:380px){
  body:not(.public-landing-active) .bento{gap:6px!important}
  body:not(.public-landing-active) .bento__card{height:118px!important;min-height:118px!important;padding:10px!important}
  body:not(.public-landing-active) .bento__desc{-webkit-line-clamp:1!important}
  body:not(.public-landing-active) .bento__media{max-height:54px!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-copy{max-width:63%!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-copy>strong{font-size:12px!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-copy>small{max-width:27ch!important}
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .weather-icon{width:43px!important;height:43px!important;font-size:20px!important}
}
`;
  document.head.appendChild(style);
})();
