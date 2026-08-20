// Swiper "grande carte" mobile (< lg) de la section Voies (/character,
// VoiesShowcase) — même traitement que le carrousel Classes de la home
// (class-cards-swiper.js) : cartes qui débordent au bord de l'écran, coverflow
// à inclinaison légère + inertie sur le déplacement. Remplace la rangée de
// miniatures compactes sur mobile (celle-ci reste desktop uniquement, `hidden
// lg:block`, voir VoiesShowcase.astro).
//
// Chaque carte est un `.voie-thumb`, comme les miniatures desktop — la
// sélection (mise en avant + panneau texte) reste centralisée dans
// voies-showcase.js, indexée par `data-index` (pas la position dans le DOM :
// il existe deux groupes de `.voie-thumb` en parallèle, desktop + mobile).
// Le tap sur une carte la centre ET la sélectionne ; le swipe jusqu'à une
// carte la sélectionne une fois arrivée au centre.
// Doc : https://swiperjs.com/swiper-api

import Swiper from 'swiper';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

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

  // Le swipe jusqu'à une carte la sélectionne (comme un tap) — réutilise le
  // clic déjà branché par voies-showcase.js plutôt que de dupliquer sa logique.
  swiper.on('slideChange', () => {
    swiper.slides[swiper.activeIndex]?.click();
  });

  // Taper une carte non centrée (peek) la centre en plus de la sélectionner —
  // sinon la voie sélectionnée (surlignée) pourrait ne pas être celle au centre.
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
