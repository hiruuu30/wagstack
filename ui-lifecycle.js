const patches = new Set();
let pending = false;
let observer;
function flush() {
  pending = false;
  observer?.disconnect();
  try { for (const patch of patches) { try { patch(); } catch (error) { console.error('YourBrand UI update', error); } } }
  finally { observer?.observe(document.body, { childList: true, subtree: true }); }
}
export function scheduleUI() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(flush);
}
export function observeUI(patch) { patches.add(patch); scheduleUI(); }
function start() {
  observer = new MutationObserver(scheduleUI);
  observer.observe(document.body, { childList: true, subtree: true });
  scheduleUI();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true}); else start();
addEventListener('popstate', scheduleUI);
addEventListener('storage', scheduleUI);
document.addEventListener('branddemo:render', scheduleUI);
