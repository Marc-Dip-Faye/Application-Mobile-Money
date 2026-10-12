/**
 * Teranga Tourism Senegal - Application Logic
 */

// Dataset of Senegalese Tourism Actors
const TOURISM_ACTORS = [
    {
        id: 1,
        name: "King Fahd Palace Hotel",
        category: "hotel",
        categoryLabel: "Hôtel 5 Etoiles",
        region: "Dakar",
        location: "Pointe des Almadies, Dakar",
        rating: 4.8,
        reviewsCount: 142,
        verified: true,
        priceLabel: "À partir de 120.000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Complexe hôtelier 5 étoiles d'exception situé sur la pointe de la presqu'île de Dakar avec vue panoramique sur l'Océan Atlantique, golf 9 trous et centre de congrès.",
        phone: "+221 33 869 69 69",
        email: "reservation@kingfahdpalace.sn",
        website: "https://www.kingfahdpalace.sn",
        services: ["Piscine Olympique", "Golf 9 Trous", "Wifi Haute Vitesse", "Service Navette Aéroport", "Restaurant Gastronomique"]
    },
    {
        id: 2,
        name: "Mamadou Ba - Guide Certifié Gorée & Dakar",
        category: "guide",
        categoryLabel: "Guide Touristique National",
        region: "Dakar",
        location: "Île de Gorée & Dakar Ville",
        rating: 4.9,
        reviewsCount: 98,
        verified: true,
        priceLabel: "25.000 FCFA / demi-journée",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        description: "Guide agréé passionné d'histoire sénégalaise. Spécialiste de la Maison des Esclaves de Gorée, des marchés colorés de Dakar et du Musée des Civilisations Noires.",
        phone: "+221 77 543 21 09",
        email: "mamadou.goree.guide@gmail.com",
        website: "https://terangatourism.sn/guides/mamadou-ba",
        services: ["Visite Historique Gorée", "Circuit Marchés de Dakar", "Français / Anglais / Wolof", "Service Personnalisé"]
    },
    {
        id: 3,
        name: "Éco-Lodge de la Somone",
        category: "ecolodge",
        categoryLabel: "Éco-Lodge & Réserve",
        region: "Thies",
        location: "Lagune de la Somone, Petite Côte",
        rating: 4.7,
        reviewsCount: 85,
        verified: true,
        priceLabel: "À partir de 45.000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        description: "Refuge écologique en bois de rônier niché au cœur de la réserve ornithologique de la Somone. Balades en pirogue et observation de pélicans.",
        phone: "+221 78 123 45 67",
        email: "contact@ecolodgesomone.sn",
        website: "https://www.ecolodgesomone.sn",
        services: ["Bungalows Écologiques", "Circuit Pirogue Lagune", "Cuisine Bio Locale", "Observation des Oiseaux"]
    },
    {
        id: 4,
        name: "Chez Loutcha Gastronomie",
        category: "restaurant",
        categoryLabel: "Restaurant Traditionnel",
        region: "Dakar",
        location: "Plateau, Rue Mousse Diop, Dakar",
        rating: 4.6,
        reviewsCount: 210,
        verified: true,
        priceLabel: "Plats de 3.500 à 8.000 FCFA",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        description: "Institution mythique de la gastronomie dakaroise. Dégustez le véritable Thiéboudienne (Riz au Poisson), Yassa Poulet et Mafé aux mille saveurs.",
        phone: "+221 33 821 02 22",
        email: "contact@chezloutcha.sn",
        website: "https://www.chezloutcha.sn",
        services: ["Thiéboudienne Authentique", "Jus Naturels (Bissap, Bouye)", "Terrasse", "A Emporter"]
    },
    {
        id: 5,
        name: "Teranga Safari Express & Excursions",
        category: "transport",
        categoryLabel: "Agence de Transport & Safaris",
        region: "Thies",
        location: "Saly Portudal & AIBD Aéroport",
        rating: 4.8,
        reviewsCount: 112,
        verified: true,
        priceLabel: "Transfert AIBD à partir de 20.000 FCFA",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
        description: "Transport touristique climatisé 4x4 et minibuses. Safaris à la Réserve de Bandia, Lac Rose, et navettes directes de l'aéroport AIBD.",
        phone: "+221 76 890 12 34",
        email: "contact@terangasafari.sn",
        website: "https://www.terangasafari.sn",
        services: ["Véhicules 4x4 Climatisés", "Safaris Réserve Bandia", "Navette AIBD 24/7", "Chauffeurs Bilingues"]
    },
    {
        id: 6,
        name: "Hôtel La Résidence Saint-Louis",
        category: "hotel",
        categoryLabel: "Hôtel Historique",
        region: "Saint-Louis",
        location: "Île de Saint-Louis",
        rating: 4.7,
        reviewsCount: 76,
        verified: true,
        priceLabel: "À partir de 50.000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        description: "Demeure coloniale restaurée au charme d'antan, située au centre historique classé au patrimoine mondial de l'UNESCO sur l'île de Saint-Louis.",
        phone: "+221 33 961 12 60",
        email: "info@hotel-laresidence.sn",
        website: "https://www.hotel-laresidence.sn",
        services: ["Architecture Coloniale", "Patio Fleuri", "Bar Cocktail Jazz", "Excursion Djoudj"]
    },
    {
        id: 7,
        name: "Campement Kamoken - Cap Skirring",
        category: "ecolodge",
        categoryLabel: "Campement & Eco-Resort",
        region: "Casamance",
        location: "Cap Skirring, Ziguinchor",
        rating: 4.9,
        reviewsCount: 64,
        verified: true,
        priceLabel: "À partir de 35.000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        description: "Vivez la magie de la Casamance entre cocotiers, plages de sable blanc sans fin et culture Diola ancestrale.",
        phone: "+221 77 333 44 55",
        email: "kamoken.casamance@gmail.com",
        website: "https://www.kamoken-casamance.com",
        services: ["Accès Direct Plage", "Pêche en Mer & Bolongs", "Soirées Danse Diola", "Dégustation Vin de Palme"]
    },
    {
        id: 8,
        name: "Ousmane Sene - Guide du Parc du Djoudj",
        category: "guide",
        categoryLabel: "Guide Ornithologique",
        region: "Saint-Louis",
        location: "Parc National des Oiseaux du Djoudj",
        rating: 4.8,
        reviewsCount: 53,
        verified: true,
        priceLabel: "15.000 FCFA par pirogue",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
        description: "Spécialiste de la 3ème réserve ornithologique mondiale. Excursions captivantes en pirogue à la rencontre des pélicans, flamants roses et aigles pêcheurs.",
        phone: "+221 77 210 98 76",
        email: "ousmane.djoudj.birds@gmail.com",
        website: "https://terangatourism.sn/guides/ousmane-djoudj",
        services: ["Circuits Pirogue Djoudj", "Prêt de Jumelles", "Spécialiste Oiseaux Migrateurs", "Anglais / Français"]
    }
];

// State Management
let currentCategory = 'all';
let currentRegion = 'all';
let currentSearchQuery = '';
let currentSort = 'recommended';

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderActors();
    setupEventListeners();
}

function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.toLowerCase().trim();
            renderActors();
        });
    }

    // Region filter select
    const regionFilter = document.getElementById('region-filter');
    if (regionFilter) {
        regionFilter.addEventListener('change', (e) => {
            currentRegion = e.target.value;
            renderActors();
        });
    }

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderActors();
        });
    }

    // Category Pills
    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCategory = pill.getAttribute('data-category');
            renderActors();
        });
    });

    // Regional Cards Click
    const regionCards = document.querySelectorAll('.region-card');
    regionCards.forEach(card => {
        card.addEventListener('click', () => {
            const region = card.getAttribute('data-region');
            currentRegion = region;
            if (regionFilter) regionFilter.value = region;

            // Scroll to actors section smoothly
            const actorsSec = document.getElementById('acteurs');
            if (actorsSec) {
                actorsSec.scrollIntoView({ behavior: 'smooth' });
            }
            renderActors();
        });
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.body.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            } else {
                document.body.setAttribute('data-theme', 'light');
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            }
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('global-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const feedback = document.getElementById('form-feedback');
            if (feedback) {
                feedback.classList.remove('hidden');
                feedback.className = 'form-feedback success';
                feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Votre demande a été transmise aux acteurs du secteur ! Vous recevrez une réponse sous 24h.';
                contactForm.reset();
                setTimeout(() => {
                    feedback.classList.add('hidden');
                }, 5000);
            }
        });
    }

    // Modal Close Trigger
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalOverlay = document.getElementById('actor-modal');
    if (modalCloseBtn && modalOverlay) {
        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // Mobile Dock Active Sync
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        item.addEventListener('click', () => {
            dockItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// Filter and Sort Logic
function getFilteredActors() {
    return TOURISM_ACTORS.filter(actor => {
        const matchesCategory = currentCategory === 'all' || actor.category === currentCategory;
        const matchesRegion = currentRegion === 'all' || actor.region === currentRegion;
        const matchesSearch = !currentSearchQuery ||
            actor.name.toLowerCase().includes(currentSearchQuery) ||
            actor.location.toLowerCase().includes(currentSearchQuery) ||
            actor.description.toLowerCase().includes(currentSearchQuery) ||
            actor.categoryLabel.toLowerCase().includes(currentSearchQuery);

        return matchesCategory && matchesRegion && matchesSearch;
    }).sort((a, b) => {
        if (currentSort === 'rating') {
            return b.rating - a.rating;
        } else if (currentSort === 'name') {
            return a.name.localeCompare(b.name);
        }
        return a.id - b.id; // recommended default order
    });
}

// Render Grid Cards
function renderActors() {
    const grid = document.getElementById('actors-grid');
    const resultsCount = document.getElementById('results-count');
    if (!grid) return;

    const filtered = getFilteredActors();

    if (resultsCount) {
        resultsCount.textContent = `${filtered.length} acteur(s) touristique(s) disponible(s)`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fa-solid fa-face-frown" style="font-size: 3rem; color: var(--neon-green); margin-bottom: 16px;"></i>
                <h3>Aucun acteur trouvé</h3>
                <p style="color: var(--text-muted);">Essayez de modifier votre recherche ou d'effacer les filtres.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(actor => `
        <div class="actor-card">
            <div class="actor-img-wrapper">
                <img src="${actor.image}" alt="${actor.name}" class="actor-img" loading="lazy">
                <span class="actor-badge-category">${actor.categoryLabel}</span>
                ${actor.verified ? '<span class="actor-badge-verified" title="Acteur Vérifié Ministère"><i class="fa-solid fa-check"></i></span>' : ''}
            </div>
            <div class="actor-content">
                <div class="actor-header-row">
                    <h3 class="actor-name">${actor.name}</h3>
                    <div class="actor-rating">
                        <i class="fa-solid fa-star"></i>
                        <span>${actor.rating}</span>
                    </div>
                </div>
                <div class="actor-location">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>${actor.location}</span>
                </div>
                <p class="actor-desc">${actor.description}</p>
                <div class="actor-footer">
                    <div class="actor-price">
                        <span>Tarif :</span><br>
                        <strong>${actor.priceLabel}</strong>
                    </div>
                    <button class="btn btn-outline" onclick="openActorModal(${actor.id})">
                        Détails <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Modal View Details
function openActorModal(actorId) {
    const actor = TOURISM_ACTORS.find(a => a.id === actorId);
    if (!actor) return;

    const modalContent = document.getElementById('modal-content');
    const modalOverlay = document.getElementById('actor-modal');

    if (!modalContent || !modalOverlay) return;

    modalContent.innerHTML = `
        <img src="${actor.image}" alt="${actor.name}" class="modal-hero-img">
        <div class="modal-title-row">
            <h2 class="modal-title">${actor.name}</h2>
            <div class="actor-rating" style="font-size: 1rem; padding: 6px 12px;">
                <i class="fa-solid fa-star"></i>
                <span>${actor.rating} (${actor.reviewsCount} avis)</span>
            </div>
        </div>

        <div class="modal-tags">
            <span class="modal-tag">${actor.categoryLabel}</span>
            <span class="modal-tag"><i class="fa-solid fa-map-pin"></i> ${actor.region}</span>
            ${actor.verified ? '<span class="modal-tag" style="border-color: var(--teranga-gold); color: var(--teranga-gold);"><i class="fa-solid fa-shield-halved"></i> Certifié Agréé</span>' : ''}
        </div>

        <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
            ${actor.description}
        </p>

        <h4 style="margin-bottom: 10px;">Prestations & Services</h4>
        <div class="modal-details-grid">
            ${actor.services.map(s => `
                <div class="modal-detail-item">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>${s}</span>
                </div>
            `).join('')}
        </div>

        <div style="background: var(--bg-card-hover); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-top: 20px;">
            <h4 style="margin-bottom: 12px; color: var(--neon-green);"><i class="fa-solid fa-address-book"></i> Coordonnées Directes</h4>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.95rem;">
                <div><i class="fa-solid fa-phone" style="width: 24px; color: var(--neon-green);"></i> <strong>Téléphone :</strong> ${actor.phone}</div>
                <div><i class="fa-solid fa-envelope" style="width: 24px; color: var(--neon-green);"></i> <strong>E-mail :</strong> ${actor.email}</div>
                <div><i class="fa-solid fa-globe" style="width: 24px; color: var(--neon-green);"></i> <strong>Site Web :</strong> <a href="${actor.website}" target="_blank" style="color: var(--neon-green); text-decoration: underline;">Consulter</a></div>
            </div>
            <div style="margin-top: 16px;">
                <a href="tel:${actor.phone.replace(/\s+/g, '')}" class="btn btn-primary btn-block">
                    <i class="fa-solid fa-phone-volume"></i> Appeler Directement
                </a>
            </div>
        </div>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modalOverlay = document.getElementById('actor-modal');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}
