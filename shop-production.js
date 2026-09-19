import { observeUI } from './ui-lifecycle.js';
import { PRODUCTS } from './shop-catalog.js';
import { SUPABASE_URL, SUPABASE_KEY } from './auth-config.js';

let productImages = new Map();
window.WagStackCatalog={status:'loading',retry:loadCatalog};
let imageRefreshQueued = false;
let shopObserver = null;

const photoStyle=document.createElement('style');
photoStyle.id='wagstack-production-product-photos';
photoStyle.textContent=`
  .v27-product__visual.has-db-image::before{display:none!important}
  .v27-product__visual.has-db-image{background:#eef2f6!important}
  .wag-db-product-photo{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important}
`;
document.head.appendChild(photoStyle);

async function loadCatalog() {
  window.WagStackCatalog.status='loading';forceShopRefresh();
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,name,description,price,image_url,stock,active,category&active=eq.true&order=created_at.asc`,
      { headers: { apikey: SUPABASE_KEY } }
    );
    if (!response.ok) throw new Error('catalog_unavailable');
    const rows = await response.json();
    if (!Array.isArray(rows))throw new Error('catalog_unavailable');
    window.WagStackCatalog.status='ready';

    productImages = new Map(rows.map((row) => [row.name, row.image_url]));
    PRODUCTS.splice(0, PRODUCTS.length, ...rows.map((row) => ({
      id: String(row.id),
      name: row.name,
      price: Number(row.price || 0),
      stock: Number(row.stock || 0),
      cat: row.category || 'Essentials',
      eyebrow: Number(row.stock || 0) > 0 ? `${Number(row.stock)} IN STOCK` : 'OUT OF STOCK',
      desc: row.description || ''
    })));

    forceShopRefresh();
  } catch (error) {
    window.WagStackCatalog.status='error';forceShopRefresh();
  }
}

function forceShopRefresh() {
  if (location.pathname !== '/shop') return;
  const glass = document.querySelector('#main-content .clone-glass');
  if (glass) delete glass.dataset.v27Shop;

  // Wake the shared UI lifecycle once so v27 rebuilds the shop with the
  // production catalog. This is intentionally a one-shot local mutation,
  // not a document-wide observer loop.
  const main=document.querySelector('#main-content');
  if(main){
    const marker=document.createElement('span');
    marker.hidden=true;
    marker.dataset.shopCatalogReady='';
    main.appendChild(marker);
    marker.remove();
  }

  queueImageRefresh();
  attachShopObserver();
}

function queueImageRefresh() {
  if (imageRefreshQueued || location.pathname !== '/shop') return;
  imageRefreshQueued = true;
  requestAnimationFrame(() => {
    imageRefreshQueued = false;
    applyProductImages();
  });
}

function applyProductImages() {
  if (location.pathname !== '/shop') return;
  document.querySelectorAll('.v27-product').forEach((card) => {
    const name = card.querySelector('h3')?.textContent?.trim();
    const imageUrl = productImages.get(name);
    const visual = card.querySelector('.v27-product__visual');
    if (!visual) return;

    if (!imageUrl) {
      visual.classList.remove('has-db-image');
      visual.querySelector('.wag-db-product-photo')?.remove();
      return;
    }

    visual.classList.add('has-db-image');
    let image = visual.querySelector('.wag-db-product-photo');
    if (!image) {
      visual.replaceChildren();
      image = document.createElement('img');
      image.className = 'v32-product-photo wag-db-product-photo';
      image.alt = name || 'Product';
      image.loading='lazy';image.decoding='async';image.width=320;image.height=320;
      visual.appendChild(image);
    }

    if (image.getAttribute('src') !== imageUrl) image.setAttribute('src', imageUrl);
    if (image.alt !== (name || 'Product')) image.alt = name || 'Product';
      image.loading='lazy';image.decoding='async';image.width=320;image.height=320;
  });
}

function attachShopObserver() {
  shopObserver?.disconnect();
  shopObserver = null;
  if (location.pathname !== '/shop') return;
  const root = document.querySelector('#main-content .clone-glass');
  if (!root) return;
  shopObserver = new MutationObserver((mutations) => {
    const needsRefresh = mutations.some((mutation) =>
      Array.from(mutation.addedNodes || []).some((node) =>
        node.nodeType === 1 && (
          node.matches?.('.v27-product,.v27-products') ||
          node.querySelector?.('.v27-product')
        )
      )
    );
    if (needsRefresh) queueImageRefresh();
  });
  shopObserver.observe(root, { childList: true, subtree: true });
}

function onRouteChange() {
  shopObserver?.disconnect();
  shopObserver = null;
  if (location.pathname === '/shop') {
    setTimeout(() => {
      forceShopRefresh();
      queueImageRefresh();
    }, 0);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadCatalog();
    onRouteChange();
  }, { once: true });
} else {
  loadCatalog();
  onRouteChange();
}
window.addEventListener('popstate', onRouteChange);
window.addEventListener('hashchange', onRouteChange);

observeUI(()=>{if(location.pathname==='/shop'){queueImageRefresh();const root=document.querySelector('#main-content .clone-glass');if(root&&!root.dataset.catalogObserved){root.dataset.catalogObserved='true';attachShopObserver()}}});

document.addEventListener('click',event=>{if(event.target.closest('[data-catalog-retry]'))loadCatalog()});
