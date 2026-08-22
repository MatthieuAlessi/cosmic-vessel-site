// Implémentation du Swiper de la section "Classes" (home).
//
// Séparée de class-cards-swiper.js pour que le gate `matchMedia` puisse la
// charger en import() sans embarquer Swiper sur desktop. Les imports ci-dessous
// sont STATIQUES exprès : c'est ce qui permet à Vite de tree-shaker `swiper/modules`
// et de ne garder que les trois modules utilisés. Un `import('swiper/modules')`
// direct depuis le gate chargerait le baril entier (~+70 ko).
import Swiper from 'swiper';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

export function createClassSwiper(el) {
  return new Swiper(el, {
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
