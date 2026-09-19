import { PRODUCTS } from './shop-catalog.js';
import { observeUI } from './ui-lifecycle.js';
(() => {
  const STORE_KEY='brand-demo-workspace-v1';
  let shopFilter='All';
  let fileIntent=null;
  const read=()=>{try{return JSON.parse(localStorage.getItem(STORE_KEY)||'{}')}catch{return {}}};
  const write=s=>{try{localStorage.setItem(STORE_KEY,JSON.stringify(s));return true}catch{return false}};
  const esc=v=>String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const money=v=>'₱'+Number(v||0).toLocaleString('en-PH');
  const uid=()=>String(Date.now())+Math.random().toString(36).slice(2,7);
  const style=document.createElement('style');
  style.id='branddemo-v27';
  style.textContent=`
    .v27-actions{position:absolute;right:12px;top:12px;z-index:6;display:flex;gap:6px;opacity:0;transform:translateY(-3px);transition:.2s}.clone-card:hover>.v27-actions,.clone-card:focus-within>.v27-actions{opacity:1;transform:none}.v27-action{border:0;border-radius:999px;padding:7px 10px;background:rgba(255,255,255,.92);box-shadow:0 8px 22px -14px rgba(7,16,31,.55),inset 0 0 0 1px rgba(11,30,63,.12);color:var(--ink);font:700 8px/1 Poppins;cursor:pointer}.v27-action--delete{color:#b53a32}.clone-card.v27-managed{position:relative}.v27-photo-card .pet-gallery-image{cursor:zoom-in;display:block;width:100%;height:190px;object-fit:cover;border-radius:18px;transition:transform .25s ease,filter .25s ease}.v27-photo-card:hover .pet-gallery-image{transform:scale(1.012);filter:saturate(1.02)}
    .v27-lightbox{position:fixed;inset:0;z-index:999999;display:grid;place-items:center;padding:28px;background:rgba(4,10,21,.82);backdrop-filter:blur(18px)}.v27-lightbox__inner{position:relative;max-width:min(1000px,94vw);max-height:90vh}.v27-lightbox img{display:block;max-width:100%;max-height:86vh;object-fit:contain;border-radius:24px;box-shadow:0 38px 110px -35px #000}.v27-lightbox__close{position:absolute;right:-12px;top:-12px;width:38px;height:38px;border:0;border-radius:50%;background:#fff;color:#07101f;font-size:24px;line-height:1;cursor:pointer;box-shadow:0 12px 30px -14px #000}.v27-card-empty{display:grid;place-items:center;min-height:185px;text-align:center}
    .v27-editor{position:fixed;inset:0;z-index:999999;display:grid;place-items:center;padding:20px;background:rgba(4,10,21,.58);backdrop-filter:blur(14px)}.v27-editor__card{width:min(500px,100%);padding:22px;border-radius:26px;background:var(--paper,#f4f4ed);box-shadow:0 34px 90px -40px #000;color:var(--ink)}[data-theme="dark"] .v27-editor__card{background:#0f2139}.v27-editor__card h2{margin:5px 0 16px}.v27-editor__field{display:grid;gap:7px;font:700 9px Poppins;color:var(--muted)}.v27-editor__field input,.v27-editor__field textarea{width:100%;border:0;border-radius:14px;padding:12px 14px;background:rgba(255,255,255,.72);box-shadow:inset 0 0 0 1px rgba(11,30,63,.16);font:500 12px Poppins;color:var(--ink)}.v27-editor__field textarea{min-height:130px;resize:vertical}.v27-editor__actions{display:flex;justify-content:flex-end;gap:9px;margin-top:16px}.v27-editor__actions button{border:0;border-radius:999px;padding:11px 16px;font:700 10px Poppins;cursor:pointer}.v27-editor__save{background:#071f43;color:#fff}.v27-editor__cancel{background:rgba(11,30,63,.08);color:inherit}
    .v27-shop{display:grid;gap:16px}.v27-shop-hero{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(230px,.72fr);gap:14px}.v27-shop-intro,.v27-shop-bag{border-radius:26px;padding:24px;background:linear-gradient(135deg,rgba(255,255,255,.82),rgba(234,239,248,.7));box-shadow:inset 0 0 0 1px rgba(11,30,63,.11)}[data-theme="dark"] .v27-shop-intro,[data-theme="dark"] .v27-shop-bag{background:linear-gradient(135deg,rgba(21,43,78,.9),rgba(8,27,55,.86))}.v27-shop-kicker{font:700 9px Poppins;letter-spacing:.12em;color:var(--orange);text-transform:uppercase}.v27-shop-intro h2{font-size:clamp(26px,4vw,48px);line-height:.98;margin:8px 0 10px;max-width:620px}.v27-shop-intro p{max-width:620px;margin:0;color:var(--muted)}.v27-filterbar{display:flex;gap:7px;flex-wrap:wrap;margin-top:18px}.v27-filter{border:0;border-radius:999px;padding:9px 13px;background:rgba(255,255,255,.7);box-shadow:inset 0 0 0 1px rgba(11,30,63,.11);font:700 9px Poppins;color:var(--ink);cursor:pointer}.v27-filter.is-active{background:#07101f;color:#fff}.v27-shop-bag{display:flex;flex-direction:column;justify-content:space-between;min-height:210px}.v27-bag-count{font-size:42px;font-weight:700;line-height:1}.v27-bag-total{font-size:19px;font-weight:700;margin-top:4px}.v27-bag-list{display:grid;gap:7px;margin-top:14px}.v27-bag-row{display:flex;align-items:center;justify-content:space-between;gap:9px;font-size:9px}.v27-bag-row span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.v27-qty{display:flex;align-items:center;gap:7px}.v27-qty button{width:23px;height:23px;border:0;border-radius:8px;background:rgba(11,30,63,.08);color:inherit;cursor:pointer}.v27-products{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.v27-product{position:relative;overflow:hidden;display:flex;flex-direction:column;min-height:285px;padding:17px;border-radius:24px;background:rgba(255,255,255,.66);box-shadow:inset 0 0 0 1px rgba(11,30,63,.1),0 20px 50px -44px rgba(7,16,31,.55);backdrop-filter:blur(14px)}[data-theme="dark"] .v27-product{background:rgba(255,255,255,.05)}.v27-product__visual{height:112px;border-radius:18px;background:radial-gradient(circle at 70% 25%,rgba(255,174,114,.75),transparent 30%),linear-gradient(145deg,rgba(255,255,255,.95),rgba(224,233,248,.86));position:relative;overflow:hidden;margin-bottom:15px}.v27-product__visual:before{content:'';position:absolute;width:72px;height:72px;border:12px solid #071f43;border-radius:30% 70% 55% 45%;left:50%;top:50%;transform:translate(-50%,-50%) rotate(16deg);opacity:.88}.v27-product:nth-child(even) .v27-product__visual:before{border-radius:50% 35% 55% 40%;transform:translate(-50%,-50%) rotate(-16deg)}.v27-product__cat{font:700 8px Poppins;letter-spacing:.12em;color:var(--orange)}.v27-product h3{font-size:15px;line-height:1.18;margin:7px 0 6px}.v27-product p{font-size:9px;line-height:1.55;color:var(--muted);margin:0 0 14px}.v27-product__foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:auto}.v27-product__price{font-size:16px;font-weight:700}.v27-add{border:0;border-radius:999px;padding:9px 12px;background:#071f43;color:#fff;font:700 9px Poppins;cursor:pointer}.v27-empty-shop{grid-column:1/-1;padding:30px;text-align:center;color:var(--muted)}
    @media(max-width:980px){.v27-products{grid-template-columns:repeat(2,minmax(0,1fr))}.v27-shop-hero{grid-template-columns:1fr}}@media(max-width:620px){.v27-actions{opacity:1;transform:none}.v27-products{grid-template-columns:1fr}.v27-photo-card .pet-gallery-image{height:220px}.v27-shop-intro,.v27-shop-bag{padding:18px}}
  `;
  document.head.appendChild(style);

  function ensureCollections(s){
    const active=s.activePet||s.pets?.[0]?.name||'Biscuit';
    s.photosByPet=s.photosByPet||{};
    if(!Array.isArray(s.photosByPet[active])){
      const p=(s.pets||[]).find(x=>x.name===active)||s.pets?.[0]||{};
      s.photosByPet[active]=[
        {id:'profile',src:p.image||'/assets/biscuit-avatar.png',title:`${active}, all smiles`},
        {id:'care-day',src:'/assets/hero-club.png',title:'Care day'}
      ];
    }
    if(!Array.isArray(s.documents))s.documents=[];
    if(!Array.isArray(s.notes))s.notes=[];
    return active;
  }
  function schedule(){requestAnimationFrame(()=>{patchPets();patchShop();updateCartBadge()})}
  function updateCartBadge(){const s=read(),n=(s.cart||[]).length;document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=String(n))}

  function petTab(){return document.querySelector('.pet-tabs .is-active')?.textContent?.trim().toLowerCase()||''}
  function patchPets(){
    if(location.pathname!='/pets')return;
    const tab=petTab(); if(!['photos','documents','notes'].includes(tab))return;
    const wrap=document.querySelector('#main-content .pet-workspace-v25')||document.querySelector('#main-content .clone-glass');
    const grid=wrap?.querySelector('.clone-grid'); if(!grid)return;
    const s=read(),active=ensureCollections(s); write(s);
    if(grid.dataset.v27===tab)return; grid.dataset.v27=tab;
    if(tab==='photos'){
      const photos=s.photosByPet[active]||[];
      grid.innerHTML=photos.map((ph,i)=>`<article class="clone-card clone-card--third v27-managed v27-photo-card"><div class="v27-actions"><button class="v27-action" data-v27-photo-edit="${esc(ph.id)}">Edit</button><button class="v27-action v27-action--delete" data-v27-photo-delete="${esc(ph.id)}">Delete</button></div><img class="pet-gallery-image" data-v27-photo-open="${esc(ph.id)}" src="${esc(ph.src)}" alt="${esc(ph.title||active)}"><h3>${esc(ph.title||`Photo ${i+1}`)}</h3></article>`).join('')+`<article class="clone-card clone-card--third pet-add-card v27-card-empty"><button class="pet-add" data-v27-photo-add>＋</button><h3>Add photo</h3><p>Saved to ${esc(active)}’s profile on this device.</p></article>`;
    }
    if(tab==='documents'){
      grid.innerHTML=s.documents.map((d,i)=>`<article class="clone-card clone-card--third v27-managed"><div class="v27-actions"><button class="v27-action" data-v27-doc-edit="${i}">Edit</button><button class="v27-action v27-action--delete" data-v27-doc-delete="${i}">Delete</button></div><div class="clone-card__no">DOCUMENT ${String(i+1).padStart(2,'0')}</div><h3>${esc(d)}</h3><p>${i===0?'Health record':i===1?'Care preference':'Pet file'}</p></article>`).join('')+`<article class="clone-card clone-card--third pet-add-card v27-card-empty"><button class="pet-add" data-v27-doc-add>＋</button><h3>Add document</h3><p>Add a document name to this pet workspace.</p></article>`;
    }
    if(tab==='notes'){
      grid.innerHTML=s.notes.map((n,i)=>`<article class="clone-card clone-card--third v27-managed"><div class="v27-actions"><button class="v27-action" data-v27-note-edit="${i}">Edit</button><button class="v27-action v27-action--delete" data-v27-note-delete="${i}">Delete</button></div><div class="clone-card__no">CARE NOTE ${String(i+1).padStart(2,'0')}</div><p>${esc(n)}</p></article>`).join('')+`<article class="clone-card clone-card--third"><label>New care note<textarea class="pet-input pet-textarea" id="new-note" placeholder="Anything the team should remember?"></textarea></label><button class="clone-btn" data-add-note>Save note</button></article>`;
    }
  }

  function openLightbox(src,alt){const x=document.createElement('div');x.className='v27-lightbox';x.innerHTML=`<div class="v27-lightbox__inner"><img src="${esc(src)}" alt="${esc(alt||'Pet photo')}"><button class="v27-lightbox__close" data-v27-close-lightbox aria-label="Close">×</button></div>`;document.body.appendChild(x)}
  function editor(title,label,value,onSave,multiline=false){document.querySelector('.v27-editor')?.remove();const x=document.createElement('div');x.className='v27-editor';x.innerHTML=`<section class="v27-editor__card"><div class="clone-card__no">EDIT</div><h2>${esc(title)}</h2><label class="v27-editor__field">${esc(label)}${multiline?`<textarea data-v27-editor-input>${esc(value)}</textarea>`:`<input data-v27-editor-input value="${esc(value)}">`}</label><div class="v27-editor__actions"><button class="v27-editor__cancel" data-v27-editor-cancel>Cancel</button><button class="v27-editor__save" data-v27-editor-save>Save</button></div></section>`;document.body.appendChild(x);const input=x.querySelector('[data-v27-editor-input]');input.focus();x.querySelector('[data-v27-editor-save]').onclick=()=>{const v=input.value.trim();if(v){onSave(v);x.remove();schedule()}};x.querySelector('[data-v27-editor-cancel]').onclick=()=>x.remove();x.addEventListener('click',e=>{if(e.target===x)x.remove()})}
  function chooseImage(intent){fileIntent=intent;let inp=document.querySelector('#v27-photo-picker');if(!inp){inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.id='v27-photo-picker';inp.hidden=true;document.body.appendChild(inp);inp.addEventListener('change',()=>{const file=inp.files?.[0];if(!file||!fileIntent)return;const r=new FileReader();r.onload=()=>{const s=read(),active=ensureCollections(s),arr=s.photosByPet[active];if(fileIntent.type==='add')arr.push({id:uid(),src:String(r.result),title:file.name.replace(/\.[^.]+$/,'')||'Pet photo'});else{const ph=arr.find(x=>String(x.id)===String(fileIntent.id));if(ph)ph.src=String(r.result)}write(s);inp.value='';fileIntent=null;schedule()};r.readAsDataURL(file)})}inp.click()}

  function counts(cart){return (cart||[]).reduce((m,id)=>(m[id]=(m[id]||0)+1,m),{})}
  function patchShop(){
    if(location.pathname!='/shop')return;
    const glass=document.querySelector('#main-content .clone-glass');if(!glass)return;
    if(window.YourBrandCatalog?.status!=='ready'){
      const status=window.YourBrandCatalog?.status||'loading';
      if(glass.dataset.catalogState===status)return;
      glass.dataset.catalogState=status;delete glass.dataset.v27Shop;
      glass.innerHTML=`<section class="clone-card clone-card--full" role="status"><h2>${status==='loading'?'Loading the shop…':'The shop couldn’t load'}</h2><p>${status==='loading'?'Getting the latest pet essentials.':'Check your connection and try again.'}</p>${status==='error'?'<button type="button" class="clone-btn" data-catalog-retry>Try again</button>':''}</section>`;return;
    }
    delete glass.dataset.catalogState;
    const s=read();s.cart=Array.isArray(s.cart)?s.cart:[];
    if(glass.dataset.v27Shop===shopFilter+':'+s.cart.join('|'))return;
    glass.dataset.v27Shop=shopFilter+':'+s.cart.join('|');
    if(!PRODUCTS.length){if(glass.dataset.v27Shop!=='empty'){glass.dataset.v27Shop='empty';glass.innerHTML='<section class="clone-card clone-card--full"><h2>No products available yet</h2><p>Check back soon for pet essentials.</p></section>';}return;}
    const cats=['All',...new Set(PRODUCTS.map(p=>p.cat))];
    const visible=shopFilter==='All'?PRODUCTS:PRODUCTS.filter(p=>p.cat===shopFilter);
    const c=counts(s.cart),rows=Object.entries(c).map(([id,q])=>{const p=PRODUCTS.find(x=>x.id===id);return p?`<div class="v27-bag-row"><span>${esc(p.name)}</span><div class="v27-qty"><button data-v27-cart-minus="${esc(id)}">−</button><b>${q}</b><button data-v27-cart-plus="${esc(id)}">＋</button></div></div>`:''}).join('');
    const total=s.cart.reduce((sum,id)=>sum+(PRODUCTS.find(p=>p.id===id)?.price||0),0);
    glass.innerHTML=`<div class="v27-shop"><section class="v27-shop-hero"><div class="v27-shop-intro"><div class="v27-shop-kicker">YourBrand Shop</div><h2>Good things for everyday pet care.</h2><p>Grooming, play and travel essentials for their everyday routine.</p><div class="v27-filterbar">${cats.map(cat=>`<button class="v27-filter ${cat===shopFilter?'is-active':''}" data-v27-shop-filter="${esc(cat)}">${esc(cat)}</button>`).join('')}</div></div><aside class="v27-shop-bag"><div><div class="v27-shop-kicker">Your bag</div><div class="v27-bag-count">${s.cart.length}</div><div class="v27-bag-total">${money(total)}</div></div><div class="v27-bag-list">${rows||'<span style="font-size:9px;color:var(--muted)">Your bag is ready when you are.</span>'}</div>${s.cart.length?'<button class="pet-link-btn" data-v27-cart-clear>Clear bag →</button>':''}</aside></section><section class="v27-products">${visible.length?visible.map(p=>`<article class="v27-product"><div class="v27-product__visual" aria-hidden="true"></div><div class="v27-product__cat">${esc(p.cat)} · ${esc(p.eyebrow)}</div><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><div class="v27-product__foot"><span class="v27-product__price">${money(p.price)}</span><button class="v27-add" data-v27-cart-add="${esc(p.id)}">Add to bag</button></div></article>`).join(''):'<div class="v27-empty-shop">No products in this category yet.</div>'}</section></div>`;
  }

  document.addEventListener('click',e=>{
    const t=e.target.closest('button,[data-v27-photo-open]');if(!t)return;
    if(t.matches('[data-v27-photo-open]')){const s=read(),active=ensureCollections(s),ph=(s.photosByPet[active]||[]).find(x=>String(x.id)===String(t.dataset.v27PhotoOpen));if(ph)openLightbox(ph.src,ph.title);return}
    if(t.hasAttribute('data-v27-close-lightbox')){t.closest('.v27-lightbox')?.remove();return}
    if(t.hasAttribute('data-v27-photo-add')){chooseImage({type:'add'});return}
    if(t.dataset.v27PhotoEdit){chooseImage({type:'edit',id:t.dataset.v27PhotoEdit});return}
    if(t.dataset.v27PhotoDelete){if(confirm('Delete this photo?')){const s=read(),active=ensureCollections(s);s.photosByPet[active]=(s.photosByPet[active]||[]).filter(x=>String(x.id)!==String(t.dataset.v27PhotoDelete));write(s);schedule()}return}
    if(t.dataset.v27DocEdit!==undefined){const i=Number(t.dataset.v27DocEdit),s=read();editor('Edit document','Document name',s.documents?.[i]||'',v=>{const x=read();x.documents[i]=v;write(x)});return}
    if(t.dataset.v27DocDelete!==undefined){const i=Number(t.dataset.v27DocDelete);if(confirm('Delete this document?')){const s=read();s.documents.splice(i,1);write(s);schedule()}return}
    if(t.hasAttribute('data-v27-doc-add')){editor('Add document','Document name','',v=>{const s=read();s.documents=s.documents||[];s.documents.push(v);write(s)});return}
    if(t.dataset.v27NoteEdit!==undefined){const i=Number(t.dataset.v27NoteEdit),s=read();editor('Edit care note','Care note',s.notes?.[i]||'',v=>{const x=read();x.notes[i]=v;write(x)},true);return}
    if(t.dataset.v27NoteDelete!==undefined){const i=Number(t.dataset.v27NoteDelete);if(confirm('Delete this care note?')){const s=read();s.notes.splice(i,1);write(s);schedule()}return}
    if(t.dataset.v27ShopFilter){shopFilter=t.dataset.v27ShopFilter;schedule();return}
    if(t.dataset.v27CartAdd){const s=read();s.cart=s.cart||[];s.cart.push(t.dataset.v27CartAdd);write(s);schedule();return}
    if(t.dataset.v27CartPlus){const s=read();s.cart=s.cart||[];s.cart.push(t.dataset.v27CartPlus);write(s);schedule();return}
    if(t.dataset.v27CartMinus){const s=read(),i=(s.cart||[]).indexOf(t.dataset.v27CartMinus);if(i>-1)s.cart.splice(i,1);write(s);schedule();return}
    if(t.hasAttribute('data-v27-cart-clear')){const s=read();s.cart=[];write(s);schedule();return}
    setTimeout(schedule,0);
  },true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelector('.v27-lightbox')?.remove();document.querySelector('.v27-editor')?.remove()}});
  const main=document.querySelector('#main-content');observeUI(()=>{patchPets();patchShop();updateCartBadge()});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(schedule,0),{once:true});else setTimeout(schedule,0);
})();