import { observeUI } from './ui-lifecycle.js';

const applyAdoptionPhoto = () => {
  const art = document.querySelector('.update-adoption-art');
  if (!art || art.dataset.photoApplied === 'true') return;
  art.dataset.photoApplied = 'true';
  art.innerHTML = '<img src="/assets/adoption-dog-cat.svg" alt="" width="420" height="420" decoding="async" loading="lazy">';
  const img = art.querySelector('img');
  Object.assign(art.style, {
    placeItems: 'center',
    background: '#f8f5ef'
  });
  Object.assign(img.style, {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center'
  });
};

observeUI(applyAdoptionPhoto);
applyAdoptionPhoto();
