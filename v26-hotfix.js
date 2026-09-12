(() => {
  const TYPES=['Vaccinations','Deworming','Flea & Tick','Allergy','Medication','Surgery','Condition','Vet Visit','Weight Record','Dental Care','Lab / Test Result','Other'];
  const ICONS={'Vaccinations':'syringe','Deworming':'worm','Flea & Tick':'bug','Allergy':'warning-circle','Medication':'pill','Surgery':'bandaids','Condition':'heartbeat','Vet Visit':'stethoscope','Weight Record':'scales','Dental Care':'tooth','Lab / Test Result':'test-tube','Other':'heart'};

  const css=`
  .home__promo-card{isolation:isolate!important;overflow:hidden!important;background:linear-gradient(112deg,rgba(255,255,255,.78),rgba(226,236,255,.72))!important;box-shadow:inset 0 0 0 1px rgba(11,30,63,.13),0 18px 45px -34px rgba(11,30,63,.35)!important}
  [data-theme="dark"] .home__promo-card{background:linear-gradient(112deg,rgba(21,43,78,.9),rgba(8,27,55,.88))!important}
  .home__promo-viewport,.home__promo-track,.home__promo-slide{background:transparent!important;box-shadow:none!important;border:0!important}
  .home__promo-slide{padding:54px 34px 26px!important;min-height:174px!important}
  .home__promo-label{position:absolute!important;top:20px!important;left:28px!important;z-index:12!important;margin:0!important;color:var(--ink)!important;font-size:13px!important;font-weight:700!important;pointer-events:none!important}
  .home__promo-slide>.home__promo-label{display:none!important}
  .home__promo-slide>span{margin-top:0!important}
  .home__promo-controls{z-index:15!important}
  a.bento__card[href="/health"]{overflow:hidden!important}
  a.bento__card[href="/health"] .bento__desc{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;max-width:82%!important;margin-bottom:48px!important;line-height:1.32!important}
  a.bento__card[href="/health"] .bento__chips{position:absolute!important;left:14px!important;right:14px!important;bottom:12px!important;height:32px!important;overflow:hidden!important;display:block!important;mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
  .health-marquee{display:flex;width:max-content;gap:8px;animation:wag-health-marquee 14s linear infinite;will-change:transform}
  a.bento__card[href="/health"]:hover .health-marquee{animation-play-state:paused}
  .health-marquee .bento__chip{flex:0 0 auto!important;display:inline-flex!important;align-items:center!important;gap:6px!important;white-space:nowrap!important}
  .health-marquee .bento__chip svg,.health-marquee .clone-icon{width:14px!important;height:14px!important;min-width:14px!important;background:transparent!important;box-shadow:none!important;padding:0!important;color:var(--ink)!important}
  @keyframes wag-health-marquee{to{transform:translateX(-50%)}}
  .pet-health-add{overflow:visible!important;z-index:4!important}
  .pet-health-picker{position:relative!important;z-index:40!important;overflow:visible!important}
  .pet-health-picker>summary{cursor:pointer!important;pointer-events:auto!important;user-select:none!important;position:relative!important;z-index:42!important}
  .pet-health-picker[open] .pet-health-menu{display:grid!important;position:absolute!important;left:0!important;right:0!important;top:calc(100% + 8px)!important;z-index:99!important;max-height:270px!important;overflow:auto!important;background:var(--paper,#fbfbf7)!important;border-radius:16px!important;padding:8px!important;box-shadow:0 24px 55px -24px rgba(7,16,31,.55),inset 0 0 0 1px rgba(11,30,63,.14)!important}
  [data-theme="dark"] .pet-health-picker[open] .pet-health-menu{background:#10213a!important}
  .pet-health-option{pointer-events:auto!important;position:relative!important;z-index:100!important}
  .pet-record-type-select-wrap{grid-column:auto;display:grid;gap:7px;font-size:10px;font-weight:700;color:var(--muted)}
  .pet-record-type-select{appearance:none;background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);background-position:calc(100% - 18px) 19px,calc(100% - 13px) 19px;background-size:5px 5px,5px 5px;background-repeat:no-repeat;padding-right:38px!important}
  .pet-record-custom{display:none}.pet-record-custom.is-visible{display:grid}
  .rail__theme{overflow:visible!important;isolation:isolate}
  .tg{width:21px;height:21px;display:block;overflow:visible}
  .tg .tg-sun-core,.tg .tg-rays,.tg .tg-moon{transform-origin:12px 12px;transition:transform .48s cubic-bezier(.22,.8,.2,1),opacity .32s ease}
  .tg .tg-rays{opacity:1;transform:rotate(0deg) scale(1)}.tg .tg-sun-core{opacity:1;transform:scale(1)}.tg .tg-moon{opacity:0;transform:rotate(-28deg) scale(.55)}
  .tg[data-theme="dark"] .tg-rays{opacity:0;transform:rotate(50deg) scale(.45)}.tg[data-theme="dark"] .tg-sun-core{opacity:0;transform:scale(.55)}.tg[data-theme="dark"] .tg-moon{opacity:1;transform:rotate(0) scale(1)}
  .rail__theme:hover .tg{transform:rotate(7deg)}.rail__theme .tg{transition:transform .25s ease}
  @media(prefers-reduced-motion:reduce){.health-marquee{animation:none}.tg *{transition:none!important}}
  `;
  const st=document.createElement('style'); st.id='wagstack-v26-hotfix'; st.textContent=css; document.head.appendChild(st);

  function themeIcon(){
    const b=document.querySelector('.rail__theme'); if(!b||b.dataset.v26icon)return;
    b.dataset.v26icon='1'; const t=document.documentElement.dataset.theme||'light';
    b.innerHTML=`<svg aria-hidden="true" class="tg" data-theme="${t}" viewBox="0 0 24 24" fill="none"><g class="tg-rays" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path d="M12 1.8v2M12 20.2v2M1.8 12h2M20.2 12h2M4.8 4.8l1.4 1.4M17.8 17.8l1.4 1.4M4.8 19.2l1.4-1.4M17.8 6.2l1.4-1.4"/></g><circle class="tg-sun-core" cx="12" cy="12" r="5.1" fill="currentColor"/><path class="tg-moon" d="M18.7 15.8A7.6 7.6 0 0 1 8.2 5.3 8.1 8.1 0 1 0 18.7 15.8Z" fill="currentColor"/></svg>`;
  }

  function patchUpdates(){
    const p=document.querySelector('.home__promo-card'); if(!p)return;
    p.querySelectorAll('.home__promo-slide>.home__promo-label').forEach(n=>n.remove());
    let label=p.querySelector(':scope > .home__promo-label');
    if(!label){label=document.createElement('b');label.className='home__promo-label';label.textContent='Updates';p.prepend(label);} else label.textContent='Updates';
    const head=p.querySelector('.home__promo-head strong'); if(head) head.style.display='none';
  }

  function patchHealthHome(){
    const card=document.querySelector('a.bento__card[href="/health"]'); if(!card)return;
    const d=card.querySelector('.bento__desc'); if(d){const text='Preventives, vaccines and care records.';if(d.textContent!==text)d.textContent=text;}
    const chips=card.querySelector('.bento__chips'); if(!chips)return;
    if(chips.querySelector('.health-marquee'))return;
    const items=[...chips.querySelectorAll('.bento__chip')];
    if(!items.length)return;
    const html=items.map(x=>x.outerHTML).join(''); chips.innerHTML=`<div class="health-marquee">${html}${html}</div>`;
  }

  function patchPicker(){
    document.querySelectorAll('.pet-health-picker').forEach(d=>{if(d.dataset.v26)return;d.dataset.v26='1';const s=d.querySelector('summary');if(s)s.addEventListener('click',e=>{e.preventDefault();d.open=!d.open;});});
  }

  function patchHealthModal(){
    const form=document.querySelector('[data-health-edit-form]'); if(!form||form.dataset.v26)return; form.dataset.v26='1';
    let current='Other';
    const fixed=form.querySelector('.pet-fixed-field'); if(fixed) current=fixed.querySelector('strong')?.textContent?.trim()||'Other';
    else if(form.querySelector('input[name="title"]')) current='Other';
    const label=fixed?.closest('label')||form.querySelector('input[name="title"]')?.closest('label');
    if(label){
      const opts=TYPES.map(x=>`<option value="${x.replaceAll('"','&quot;')}" ${x===current?'selected':''}>${x}</option>`).join('');
      label.outerHTML=`<label class="pet-record-type-select-wrap">Record type<select class="pet-input pet-record-type-select" name="category">${opts}</select></label>`;
      const custom=document.createElement('label'); custom.className='pet-record-custom'; custom.innerHTML='Custom title<input class="pet-input" name="customTitle" value="">';
      const status=form.querySelector('input[name="status"]')?.closest('label'); if(status)status.before(custom);
      const sel=form.querySelector('select[name="category"]'); const sync=()=>custom.classList.toggle('is-visible',sel.value==='Other'); sel.addEventListener('change',sync);sync();
    }
  }

  function saveHealthEdit(e){
    const form=e.target.closest?.('[data-health-edit-form]'); if(!form||!form.dataset.v26)return;
    e.preventDefault();e.stopImmediatePropagation();
    const fd=new FormData(form), id=String(fd.get('id')||''), category=String(fd.get('category')||'Other');
    try{
      const key='tfa-clone-workspace-v3', state=JSON.parse(localStorage.getItem(key)||'{}'), pet=state.activePet||'Biscuit';
      const list=state.healthByPet?.[pet]; const h=Array.isArray(list)?list.find(x=>String(x.id)===id):null;
      if(h){h.category=category;h.title=category==='Other'?(String(fd.get('customTitle')||h.title||'Other Health Detail').trim()||'Other Health Detail'):category;h.iconName=ICONS[category]||'heart';h.status=String(fd.get('status')||'').trim()||'Not specified';h.note=String(fd.get('note')||'').trim();h.tone=String(fd.get('tone')||'neutral');localStorage.setItem(key,JSON.stringify(state));}
    }catch(_){ }
    document.querySelector('.pet-modal')?.remove(); window.dispatchEvent(new PopStateEvent('popstate'));
  }

  let raf=0;
  function schedulePatch(){
    if(raf)return;
    raf=requestAnimationFrame(()=>{raf=0;themeIcon();patchUpdates();patchHealthHome();patchPicker();patchHealthModal();});
  }

  document.addEventListener('submit',saveHealthEdit,true);
  document.addEventListener('themechange',()=>requestAnimationFrame(()=>{const tg=document.querySelector('.rail__theme .tg');if(tg)tg.dataset.theme=document.documentElement.dataset.theme||'light';}));
  document.addEventListener('click',()=>schedulePatch(),true);
  addEventListener('popstate',()=>schedulePatch());

  function start(){
    schedulePatch();
    const main=document.getElementById('main-content');
    if(main){
      new MutationObserver(schedulePatch).observe(main,{childList:true,subtree:false});
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();