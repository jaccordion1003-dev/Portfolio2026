(() => {
  const screen = document.querySelector('.hero-screen');
  const slide = document.querySelector('.hero-slide');
  const image = document.querySelector('.hero-slide-image');
  if (!screen || !slide || !image) return;

  const sources = [
    'assets/hero/green-micrograph.webp',
    'assets/hero/pastel-abstract.webp',
    'assets/hero/clear-sculpture.webp',
    'assets/hero/blue-editorial.webp',
    'assets/hero/why-question.webp',
    'assets/hero/arctic-seas.jpg',
    'assets/hero/blue-mountain-sketch.png',
    'assets/hero/orange-profile.png',
    'assets/hero/concept-map.png',
  ];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  for (let i = sources.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [sources[i], sources[j]] = [sources[j], sources[i]];
  }

  sources.slice(1).forEach((src) => {
    const preload = new Image();
    preload.src = src;
  });

  const followEase = 0.095;
  let imageIndex = 1;
  image.src = sources[0];
  const bounds = screen.getBoundingClientRect();
  let x = bounds.width / 2;
  let y = bounds.height / 2;
  let targetX = x;
  let targetY = y;

  slide.style.left = '0';
  slide.style.top = '0';

  function keepInFrame(value, size, limit) {
    return Math.max(size / 2, Math.min(limit - size / 2, value));
  }

  function pointerMove(event) {
    const rect = screen.getBoundingClientRect();
    targetX = keepInFrame(event.clientX - rect.left, slide.offsetWidth, rect.width);
    targetY = keepInFrame(event.clientY - rect.top, slide.offsetHeight, rect.height);
  }

  function resize() {
    const rect = screen.getBoundingClientRect();
    targetX = keepInFrame(targetX, slide.offsetWidth, rect.width);
    targetY = keepInFrame(targetY, slide.offsetHeight, rect.height);
  }

  function changeImage() {
    image.src = sources[imageIndex];
    imageIndex = (imageIndex + 1) % sources.length;
  }

  function frame() {
    x += (targetX - x) * followEase;
    y += (targetY - y) * followEase;
    slide.style.transform = `translate3d(${x - slide.offsetWidth / 2}px, ${y - slide.offsetHeight / 2}px, 0)`;
    requestAnimationFrame(frame);
  }

  window.addEventListener('pointermove', pointerMove, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  window.setInterval(changeImage, 140);
  requestAnimationFrame(frame);
})();
