import { observeUI } from './ui-lifecycle.js';

(()=>{
  const STYLE_ID='branddemo-mobile-dashboard-premium-v2';
  const media=window.matchMedia('(max-width:900px)');
  const compact=window.matchMedia('(max-width:620px)');

  function injectStyles(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
.mobile-grooming-next{display:none}

@media (max-width:900px){
  /* Calm the decorative canvas on small screens so content owns the hierarchy. */
  body:not(.public-landing-active) .hero-canvas{opacity:.07!important}

  /* Keep the complete action cluster in one row, including Cart at 320px. */
  body:not(.public-landing-active) .rail__socials{
    width:auto!important;
    height:auto!important;
    display:flex!important;
    align-items:center!important;
    gap:6px!important;
    overflow:visible!important;
  }

  /* Remove inherited desktop row geometry from the dashboard grid. */
  body:not(.public-landing-active) .bento{
    grid-template-rows:none!important;
    grid-auto-rows:auto!important;
    grid-auto-flow:row!important;
    align-items:start!important;
  }

  /* Rewards needs an explicit mobile container; desktop supplied this only at >=901px. */
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards']{
    position:relative!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact{
    position:absolute!important;
    left:11px!important;
    right:11px!important;
    bottom:10px!important;
    height:48px!important;
    padding:8px 9px!important;
    border-radius:13px!important;
    background:rgba(255,255,255,.82)!important;
    box-shadow:inset 0 0 0 1px rgba(11,30,63,.10)!important;
    display:grid!important;
    align-content:center!important;
    gap:2px!important;
    overflow:hidden!important;
  }
  [data-theme='dark'] body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact{
    background:#173252!important;
    box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact strong,
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact span{
    display:block!important;
    white-space:nowrap!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
  }

  /* Tablet widths were still inheriting an oversized middle row. */
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='health'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='pets']{
    height:150px!important;
    min-height:150px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='hotel'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='rewards']{
    height:128px!important;
    min-height:128px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='shop']{
    height:108px!important;
    min-height:108px!important;
  }
}

@media (max-width:620px){
  /* Use a purpose-built next-appointment treatment rather than squeezing the desktop reel. */
  body:not(.public-landing-active) .bento__card--projects .bento__reel{display:none!important}
  body:not(.public-landing-active) .mobile-grooming-next{
    position:absolute!important;
    right:9px!important;
    top:38px!important;
    bottom:9px!important;
    width:42%!important;
    min-width:0!important;
    display:grid!important;
    grid-template-columns:34px minmax(0,1fr)!important;
    align-items:center!important;
    gap:7px!important;
    padding:6px!important;
    border-radius:12px!important;
    background:rgba(255,255,255,.88)!important;
    box-shadow:inset 0 0 0 1px rgba(11,30,63,.10),0 8px 18px -16px rgba(6,12,26,.35)!important;
    overflow:hidden!important;
  }
  [data-theme='dark'] body:not(.public-landing-active) .mobile-grooming-next{
    background:#173252!important;
    box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)!important;
  }
  body:not(.public-landing-active) .mobile-grooming-next__thumb{
    width:34px!important;
    height:34px!important;
    border-radius:9px!important;
    object-fit:cover!important;
    background:#eef2f6!important;
  }
  body:not(.public-landing-active) .mobile-grooming-next__copy{
    min-width:0!important;
    display:grid!important;
    gap:2px!important;
  }
  body:not(.public-landing-active) .mobile-grooming-next__copy strong{
    display:block!important;
    min-width:0!important;
    color:var(--ink,#0b1e3f)!important;
    font-size:8px!important;
    line-height:1.15!important;
    white-space:nowrap!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
  }
  [data-theme='dark'] body:not(.public-landing-active) .mobile-grooming-next__copy strong{color:#f4f7fb!important}
  body:not(.public-landing-active) .mobile-grooming-next__copy small{
    display:block!important;
    min-width:0!important;
    color:#6c788b!important;
    font-size:6.2px!important;
    line-height:1.2!important;
    white-space:nowrap!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
  }
  [data-theme='dark'] body:not(.public-landing-active) .mobile-grooming-next__copy small{color:#a8b5c7!important}
  body:not(.public-landing-active) .mobile-grooming-next__status{
    display:inline-flex!important;
    width:max-content!important;
    max-width:100%!important;
    align-items:center!important;
    gap:3px!important;
    color:#25845a!important;
    font-size:5.8px!important;
    font-weight:750!important;
    line-height:1!important;
    text-transform:uppercase!important;
    letter-spacing:.035em!important;
    white-space:nowrap!important;
  }
  body:not(.public-landing-active) .mobile-grooming-next__status::before{
    content:'';
    width:4px!important;
    height:4px!important;
    border-radius:50%!important;
    background:currentColor!important;
    flex:0 0 auto!important;
  }
  body:not(.public-landing-active) .mobile-grooming-next__status.is-pending{color:#c35a08!important}

  /* Compact Shop becomes a useful route, not an empty block. */
  body:not(.public-landing-active) .bento__card[data-summary-card='shop']::after{
    content:'Browse shop  →';
    position:absolute!important;
    right:11px!important;
    top:50%!important;
    transform:translateY(-50%)!important;
    color:#ff7a1a!important;
    font-size:7.5px!important;
    font-weight:750!important;
    line-height:1!important;
    pointer-events:none!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='shop'] .bento__head{
    padding-right:74px!important;
  }

  /* Keep the intentionally compact mobile heights after the tablet overrides above. */
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='grooming']{
    height:116px!important;min-height:116px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='health'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='pets']{
    height:116px!important;min-height:116px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='hotel'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='rewards']{
    height:103px!important;min-height:103px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='shop']{
    height:72px!important;min-height:72px!important;
  }
}

@media (max-width:360px){
  body:not(.public-landing-active) .rail__socials{gap:3px!important}
  body:not(.public-landing-active) .rail__social,
  body:not(.public-landing-active) .rail__theme{
    width:28px!important;height:28px!important;min-width:28px!important;min-height:28px!important;
  }
  body:not(.public-landing-active) .rail__social .ph-duo,
  body:not(.public-landing-active) .rail__theme .tg{width:14px!important;height:14px!important}

  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='grooming']{
    height:106px!important;min-height:106px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='health'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='pets']{
    height:104px!important;min-height:104px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='hotel'],
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='rewards']{
    height:94px!important;min-height:94px!important;
  }
  body:not(.public-landing-active) .bento > .bento__card[data-summary-card='shop']{
    height:62px!important;min-height:62px!important;
  }

  body:not(.public-landing-active) .bento__card[data-summary-card='grooming'] .bento__desc{
    display:-webkit-box!important;
    margin-top:5px!important;
    font-size:7px!important;
    line-height:1.25!important;
    -webkit-line-clamp:2!important;
    -webkit-box-orient:vertical!important;
    overflow:hidden!important;
  }
  body:not(.public-landing-active) .mobile-grooming-next{
    right:8px!important;
    top:36px!important;
    bottom:8px!important;
    width:43%!important;
    grid-template-columns:30px minmax(0,1fr)!important;
    gap:5px!important;
    padding:5px!important;
  }
  body:not(.public-landing-active) .mobile-grooming-next__thumb{width:30px!important;height:30px!important}
  body:not(.public-landing-active) .mobile-grooming-next__copy strong{font-size:7.2px!important}
  body:not(.public-landing-active) .mobile-grooming-next__copy small{display:none!important}
  body:not(.public-landing-active) .mobile-grooming-next__status{font-size:5.2px!important}

  /* Health stays readable by using two rows instead of three microscopic chips. */
  body:not(.public-landing-active) .mobile-health-summary{
    display:flex!important;
    flex-wrap:wrap!important;
    gap:3px!important;
    left:8px!important;
    right:8px!important;
    bottom:7px!important;
  }
  body:not(.public-landing-active) .mobile-health-summary span{
    height:19px!important;
    font-size:6.9px!important;
    padding:0 5px!important;
    flex:1 1 calc(50% - 2px)!important;
  }
  body:not(.public-landing-active) .mobile-health-summary span:nth-child(3){
    flex:0 0 64%!important;
    margin:0 auto!important;
  }

  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact{
    left:8px!important;right:8px!important;bottom:7px!important;height:41px!important;padding:6px 7px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact strong{font-size:9.5px!important}
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact span{
    font-size:0!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='rewards'] .bento__reward-compact span::after{
    content:'80 → 200 pts';
    font-size:6.8px!important;
    color:#ff7a1a!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='shop']::after{
    right:9px!important;
    font-size:7px!important;
  }
  body:not(.public-landing-active) .bento__card[data-summary-card='shop'] .bento__head{padding-right:66px!important}
}
`;
    document.head.appendChild(style);
  }

  function parseGroomingSummary(card){
    const raw=(card.querySelector('[data-summary="grooming"]')?.textContent||'').trim();
    const pieces=raw.split('·').map(s=>s.trim()).filter(Boolean);
    const service=pieces[0]||'Next grooming';
    const status=pieces.length>1 ? pieces[pieces.length-1].replace(/[.]+$/,'') : '';
    const meta=pieces.length>2 ? pieces.slice(1,-1).join(' · ') : (pieces[1]||'Upcoming visit');
    return {service,meta,status};
  }

  function ensureGroomingNext(){
    if(!media.matches)return;
    const card=document.querySelector('.bento__card[data-summary-card="grooming"]');
    if(!card)return;
    if(!card.querySelector('.bento__booking-pet')){card.querySelector('.mobile-grooming-next')?.remove();return;}
    let mini=card.querySelector('.mobile-grooming-next');
    if(!mini){
      mini=document.createElement('div');
      mini.className='mobile-grooming-next';
      mini.setAttribute('aria-hidden','true');
      const img=document.createElement('img');
      img.className='mobile-grooming-next__thumb';
      img.alt='';
      const copy=document.createElement('span');
      copy.className='mobile-grooming-next__copy';
      const strong=document.createElement('strong');
      const small=document.createElement('small');
      const status=document.createElement('span');
      status.className='mobile-grooming-next__status';
      copy.append(strong,small,status);
      mini.append(img,copy);
      card.appendChild(mini);
    }
    const {service,meta,status}=parseGroomingSummary(card);
    const source=card.querySelector('.bento__booking-pet')?.getAttribute('src') || document.querySelector('.pet-switcher img,.pet-card img')?.getAttribute('src') || '/assets/pet-bubbles.png';
    const img=mini.querySelector('.mobile-grooming-next__thumb');
    if(img&&img.getAttribute('src')!==source)img.setAttribute('src',source);
    mini.querySelector('strong').textContent=service;
    mini.querySelector('small').textContent=meta;
    const statusEl=mini.querySelector('.mobile-grooming-next__status');
    statusEl.textContent=status||'Upcoming';
    statusEl.classList.toggle('is-pending',/pending/i.test(status));
  }

  function patch(){
    injectStyles();
    ensureGroomingNext();
  }

  patch();
  observeUI(patch);
  media.addEventListener?.('change',patch);
  compact.addEventListener?.('change',patch);
})();
