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
//
// Ce fichier n'est que le GATE : il ne charge l'implémentation (et donc Swiper,
// ~84 ko) que si le média correspond. En import statique, Swiper partait aussi
// en desktop, où il est détruit aussitôt et ne sert jamais.
//
// ⚠️ Le CSS reste importé ICI, statiquement. Astro remonte le CSS de tout le
// graphe de modules d'une page dans le <head>, imports dynamiques compris — le
// passer en dynamique ne l'en enlève pas, mais fait générer par Vite un preload
// vers un nom de fichier qu'Astro n'émet pas : 404, promesse rejetée, et le
// swiper ne s'initialise jamais.
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const mq = window.matchMedia('(max-width: 767px)');
let swiper = null;
let loading = false;

async function create() {
  const el = document.querySelector('.class-swiper');
  // `loading` : un second appel pendant le await créerait une 2e instance.
  if (!el || swiper || loading) return;
  loading = true;

  try {
    const { createClassSwiper } = await import('./class-cards-swiper-impl.js');
    // Repassé en desktop pendant le chargement : ne rien instancier.
    if (!mq.matches || swiper) return;
    swiper = createClassSwiper(el);
  } finally {
    loading = false;
  }
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
