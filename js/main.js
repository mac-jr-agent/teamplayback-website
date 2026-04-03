/* =========================================================
   TEAM PLAYBACK — Main JavaScript
   Interactions, scroll behavior, frames strip
   ========================================================= */

(function () {
  'use strict';

  // -------------------------------------------------------
  // Scroll Reveal — IntersectionObserver
  // -------------------------------------------------------
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // -------------------------------------------------------
  // Frames Strip — Duplicate for infinite scroll
  // -------------------------------------------------------
  function initFramesStrip() {
    const track = document.querySelector('.frames-track');
    if (!track) return;

    // Only clone images for infinite scroll on desktop
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) {
      const images = track.querySelectorAll('img');
      images.forEach((img) => {
        const clone = img.cloneNode(true);
        track.appendChild(clone);
      });
    }
  }

  // -------------------------------------------------------
  // Smooth Header Background on Scroll
  // -------------------------------------------------------
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollY = 0;
    let ticking = false;

    function onScroll() {
      lastScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(() => {
          if (lastScrollY > 50) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
          } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.92)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // -------------------------------------------------------
  // Active Nav Link
  // -------------------------------------------------------
  function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.header-nav a');
    
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // -------------------------------------------------------
  // Project Tile Hover — touch support
  // -------------------------------------------------------
  function initTileTouch() {
    const tiles = document.querySelectorAll('.project-tile');
    tiles.forEach((tile) => {
      tile.addEventListener('touchstart', function () {
        tiles.forEach((t) => t.classList.remove('touch-hover'));
        this.classList.add('touch-hover');
      }, { passive: true });
    });
  }

  // -------------------------------------------------------
  // Initialize
  // -------------------------------------------------------
  function init() {
    initScrollReveal();
    initFramesStrip();
    initHeaderScroll();
    initActiveNav();
    initTileTouch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
