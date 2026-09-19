(()=>{const id='branddemo-v33-revert-booking-stepper';document.getElementById(id)?.remove();const s=document.createElement('style');s.id=id;s.textContent=`
/* Restore booking stepper to the pre-v32 treatment. v32 dark-theme tab contrast must not touch booking progress. */
[data-theme="dark"] .pet-stepper{background:transparent!important;box-shadow:none!important}
[data-theme="dark"] .pet-stepper>span{background:rgba(255,255,255,.06)!important;color:#aebbd0!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)!important}
[data-theme="dark"] .pet-stepper>span.is-active{background:#f4f4ed!important;color:#0b1e3f!important;box-shadow:0 12px 26px -18px rgba(0,0,0,.72)!important}
[data-theme="dark"] .pet-stepper>span.is-done{background:rgba(255,122,26,.08)!important;color:#ff8a33!important;box-shadow:inset 0 0 0 1px rgba(255,138,51,.25)!important}
`;document.head.appendChild(s)})();