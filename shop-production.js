import { PRODUCTS } from './shop-catalog.js';
import { SUPABASE_URL, SUPABASE_KEY } from './auth-config.js';

let productImages = new Map();

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
  const marker = document.createElement('span');
  marker.hidden = true;
  marker.dataset.catalogRefresh = String(Date.now());
  document.body.appendChild(marker);
  marker.remove();
  setTimeout(applyProductImages, 30);
}

function applyProductImages() {
  if (location.pathname !== '/shop') return;
  document.querySelectorAll('.v27-product').forEach((card) => {
    const name = card.querySelector('h3')?.textContent?.trim();
    const imageUrl = productImages.get(name);
    if (!imageUrl) return;
    const visual = card.querySelector('.v27-product__visual');
    if (!visual) return;
    let image = visual.querySelector('img');
    if (!image) {
      image = document.createElement('img');
      image.className = 'v32-product-photo wag-db-product-photo';
      visual.replaceChildren(image);
    }
    image.src = imageUrl;
    image.alt = name || 'Product';
    image.style.width = '100%';
    image.style.height = '100%';
    image.style.objectFit = 'cover';
  });
}

const observer = new MutationObserver(() => applyProductImages());
observer.observe(document.documentElement, { childList: true, subtree: true });

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCatalog, { once: true });
} else {
  loadCatalog();
}
window.addEventListener('popstate', () => setTimeout(forceShopRefresh, 0));
