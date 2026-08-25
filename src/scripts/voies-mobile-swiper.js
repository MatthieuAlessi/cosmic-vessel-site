// Swiper "grande carte" mobile (< lg) de la section Voies (/character,
// VoiesShowcase) — même traitement que class-cards-swiper.js. Remplace la
// rangée de miniatures compactes desktop (`hidden lg:block`, voir VoiesShowcase.astro).
//
// Chaque carte est un `.voie-thumb`, comme les miniatures desktop — la sélection
// reste centralisée dans voies-showcase.js, indexée par `data-index` (pas la
// position DOM : deux groupes de `.voie-thumb` existent en parallèle, desktop +
// mobile). Le tap centre ET sélectionne ; le swipe sélectionne une fois au centre.
// Doc : https://swiperjs.com/swiper-api

import Swiper from 'swiper';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

const mq = window.matchMedia('(max-width: 1023px)');
let swiper = null;

function create() {
  const el = document.querySelector('.voies-mobile');
  if (!el || swiper) return;

  swiper = new Swiper(el, {
    modules: [Pagination, Navigation, EffectCoverflow],
    effect: 'coverflow',
    slidesPerView: 1.65,
    spaceBetween: 52,
    centeredSlides: true,
    speed: 450,
    coverflowEffect: {
      rotate: 14,
      stretch: 0,
      depth: 45,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: '.voies-mobile__dots',
      clickable: true,
      bulletClass: 'class-dot',
      bulletActiveClass: 'class-dot--active',
    },
    navigation: { prevEl: '.voies-mobile__prev', nextEl: '.voies-mobile__next' },
  });

  // Réutilise le clic déjà branché par voies-showcase.js plutôt que de dupliquer sa logique.
  swiper.on('slideChange', () => {
    swiper.slides[swiper.activeIndex]?.click();
  });

  // Une carte non centrée (peek) tapée est aussi centrée — sinon la voie surlignée
  // pourrait ne pas être celle au centre.
  Array.from(el.querySelectorAll('.voie-thumb')).forEach((slide, i) => {
    slide.addEventListener('click', () => swiper.slideTo(i));
  });
}

function destroy() {
  if (!swiper) return;
  swiper.destroy(true, true);
  swiper = null;
}

const sync = () => (mq.matches ? create() : destroy());

mq.addEventListener('change', sync);
sync();
