import { GROOMING_ICON } from './grooming-icon.js';
import { observeUI } from './ui-lifecycle.js';
(() => {
  const css=`
  .pet-stepper{display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;align-items:stretch!important;gap:8px!important;overflow:visible!important}
  .pet-stepper>span{min-width:0!important;width:auto!important;height:48px!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:0!important;position:relative!important;padding:0 10px!important;text-align:center!important}
  .pet-stepper>span b{font:700 10px/1 Poppins,sans-serif!important;letter-spacing:0!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
  .pet-stepper>span .wag-step-arrow{display:none!important}
  .pet-option .wag-service-icon{width:42px;height:42px;flex:0 0 42px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(145deg,rgba(255,122,26,.16),rgba(255,122,26,.06));box-shadow:inset 0 0 0 1px rgba(255,122,26,.18),0 10px 22px -18px rgba(11,30,63,.55);color:var(--orange);transform-origin:center;transition:transform .34s cubic-bezier(.2,.82,.24,1),background .28s ease,box-shadow .3s ease}
  .pet-option .wag-service-icon .ph-duo{width:22px;height:22px;color:var(--orange)}
  .pet-option .wag-service-icon .ph-duo path[opacity]{opacity:.31}
  @media(hover:hover) and (pointer:fine){.pet-option:hover .wag-service-icon{transform:translateY(-2px) rotate(-3deg) scale(1.045);background:linear-gradient(145deg,rgba(255,122,26,.23),rgba(255,122,26,.08));box-shadow:inset 0 0 0 1px rgba(255,122,26,.24),0 14px 24px -17px rgba(255,122,26,.38)}.pet-option:hover .wag-service-icon .ph-duo{transform:scale(1.06) rotate(2deg)}.pet-option:hover .wag-service-icon .ph-duo path[opacity]{opacity:.58;transform:translate(-2px,2px) scale(1.12) rotate(-4deg)}.pet-option:hover .wag-service-icon .ph-duo path:not([opacity]){transform:translate(1px,-1px) scale(.98)}}
  [data-theme="dark"] .pet-option .wag-service-icon{background:linear-gradient(145deg,rgba(255,122,26,.2),rgba(255,122,26,.08));box-shadow:inset 0 0 0 1px rgba(255,122,26,.22),0 12px 24px -18px rgba(0,0,0,.72)}
  .pet-edit-photo{position:relative!important;display:grid!important;gap:8px!important}
  .pet-edit-photo>input[type=file]{position:absolute!important;inline-size:1px!important;block-size:1px!important;opacity:0!important;pointer-events:none!important}
  .pet-upload-kicker{font:700 10px/1.2 Poppins,sans-serif;color:var(--muted)}
  .pet-upload-button{min-height:52px;border-radius:16px;display:flex;align-items:center;justify-content:center;gap:9px;padding:0 16px;background:linear-gradient(135deg,rgba(255,255,255,.94),rgba(255,246,238,.92));box-shadow:inset 0 0 0 1px rgba(255,122,26,.28),0 12px 28px -22px rgba(7,31,67,.55);color:#071f43;font:700 11px/1 Poppins,sans-serif;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease,background .18s ease}
  .pet-upload-button:hover{transform:translateY(-1px);box-shadow:inset 0 0 0 1px rgba(255,122,26,.44),0 16px 32px -22px rgba(7,31,67,.65)}
  .pet-upload-button img{width:19px;height:19px}
  [data-theme="dark"] .pet-upload-button{background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,122,26,.08));color:#f4f4ed}
  .pet-upload-button.is-working{opacity:.72;cursor:progress}
  @media(max-width:720px){.pet-stepper{gap:5px!important}.pet-stepper>span{height:44px!important;padding:0 5px!important}.pet-stepper>span b{font-size:8px!important}}
  @media(prefers-reduced-motion:reduce){.pet-option .wag-service-icon,.pet-option .wag-service-icon .ph-duo,.pet-option .wag-service-icon .ph-duo path{transition:none!important;animation:none!important;transform:none!important}}
  `;
  const style=document.createElement('style');style.id='branddemo-v27-tweaks';style.textContent=css;document.head.appendChild(style);

  const ICONS={
    brush:`<svg aria-hidden="true" class="ph-duo ph-duo--dynamic" viewBox="0 0 256 256" fill="currentColor"><path d="M56 44h120a16 16 0 0 1 16 16v84a16 16 0 0 1-16 16H56a16 16 0 0 1-16-16V60a16 16 0 0 1 16-16Z" opacity="0.2"/><path d="M176 36H56a24 24 0 0 0-24 24v84a24 24 0 0 0 24 24h52v28a12 12 0 0 0 24 0v-28h44a24 24 0 0 0 24-24V60a24 24 0 0 0-24-24Zm8 108a8 8 0 0 1-8 8H56a8 8 0 0 1-8-8V60a8 8 0 0 1 8-8h120a8 8 0 0 1 8 8Zm-104-68v52a8 8 0 0 1-16 0V76a8 8 0 0 1 16 0Zm32 0v52a8 8 0 0 1-16 0V76a8 8 0 0 1 16 0Zm32 0v52a8 8 0 0 1-16 0V76a8 8 0 0 1 16 0Zm32 0v52a8 8 0 0 1-16 0V76a8 8 0 0 1 16 0Z"/></svg>`,
    star:`<svg aria-hidden="true" class="ph-duo ph-duo--dynamic" viewBox="0 0 256 256" fill="currentColor"><path d="M229.06 108.79l-48.7 42 14.88 62.79a8.4 8.4 0 0 1-12.52 9.17L128 189.09l-54.72 33.65a8.4 8.4 0 0 1-12.52-9.17l14.88-62.79-48.7-42A8.46 8.46 0 0 1 31.73 94l63.91-5.2 24.62-59.6a8.36 8.36 0 0 1 15.48 0l24.62 59.6 63.91 5.2a8.46 8.46 0 0 1 4.79 14.79Z" opacity="0.2"/><path d="M239.18 97.26A16.38 16.38 0 0 0 224.92 86l-59-4.76-22.78-55.09a16.36 16.36 0 0 0-30.27 0L90.11 81.23 31.08 86a16.46 16.46 0 0 0-9.37 28.86l45 38.83L53 211.75a16.38 16.38 0 0 0 24.5 17.82L128 198.49l50.53 31.08A16.4 16.4 0 0 0 203 211.75l-13.76-58.07 45-38.83a16.43 16.43 0 0 0 4.94-17.59Zm-15.34 5.47-48.7 42a8 8 0 0 0-2.56 7.91l14.88 62.8-54.72-33.65a8 8 0 0 0-8.38 0l-54.72 33.65 14.88-62.8a8 8 0 0 0-2.56-7.91l-48.7-42 63.92-5.16A8 8 0 0 0 103 91.86l24.62-59.61L153 91.86a8 8 0 0 0 6.75 4.92Z"/></svg>`,
    scissors:GROOMING_ICON,
    paw:`<svg aria-hidden="true" class="ph-duo ph-duo--dynamic" viewBox="0 0 256 256" fill="currentColor"><path d="M232 108a20 20 0 1 1-20-20 20 20 0 0 1 20 20ZM64 108a20 20 0 1 0-20 20 20 20 0 0 0 20-20ZM92 80a20 20 0 1 0-20-20 20 20 0 0 0 20 20Zm72 0a20 20 0 1 0-20-20 20 20 0 0 0 20 20Zm19.24 75.85A43.46 43.46 0 0 1 162.57 130a36 36 0 0 0-69.14 0 43.49 43.49 0 0 1-20.67 25.9 32 32 0 0 0 27.73 57.62 72.49 72.49 0 0 1 55 0 32 32 0 0 0 27.73-57.62Z" opacity="0.2"/><path d="M212 80a28 28 0 1 0 28 28 28 28 0 0 0-28-28Zm0 40a12 12 0 1 1 12-12 12 12 0 0 1-12 12ZM72 108a28 28 0 1 0-28 28 28 28 0 0 0 28-28Zm-28 12a12 12 0 1 1 12-12 12 12 0 0 1-12 12ZM92 88a28 28 0 1 0-28-28 28 28 0 0 0 28 28Zm0-40A12 12 0 1 1 80 60a12 12 0 0 1 12-12Zm72 40a28 28 0 1 0-28-28 28 28 0 0 0 28 28Zm0-40a12 12 0 1 1-12 12 12 12 0 0 1 12-12Zm23.12 100.86a35.3 35.3 0 0 1-16.87-21.14 44 44 0 0 0-84.5 0A35.25 35.25 0 0 1 69 148.82 40 40 0 0 0 88 224a39.48 39.48 0 0 0 15.52-3.13 64.09 64.09 0 0 1 48.87 0A40 40 0 0 0 187.12 148.86ZM168 208a24 24 0 0 1-9.45-1.93 80.14 80.14 0 0 0-61.19 0 24 24 0 0 1-20.71-43.26 51.22 51.22 0 0 0 24.46-30.67 28 28 0 0 1 53.78 0 51.27 51.27 0 0 0 24.53 30.71A24 24 0 0 1 168 208Z"/></svg>`
  };
  const SERVICE_ICONS={
    'Full Grooming':ICONS.brush,
    'Bath & Blow Dry':ICONS.star,
    'Nail Trim + Ear Care':ICONS.scissors,
    'Basic Grooming':ICONS.paw
  };

  function patchGroomingStepper(){
    if(location.pathname!='/grooming')return;
    const stepper=document.querySelector('.pet-stepper');
    if(!stepper)return;
    const labels=['Pet','Service','Schedule','Details','Review'];
    [...stepper.children].forEach((el,i)=>{
      el.dataset.v27step='1';
      el.innerHTML=`<b>${labels[i]||''}</b>`;
    });
  }

  function patchServiceIcons(){
    if(location.pathname!='/grooming')return;
    document.querySelectorAll('.pet-option[data-draft-service]').forEach(btn=>{
      const service=btn.dataset.draftService||btn.querySelector('strong')?.textContent?.trim();
      const svg=SERVICE_ICONS[service];
      if(!svg)return;
      btn.querySelector('.wag-service-icon')?.remove();
      const first=btn.firstElementChild;
      if(first && !first.matches('strong,.wag-service-icon')) first.remove();
      btn.insertAdjacentHTML('afterbegin',`<span class="wag-service-icon clone-icon--phosphor" aria-hidden="true">${svg}</span>`);
      btn.dataset.v27icon='2';
    });
  }

  function patchPetPhotoPicker(){
    const label=document.querySelector('.pet-edit-photo');
    const input=label?.querySelector('input[type=file][name=photo]');
    if(!label||!input||label.dataset.v27upload)return;
    label.dataset.v27upload='1';
    [...label.childNodes].forEach(n=>{if(n.nodeType===Node.TEXT_NODE)n.remove()});
    const kicker=document.createElement('span');kicker.className='pet-upload-kicker';kicker.textContent='Profile photo';
    const button=document.createElement('span');button.className='pet-upload-button';button.innerHTML='<img src="/assets/phosphor/camera-duotone.svg" alt=""><span>Upload new photo</span>';
    label.insertBefore(kicker,input);label.insertBefore(button,input);
    input.addEventListener('change',()=>{
      if(!input.files?.length)return;
      button.classList.add('is-working');
      button.querySelector('span').textContent='Generating pixel avatar…';
      const form=input.closest('form');
      setTimeout(()=>form?.requestSubmit(),30);
    },{once:true});
  }

  let raf=0;
  function patch(){if(raf)return;raf=requestAnimationFrame(()=>{raf=0;patchGroomingStepper();patchServiceIcons();patchPetPhotoPicker()})}
  document.addEventListener('click',e=>{if(e.target.closest?.('[data-edit-pet-profile],[data-book-next],[data-book-prev],[data-draft-service],[data-draft-pet]'))setTimeout(patch,0)},true);
  addEventListener('popstate',patch);
  const start=()=>{patch();const main=document.getElementById('main-content');observeUI(()=>{patchGroomingStepper();patchServiceIcons();patchPetPhotoPicker()})};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();