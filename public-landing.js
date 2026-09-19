import { observeUI } from './ui-lifecycle.js';

(()=>{
  if(location.pathname==='/admin'||location.pathname.startsWith('/auth/'))return;

  const SESSION_KEY='wagstack-supabase-session-v1';
  const PUBLIC_PATHS=new Set(['/','/shop','/about']);
  let rendering=false;

  const session=()=>{try{return window.WagStackSupabase?.session||JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch{return null}};
  const signedIn=()=>!!session()?.access_token&&!!session()?.user?.id||localStorage.getItem('wagstack-guest-mode-v1')==='1';

  const style=document.createElement('style');
  style.id='wag-public-landing-style';
  style.textContent=`
    body.wag-public-mode{background:#f5f6f2!important;color:#0b1e3f!important}
    body.wag-public-mode .rail{display:none!important}
    body.wag-public-mode .mobile-nav{display:none!important}
    body.wag-public-mode .shell{display:block!important;min-height:100vh!important}
    body.wag-public-mode .shell__panel{width:100%!important;max-width:none!important;height:auto!important;min-height:100vh!important;overflow:visible!important;border-radius:0!important;margin:0!important;padding:0!important;background:transparent!important;box-shadow:none!important}
    body.wag-public-mode .hero-canvas{opacity:.58}
    body.wag-public-mode .a11y{display:none!important}
    body.wag-public-mode .kape{display:none!important}
    body.wag-public-mode .wag-rail-auth{display:none!important}

    .wag-public-nav{position:sticky;top:0;z-index:9000;display:flex;align-items:center;justify-content:space-between;gap:24px;width:min(1180px,calc(100% - 40px));margin:0 auto;padding:18px 0;background:linear-gradient(to bottom,rgba(245,246,242,.96),rgba(245,246,242,.82) 72%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
    .wag-public-brand{display:inline-flex;align-items:center;gap:9px;text-decoration:none;color:#0b1e3f;font:800 21px/1 Poppins,Arial,sans-serif;letter-spacing:-.045em}.wag-public-brand img{width:30px;height:30px}.wag-public-brand em{font-style:normal;color:#ff7a1a}
    .wag-public-links{display:flex;align-items:center;gap:8px}.wag-public-link,.wag-public-auth{border:0;border-radius:999px;padding:10px 15px;text-decoration:none;font:700 10px/1 Poppins,Arial,sans-serif;cursor:pointer;transition:transform .18s ease,background .18s ease,box-shadow .18s ease}.wag-public-link{color:#536176;background:transparent}.wag-public-link:hover{background:rgba(11,30,63,.055);color:#0b1e3f}.wag-public-link.is-current{background:rgba(11,30,63,.07);color:#0b1e3f}.wag-public-auth{background:#0b1e3f;color:#fff;box-shadow:0 12px 28px -18px rgba(11,30,63,.72)}.wag-public-auth:hover{transform:translateY(-1px);box-shadow:0 17px 32px -18px rgba(11,30,63,.8)}

    .wag-public-home{width:min(1180px,calc(100% - 40px));margin:0 auto;padding:42px 0 64px;font-family:Poppins,Arial,sans-serif}
    .wag-public-hero{position:relative;overflow:hidden;display:grid;grid-template-columns:minmax(0,1.04fr) minmax(360px,.96fr);gap:46px;align-items:center;min-height:575px;padding:58px;border-radius:38px;background:radial-gradient(circle at 82% 12%,rgba(255,153,80,.24),transparent 28%),radial-gradient(circle at 68% 74%,rgba(126,172,255,.19),transparent 32%),linear-gradient(145deg,rgba(255,255,255,.94),rgba(235,240,248,.8));box-shadow:inset 0 0 0 1px rgba(11,30,63,.085),0 36px 90px -72px rgba(7,16,31,.7)}
    .wag-public-copy{position:relative;z-index:2}.wag-public-eyebrow{display:inline-flex;align-items:center;gap:8px;margin-bottom:18px;color:#e26713;font:800 10px/1 Poppins;letter-spacing:.12em;text-transform:uppercase}.wag-public-eyebrow:before{content:'';width:7px;height:7px;border-radius:50%;background:#ff7a1a;box-shadow:0 0 0 5px rgba(255,122,26,.11)}
    .wag-public-copy h1{max-width:650px;margin:0;font-size:clamp(46px,6.4vw,82px);line-height:.93;letter-spacing:-.067em}.wag-public-copy h1 span{color:#ff7a1a}.wag-public-copy>p{max-width:575px;margin:24px 0 0;color:#69768a;font-size:14px;line-height:1.75}
    .wag-public-cta{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:30px}.wag-public-primary,.wag-public-secondary{border:0;border-radius:999px;padding:14px 20px;font:800 11px/1 Poppins;cursor:pointer;text-decoration:none}.wag-public-primary{background:#0b1e3f;color:#fff;box-shadow:0 16px 30px -20px rgba(11,30,63,.8)}.wag-public-secondary{background:rgba(255,255,255,.72);color:#0b1e3f;box-shadow:inset 0 0 0 1px rgba(11,30,63,.11)}
    .wag-public-proof{display:flex;gap:20px;flex-wrap:wrap;margin-top:28px;color:#7a8799;font-size:9px;font-weight:650}.wag-public-proof span{display:inline-flex;align-items:center;gap:7px}.wag-public-proof span:before{content:'✓';display:grid;place-items:center;width:18px;height:18px;border-radius:50%;background:rgba(34,160,107,.1);color:#168053;font-size:10px}

    .wag-public-visual{position:relative;min-height:430px}.wag-public-phone{position:absolute;right:4%;top:0;width:min(330px,82%);height:430px;padding:15px;border-radius:37px;background:#0b1e3f;box-shadow:0 34px 70px -32px rgba(7,16,31,.58);transform:rotate(3deg)}.wag-public-screen{height:100%;overflow:hidden;border-radius:26px;background:linear-gradient(160deg,#f8f8f3,#e8edf6);padding:22px}.wag-public-screen-head{display:flex;align-items:center;justify-content:space-between}.wag-public-screen-brand{font:800 16px Poppins;letter-spacing:-.05em}.wag-public-screen-dot{width:28px;height:28px;border-radius:50%;background:#ff7a1a}.wag-public-screen h3{margin:38px 0 9px;font-size:28px;line-height:.95;letter-spacing:-.055em}.wag-public-screen p{margin:0;color:#7b8797;font-size:9px;line-height:1.5}.wag-public-stack{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:20px}.wag-public-mini{min-height:94px;padding:13px;border-radius:18px;background:rgba(255,255,255,.86);box-shadow:inset 0 0 0 1px rgba(11,30,63,.08)}.wag-public-mini b{display:block;font-size:10px}.wag-public-mini small{display:block;margin-top:6px;color:#8995a4;font-size:7.5px;line-height:1.45}.wag-public-mini:nth-child(1){grid-column:1/-1;min-height:112px;background:linear-gradient(135deg,#fff3e8,#fff)}
    .wag-public-product{position:absolute;left:0;bottom:23px;width:180px;padding:12px;border-radius:25px;background:rgba(255,255,255,.9);box-shadow:0 25px 55px -32px rgba(7,16,31,.58),inset 0 0 0 1px rgba(11,30,63,.08);backdrop-filter:blur(14px);transform:rotate(-7deg)}.wag-public-product img{display:block;width:100%;height:130px;object-fit:cover;border-radius:17px}.wag-public-product b{display:block;margin:10px 4px 2px;font-size:10px}.wag-public-product small{display:block;margin:0 4px;color:#8793a3;font-size:8px}

    .wag-public-section{padding:72px 6px 8px}.wag-public-section-head{display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:25px}.wag-public-section-head div{max-width:660px}.wag-public-kicker{color:#ff7a1a;font:800 9px Poppins;letter-spacing:.12em;text-transform:uppercase}.wag-public-section h2{margin:8px 0 0;font-size:clamp(30px,4vw,50px);line-height:1;letter-spacing:-.055em}.wag-public-section-head p{max-width:420px;margin:0;color:#798698;font-size:11px;line-height:1.65}
    .wag-public-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}.wag-public-feature{min-height:225px;padding:24px;border-radius:26px;background:rgba(255,255,255,.7);box-shadow:inset 0 0 0 1px rgba(11,30,63,.08);display:flex;flex-direction:column}.wag-public-feature-no{color:#ff7a1a;font:800 9px Poppins;letter-spacing:.12em}.wag-public-feature h3{margin:auto 0 8px;font-size:19px;letter-spacing:-.04em}.wag-public-feature p{margin:0;color:#7d8999;font-size:10px;line-height:1.62}
    .wag-public-bottom{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:72px;padding:36px 40px;border-radius:30px;background:#0b1e3f;color:#fff}.wag-public-bottom h2{margin:0;font-size:clamp(27px,4vw,43px);letter-spacing:-.055em}.wag-public-bottom p{margin:8px 0 0;color:#aab7c8;font-size:10px}.wag-public-bottom .wag-public-primary{background:#ff7a1a;white-space:nowrap}
    .wag-public-footer{display:flex;justify-content:space-between;gap:20px;padding:28px 3px 4px;color:#8995a4;font-size:8px}.wag-public-footer a{color:inherit;text-decoration:none}

    body.wag-public-mode:not(.wag-public-home-route) #main-content>.wag-public-nav{margin-bottom:0}
    body.wag-public-mode:not(.wag-public-home-route) #main-content>.clone-page,body.wag-public-mode:not(.wag-public-home-route) #main-content>.v27-shop{width:min(1180px,calc(100% - 40px));margin:0 auto 60px!important}
    body.wag-public-mode:not(.wag-public-home-route) #main-content .clone-page{padding-top:25px!important}

    @media(max-width:860px){.wag-public-hero{grid-template-columns:1fr;padding:38px;gap:30px}.wag-public-visual{min-height:390px}.wag-public-phone{right:8%}.wag-public-grid{grid-template-columns:1fr}.wag-public-feature{min-height:170px}.wag-public-section-head{align-items:flex-start;flex-direction:column}.wag-public-bottom{align-items:flex-start;flex-direction:column}}
    @media(max-width:620px){.wag-public-nav{width:calc(100% - 28px);padding:14px 0}.wag-public-brand{font-size:18px}.wag-public-brand img{width:27px;height:27px}.wag-public-link{padding:9px 10px;font-size:9px}.wag-public-auth{padding:10px 12px;font-size:9px}.wag-public-home{width:calc(100% - 24px);padding-top:18px}.wag-public-hero{min-height:0;padding:27px 22px;border-radius:27px}.wag-public-copy h1{font-size:46px}.wag-public-copy>p{font-size:12px}.wag-public-visual{min-height:330px}.wag-public-phone{height:330px;width:76%;right:2%;border-radius:29px;padding:10px}.wag-public-screen{border-radius:21px;padding:16px}.wag-public-screen h3{margin-top:25px;font-size:23px}.wag-public-product{width:145px;bottom:8px}.wag-public-product img{height:100px}.wag-public-section{padding-top:52px}.wag-public-bottom{padding:28px 24px}.wag-public-footer{flex-direction:column}}
  `;
  document.head.appendChild(style);

  function auth(){
    const hidden=document.querySelector('.wag-cloud-btn');
    if(hidden){hidden.click();return}
    document.querySelector('.wag-rail-auth')?.click();
  }

  function nav(current='/'){
    return `<header class="wag-public-nav" data-public-nav>
      <a class="wag-public-brand" href="/" data-public-link><img src="/assets/wagstack-brandmark.svg" alt=""><span>wagstack<em>.</em></span></a>
      <nav class="wag-public-links" aria-label="Public navigation">
        <a class="wag-public-link${current==='/shop'?' is-current':''}" href="/shop" data-public-link>Shop</a>
        <a class="wag-public-link${current==='/about'?' is-current':''}" href="/about" data-public-link>About</a>
        <button class="wag-public-auth" type="button" data-public-auth>Sign in</button>
      </nav>
    </header>`;
  }

  function landing(){
    return `${nav('/')}
      <main class="wag-public-home" data-public-home>
        <section class="wag-public-hero">
          <div class="wag-public-copy">
            <div class="wag-public-eyebrow">Pet care, connected</div>
            <h1>Everything about your pet. <span>One place.</span></h1>
            <p>Keep profiles, health records, grooming, hotel stays, rewards and everyday care together — ready whenever you need them.</p>
            <div class="wag-public-cta">
              <button class="wag-public-primary" type="button" data-public-auth>Create your WagStack</button>
              <a class="wag-public-secondary" href="/shop" data-public-link>Browse the shop</a>
            </div>
            <div class="wag-public-proof"><span>One account for all your pets</span><span>Private pet records</span><span>Built for repeat care</span></div>
          </div>
          <div class="wag-public-visual" aria-hidden="true">
            <div class="wag-public-phone"><div class="wag-public-screen"><div class="wag-public-screen-head"><span class="wag-public-screen-brand">wagstack.</span><span class="wag-public-screen-dot"></span></div><h3>Your pet life,<br>organized.</h3><p>Care history follows your pet from one visit to the next.</p><div class="wag-public-stack"><div class="wag-public-mini"><b>Pet profile</b><small>Health, preferences and appointments in one Pawfile.</small></div><div class="wag-public-mini"><b>Grooming</b><small>Book and keep the usual style ready.</small></div><div class="wag-public-mini"><b>Rewards</b><small>Earn points across care and shop purchases.</small></div></div></div></div>
            <div class="wag-public-product"><img src="/assets/shop/shampoo.webp" alt=""><b>Sensitive Skin Shampoo</b><small>WagStack Shop</small></div>
          </div>
        </section>

        <section class="wag-public-section">
          <div class="wag-public-section-head"><div><div class="wag-public-kicker">Inside your account</div><h2>Less chasing. More caring.</h2></div><p>The public site stays simple. Sign in when you want the personal parts of WagStack — your pets, records, bookings and rewards.</p></div>
          <div class="wag-public-grid">
            <article class="wag-public-feature"><span class="wag-public-feature-no">01 · PAWFILE</span><h3>One profile per pet</h3><p>Keep their important details, care preferences, photos and notes attached to the right pet.</p></article>
            <article class="wag-public-feature"><span class="wag-public-feature-no">02 · CARE</span><h3>Health & booking history</h3><p>Vaccinations, treatments, grooming and hotel stays stay organized instead of scattered across messages.</p></article>
            <article class="wag-public-feature"><span class="wag-public-feature-no">03 · REWARDS</span><h3>Care that remembers you</h3><p>Return visits are easier because WagStack keeps the details and rewards connected to your account.</p></article>
          </div>
        </section>

        <section class="wag-public-bottom"><div><h2>Ready to build their Pawfile?</h2><p>Create an account to unlock the full pet-care workspace.</p></div><button class="wag-public-primary" type="button" data-public-auth>Create account</button></section>
        <footer class="wag-public-footer"><span>WagStack by Brick & Bond</span><span><a href="/shop" data-public-link>Shop</a> · <a href="/about" data-public-link>About</a></span></footer>
      </main>`;
  }

  function isPublicPath(){return PUBLIC_PATHS.has(location.pathname)}

  function renderPublic(){
    if(rendering||signedIn())return;
    rendering=true;
    document.body?.classList.add('wag-public-mode');
    document.body?.classList.toggle('wag-public-home-route',location.pathname==='/');

    if(!isPublicPath()){
      history.replaceState({},'', '/');
    }

    const main=document.querySelector('#main-content');
    if(!main){rendering=false;return}

    if(location.pathname==='/'){
      if(!main.querySelector('[data-public-home]')){
        main.className='shell__panel';
        main.removeAttribute('data-fixed');
        main.innerHTML=landing();
      }
      document.title='WagStack — Pet care, connected';
    }else{
      let existing=main.querySelector(':scope > [data-public-nav]');
      if(!existing) main.insertAdjacentHTML('afterbegin',nav(location.pathname));
      else existing.outerHTML=nav(location.pathname);
    }
    rendering=false;
    window.dispatchEvent(new CustomEvent('wagstack:ui-ready'));
  }

  function restoreApp(){
    if(!signedIn())return;
    document.body?.classList.remove('wag-public-mode','wag-public-home-route');
    document.querySelector('[data-public-nav]')?.remove();
  }

  document.addEventListener('click',e=>{
    if(signedIn())return;
    const authBtn=e.target.closest('[data-public-auth]');
    if(authBtn){e.preventDefault();e.stopImmediatePropagation();auth();return}
    const link=e.target.closest('a');
    if(!link)return;
    const u=new URL(link.href,location.href);
    if(u.origin!==location.origin)return;
    if(!PUBLIC_PATHS.has(u.pathname)){
      e.preventDefault();e.stopImmediatePropagation();history.pushState({},'', '/');renderPublic();
    }
  },true);

  const routeSync=()=>setTimeout(()=>signedIn()?restoreApp():renderPublic(),0);
  window.addEventListener('popstate',routeSync);
  window.addEventListener('wagstack:auth-ready',routeSync);
  window.addEventListener('storage',routeSync);
  observeUI(()=>{if(!signedIn())renderPublic()});
  routeSync();
})();
