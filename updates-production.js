import { SUPABASE_URL, SUPABASE_KEY } from './auth-config.js';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

async function loadUpdates() {
  if (location.pathname !== '/') return;
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/updates_carousel?select=id,eyebrow,title,body,image_url,cta_label,cta_href,sort_order&active=eq.true&order=sort_order.asc,created_at.asc`,
      { headers: { apikey: SUPABASE_KEY } }
    );
    if (!response.ok) return;
    const updates = await response.json();
    if (!updates.length) return;

    const track = document.querySelector('[data-promo-track]');
    const viewport = document.querySelector('[data-promo-viewport]');
    if (!track || !viewport) return;

    track.innerHTML = updates.map((item) => {
      const href = String(item.cta_href || '').trim();
      const allowedHref = href.startsWith('/') ? href : '#';
      return `<article class="home__promo-slide" data-update-id="${escapeHtml(item.id)}">
        <div class="update-copy">
          ${item.eyebrow ? `<span>${escapeHtml(item.eyebrow)}</span>` : ''}
          <strong>${escapeHtml(item.title)}</strong>
          ${item.body ? `<small>${escapeHtml(item.body)}</small>` : ''}
          ${item.cta_label ? `<a class="update-cta" href="${escapeHtml(allowedHref)}">${escapeHtml(item.cta_label)} <span aria-hidden="true">→</span></a>` : ''}
        </div>
        ${item.image_url ? `<img class="update-image" src="${escapeHtml(item.image_url)}" alt="" width="420" height="280" decoding="async">` : ''}
      </article>`;
    }).join('');

    viewport.scrollLeft = 0;
    const card = viewport.closest('.home__promo-card');
    const oldPrev = card?.querySelector('[data-promo-prev]');
    const oldNext = card?.querySelector('[data-promo-next]');
    const prev = oldPrev?.cloneNode(true);
    const next = oldNext?.cloneNode(true);
    if (oldPrev && prev) oldPrev.replaceWith(prev);
    if (oldNext && next) oldNext.replaceWith(next);
    const step = (direction) => viewport.scrollBy({ left: direction * viewport.clientWidth, behavior: 'smooth' });
    prev?.addEventListener('click', () => step(-1));
    next?.addEventListener('click', () => step(1));
    if (updates.length < 2) {
      prev?.setAttribute('hidden', '');
      next?.setAttribute('hidden', '');
    }
  } catch (error) {
    console.error('[WagStack updates]', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadUpdates, { once: true });
} else {
  loadUpdates();
}
