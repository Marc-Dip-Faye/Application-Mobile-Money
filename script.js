// ============================================
// MARC DIP FAYE PORTFOLIO INTERACTION SCRIPT
// ============================================

// Global Data Store
let projectsData = [];
let skillsData = [];
let voyagesData = [];

// Lightbox Gallery State
let currentGalleryImages = [];
let currentGalleryIndex = 0;

// ===== COLOR THEME =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');
const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)').matches;

function setTheme(isLight) {
  document.body.classList.toggle('light-theme', isLight);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? 'Activer le mode sombre' : 'Activer le mode clair');
    themeToggle.title = isLight ? 'Mode sombre' : 'Mode clair';
  }
}

setTheme(savedTheme ? savedTheme === 'light' : prefersLightTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light-theme');
    setTheme(isLight);
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  });
}

// ===== LOADER & INITIALIZATION =====
window.addEventListener('load', async () => {
  // Load Dynamic Data First
  await Promise.all([
    loadProjectsData(),
    loadSkillsData(),
    loadVoyagesData()
  ]);
  initializeTravelSlider();

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

// ===== FETCH DATA FUNCTIONS =====

// 1. Load Projects from data/projects.json
async function loadProjectsData() {
  const container = document.getElementById('projetsGrid');
  if (!container) return;

  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    projectsData = await response.json();
    renderProjects(projectsData);
  } catch (error) {
    console.warn('Could not load data/projects.json:', error);
    container.innerHTML = '<p class="data-empty">Les projets sont momentanément indisponibles.</p>';
  }
}

// Render Project Cards maintaining exact HTML structure and CSS classes
function renderProjects(projects) {
  const container = document.getElementById('projetsGrid');
  if (!container) return;

  container.innerHTML = '';

  projects.forEach((projet) => {
    const card = document.createElement('div');
    card.className = 'projet-card reveal visible';
    card.setAttribute('data-category', projet.category);
    card.setAttribute('data-id', projet.id);

    const mainImage = (projet.images && projet.images.length > 0)
      ? projet.images[0]
      : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80';

    const techChips = (projet.technologies || [])
      .map(tech => `<span>${escapeHtml(tech)}</span>`)
      .join('');

    card.innerHTML = `
      <div class="projet-image">
        <img src="${mainImage}" alt="${escapeHtml(projet.title)}">
        <div class="projet-overlay">
          <div class="projet-info">
            <span class="projet-category">${escapeHtml(projet.categoryLabel || projet.category)}</span>
            <h3 class="projet-name">${escapeHtml(projet.title)}</h3>
            <p class="projet-desc">${escapeHtml(projet.description)}</p>
            <div class="projet-tech">${techChips}</div>
          </div>
        </div>
      </div>
    `;

    // Click handler to open project multi-image gallery in Lightbox
    card.addEventListener('click', () => {
      openProjectGallery(projet);
    });

    container.appendChild(card);
  });

  // Re-observe reveal elements if needed
  if (typeof revealObserver !== 'undefined') {
    container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }
}

// 2. Load Skills from data/skills.json
async function loadSkillsData() {
  const container = document.getElementById('skillsChips');
  if (!container) return;

  try {
    const response = await fetch('data/skills.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    skillsData = await response.json();
    renderSkills(skillsData);
  } catch (error) {
    console.warn('Could not load data/skills.json:', error);
  }
}

function renderSkills(skills) {
  const container = document.getElementById('skillsChips');
  if (!container || !skills || skills.length === 0) return;

  container.innerHTML = skills.map(skill => `
    <span class="skill-chip ${skill.active ? 'active' : ''}">
      <i class="skill-icon">${skill.icon || '⚡'}</i> ${escapeHtml(skill.name)}
    </span>
  `).join('');
}

// 3. Load Voyages from data/voyages.json
async function loadVoyagesData() {
  const container = document.getElementById('voyagesSliderTrack');
  if (!container) return;

  try {
    const response = await fetch('data/voyages.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    voyagesData = await response.json();
    renderVoyages(voyagesData);
  } catch (error) {
    console.warn('Could not load data/voyages.json:', error);
    container.innerHTML = '<p class="data-empty">Les voyages sont momentanément indisponibles.</p>';
  }
}

function renderVoyages(voyages) {
  const container = document.getElementById('voyagesSliderTrack');
  if (!container) return;

  container.innerHTML = voyages.map(voyage => `
    <div class="voyage-item voyage-slide" data-type="${escapeHtml(voyage.type || 'image')}" data-video="${escapeHtml(voyage.video || '')}">
      <img src="${escapeHtml(voyage.image)}" alt="${escapeHtml(voyage.location)}" class="voyage-img">
      <div class="voyage-overlay">
        <div class="voyage-info">
          <span class="voyage-location">${escapeHtml(voyage.location)}</span>
          <h3 class="voyage-title">${escapeHtml(voyage.title)}</h3>
          <span class="voyage-date">${escapeHtml(voyage.date)}</span>
        </div>
      </div>
      ${voyage.type === 'video' ? `<div class="voyage-play"><svg width="40" height="40" viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="30" fill="var(--neon-green)" fill-opacity="0.3" stroke="var(--neon-green)" stroke-width="2"/><path d="M24 20L42 30L24 40V20Z" fill="var(--black)"/></svg></div>` : ''}
    </div>
  `).join('');
}

// ===== TYPEWRITER EFFECT =====
const textToType = "Développeur Fullstack & Designer spécialisé dans la création d'applications web et mobiles modernes.";
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

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .filter-btn, .projet-card, .voyage-item, .dock-item, .social-link, .bento-card, .skill-chip')) {
      ring.style.width = '55px';
      ring.style.height = '55px';
      ring.style.borderColor = 'var(--neon-green)';
      ring.style.boxShadow = '0 0 15px var(--neon-green-glow)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .filter-btn, .projet-card, .voyage-item, .dock-item, .social-link, .bento-card, .skill-chip')) {
      ring.style.width = '42px';
      ring.style.height = '42px';
      ring.style.borderColor = 'rgba(0, 255, 102, 0.4)';
      ring.style.boxShadow = 'none';
    }
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

// ===== INTERACTIVE TERMINAL CLI (TECH LAB) =====
const cliInput = document.getElementById('cliInput');
const cliOutput = document.getElementById('cliOutput');

if (cliInput && cliOutput) {
  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = cliInput.value.trim().toLowerCase();
      cliInput.value = '';

      // Append user command line
      appendCliLine(`<span class="cli-prompt">marc@portfolio:~$</span> ${escapeHtml(command)}`);

      // Process command
      processCliCommand(command);
    }
  });
}

function processCliCommand(cmd) {
  switch (cmd) {
    case 'help':
      appendCliLine(`Commandes disponibles:
 - <span class="neon-green">about</span> : À propos de Marc Dip FAYE
 - <span class="neon-green">skills</span> : Matrice de compétences & technologies
 - <span class="neon-green">projects</span> : Liste des projets récents
 - <span class="neon-green">workflow</span> : Étapes de développement
 - <span class="neon-green">contact</span> : Coordonnées directes
 - <span class="neon-green">matrix</span> : Activer la pluie de code
 - <span class="neon-green">clear</span> : Effacer la console`);
      break;

    case 'about':
      appendCliLine(`Marc Dip FAYE — Fullstack Developer & Creative Tech basé à Dakar.
Spécialisé en React, Next.js, Node.js, PHP & Architectures Web/Mobile performantes.`);
      break;

    case 'skills':
      if (skillsData && skillsData.length > 0) {
        const list = skillsData.map(s => `• ${s.name}`).join('<br> ');
        appendCliLine(`Stack Technique Dynamic:<br> ${list}`);
      } else {
        appendCliLine(`Stack Technique Principal:
 ⚡ Frontend: React, Next.js, Vue.js, Tailwind CSS, TypeScript
 🚀 Backend: Node.js, Express, PHP, Laravel, REST & GraphQL
 🗄️ Database: MongoDB, PostgreSQL, Firebase
 🐳 DevOps: Docker, Vercel, Git, CI/CD`);
      }
      break;

    case 'projects':
      if (projectsData && projectsData.length > 0) {
        const list = projectsData.map((p, idx) => ` ${idx + 1}. <span class="neon-green">${p.title}</span> (${p.categoryLabel || p.category}) - ${p.technologies ? p.technologies.join(', ') : ''}`).join('<br>');
        appendCliLine(`Projets phares (chargés depuis JSON):<br>${list}`);
      } else {
        appendCliLine(`Projets phares:
 1. Dashboard Analytics (React, Node.js, D3.js)
 2. Shop Premium (Next.js, Stripe, MongoDB)
 3. Task Master Pro (React Native, Firebase)
 4. Social Connect (Vue.js, GraphQL, PostgreSQL)`);
      }
      break;

    case 'workflow':
      appendCliLine(`Workflow 4 Phases:
 01. Découverte & Strategy ➔ 02. UI/UX Design Tech ➔ 03. Développement Agile ➔ 04. Déploiement CI/CD`);
      break;

    case 'contact':
      appendCliLine(`Email: marcfaye457@gmail.com | Github & Linkedin disponibles ci-dessous.`);
      break;

    case 'matrix':
      appendCliLine(`<span class="neon-green">01001101 01000001 01010010 01000011 -- SYSTEM ONLINE -- 01000110 01000001 01011001 01000101</span>`);
      break;

    case 'clear':
      cliOutput.innerHTML = '';
      return;

    case '':
      break;

    default:
      appendCliLine(`Commande non reconnue: '${escapeHtml(cmd)}'. Tapez <span class="neon-green">'help'</span>.`);
      break;
  }

  // Scroll to bottom of terminal
  cliOutput.scrollTop = cliOutput.scrollHeight;
}

function appendCliLine(htmlContent) {
  const line = document.createElement('p');
  line.className = 'cli-line';
  line.innerHTML = htmlContent;
  cliOutput.appendChild(line);
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text).replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

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

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    const cards = document.querySelectorAll('#projetsGrid .projet-card');
    cards.forEach(card => {
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

// ===== TRAVEL PHOTO SLIDER CAROUSEL =====
const sliderTrack = document.getElementById('voyagesSliderTrack');
const sliderPrevBtn = document.getElementById('sliderPrevBtn');
const sliderNextBtn = document.getElementById('sliderNextBtn');
const currentSlideNum = document.getElementById('currentSlideNum');
const totalSlidesNum = document.getElementById('totalSlidesNum');
const sliderDotsContainer = document.getElementById('sliderDots');

function initializeTravelSlider() {
  if (!sliderTrack) return;
  const slides = sliderTrack.querySelectorAll('.voyage-slide');
  let currentSlideIndex = 0;
  let isDraggingSlider = false;
  let dragStartX = 0;
  let dragDistance = 0;

  const getSlidesPerView = () => {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 968) return 2;
    return 3;
  };

  const getMaxSlideIndex = () => Math.max(0, slides.length - getSlidesPerView());

  // Render pagination dots
  function renderSliderDots() {
    if (!sliderDotsContainer) return;
    sliderDotsContainer.innerHTML = '';
    const maxIdx = getMaxSlideIndex();

    for (let i = 0; i <= maxIdx; i++) {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${i === currentSlideIndex ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      sliderDotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const maxIdx = getMaxSlideIndex();
    if (currentSlideIndex > maxIdx) currentSlideIndex = maxIdx;
    if (currentSlideIndex < 0) currentSlideIndex = 0;

    const firstSlide = slides[0];
    if (firstSlide) {
      const gap = 25; // CSS flex gap
      const slideWidth = firstSlide.getBoundingClientRect().width;
      const moveDistance = (slideWidth + gap) * currentSlideIndex;
      sliderTrack.style.transform = `translateX(-${moveDistance}px)`;
    }

    // Update numbers
    if (currentSlideNum) {
      currentSlideNum.textContent = String(currentSlideIndex + 1).padStart(2, '0');
    }
    if (totalSlidesNum) {
      totalSlidesNum.textContent = String(slides.length).padStart(2, '0');
    }

    // Update buttons
    if (sliderPrevBtn) sliderPrevBtn.disabled = currentSlideIndex === 0;
    if (sliderNextBtn) sliderNextBtn.disabled = currentSlideIndex >= getMaxSlideIndex();

    // Update dots
    if (sliderDotsContainer) {
      const dots = sliderDotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlideIndex);
      });
    }
  }

  function goToSlide(index) {
    currentSlideIndex = index;
    updateSlider();
  }

  if (sliderPrevBtn) {
    sliderPrevBtn.addEventListener('click', () => {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateSlider();
      }
    });
  }

  if (sliderNextBtn) {
    sliderNextBtn.addEventListener('click', () => {
      if (currentSlideIndex < getMaxSlideIndex()) {
        currentSlideIndex++;
        updateSlider();
      }
    });
  }

  // Touch and drag support for mobile & desktop swipe
  sliderTrack.addEventListener('touchstart', (e) => {
    isDraggingSlider = true;
    dragStartX = e.touches[0].clientX;
    dragDistance = 0;
  }, { passive: true });

  sliderTrack.addEventListener('touchmove', (e) => {
    if (!isDraggingSlider) return;
    dragDistance = e.touches[0].clientX - dragStartX;
  }, { passive: true });

  sliderTrack.addEventListener('touchend', () => {
    if (!isDraggingSlider) return;
    isDraggingSlider = false;
    if (dragDistance < -40 && currentSlideIndex < getMaxSlideIndex()) {
      currentSlideIndex++;
      updateSlider();
    } else if (dragDistance > 40 && currentSlideIndex > 0) {
      currentSlideIndex--;
      updateSlider();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    renderSliderDots();
    updateSlider();
  });

  // Initial setup
  renderSliderDots();
  updateSlider();
}

// ===== LIGHTBOX MODAL FOR VOYAGES & PROJECTS =====
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxInfo = document.getElementById('lightboxInfo');

// Open multi-image gallery for Projects
function openProjectGallery(projet) {
  if (!projet || !projet.images || projet.images.length === 0) return;

  currentGalleryImages = projet.images;
  currentGalleryIndex = 0;

  updateProjectGalleryView(projet);

  if (lightbox) lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function updateProjectGalleryView(projet) {
  const imageSrc = currentGalleryImages[currentGalleryIndex];

  lightboxImg.src = imageSrc;
  lightboxImg.classList.add('active');
  lightboxVideo.classList.remove('active');
  if (lightboxVideo.pause) lightboxVideo.pause();

  const total = currentGalleryImages.length;
  const navDisplay = total > 1 ? 'flex' : 'none';
  if (lightboxPrev) lightboxPrev.style.display = navDisplay;
  if (lightboxNext) lightboxNext.style.display = navDisplay;

  if (lightboxInfo) {
    const linkButtons = `
      <div class="lightbox-project-links">
        ${projet.demo ? `<a href="${projet.demo}" target="_blank" rel="noopener" class="lightbox-btn">Live Demo ↗</a>` : ''}
        ${projet.github ? `<a href="${projet.github}" target="_blank" rel="noopener" class="lightbox-btn secondary">GitHub Repo ↗</a>` : ''}
      </div>
    `;
    lightboxInfo.innerHTML = `
      <strong>${escapeHtml(projet.title)} (${currentGalleryIndex + 1}/${total})</strong><br>
      <span>${escapeHtml(projet.description)}</span>
      ${linkButtons}
    `;
  }
}

// Lightbox Nav Click Events
if (lightboxPrev) {
  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentGalleryImages.length > 1) {
      currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
      lightboxImg.src = currentGalleryImages[currentGalleryIndex];
      const projectTitle = lightboxInfo.querySelector('strong');
      if (projectTitle) {
        projectTitle.textContent = `${projectTitle.textContent.split('(')[0].trim()} (${currentGalleryIndex + 1}/${currentGalleryImages.length})`;
      }
    }
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentGalleryImages.length > 1) {
      currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
      lightboxImg.src = currentGalleryImages[currentGalleryIndex];
      const projectTitle = lightboxInfo.querySelector('strong');
      if (projectTitle) {
        projectTitle.textContent = `${projectTitle.textContent.split('(')[0].trim()} (${currentGalleryIndex + 1}/${currentGalleryImages.length})`;
      }
    }
  });
}

// Voyages Items Click Handler
if (sliderTrack) {
  sliderTrack.addEventListener('click', (event) => {
    const item = event.target.closest('.voyage-item');
    if (!item) return;

    currentGalleryImages = [];
    if (lightboxPrev) lightboxPrev.style.display = 'none';
    if (lightboxNext) lightboxNext.style.display = 'none';

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
      lightboxInfo.innerHTML = `<strong>${escapeHtml(location)}</strong><br>${escapeHtml(title)}`;
    }
    if (lightbox) lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

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

// ===== AI ASSISTANT CHATBOT INTERACTION =====
const aiChatToggle = document.getElementById('aiChatToggle');
const aiChatDrawer = document.getElementById('aiChatDrawer');
const aiChatClose = document.getElementById('aiChatClose');
const aiChatForm = document.getElementById('aiChatForm');
const aiChatInput = document.getElementById('aiChatInput');
const aiChatMessages = document.getElementById('aiChatMessages');
const aiTypingIndicator = document.getElementById('aiTypingIndicator');

let chatHistory = [];

function toggleAiChatDrawer() {
  if (!aiChatDrawer || !aiChatToggle) return;
  const isActive = aiChatDrawer.classList.toggle('active');
  aiChatToggle.classList.toggle('active', isActive);
  aiChatToggle.setAttribute('aria-expanded', String(isActive));
  aiChatDrawer.setAttribute('aria-hidden', String(!isActive));

  if (isActive && aiChatInput) {
    setTimeout(() => aiChatInput.focus(), 300);
  }
}

if (aiChatToggle) aiChatToggle.addEventListener('click', toggleAiChatDrawer);
if (aiChatClose) aiChatClose.addEventListener('click', toggleAiChatDrawer);

function appendChatMessage(sender, text) {
  if (!aiChatMessages) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `ai-message ${sender}`;

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // Simple markdown conversion for **bold** text and linebreaks
  let formattedText = escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  msgDiv.innerHTML = `
    <div class="ai-msg-bubble">${formattedText}</div>
    <span class="ai-msg-time">${timeStr}</span>
  `;

  aiChatMessages.appendChild(msgDiv);
  aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

  // Track conversation history
  chatHistory.push({ sender, text });
  if (chatHistory.length > 10) chatHistory.shift();
}

async function handleAiChatSubmit(e) {
  e.preventDefault();
  if (!aiChatInput) return;

  const userMsg = aiChatInput.value.trim();
  if (!userMsg) return;

  aiChatInput.value = '';
  appendChatMessage('user', userMsg);

  // Show Typing Indicator
  if (aiTypingIndicator) aiTypingIndicator.classList.add('active');
  if (aiChatMessages) aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

  try {
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMsg,
        history: chatHistory.slice(0, -1) // Exclude current prompt already appended
      })
    });

    if (aiTypingIndicator) aiTypingIndicator.classList.remove('active');

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data = await response.json();
    const botReply = data.reply || "Désolé, je n'ai pas pu traiter votre demande. N'hésitez pas à envoyer un email à marcfaye457@gmail.com !";
    appendChatMessage('bot', botReply);

  } catch (error) {
    console.warn('AI Chat API Error/Fallback:', error);
    if (aiTypingIndicator) aiTypingIndicator.classList.remove('active');

    // Smart Client-side Fallback Response
    const fallbackMsg = getLocalFallbackResponse(userMsg.toLowerCase());
    appendChatMessage('bot', fallbackMsg);
  }
}

if (aiChatForm) {
  aiChatForm.addEventListener('submit', handleAiChatSubmit);
}

function getLocalFallbackResponse(q) {
  if (q.includes('projet') || q.includes('réalisation') || q.includes('création')) {
    return "Marc a réalisé plusieurs projets majeurs :\n1. **Dashboard Analytics** (React, Node.js, D3.js)\n2. **Shop Premium** (Next.js, Stripe, MongoDB)\n3. **Task Master Pro** (React Native, Firebase)\n4. **Social Connect** (Vue.js, GraphQL, PostgreSQL).\nDécouvrez la section 'Projets' pour plus d'infos !";
  }
  if (q.includes('compétence') || q.includes('stack') || q.includes('techno') || q.includes('langage')) {
    return "Marc maîtrise les technologies Fullstack modernes : React, Next.js, Vue.js, Node.js, PHP / Laravel, TypeScript, Tailwind CSS, MongoDB, PostgreSQL, Docker et React Native.";
  }
  if (q.includes('contact') || q.includes('mail') || q.includes('joindre') || q.includes('email') || q.includes('recruter')) {
    return "Vous pouvez contacter Marc directement par email à **marcfaye457@gmail.com** ou via ses réseaux LinkedIn & GitHub. Il est disponible pour des missions freelance et CDI !";
  }
  if (q.includes('parcours') || q.includes('expérience') || q.includes('qui')) {
    return "Marc Dip FAYE est Développeur Fullstack & Creative Tech basé à Dakar, Sénégal. Ancien Développeur Web & Mobile chez Orange Digital Center (2023-2024), il travaille actuellement en Freelance.";
  }
  return "Je suis l'assistante virtuelle de Marc Dip FAYE, Développeur Fullstack. N'hésitez pas à me poser des questions sur ses projets, ses compétences ou la façon de le contacter !";
}
