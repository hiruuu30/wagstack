(() => {
  const TYPES=['Vaccinations','Deworming','Flea & Tick','Allergy','Medication','Surgery','Condition','Vet Visit','Weight Record','Dental Care','Lab / Test Result','Other'];
  const ICONS={'Vaccinations':'syringe','Deworming':'worm','Flea & Tick':'bug','Allergy':'warning-circle','Medication':'pill','Surgery':'bandaids','Condition':'heartbeat','Vet Visit':'stethoscope','Weight Record':'scales','Dental Care':'tooth','Lab / Test Result':'test-tube','Other':'heart'};
  const STORE_KEY='tfa-clone-workspace-v3';

  const css=`
  .home__promo-card{isolation:isolate!important;overflow:hidden!important;background:linear-gradient(112deg,rgba(255,255,255,.78),rgba(226,236,255,.72))!important;box-shadow:inset 0 0 0 1px rgba(11,30,63,.13),0 18px 45px -34px rgba(11,30,63,.35)!important}
  [data-theme="dark"] .home__promo-card{background:linear-gradient(112deg,rgba(21,43,78,.9),rgba(8,27,55,.88))!important}
  .home__promo-viewport,.home__promo-track,.home__promo-slide{background:transparent!important;box-shadow:none!important;border:0!important}
  .home__promo-slide{padding:54px 34px 26px!important;min-height:174px!important}
  .home__promo-slide>.home__promo-label,.home__promo-card>.home__promo-label{display:none!important}
  .home__promo-head .bento__title{display:block!important;position:relative!important;z-index:12!important}
  .home__promo-slide>span{margin-top:0!important}
  .home__promo-controls{z-index:15!important}

  a.bento__card[href="/health"]{overflow:hidden!important}
  a.bento__card[href="/health"] .bento__desc{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;max-width:84%!important;margin-bottom:60px!important;line-height:1.3!important}
  a.bento__card[href="/health"] .bento__chips{position:absolute!important;left:12px!important;right:12px!important;bottom:9px!important;height:54px!important;overflow:hidden!important;display:block!important;mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
  .health-marquee-stack{display:grid;gap:5px}
  .health-marquee{display:flex;width:max-content;gap:7px;animation:wag-health-marquee 11s linear infinite;animation-play-state:paused;will-change:transform}
  .health-marquee--reverse{animation-direction:reverse;transform:translateX(-18%)}
  @media(hover:hover) and (pointer:fine){a.bento__card[href="/health"]:hover .health-marquee{animation-play-state:running}}
  @media(hover:none){.health-marquee{animation-play-state:running}}
  .health-marquee .bento__chip{flex:0 0 auto!important;display:inline-flex!important;align-items:center!important;gap:5px!important;white-space:nowrap!important;height:24px!important;padding:0 10px!important}
  .health-marquee .bento__chip svg,.health-marquee .clone-icon{width:13px!important;height:13px!important;min-width:13px!important;background:transparent!important;box-shadow:none!important;padding:0!important;color:var(--ink)!important}
  @keyframes wag-health-marquee{to{transform:translateX(-50%)}}

  .bento__card--about .bento__fan{top:62px!important;bottom:auto!important}

  .pet-health-add{overflow:visible!important;z-index:4!important}
  .pet-health-picker{position:relative!important;z-index:40!important;overflow:visible!important}
  .pet-health-picker>summary{cursor:pointer!important;pointer-events:auto!important;user-select:none!important;position:relative!important;z-index:42!important}
  .pet-health-picker[open] .pet-health-menu{display:grid!important;position:absolute!important;left:0!important;right:0!important;top:calc(100% + 8px)!important;z-index:99!important;max-height:270px!important;overflow:auto!important;background:var(--paper,#fbfbf7)!important;border-radius:16px!important;padding:8px!important;box-shadow:0 24px 55px -24px rgba(7,16,31,.55),inset 0 0 0 1px rgba(11,30,63,.14)!important}
  [data-theme="dark"] .pet-health-picker[open] .pet-health-menu{background:#10213a!important}
  .pet-health-option{pointer-events:auto!important;position:relative!important;z-index:100!important}

  .pet-record-type-select-wrap{grid-column:auto;display:grid;gap:7px;font-size:10px;font-weight:700;color:var(--muted)}
  .pet-record-type-select{appearance:none;background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);background-position:calc(100% - 18px) 19px,calc(100% - 13px) 19px;background-size:5px 5px,5px 5px;background-repeat:no-repeat;padding-right:38px!important}
  .pet-record-custom{display:none}.pet-record-custom.is-visible{display:grid}

  .pet-profile-card{position:relative}
  .pet-photo-edit{position:absolute;left:64px;top:118px;z-index:4;border:0;border-radius:999px;padding:7px 10px;background:rgba(255,255,255,.94);box-shadow:0 8px 22px -12px rgba(7,16,31,.5),inset 0 0 0 1px rgba(11,30,63,.12);color:var(--ink);font:700 9px/1 Poppins;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease}
  .pet-photo-edit:hover{transform:translateY(-1px);box-shadow:0 10px 26px -12px rgba(7,16,31,.58),inset 0 0 0 1px rgba(11,30,63,.15)}
  .pet-photo-edit[disabled]{opacity:.65;cursor:wait}
  [data-theme="dark"] .pet-photo-edit{background:rgba(15,31,55,.94);color:#f4f4ed}
  .wagstack-ai-note{position:fixed;right:18px;bottom:18px;z-index:999999;max-width:320px;padding:11px 14px;border-radius:14px;background:#07101f;color:#fff;box-shadow:0 16px 50px -20px rgba(0,0,0,.55);font:600 11px/1.45 Poppins;animation:wagNoticeIn .22s ease both}
  @keyframes wagNoticeIn{from{opacity:0;transform:translateY(8px)}}

  .rail__theme{overflow:visible!important;isolation:isolate}
  .tg{width:21px;height:21px;display:block;overflow:visible}
  .tg .tg-sun-core,.tg .tg-rays,.tg .tg-moon{transform-origin:12px 12px;transition:transform .48s cubic-bezier(.22,.8,.2,1),opacity .32s ease}
  .tg .tg-rays{opacity:1;transform:rotate(0deg) scale(1)}.tg .tg-sun-core{opacity:1;transform:scale(1)}.tg .tg-moon{opacity:0;transform:rotate(-28deg) scale(.55)}
  .tg[data-theme="dark"] .tg-rays{opacity:0;transform:rotate(50deg) scale(.45)}.tg[data-theme="dark"] .tg-sun-core{opacity:0;transform:scale(.55)}.tg[data-theme="dark"] .tg-moon{opacity:1;transform:rotate(0) scale(1)}
  .rail__theme:hover .tg{transform:rotate(7deg)}.rail__theme .tg{transition:transform .25s ease}
  @media(prefers-reduced-motion:reduce){.health-marquee{animation:none}.tg *{transition:none!important}}
  `;
  const st=document.createElement('style'); st.id='wagstack-v26-hotfix'; st.textContent=css; document.head.appendChild(st);

  function notice(text,ms=3200){
    document.querySelector('.wagstack-ai-note')?.remove();
    const n=document.createElement('div'); n.className='wagstack-ai-note'; n.textContent=text; document.body.appendChild(n);
    setTimeout(()=>n.remove(),ms);
  }

  function readStore(){
    try{return JSON.parse(localStorage.getItem(STORE_KEY)||'{}')}catch{return {}}
  }
  function writeStore(s){
    try{localStorage.setItem(STORE_KEY,JSON.stringify(s));return true}catch{return false}
  }

  function themeIcon(){
    const b=document.querySelector('.rail__theme'); if(!b||b.dataset.v26icon)return;
    b.dataset.v26icon='1'; const t=document.documentElement.dataset.theme||'light';
    b.innerHTML=`<svg aria-hidden="true" class="tg" data-theme="${t}" viewBox="0 0 24 24" fill="none"><g class="tg-rays" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path d="M12 1.8v2M12 20.2v2M1.8 12h2M20.2 12h2M4.8 4.8l1.4 1.4M17.8 17.8l1.4 1.4M4.8 19.2l1.4-1.4M17.8 6.2l1.4-1.4"/></g><circle class="tg-sun-core" cx="12" cy="12" r="5.1" fill="currentColor"/><path class="tg-moon" d="M18.7 15.8A7.6 7.6 0 0 1 8.2 5.3 8.1 8.1 0 1 0 18.7 15.8Z" fill="currentColor"/></svg>`;
  }

  function patchUpdates(){
    const p=document.querySelector('.home__promo-card'); if(!p)return;
    p.querySelectorAll('.home__promo-label').forEach(n=>n.remove());
    const title=p.querySelector('.home__promo-head .bento__title'); if(title){title.textContent='Updates';title.style.display='block';}
  }

  function patchHealthHome(){
    const card=document.querySelector('a.bento__card[href="/health"]'); if(!card)return;
    const d=card.querySelector('.bento__desc'); if(d)d.textContent='Preventives and care records.';
    const chips=card.querySelector('.bento__chips'); if(!chips||chips.querySelector('.health-marquee-stack'))return;
    const items=[...chips.querySelectorAll('.bento__chip')]; if(!items.length)return;
    const a=items.map(x=>x.outerHTML).join('');
    const b=[...items].reverse().map(x=>x.outerHTML).join('');
    chips.innerHTML=`<div class="health-marquee-stack"><div class="health-marquee">${a}${a}</div><div class="health-marquee health-marquee--reverse">${b}${b}</div></div>`;
  }

  function patchPicker(){
    document.querySelectorAll('.pet-health-picker').forEach(d=>{
      if(d.dataset.v26)return; d.dataset.v26='1';
      const s=d.querySelector('summary'); if(s)s.addEventListener('click',e=>{e.preventDefault();d.open=!d.open;});
    });
  }

  function patchHealthModal(){
    const form=document.querySelector('[data-health-edit-form]'); if(!form||form.dataset.v26)return; form.dataset.v26='1';
    let current='Other';
    const fixed=form.querySelector('.pet-fixed-field'); if(fixed)current=fixed.querySelector('strong')?.textContent?.trim()||'Other';
    else if(form.querySelector('input[name="title"]'))current='Other';
    const label=fixed?.closest('label')||form.querySelector('input[name="title"]')?.closest('label');
    if(!label)return;
    const opts=TYPES.map(x=>`<option value="${x.replaceAll('"','&quot;')}" ${x===current?'selected':''}>${x}</option>`).join('');
    label.outerHTML=`<label class="pet-record-type-select-wrap">Record type<select class="pet-input pet-record-type-select" name="category">${opts}</select></label>`;
    const custom=document.createElement('label'); custom.className='pet-record-custom';
    custom.innerHTML='Custom title<input class="pet-input" name="customTitle" value="">';
    const status=form.querySelector('input[name="status"]')?.closest('label'); if(status)status.before(custom);
    const sel=form.querySelector('select[name="category"]');
    const sync=()=>custom.classList.toggle('is-visible',sel.value==='Other');
    sel.addEventListener('change',sync); sync();
  }

  function patchPetOverview(){
    if(location.pathname!='/pets')return;
    const card=document.querySelector('.pet-profile-card'); if(!card||card.querySelector('[data-edit-pet-photo]'))return;
    const btn=document.createElement('button'); btn.type='button'; btn.className='pet-photo-edit'; btn.dataset.editPetPhoto=''; btn.textContent='Edit photo';
    const input=document.createElement('input'); input.type='file'; input.accept='image/*'; input.hidden=true; input.dataset.petImage='';
    card.append(btn,input);
  }

  function saveHealthEdit(e){
    const form=e.target.closest?.('[data-health-edit-form]'); if(!form||!form.dataset.v26)return;
    e.preventDefault(); e.stopImmediatePropagation();
    const fd=new FormData(form), id=String(fd.get('id')||''), category=String(fd.get('category')||'Other');
    const state=readStore(), pet=state.activePet||'Biscuit';
    const list=state.healthByPet?.[pet]; const h=Array.isArray(list)?list.find(x=>String(x.id)===id):null;
    if(h){
      h.category=category;
      h.title=category==='Other'?(String(fd.get('customTitle')||h.title||'Other Health Detail').trim()||'Other Health Detail'):category;
      h.iconName=ICONS[category]||'heart';
      h.status=String(fd.get('status')||'').trim()||'Not specified';
      h.note=String(fd.get('note')||'').trim();
      h.tone=String(fd.get('tone')||'neutral');
      writeStore(state);
    }
    location.reload();
  }

  function fileToSquareJpeg(file){
    return new Promise((resolve,reject)=>{
      const r=new FileReader();
      r.onerror=reject;
      r.onload=()=>{
        const img=new Image();
        img.onerror=reject;
        img.onload=()=>{
          const size=768, c=document.createElement('canvas'); c.width=size;c.height=size;
          const ctx=c.getContext('2d'); ctx.fillStyle='#f4f4ed';ctx.fillRect(0,0,size,size);
          const scale=Math.max(size/img.width,size/img.height), w=img.width*scale,h=img.height*scale;
          ctx.drawImage(img,(size-w)/2,(size-h)/2,w,h);
          const data=c.toDataURL('image/jpeg',.86);
          resolve(data.split(',')[1]);
        };
        img.src=String(r.result);
      };
      r.readAsDataURL(file);
    });
  }

  async function generatePetAvatar(file,button){
    const state=readStore(), petName=state.activePet||'Biscuit';
    const p=(state.pets||[]).find(x=>x.name===petName)||{};
    const old=button.textContent; button.disabled=true; button.textContent='Creating AI avatar…';
    notice('Creating a WagStack cartoon avatar from the uploaded pet photo…',5000);
    try{
      const image_b64=await fileToSquareJpeg(file);
      const res=await fetch('/api/pet-avatar',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({image_b64,petName,breed:p.breed||''})});
      const data=await res.json().catch(()=>({}));
      if(!res.ok||!data.image)throw new Error(data.error||'AI avatar generation failed.');
      const fresh=readStore(), pet=(fresh.pets||[]).find(x=>x.name===(fresh.activePet||petName));
      if(!pet)throw new Error('Active pet profile was not found.');
      pet.image=`data:${data.mime||'image/png'};base64,${data.image}`;
      writeStore(fresh);
      notice('AI pet avatar created.',1200);
      setTimeout(()=>location.reload(),500);
    }catch(err){
      button.disabled=false; button.textContent=old;
      notice(err.message||'Could not create the AI pet avatar.',5200);
    }
  }

  let raf=0;
  function schedulePatch(){
    if(raf)return;
    raf=requestAnimationFrame(()=>{raf=0;themeIcon();patchUpdates();patchHealthHome();patchPicker();patchHealthModal();patchPetOverview();});
  }

  document.addEventListener('submit',saveHealthEdit,true);
  document.addEventListener('themechange',()=>requestAnimationFrame(()=>{const tg=document.querySelector('.rail__theme .tg');if(tg)tg.dataset.theme=document.documentElement.dataset.theme||'light';}));
  document.addEventListener('click',e=>{
    const edit=e.target.closest?.('[data-edit-pet-photo]');
    if(edit){e.preventDefault();edit.parentElement.querySelector('[data-pet-image]')?.click();return;}
    const sw=e.target.closest?.('[data-switch-pet]');
    if(sw){setTimeout(()=>{const ov=document.querySelector('[data-paw-tab="overview"]');if(ov&&!ov.classList.contains('is-active'))ov.click();},0);}
    schedulePatch();
  },true);
  document.addEventListener('change',e=>{
    const input=e.target.closest?.('[data-pet-image]');
    if(input?.files?.[0]){
      const button=input.parentElement.querySelector('[data-edit-pet-photo]');
      generatePetAvatar(input.files[0],button);
    }
  });
  addEventListener('popstate',schedulePatch);

  function start(){
    schedulePatch();
    const main=document.getElementById('main-content');
    if(main)new MutationObserver(schedulePatch).observe(main,{childList:true,subtree:false});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();