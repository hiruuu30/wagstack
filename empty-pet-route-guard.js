(()=>{
  if(location.pathname==='/admin')return;
  const STORE_KEY='brand-demo-workspace-v1';
  const SESSION_KEY='branddemo-supabase-session-v1';
  const GUEST_FLAG='branddemo-guest-mode-v1';

  const readStore=()=>{try{return JSON.parse(localStorage.getItem(STORE_KEY)||'{}')}catch{return {}}};
  const readSession=()=>{try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch{return null}};
  const isGuest=()=>localStorage.getItem(GUEST_FLAG)==='1';
  const signedIn=()=>!!readSession()?.user?.id;
  const hasPets=()=>Array.isArray(readStore().pets)&&readStore().pets.length>0;

  function setActive(path){
    document.querySelectorAll('.rail__link').forEach(link=>{
      const active=new URL(link.href,location.origin).pathname===path;
      link.classList.toggle('active',active);
      if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
    });
  }

  function renderEmpty(path,push=true){
    if(push&&location.pathname!==path)history.pushState({path},'',path);
    const main=document.querySelector('#main-content');
    if(!main)return;
    main.className='shell__panel';
    main.removeAttribute('data-fixed');
    const health=path==='/health';
    document.title=`${health?'Health & Care':'My Pets'} — YourBrand`;
    main.innerHTML=`<section class="clone-page"><header class="clone-page__head"><div><div class="clone-kicker">${health?'HEALTH & CARE':'MY PETS'}</div><h1>${health?'Health records start with a pet.':'Add your first pet.'}</h1><p>${health?'Create a pet profile first, then vaccinations, preventives, care notes and other records will live here.':'Keep your pet’s bookings, health records and care notes together.'}</p></div></header><div class="clone-glass"><article class="clone-card clone-card--full" style="text-align:center;padding:clamp(28px,6vw,64px)"><div class="clone-card__no">EMPTY PAWFILE</div><h2 style="margin:8px 0 10px">${health?'No pet selected yet':'Your Pawfile is ready'}</h2><p style="max-width:520px;margin:0 auto 18px">${health?'Add a pet and YourBrand will create a clean Health & Care workspace for that pet.':'Add your pet to begin.'}</p><button class="clone-btn" type="button" data-add-pet-main>+ Add pet</button></article></div></section>`;
    setActive(path);
  }

  document.addEventListener('click',e=>{
    const link=e.target.closest('a[href="/pets"],a[href="/health"]');
    if(!link||hasPets())return;
    if(!signedIn()&&!isGuest())return; // signed-out guard opens auth instead.
    e.preventDefault();
    e.stopImmediatePropagation();
    renderEmpty(new URL(link.href,location.origin).pathname,true);
  },true);

  window.addEventListener('popstate',()=>{
    if(!hasPets()&&(signedIn()||isGuest())&&['/pets','/health'].includes(location.pathname)){
      setTimeout(()=>renderEmpty(location.pathname,false),0);
    }
  });

  if(!hasPets()&&(signedIn()||isGuest())&&['/pets','/health'].includes(location.pathname)){
    setTimeout(()=>renderEmpty(location.pathname,false),0);
  }
})();
