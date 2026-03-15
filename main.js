/* ============================================================
   NAV — scroll state + mobile toggle
   ============================================================ */
const navbar    = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ============================================================
   FADE-UP ON SCROLL
   ============================================================ */
const fadeTargets = [
  '.section-header',
  '.video-card',
  '.photo-item',
  '.service-card',
  '.about-text > *',
  '.about-photo-wrap',
  '.contact-inner > *',
];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = Array.from(entry.target.parentElement.children);
        const index    = siblings.indexOf(entry.target);
        const delay    = index * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(fadeTargets.join(',')).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

/* ============================================================
   CONTACT FORM — basic feedback
   ============================================================ */
const form = document.querySelector('.contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  const name = form.querySelector('#name').value.trim();

  if (!name) {
    shakeField(form.querySelector('#name'));
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled    = true;
  btn.style.opacity = '0.6';

  // Simulate async send — replace with your actual fetch/endpoint
  setTimeout(() => {
    btn.textContent      = 'Message Sent ✓';
    btn.style.borderColor = '#6dbf8a';
    btn.style.color       = '#6dbf8a';
    btn.style.opacity     = '1';
    form.reset();

    setTimeout(() => {
      btn.textContent      = 'Send Message';
      btn.style.borderColor = '';
      btn.style.color       = '';
      btn.disabled          = false;
    }, 4000);
  }, 1200);
});

function shakeField(input) {
  input.style.borderColor = '#c8634a';
  input.style.animation   = 'shake 0.4s ease';
  input.addEventListener('animationend', () => {
    input.style.animation = '';
  }, { once: true });
}

// Inject shake keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    60%       { transform: translateX(6px); }
    80%       { transform: translateX(-3px); }
  }
`;
document.head.appendChild(style);

/* ============================================================
   ACTIVE NAV LINK — highlight on scroll
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--white)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
