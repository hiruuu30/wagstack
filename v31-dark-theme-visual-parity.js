(()=>{const id='branddemo-v31-dark-theme-visual-parity';document.getElementById(id)?.remove();const s=document.createElement('style');s.id=id;s.textContent=`
/* v31 — dark theme visual parity: colors only */
[data-theme="dark"]{
 --ink:#f6f8fc;--muted:#aebbd0;--paper:#0b1d35;--orange:#ff7a1a;
 --dark-bg:#07101f;--dark-surface:#0e2443;--dark-surface-2:#122b4e;--dark-surface-3:#183252;
 --dark-line:rgba(255,255,255,.13);--dark-line-strong:rgba(255,255,255,.22);
 --dark-text:#f6f8fc;--dark-muted:#aebbd0;--dark-faint:#7f90aa;--dark-orange:#ff8a33;
}
[data-theme="dark"] body,[data-theme="dark"] .shell,[data-theme="dark"] .shell__panel{color:var(--dark-text)!important}
[data-theme="dark"] :is(h1,h2,h3,h4,strong,.bento__title,.rail__name,.clone-metric,.pet-metric,.home__promo-slide strong){color:var(--dark-text)!important}
[data-theme="dark"] :is(p,small,.bento__desc,.rail__handle,.home__promo-slide small,.clone-card__meta,.pet-upload-kicker){color:var(--dark-muted)!important}
[data-theme="dark"] :is(.clone-card__no,.bento__label,.home__promo-slide>span,.v27-shop-kicker){color:var(--dark-orange)!important}

/* primary/secondary buttons */
[data-theme="dark"] :is(.clone-btn,.v27-add,.v27-editor__save,.pet-edit-save,.pet-link-btn,.pet-upload-button,.pet-card-action,.wag-time-slot,.v27-filter){border-color:var(--dark-line)!important}
[data-theme="dark"] :is(.clone-btn:not(.clone-btn--ghost),.v27-add,.v27-editor__save,.pet-edit-save){background:#f4f6fb!important;color:#07101f!important;box-shadow:none!important}
[data-theme="dark"] :is(.clone-btn--ghost,.pet-edit-cancel,.v27-editor__cancel,.pet-card-action,.v27-action,.pet-link-btn){background:var(--dark-surface-3)!important;color:#eef3fb!important;box-shadow:inset 0 0 0 1px var(--dark-line)!important}
[data-theme="dark"] :is(.clone-btn,.v27-add,.v27-editor__save,.pet-edit-save,.clone-btn--ghost,.pet-card-action,.v27-action,.pet-link-btn):hover{filter:brightness(1.08)}
[data-theme="dark"] :is(.clone-btn,.v27-add,.v27-editor__save,.pet-edit-save,.clone-btn--ghost,.pet-card-action,.v27-action,.pet-link-btn):disabled{opacity:.42!important;color:var(--dark-faint)!important}

/* navigation and action circles */
[data-theme="dark"] .rail__link{color:#b8c5d8!important}
[data-theme="dark"] .rail__link:hover{color:#fff!important;background:rgba(255,255,255,.055)!important}
[data-theme="dark"] .rail__link.active,[data-theme="dark"] .rail__link.is-active{background:#163252!important;color:#fff!important;box-shadow:inset 0 0 0 1px var(--dark-line)!important}
[data-theme="dark"] :is(.rail__social,.rail__theme){background:#112a49!important;color:#eef3fb!important;box-shadow:inset 0 0 0 1px var(--dark-line)!important}
[data-theme="dark"] :is(.rail__social,.rail__theme):hover{background:#193859!important;color:#fff!important}
[data-theme="dark"] .rail__edit-profile{background:#183252!important;color:#e7edf7!important;box-shadow:inset 0 0 0 1px var(--dark-line)!important}

/* icons */
[data-theme="dark"] :is(.ph-duo,.ricon--phosphor,.clone-icon--phosphor,.bento__icon,.pet-insight-icon,.wag-service-icon){color:var(--dark-orange)!important}
[data-theme="dark"] :is(.clone-icon--phosphor,.bento__icon,.pet-insight-icon,.wag-service-icon){background:linear-gradient(145deg,rgba(255,122,26,.20),rgba(255,122,26,.08))!important;box-shadow:inset 0 0 0 1px rgba(255,138,51,.28)!important}
[data-theme="dark"] .ph-duo path[opacity]{opacity:.4!important}

/* cards, chips, pills, badges */
[data-theme="dark"] :is(.bento__card,.clone-card,.pet-profile-card,.pet-insight-card,.home__promo-card,.v27-shop-intro,.v27-shop-bag,.v27-product){background:linear-gradient(145deg,var(--dark-surface-2),var(--dark-surface))!important;color:var(--dark-text)!important;box-shadow:inset 0 0 0 1px var(--dark-line)!important}
[data-theme="dark"] :is(.clone-tag,.pet-status,.bento__chip,.bento__offer-tile,.wag-day,.wag-time-slot,.v27-filter,.v27-qty button){background:#183252!important;color:#e8eef8!important;box-shadow:inset 0 0 0 1px var(--dark-line)!important}
[data-theme="dark"] :is(.pet-status--due,.clone-tag--due){color:#ffb06b!important;background:rgba(255,138,51,.12)!important;box-shadow:inset 0 0 0 1px rgba(255,138,51,.3)!important}
[data-theme="dark"] :is(.pet-status--good,.clone-tag--good){color:#7ce1ae!important;background:rgba(73,190,135,.11)!important;box-shadow:inset 0 0 0 1px rgba(124,225,174,.25)!important}
[data-theme="dark"] .wag-day.is-selected{background:#f4f6fb!important;color:#07101f!important;box-shadow:none!important}
[data-theme="dark"] .wag-time-slot.is-selected{background:var(--dark-orange)!important;color:#07101f!important;box-shadow:none!important}

/* inputs */
[data-theme="dark"] :is(input,select,textarea,.pet-input,.v27-editor__field input,.v27-editor__field textarea){background:#102947!important;color:#f4f7fb!important;box-shadow:inset 0 0 0 1px var(--dark-line)!important;caret-color:#fff!important}
[data-theme="dark"] :is(input,textarea)::placeholder{color:#7f90aa!important;opacity:1!important}
[data-theme="dark"] select option{background:#102947!important;color:#f4f7fb!important}
[data-theme="dark"] :is(input,select,textarea,.pet-input):focus{outline:none!important;box-shadow:inset 0 0 0 1px rgba(255,138,51,.55),0 0 0 3px rgba(255,122,26,.12)!important}

/* dashboard special elements */
[data-theme="dark"] .bento__booking-shot{background:#102947!important;color:#e9eff8!important;box-shadow:inset 0 0 0 1px var(--dark-line)!important}
[data-theme="dark"] .bento__booking-shot.is-placeholder{background:#102947!important;color:#8fa0b8!important}
[data-theme="dark"] .bento__shop-row{background:#173252!important;color:#e8eef8!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)!important}
[data-theme="dark"] .bento__shop-row :is(span,small,strong){color:#d9e2ef!important}
[data-theme="dark"] .health-marquee .bento__chip{background:#183252!important;color:#e8eef8!important;box-shadow:inset 0 0 0 1px var(--dark-line)!important}
[data-theme="dark"] .health-marquee .bento__chip svg{color:#ff9a4f!important}
[data-theme="dark"] .home__promo-controls button{background:#183252!important;color:#f2f5fa!important;box-shadow:inset 0 0 0 1px var(--dark-line)!important}
[data-theme="dark"] .home__promo-controls button:hover{background:#214062!important}
[data-theme="dark"] .home__promo-card .home__promo-slide>span{color:var(--dark-orange)!important}

/* modals / overlays */
[data-theme="dark"] :is(.pet-edit-modal,.v27-editor__card){background:#0d2340!important;color:#f4f7fb!important;box-shadow:0 34px 100px -40px rgba(0,0,0,.9),inset 0 0 0 1px var(--dark-line)!important}
[data-theme="dark"] :is(.pet-edit-close,.v27-lightbox__close){background:#183252!important;color:#f4f7fb!important;box-shadow:inset 0 0 0 1px var(--dark-line)!important}

/* rewards / progress */
[data-theme="dark"] :is(.bento__reward-strip,.pet-reward-card,.v27-bag-list){background:#173252!important;color:#f2f5fa!important;border-color:var(--dark-line)!important}
[data-theme="dark"] :is(.bento__reward-strip,.pet-reward-card) strong{color:#fff!important}
[data-theme="dark"] :is(.bento__reward-strip,.pet-reward-card) small{color:#ff8a33!important}
`;document.head.appendChild(s);
})();
