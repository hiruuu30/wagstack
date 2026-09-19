import { GROOMING_ICON } from './grooming-icon.js';
import { observeUI } from './ui-lifecycle.js';
const stylesheet=document.createElement('link');stylesheet.rel='stylesheet';stylesheet.href='/experience.css?v=42';document.head.appendChild(stylesheet);
const isMobile=matchMedia('(max-width:900px)');
const accountIcon='<svg class="ph-duo" viewBox="0 0 256 256" fill="none" aria-hidden="true"><circle cx="128" cy="128" r="96" fill="currentColor" opacity=".2"/><circle cx="128" cy="128" r="96" stroke="currentColor" stroke-width="16"/><circle cx="128" cy="104" r="32" stroke="currentColor" stroke-width="16"/><path d="M61 196a72 72 0 0 1 134 0" stroke="currentColor" stroke-width="16" stroke-linecap="round"/></svg>';
let returnFocus;
function closeMore(){const menu=document.querySelector('#mobile-more');if(!menu?.open)return;menu.querySelector('.a11y.is-open .a11y__close')?.click();menu.close();document.querySelector('[data-mobile-more]')?.setAttribute('aria-expanded','false');returnFocus?.focus();}
function placeAccountTools(){
  const tools=document.querySelector('.mobile-more-tools');if(!tools)return;
  const target=isMobile.matches?tools:document.body;
  for(const selector of ['.wag-cloud-btn','.a11y']){const node=document.querySelector(selector);if(node&&node.parentElement!==target)target.appendChild(node)}
  const button=document.querySelector('.a11y__button');
  if(button&&!button.querySelector('.mobile-tool-label')){const label=document.createElement('span');label.className='mobile-tool-label';label.textContent='Accessibility';button.appendChild(label)}
}
function mount(){
  if(location.pathname==='/admin'||document.querySelector('.mobile-nav')||!document.querySelector('.rail__nav'))return;
  const icon=path=>path==='/grooming'?GROOMING_ICON:path==='/profile'?accountIcon:document.querySelector(`.rail__nav a[href="${path}"] svg`)?.outerHTML||'';
  const nav=document.createElement('nav');nav.className='mobile-nav';nav.setAttribute('aria-label','Main navigation');
  nav.innerHTML=[['/','Home'],['/pets','My Pets'],['/grooming','Book'],['/shop','Shop']].map(([path,label])=>`<a href="${path}" data-mobile-route="${path}">${icon(path)}<span>${label}</span></a>`).join('')+'<button type="button" data-mobile-more aria-controls="mobile-more" aria-haspopup="dialog" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg><span>More</span></button>';
  document.body.appendChild(nav);
  const menu=document.createElement('dialog');menu.id='mobile-more';menu.className='mobile-more';menu.setAttribute('aria-label','More pet care options');menu.innerHTML='<header><h2>Your YourBrand</h2><button type="button" data-close-more aria-label="Close menu">×</button></header><div class="mobile-more-links">'+[['/grooming','Grooming'],['/hotel','Pet hotel'],['/health','Health & care'],['/rewards','Rewards & membership'],['/profile','My account'],['/about','Help & contact']].map(([path,label])=>`<a href="${path}">${icon(path)}<span>${label}</span></a>`).join('')+'</div>';
  const tools=document.createElement('div');tools.className='mobile-more-tools';menu.appendChild(tools);
  document.body.appendChild(menu);
  menu.addEventListener('click',e=>{if(e.target.closest('.wag-cloud-btn'))closeMore()},true);
  menu.addEventListener('click',e=>{if(e.target===menu||e.target.closest('[data-close-more],a'))closeMore()});menu.addEventListener('cancel',e=>{e.preventDefault();closeMore()});
  nav.querySelector('[data-mobile-more]').addEventListener('click',e=>{returnFocus=e.currentTarget;returnFocus.setAttribute('aria-expanded','true');menu.showModal()});
  isMobile.addEventListener('change',e=>{if(!e.matches)closeMore();placeAccountTools()});
}
function update(){
  mount();placeAccountTools();const path=location.pathname;
  document.querySelectorAll('[data-mobile-route]').forEach(a=>{const active=a.dataset.mobileRoute===path||(a.dataset.mobileRoute==='/grooming'&&path==='/hotel');a.classList.toggle('is-active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  document.querySelector('[data-mobile-more]')?.classList.toggle('is-active',!['/','/pets','/grooming','/hotel','/shop'].includes(path));
}
observeUI(update);
document.addEventListener('branddemo:render',closeMore);
// Consistent keyboard behavior for existing add-pet and editing dialogs.
document.addEventListener('keydown',e=>{
  const overlay=document.querySelector('.wag-addpet-backdrop');if(!overlay)return;
  if(e.key==='Escape'){overlay.remove();document.querySelector('[data-add-pet-main]')?.focus();return;}
  if(e.key==='Tab'){const items=[...overlay.querySelectorAll('button,input,select,textarea')].filter(el=>!el.disabled);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
});
