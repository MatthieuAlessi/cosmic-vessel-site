// Champ d'étoiles animé des <GalaxyCanvas /> — UNE seule boucle rAF pour toutes
// les instances (avant : chaque canvas relançait sa propre boucle via `define:vars`/
// `is:inline`). Chaque instance ne dessine que si elle est visible (IntersectionObserver) —
// sinon les canvas hors champ, sur une page de ~12 800px, dessinaient dans le vide en permanence.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = window.matchMedia('(max-width: 767px)').matches;

const instances = [];
let rafId = null;

// Tout ce qui est constant est pré-calculé à la création — zéro calcul répété en hot loop
function makeStar(W, H) {
  const z = 0.05 + Math.random() * 0.95;
  const r = (180 + z * 75) | 0;
  const b = (210 + z * 45) | 0;
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    phase: Math.random() * Math.PI * 2,
    color: `rgb(${r},205,${b})`,
    baseAlpha: 0.12 + z * 0.85,
    size: 0.3 + z * 0.9,
    drift: 0.04 * z,
    phaseSpeed: 0.008 + z * 0.005,
  };
}

function resize(inst) {
  const { wrapper, canvas, fixed } = inst;
  inst.W = canvas.width = fixed ? window.innerWidth : wrapper.offsetWidth;
  inst.H = canvas.height = fixed ? window.innerHeight : wrapper.offsetHeight;
}

function seed(inst) {
  resize(inst);
  inst.stars = Array.from({ length: inst.count }, () => makeStar(inst.W, inst.H));
}

/* ── étoiles filantes ── */
function spawnShooting(inst) {
  if (inst.shootings.length >= 2) return;
  inst.shootings.push({
    x: Math.random() * inst.W * 0.6,
    y: Math.random() * inst.H * 0.5,
    vx: 4 + Math.random() * 4,
    vy: 2 + Math.random() * 2.5,
    life: 1,
  });
}

function scheduleShooting(inst) {
  // Hors écran on ne fait naître personne : la file se remplirait pour rien.
  if (inst.visible) spawnShooting(inst);
  setTimeout(() => scheduleShooting(inst), 3000 + Math.random() * 5000);
}

/* ── rendu d'une instance ── */
function drawInstance(inst) {
  const { ctx, W, H } = inst;
  ctx.clearRect(0, 0, W, H);

  // Stars : globalAlpha évite toute création de string rgba
  for (const s of inst.stars) {
    s.phase += s.phaseSpeed;
    s.x += s.drift;
    if (s.x > W) {
      s.x = 0;
      s.y = Math.random() * H;
    }

    ctx.globalAlpha = s.baseAlpha * (0.4 + 0.6 * Math.sin(s.phase));
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Étoiles filantes
  ctx.globalAlpha = 1;
  for (let i = inst.shootings.length - 1; i >= 0; i--) {
    const sh = inst.shootings[i];
    sh.x += sh.vx;
    sh.y += sh.vy;
    sh.life -= 0.022;

    if (sh.life <= 0 || sh.x > W || sh.y > H) {
      inst.shootings.splice(i, 1);
      continue;
    }

    const tx = sh.x - sh.vx * 16;
    const ty = sh.y - sh.vy * 16;
    const g = ctx.createLinearGradient(tx, ty, sh.x, sh.y);
    g.addColorStop(0, 'rgba(255,240,200,0)');
    g.addColorStop(1, `rgba(255,240,200,${(sh.life * 0.9).toFixed(2)})`);
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(sh.x, sh.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(sh.x, sh.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,220,${sh.life.toFixed(2)})`;
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

/* ── boucle unique ── */
function frame() {
  rafId = requestAnimationFrame(frame);
  for (const inst of instances) {
    if (inst.visible) drawInstance(inst);
  }
}

function sync() {
  const awake = !document.hidden && instances.some((i) => i.visible);
  if (awake && rafId === null) rafId = requestAnimationFrame(frame);
  else if (!awake && rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

/* ── mise en place ── */
const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const inst = instances.find((i) => i.wrapper === entry.target);
      if (!inst) continue;
      inst.visible = entry.isIntersecting;
      // En reduced-motion on peint une frame fixe à l'apparition, sans boucle.
      if (reduced && inst.visible) drawInstance(inst);
    }
    if (!reduced) sync();
  },
  // Marge généreuse : le canvas est déjà en train de tourner quand il arrive.
  { rootMargin: '200px' },
);

document.querySelectorAll('[data-galaxy]').forEach((wrapper) => {
  const canvas = wrapper.querySelector('canvas');
  if (!canvas) return;

  const declared = Number(wrapper.dataset.galaxyCount) || 90;
  const inst = {
    wrapper,
    canvas,
    ctx: canvas.getContext('2d'),
    fixed: wrapper.dataset.galaxyFixed === 'true',
    // Moitié moins d'étoiles sur petit écran : c'est là que le coût par frame
    // fait le plus mal, et la densité y est de toute façon peu lisible.
    count: small ? Math.round(declared * 0.5) : declared,
    stars: [],
    shootings: [],
    visible: false,
    W: 0,
    H: 0,
  };

  seed(inst);
  instances.push(inst);

  new ResizeObserver(() => {
    resize(inst);
    if (reduced && inst.visible) drawInstance(inst);
  }).observe(wrapper);

  io.observe(wrapper);
  if (!reduced) scheduleShooting(inst);
});

if (!reduced) document.addEventListener('visibilitychange', sync);
