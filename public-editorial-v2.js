import { observeUI } from './ui-lifecycle.js';

(()=>{
  if(location.pathname==='/admin'||location.pathname.startsWith('/auth/'))return;

  const style=document.createElement('style');
  style.id='wag-public-editorial-v2-style';
  style.textContent=`
  body.wag-public-mode .hero-canvas{display:none!important}
  body.wag-public-mode{background:#f4f3ed!important}

  .wag-public-home.wag-editorial{width:min(1180px,calc(100% - 40px))!important;padding:18px 0 72px!important}
  .wag-editorial *{box-sizing:border-box}

  .wag-editorial-hero{display:grid;grid-template-columns:minmax(0,.78fr) minmax(460px,1.22fr);gap:52px;align-items:center;padding:58px 0 64px;border-top:1px solid rgba(11,30,63,.12);border-bottom:1px solid rgba(11,30,63,.12)}
  .wag-editorial-copy{align-self:center;max-width:540px}
  .wag-editorial-kicker{margin:0 0 20px;color:#d96516;font:800 10px/1 Poppins,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase}
  .wag-editorial-copy h1{margin:0;color:#0b1e3f;font:800 clamp(46px,5.3vw,70px)/.96 Poppins,Arial,sans-serif;letter-spacing:-.062em}
  .wag-editorial-copy h1 em{font-style:normal;color:#ff7a1a}
  .wag-editorial-copy>p{max-width:500px;margin:24px 0 0;color:#637083;font:500 14px/1.75 Poppins,Arial,sans-serif}
  .wag-editorial-actions{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:30px}
  .wag-editorial-primary,.wag-editorial-textlink{font:800 11px/1 Poppins,Arial,sans-serif;text-decoration:none;cursor:pointer}
  .wag-editorial-primary{border:0;border-radius:10px;background:#0b1e3f;color:#fff;padding:14px 18px}
  .wag-editorial-textlink{color:#0b1e3f;padding:13px 4px;border-bottom:1px solid rgba(11,30,63,.35)}
  .wag-editorial-meta{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:36px;border-top:1px solid rgba(11,30,63,.12)}
  .wag-editorial-meta div{padding:14px 12px 0 0;border-right:1px solid rgba(11,30,63,.1)}
  .wag-editorial-meta div:last-child{border-right:0;padding-left:12px}.wag-editorial-meta div:nth-child(2){padding-left:12px}
  .wag-editorial-meta strong{display:block;color:#0b1e3f;font:800 12px/1.2 Poppins}.wag-editorial-meta span{display:block;margin-top:5px;color:#8993a1;font:500 8px/1.45 Poppins}

  .wag-product-preview{position:relative;background:#fff;border:1px solid rgba(11,30,63,.12);min-height:470px;overflow:hidden}
  .wag-product-preview__bar{height:46px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid rgba(11,30,63,.11);background:#fafaf7}
  .wag-product-preview__brand{display:flex;align-items:center;gap:8px;color:#0b1e3f;font:800 12px/1 Poppins}.wag-product-preview__brand img{width:22px;height:22px}
  .wag-product-preview__nav{display:flex;gap:14px;color:#8b95a3;font:700 8px/1 Poppins}.wag-product-preview__nav b{color:#0b1e3f}
  .wag-product-preview__body{display:grid;grid-template-columns:150px 1fr;min-height:424px}
  .wag-product-preview__side{padding:18px 13px;border-right:1px solid rgba(11,30,63,.1);background:#f7f7f2}
  .wag-product-preview__pet{display:grid;grid-template-columns:38px 1fr;gap:9px;align-items:center;padding-bottom:17px;border-bottom:1px solid rgba(11,30,63,.1)}
  .wag-product-preview__pet img{width:38px;height:38px;object-fit:cover;border-radius:8px}.wag-product-preview__pet strong{display:block;color:#0b1e3f;font:800 9px/1.15 Poppins}.wag-product-preview__pet span{display:block;margin-top:3px;color:#8b95a3;font:500 7px/1.2 Poppins}
  .wag-product-preview__menu{display:grid;gap:4px;margin-top:14px}.wag-product-preview__menu span{padding:9px 8px;color:#778394;font:700 8px/1 Poppins}.wag-product-preview__menu span.is-on{background:#0b1e3f;color:white}
  .wag-product-preview__main{padding:22px 22px 20px;background:#fff}
  .wag-product-preview__eyebrow{color:#ff7a1a;font:800 8px/1 Poppins;letter-spacing:.12em;text-transform:uppercase}.wag-product-preview__main h3{margin:6px 0 5px;color:#0b1e3f;font:800 25px/1 Poppins;letter-spacing:-.045em}.wag-product-preview__main>p{margin:0;color:#8b95a3;font:500 8px/1.5 Poppins}
  .wag-product-preview__grid{display:grid;grid-template-columns:1.15fr .85fr;gap:10px;margin-top:18px}.wag-product-preview__panel{min-height:112px;padding:15px;border:1px solid rgba(11,30,63,.1);background:#fafaf7}.wag-product-preview__panel.wide{grid-row:span 2;min-height:235px}.wag-product-preview__panel small{display:block;color:#8994a2;font:800 7px/1 Poppins;text-transform:uppercase;letter-spacing:.08em}.wag-product-preview__panel strong{display:block;margin-top:7px;color:#0b1e3f;font:800 13px/1.15 Poppins}.wag-product-preview__panel p{margin:7px 0 0;color:#8a95a4;font:500 8px/1.5 Poppins}.wag-product-preview__timeline{display:grid;gap:9px;margin-top:17px}.wag-product-preview__event{display:grid;grid-template-columns:56px 1fr;gap:9px;padding-top:9px;border-top:1px solid rgba(11,30,63,.08)}.wag-product-preview__event time{color:#ff7a1a;font:800 7px/1.2 Poppins}.wag-product-preview__event span{color:#5f6d80;font:600 8px/1.35 Poppins}
  .wag-product-preview__tag{display:inline-block;margin-top:12px;padding:5px 7px;background:#fff1e7;color:#bd5b17;font:800 7px/1 Poppins}

  .wag-editorial-section{display:grid;grid-template-columns:260px 1fr;gap:60px;padding:76px 0;border-bottom:1px solid rgba(11,30,63,.12)}
  .wag-editorial-section__intro h2{margin:7px 0 0;color:#0b1e3f;font:800 34px/1 Poppins;letter-spacing:-.05em}.wag-editorial-section__intro p{margin:16px 0 0;color:#7c8796;font:500 10px/1.7 Poppins}
  .wag-editorial-list{border-top:1px solid rgba(11,30,63,.13)}.wag-editorial-row{display:grid;grid-template-columns:42px 180px 1fr;gap:18px;padding:22px 0;border-bottom:1px solid rgba(11,30,63,.1);align-items:start}.wag-editorial-row>span{color:#ff7a1a;font:800 9px/1 Poppins}.wag-editorial-row h3{margin:0;color:#0b1e3f;font:800 16px/1.2 Poppins}.wag-editorial-row p{margin:0;color:#748092;font:500 10px/1.65 Poppins}

  .wag-editorial-shop{padding:74px 0 0}.wag-editorial-shop__head{display:flex;justify-content:space-between;gap:30px;align-items:end;margin-bottom:22px}.wag-editorial-shop__head h2{margin:7px 0 0;color:#0b1e3f;font:800 34px/1 Poppins;letter-spacing:-.05em}.wag-editorial-shop__head a{color:#0b1e3f;font:800 10px/1 Poppins;text-decoration:none;border-bottom:1px solid rgba(11,30,63,.3);padding-bottom:5px}
  .wag-editorial-products{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(11,30,63,.12);border:1px solid rgba(11,30,63,.12)}.wag-editorial-product{background:#f4f3ed;text-decoration:none;color:#0b1e3f}.wag-editorial-product img{display:block;width:100%;height:180px;object-fit:cover;background:#fff}.wag-editorial-product div{padding:14px}.wag-editorial-product strong{display:block;font:800 11px/1.3 Poppins}.wag-editorial-product span{display:block;margin-top:5px;color:#8a95a4;font:600 8px/1.2 Poppins}

  .wag-editorial-final{display:grid;grid-template-columns:1fr auto;gap:30px;align-items:center;margin-top:74px;padding:34px 0;border-top:2px solid #0b1e3f;border-bottom:2px solid #0b1e3f}.wag-editorial-final h2{margin:0;color:#0b1e3f;font:800 clamp(28px,4vw,42px)/1 Poppins;letter-spacing:-.05em}.wag-editorial-final p{margin:9px 0 0;color:#7c8796;font:500 10px/1.6 Poppins}
  .wag-editorial-footer{display:flex;justify-content:space-between;gap:20px;padding:28px 0 0;color:#8a95a3;font:600 8px/1.4 Poppins}.wag-editorial-footer a{color:inherit;text-decoration:none}

  @media(max-width:920px){.wag-editorial-hero{grid-template-columns:1fr;gap:38px}.wag-product-preview{min-height:430px}.wag-editorial-section{grid-template-columns:1fr;gap:28px}.wag-editorial-list{margin-top:4px}.wag-editorial-products{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:620px){.wag-public-home.wag-editorial{width:calc(100% - 28px)!important;padding-top:8px!important}.wag-editorial-hero{padding:38px 0 44px;gap:30px}.wag-editorial-copy h1{font-size:46px}.wag-editorial-copy>p{font-size:12px}.wag-editorial-meta{grid-template-columns:1fr}.wag-editorial-meta div,.wag-editorial-meta div:nth-child(2),.wag-editorial-meta div:last-child{padding:12px 0;border-right:0;border-bottom:1px solid rgba(11,30,63,.08)}.wag-product-preview__body{grid-template-columns:1fr}.wag-product-preview__side{display:none}.wag-product-preview__main{padding:17px}.wag-product-preview__grid{grid-template-columns:1fr}.wag-product-preview__panel.wide{grid-row:auto;min-height:180px}.wag-editorial-section{padding:56px 0}.wag-editorial-row{grid-template-columns:32px 1fr}.wag-editorial-row p{grid-column:2}.wag-editorial-products{grid-template-columns:1fr 1fr}.wag-editorial-product img{height:135px}.wag-editorial-final{grid-template-columns:1fr;align-items:start}.wag-editorial-footer{flex-direction:column}}
  `;
  document.head.appendChild(style);

  function render(){
    if(!document.body?.classList.contains('wag-public-mode')||location.pathname!=='/')return;
    const home=document.querySelector('[data-public-home]');
    if(!home||home.dataset.editorialV2==='1')return;
    home.dataset.editorialV2='1';
    home.classList.add('wag-editorial');
    home.innerHTML=`
      <section class="wag-editorial-hero">
        <div class="wag-editorial-copy">
          <div class="wag-editorial-kicker">WagStack for pet parents</div>
          <h1>Your pet’s care history, <em>kept together.</em></h1>
          <p>One place for the details you actually need again: profiles, health notes, grooming preferences, hotel stays, bookings and rewards.</p>
          <div class="wag-editorial-actions">
            <button class="wag-editorial-primary" type="button" data-public-auth>Create an account</button>
            <a class="wag-editorial-textlink" href="/shop" data-public-link>Shop pet essentials</a>
          </div>
          <div class="wag-editorial-meta">
            <div><strong>Pawfile</strong><span>Pet profile + records</span></div>
            <div><strong>Care</strong><span>Grooming + hotel</span></div>
            <div><strong>Rewards</strong><span>Points + membership</span></div>
          </div>
        </div>
        <div class="wag-product-preview" aria-label="Example WagStack pet workspace">
          <div class="wag-product-preview__bar"><span class="wag-product-preview__brand"><img src="/assets/wagstack-brandmark.svg" alt="">wagstack.</span><span class="wag-product-preview__nav"><b>Pawfile</b><span>Care</span><span>Shop</span></span></div>
          <div class="wag-product-preview__body">
            <aside class="wag-product-preview__side"><div class="wag-product-preview__pet"><img src="/assets/pet-mochi.png" alt=""><div><strong>Mochi</strong><span>Shih Tzu</span></div></div><div class="wag-product-preview__menu"><span class="is-on">Overview</span><span>Health</span><span>Appointments</span><span>Notes</span></div></aside>
            <div class="wag-product-preview__main"><span class="wag-product-preview__eyebrow">Pet workspace</span><h3>Mochi’s Pawfile</h3><p>Care information that stays useful between visits.</p><div class="wag-product-preview__grid"><article class="wag-product-preview__panel wide"><small>Care history</small><strong>Recent & upcoming</strong><div class="wag-product-preview__timeline"><div class="wag-product-preview__event"><time>SEP 18</time><span>Full Grooming · 10:00 AM</span></div><div class="wag-product-preview__event"><time>SEP 28</time><span>Deworming reminder</span></div><div class="wag-product-preview__event"><time>OCT 04</time><span>Hotel stay · 2 nights</span></div></div><span class="wag-product-preview__tag">All in one pet record</span></article><article class="wag-product-preview__panel"><small>Health</small><strong>Vaccinations current</strong><p>Preventives and care notes stay attached to the pet.</p></article><article class="wag-product-preview__panel"><small>Preferences</small><strong>Usual groom saved</strong><p>Keep the details your groomer needs next time.</p></article></div></div>
          </div>
        </div>
      </section>

      <section class="wag-editorial-section">
        <div class="wag-editorial-section__intro"><div class="wag-editorial-kicker">What it keeps track of</div><h2>Built around repeat care.</h2><p>WagStack is less about adding another app and more about not having to remember the same details over and over.</p></div>
        <div class="wag-editorial-list">
          <article class="wag-editorial-row"><span>01</span><h3>Pet profiles</h3><p>Keep breed, age, weight, photos and care preferences attached to the right pet.</p></article>
          <article class="wag-editorial-row"><span>02</span><h3>Health & care</h3><p>Store vaccinations, deworming, flea and tick records, conditions, medication and notes.</p></article>
          <article class="wag-editorial-row"><span>03</span><h3>Bookings</h3><p>Use the same profile for grooming and hotel stays instead of starting from scratch every visit.</p></article>
          <article class="wag-editorial-row"><span>04</span><h3>Rewards</h3><p>Keep points, membership and shop activity connected to the same fur-parent account.</p></article>
        </div>
      </section>

      <section class="wag-editorial-shop">
        <div class="wag-editorial-shop__head"><div><div class="wag-editorial-kicker">WagStack Shop</div><h2>Everyday care, without leaving WagStack.</h2></div><a href="/shop" data-public-link>View the shop →</a></div>
        <div class="wag-editorial-products">
          <a class="wag-editorial-product" href="/shop" data-public-link><img src="/assets/shop/shampoo.webp" alt="Sensitive Skin Shampoo"><div><strong>Sensitive Skin Shampoo</strong><span>Gentle everyday care</span></div></a>
          <a class="wag-editorial-product" href="/shop" data-public-link><img src="/assets/shop/balm.webp" alt="Paw and Nose Balm"><div><strong>Paw & Nose Balm</strong><span>Daily skin protection</span></div></a>
          <a class="wag-editorial-product" href="/shop" data-public-link><img src="/assets/shop/dental.webp" alt="Dental Chews"><div><strong>Dental Chews</strong><span>Routine oral care</span></div></a>
          <a class="wag-editorial-product" href="/shop" data-public-link><img src="/assets/shop/puzzle.webp" alt="Enrichment Toy"><div><strong>Enrichment Toy</strong><span>Play and stimulation</span></div></a>
        </div>
      </section>

      <section class="wag-editorial-final"><div><h2>Start with your first pet.</h2><p>Create a WagStack account, add a pet, and build the record from there.</p></div><button class="wag-editorial-primary" type="button" data-public-auth>Create an account</button></section>
      <footer class="wag-editorial-footer"><span>WagStack · Pet care, connected.</span><span><a href="/about" data-public-link>About</a> · <a href="/shop" data-public-link>Shop</a></span></footer>`;
  }

  render();
  observeUI(render);
  window.addEventListener('popstate',()=>setTimeout(render,0));
})();
