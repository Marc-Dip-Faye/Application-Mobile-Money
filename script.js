// ============================================
// MARC DIP FAYE PORTFOLIO INTERACTION SCRIPT
// ============================================

// ===== LOADER & INITIALIZATION =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('done');

    // Trigger portrait reveal
    const wrapper = document.querySelector('.portrait-image-wrapper');
    if (wrapper) {
      setTimeout(() => {
        wrapper.classList.add('visible');
      }, 300);
    }

    // Start Typewriter
    setTimeout(startTypewriter, 800);

    // Generate particles
    createHeroParticles();
  }, 1200);
});

// ===== TYPEWRITER EFFECT =====
const textToType = "Développeur Fullstack & Designer spécialisé dans la création d'applications web et mobiles modernes, performantes et élégantes.";
const typewriterElement = document.getElementById('typewriter-text');
const typingSpeed = 30;
let charIndex = 0;

function startTypewriter() {
  if (!typewriterElement) return;

  if (charIndex < textToType.length) {
    typewriterElement.textContent += textToType.charAt(charIndex);
    charIndex++;
    setTimeout(startTypewriter, typingSpeed + (Math.random() * 20 - 10));
  } else {
    const cursor = document.querySelector('.typing-cursor');
    if (cursor) {
      setTimeout(() => {
        cursor.style.opacity = '0.4';
      }, 1500);
    }
  }
}

// ===== CUSTOM CURSOR (DESKTOP ONLY) =====
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

if (window.innerWidth > 768 && cursor && ring) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx - 5 + 'px';
    cursor.style.top = my - 5 + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx - 21 + 'px';
    ring.style.top = ry - 21 + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .filter-btn, .projet-card, .voyage-item, .dock-item, .social-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '55px';
      ring.style.height = '55px';
      ring.style.borderColor = 'var(--neon-green)';
      ring.style.boxShadow = '0 0 15px var(--neon-green-glow)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '42px';
      ring.style.height = '42px';
      ring.style.borderColor = 'rgba(0, 255, 102, 0.4)';
      ring.style.boxShadow = 'none';
    });
  });
}

// ===== MOBILE BURGER MENU =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
  if (!navMenu || !menuToggle || !menuOverlay) return;
  const isOpen = navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active', isOpen);
  menuOverlay.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
if (menuOverlay) menuOverlay.addEventListener('click', toggleMenu);

if (navMenu) {
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) toggleMenu();
    });
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
    toggleMenu();
  }
});

// ===== SCROLL REVEAL & SECTION TRACKING =====
const revealElements = document.querySelectorAll('.reveal');
const heroTitleLines = document.querySelectorAll('.hero-title .line');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('hero-stats')) {
        animateCounters();
      }
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));
heroTitleLines.forEach(line => line.classList.add('visible'));

// Section Tracking for Desktop Dots & Mobile Bottom Dock Tabs
const sections = document.querySelectorAll('section');
const dots = document.querySelectorAll('.dot');
const dockItems = document.querySelectorAll('.dock-item');

function updateActiveSection() {
  const scrollPos = window.scrollY + window.innerHeight * 0.35;

  sections.forEach((sec, i) => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      // Update Desktop Dots
      dots.forEach(d => d.classList.remove('active'));
      if (dots[i]) dots[i].classList.add('active');

      // Update Mobile App Dock
      dockItems.forEach(item => {
        if (item.getAttribute('data-dock') === id) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveSection);
updateActiveSection();

// Desktop dot click listeners
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    if (sections[i]) {
      sections[i].scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== PROJECT CATEGORY FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projetCards = document.querySelectorAll('.projet-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    projetCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.classList.add('hidden');
        }, 300);
      }
    });
  });
});

// ===== ANIMATED COUNTERS =====
let countersAnimated = false;
function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;

  document.querySelectorAll('.stat-number').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target') || '0');
    const duration = 1800;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, stepTime);
  });
}

// ===== LIGHTBOX MODAL FOR VOYAGES =====
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxInfo = document.getElementById('lightboxInfo');
const voyageItems = document.querySelectorAll('.voyage-item');

voyageItems.forEach(item => {
  item.addEventListener('click', () => {
    const type = item.getAttribute('data-type');
    const img = item.querySelector('.voyage-img');
    const location = item.querySelector('.voyage-location')?.textContent || '';
    const title = item.querySelector('.voyage-title')?.textContent || '';

    if (type === 'image' && img) {
      lightboxImg.src = img.src;
      lightboxImg.classList.add('active');
      lightboxVideo.classList.remove('active');
      if (lightboxVideo.pause) lightboxVideo.pause();
    } else if (type === 'video') {
      const videoSrc = item.getAttribute('data-video');
      const source = lightboxVideo.querySelector('source');
      if (source) source.src = videoSrc;
      lightboxVideo.load();
      lightboxVideo.classList.add('active');
      lightboxImg.classList.remove('active');
      lightboxVideo.play().catch(() => {});
    }

    if (lightboxInfo) {
      lightboxInfo.innerHTML = `<strong>${location}</strong><br>${title}`;
    }
    if (lightbox) lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  if (lightbox) lightbox.classList.remove('active');
  if (lightboxVideo && lightboxVideo.pause) lightboxVideo.pause();
  document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== HERO PARTICLES GENERATOR =====
function createHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    container.appendChild(particle);
  }
}

// ===== MAGNETIC CONTACT BUTTON & COPY TO CLIPBOARD =====
const magneticBtn = document.getElementById('magneticBtn');

if (magneticBtn) {
  magneticBtn.addEventListener('click', (e) => {
    const email = magneticBtn.getAttribute('data-email');
    if (email) {
      navigator.clipboard.writeText(email).then(() => {
        magneticBtn.classList.add('copied');
        setTimeout(() => {
          magneticBtn.classList.remove('copied');
        }, 3000);
      }).catch(() => {});
    }
  });

  if (window.innerWidth > 768) {
    magneticBtn.addEventListener('mousemove', (e) => {
      const rect = magneticBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      magneticBtn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    magneticBtn.addEventListener('mouseleave', () => {
      magneticBtn.style.transform = 'translate(0, 0)';
    });
  }
}
