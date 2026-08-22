// Implémentation du Swiper de la section "Classes" (home).
//
// Séparée de class-cards-swiper.js pour que le gate `matchMedia` puisse la charger
// en import() sans embarquer Swiper sur desktop. Les imports ci-dessous sont
// STATIQUES exprès : ça permet à Vite de tree-shaker `swiper/modules` et de ne
// garder que les trois modules utilisés — un `import('swiper/modules')` direct
// depuis le gate chargerait le baril entier (~+70 ko).
import Swiper from 'swiper';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

export function createClassSwiper(el) {
  return new Swiper(el, {
    modules: [Pagination, Navigation, EffectCoverflow],
    effect: 'coverflow',
    slidesPerView: 1.65,
    spaceBetween: 52,
    centeredSlides: true,
    // Assez long pour que la courbe d'accélération (global.css) ait le temps de se
    // voir — un `speed` par défaut (300ms) la rendrait imperceptible.
    speed: 450,
    coverflowEffect: {
      // L'inclinaison rendue sur la carte voisine est ~1.25x `rotate` (proportionnel
      // à `spaceBetween`, cf. au-dessus) : 14 donne ~17-18° effectifs.
      rotate: 14,
      stretch: 0,
      // Valeur abaissée : combinée à la réaccélération de fin de course de la courbe
      // CSS (global.css), une valeur haute rendait le rétrécissement en Z trop brutal.
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
