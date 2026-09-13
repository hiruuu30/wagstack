import { PRODUCTS } from './shop-catalog.js';
import { SUPABASE_URL, SUPABASE_KEY } from './auth-config.js';

let productImages = new Map();
let imageRefreshQueued = false;
let shopObserver = null;

async function loadCatalog() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,name,description,price,image_url,stock,active,category&active=eq.true&order=created_at.asc`,
      { headers: { apikey: SUPABASE_KEY } }
    );
    if (!response.ok) return;
    const rows = await response.json();
    if (!rows.length) return;

    productImages = new Map(rows.map((row) => [row.name, row.image_url]));
    PRODUCTS.splice(0, PRODUCTS.length, ...rows.map((row) => ({
      id: String(row.id),
      name: row.name,
      price: Number(row.price || 0),
      cat: row.category || 'Essentials',
      eyebrow: Number(row.stock || 0) > 0 ? `${Number(row.stock)} IN STOCK` : 'OUT OF STOCK',
      desc: row.description || ''
    })));

    forceShopRefresh();
  } catch (error) {
    console.error('[WagStack shop catalog]', error);
  }
}

function forceShopRefresh() {
  if (location.pathname !== '/shop') return;
  const glass = document.querySelector('#main-content .clone-glass');
  if (glass) delete glass.dataset.v27Shop;
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
    if (!imageUrl) return;
    const visual = card.querySelector('.v27-product__visual');
    if (!visual) return;

    let image = visual.querySelector('.wag-db-product-photo');
    if (!image) {
      visual.replaceChildren();
      image = document.createElement('img');
      image.className = 'v32-product-photo wag-db-product-photo';
      image.alt = name || 'Product';
      image.style.cssText = 'width:100%;height:100%;object-fit:cover';
      visual.appendChild(image);
    }

    if (image.getAttribute('src') !== imageUrl) image.setAttribute('src', imageUrl);
    if (image.alt !== (name || 'Product')) image.alt = name || 'Product';
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
