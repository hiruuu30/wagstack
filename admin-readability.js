(()=>{
  if(location.pathname!=='/admin')return;
  const style=document.createElement('style');
  style.id='wag-admin-readability';
  style.textContent=`
    .wa-brand strong{font-size:22px!important;line-height:1.05!important}.wa-brand small{font-size:10px!important;line-height:1.35!important}.wa-nav button{font-size:11px!important;line-height:1.35!important;padding:13px 14px!important}.wa-exit{font-size:11px!important;padding:13px!important}
    .wa-kicker{font-size:11px!important;line-height:1.35!important}.wa h1{font-size:clamp(34px,4.4vw,54px)!important;line-height:1.02!important}.wa-sub{font-size:12px!important;line-height:1.55!important}.wa-chip,.wa-btn,.wa-refresh{font-size:10px!important;line-height:1.25!important;padding:11px 15px!important}
    .wa-kpi{padding:20px!important;min-height:136px!important}.wa-label{font-size:10px!important;line-height:1.35!important;letter-spacing:.07em!important}.wa-value{font-size:32px!important;line-height:1.08!important;margin-top:10px!important}.wa-note{font-size:10px!important;line-height:1.45!important;margin-top:5px!important}
    .wa-head h2,.wa-titlebar h2{font-size:17px!important;line-height:1.3!important}.wa-head span,.wa-titlebar span{font-size:10px!important;line-height:1.35!important}.wa-panel{padding:20px!important}
    .wa-act{padding:12px 13px!important}.wa-act strong{font-size:11px!important;line-height:1.4!important}.wa-act small{font-size:9px!important;line-height:1.45!important;margin-top:3px!important}.wa-owner{font-size:9px!important;line-height:1.45!important;margin-top:3px!important}
    .wa-table th{font-size:9px!important;line-height:1.35!important;padding:12px 14px!important;letter-spacing:.07em!important}.wa-table td{font-size:11px!important;line-height:1.5!important;padding:14px!important}.wa-table td strong{font-size:11px!important;line-height:1.4!important}.wa-select{font-size:10px!important;line-height:1.3!important;padding:8px 10px!important;min-height:34px!important}
    .wa-mini{padding:18px!important}.wa-mini strong{font-size:24px!important;line-height:1.1!important}.wa-mini span{font-size:10px!important;line-height:1.4!important;margin-top:4px!important}.wa-empty,.wa-error,.wa-loading{font-size:12px!important;line-height:1.55!important}
    @media(max-width:900px){.wa-nav button{font-size:10px!important}.wa h1{font-size:38px!important}.wa-value{font-size:28px!important}}
    @media(max-width:560px){.wa-main{padding:18px 14px 54px!important}.wa-kpis{grid-template-columns:1fr!important}.wa h1{font-size:34px!important}.wa-sub{font-size:11px!important}.wa-table th{font-size:8.5px!important}.wa-table td{font-size:10.5px!important}.wa-value{font-size:29px!important}}
  `;
  document.head.appendChild(style);
})();