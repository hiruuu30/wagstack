import { observeUI } from './ui-lifecycle.js';
const stylesheet=document.createElement('link');stylesheet.rel='stylesheet';stylesheet.href='/experience.css?v=38';document.head.appendChild(stylesheet);
const isMobile=matchMedia('(max-width:900px)');
let returnFocus;
function closeMore(){const menu=document.querySelector('#mobile-more');if(!menu?.open)return;menu.close();document.querySelector('[data-mobile-more]')?.setAttribute('aria-expanded','false');returnFocus?.focus();}
function mount(){
  if(location.pathname==='/admin'||document.querySelector('.mobile-nav')||!document.querySelector('.rail__nav'))return;
  const icon=path=>document.querySelector(`.rail__nav a[href="${path}"] svg`)?.outerHTML||'';
  const nav=document.createElement('nav');nav.className='mobile-nav';nav.setAttribute('aria-label','Main navigation');
  nav.innerHTML=[['/','Home'],['/pets','My Pets'],['/grooming','Book'],['/shop','Shop']].map(([path,label])=>`<a href="${path}" data-mobile-route="${path}">${icon(path)}<span>${label}</span></a>`).join('')+'<button type="button" data-mobile-more aria-controls="mobile-more" aria-haspopup="dialog" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg><span>More</span></button>';
  document.body.appendChild(nav);
  const menu=document.createElement('dialog');menu.id='mobile-more';menu.className='mobile-more';menu.setAttribute('aria-label','More pet care options');menu.innerHTML='<header><h2>Your WagStack</h2><button type="button" data-close-more aria-label="Close menu">×</button></header><div class="mobile-more-links">'+[['/grooming','Grooming'],['/hotel','Pet hotel'],['/health','Health & care'],['/rewards','Rewards & membership'],['/profile','My account'],['/about','Help & contact']].map(([path,label])=>`<a href="${path}">${icon(path)}<span>${label}</span></a>`).join('')+'</div>';
  document.body.appendChild(menu);
  menu.addEventListener('click',e=>{if(e.target===menu||e.target.closest('[data-close-more],a'))closeMore()});menu.addEventListener('cancel',e=>{e.preventDefault();closeMore()});
  nav.querySelector('[data-mobile-more]').addEventListener('click',e=>{returnFocus=e.currentTarget;returnFocus.setAttribute('aria-expanded','true');menu.showModal()});
  isMobile.addEventListener('change',e=>{if(!e.matches)closeMore()});
}
function update(){
  mount();const path=location.pathname;
  document.querySelectorAll('[data-mobile-route]').forEach(a=>{const active=a.dataset.mobileRoute===path||(a.dataset.mobileRoute==='/grooming'&&path==='/hotel');a.classList.toggle('is-active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  document.querySelector('[data-mobile-more]')?.classList.toggle('is-active',!['/','/pets','/grooming','/hotel','/shop'].includes(path));
}
observeUI(update);
document.addEventListener('wagstack:render',closeMore);
// Consistent keyboard behavior for existing add-pet and editing dialogs.
document.addEventListener('keydown',e=>{
  const overlay=document.querySelector('.wag-addpet-backdrop');if(!overlay)return;
  if(e.key==='Escape'){overlay.remove();document.querySelector('[data-add-pet-main]')?.focus();return;}
  if(e.key==='Tab'){const items=[...overlay.querySelectorAll('button,input,select,textarea')].filter(el=>!el.disabled);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
});
