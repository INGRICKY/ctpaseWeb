const slides = [
  { image: 'photo-1523240795612-9a054b0db644', alt: 'Étudiants réunis autour d’une table de travail', category: '01 / L’APPRENTISSAGE', title: 'De l’ambition<br>à l’action.' },
  { image: 'photo-1434030216411-0b793f4b4173', alt: 'Prise de notes pendant une séance de travail', category: '02 / LA PRATIQUE', title: 'Apprendre.<br>Et aller plus loin.' },
  { image: 'photo-1521737711867-e3b97375f902', alt: 'Groupe collaborant dans un espace de travail', category: '03 / LE PARCOURS', title: 'Ensemble, ouvrons<br>de nouveaux horizons.' }
];
let current = 0;
let timer;
let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const dots = [...document.querySelectorAll('.dot')];
const pauseButton = document.querySelector('#pause-slide');
function showSlide(index) {
  current = (index + slides.length) % slides.length;
  const slide = slides[current];
  const image = document.querySelector('#hero-image');
  image.src = `https://images.unsplash.com/${slide.image}?auto=format&fit=crop&w=1300&q=85`;
  image.alt = slide.alt;
  document.querySelector('#slide-category').textContent = slide.category;
  document.querySelector('#slide-title').innerHTML = slide.title;
  dots.forEach((dot, i) => { dot.classList.toggle('active', i === current); dot.setAttribute('aria-pressed', String(i === current)); });
}
function schedule() { clearInterval(timer); if (!paused && !document.hidden) timer = setInterval(() => showSlide(current + 1), 5000); }
function navigate(index) { showSlide(index); schedule(); }
document.querySelector('#prev-slide').addEventListener('click', () => navigate(current - 1));
document.querySelector('#next-slide').addEventListener('click', () => navigate(current + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => navigate(i)));
function updatePause() { pauseButton.textContent = paused ? '▶' : 'Ⅱ'; pauseButton.setAttribute('aria-label', paused ? 'Reprendre le carrousel' : 'Mettre le carrousel en pause'); schedule(); }
pauseButton.addEventListener('click', () => { paused = !paused; updatePause(); });
document.addEventListener('visibilitychange', schedule);
document.querySelector('.hero').addEventListener('keydown', event => { if (event.key === 'ArrowLeft') navigate(current - 1); if (event.key === 'ArrowRight') navigate(current + 1); });
document.querySelector('.hero').addEventListener('focusin', event => {
  if (event.target.matches(':focus-visible')) { paused = true; updatePause(); }
});
updatePause();
const menu = document.querySelector('#navigation');
const menuToggle = document.querySelector('.menu-toggle');
function closeMenu() { menu.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Ouvrir le menu'); }
menuToggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu'); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); menuToggle.focus(); } });
document.querySelector('#year').textContent = new Date().getFullYear();
