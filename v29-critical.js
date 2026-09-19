import { observeUI } from './ui-lifecycle.js';
(() => {
  const css=`
  /* Critical: Updates hierarchy must never collide */
  .home__promo-card{position:relative!important;display:grid!important;grid-template-rows:auto 1fr!important;padding:0!important;overflow:hidden!important}
  .home__promo-card .home__promo-head{position:relative!important;inset:auto!important;z-index:30!important;display:flex!important;align-items:center!important;justify-content:space-between!important;min-height:42px!important;padding:16px 26px 4px!important;pointer-events:none!important}
  .home__promo-card .home__promo-head .bento__title{display:block!important;margin:0!important;font-size:13px!important;line-height:1!important}
  .home__promo-card.updates-enhanced .home__promo-head{justify-content:flex-end!important}
  .home__promo-card.updates-enhanced .home__promo-head .bento__title{display:none!important}
  .home__promo-card .home__promo-controls{pointer-events:auto!important}
  .home__promo-card .home__promo-viewport{grid-row:2!important;min-height:128px!important;height:auto!important;margin:0!important;overflow-x:auto!important}
  .home__promo-card .home__promo-track{min-height:128px!important;height:100%!important}
  .home__promo-card .home__promo-slide{min-height:128px!important;padding:14px 32px 24px!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;align-items:flex-start!important}
  .home__promo-card .home__promo-slide>span{display:block!important;margin:0 0 8px!important;font-size:8px!important;line-height:1.1!important;letter-spacing:.12em!important}
  .home__promo-card .home__promo-slide>strong{display:block!important;margin:0!important;font-size:15px!important;line-height:1.22!important}
  .home__promo-card .home__promo-slide>small{display:block!important;margin:7px 0 0!important;line-height:1.45!important}

  /* Critical: step labels only — no numeric prefix */
  .pet-stepper>span{font-size:0!important}
  .pet-stepper>span>b{display:block!important;font-size:10px!important;line-height:1!important}
  @media(max-width:720px){.pet-stepper>span>b{font-size:8px!important}}
  `;
  const style=document.createElement('style');
  style.id='branddemo-v29-critical';
  style.textContent=css;
  document.head.appendChild(style);

  const cleanStepper=()=>{
    document.querySelectorAll('.pet-stepper').forEach(stepper=>{
      [...stepper.children].forEach(el=>{
        const b=el.querySelector('b');
        const raw=(b?.textContent||el.textContent||'').trim();
        const label=raw.replace(/^\d+\s*/,'');
        if(!label)return;
        if(el.childNodes.length!==1 || el.firstElementChild?.tagName!=='B' || el.firstElementChild.textContent!==label){
          const nb=document.createElement('b');nb.textContent=label;el.replaceChildren(nb);
        }
      });
    });
  };

  const fixUpdates=()=>{
    const card=document.querySelector('.home__promo-card');
    if(!card)return;
    const title=card.querySelector('.home__promo-head .bento__title');
    if(title){
      if(card.classList.contains('updates-enhanced')){
        title.hidden=true;
        title.setAttribute('aria-hidden','true');
      }else{
        title.hidden=false;
        title.removeAttribute('aria-hidden');
        if(title.textContent!=='Updates') title.textContent='Updates';
      }
    }
    card.querySelectorAll('.home__promo-label').forEach(n=>n.remove());
  };

  let queued=false;
  const patch=()=>{queued=false;cleanStepper();fixUpdates()};
  const queue=()=>{if(queued)return;queued=true;requestAnimationFrame(patch)};
  patch();
  observeUI(patch);
  addEventListener('popstate',queue);
  document.addEventListener('click',()=>setTimeout(queue,0),true);
})();
