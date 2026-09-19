import { observeUI } from './ui-lifecycle.js';

(()=>{
  const STYLE_ID='branddemo-mobile-dashboard-premium';
  const media=window.matchMedia('(max-width:900px)');

  function injectStyles(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
.mobile-health-summary{display:none}

/* Premium dashboard refinement — mobile/tablet only. Desktop >=901px is untouched. */
@media (max-width:900px){
  body:not(.public-landing-active) .shell__panel{
    background:#f6f6f2!important;
    background-image:none!important;
  }
  body:not(.public-landing-active) #main-content{
    background:transparent!important;
    background-image:none!important;
  }
  [data-theme='dark'] body:not(.public-landing-active) .shell__panel{
    background:#071426!important;
  }

  /* Compact app header: identity + account + actions share one deliberate row. */
  body:not(.public-landing-active) .rail{
    width:100%!important;
    height:78px!important;
    min-height:78px!important;
    padding:10px 14px!important;
    overflow:visible!important;
    border-bottom:1px solid rgba(11,30,63,.10)!important;
    background:rgba(255,255,255,.94)!important;
    backdrop-filter:blur(18px) saturate(1.15)!important;
    -webkit-backdrop-filter:blur(18px) saturate(1.15)!important;
  }
  [data-theme='dark'] body:not(.public-landing-active) .rail{
    background:rgba(7,20,38,.94)!important;
    border-bottom-color:rgba(255,255,255,.08)!important;
  }
  body:not(.public-landing-active) .rail__inner{
    width:100%!important;
    height:58px!important;
    min-height:58px!important;
    display:grid!important;
    grid-template-columns:42px minmax(74px,1fr) auto!important;
    grid-template-rows:28px 24px!important;
    column-gap:9px!important;
    row-gap:0!important;
    align-items:center!important;
    justify-items:start!important;
    overflow:visible!important;
  }
  body:not(.public-landing-active) .rail__avatar{
    grid-column:1!important;
    grid-row:1 / span 2!important;
    width:42px!important;
    height:42px!important;
    margin:0!important;
    align-self:center!important;
  }
  body:not(.public-landing-active) .rail__avatar img{
    width:42px!important;
    height:42px!important;
    filter:drop-shadow(0 7px 12px rgba(6,12,26,.18))!important;
  }
  body:not(.public-landing-active) .rail__name{
    grid-column:2!important;
    grid-row:1!important;
    align-self:end!important;
    max-width:100%!important;
    margin:0!important;
    font-size:14px!important;
    line-height:1.08!important;
    letter-spacing:-.02em!important;
    white-space:nowrap!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
  }
  body:not(.public-landing-active) .rail__name [data-owner-name]{
    white-space:nowrap!important;
  }
  body:not(.public-landing-active) .rail__handle{
    display:none!important;
  }
  body:not(.public-landing-active) .wag-rail-auth{
    grid-column:2!important;
    grid-row:2!important;
    align-self:start!important;
    justify-self:start!important;
    width:auto!important;
    min-width:0!important;
    height:21px!important;
    margin:2px 0 0!important;
    padding:0 8px!important;
    gap:5px!important;
    border-radius:999px!important;
    font-size:8px!important;
    line-height:1!important;
    box-shadow:none!important;
  }
  body:not(.public-landing-active) .wag-rail-auth__dot{
    width:5px!important;
    height:5px!important;
  }
  body:not(.public-landing-active) .rail__actions{
    grid-column:3!important;
    grid-row:1 / span 2!important;
    align-self:center!important;
    justify-self:end!important;
    width:auto!important;
    height:auto!important;
    margin:0!important;
    gap:6px!important;
  }
  body:not(.public-landing-active) .rail__social,
  body:not(.public-landing-active) .rail__theme{
    width:36px!important;
    height:36px!important;
    min-width:36px!important;
    min-height:36px!important;
    box-shadow:inset 0 0 0 1px rgba(11,30,63,.12),0 7px 18px -14px rgba(6,12,26,.35)!important;
  }
  [data-theme='dark'] body:not(.public-landing-active) .rail__social,
  [data-theme='dark'] body:not(.public-landing-active) .rail__theme{
    box-shadow:inset 0 0 0 1px rgba(255,255,255,.10)!important;
  }
  body:not(.public-landing-active) .rail__social .ph-duo,
  body:not(.public-landing-active) .rail__theme .tg{
    width:17px!important;
    height:17px!important;
  }
  body:not(.public-landing-active) .rail__nav,
  body:not(.public-landing-active) .rail__copy{
    display:none!important;
  }
  body.wag-signed-out:not(.public-landing-active) .rail__inner{
    grid-template-columns:minmax(0,1fr) auto!important;
  }
  body.wag-signed-out:not(.public-landing-active) .wag-rail-auth{
    grid-column:1!important;
    grid-row:1 / span 2!important;
    align-self:center!important;
  }
  body.wag-signed-out:not(.public-landing-active) .rail__actions{
    grid-column:2!important;
  }

  /* More intentional card surface and rhythm. */
  body:not(.public-landing-active) .home__glass--showcase{
    background:transparent!important;
    box-shadow:none!important;
    backdrop-filter:none!important;
    -webkit-backdrop-filter:none!important;
  }
  body:not(.public-landing-active) .bento{
    gap:8px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card{
    background:rgba(255,255,255,.94)!important;
    box-shadow:inset 0 0 0 1px rgba(11,30,63,.10),0 12px 28px -24px rgba(6,12,26,.28)!important;
  }
  [data-theme='dark'] body:not(.public-landing-active) .bento > .bento__card{
    background:#0e223b!important;
    box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),0 12px 28px -24px rgba(0,0,0,.55)!important;
  }
  body:not(.public-landing-active) .bento__title{
    font-size:12px!important;
    line-height:1.12!important;
    letter-spacing:-.015em!important;
  }
  body:not(.public-landing-active) .bento__desc{
    font-size:8.5px!important;
    line-height:1.35!important;
    color:#69758a!important;
  }
  [data-theme='dark'] body:not(.public-landing-active) .bento__desc{color:#9faec2!important}

  /* Health: replace the busy marquee with a concise, stable care summary. */
  body:not(.public-landing-active) .bento__card[data-summary-card='health'] .bento__chips{
    display:none!important;
  }
  body:not(.public-landing-active) .mobile-health-summary{
    display:flex!important;
    position:absolute!important;
    left:11px!important;
    right:11px!important;
    bottom:11px!important;
    gap:5px!important;
    align-items:center!important;
    flex-wrap:wrap!important;
  }
  body:not(.public-landing-active) .mobile-health-summary span{
    display:inline-flex!important;
    align-items:center!important;
    justify-content:center!important;
    min-width:0!important;
    height:23px!important;
    padding:0 7px!important;
    border-radius:999px!important;
    background:#fff!important;
    color:#0b1e3f!important;
    box-shadow:inset 0 0 0 1px rgba(11,30,63,.12)!important;
    font-size:7.5px!important;
    font-weight:650!important;
    white-space:nowrap!important;
  }
  [data-theme='dark'] body:not(.public-landing-active) .mobile-health-summary span{
    background:#173252!important;
    color:#e8eef8!important;
    box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)!important;
  }

  /* Grooming becomes the clear primary card instead of a large empty rectangle. */
  body:not(.public-landing-active) .bento__card[data-summary-card='grooming']{
    position:relative!important;
    padding-right:calc(43% + 14px)!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='grooming'] .bento__head{
    position:relative!important;
    z-index:3!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='grooming'] .bento__desc{
    margin-top:7px!important;
    max-width:100%!important;
    display:-webkit-box!important;
    -webkit-box-orient:vertical!important;
    -webkit-line-clamp:2!important;
    overflow:hidden!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__reel{
    position:absolute!important;
    right:10px!important;
    top:39px!important;
    bottom:10px!important;
    left:auto!important;
    width:41%!important;
    height:auto!important;
    min-height:0!important;
    border-radius:12px!important;
    overflow:hidden!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__reel-track{
    display:block!important;
    width:100%!important;
    height:100%!important;
    min-height:0!important;
    animation:none!important;
    transform:none!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__reel-track > :not(:first-child){
    display:none!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__shot{
    width:100%!important;
    height:100%!important;
    min-height:0!important;
    padding:0!important;
    border-radius:12px!important;
    background:transparent!important;
    box-shadow:none!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__booking-shot{
    width:100%!important;
    height:100%!important;
    min-height:0!important;
    padding:6px!important;
    gap:6px!important;
    border-radius:11px!important;
    box-shadow:inset 0 0 0 1px rgba(11,30,63,.11),0 8px 18px -16px rgba(6,12,26,.34)!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__booking-pet{
    flex:0 0 38px!important;
    width:38px!important;
    height:38px!important;
    border-radius:9px!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__booking-copy{
    min-width:0!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__booking-copy strong{
    font-size:8px!important;
    white-space:nowrap!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__booking-copy small{
    font-size:6.5px!important;
    line-height:1.25!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__booking-copy em{
    margin-top:3px!important;
    padding:2px 5px!important;
    font-size:5.8px!important;
  }

  /* Keep secondary cards quiet and useful. */
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__desc{
    display:none!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact{
    left:11px!important;
    right:11px!important;
    bottom:10px!important;
    height:48px!important;
    padding:8px 9px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact strong{
    font-size:10px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact span{
    font-size:7px!important;
    line-height:1.2!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='hotel'] .bento__desc{
    white-space:nowrap!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='shop'] .bento__desc{
    display:block!important;
    margin-top:4px!important;
    white-space:nowrap!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
  }

  /* Bottom nav remains persistent but gets a cleaner native-app footprint. */
  body:not(.public-landing-active) .mobile-nav,
  body:not(.public-landing-active) .bottom-nav{
    backdrop-filter:blur(18px) saturate(1.2)!important;
    -webkit-backdrop-filter:blur(18px) saturate(1.2)!important;
  }
}

@media (max-width:620px){
  body:not(.public-landing-active) .rail{
    height:74px!important;
    min-height:74px!important;
    padding:8px 12px!important;
  }
  body:not(.public-landing-active) .rail__inner{
    height:58px!important;
  }
  body:not(.public-landing-active) .bento{
    gap:7px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='grooming']{
    min-height:116px!important;
    height:116px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='health'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='pets']{
    min-height:116px!important;
    height:116px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='hotel'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='rewards']{
    min-height:103px!important;
    height:103px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='shop']{
    min-height:72px!important;
    height:72px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='shop'] > :not(.bento__head){
    display:none!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='pets'] .bento__fan{
    transform:scale(.68)!important;
    transform-origin:50% 4%!important;
    margin-top:4px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='hotel'] .bento__badge{
    left:11px!important;
    right:11px!important;
    bottom:10px!important;
  }
}

@media (max-width:430px){
  body:not(.public-landing-active) .rail__name{
    font-size:13px!important;
  }
  body:not(.public-landing-active) .rail__social,
  body:not(.public-landing-active) .rail__theme{
    width:34px!important;
    height:34px!important;
    min-width:34px!important;
    min-height:34px!important;
  }
  body:not(.public-landing-active) .rail__actions{
    gap:5px!important;
  }
  body:not(.public-landing-active) .home__glass{
    margin-top:7px!important;
  }
  body:not(.public-landing-active) .bento__title{
    font-size:11px!important;
  }
  body:not(.public-landing-active) .bento__desc{
    font-size:8px!important;
  }
  body:not(.public-landing-active) .mobile-health-summary{
    left:9px!important;
    right:9px!important;
    bottom:9px!important;
    gap:4px!important;
  }
  body:not(.public-landing-active) .mobile-health-summary span{
    height:21px!important;
    padding:0 6px!important;
    font-size:7px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='grooming']{
    padding-right:calc(45% + 11px)!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__reel{
    right:9px!important;
    top:36px!important;
    bottom:9px!important;
    width:43%!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__booking-pet{
    flex-basis:34px!important;
    width:34px!important;
    height:34px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='hotel'] .bento__badge-tag{
    font-size:8px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='shop']{
    padding-top:10px!important;
    padding-bottom:10px!important;
  }
}

@media (max-width:360px){
  body:not(.public-landing-active) .rail{
    height:70px!important;
    min-height:70px!important;
    padding:7px 10px!important;
  }
  body:not(.public-landing-active) .rail__inner{
    height:56px!important;
    grid-template-columns:38px minmax(68px,1fr) auto!important;
    grid-template-rows:27px 22px!important;
    column-gap:7px!important;
  }
  body:not(.public-landing-active) .rail__avatar,
  body:not(.public-landing-active) .rail__avatar img{
    width:38px!important;
    height:38px!important;
  }
  body:not(.public-landing-active) .rail__name{
    font-size:12px!important;
  }
  body:not(.public-landing-active) .wag-rail-auth{
    height:19px!important;
    margin-top:1px!important;
    padding:0 7px!important;
    font-size:7.5px!important;
  }
  body:not(.public-landing-active) .rail__social,
  body:not(.public-landing-active) .rail__theme{
    width:31px!important;
    height:31px!important;
    min-width:31px!important;
    min-height:31px!important;
  }
  body:not(.public-landing-active) .rail__social .ph-duo,
  body:not(.public-landing-active) .rail__theme .tg{
    width:15px!important;
    height:15px!important;
  }
  body:not(.public-landing-active) .rail__actions{
    gap:4px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='grooming']{
    min-height:106px!important;
    height:106px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='health'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='pets']{
    min-height:104px!important;
    height:104px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='hotel'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='rewards']{
    min-height:94px!important;
    height:94px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='shop']{
    min-height:62px!important;
    height:62px!important;
  }
  body:not(.public-landing-active) .bento__title{
    font-size:10.25px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='grooming'] .bento__desc{
    display:none!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='health'] .bento__desc,
  body:not(.public-landing-active) .bento__card[data-summary-card='pets'] .bento__desc,
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__desc{
    display:none!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='hotel'] .bento__desc,
  body:not(.public-landing-active) .bento__card[data-summary-card='shop'] .bento__desc{
    display:block!important;
    font-size:7px!important;
    -webkit-line-clamp:1!important;
  }
  body:not(.public-landing-active) .mobile-health-summary{
    left:8px!important;
    right:8px!important;
    bottom:8px!important;
    gap:3px!important;
    flex-wrap:nowrap!important;
  }
  body:not(.public-landing-active) .mobile-health-summary span{
    height:20px!important;
    padding:0 5px!important;
    font-size:6.5px!important;
    flex:1 1 0!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='pets'] .bento__fan{
    transform:scale(.58)!important;
    transform-origin:50% 0!important;
    margin-top:2px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='hotel'] .bento__badge{
    left:8px!important;
    right:8px!important;
    bottom:7px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact{
    left:8px!important;
    right:8px!important;
    bottom:7px!important;
    height:41px!important;
    padding:6px 7px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact strong{
    font-size:9px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact span{
    font-size:6.2px!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__reel{
    right:8px!important;
    top:34px!important;
    bottom:8px!important;
    width:44%!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__booking-pet{
    flex-basis:31px!important;
    width:31px!important;
    height:31px!important;
  }
  body:not(.public-landing-active) .bento__card--projects .bento__booking-copy small,
  body:not(.public-landing-active) .bento__card--projects .bento__booking-copy em{
    display:none!important;
  }
}
`;
    document.head.appendChild(style);
  }

  function ensureHealthSummary(){
    if(!media.matches)return;
    const card=document.querySelector('.bento__card[data-summary-card="health"]');
    if(!card||card.querySelector('.mobile-health-summary'))return;
    const summary=document.createElement('div');
    summary.className='mobile-health-summary';
    summary.setAttribute('aria-hidden','true');
    summary.innerHTML='<span>Vaccines</span><span>Deworm</span><span>Flea/Tick</span>';
    card.appendChild(summary);
  }

  function patch(){
    injectStyles();
    ensureHealthSummary();
  }

  patch();
  observeUI(patch);
  media.addEventListener?.('change',patch);
})();
