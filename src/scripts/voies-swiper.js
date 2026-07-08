// Configuration Swiper de la section "Les 4 Voies" (/character).
// Pattern main + thumbs : le slider principal (panneau détail) est piloté par
// la bande de miniatures du bas (les chips) + flèches de navigation.
// Doc : https://swiperjs.com/swiper-api#thumbs

import Swiper from 'swiper';
import { Navigation, Thumbs, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';

function initVoiesSwiper() {
  const mainEl = document.querySelector('.voies-main');
  const thumbsEl = document.querySelector('.voies-thumbs');
  if (!mainEl || !thumbsEl) return;

  // Bande de miniatures (chips) : largeur au contenu, défilable.
  const thumbs = new Swiper(thumbsEl, {
    slidesPerView: 'auto',
    spaceBetween: 8,
    watchSlidesProgress: true, // requis pour le module Thumbs
    slideToClickedSlide: true, // recentre la chip cliquée
  });

  // Slider principal (panneaux détail) piloté par les chips + flèches.
  new Swiper(mainEl, {
    modules: [Navigation, Thumbs, EffectFade],
    effect: 'fade',
    fadeEffect: { crossFade: true },
    slidesPerView: 1,
    autoHeight: true, // ajuste la hauteur selon le panneau actif
    navigation: {
      nextEl: '.voies-next',
      prevEl: '.voies-prev',
    },
    thumbs: { swiper: thumbs },
  });
}

initVoiesSwiper();
