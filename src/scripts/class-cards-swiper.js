// Swiper de la section "Classes" (home) — carrousel des 4 ClassCard.
// Mobile : slide active centrée + effet coverflow (styles dans `.class-swiper
// .swiper-slide` de global.css). Desktop (≥ md) : Swiper détruit, les slides
// retombent en grille de 4 via les overrides `md:` du markup.
// Doc : https://swiperjs.com/swiper-api
//
// Ce fichier n'est que le GATE : il ne charge l'implémentation (et donc Swiper,
// ~84 ko) que si le média correspond — en import statique, Swiper partait aussi
// en desktop pour être détruit aussitôt.
//
// ⚠️ Le CSS de Swiper n'est PAS importé ici : il vit dans global.css. Importé
// depuis un module JS, il génère un chunk homonyme du module d'effet et Vite
// finit par référencer un fichier qu'il n'émet pas → 404 et swiper mort.

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
