// Swiper de la section "Les 4 Voies" (/character).
// Le panneau détail (.voies-main) est piloté par :
//  - 4 boutons-onglets (.voie-tab, grille 2×2 en mobile) → slideTo,
//  - les flèches (.voies-prev/.voies-next) — DEUX paires (desktop à côté du
//    sélecteur, mobile en bas) → câblées à la main car Swiper Navigation ne
//    prend qu'un seul élément par direction,
//  - les dots (pagination .voies-dots),
//  - le swipe tactile natif de Swiper.
// Doc : https://swiperjs.com/swiper-api

import Swiper from 'swiper';
import { Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

function initVoiesSwiper() {
  const mainEl = document.querySelector('.voies-main');
  if (!mainEl) return;

  const tabs = Array.from(document.querySelectorAll('.voie-tab'));
  const prevs = Array.from(document.querySelectorAll('.voies-prev'));
  const nexts = Array.from(document.querySelectorAll('.voies-next'));

  const swiper = new Swiper(mainEl, {
    modules: [Pagination, EffectFade],
    effect: 'fade',
    fadeEffect: { crossFade: true },
    slidesPerView: 1,
    autoHeight: true, // ajuste la hauteur selon le panneau actif
    pagination: {
      el: '.voies-dots',
      clickable: true,
      bulletClass: 'voie-dot',
      bulletActiveClass: 'voie-dot--active',
    },
  });

  // Onglet actif = voie affichée.
  const setActiveTab = (i) => tabs.forEach((t, ti) => t.classList.toggle('is-active', ti === i));
  // État désactivé des flèches aux extrémités (les deux paires).
  const updateNav = () => {
    prevs.forEach((b) => b.classList.toggle('swiper-button-disabled', swiper.isBeginning));
    nexts.forEach((b) => b.classList.toggle('swiper-button-disabled', swiper.isEnd));
  };

  tabs.forEach((t, i) => t.addEventListener('click', () => swiper.slideTo(i)));
  prevs.forEach((b) => b.addEventListener('click', () => swiper.slidePrev()));
  nexts.forEach((b) => b.addEventListener('click', () => swiper.slideNext()));

  swiper.on('slideChange', () => {
    setActiveTab(swiper.activeIndex);
    updateNav();
  });
  setActiveTab(swiper.activeIndex);
  updateNav();
}

initVoiesSwiper();
