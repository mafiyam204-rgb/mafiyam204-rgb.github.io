'use strict';

/**
 * MAK4U Technologies
 * Corporate website interactions.
 */

const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

/**
 * Closes the mobile navigation and restores accessibility state.
 */
function closeNavigation() {
  if (!navLinks || !menuButton) return;

  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}

/**
 * Toggle mobile navigation.
 */
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');

    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation' : 'Open navigation',
    );
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
  });

  /**
   * Allow keyboard users to close navigation with Escape.
   */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      closeNavigation();
      menuButton.focus();
    }
  });
}

/**
 * Keep copyright year current automatically.
 */
const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

/**
 * Reveal animations.
 *
 * Users who prefer reduced motion receive the final visible state
 * immediately rather than animated transitions.
 */
const revealElements = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => {
    element.classList.add('visible');
  });
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -24px 0px',
    },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}
