import { observeUI } from './ui-lifecycle.js';


const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

const WEATHER_ID = 'quezon-city';
let cachedContent=null;
let loading=null;

function installUpdateStyles() {
  if (document.getElementById('branddemo-updates-enhanced')) return;
  const style = document.createElement('style');
  style.id = 'branddemo-updates-enhanced';
  style.textContent = `
    .home__promo-card.updates-enhanced .home__promo-head .bento__title{display:none!important}
    .home__promo-card.updates-enhanced .home__promo-head{justify-content:flex-end!important}
    .home__promo-card.updates-enhanced .home__promo-slide{position:relative!important;overflow:hidden!important}
    .home__promo-card.updates-enhanced .update-copy{position:relative;z-index:4;display:flex;flex-direction:column;align-items:flex-start;max-width:min(58%,340px);min-width:0}
    .home__promo-card.updates-enhanced .update-copy>span{font-size:8px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;opacity:.64;margin-bottom:7px}
    .home__promo-card.updates-enhanced .update-copy>strong{font-size:clamp(15px,1.35vw,19px);line-height:1.08;letter-spacing:-.025em;max-width:17ch}
    .home__promo-card.updates-enhanced .update-copy>small{font-size:10px;line-height:1.4;margin-top:7px;max-width:34ch;opacity:.72}
    .home__promo-card.updates-enhanced .update-cta{display:inline-flex;align-items:center;gap:6px;margin-top:10px;font-size:9px;font-weight:800;text-decoration:none;color:inherit}
    .home__promo-card.updates-enhanced .update-image{position:absolute!important;right:0!important;top:0!important;width:44%!important;height:100%!important;object-fit:cover!important;object-position:center!important;margin:0!important;border-radius:0!important;mask-image:linear-gradient(90deg,transparent 0,#000 22%);-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 22%)}
    .home__promo-card.updates-enhanced .update-adoption-art{position:absolute;right:0;top:0;width:46%;height:100%;display:grid;place-items:end center;overflow:hidden;pointer-events:none}
    .home__promo-card.updates-enhanced .update-adoption-art svg{display:block;width:100%;height:100%}
    .home__promo-card.updates-enhanced .weather-slide{background:linear-gradient(120deg,rgba(252,247,239,.98),rgba(244,238,225,.96))!important}
    .home__promo-card.updates-enhanced .weather-art{position:absolute;right:20px;top:50%;transform:translateY(-50%);z-index:2;display:grid;grid-template-columns:auto auto;align-items:center;gap:12px;min-width:38%}
    .home__promo-card.updates-enhanced .weather-icon{width:72px;height:72px;border-radius:24px;display:grid;place-items:center;background:rgba(255,255,255,.62);box-shadow:inset 0 0 0 1px rgba(20,35,58,.07),0 12px 30px rgba(20,35,58,.07);font-size:34px}
    .home__promo-card.updates-enhanced .weather-metrics{display:grid;gap:5px;font-size:9px;font-weight:800;color:#172238}
    .home__promo-card.updates-enhanced .weather-metrics b{font-size:20px;line-height:1;letter-spacing:-.04em}
    .home__promo-card.updates-enhanced .weather-metrics span{opacity:.62;font-weight:700}
    .home__promo-card.updates-enhanced .weather-source{position:absolute;right:18px;bottom:10px;font-size:7px;opacity:.42;z-index:5}
    @media(max-width:720px){
      .home__promo-card.updates-enhanced .update-copy{max-width:62%}
      .home__promo-card.updates-enhanced .update-copy>strong{font-size:15px}
      .home__promo-card.updates-enhanced .update-copy>small{font-size:9px;max-width:28ch}
      .home__promo-card.updates-enhanced .update-image,.home__promo-card.updates-enhanced .update-adoption-art{width:43%!important}
      .home__promo-card.updates-enhanced .weather-art{right:13px;gap:8px;min-width:auto}
      .home__promo-card.updates-enhanced .weather-icon{width:54px;height:54px;border-radius:18px;font-size:27px}
      .home__promo-card.updates-enhanced .weather-metrics b{font-size:16px}
    }
  `;
  document.head.appendChild(style);
}

function renderDbUpdate(item) {
  const href = String(item.cta_href || '').trim();
  const allowedHref = /^\/(?![\/\\])/.test(href) ? href : '#';
  return `<article class="home__promo-slide" data-update-id="${escapeHtml(item.id)}">
    <div class="update-copy">
      ${item.eyebrow ? `<span>${escapeHtml(item.eyebrow)}</span>` : ''}
      <strong>${escapeHtml(item.title)}</strong>
      ${item.body ? `<small>${escapeHtml(item.body)}</small>` : ''}
      ${item.cta_label ? `<a class="update-cta" href="${escapeHtml(allowedHref)}">${escapeHtml(item.cta_label)} <span aria-hidden="true">→</span></a>` : ''}
    </div>
    ${item.image_url ? `<img class="update-image" src="${escapeHtml(item.image_url)}" alt="" width="420" height="280" decoding="async" loading="lazy">` : ''}
  </article>`;
}

function renderAdoptionSlide() {
  return `<article class="home__promo-slide adoption-slide" data-update-id="adoption-community">
    <div class="update-copy">
      <span>ADOPT LOCAL</span>
      <strong>A home changes everything.</strong>
      <small>Aspin and Puspin companions are waiting for safe, loving homes. Choose adoption when you can.</small>
      <a class="update-cta" href="/" data-adoption-learn>Learn about adoption <span aria-hidden="true">→</span></a>
    </div>
    <div class="update-adoption-art" aria-hidden="true">
      <svg viewBox="0 0 420 280" preserveAspectRatio="xMidYMid slice" role="img">
        <defs>
          <linearGradient id="adoptBg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f4c46e"/><stop offset="1" stop-color="#e9784a"/></linearGradient>
          <radialGradient id="adoptGlow"><stop stop-color="#fff7e7" stop-opacity=".9"/><stop offset="1" stop-color="#fff7e7" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="420" height="280" fill="url(#adoptBg)"/>
        <circle cx="226" cy="88" r="130" fill="url(#adoptGlow)"/>
        <g transform="translate(50 71)">
          <path d="M34 65C20 40 26 15 45 5l16 30c12-7 27-8 40-2L119 5c19 11 24 38 9 61 12 14 18 32 18 52 0 54-34 88-75 88S0 172 0 118c0-21 12-40 34-53Z" fill="#f8efe2"/>
          <circle cx="52" cy="72" r="5" fill="#172238"/><circle cx="95" cy="72" r="5" fill="#172238"/>
          <path d="M66 86h15l-7 8Z" fill="#172238"/><path d="M51 108c15 11 31 11 47 0" fill="none" stroke="#172238" stroke-width="4" stroke-linecap="round"/>
          <path d="M19 145c13-13 34-19 55-19s42 6 56 19v61H19Z" fill="#1c2940"/>
        </g>
        <g transform="translate(222 79)">
          <path d="M24 58 10 9l42 25c17-7 35-7 53 0l42-25-14 49c16 17 24 38 24 61 0 53-35 86-79 86S0 172 0 119c0-23 8-44 24-61Z" fill="#fff7e7"/>
          <circle cx="53" cy="76" r="5" fill="#172238"/><circle cx="104" cy="76" r="5" fill="#172238"/>
          <path d="M71 89h16l-8 8Z" fill="#e9784a"/><path d="M63 105c10 8 21 8 31 0" fill="none" stroke="#172238" stroke-width="4" stroke-linecap="round"/>
          <path d="M18 145c16-13 36-19 61-19 23 0 43 6 60 19v60H18Z" fill="#283956"/>
        </g>
      </svg>
    </div>
  </article>`;
}

function weatherIcon(weather) {
  const condition=String(weather?.condition||'').toLowerCase();
  const cloud='<path d="M6 17a4 4 0 0 1-1-7.87A6 6 0 0 1 17 9a4 4 0 0 1 1 8Z" fill="currentColor" opacity=".2"/><path d="M6 17a4 4 0 0 1-1-7.87A6 6 0 0 1 17 9a4 4 0 0 1 1 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';
  const detail=condition.includes('thunder')?'<path d="m13 14-3 5h4l-3 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>':condition.includes('rain')?'<path d="m8 19-1 2m6-2-1 2m6-2-1 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>':'';
  const sun='<circle cx="12" cy="12" r="5" fill="currentColor" opacity=".2"/><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></g>';
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${weather?.hot&&!/cloud|rain|thunder/.test(condition)?sun:cloud+detail}</svg>`;
}

function renderWeatherSlide(post) {
  const weather = post?.weather;
  if (!weather || typeof weather !== 'object') return '';
  const temperature = Number(weather.temperature);
  const wind = Number(weather.wind);
  const rain = Number(weather.rain);
  if (![temperature, wind, rain].every(Number.isFinite)) return '';
  const condition = escapeHtml(weather.condition || 'Weather update');
  const checked=Date.parse(post.last_checked_at||post.published_at||'');
  const stale=!Number.isFinite(checked)||Date.now()-checked>2*60*60*1000;
  const reason = weather.reason === 'Conditions easing' ? 'Conditions have eased' : weather.reason === 'Temperature shifted' ? 'A noticeable temperature shift was detected' : 'A meaningful weather change was detected';
  return `<article class="home__promo-slide weather-slide" data-update-id="weather-${WEATHER_ID}">
    <div class="update-copy">
      <span>QUEZON CITY · WEATHER</span>
      <strong>${condition}</strong>
      <small>${stale?'Last reported conditions. Check the latest forecast before heading out.':escapeHtml(weather.hot?'Plan walks for cooler hours and keep water handy':String(weather.condition).toLowerCase().includes('rain')||String(weather.condition).toLowerCase().includes('thunder')?'Keep walks brief and plan indoor play':reason)+'.'}</small>
    </div>
    <div class="weather-art" aria-label="${condition}, ${Math.round(temperature)} degrees Celsius, wind ${Math.round(wind)} kilometers per hour">
      <div class="weather-icon" aria-hidden="true">${weatherIcon(weather)}</div>
      <div class="weather-metrics"><b>${Math.round(temperature)}°</b><span>${Math.round(wind)} km/h wind</span><span>${rain.toFixed(rain >= 1 ? 1 : 1)} mm rain</span></div>
    </div>
    <span class="weather-source">${stale?'Last report':'Checked'} · ${Number.isFinite(checked)?escapeHtml(new Date(checked).toLocaleString('en-PH',{timeZone:'Asia/Manila',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'})):'Time unavailable'}</span>
  </article>`;
}

async function fetchWeatherPost() {
  try {
    const response = await fetch(`/demo-data/weather.json`, {
      headers: {  },
      cache: 'no-store'
    });
    if (!response.ok) return null;
    const rows = await response.json();
    return rows?.[0] || null;
  } catch {
    return null;
  }
}

async function loadUpdates() {
  if (location.pathname !== '/') return;
  try {
    installUpdateStyles();
    if(!cachedContent){
      loading ||= Promise.all([
        fetch(`/demo-data/updates.json`, { headers: {  } }).then(r=>r.ok?r.json():[]).catch(()=>[]),
        fetchWeatherPost()
      ]).then(([updates,weatherPost])=>({updates:Array.isArray(updates)?updates:[],weatherPost})).finally(()=>{loading=null});
      cachedContent=await loading;
    }
    const {updates,weatherPost}=cachedContent;
    if(location.pathname!=='/')return;
    const track = document.querySelector('[data-promo-track]');
    const viewport = document.querySelector('[data-promo-viewport]');
    if (!track || !viewport || track.dataset.contentReady==='true') return;
    track.dataset.contentReady='true';
    const card = viewport.closest('.home__promo-card');
    card?.classList.add('updates-enhanced');
    const title = card?.querySelector('.home__promo-head .bento__title');
    if (title) { title.hidden = true; title.setAttribute('aria-hidden', 'true'); }

    const slides = [
      ...updates.map(renderDbUpdate),
      renderAdoptionSlide(),
      renderWeatherSlide(weatherPost)
    ].filter(Boolean);
    if (!slides.length) return;
    track.innerHTML = slides.join('');

    track.querySelector('[data-adoption-learn]')?.addEventListener('click', (event) => {
      event.preventDefault();
      const slide = event.currentTarget.closest('.home__promo-slide');
      slide?.querySelector('small')?.replaceChildren(document.createTextNode('Check reputable local shelters and rescue groups, ask about temperament and medical history, and make sure your home is ready before adopting.'));
      event.currentTarget.remove();
    });

    viewport.scrollLeft = 0;
    const oldPrev = card?.querySelector('[data-promo-prev]');
    const oldNext = card?.querySelector('[data-promo-next]');
    const prev = oldPrev?.cloneNode(true);
    const next = oldNext?.cloneNode(true);
    if (oldPrev && prev) oldPrev.replaceWith(prev);
    if (oldNext && next) oldNext.replaceWith(next);
    const step = (direction) => viewport.scrollBy({ left: direction * viewport.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('a11y-reduce-motion')?'auto':'smooth' });
    prev?.addEventListener('click', () => step(-1));
    next?.addEventListener('click', () => step(1));
    if (slides.length < 2) {
      prev?.setAttribute('hidden', '');
      next?.setAttribute('hidden', '');
    } else {
      prev?.removeAttribute('hidden');
      next?.removeAttribute('hidden');
    }
  } catch (error) {
    console.error('[YourBrand updates]', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadUpdates, { once: true });
} else {
  loadUpdates();
}

// App navigation replaces the home DOM without reloading modules.
observeUI(()=>{if(location.pathname==='/'&&document.querySelector('[data-promo-track]:not([data-content-ready])'))loadUpdates()});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&location.pathname==='/'){cachedContent=null;const track=document.querySelector('[data-promo-track]');if(track)delete track.dataset.contentReady;loadUpdates()}});
