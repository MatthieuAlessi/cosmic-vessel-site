// Sélecteur de la section "Voies — variante pile de cartes" (/character).
// Un seul index actif pilote trois vues synchronisées :
//  - la pile de gauche (.voies-deck__item) : data-pos = rang depuis la carte
//    active (0 = devant), les transforms/z-index sont dans global.css,
//  - les miniatures (.voie-thumb) — DEUX groupes en parallèle (rangée compacte
//    desktop + carrousel grande carte mobile, voir VoiesShowcase.astro) : donc
//    indexées par `data-index` (la voie qu'elles représentent), jamais par leur
//    position dans le DOM — celle-ci ne correspond plus à l'index de la voie
//    une fois les deux groupes concaténés par `querySelectorAll`,
//  - les panneaux [data-voie-panel] (mécanisme .layer-stack/.layer) — il y en a
//    PLUSIEURS piles (texte à droite, sorts à gauche), toutes indexées pareil.
// Navigation cyclique (pas d'extrémité) : c'est une pile, pas un slider.

function initVoiesShowcase() {
  document.querySelectorAll('.voies-showcase').forEach((root) => {
    const deck = Array.from(root.querySelectorAll('.voies-deck__item'));
    const thumbs = Array.from(root.querySelectorAll('.voie-thumb'));
    const panels = Array.from(root.querySelectorAll('[data-voie-panel]'));
    const count = deck.length;
    if (!count) return;

    let active = 0;

    const render = () => {
      deck.forEach((item, i) => {
        item.dataset.pos = (i - active + count) % count;
        item.querySelector('.class-card')?.classList.toggle('is-active', i === active);
      });
      thumbs.forEach((thumb) => {
        const i = Number(thumb.dataset.index);
        thumb.classList.toggle('is-active', i === active);
        // La lueur dorée vient des règles .class-card.is-active (global.css) :
        // on marque donc aussi la carte à l'intérieur du bouton.
        thumb.querySelector('.class-card')?.classList.toggle('is-active', i === active);
        thumb.setAttribute('aria-selected', String(i === active));
      });
      panels.forEach((panel) => {
        panel.classList.toggle('is-active', Number(panel.dataset.voiePanel) === active);
      });
    };

    const go = (i) => {
      active = (i + count) % count;
      render();
    };

    thumbs.forEach((thumb) => thumb.addEventListener('click', () => go(Number(thumb.dataset.index))));
    root.querySelector('.voies-showcase__prev')?.addEventListener('click', () => go(active - 1));
    root.querySelector('.voies-showcase__next')?.addEventListener('click', () => go(active + 1));
    // Clic sur la pile = on passe la carte du dessus.
    deck.forEach((item) => item.addEventListener('click', () => go(active + 1)));

    render();
  });
}

initVoiesShowcase();
