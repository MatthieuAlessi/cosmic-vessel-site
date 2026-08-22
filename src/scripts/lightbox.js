// Lightbox PhotoSwipe, partagée par la home, /gallery et les articles.
//
// Chargée au PREMIER CLIC, jamais avant : en import statique, Vite sortait la
// feuille de style (~16 ko) en <link> dans le <head> — render-blocking sur trois
// pages pour une fonctionnalité que la plupart des visiteurs ne déclenchent jamais.
import { lenis } from './smooth-scroll.js';
// Statique volontairement : en import() dynamique, Vite génère un preload vers
// un nom qu'il n'émet pas (404 → promesse rejetée → lightbox jamais initialisée).
import 'photoswipe/style.css';

export function initLightbox(gallerySelector, childSelector = 'a.gallery-item') {
  const gallery = document.querySelector(gallerySelector);
  if (!gallery) return;

  let loaded = false;

  gallery.addEventListener('click', async (event) => {
    const item = event.target.closest(childSelector);
    // Une fois PhotoSwipe chargé c'est lui qui intercepte les clics : on se retire.
    if (!item || loaded) return;
    event.preventDefault();
    loaded = true;

    const index = [...gallery.querySelectorAll(childSelector)].indexOf(item);

    const { default: PhotoSwipeLightbox } = await import('photoswipe/lightbox');

    const lightbox = new PhotoSwipeLightbox({
      gallery: gallerySelector,
      children: childSelector,
      pswpModule: () => import('photoswipe'),
    });
    // PhotoSwipe pose son propre lock, mais Lenis pilote le vrai scrollTop :
    // sans ça la page continue de défiler derrière l'overlay (cf. CLAUDE.md).
    lightbox.on('beforeOpen', () => lenis?.stop());
    lightbox.on('destroy', () => lenis?.start());
    lightbox.init();

    // Le clic qui a déclenché le chargement doit quand même ouvrir son image.
    lightbox.loadAndOpen(index);
  });
}
