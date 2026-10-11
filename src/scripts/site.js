import { renderIconSvg } from './icons.js';

export function initSiteInteractions() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  let menuOpen = false;

  function updateMenuIcon(open) {
    if (menuIcon) {
      menuIcon.innerHTML = renderIconSvg(open ? 'x' : 'menu', { width: 20, height: 20, class: 'text-white' });
    }
  }

  function setMenu(open) {
    menuOpen = open;
    if (mobileMenu) mobileMenu.inert = !open;
    mobileMenu?.classList.toggle('open', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    menuToggle?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    updateMenuIcon(open);
  }

  menuToggle?.addEventListener('click', () => {
    setMenu(!menuOpen);
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (event) => {
      setMenu(false);
      if (event.detail === 0) menuToggle?.focus();
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('active'), index * 60);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number.parseInt(element.dataset.count, 10);
      const start = performance.now();
      const update = (time) => {
        const progress = Math.min((time - start) / 2000, 1);
        const value = Math.floor((1 - Math.pow(1 - progress, 3)) * target);
        element.textContent = value.toLocaleString('es-CL');
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      countObserver.unobserve(element);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach((element) => countObserver.observe(element));

  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach((item) => item.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(`tab-${button.dataset.tab}`)?.classList.add('active');
    });
  });

  document.querySelector('#faq .reveal')?.addEventListener('click', (event) => {
    const item = event.target.closest('.faq-item');
    if (!item) return;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((faqItem) => faqItem.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    link.addEventListener('click', (event) => {
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
