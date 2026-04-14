const stage = document.getElementById('heartStage');
const phrase = 'TE AMOOO ANGELES';
const count = 170;
const points = [];
const texts = [];

function heartPoint(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);

  return { x, y: -y };
}

for (let i = 0; i < count; i++) {
  const span = document.createElement('span');
  span.className = 'heart-text';
  span.textContent = phrase;
  stage.appendChild(span);
  texts.push(span);

  const t = (Math.PI * 2 * i) / count;
  points.push({
    t,
    depth: 0.65 + Math.random() * 0.7,
    offset: Math.random() * Math.PI * 2,
    drift: (Math.random() - 0.5) * 8,
    scale: 0.82 + Math.random() * 0.38,
  });
}

function animateHeart(time) {
  const slow = time * 0.00028;
  const wobble = Math.sin(time * 0.0012) * 0.035;
  const size = stage.clientWidth * 0.0185;

  texts.forEach((span, i) => {
    const p = points[i];
    const base = heartPoint(p.t + slow * 0.55 + p.offset * 0.015);

    const rotate = slow + wobble;
    const rx = base.x * Math.cos(rotate) - base.y * Math.sin(rotate);
    const ry = base.x * Math.sin(rotate) + base.y * Math.cos(rotate);

    const pulse = 1 + Math.sin(time * 0.0017 + p.offset) * 0.06;
    const x = rx * size * pulse;
    const y = ry * size * pulse + Math.sin(time * 0.001 + p.offset) * p.drift;
    const scale = p.scale * (0.92 + Math.sin(time * 0.0013 + p.offset) * 0.08);
    const opacity = 0.62 + Math.sin(time * 0.0019 + p.offset) * 0.26;

    span.style.transform =` translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
    span.style.opacity = opacity.toFixed(3);
  });

  requestAnimationFrame(animateHeart);
}

requestAnimationFrame(animateHeart);

window.addEventListener('resize', () => requestAnimationFrame(animateHeart));