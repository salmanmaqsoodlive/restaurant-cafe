/* ============================
   THE GOLDEN BREW — script.js
   ============================ */

(function () {
  'use strict';

  /* ── Navbar ────────────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── Scroll fade-in ────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.fade-up'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 120);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  /* ── Menu Tabs ─────────────────────────────────── */
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const menuPanels = document.querySelectorAll('.menu-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      menuPanels.forEach(p => {
        p.classList.remove('active');
        p.style.opacity = '0';
      });

      btn.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) {
        panel.classList.add('active');
        requestAnimationFrame(() => {
          panel.style.transition = 'opacity .4s ease';
          panel.style.opacity = '1';
        });

        // Re-trigger fade animations inside panel
        panel.querySelectorAll('.fade-up').forEach((el, i) => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), i * 100 + 50);
        });
      }
    });
  });

  // Init first panel opacity
  const firstPanel = document.querySelector('.menu-content.active');
  if (firstPanel) firstPanel.style.opacity = '1';

  /* ── Smooth scrolling ──────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ── Reservation form ──────────────────────────── */
  const resForm = document.getElementById('reservationForm');
  if (resForm) {
    resForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = resForm.querySelector('button[type="submit"]');
      btn.textContent = 'Processing…';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Reservation Confirmed! See You Soon.';
        btn.style.background = '#22C55E';
        resForm.reset();

        setTimeout(() => {
          btn.textContent = 'Confirm Reservation';
          btn.style.background = '';
          btn.disabled = false;
        }, 5000);
      }, 1500);
    });
  }

  /* ── Image hover zoom for gallery ─────────────── */
  document.querySelectorAll('.g-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const img = item.querySelector('img');
      if (img) img.style.transform = 'scale(1.08)';
    });
    item.addEventListener('mouseleave', () => {
      const img = item.querySelector('img');
      if (img) img.style.transform = '';
    });
  });

  /* ── Hero parallax ─────────────────────────────── */
  const heroOverlay = document.querySelector('.hero-overlay');
  window.addEventListener('scroll', () => {
    if (heroOverlay && window.scrollY < window.innerHeight) {
      heroOverlay.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    }
  });

  /* ── Menu item hover with smooth image zoom ─── */
  document.querySelectorAll('.menu-item').forEach(item => {
    const img = item.querySelector('img');
    item.addEventListener('mouseenter', () => { if (img) img.style.transform = 'scale(1.07)'; });
    item.addEventListener('mouseleave', () => { if (img) img.style.transform = ''; });
  });

  /* ── Logo scroll top ────────────────────────────── */
  document.querySelector('.logo')?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
