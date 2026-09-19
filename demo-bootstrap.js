// Standalone showcase: no production account, database, email, or payment connection.
(()=>{
  const query=new URLSearchParams(location.search),read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))||f}catch{return f}};
  const stored=read('demo-brand',{}),name=(query.get('brand')||stored.name||'Your Brand').slice(0,60),color=/^[0-9a-f]{6}$/i.test(query.get('color')||'')?'#'+query.get('color'):stored.color||'#ff7a1a';
  const logoInput=query.get('logo')||stored.logo||'',logo=/^https:\/\//i.test(logoInput)?logoInput:'';
  const client=(query.get('client')||stored.client||'general').replace(/[^a-z0-9_-]/gi,'').slice(0,60)||'general';
  window.DemoConfig={name,color,logo,client};localStorage.setItem('demo-brand',JSON.stringify(window.DemoConfig));
  localStorage.setItem('branddemo-guest-mode-v1','1');window.YourBrandCatalog={status:'ready'};
  if(query.get('presenter')==='1')localStorage.setItem('demo-presenter','1');
  window.DemoPresenter=localStorage.getItem('demo-presenter')==='1';
  document.documentElement.style.setProperty('--demo-accent',color);
  // Allow only this demo's APIs; backend isolation is additionally enforced by CSP.
  const nativeFetch=window.fetch.bind(window);
  window.fetch=(resource,options)=>{const url=new URL(resource instanceof Request?resource.url:resource,location.href);if(url.origin!==location.origin)return Promise.reject(new Error('External data connections are disabled in this demo.'));if(url.pathname.startsWith('/api/')&&!['/api/demo-events','/api/demo-inquiry','/api/demo-report'].includes(url.pathname))return Promise.reject(new Error('This action is not connected in the demo.'));return nativeFetch(resource,options)};
  if(location.pathname.startsWith('/auth/')||location.pathname==='/admin')history.replaceState({},'', '/');
})();
