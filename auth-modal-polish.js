(()=>{
  const id='wag-auth-polish-v1';
  if(document.getElementById(id))return;
  const s=document.createElement('style');
  s.id=id;
  s.textContent=`
    .wag-auth-backdrop{
      overflow-y:auto!important;
      align-items:center!important;
      justify-items:center!important;
      padding:16px!important;
      overscroll-behavior:contain;
    }
    .wag-auth{
      width:min(420px,calc(100vw - 32px))!important;
      max-height:calc(100dvh - 32px)!important;
      overflow-y:auto!important;
      overscroll-behavior:contain;
      box-sizing:border-box!important;
      padding:22px!important;
      border-radius:24px!important;
      scrollbar-width:thin;
    }
    .wag-auth h2{margin:0 0 6px!important;font-size:21px!important;line-height:1.15!important}
    .wag-auth>p:not(.wag-auth-msg):not(.wag-auth-guest-note){margin:0 0 14px!important;font-size:14px!important;line-height:1.5!important}
    .wag-auth label{margin:9px 0 5px!important;font-size:12px!important;line-height:1.2!important}
    .wag-auth input{min-height:48px!important;padding:11px 13px!important;font-size:16px!important}
    .wag-auth-actions{gap:8px!important;margin-top:15px!important}
    .wag-auth button{min-height:40px!important}
    .wag-auth-primary,.wag-auth-secondary{padding:10px 13px!important}
    .wag-auth-guest{margin-top:8px!important;min-height:38px!important}
    .wag-auth-guest-note{margin:6px 0 0!important;font-size:12px!important;line-height:1.45!important}
    .wag-auth-resend{display:block!important;width:100%!important;margin:8px 0 0!important;padding:8px 0!important;text-align:left!important;font-size:12px!important;min-height:32px!important;opacity:.82}
    .wag-auth-msg{margin:8px 0 0!important;min-height:0!important;font-size:13px!important;line-height:1.45!important}
    .wag-auth a[href="/admin"],.wag-auth .admin-demo-link{
      display:block!important;
      margin:8px 0 0!important;
      padding:8px 0!important;
      text-align:center!important;
      color:#59687c!important;
      font-size:12px!important;
      font-weight:700!important;
      text-decoration:none!important;
    }
    .wag-auth a[href="/admin"]+p,.wag-auth .admin-demo-link+*{
      margin-top:2px!important;
      margin-bottom:0!important;
      text-align:center!important;
      font-size:8.5px!important;
      line-height:1.4!important;
    }
    [data-theme="dark"] .wag-auth{
      background:#10243a!important;
      color:#f5f7fb!important;
      box-shadow:0 30px 90px rgba(0,0,0,.48),inset 0 0 0 1px rgba(255,255,255,.08)!important;
    }
    [data-theme="dark"] .wag-auth h2,
    [data-theme="dark"] .wag-auth label,
    [data-theme="dark"] .wag-auth-account{color:#f5f7fb!important}
    [data-theme="dark"] .wag-auth>p:not(.wag-auth-msg),
    [data-theme="dark"] .wag-auth-guest-note,
    [data-theme="dark"] .wag-auth a[href="/admin"],
    [data-theme="dark"] .wag-auth .admin-demo-link{color:#aebbd0!important}
    [data-theme="dark"] .wag-auth input{
      background:#17314f!important;
      color:#f5f7fb!important;
      border-color:rgba(255,255,255,.14)!important;
      box-shadow:none!important;
    }
    [data-theme="dark"] .wag-auth input::placeholder{color:#8193aa!important;opacity:1!important}
    [data-theme="dark"] .wag-auth input:focus{
      border-color:#ff8a33!important;
      box-shadow:0 0 0 3px rgba(255,138,51,.16)!important;
    }
    [data-theme="dark"] .wag-auth-secondary{
      background:#1a3553!important;
      color:#f3f6fb!important;
    }
    [data-theme="dark"] .wag-auth-guest{
      background:rgba(255,255,255,.025)!important;
      color:#dfe7f1!important;
      box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)!important;
    }
    [data-theme="dark"] .wag-auth-guest:hover{background:rgba(255,255,255,.06)!important}
    [data-theme="dark"] .wag-auth-resend{color:#c7d4e4!important}
    [data-theme="dark"] .wag-auth-close{color:#dce5f0!important}
    [data-theme="dark"] .wag-auth-msg{color:#ffaaa4!important}
    @media(max-height:760px){
      .wag-auth-backdrop{align-items:start!important;padding-top:10px!important;padding-bottom:10px!important}
      .wag-auth{max-height:calc(100dvh - 20px)!important;padding:18px!important;border-radius:20px!important}
      .wag-auth h2{font-size:19px!important}.wag-auth>p:not(.wag-auth-msg):not(.wag-auth-guest-note){margin-bottom:10px!important}
      .wag-auth label{margin-top:7px!important}.wag-auth input{min-height:44px!important}.wag-auth-actions{margin-top:12px!important}
      .wag-auth-guest{margin-top:6px!important}.wag-auth-resend{margin-top:5px!important}
    }
    @media(max-width:480px){
      .wag-auth-backdrop{padding:10px!important}
      .wag-auth{width:100%!important;max-height:calc(100dvh - 20px)!important;padding:18px!important;border-radius:20px!important}
      .wag-auth-actions{display:grid!important;grid-template-columns:1fr 1fr!important}
    }
  `;
  document.head.appendChild(s);
})();
