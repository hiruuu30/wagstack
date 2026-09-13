(()=>{
  const css=`
  [data-theme='dark'] body,
  [data-theme='dark'] .wa{background:#0d1b2a!important;color:#eef3fb!important}
  [data-theme='dark'] .wa-main{background:radial-gradient(circle at top left,rgba(255,122,26,.08),transparent 32%),#0d1b2a!important;color:#eef3fb!important}
  [data-theme='dark'] .wa-side{background:#10243a!important;border-right-color:rgba(255,255,255,.08)!important;color:#eef3fb!important}
  [data-theme='dark'] .wa-brand strong,
  [data-theme='dark'] .wa-top h1,
  [data-theme='dark'] .wa-titlebar h2,
  [data-theme='dark'] .wa-head h2,
  [data-theme='dark'] .wa-value,
  [data-theme='dark'] .wa-mini strong,
  [data-theme='dark'] .wa-act strong,
  [data-theme='dark'] .wa-table td strong{color:#f7f9fc!important}
  [data-theme='dark'] .wa-brand small,
  [data-theme='dark'] .wa-kicker,
  [data-theme='dark'] .wa-sub,
  [data-theme='dark'] .wa-note,
  [data-theme='dark'] .wa-owner,
  [data-theme='dark'] .wa-head span,
  [data-theme='dark'] .wa-act small,
  [data-theme='dark'] .wa-mini span,
  [data-theme='dark'] .wa-empty,
  [data-theme='dark'] .wa-loading{color:#9fb0c4!important}
  [data-theme='dark'] .wa-card,
  [data-theme='dark'] .wa-panel,
  [data-theme='dark'] .wa-kpi,
  [data-theme='dark'] .wa-mini{background:#132a42!important;border-color:rgba(255,255,255,.08)!important;box-shadow:0 18px 40px -28px rgba(0,0,0,.65)!important}
  [data-theme='dark'] .wa-nav button{color:#b9c7d6!important}
  [data-theme='dark'] .wa-nav button:hover{background:rgba(255,255,255,.06)!important;color:#fff!important}
  [data-theme='dark'] .wa-nav button.is-on{background:rgba(255,122,26,.14)!important;color:#fff!important;box-shadow:inset 0 0 0 1px rgba(255,122,26,.22)!important}
  [data-theme='dark'] .wa-exit{color:#b9c7d6!important;border-color:rgba(255,255,255,.1)!important;background:rgba(255,255,255,.03)!important}
  [data-theme='dark'] .wa-exit:hover{background:rgba(255,255,255,.07)!important;color:#fff!important}
  [data-theme='dark'] .wa-refresh{background:#17314f!important;color:#eef3fb!important;border:1px solid rgba(255,255,255,.08)!important}
  [data-theme='dark'] .wa-refresh:hover{background:#1b395a!important}
  [data-theme='dark'] .wa-table{color:#e7edf5!important}
  [data-theme='dark'] .wa-table thead th{background:#10243a!important;color:#9fb0c4!important;border-bottom-color:rgba(255,255,255,.08)!important}
  [data-theme='dark'] .wa-table tbody td{border-bottom-color:rgba(255,255,255,.07)!important;color:#dfe7f0!important}
  [data-theme='dark'] .wa-table tbody tr:hover{background:rgba(255,255,255,.025)!important}
  [data-theme='dark'] .wa-tablewrap{background:#132a42!important}
  [data-theme='dark'] .wa-select{background:#17314f!important;color:#f4f7fb!important;border-color:rgba(255,255,255,.12)!important}
  [data-theme='dark'] .wa-select option{background:#17314f;color:#fff}
  [data-theme='dark'] .wa-chip{background:rgba(255,255,255,.06)!important;color:#c8d4e0!important;border-color:rgba(255,255,255,.08)!important}
  [data-theme='dark'] .wa-live:before{box-shadow:0 0 0 4px rgba(34,160,107,.12)}
  [data-theme='dark'] .wa-error{background:#35191e!important;color:#ffb4b4!important;border:1px solid rgba(255,120,120,.14)!important}
  [data-theme='dark'] ::selection{background:rgba(255,122,26,.35);color:#fff}
  `;

  function inject(){
    if(document.getElementById('wag-admin-dark-theme'))return;
    const s=document.createElement('style');
    s.id='wag-admin-dark-theme';
    s.textContent=css;
    document.head.appendChild(s);
  }

  function mirrorTheme(){
    const html=document.documentElement;
    const body=document.body;
    if(!html||!body)return;
    const theme=html.getAttribute('data-theme')||body.getAttribute('data-theme');
    if(theme) html.setAttribute('data-theme',theme);
  }

  inject();
  mirrorTheme();
  const mo=new MutationObserver(mirrorTheme);
  mo.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  if(document.body)mo.observe(document.body,{attributes:true,attributeFilter:['data-theme']});
})();
