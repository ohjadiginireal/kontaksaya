/* ═══════════════════════════════════════
   OH JADI GINI — script.js
═══════════════════════════════════════ */

/* ── Starfield Particles ── */
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 5500);
    for (let i = 0; i < count; i++) {
      stars.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        r:  Math.random() * 0.9 + 0.1,
        a:  Math.random(),
        da: 0.003 + Math.random() * 0.007,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.a += s.da;
      if (s.a > 1 || s.a < 0) s.da *= -1;
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.a * 0.65})`;
      ctx.fill();
    }
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', resize);
  resize();
  drawStars();
})();


/* ── Ripple on link click ── */
function ripple(e) {
  const el   = e.currentTarget;
  const span = document.createElement('span');
  span.classList.add('rpl');
  const rect = el.getBoundingClientRect();
  span.style.left = (e.clientX - rect.left  - 50) + 'px';
  span.style.top  = (e.clientY - rect.top   - 50) + 'px';
  el.appendChild(span);
  setTimeout(() => span.remove(), 680);
}