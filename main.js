/* ─────────────────────────────────────────────
   ROISE UDDIN PORTFOLIO — main.js
   ───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
  });

  /* ── MOBILE MENU ── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ── ACTIVE NAV LINK ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observer.observe(s));

  /* ── REVEAL ON SCROLL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), e.target.dataset.delay || 0);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObs.observe(el));

  /* ── SKILL BARS ── */
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObs  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bar = e.target;
        const pct = bar.dataset.pct || '0';
        setTimeout(() => { bar.style.width = pct + '%'; }, 200);
        skillObs.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(b => skillObs.observe(b));

  /* ── TYPED HERO TITLE ── */
  const typed = document.querySelector('.hero-typed');
  if (typed) {
    const phrases = [
      'Cybersecurity Specialist',
      'Network Security Expert',
      'Adjunct Instructor',
      'Academic Researcher',
      'AI & ML Innovator'
    ];
    let phraseIdx = 0, charIdx = 0, deleting = false;
    function typeLoop() {
      const current = phrases[phraseIdx];
      if (!deleting) {
        typed.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(typeLoop, 2000);
          return;
        }
      } else {
        typed.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      setTimeout(typeLoop, deleting ? 60 : 90);
    }
    typeLoop();
  }

  /* ── BACK TO TOP ── */
  document.getElementById('back-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#28a745';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  /* ── STAGGER REVEAL DELAYS ── */
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const children = parent.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.dataset.delay = i * 100;
    });
  });

  /* ── COUNTER ANIMATION ── */
  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + (el.dataset.suffix || '');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + (el.dataset.suffix || '');
      }
    }, 16);
  }
  const counterEls = document.querySelectorAll('.count-up');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObs.observe(el));

});
