// Custom cursor
if ('ontouchstart' in window) {
  document.body.style.cursor = 'none';
  document.getElementById('cursor').style.display = 'none';
  document.getElementById('cursorRing').style.display = 'none';
}

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    ring.style.width = '56px';
    ring.style.height = '56px';
    ring.style.borderColor = 'rgba(0,255,157,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(0,255,157,0.4)';
  });
});

// Scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Mobile tap effect
let activeDot = null;
let activeRing = null;

document.addEventListener('touchstart', e => {
  const touch = e.touches[0];

  activeDot = document.createElement('div');
  activeRing = document.createElement('div');

  activeDot.style.cssText = `
    width: 12px; height: 12px;
    background: var(--accent);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    left: ${touch.clientX}px;
    top: ${touch.clientY}px;
    transform: translate(-50%, -50%);
    transition: opacity 0.4s ease;
  `;

  activeRing.style.cssText = `
    width: 36px; height: 36px;
    border: 1px solid rgba(0,255,157,0.4);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    left: ${touch.clientX}px;
    top: ${touch.clientY}px;
    transform: translate(-50%, -50%);
    transition: opacity 0.4s ease;
  `;

  document.body.appendChild(activeDot);
  document.body.appendChild(activeRing);
});

document.addEventListener('touchmove', e => {
  const touch = e.touches[0];
  if (activeDot) {
    activeDot.style.left = touch.clientX + 'px';
    activeDot.style.top = touch.clientY + 'px';
  }
  if (activeRing) {
    activeRing.style.left = touch.clientX + 'px';
    activeRing.style.top = touch.clientY + 'px';
  }
});

document.addEventListener('touchend', () => {
  if (activeDot) {
    activeDot.style.opacity = '0';
    activeRing.style.opacity = '0';
    setTimeout(() => {
      activeDot?.remove();
      activeRing?.remove();
      activeDot = null;
      activeRing = null;
    }, 500);
  }
});