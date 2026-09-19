import { observeUI } from './ui-lifecycle.js';

const style=document.createElement('style');
style.id='wag-production-polish';
style.textContent=`
:root{--wag-focus:#bd520b;--wag-status-bg:#fff;--wag-status-text:#10233f}
[data-theme=dark] body:not(.wag-public-mode){background:#09192c!important}
[data-theme=dark]{--wag-focus:#ffad71;--wag-status-bg:#142b44;--wag-status-text:#f5f7fb}
:where(button,a,input,select,textarea,summary):focus-visible{outline:2px solid var(--wag-focus);outline-offset:3px}
:where(button,a,input,select,textarea){-webkit-tap-highlight-color:transparent}
.wag-auth button:focus-visible,.wa button:focus-visible,.wa select:focus-visible{outline:2px solid var(--wag-focus)!important;outline-offset:3px}
.wag-auth-msg{overflow-wrap:anywhere}
.wag-empty-pets{font:500 12px/1.4 Poppins,sans-serif;align-self:center;color:var(--wag-status-text)}
@media(max-width:360px){.bento__card[data-summary-card='rewards'] .bento__reward-compact span::after{content:attr(data-progress)!important}}
.wag-save-status{position:fixed;z-index:11000;left:50%;bottom:20px;transform:translateX(-50%);width:max-content;max-width:calc(100% - 32px);display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--wag-status-bg);color:var(--wag-status-text);border:1px solid var(--wag-focus);border-radius:16px;font:500 13px/1.4 Poppins,sans-serif;box-shadow:0 8px 28px #0002}
.wag-save-status[hidden]{display:none}.wag-save-status button{flex-shrink:0;min-height:40px;border:0;border-radius:10px;background:#10233f;color:#fff;padding:8px 12px;font:inherit;cursor:pointer}
.wa,.wa-side,.wa-main,.wa-view,.wa-panel{min-width:0;max-width:100%}
.wa-side{align-self:start}.wa-empty{text-align:left!important}
.wa-tablewrap{max-width:100%;overflow-x:auto;overscroll-behavior-x:contain}
.wa-top,.wa-titlebar,.wa-actions{flex-wrap:wrap}
.wa-table td,.wa-table td strong{font-size:13px!important}.wa-table th,.wa-owner,.wa-nav button{font-size:12px!important}.wa-select{font-size:12px!important;min-height:40px!important}
@media(max-width:900px){.wa-side{height:auto!important;min-height:0!important;padding-bottom:16px!important}.wa-nav{display:flex!important;flex-wrap:wrap!important}.wa-nav button{flex:1 0 28%}.wa-exit{position:static!important;width:100%;margin-top:16px}.wa{grid-template-columns:minmax(0,1fr)!important}.wa-side{width:100%!important}.wa-nav{max-width:100%;overflow-x:auto}.wa-nav button{flex-shrink:0}.wa-top{gap:12px}.wa-top h1{overflow-wrap:anywhere}}
[data-theme=dark] .home__promo-card.updates-enhanced .weather-slide{background:#17314f!important;color:#f4f7fb!important}
[data-theme=dark] .weather-metrics{color:#f4f7fb!important}
.weather-icon svg{width:70%;height:70%;color:#c95f13}
.wa-cm-dialog{background:var(--wag-status-bg)!important;color:var(--wag-status-text)!important}
[data-theme=dark] .wa-cm-field input,[data-theme=dark] .wa-cm-field textarea{background:#17314f!important;color:#f4f7fb!important;border-color:#61738b!important}
@media(max-width:900px){.wag-save-status{bottom:calc(82px + env(safe-area-inset-bottom))}.wag-auth-close{min-width:40px}.pet-input,.wag-addpet input,.wag-addpet select{font-size:16px!important}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}}
html.a11y-reduce-motion{scroll-behavior:auto!important}
`;
document.head.appendChild(style);

let notice;
window.addEventListener('branddemo:save-state',event=>{
  if(location.pathname==='/admin')return;
  const state=event.detail.state;
  if(!notice&&state==='error'){
    notice=document.createElement('aside');notice.className='wag-save-status';notice.setAttribute('role','status');
    notice.innerHTML='<span>Couldn’t sync your account. Check your connection.</span><button type="button">Retry</button>';
    notice.querySelector('button').onclick=async()=>{const button=notice.querySelector('button');button.disabled=true;await window.YourBrandNormalized?.initialize?.();button.disabled=false;};
    document.body.appendChild(notice);
  }
  if(notice)notice.hidden=state!=='error';
});

// The app uses several custom dialogs; give each the same keyboard behavior.
const tracked=new Map();
function polishDialogs(){
  for(const [panel,record] of tracked){if(!panel.isConnected){tracked.delete(panel);if(record.returnFocus?.isConnected)record.returnFocus.focus();}}
  for(const panel of document.querySelectorAll('.pet-modal__panel,.pet-edit-modal,.wag-addpet,.v27-editor__card,.wa-cm-dialog')){
    if(tracked.has(panel))continue;
    const returnFocus=document.activeElement;tracked.set(panel,{returnFocus});
    panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.tabIndex=-1;
    const heading=panel.querySelector('h2,h3');if(heading&&!panel.getAttribute('aria-label'))panel.setAttribute('aria-label',heading.textContent.trim());
    const close=()=>panel.querySelector('[data-booking-editor-close],[data-health-editor-close],[data-close-pet-editor],[data-addpet-cancel],[data-v27-editor-cancel],[data-cm-cancel]')?.click();
    panel.addEventListener('keydown',event=>{
      if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close();return;}
      if(event.key!=='Tab')return;
      const items=[...panel.querySelectorAll('input:not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),a[href]')].filter(el=>el.getClientRects().length);
      if(!items.length){event.preventDefault();panel.focus();return;}
      if(event.shiftKey&&(document.activeElement===items[0]||document.activeElement===panel)){event.preventDefault();items.at(-1).focus();}
      else if(!event.shiftKey&&document.activeElement===items.at(-1)){event.preventDefault();items[0].focus();}
    });
    requestAnimationFrame(()=>{if(panel.isConnected)(panel.querySelector('input:not([type=hidden]),select,textarea,button')||panel).focus()});
  }
}
observeUI(polishDialogs);

function polishAccountSummary(){
  if(location.pathname!=='/')return;
  let state;try{state=JSON.parse(localStorage.getItem('brand-demo-workspace-v1')||'{}')}catch{return}
  const pets=Array.isArray(state.pets)?state.pets:[];
  const fan=document.querySelector('.bento__fan');
  const signature=JSON.stringify(pets.map(p=>[p.name,p.image]));
  if(fan&&fan.dataset.pets!==signature){
    fan.dataset.pets=signature;fan.replaceChildren();
    if(!pets.length){fan.removeAttribute('aria-hidden');const label=document.createElement('span');label.className='wag-empty-pets';label.textContent='No pets yet';fan.append(label);}
    else{fan.setAttribute('aria-hidden','true');pets.slice(0,3).forEach((pet,index)=>{const frame=document.createElement('span');frame.className='bento__photo';frame.style.setProperty('--i',index);const img=document.createElement('img');img.src=pet.image||'/assets/phosphor/paw-print-duotone.svg';img.alt='';img.decoding='async';frame.append(img);fan.append(frame);});}
  }
  const progress=document.querySelector('.bento__reward-compact span');
  if(progress){const points=Number(state.points||0);const label=points>=200?'Milestone reached':`${200-points} to 200 points`;if(progress.dataset.progress!==label)progress.dataset.progress=label;}
}
observeUI(polishAccountSummary);
