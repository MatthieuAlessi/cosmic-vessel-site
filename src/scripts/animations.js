// Animations du site.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── .anim-blur : révélation mot par mot, du flou au net ───────────────────
// Déclenché une fois à l'entrée dans le viewport (jamais de scrub, cf. CLAUDE.md).
const BLUR_DURATION = 1.4;
const BLUR_STAGGER = 0.18;
const BLUR_EASE = 'power2.out';
const BLUR_AMOUNT = 12; // px, flou de départ de chaque mot
const BLUR_START_OPACITY = 0;

// Certains titres (.title-hero, .title-section, .title-1…) sont en
// background-clip:text avec un dégradé : découpés, chaque mot devient une
// boîte à part et le dégradé y redémarre. On repeint sur chaque mot la
// tranche de rampe qui lui revient. Ne fait rien sur un texte "normal".
function paintSplitGradient(el, fragments) {
  const cs = getComputedStyle(el);
  if ((cs.webkitBackgroundClip || cs.backgroundClip) !== 'text') return;

  const box = el.getBoundingClientRect();
  fragments.forEach((frag) => {
    const r = frag.getBoundingClientRect();
    frag.style.backgroundImage = cs.backgroundImage;
    frag.style.backgroundSize = `${box.width}px ${box.height}px`;
    frag.style.backgroundPosition = `${box.left - r.left}px ${box.top - r.top}px`;
    frag.style.backgroundRepeat = 'no-repeat';
    frag.style.setProperty('-webkit-background-clip', 'text');
    frag.style.setProperty('background-clip', 'text');
  });
}

// Le blur n'est jamais posé sur le mot lui-même mais sur un wrapper : le mot
// est clippé d'abord, le wrapper floute un résultat déjà clippé.
// ⚠️ Le wrapper NE SUFFIT PAS : le bug de background-clip:text se déclenche dès
// qu'un ANCÊTRE est flouté, wrapper compris. C'est la règle
// `.anim-blur__word > * { transform: translateZ(0) }` de global.css qui règle
// réellement le problème — ne pas la retirer en croyant qu'elle est décorative.
function wrapWords(words) {
  return words.map((word) => {
    const wrap = document.createElement('span');
    wrap.className = 'anim-blur__word';
    word.parentNode.insertBefore(wrap, word);
    wrap.appendChild(word);
    return wrap;
  });
}

// ─── Parallax : image de fond qui défile moins vite que la page ────────────
// data-parallax est posé par BgImage.astro (variant non-fixed), qui a déjà
// agrandi l'image pour que l'amplitude reste dans sa marge.
//
// Le trigger est TOUJOURS le wrapper (parentElement) : BgImage rend l'image dans un
// `absolute inset-0` qui épouse exactement la boîte à animer. Ne pas remonter à un
// closest("section") — sur un calque niché dans un div plus petit que sa section,
// le trigger ne serait plus aligné sur l'image et le calcul tomberait à côté.
if (!reduced) {
  document.querySelectorAll('[data-parallax]').forEach((img) => {
    const range = Number(img.dataset.parallax);
    if (!range) return;

    gsap.fromTo(
      img,
      { yPercent: -range },
      {
        yPercent: range,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });
}

// ─── Fixed parallax : reproduit background-attachment:fixed avec une vraie <img> ──
// (compatible iOS, où background-attachment:fixed est ignoré). Posé par BgImage.astro
// (prop bgfixedparallax) sur [data-bgfixedparallax].
//
// L'aire de référence d'un fond fixe EST le viewport, pas la boîte : l'image fait
// donc exactement une hauteur de viewport (cadrage identique à background-size:cover),
// et on la translate à l'inverse du scroll pour qu'elle paraisse immobile.
// Soit S le haut de la boîte dans le viewport, H sa hauteur, vh le viewport :
// l'image est en absolute inset-0 de cette boîte, son haut non translaté vaut donc S.
// On veut ce haut à 0 → y = -S, linéaire en S :
//   au départ (top bottom)  S = vh → y = -vh
//   à la fin  (bottom top)  S = -H → y = H
// ⚠️ Ne pas sur-dimensionner l'image (une version précédente la mettait à vh + 2H) :
// l'effet fixe restait juste, mais object-cover devait l'agrandir plusieurs fois pour
// remplir la boîte et on n'en voyait plus qu'une bande. Marche aussi si H < vh.
//
// Un pur position:sticky ne fonctionne pas ici : la boîte (le "cadre") est plus
// courte que l'élément collant, ce qui ne laisse aucune marge de collage.
// En reduced-motion, l'image reste telle quelle : object-cover plein cadre, immobile.
if (!reduced) {
  document.querySelectorAll('[data-bgfixedparallax]').forEach((img) => {
    const box = img.parentElement;

    gsap.fromTo(
      img,
      { y: () => -window.innerHeight },
      {
        y: () => box.getBoundingClientRect().height,
        ease: 'none',
        scrollTrigger: {
          trigger: box,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
          onRefreshInit: () => gsap.set(img, { height: window.innerHeight }),
        },
      }
    );
  });
}

const blurEls = Array.from(document.querySelectorAll('.anim-blur'));

if (blurEls.length) {
  // Le CSS masque .anim-blur (.js .anim-blur) : c'est donc à ce script de le
  // révéler dans tous les cas, y compris quand il n'anime pas.
  if (reduced) {
    gsap.set(blurEls, { opacity: 1 });
  } else {
    // Splitter avant le chargement de Cinzel découperait aux positions de la
    // police de fallback.
    document.fonts.ready.then(() => {
      blurEls.forEach((el) => {
        let revealed = false;
        let targets = [];

        new SplitText(el, {
          type: 'words',
          aria: 'auto',
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(el, { opacity: 1 });
            paintSplitGradient(el, self.words);
            targets = wrapWords(self.words);

            if (revealed) {
              // Re-split après coup (resize) : titre déjà révélé, on le remet
              // net sans filter résiduel ni couche de compo (cf. aliasing).
              el.classList.remove('is-animating');
              gsap.set(targets, { clearProps: 'filter', opacity: 1 });
            } else {
              el.classList.add('is-animating');
              gsap.set(targets, {
                filter: `blur(${BLUR_AMOUNT}px)`,
                opacity: BLUR_START_OPACITY,
              });
            }
          },
        });

        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            revealed = true;
            gsap.to(targets, {
              filter: 'blur(0px)',
              opacity: 1,
              duration: BLUR_DURATION,
              stagger: BLUR_STAGGER,
              ease: BLUR_EASE,
              // Les deux doivent tomber dans le MÊME tick : le filter (un
              // blur(0) résiduel garde une couche de compo inutile) et la
              // classe qui porte le translateZ(0). Retirer la couche avant le
              // filter rouvrirait une frame d'auréole ; la garder après coup
              // laisserait le texte crénelé (pas d'antialiasing sous-pixel).
              onComplete: () => {
                gsap.set(targets, { clearProps: 'filter' });
                el.classList.remove('is-animating');
              },
            });
          },
        });
      });
    });
  }
}
