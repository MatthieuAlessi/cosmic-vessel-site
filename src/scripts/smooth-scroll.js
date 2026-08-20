// Smooth scroll (Lenis) piloté par le ticker GSAP, pour que ScrollTrigger reste
// synchro avec la position lissée. Désactivé si prefers-reduced-motion.
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const lenis = reduced
  ? null
  : new Lenis({
      // lerp plutôt que duration/easing : l'easing par défaut a une longue traîne.
      lerp: 0.15,
      // Distance par cran de molette — c'est ce curseur qui donne la sensation de vivacité.
      wheelMultiplier: 1.2,
      autoRaf: false,
    });

if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  // Passerelle pour les scripts is:inline (modale trailer), qui ne peuvent pas importer.
  window.lenis = lenis;
}

// Lenis ignore scroll-margin-top : on le relit pour garder les `scroll-mt-*` comme source unique.
export function scrollToTarget(target) {
  if (!lenis) {
    target.scrollIntoView({ block: 'start' });
    return;
  }
  const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  lenis.scrollTo(target, { offset: -offset });
}
