// Swiper de la section "Classes" (home) — carrousel des 4 ClassCard.
// Mobile : slide active CENTRÉE (`centeredSlides`) + effet coverflow (rotate
// ~11° — inclinaison 3D légère des cartes voisines/en mouvement, PAS un flip
// complet). Le déplacement a en plus une sensation d'inertie via `speed` +
// `transition-timing-function` (voir `.class-swiper .swiper-slide` dans
// global.css). Desktop (≥ md) : on DÉTRUIT le Swiper → les slides retombent en
// grille de 4 (via les overrides `md:` sur le markup) → pas de slide "active"
// forcée en desktop, glow au hover comme partout. Le glow de la slide active
// (mobile) vient des règles `.swiper-slide-active .class-card__*` de global.css.
// Doc : https://swiperjs.com/swiper-api

import Swiper from 'swiper';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const mq = window.matchMedia('(max-width: 767px)');
let swiper = null;

function create() {
  const el = document.querySelector('.class-swiper');
  if (!el || swiper) return;

  swiper = new Swiper(el, {
    modules: [Pagination, Navigation, EffectCoverflow],
    effect: 'coverflow',
    slidesPerView: 1.65, // carte active un peu plus petite
    // La carte voisine ne doit apparaître qu'en fin liseré au bord de l'écran
    // (espace vide entre la carte active et ce liseré), sans coller à la
    // carte active ni trop s'en éloigner.
    spaceBetween: 52,
    centeredSlides: true, // slide active au centre
    // Assez long pour que la courbe d'accélération (global.css) ait le temps
    // de se voir — un `speed` par défaut (300ms) la rendrait imperceptible.
    speed: 450,
    coverflowEffect: {
      // `spaceBetween` étant grand par rapport à la largeur de carte (cf. plus
      // haut), l'inclinaison réellement rendue sur la carte voisine est ~1.25x
      // ce paramètre (proportionnel à l'écart entre centres de slides) — 14
      // donne ~17-18° effectifs (fourchette demandée : 15-20°).
      rotate: 14,
      stretch: 0,
      // `depth` recule la carte en Z — combiné à la perspective, ça la fait
      // aussi paraître plus petite. Avec la réaccélération en fin de course de
      // la courbe ci-dessus (global.css), une valeur haute rendait ce
      // rétrécissement trop brutal sur la fin ("effet scale violent") — abaissé
      // pour un rendu plus doux, la carte recule sans sembler "rétrécir vite".
      depth: 45,
      modifier: 1,
      slideShadows: false,
    },
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
