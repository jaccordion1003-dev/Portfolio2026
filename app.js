const images = Array.from({ length: 55 }, (_, index) => {
  const number = index + 1;
  return {
    src: `assets/images/${String(number).padStart(2, '0')}.jpg`,
    original: `${number}.jpg`
  };
});

const gallery = document.querySelector('#gallery');
const count = document.querySelector('#gallery-count');
if (gallery) {
  count.textContent = `${String(images.length).padStart(2, '0')} images`;
  const fragment = document.createDocumentFragment();

  images.forEach((image, index) => {
    const item = document.createElement('a');
    item.className = index === 12 ? 'project-tile project-tile--wide' : 'project-tile';
    item.href = image.url || image.src;
    if (image.url) {
      item.target = '_blank';
      item.rel = 'noreferrer';
    } else {
      item.target = '_blank';
      item.rel = 'noreferrer';
    }
    item.setAttribute('aria-label', `Open portfolio image ${index + 1}: ${image.original}`);

    const visual = document.createElement('img');
    visual.src = image.src;
    visual.alt = `Portfolio image ${index + 1}`;
    visual.loading = index < 8 ? 'eager' : 'lazy';
    visual.decoding = 'async';

    const meta = document.createElement('span');
    meta.className = 'tile-meta';
    const label = document.createElement('span');
    label.textContent = `STORYBOARD / ${String(index + 1).padStart(2, '0')}`;
    const open = document.createElement('span');
    open.className = 'tile-link';
    open.textContent = '↗';
    meta.append(label, open);
    item.append(visual, meta);
    fragment.append(item);
  });

  gallery.append(fragment);
}
