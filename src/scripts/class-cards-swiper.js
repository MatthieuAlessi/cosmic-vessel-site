// Swiper de la section "Classes" (home) — carrousel des 4 ClassCard.
// Mobile : slide active CENTRÉE (`centeredSlides`, ~1,3 carte visible) + swipe.
// Desktop (≥ md) : on DÉTRUIT le Swiper → les slides retombent en grille de 4
// (via les overrides `md:` sur le markup) → pas de slide "active" forcée en
// desktop, glow au hover comme partout. Le glow de la slide active (mobile) vient
// des règles `.swiper-slide-active .class-card__*` de global.css.
// Doc : https://swiperjs.com/swiper-api

import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';

const mq = window.matchMedia('(max-width: 767px)');
let swiper = null;

function create() {
  const el = document.querySelector('.class-swiper');
  if (!el || swiper) return;

  swiper = new Swiper(el, {
    modules: [Pagination, Navigation],
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true, // slide active au centre
    pagination: {
      el: '.class-swiper__dots',
      clickable: true,
      bulletClass: 'class-dot',
      bulletActiveClass: 'class-dot--active',
    },
    navigation: { prevEl: '.class-swiper__prev', nextEl: '.class-swiper__next' },
  });
}

function destroy() {
  if (!swiper) return;
  swiper.destroy(true, true); // supprime instance + styles → markup nu (grille desktop)
  swiper = null;
}

function sync() {
  mq.matches ? create() : destroy();
}

mq.addEventListener('change', sync);
sync();
