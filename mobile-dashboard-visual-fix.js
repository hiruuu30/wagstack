(()=>{
  if (document.getElementById('branddemo-mobile-dashboard-visual-fix')) return;
  const style=document.createElement('style');
  style.id='branddemo-mobile-dashboard-visual-fix';
  style.textContent=`
/* Visual-QA corrections. Mobile/tablet only; desktop >=901px remains untouched. */
@media (max-width:900px){
  body:not(.public-landing-active) .bento > .bento__card{
    grid-column:auto!important;
    grid-row:auto!important;
    width:auto!important;
    max-width:none!important;
    align-self:stretch!important;
    justify-self:stretch!important;
    box-sizing:border-box!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='grooming'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='shop']{
    grid-column:1 / -1!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='health'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='pets'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='hotel'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='rewards']{
    grid-column:auto!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='shop']{
    min-height:118px!important;
    height:118px!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-adoption-art{
    display:flex!important;
    align-items:flex-end!important;
    justify-content:center!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-adoption-art img{
    display:block!important;
    width:auto!important;
    height:100%!important;
    max-width:100%!important;
    object-fit:contain!important;
    object-position:center bottom!important;
  }
}

@media (max-width:620px){
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='grooming']{
    min-height:120px!important;
    height:120px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='shop']{
    min-height:104px!important;
    height:104px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='shop'] > :not(.bento__head){
    display:none!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .adoption-slide .update-copy>small{
    -webkit-line-clamp:1!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .adoption-slide .update-cta{
    margin-top:4px!important;
    font-size:0!important;
    gap:5px!important;
    white-space:nowrap!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .adoption-slide .update-cta::before{
    content:'Learn more';
    font-size:8px!important;
    line-height:1!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .adoption-slide .update-cta>span{
    font-size:8px!important;
    line-height:1!important;
  }
}

@media (max-width:400px){
  body:not(.public-landing-active) .bento{
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
    grid-auto-flow:row!important;
    grid-auto-rows:auto!important;
    align-items:stretch!important;
  }
  body:not(.public-landing-active) .bento > .bento__card{
    min-height:112px!important;
    height:112px!important;
    padding:9px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='grooming']{
    grid-column:1 / -1!important;
    min-height:108px!important;
    height:108px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='shop']{
    grid-column:1 / -1!important;
    min-height:76px!important;
    height:76px!important;
  }
  body:not(.public-landing-active) .bento__head{
    gap:5px!important;
  }
  body:not(.public-landing-active) .bento__label{
    gap:5px!important;
  }
  body:not(.public-landing-active) .bento__icon{
    width:25px!important;
    min-width:25px!important;
    height:25px!important;
    border-radius:8px!important;
  }
  body:not(.public-landing-active) .bento__icon svg{
    width:14px!important;
    height:14px!important;
  }
  body:not(.public-landing-active) .bento__title{
    font-size:10px!important;
    line-height:1.12!important;
  }
  body:not(.public-landing-active) .bento__desc{
    display:none!important;
  }
  body:not(.public-landing-active) .bento__arrow{
    width:10px!important;
    height:10px!important;
  }
  body:not(.public-landing-active) .bento__media{
    margin-top:5px!important;
    max-height:63px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='health'] .bento__chips{
    height:52px!important;
    margin-top:6px!important;
    overflow:hidden!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='health'] .bento__chip-row{
    height:23px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='health'] .bento__chip-row:nth-child(n+2){
    display:none!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='health'] .bento__chip{
    height:21px!important;
    padding:0 6px!important;
    font-size:6.8px!important;
    gap:3px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='pets'] .bento__fan{
    transform:scale(.61)!important;
    transform-origin:50% 0!important;
    margin-top:3px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='hotel'] .bento__badge{
    left:9px!important;
    right:9px!important;
    bottom:9px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='hotel'] .bento__badge-tag{
    font-size:8px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact{
    left:9px!important;
    right:9px!important;
    bottom:8px!important;
    height:43px!important;
    padding:7px 8px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact strong{
    font-size:9px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact span{
    font-size:6.6px!important;
  }

  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-copy>small{
    display:none!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-copy>strong{
    font-size:12.5px!important;
    max-width:14ch!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .update-cta{
    margin-top:8px!important;
    white-space:nowrap!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-viewport,
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-track,
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-slide{
    min-height:116px!important;
    height:116px!important;
  }
  body:not(.public-landing-active) .home__promo-card.updates-enhanced .home__promo-slide{
    padding:11px!important;
  }
}

@media (max-width:340px){
  body:not(.public-landing-active) .bento{
    gap:6px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card{
    min-height:106px!important;
    height:106px!important;
    padding:8px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='grooming']{
    min-height:104px!important;
    height:104px!important;
  }
  body:not(.public-landing-active) .bento__title{
    font-size:9.5px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='pets'] .bento__fan{
    transform:scale(.55)!important;
  }
}
`;
  document.head.appendChild(style);
})();
