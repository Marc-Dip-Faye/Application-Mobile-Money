// ============================================
// MARC DIP FAYE PORTFOLIO INTERACTION SCRIPT
// ============================================

// Global Data Store
let projectsData = [];
let drawerProjects = [];
let skillsData = [];
let voyagesData = [];

// Lightbox Gallery State
let currentGalleryImages = [];
let currentGalleryIndex = 0;

// ===== COLOR THEME =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');

function setTheme(isLight) {
  document.body.classList.toggle('light-theme', isLight);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? 'Activer le mode sombre' : 'Activer le mode clair');
    themeToggle.title = isLight ? 'Mode sombre' : 'Mode clair';
  }
}

setTheme(savedTheme ? savedTheme === 'light' : true);

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
    renderProjectsDrawer(projectsData);
  } catch (error) {
    console.warn('Could not load data/projects.json:', error);
    container.innerHTML = '<p class="data-empty">Les projets sont momentanément indisponibles.</p>';
  }
}

function renderProjectsDrawer(projects) {
  const list = document.getElementById('projectsDrawerList');
  const count = document.getElementById('allProjectsCount');
  const meta = document.getElementById('projectsDrawerMeta');
  if (!list) return;

  drawerProjects = projects;
  const query = (document.getElementById('projectsSearchInput')?.value || '').trim().toLowerCase();
  const matchingProjects = projects.filter(projet => {
    const searchableText = [
      projet.title,
      projet.category,
      projet.categoryLabel,
      projet.description,
      ...(projet.technologies || [])
    ].join(' ').toLowerCase();
    return searchableText.includes(query);
  });

  const total = projects.length.toString().padStart(2, '0');
  if (count) count.textContent = total;
  if (meta) meta.textContent = query
    ? `${matchingProjects.length} résultat${matchingProjects.length > 1 ? 's' : ''} / ${projects.length}`
    : `${projects.length} projet${projects.length > 1 ? 's' : ''}`;

  list.innerHTML = matchingProjects.length ? matchingProjects.map((projet) => {
    const image = projet.images && projet.images.length > 0
      ? projet.images[0]
      : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80';
    const technologies = (projet.technologies || []).slice(0, 3)
      .map(tech => `<span>${escapeHtml(tech)}</span>`).join('');

    return `
      <button class="drawer-project" type="button" data-project-id="${projet.id}">
        <span class="drawer-project-number">${String(projects.indexOf(projet) + 1).padStart(2, '0')}</span>
        <span class="drawer-project-image"><img src="${image}" alt=""></span>
        <span class="drawer-project-info">
          <span class="drawer-project-category">${escapeHtml(projet.categoryLabel || projet.category)}</span>
          <strong>${escapeHtml(projet.title)}</strong>
          <span class="drawer-project-tech">${technologies}</span>
        </span>
        <span class="drawer-project-arrow" aria-hidden="true">↗</span>
      </button>`;
  }).join('') : '<p class="projects-search-empty">Aucun projet ne correspond à votre recherche.</p>';

  list.querySelectorAll('.drawer-project').forEach(item => {
    item.addEventListener('click', () => {
      const project = projects.find(projet => String(projet.id) === item.dataset.projectId);
      if (project) openProjectGallery(project);
    });
  });
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

  // Duplicate the sequence so the automatic loop can restart invisibly.
  [...container.children].forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('carousel-clone');
    clone.addEventListener('click', () => {
      const project = projects.find(projet => String(projet.id) === clone.dataset.id);
      if (project) openProjectGallery(project);
    });
    container.appendChild(clone);
  });

  // Re-observe reveal elements if needed
  if (typeof revealObserver !== 'undefined') {
    container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }
  updateProjectsSlider();
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
    if (e.target.closest('a, button, .projet-card, .voyage-item, .dock-item, .social-link, .bento-card, .skill-chip')) {
      ring.style.width = '55px';
      ring.style.height = '55px';
      ring.style.borderColor = 'var(--neon-green)';
      ring.style.boxShadow = '0 0 15px var(--neon-green-glow)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .projet-card, .voyage-item, .dock-item, .social-link, .bento-card, .skill-chip')) {
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
 - <span class="neon-green">parcours</span> / <span class="neon-green">cv</span> : Afficher le CV interactif complet
 - <span class="neon-green">metrics</span> : Inspecter l'audit & raisons du score 100%
 - <span class="neon-green">skills</span> : Matrice de compétences & technologies
 - <span class="neon-green">projects</span> : Liste des projets récents
 - <span class="neon-green">workflow</span> : Étapes de développement
 - <span class="neon-green">contact</span> : Coordonnées directes
 - <span class="neon-green">matrix</span> : Activer la pluie de code
 - <span class="neon-green">clear</span> : Effacer la console`);
      break;

    case 'metrics':
    case 'performance':
      setMetricsModal(true);
      appendCliLine(`<span class="neon-green">⚡ Ouverture de l'audit de performance & Lighthouse 100/100...</span>`);
      break;

    case 'parcours':
    case 'cv':
    case 'experience':
      setParcoursModal(true);
      appendCliLine(`<span class="neon-green">💼 Ouverture du CV & Parcours interactif de Marc Dip FAYE...</span>`);
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
const projectsGrid = document.getElementById('projetsGrid');
const projectsSliderProgress = document.getElementById('projectsSliderProgress');
let projectsAutoplayFrame;
let projectsAutoplayRunning = false;
let projectsLastFrameTime = 0;

function updateProjectsSlider() {
  if (!projectsGrid) return;
  const hasOverflow = projectsGrid.scrollWidth > projectsGrid.clientWidth + 2;
  const progress = hasOverflow ? Math.min(100, (projectsGrid.clientWidth / projectsGrid.scrollWidth) * 100) : 100;
  if (projectsSliderProgress) projectsSliderProgress.style.width = `${progress}%`;
}

function getProjectsLoopWidth() {
  const firstClone = projectsGrid?.querySelector('.carousel-clone:not(.hidden)');
  if (!projectsGrid || !firstClone) return 0;
  const gridRect = projectsGrid.getBoundingClientRect();
  return firstClone.getBoundingClientRect().left - gridRect.left + projectsGrid.scrollLeft;
}

function startProjectsAutoplay() {
  if (projectsAutoplayRunning) return;
  projectsAutoplayRunning = true;
  projectsLastFrameTime = 0;
  projectsGrid?.classList.add('is-autoplaying');
  projectsAutoplayFrame = requestAnimationFrame(animateProjectsSlider);
}

function pauseProjectsAutoplay() {
  projectsAutoplayRunning = false;
  projectsLastFrameTime = 0;
  cancelAnimationFrame(projectsAutoplayFrame);
  projectsGrid?.classList.remove('is-autoplaying');
}

function animateProjectsSlider(timestamp) {
  if (!projectsAutoplayRunning || !projectsGrid) return;
  if (!projectsLastFrameTime) projectsLastFrameTime = timestamp;
  const elapsed = Math.min(timestamp - projectsLastFrameTime, 50);
  projectsLastFrameTime = timestamp;
  const loopWidth = getProjectsLoopWidth();

  if (loopWidth > 0 && projectsGrid.scrollWidth > projectsGrid.clientWidth + 2) {
    projectsGrid.scrollLeft += elapsed * 0.035;
    if (projectsGrid.scrollLeft >= loopWidth) projectsGrid.scrollLeft -= loopWidth;
  }

  projectsAutoplayFrame = requestAnimationFrame(animateProjectsSlider);
}

projectsGrid?.addEventListener('scroll', updateProjectsSlider, { passive: true });
projectsGrid?.addEventListener('pointerover', event => {
  if (event.target.closest('.projet-card')) pauseProjectsAutoplay();
});
projectsGrid?.addEventListener('pointerout', event => {
  const card = event.target.closest('.projet-card');
  if (card && !card.contains(event.relatedTarget)) startProjectsAutoplay();
});
projectsGrid?.addEventListener('focusin', event => {
  if (event.target.closest('.projet-card')) pauseProjectsAutoplay();
});
projectsGrid?.addEventListener('focusout', event => {
  if (!projectsGrid.contains(event.relatedTarget)) startProjectsAutoplay();
});
window.addEventListener('resize', updateProjectsSlider);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) pauseProjectsAutoplay();
  else startProjectsAutoplay();
});
startProjectsAutoplay();

// ===== PROJECTS DRAWER =====
const projectsDrawer = document.getElementById('projectsDrawer');
const projectsDrawerOverlay = document.getElementById('projectsDrawerOverlay');
const projectsDrawerClose = document.getElementById('projectsDrawerClose');
const allProjectsBtn = document.getElementById('allProjectsBtn');
const projectsSearchForm = document.getElementById('projectsSearchForm');
const projectsSearchInput = document.getElementById('projectsSearchInput');

function setProjectsDrawer(open) {
  if (!projectsDrawer || !projectsDrawerOverlay) return;
  projectsDrawer.classList.toggle('active', open);
  projectsDrawerOverlay.classList.toggle('active', open);
  projectsDrawer.setAttribute('aria-hidden', String(!open));
  if (allProjectsBtn) allProjectsBtn.setAttribute('aria-expanded', String(open));
  document.documentElement.classList.toggle('projects-drawer-open', open);
  document.body.classList.toggle('projects-drawer-open', open);
  if (open) projectsDrawerClose?.focus();
}

allProjectsBtn?.addEventListener('click', () => setProjectsDrawer(true));
projectsDrawerClose?.addEventListener('click', () => setProjectsDrawer(false));
projectsDrawerOverlay?.addEventListener('click', () => setProjectsDrawer(false));
projectsSearchInput?.addEventListener('input', () => renderProjectsDrawer(drawerProjects));
projectsSearchForm?.addEventListener('submit', event => event.preventDefault());
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && projectsDrawer?.classList.contains('active')) setProjectsDrawer(false);
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
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const subject = `Projet portfolio — ${name}`;
    const body = `Bonjour Marc,\n\n${message}\n\nNom : ${name}\nE-mail : ${email}`;

    window.location.href = `mailto:marcfaye457@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// ===== CHATBOT MAISON =====
const aiChatToggle = document.getElementById('aiChatToggle');
const aiChatDrawer = document.getElementById('aiChatDrawer');
const aiChatClose = document.getElementById('aiChatClose');
const aiChatWelcome = document.getElementById('aiChatWelcome');
const aiChatWelcomeClose = document.getElementById('aiChatWelcomeClose');
const aiChatClear = document.getElementById('aiChatClear');
const aiChatForm = document.getElementById('aiChatForm');
const aiChatInput = document.getElementById('aiChatInput');
const aiChatMessages = document.getElementById('aiChatMessages');
const aiTypingIndicator = document.getElementById('aiTypingIndicator');
const AI_HISTORY_KEY = 'marc-portfolio-chat-history';
let chatHistory = [];
let isAiReplyPending = false;

try {
  const storedHistory = JSON.parse(localStorage.getItem(AI_HISTORY_KEY) || '[]');
  chatHistory = Array.isArray(storedHistory) ? storedHistory : [];
} catch (error) {
  localStorage.removeItem(AI_HISTORY_KEY);
}

function toggleAiChat() {
  aiChatWelcome.classList.add('hidden');
  const isOpen = aiChatDrawer.classList.toggle('active');
  aiChatToggle.classList.toggle('active', isOpen);
  aiChatToggle.setAttribute('aria-expanded', String(isOpen));
  aiChatDrawer.setAttribute('aria-hidden', String(!isOpen));
  if (isOpen) setTimeout(() => aiChatInput.focus(), 250);
}

function addAiMessage(sender, text, save = true) {
  const message = document.createElement('div');
  message.className = `ai-message ${sender}`;
  message.innerHTML = `<div class="ai-msg-bubble">${escapeHtml(text).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}</div><span class="ai-msg-time">${sender === 'user' ? 'Vous' : 'IA'}</span>`;
  aiChatMessages.appendChild(message);
  aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  if (save) {
    chatHistory.push({ sender, text });
    chatHistory = chatHistory.slice(-10);
    localStorage.setItem(AI_HISTORY_KEY, JSON.stringify(chatHistory));
  }
}

function renderAiHistory() {
  chatHistory.forEach(message => addAiMessage(message.sender, message.text, false));
}

async function submitAiMessage(event) {
  event.preventDefault();
  const userMessage = aiChatInput.value.trim();
  if (!userMessage || isAiReplyPending) return;
  aiChatInput.value = '';
  addAiMessage('user', userMessage);
  isAiReplyPending = true;
  aiChatInput.disabled = true;
  aiTypingIndicator.classList.add('active');

  try {
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, history: chatHistory.slice(0, -1) })
    });
    if (!response.ok) throw new Error(`Chat API ${response.status}`);
    const data = await response.json();
    addAiMessage('bot', data.reply || getLocalAiReply(userMessage));
  } catch (error) {
    addAiMessage('bot', getLocalAiReply(userMessage));
  } finally {
    isAiReplyPending = false;
    aiChatInput.disabled = false;
    aiTypingIndicator.classList.remove('active');
    aiChatInput.focus();
  }
}

function getLocalAiReply(question) {
  const query = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/avant|parcours|experience|orange|odc|travaillait|faisait/.test(query)) return "Avant son activité freelance, Marc a travaillé chez Orange Digital Center comme Développeur Web & Mobile de 2023 à 2024. Il y a travaillé sur des projets à fort impact, des API et des architectures modernes.";
  if (/projet|realisation|creation|app|web/.test(query)) return "Marc a réalisé Dashboard Analytics, Shop Premium, Task Master Pro et Social Connect. Vous pouvez consulter la section Projets pour découvrir les technologies et les détails de chaque réalisation.";
  if (/competence|stack|techno|langage|sait faire/.test(query)) return "Marc travaille avec React, Next.js, Node.js, Express, PHP, Laravel, Tailwind CSS, MongoDB, PostgreSQL, Docker, CI/CD et React Native.";
  if (/contact|mail|email|joindre|recrut|disponib/.test(query)) return "Marc est disponible à Dakar et à distance. Vous pouvez le contacter à marcfaye457@gmail.com pour une mission, une collaboration ou une opportunité.";
  if (/bonjour|salut|hello|bonsoir/.test(query)) return "Bonjour ! Je peux vous renseigner sur le parcours, les projets, les compétences ou la disponibilité de Marc. Que souhaitez-vous savoir ?";
  return "Je peux vous renseigner sur les projets, les compétences, le parcours et les coordonnées de Marc. Essayez par exemple : « Que faisait Marc avant ? »";
}

aiChatToggle.addEventListener('click', toggleAiChat);
aiChatClose.addEventListener('click', toggleAiChat);
aiChatWelcomeClose.addEventListener('click', () => aiChatWelcome.classList.add('hidden'));
aiChatForm.addEventListener('submit', submitAiMessage);
aiChatClear.addEventListener('click', () => {
  chatHistory = [];
  localStorage.removeItem(AI_HISTORY_KEY);
  aiChatMessages.innerHTML = '<div class="ai-message bot"><div class="ai-msg-bubble">Nouvelle conversation. Que souhaitez-vous savoir sur Marc ?</div><span class="ai-msg-time">IA</span></div>';
});
renderAiHistory();

setTimeout(() => {
  if (!aiChatDrawer.classList.contains('active')) aiChatWelcome.classList.add('hidden');
}, 12000);

// ===== TECH LAB MODALS (METRICS AUDIT & PARCOURS CV) =====
const metricsModal = document.getElementById('metricsModal');
const metricsModalOverlay = document.getElementById('metricsModalOverlay');
const metricsModalClose = document.getElementById('metricsModalClose');
const openMetricsBtn = document.getElementById('openMetricsBtn');
const openMetricsDetailsBtn = document.getElementById('openMetricsDetailsBtn');

const parcoursModal = document.getElementById('parcoursModal');
const parcoursModalOverlay = document.getElementById('parcoursModalOverlay');
const parcoursModalClose = document.getElementById('parcoursModalClose');
const openParcoursBtn = document.getElementById('openParcoursBtn');
const openParcoursDetailsBtn = document.getElementById('openParcoursDetailsBtn');
const cvPrintBtn = document.getElementById('cvPrintBtn');

function setMetricsModal(open) {
  if (!metricsModal || !metricsModalOverlay) return;
  metricsModal.classList.toggle('active', open);
  metricsModalOverlay.classList.toggle('active', open);
  metricsModal.setAttribute('aria-hidden', String(!open));
  if (openMetricsBtn) openMetricsBtn.setAttribute('aria-expanded', String(open));
  document.documentElement.style.overflow = open ? 'hidden' : '';
  document.body.style.overflow = open ? 'hidden' : '';
  if (open && metricsModalClose) metricsModalClose.focus();
}

function setParcoursModal(open) {
  if (!parcoursModal || !parcoursModalOverlay) return;
  parcoursModal.classList.toggle('active', open);
  parcoursModalOverlay.classList.toggle('active', open);
  parcoursModal.setAttribute('aria-hidden', String(!open));
  if (openParcoursBtn) openParcoursBtn.setAttribute('aria-expanded', String(open));
  document.documentElement.style.overflow = open ? 'hidden' : '';
  document.body.style.overflow = open ? 'hidden' : '';
  if (open && parcoursModalClose) parcoursModalClose.focus();
}

if (openMetricsBtn) openMetricsBtn.addEventListener('click', () => setMetricsModal(true));
if (openMetricsDetailsBtn) openMetricsDetailsBtn.addEventListener('click', () => setMetricsModal(true));
if (metricsModalClose) metricsModalClose.addEventListener('click', () => setMetricsModal(false));
if (metricsModalOverlay) metricsModalOverlay.addEventListener('click', () => setMetricsModal(false));

if (openParcoursBtn) openParcoursBtn.addEventListener('click', () => setParcoursModal(true));
if (openParcoursDetailsBtn) openParcoursDetailsBtn.addEventListener('click', () => setParcoursModal(true));
if (parcoursModalClose) parcoursModalClose.addEventListener('click', () => setParcoursModal(false));
if (parcoursModalOverlay) parcoursModalOverlay.addEventListener('click', () => setParcoursModal(false));

if (cvPrintBtn) {
  cvPrintBtn.addEventListener('click', () => {
    window.print();
  });
}

// Global Escape key listener for modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (metricsModal && metricsModal.classList.contains('active')) setMetricsModal(false);
    if (parcoursModal && parcoursModal.classList.contains('active')) setParcoursModal(false);
  }
});
