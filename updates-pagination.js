import { observeUI } from './ui-lifecycle.js';
let paginationFrame = 0;

function syncUpdatePagination() {
  const viewport = document.querySelector('[data-promo-viewport]');
  const track = document.querySelector('[data-promo-track]');
  const dotsWrap = document.querySelector('.home__promo-dots');
  if (!viewport || !track || !dotsWrap) return;

  const slides = [...track.querySelectorAll('.home__promo-slide')];
  if (!slides.length) return;

  const currentDots = [...dotsWrap.querySelectorAll('[data-promo-dot]')];
  if (currentDots.length !== slides.length) {
    dotsWrap.replaceChildren(...slides.map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.dataset.promoDot = String(index);
      dot.setAttribute('aria-label', `Show update ${index + 1}`);
      return dot;
    }));
  }

  const dots = [...dotsWrap.querySelectorAll('[data-promo-dot]')];
  dots.forEach((dot, index) => {
    if (dot.dataset.enhancedBound === 'true') return;
    dot.dataset.enhancedBound = 'true';
    dot.addEventListener('click', () => {
      viewport.scrollTo({ left: viewport.clientWidth * index, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('a11y-reduce-motion')?'auto':'smooth' });
    });
  });

  const width = Math.max(1, viewport.clientWidth);
  const active = Math.max(0, Math.min(slides.length - 1, Math.round(viewport.scrollLeft / width)));
  dots.forEach((dot, index) => {dot.classList.toggle('is-active', index === active);dot.setAttribute('aria-pressed',String(index===active));});
}

function schedulePaginationSync() {
  cancelAnimationFrame(paginationFrame);
  paginationFrame = requestAnimationFrame(syncUpdatePagination);
}

function bootUpdatePagination() {
  syncUpdatePagination();
  const viewport = document.querySelector('[data-promo-viewport]');
  const track = document.querySelector('[data-promo-track]');
  if (!viewport || !track) return;

  if (viewport.dataset.enhancedPagination !== 'true') {
    viewport.dataset.enhancedPagination = 'true';
    viewport.addEventListener('scroll', schedulePaginationSync, { passive: true });

  }

  if (track.dataset.enhancedPaginationObserver !== 'true') {
    track.dataset.enhancedPaginationObserver = 'true';
    new MutationObserver(schedulePaginationSync).observe(track, { childList: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootUpdatePagination, { once: true });
} else {
  bootUpdatePagination();
}

addEventListener('resize', schedulePaginationSync, { passive: true });
observeUI(bootUpdatePagination);
