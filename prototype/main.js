const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// figures out which page we're on and highlights that nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href').split('#')[0];
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

const exhibits = [
  { label: "THE ORIGIN:",      sub: "Punch Cards and Magnetic Drums",  href: "exhibit-origin.html" },
  { label: "THE DISK:",        sub: "Magnetic Storage and HDDs",        href: "exhibit-disk.html" },
  { label: "THE OPTICAL AGE:", sub: "CDs, DVDs, and Their Limits",      href: "exhibit-optical.html" },
  { label: "THE FLASH:",       sub: "SSDs, NAND, and NVMe",             href: "exhibit-flash.html" },
  { label: "THE HORIZON:",     sub: "Cloud, DNA, and Emerging Storage", href: "exhibit-horizon.html" },
];

document.querySelectorAll('.carousel-item').forEach(item => {
  item.addEventListener('click', () => {
    // clear whatever was active before
    document.querySelectorAll('.carousel-item').forEach(i => {
      i.classList.remove('active');
      const old = i.querySelector('.carousel-label');
      const oldBtn = i.querySelector('.btn-select');
      if (old) old.remove();
      if (oldBtn) oldBtn.remove();
    });

    item.classList.add('active');

    const idx  = parseInt(item.dataset.index, 10);
    const info = exhibits[idx];
    if (!info) return;

    const btn = document.createElement('a');
    btn.href        = info.href;
    btn.className   = 'btn btn-select';
    btn.textContent = 'Select';

    const label = document.createElement('div');
    label.className = 'carousel-label';
    label.innerHTML = `${info.label}<small>${info.sub}</small>`;

    item.appendChild(btn);
    item.appendChild(label);
  });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
