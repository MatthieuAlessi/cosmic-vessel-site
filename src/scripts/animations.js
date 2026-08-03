// Reveal au scroll — data-animate="fade|slide-up|slide-down|slide-left|slide-right|clip"
// (+ data-animate-delay/-duration en s)
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';
const DURATION = 0.9;
const OFFSET = 40;

const presets = {
  fade: { opacity: 0 },
  'slide-up': { opacity: 0, y: OFFSET },
  'slide-down': { opacity: 0, y: -OFFSET },
  'slide-left': { opacity: 0, x: OFFSET },
  'slide-right': { opacity: 0, x: -OFFSET },
  clip: { clipPath: 'inset(0 0 100% 0)' },
};

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-animate]').forEach((el) => {
    const from = presets[el.dataset.animate];
    if (!from) return;

    gsap.set(el, from);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () =>
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: Number(el.dataset.animateDuration || DURATION),
          delay: Number(el.dataset.animateDelay || 0),
          ease: EASE,
          clearProps: 'transform',
        }),
    });
  });
}
