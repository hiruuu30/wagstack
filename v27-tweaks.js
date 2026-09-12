(() => {
  const css=`
  .pet-stepper{display:flex!important;align-items:center!important;gap:0!important;overflow:hidden!important}
  .pet-stepper>span{display:flex!important;align-items:center!important;justify-content:center!important;gap:0!important;position:relative!important}
  .pet-stepper>span b{font:700 10px/1 Poppins,sans-serif!important;letter-spacing:0!important}
  .pet-stepper>span .wag-step-arrow{position:absolute;right:-10px;top:50%;transform:translateY(-50%);z-index:5;width:20px;height:20px;display:grid;place-items:center;color:rgba(11,30,63,.38);font:700 18px/1 Poppins,sans-serif;pointer-events:none}
  [data-theme="dark"] .pet-stepper>span .wag-step-arrow{color:rgba(255,255,255,.38)}
  .pet-stepper>span:last-child .wag-step-arrow{display:none}
  .pet-option .wag-service-icon{width:42px;height:42px;flex:0 0 42px;border-radius:13px;display:grid;place-items:center;background:rgba(255,122,26,.09);box-shadow:inset 0 0 0 1px rgba(255,122,26,.22)}
  .pet-option .wag-service-icon img{width:23px;height:23px;display:block;filter:none}
  [data-theme="dark"] .pet-option .wag-service-icon{background:rgba(255,122,26,.13)}
  .pet-edit-photo{position:relative!important;display:grid!important;gap:8px!important}
  .pet-edit-photo>input[type=file]{position:absolute!important;inline-size:1px!important;block-size:1px!important;opacity:0!important;pointer-events:none!important}
  .pet-upload-kicker{font:700 10px/1.2 Poppins,sans-serif;color:var(--muted)}
  .pet-upload-button{min-height:52px;border-radius:16px;display:flex;align-items:center;justify-content:center;gap:9px;padding:0 16px;background:linear-gradient(135deg,rgba(255,255,255,.94),rgba(255,246,238,.92));box-shadow:inset 0 0 0 1px rgba(255,122,26,.28),0 12px 28px -22px rgba(7,31,67,.55);color:#071f43;font:700 11px/1 Poppins,sans-serif;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease,background .18s ease}
  .pet-upload-button:hover{transform:translateY(-1px);box-shadow:inset 0 0 0 1px rgba(255,122,26,.44),0 16px 32px -22px rgba(7,31,67,.65)}
  .pet-upload-button img{width:19px;height:19px}
  [data-theme="dark"] .pet-upload-button{background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,122,26,.08));color:#f4f4ed}
  .pet-upload-button.is-working{opacity:.72;cursor:progress}
  @media(max-width:720px){.pet-stepper>span b{font-size:9px!important}.pet-stepper>span .wag-step-arrow{right:-8px}}
  `;
  const style=document.createElement('style');style.id='wagstack-v27-tweaks';style.textContent=css;document.head.appendChild(style);

  const SERVICE_ICONS={
    'Full Grooming':'/assets/phosphor/scissors-duotone.svg',
    'Bath & Blow Dry':'/assets/phosphor/star-duotone.svg',
    'Nail Trim + Ear Care':'/assets/phosphor/first-aid-kit-duotone.svg',
    'Basic Grooming':'/assets/phosphor/paw-print-duotone.svg'
  };

  function patchGroomingStepper(){
    if(location.pathname!='/grooming')return;
    const stepper=document.querySelector('.pet-stepper');
    if(!stepper)return;
    const labels=['Pet','Service','Schedule','Details','Review'];
    [...stepper.children].forEach((el,i)=>{
      if(el.dataset.v27step)return;
      el.dataset.v27step='1';
      el.innerHTML=`<b>${labels[i]||''}</b>${i<labels.length-1?'<span class="wag-step-arrow" aria-hidden="true">›</span>':''}`;
    });
  }

  function patchServiceIcons(){
    if(location.pathname!='/grooming')return;
    document.querySelectorAll('.pet-option[data-draft-service]').forEach(btn=>{
      if(btn.dataset.v27icon)return;
      const service=btn.dataset.draftService||btn.querySelector('strong')?.textContent?.trim();
      const src=SERVICE_ICONS[service];
      if(!src)return;
      btn.dataset.v27icon='1';
      const first=btn.firstElementChild;
      if(first && first!==btn.querySelector('span')) first.remove();
      btn.insertAdjacentHTML('afterbegin',`<span class="wag-service-icon" aria-hidden="true"><img src="${src}" alt=""></span>`);
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
  const start=()=>{patch();const main=document.getElementById('main-content');if(main)new MutationObserver(patch).observe(main,{childList:true,subtree:false});new MutationObserver(patch).observe(document.body,{childList:true,subtree:false})};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();