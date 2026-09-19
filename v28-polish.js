(() => {
  const STORE_KEY='brand-demo-workspace-v1';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read=()=>{try{return JSON.parse(localStorage.getItem(STORE_KEY)||'{}')}catch{return {}}};

  const ICONS={
    scissors:`<svg class="ph-duo ph-duo--dynamic" aria-hidden="true" viewBox="0 0 256 256" fill="currentColor"><path d="M40.2 95.8a28 28 0 1 1 39.6 0 28 28 0 0 1-39.6 0Zm0 64.4a28 28 0 1 0 39.6 0 28 28 0 0 0-39.6 0Z" opacity=".2"/><path d="M157.73 113.13a8 8 0 0 1 2.09-11.13l67.66-46.3a8 8 0 0 1 9 13.21l-67.67 46.3a8 8 0 0 1-11.08-2.08Zm80.87 85.09a8 8 0 0 1-11.12 2.08L136 137.7l-42.51 29.08a36 36 0 1 1-9-13.19L121.83 128 84.44 102.41a35.86 35.86 0 1 1 9-13.19l143 97.87a8 8 0 0 1 2.16 11.13Z"/></svg>`,
    brush:`<svg class="ph-duo ph-duo--dynamic" aria-hidden="true" viewBox="0 0 256 256" fill="currentColor"><path d="M48 48h144v104H48z" opacity=".2"/><path d="M192 40H48a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h64v32a8 8 0 0 0 16 0v-32h64a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 112H48V56h144ZM72 80v48a8 8 0 0 1-16 0V80a8 8 0 0 1 16 0Zm32 0v48a8 8 0 0 1-16 0V80a8 8 0 0 1 16 0Zm32 0v48a8 8 0 0 1-16 0V80a8 8 0 0 1 16 0Zm32 0v48a8 8 0 0 1-16 0V80a8 8 0 0 1 16 0Z"/></svg>`,
    bath:`<svg class="ph-duo ph-duo--dynamic" aria-hidden="true" viewBox="0 0 256 256" fill="currentColor"><path d="M40 120h176v40a48 48 0 0 1-48 48H88a48 48 0 0 1-48-48Z" opacity=".2"/><path d="M224 112h-16V72a40 40 0 0 0-80 0 8 8 0 0 0 16 0 24 24 0 0 1 48 0v40H32a8 8 0 0 0 0 16v32a56.06 56.06 0 0 0 48 55.43V224a8 8 0 0 0 16 0v-8h64v8a8 8 0 0 0 16 0v-8.57A56.06 56.06 0 0 0 224 160v-32a8 8 0 0 0 0-16Zm-16 48a40 40 0 0 1-40 40H88a40 40 0 0 1-40-40v-32h160ZM168 80a12 12 0 1 1-12 12 12 12 0 0 1 12-12Z"/></svg>`,
    ear:`<svg class="ph-duo ph-duo--dynamic" aria-hidden="true" viewBox="0 0 256 256" fill="currentColor"><path d="M184 112c0 48-40 48-40 88a24 24 0 0 1-48 0c0-56 48-56 48-104a32 32 0 0 0-64 0" opacity=".2"/><path d="M136 24a72.08 72.08 0 0 0-72 72 8 8 0 0 0 16 0 56 56 0 0 1 112 0c0 24.71-10.14 36.41-21.88 49.95C158.81 159 144 176.09 144 200a16 16 0 0 1-32 0c0-24.47 10.68-38.03 22-52.39C146.34 131.94 160 114.58 160 88a32 32 0 0 0-64 0 8 8 0 0 0 16 0 16 16 0 0 1 32 0c0 20.94-10.72 34.55-22.07 48.96C109.78 152.38 96 169.88 96 200a32 32 0 0 0 64 0c0-17.91 10.94-30.53 21.5-42.72C194.52 142.25 208 126.72 208 96a72.08 72.08 0 0 0-72-72Zm84 8v16h16a8 8 0 0 1 0 16h-16v16a8 8 0 0 1-16 0V64h-16a8 8 0 0 1 0-16h16V32a8 8 0 0 1 16 0Z"/></svg>`,
    calendar:`<svg class="ph-duo ph-duo--dynamic" aria-hidden="true" viewBox="0 0 256 256" fill="currentColor"><path d="M216 48v40H40V48a8 8 0 0 1 8-8h160a8 8 0 0 1 8 8Z" opacity=".2"/><path d="M208 32h-24v-8a8 8 0 0 0-16 0v8H88v-8a8 8 0 0 0-16 0v8H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Zm0 176H48V96h160Zm-48-56-40 40a8 8 0 0 1-11.31 0l-20-20A8 8 0 0 1 100 160.69l14.34 14.34 34.34-34.34A8 8 0 0 1 160 152Z"/></svg>`,
    note:`<svg class="ph-duo ph-duo--dynamic" aria-hidden="true" viewBox="0 0 256 256" fill="currentColor"><path d="M48 32h160v192H48z" opacity=".2"/><path d="M208 24H48a8 8 0 0 0-8 8v192a8 8 0 0 0 8 8h160a8 8 0 0 0 8-8V32a8 8 0 0 0-8-8Zm-8 192H56V40h144ZM80 80a8 8 0 0 1 8-8h80a8 8 0 0 1 0 16H88a8 8 0 0 1-8-8Zm0 48a8 8 0 0 1 8-8h80a8 8 0 0 1 0 16H88a8 8 0 0 1-8-8Zm0 48a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16H88a8 8 0 0 1-8-8Z"/></svg>`,
    trophy:`<svg class="ph-duo ph-duo--dynamic" aria-hidden="true" viewBox="0 0 256 256" fill="currentColor"><path d="M64 40h128v48a64 64 0 0 1-128 0Z" opacity=".2"/><path d="M216 48h-16V40a8 8 0 0 0-8-8H64a8 8 0 0 0-8 8v8H40a24 24 0 0 0-24 24v8a40.05 40.05 0 0 0 40 40h7.1A72.15 72.15 0 0 0 120 159.55V200H88a8 8 0 0 0 0 16h80a8 8 0 0 0 0-16h-32v-40.45A72.15 72.15 0 0 0 192.9 120h7.1a40.05 40.05 0 0 0 40-40v-8a24 24 0 0 0-24-24ZM56 104a24 24 0 0 1-24-24v-8a8 8 0 0 1 8-8h16v24a72.5 72.5 0 0 0 1.79 16Zm128-16a56 56 0 0 1-112 0V48h112Zm40-8a24 24 0 0 1-24 24h-1.79A72.5 72.5 0 0 0 200 88V64h16a8 8 0 0 1 8 8Z"/></svg>`
  };

  const css=`
  /* Updates: one clean hierarchy, no title/slide collision */
  .home__promo-card{position:relative!important;display:block!important;padding:0!important;min-width:0!important}
  .home__promo-card .home__promo-head{position:absolute!important;left:26px!important;right:24px!important;top:19px!important;z-index:20!important;display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;pointer-events:none!important}
  .home__promo-card .home__promo-head .bento__title{font-size:13px!important;line-height:1!important;margin:0!important;letter-spacing:0!important}
  .home__promo-card .home__promo-controls{pointer-events:auto!important}
  .home__promo-card .home__promo-viewport{width:100%!important;height:auto!important;min-height:174px!important}
  .home__promo-card .home__promo-track{min-height:174px!important}
  .home__promo-card .home__promo-slide{padding:58px 32px 24px!important;min-height:174px!important;display:flex!important;flex-direction:column!important;align-items:flex-start!important;justify-content:center!important}
  .home__promo-card .home__promo-slide>span{font-size:8px!important;line-height:1.1!important;margin-bottom:8px!important;letter-spacing:.12em!important}
  .home__promo-card .home__promo-slide>strong{font-size:15px!important;line-height:1.2!important;max-width:520px!important}
  .home__promo-card .home__promo-slide>small{margin-top:7px!important;line-height:1.45!important;max-width:540px!important}

  /* Live pet fan */
  a.bento__card[href="/pets"] .bento__photo img{width:100%!important;height:100%!important;object-fit:cover!important;display:block!important}

  /* Pawfile overview insight cards */
  .pet-overview-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:14px!important}
  .pet-overview-grid>.pet-profile-card{grid-column:1/-1!important}
  .pet-overview-grid>.pet-insight-card{grid-column:span 1!important;min-height:168px!important;padding:18px!important;display:grid!important;grid-template-columns:42px minmax(0,1fr)!important;grid-template-rows:auto auto 1fr!important;column-gap:12px!important;align-content:start!important;background:linear-gradient(145deg,rgba(255,255,255,.86),rgba(246,247,242,.74))!important;box-shadow:inset 0 0 0 1px rgba(11,30,63,.12),0 16px 36px -30px rgba(7,16,31,.45)!important}
  [data-theme="dark"] .pet-overview-grid>.pet-insight-card{background:linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.035))!important}
  .pet-insight-icon{grid-row:1/3;width:42px;height:42px;border-radius:14px;display:grid;place-items:center;color:var(--orange);background:linear-gradient(145deg,rgba(255,122,26,.18),rgba(255,122,26,.06));box-shadow:inset 0 0 0 1px rgba(255,122,26,.2)}
  .pet-insight-icon .ph-duo{width:21px;height:21px}
  .pet-insight-card .clone-card__no{grid-column:2;margin:2px 0 3px!important;font-size:8px!important}
  .pet-insight-card .pet-metric{grid-column:2;font-size:21px!important;line-height:1.05!important;margin:0!important;min-width:0;overflow:hidden;text-overflow:ellipsis}
  .pet-insight-card>p{grid-column:1/-1;margin:20px 0 0!important;padding-top:13px;border-top:1px solid rgba(11,30,63,.09);font-size:10px!important;line-height:1.45!important}
  [data-theme="dark"] .pet-insight-card>p{border-top-color:rgba(255,255,255,.09)}

  /* Booking stepper */
  .pet-stepper>span b{display:block!important}

  /* Grooming services: restore text and use one icon language */
  .pet-option-grid{gap:12px!important}
  .pet-option[data-draft-service]{min-height:92px!important;padding:14px!important;gap:12px!important;align-items:center!important}
  .pet-option[data-draft-service]>span:not(.wag-service-icon){display:block!important;min-width:0!important;text-align:left!important}
  .pet-option[data-draft-service] strong{display:block!important;color:var(--ink)!important;font-size:11px!important;line-height:1.25!important;margin-bottom:4px!important}
  .pet-option[data-draft-service] small{display:block!important;color:var(--muted)!important;font-size:9px!important;line-height:1.35!important}
  .wag-service-icon{width:44px!important;height:44px!important;flex:0 0 44px!important}
  .wag-service-icon .ph-duo{width:23px!important;height:23px!important}

  /* Grooming schedule */
  .wag-schedule-wrap{display:grid;gap:16px;margin-top:2px}
  .wag-schedule-heading{display:flex;align-items:center;justify-content:space-between;gap:12px}
  .wag-schedule-heading strong{font-size:11px;color:var(--ink)}
  .wag-schedule-heading small{font-size:9px;color:var(--muted)}
  .wag-day-strip{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px}
  .wag-day{border:0;border-radius:16px;padding:10px 5px;background:rgba(255,255,255,.62);box-shadow:inset 0 0 0 1px rgba(11,30,63,.12);color:var(--ink);cursor:pointer;display:grid;gap:4px;justify-items:center;transition:transform .18s ease,box-shadow .18s ease,background .18s ease}
  [data-theme="dark"] .wag-day{background:rgba(255,255,255,.05)}
  .wag-day:hover{transform:translateY(-1px);box-shadow:inset 0 0 0 1px rgba(255,122,26,.35),0 10px 24px -20px rgba(7,16,31,.6)}
  .wag-day.is-selected{background:#071f43;color:#fff;box-shadow:0 12px 26px -20px rgba(7,31,67,.7)}
  .wag-day__dow{font:700 7px/1 Poppins;text-transform:uppercase;letter-spacing:.08em;opacity:.7}
  .wag-day__num{font:700 15px/1 Poppins}
  .wag-day__mon{font:600 7px/1 Poppins;opacity:.62}
  .wag-schedule-native{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:12px!important;margin-top:0!important}
  .wag-schedule-native label{position:relative!important;padding:12px 14px 13px!important;border-radius:16px!important;background:rgba(255,255,255,.46)!important;box-shadow:inset 0 0 0 1px rgba(11,30,63,.1)!important;font-size:8px!important;text-transform:uppercase;letter-spacing:.08em}
  [data-theme="dark"] .wag-schedule-native label{background:rgba(255,255,255,.04)!important}
  .wag-schedule-native .pet-input{margin-top:7px!important;background:transparent!important;box-shadow:none!important;padding:0!important;height:30px!important;font-size:11px!important;font-weight:700!important}
  .wag-time-slots{display:flex;gap:8px;flex-wrap:wrap}
  .wag-time-slot{border:0;border-radius:999px;padding:9px 13px;background:rgba(11,30,63,.06);box-shadow:inset 0 0 0 1px rgba(11,30,63,.1);color:var(--ink);font:700 9px/1 Poppins;cursor:pointer}
  [data-theme="dark"] .wag-time-slot{background:rgba(255,255,255,.06);color:#f4f4ed}
  .wag-time-slot.is-selected{background:var(--orange);color:#fff;box-shadow:none}
  .wag-time-label{display:grid;gap:8px}
  .wag-time-label>small{font-size:8px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}

  @media(max-width:900px){.pet-overview-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}.pet-overview-grid>.pet-insight-card{grid-column:span 1!important}.wag-day-strip{grid-template-columns:repeat(4,minmax(0,1fr))}.wag-day:nth-child(n+5){display:none}}
  @media(max-width:620px){.home__promo-card .home__promo-head{left:18px!important;right:16px!important;top:16px!important}.home__promo-card .home__promo-slide{padding:52px 18px 22px!important}.pet-overview-grid{grid-template-columns:1fr!important}.pet-overview-grid>.pet-insight-card{grid-column:1!important;min-height:138px!important}.wag-schedule-native{grid-template-columns:1fr!important}.wag-day-strip{grid-template-columns:repeat(4,minmax(0,1fr))}}
  `;
  const style=document.createElement('style');style.id='branddemo-v28-polish';style.textContent=css;document.head.appendChild(style);

  function syncHomePets(){
    const card=document.querySelector('a.bento__card[href="/pets"]'); if(!card)return;
    const imgs=[...card.querySelectorAll('.bento__photo img')],pets=read().pets||[];
    imgs.forEach((img,i)=>{const p=pets[i];const wrap=img.closest('.bento__photo');if(p?.image){img.src=p.image;img.alt=p.name||'Pet';if(wrap)wrap.hidden=false}else if(wrap){wrap.hidden=true}});
  }

  function polishOverview(){
    const profile=document.querySelector('.pet-profile-card'); if(!profile)return;
    const grid=profile.parentElement; if(!grid)return; grid.classList.add('pet-overview-grid');
    const config={
      'Last groom':['scissors','Grooming history saved to this pet profile.'],
      'Usual style':['note','Preferences stay ready for the next appointment.'],
      'Next visit':['calendar','Your next care date at a glance.'],
      'Paw Points':['trophy','Rewards follow the Fur Parent account.']
    };
    [...grid.children].forEach(card=>{
      if(card===profile)return; const label=card.querySelector('.clone-card__no')?.textContent?.trim(); const cfg=config[label]; if(!cfg)return;
      card.classList.add('pet-insight-card');
      let ico=card.querySelector('.pet-insight-icon'); if(!ico){ico=document.createElement('span');ico.className='pet-insight-icon';ico.innerHTML=ICONS[cfg[0]];card.prepend(ico)}
      const p=card.querySelector(':scope>p'); if(p)p.textContent=cfg[1];
    });
  }

  function cleanStepper(){
    const stepper=document.querySelector('.pet-stepper'); if(!stepper)return;
    [...stepper.children].forEach(el=>{
      const b=el.querySelector('b'); let label=b?.textContent?.trim()||el.textContent.trim().replace(/^\d+\s*/,'');
      if(!label)return; el.innerHTML=`<b>${esc(label)}</b>`;
    });
  }

  function serviceIcon(service){
    if(service==='Full Grooming')return ICONS.scissors;
    if(service==='Bath & Blow Dry')return ICONS.bath;
    if(service==='Nail Trim + Ear Care')return ICONS.ear;
    return ICONS.brush;
  }
  function serviceSub(service){
    if(service==='Full Grooming')return 'Complete coat, trim and finishing care';
    if(service==='Bath & Blow Dry')return 'Bath, dry and coat refresh';
    if(service==='Nail Trim + Ear Care')return 'Nail maintenance and gentle ear care';
    return 'Essential tidy-up and coat care';
  }
  function fixServiceCards(){
    if(location.pathname!='/grooming')return;
    document.querySelectorAll('.pet-option[data-draft-service]').forEach(btn=>{
      const service=btn.dataset.draftService||''; if(!service)return;
      [...btn.children].forEach(ch=>{if(ch.matches('.wag-service-icon,svg,.clone-icon'))ch.remove()});
      let text=[...btn.children].find(ch=>ch.tagName==='SPAN');
      if(!text){text=document.createElement('span');btn.appendChild(text)}
      text.innerHTML=`<strong>${esc(service)}</strong><small>${esc(serviceSub(service))}</small>`;
      btn.insertAdjacentHTML('afterbegin',`<span class="wag-service-icon clone-icon--phosphor" aria-hidden="true">${serviceIcon(service)}</span>`);
    });
  }

  const iso=d=>{const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${y}-${m}-${day}`};
  function polishSchedule(){
    if(location.pathname!='/grooming')return;
    const date=document.querySelector('[data-draft="date"]'),time=document.querySelector('[data-draft="time"]'); if(!date||!time)return;
    const form=date.closest('.pet-form-grid'); if(!form||form.dataset.v28schedule)return; form.dataset.v28schedule='1'; form.classList.add('wag-schedule-native');
    const today=new Date();today.setHours(0,0,0,0);date.min=iso(today);
    const wrap=document.createElement('div');wrap.className='wag-schedule-wrap';
    const days=Array.from({length:7},(_,i)=>{const d=new Date(today);d.setDate(today.getDate()+i);return d});
    wrap.innerHTML=`<div class="wag-schedule-heading"><div><strong>Choose a day</strong><br><small>Quick-select the next available dates</small></div><span class="pet-insight-icon" aria-hidden="true">${ICONS.calendar}</span></div><div class="wag-day-strip">${days.map((d,i)=>`<button type="button" class="wag-day ${date.value===iso(d)?'is-selected':''}" data-wag-date="${iso(d)}"><span class="wag-day__dow">${i===0?'Today':i===1?'Tomorrow':d.toLocaleDateString(undefined,{weekday:'short'})}</span><span class="wag-day__num">${d.getDate()}</span><span class="wag-day__mon">${d.toLocaleDateString(undefined,{month:'short'})}</span></button>`).join('')}</div><div class="wag-time-label"><small>Preferred time</small><div class="wag-time-slots">${[...time.options].map(o=>`<button type="button" class="wag-time-slot ${time.value===o.value?'is-selected':''}" data-wag-time="${esc(o.value)}">${esc(o.textContent)}</button>`).join('')}</div></div>`;
    form.before(wrap);
    wrap.addEventListener('click',e=>{
      const d=e.target.closest('[data-wag-date]'); if(d){date.value=d.dataset.wagDate;date.dispatchEvent(new Event('input',{bubbles:true}));date.dispatchEvent(new Event('change',{bubbles:true}));wrap.querySelectorAll('.wag-day').forEach(x=>x.classList.toggle('is-selected',x===d));}
      const t=e.target.closest('[data-wag-time]'); if(t){time.value=t.dataset.wagTime;time.dispatchEvent(new Event('input',{bubbles:true}));time.dispatchEvent(new Event('change',{bubbles:true}));wrap.querySelectorAll('.wag-time-slot').forEach(x=>x.classList.toggle('is-selected',x===t));}
    });
    date.addEventListener('change',()=>wrap.querySelectorAll('.wag-day').forEach(x=>x.classList.toggle('is-selected',x.dataset.wagDate===date.value)));
    time.addEventListener('change',()=>wrap.querySelectorAll('.wag-time-slot').forEach(x=>x.classList.toggle('is-selected',x.dataset.wagTime===time.value)));
  }

  function patch(){syncHomePets();polishOverview();cleanStepper();fixServiceCards();polishSchedule()}
  let raf=0;const schedule=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;patch()})};
  const start=()=>{patch();new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});addEventListener('popstate',schedule);addEventListener('storage',schedule);document.addEventListener('click',()=>setTimeout(schedule,0),true);document.addEventListener('change',()=>setTimeout(schedule,0),true)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();