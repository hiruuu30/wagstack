import { SUPABASE_URL, SUPABASE_KEY } from './auth-config.js';
import { observeUI } from './ui-lifecycle.js';
import { weatherSvg } from './weather-infographic.js';

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const adoption = { id:'community-adoption', eyebrow:'ADOPT A CAT OR DOG', title:'Their next chapter could be you.', body:'Give a stray a home, and a reason to trust again.', image_url:'/assets/carousel-adopt.webp', cta_label:'Meet pets at PAWS', cta_href:'https://paws.org.ph/adopt/' };
let updates = [
  {id:'grooming',eyebrow:'GROOMING',title:'Fresh coat. Happy pet.',cta_label:'Book grooming',cta_href:'/grooming',image_url:'/assets/updates-care.webp'},
  {id:'hotel',eyebrow:'PET HOTEL',title:'A stay they’ll love.',cta_label:'Plan a stay',cta_href:'/hotel',image_url:'/assets/updates-care.webp'},
  {id:'shop',eyebrow:'EVERYDAY CARE',title:'Small things. Better days.',cta_label:'Explore the shop',cta_href:'/shop',image_url:'/assets/updates-care.webp'}
];
let weatherPost, currentCard, carousel, resizeObserver, fetching, lastFetch = 0;
function safeUrl(raw, external = false) {
  try { const url = new URL(raw, location.origin); return (url.origin === location.origin || (external && url.protocol === 'https:')) ? url.href : ''; } catch { return ''; }
}
function slide(item, adopt = false) {
  const href = safeUrl(item.cta_href, adopt);
  const src = safeUrl(item.image_url, true);
  return `<article class="home__promo-slide${adopt?' home__promo-slide--adoption':''}" data-update-id="${escapeHtml(item.id)}" role="group" aria-roledescription="slide">
    <div class="update-copy">${item.eyebrow?`<span>${escapeHtml(item.eyebrow)}</span>`:''}<strong>${escapeHtml(item.title)}</strong>${item.body?`<small>${escapeHtml(item.body)}</small>`:''}${href&&item.cta_label?`<a class="update-cta" href="${escapeHtml(href)}" ${adopt?'target="_blank" rel="noopener noreferrer"':''}>${escapeHtml(item.cta_label)} <span aria-hidden="true">→</span></a>`:''}</div>
    ${src?`<img class="update-image" src="${escapeHtml(src)}" alt="${adopt?'Watercolor illustration of a stray dog and cat, waiting together for a home':''}" width="${adopt?600:420}" height="${adopt?600:280}" decoding="async" ${adopt?'fetchpriority="high"':'loading="lazy"'}>`:''}</article>`;
}
function weatherSlide() {
  return `<article class="home__promo-slide home__promo-slide--weather" data-update-id="quezon-city-weather" role="group" aria-roledescription="slide"><div class="weather-empty"><strong>Quezon City</strong><span>Checking the weather outlook…</span></div><img class="weather-image" alt="Quezon City weather outlook" hidden><a class="weather-source" href="https://api.met.no/doc/License" target="_blank" rel="noopener noreferrer" title="Forecast estimates from MET Norway, CC BY 4.0; adapted by WagStack">MET Norway forecast · CC BY 4.0</a><p class="weather-status" hidden></p></article>`;
}
function mount() {
  const card = document.querySelector('.home__promo-card');
  if (!card || card === currentCard) return;
  currentCard = card;
  card.dataset.community = '';
  card.setAttribute('aria-label','WagStack community');
  card.querySelector('.home__promo-head .bento__label')?.remove();
  card.querySelector('[data-promo-prev]')?.setAttribute('aria-label','Previous slide');
  card.querySelector('[data-promo-next]')?.setAttribute('aria-label','Next slide');
  renderSlides();
  refresh();
}
function renderSlides() {
  if (!currentCard?.isConnected) return;
  carousel?.abort();
  resizeObserver?.disconnect();
  carousel = new AbortController();
  const options = { signal: carousel.signal };
  const card = currentCard, viewport = card.querySelector('[data-promo-viewport]'), track = card.querySelector('[data-promo-track]');
  if (!viewport || !track) return;
  const oldId = card.querySelector('article[aria-hidden="false"]')?.dataset.updateId;
  track.innerHTML = slide(adoption,true) + weatherSlide() + updates.map(item=>slide(item)).join('');
  const slides = [...track.children];
  let index = Math.max(0, slides.findIndex(item=>item.dataset.updateId===oldId));
  const dots = card.querySelector('.home__promo-dots');
  dots.setAttribute('aria-label','Community slides');
  dots.innerHTML = slides.map((s,i)=>`<button type="button" data-promo-dot="${i}" aria-label="Show slide ${i+1}: ${escapeHtml(s.dataset.updateId==='quezon-city-weather'?'Quezon City weather':s.querySelector('strong')?.textContent)}"></button>`).join('');
  const sync = () => {
    slides.forEach((s,i)=>{ const active=i===index; s.inert=!active; s.setAttribute('aria-hidden',String(!active)); s.setAttribute('aria-label',`${i+1} of ${slides.length}`); });
    [...dots.children].forEach((dot,i)=>{dot.classList.toggle('is-active',i===index);dot.setAttribute('aria-current',String(i===index));});
  };
  const go = (i, smooth = true) => {
    index=(i+slides.length)%slides.length;
    viewport.scrollTo({left:slides[index].offsetLeft-slides[0].offsetLeft,behavior:smooth&&!matchMedia('(prefers-reduced-motion: reduce)').matches?'smooth':'instant'});
    sync();
  };
  card.addEventListener('click',e=>{
    const b=e.target.closest('[data-promo-prev],[data-promo-next],[data-promo-dot]'); if(!b)return;
    e.preventDefault();e.stopPropagation();
    go(b.hasAttribute('data-promo-dot')?Number(b.dataset.promoDot):index+(b.hasAttribute('data-promo-next')?1:-1));
  },options);
  viewport.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();go(e.key==='Home'?0:e.key==='End'?slides.length-1:index+(e.key==='ArrowRight'?1:-1));}},options);
  let drag, scrollTimer;
  viewport.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.target.closest('a,button'))return;drag={x:e.clientX,left:viewport.scrollLeft};viewport.setPointerCapture(e.pointerId);},options);
  viewport.addEventListener('pointermove',e=>{if(drag)viewport.scrollLeft=drag.left+drag.x-e.clientX;},options);
  const finish=()=>{if(!drag)return;drag=null;go(Math.round(viewport.scrollLeft/viewport.clientWidth));};
  viewport.addEventListener('pointerup',finish,options); viewport.addEventListener('pointercancel',finish,options);
  viewport.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{if(drag)return;index=Math.min(slides.length-1,Math.round(viewport.scrollLeft/viewport.clientWidth));sync();},100);},{...options,passive:true});
  carousel.signal.addEventListener('abort',()=>clearTimeout(scrollTimer),{once:true});
  resizeObserver = new ResizeObserver(()=>{go(index,false);paintWeather();}); resizeObserver.observe(viewport);
  go(index,false);paintWeather();
}
function paintWeather() {
  const slide = currentCard?.querySelector('.home__promo-slide--weather'); if(!slide)return;
  const image=slide.querySelector('.weather-image'),empty=slide.querySelector('.weather-empty'),status=slide.querySelector('.weather-status');
  if (!weatherPost) { empty.querySelector('span').textContent = lastFetch ? 'Weather is temporarily unavailable.' : 'Checking the weather outlook…'; image.hidden=true; return; }
  const signature=[weatherPost.published_at,slide.clientWidth,slide.clientHeight].join(':');
  if(image.dataset.signature!==signature) {
    image.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(weatherSvg(weatherPost,slide.clientWidth,slide.clientHeight));
    image.dataset.signature=signature;
    const d=weatherPost.weather;
    image.alt=`Quezon City forecast at the last significant change: ${d.condition}, ${Math.round(d.temperature)} degrees Celsius, rain ${d.rain} mm per hour, wind ${d.wind} km per hour. Published ${new Date(weatherPost.published_at).toLocaleString('en-PH',{timeZone:'Asia/Manila'})}, Philippine time.`;
  }
  image.hidden=false;empty.hidden=true;
  const stale=Date.now()-Date.parse(weatherPost.last_checked_at)>90*60e3 || Date.now()-Date.parse(weatherPost.source_updated_at)>12*3600e3;
  status.hidden=!stale;status.textContent=stale?'Latest check delayed · showing the last weather card.':'';
}
async function read(path) {
  const r=await fetch(`${SUPABASE_URL}/rest/v1/${path}`,{headers:{apikey:SUPABASE_KEY},signal:AbortSignal.timeout(15000)});
  if(!r.ok)throw new Error('Unable to load carousel content');return r.json();
}
async function refresh() {
  if(fetching || Date.now()-lastFetch<60e3 || document.hidden || !currentCard?.isConnected)return;
  fetching=true;
  const results=await Promise.allSettled([
    read('updates_carousel?select=id,eyebrow,title,body,image_url,cta_label,cta_href,sort_order&active=eq.true&order=sort_order.asc,created_at.asc'),
    read('weather_carousel_posts?id=eq.quezon-city&select=weather,published_at,last_checked_at,source_updated_at')
  ]);
  lastFetch=Date.now();fetching=false;
  if(results[1].status==='fulfilled'&&results[1].value[0])weatherPost=results[1].value[0];
  if(results[0].status==='fulfilled'&&JSON.stringify(results[0].value)!==JSON.stringify(updates)){updates=results[0].value;renderSlides();}else paintWeather();
}
observeUI(mount);
document.addEventListener('wagstack:carousel-ready',mount);
document.addEventListener('visibilitychange',()=>{if(!document.hidden){paintWeather();refresh();}});
setInterval(()=>{paintWeather();refresh();},10*60e3);
