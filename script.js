
document.addEventListener('DOMContentLoaded', () => {

  // ───────────── NAVBAR SCROLL EFFECT ─────────────
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Scrolled class
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  // ───────────── MOBILE MENU ─────────────
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });


  // ───────────── DARK / LIGHT THEME TOGGLE ─────────────
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document.getElementById('theme-icon').innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  }


  // ───────────── SCROLL REVEAL ANIMATIONS ─────────────
  const animateEls = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling elements
        const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animateEls.forEach(el => observer.observe(el));


  // ───────────── HERO STAT COUNTER ─────────────
  const counters = document.querySelectorAll('.hero-stat-number');
  let counted = false;

  function startCounters() {
    if (counted) return;
    counted = true;
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = current;
      }, 40);
    });
  }

  const heroSection = document.getElementById('hero');
  const heroObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) startCounters();
  }, { threshold: 0.5 });
  heroObserver.observe(heroSection);


  // ───────────── SMOOTH PARALLAX ON HERO ─────────────
  const heroOrb1 = document.querySelector('.hero-orb-1');
  const heroOrb2 = document.querySelector('.hero-orb-2');
  const heroBgGrid = document.querySelector('.hero-bg-grid');

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    if (heroOrb1) heroOrb1.style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
    if (heroOrb2) heroOrb2.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
    if (heroBgGrid) heroBgGrid.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }, { passive: true });


  // ───────────── CONTACT FORM ─────────────
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('send-message-btn');
    const originalText = btn.innerHTML;

    // Loading state
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending...`;
    btn.disabled = true;
    btn.style.opacity = '0.8';

    // Simulate async send
    setTimeout(() => {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!`;

      contactForm.reset();

      // Show toast
      showToast('✉️ Your message has been sent! I\'ll get back to you soon.');

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.opacity = '';
      }, 3000);
    }, 1500);
  });


  // ───────────── TOAST NOTIFICATION ─────────────
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }


  // ───────────── SCROLL INDICATOR HIDE ─────────────
  const scrollIndicator = document.getElementById('scroll-indicator');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      scrollIndicator.style.opacity = '0';
    } else {
      scrollIndicator.style.opacity = '1';
    }
  }, { passive: true });


  // ───────────── SPIN ANIMATION FOR LOADING ─────────────
  const style = document.createElement('style');
  style.textContent = `
    .spin-icon {
      animation: spinRing 0.8s linear infinite;
    }
    @keyframes spinRing {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);


  // ───────────── SKILL CARD TILT EFFECT ─────────────
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease';
    });
  });


  // ───────────── PORTFOLIO CARD HOVER GLOW ─────────────
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  portfolioCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

});
