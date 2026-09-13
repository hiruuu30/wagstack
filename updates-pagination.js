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
      viewport.scrollTo({ left: viewport.clientWidth * index, behavior: 'smooth' });
    });
  });

  const paint = () => {
    const width = Math.max(1, viewport.clientWidth);
    const active = Math.max(0, Math.min(slides.length - 1, Math.round(viewport.scrollLeft / width)));
    dots.forEach((dot, index) => dot.classList.toggle('is-active', index === active));
  };

  if (viewport.dataset.enhancedPagination !== 'true') {
    viewport.dataset.enhancedPagination = 'true';
    let frame = 0;
    viewport.addEventListener('scroll', () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    }, { passive: true });
    addEventListener('resize', paint, { passive: true });
  }
  paint();
}

function bootUpdatePagination() {
  syncUpdatePagination();
  const track = document.querySelector('[data-promo-track]');
  if (!track || track.dataset.enhancedPaginationObserver === 'true') return;
  track.dataset.enhancedPaginationObserver = 'true';
  new MutationObserver(syncUpdatePagination).observe(track, { childList: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootUpdatePagination, { once: true });
} else {
  bootUpdatePagination();
}
