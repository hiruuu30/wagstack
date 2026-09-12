// Preview-only isolation layer: final rendered UI must rely on WagStack-owned local CSS.
// This intentionally disables/removes the legacy external reference stylesheet before app rendering continues.
(function isolateLocalStyles(){
  const stripExternal = () => {
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href.includes('portfolio.brewedops.cloud/assets/index-')) {
        link.disabled = true;
        link.remove();
      }
    });
  };

  stripExternal();

  document.documentElement.dataset.styleSource = 'wagstack-local-only';

  const cleanRuntimeMarkers = () => {
    document.querySelectorAll('[data-engine]').forEach((el) => {
      const value = el.getAttribute('data-engine') || '';
      if (/brewedops/i.test(value)) el.setAttribute('data-engine', 'wagstack-motion-canvas-v1');
    });
    document.querySelectorAll('canvas[data-engine]').forEach((el) => {
      const value = el.getAttribute('data-engine') || '';
      if (/brewedops/i.test(value)) el.setAttribute('data-engine', 'threejs-wagstack-motion');
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      stripExternal();
      cleanRuntimeMarkers();
    }, { once: true });
  } else {
    stripExternal();
    cleanRuntimeMarkers();
  }

  new MutationObserver(() => {
    stripExternal();
    cleanRuntimeMarkers();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
