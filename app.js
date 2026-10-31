/**
 * TerraAfrika — Senegal Tourism & Actors Platform
 * Application Logic & Dynamic Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Data Store: Tourism Actors in Senegal
    // ==========================================
    const actorsData = [
        {
            id: 'actor-1',
            name: 'Écolodge de Lompoul & Safari Desert',
            category: 'hotel',
            categoryLabel: 'Hôtel & Éco-Lodge',
            region: 'Saint-Louis',
            location: 'Désert de Lompoul, Région de Louga/Saint-Louis',
            rating: 4.9,
            reviewCount: 128,
            image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
            summary: 'Hébergement sous tentes mauritaniennes de charme au cœur des dunes de sable fin de Lompoul.',
            description: 'L’Écolodge de Lompoul offre une immersion magique au milieu des dunes. Profitez de soirées aux rythmes des djembés sénégalais sous les étoiles, de balades à dos de dromadaire et d’une cuisine locale savoureuse préparée avec des produits bios locaux.',
            services: ['Tentes Royales', 'Cuisine Teranga', 'Balade Dromadaire', 'Soirées Folkloriques', 'Transport 4x4'],
            contactPhone: '+221 77 638 20 20',
            whatsapp: '221776382020',
            email: 'contact@lompoul-ecolodge.sn',
            priceRange: '45 000 FCFA / nuit',
            featured: true
        },
        {
            id: 'actor-2',
            name: 'Ousmane Ndiaye — Guide Certifié Gorée & Dakar',
            category: 'guide',
            categoryLabel: 'Guide Touristique',
            region: 'Dakar',
            location: 'Île de Gorée & Musée des Civilisations Noires, Dakar',
            rating: 5.0,
            reviewCount: 215,
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
            summary: 'Guide d’État passionné d’histoire, spécialiste de l’Île de Gorée et de l’histoire culturelle dakaroise.',
            description: 'Ousmane vous emmène dans un voyage émouvant à travers la Maison des Esclaves, les ruelles aux bougainvilliers de Gorée, le Marché Kermel et le Monument de la Renaissance Africaine. Visites guidées polyglottes (Français, Anglais, Wolof).',
            services: ['Visite Historique Gorée', 'Tour d’Art Dakar', 'Musée Civilisations Noires', 'Circuits Privés'],
            contactPhone: '+221 78 145 90 30',
            whatsapp: '221781459030',
            email: 'ousmane.goree.guide@gmail.com',
            priceRange: '25 000 FCFA / journée',
            featured: true
        },
        {
            id: 'actor-3',
            name: 'Les Mangroves du Sine-Saloum Safari',
            category: 'agency',
            categoryLabel: 'Agence & Excursions',
            region: 'Sine-Saloum',
            location: 'Toubacouta & Ndangane, Delta du Sine-Saloum',
            rating: 4.8,
            reviewCount: 94,
            image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
            summary: 'Excursions en pirogue traditionnelle à travers le delta classé UNESCO et observation des oiseaux.',
            description: 'Spécialiste de l’écotourisme maritime, notre agence vous fait découvrir l’Île aux Coquillages de Fadiouth, le reposoir des oiseaux à Djiffer et la forêt de mangroves de Toubacouta avec des piroguiers locaux expérimentés.',
            services: ['Excursion Pirogue', 'Observation Ornithologique', 'Pêche Sportive', 'Picnic sur île déserte'],
            contactPhone: '+221 76 520 11 22',
            whatsapp: '221765201122',
            email: 'info@sinesaloum-safari.sn',
            priceRange: '35 000 FCFA / personne',
            featured: false
        },
        {
            id: 'actor-4',
            name: 'Chez Loutcha & Thiéboudienne Teranga',
            category: 'restaurant',
            categoryLabel: 'Gastronomie & Table',
            region: 'Dakar',
            location: 'Rue Mousse Diop, Plateau, Dakar',
            rating: 4.7,
            reviewCount: 180,
            image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
            summary: 'Véritable institution dakaroise pour déguster le Thiéboudienne, Yassa au Poulet et Mafé authentiques.',
            description: 'Une plongée gastronomique inoubliable au cœur du Sénégal. Le Thiéboudienne Penda Mbaye (Riz au poisson) y est préparé selon les recettes ancestrales transmises de génération en génération.',
            services: ['Plats Traditionnels', 'Jus Locaux (Bissap, Bouye)', 'Espace Climatisé & Terrasse', 'Service Traiteur'],
            contactPhone: '+221 33 821 02 02',
            whatsapp: '221773004050',
            email: 'contact@chezloutcha.sn',
            priceRange: '4 000 - 10 000 FCFA / plat',
            featured: true
        },
        {
            id: 'actor-5',
            name: 'Village des Artisans de Soumbédioune',
            category: 'artisan',
            categoryLabel: 'Artisans & Culture',
            region: 'Dakar',
            location: 'Corniche Ouest, Soumbédioune, Dakar',
            rating: 4.8,
            reviewCount: 160,
            image: 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&w=800&q=80',
            summary: 'Collectif d’artisans sculpteurs, maroquiniers, peintres sous-verre et bijoutiers traditionnels.',
            description: 'Découvrez le savoir-faire vivant du Sénégal. Rencontrez directement les maîtres artisans travaillant le bois de baobab, le cuir et les perles. Ateliers d’initiation à la poterie et au sous-verre disponibles.',
            services: ['Vente Directe Artisanale', 'Atelier Initiation', 'Sur-mesure', 'Expédition Internationale'],
            contactPhone: '+221 77 410 88 99',
            whatsapp: '221774108899',
            email: 'artisanat.soumbedioune@gmail.com',
            priceRange: 'Entrée Libre',
            featured: false
        },
        {
            id: 'actor-6',
            name: 'Dakar Express Navettes & Safaris Bandia',
            category: 'transport',
            categoryLabel: 'Transports & Navettes',
            region: 'Petite Côte',
            location: 'Aéroport AIBD / Saly / Dakar / Réserve de Bandia',
            rating: 4.9,
            reviewCount: 110,
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
            summary: 'Service premium de transport touristique avec véhicules VIP, 4x4 et minivans climatisés avec chauffeur.',
            description: 'Transferts aéroport AIBD Diass vers Saly, Somone et Dakar. Excursions VIP vers la Réserve de Bandia pour observer girafes, rhinocéros et zèbres en toute sécurité.',
            services: ['Transferts AIBD 24/7', 'Chauffeurs Bilingues', '4x4 Safari Bandia', 'Wifi à bord'],
            contactPhone: '+221 77 888 33 44',
            whatsapp: '221778883344',
            email: 'reservation@dakarexpress-navette.sn',
            priceRange: '20 000 FCFA / transfert',
            featured: true
        },
        {
            id: 'actor-7',
            name: 'Cap Skirring Eco-Resort & Pirogues de Casamance',
            category: 'hotel',
            categoryLabel: 'Hôtel & Éco-Lodge',
            region: 'Casamance',
            location: 'Cap Skirring, Région de Ziguinchor',
            rating: 4.9,
            reviewCount: 142,
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            summary: 'Havere de paix niché entre cocotiers et plage de sable fin bordant l’Océan Atlantique.',
            description: 'Vivez l’expérience magique de la Casamance, terre de sérénité et de forêts de fromagers. Dégustation de crevettes grillées, initiations au surf et balades en pirogue à Carabane.',
            services: ['Bungalows Plage', 'Excursions Carabane', 'Surf & Kayak', 'Dégustation Jus de Kadd'],
            contactPhone: '+221 77 220 99 00',
            whatsapp: '221772209900',
            email: 'stay@cap-skirring-ecoresort.sn',
            priceRange: '55 000 FCFA / nuit',
            featured: true
        },
        {
            id: 'actor-8',
            name: 'Mamadou Diallo — Guide de la Fleuve & Saint-Louis',
            category: 'guide',
            categoryLabel: 'Guide Touristique',
            region: 'Saint-Louis',
            location: 'Île de Saint-Louis & Parc National du Djoudj',
            rating: 4.8,
            reviewCount: 88,
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
            summary: 'Expert en architecture coloniale de Saint-Louis et ornithologie du Djoudj.',
            description: 'Parcourez en caleche les rues classées UNESCO de l’Île de Saint-Louis et visitez le troisième sanctuaire d’oiseaux au monde au Parc du Djoudj pendant la migration des pélicans.',
            services: ['Tour en Calèche', 'Safari Ornithologique Djoudj', 'Histoire du Pont Faidherbe'],
            contactPhone: '+221 77 555 12 34',
            whatsapp: '221775551234',
            email: 'mamadou.saintlouis@gmail.com',
            priceRange: '20 000 FCFA / excursion',
            featured: false
        }
    ];

    // State Variables
    let currentCategory = 'all';
    let currentRegion = '';
    let searchQuery = '';
    let currentSort = 'featured';
    let bookmarks = new Set(JSON.parse(localStorage.getItem('terra_bookmarks') || '[]'));

    // DOM Elements
    const actorsGrid = document.getElementById('actors-grid');
    const bookmarksGrid = document.getElementById('bookmarks-grid');
    const emptyState = document.getElementById('empty-state');
    const emptyBookmarks = document.getElementById('empty-bookmarks');
    const actorsCountEl = document.getElementById('actors-count');
    const favCountBadge = document.getElementById('fav-count-badge');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const heroSearchInput = document.getElementById('hero-search-input');
    const heroRegionSelect = document.getElementById('hero-region-select');
    const heroSearchBtn = document.getElementById('hero-search-btn');
    const sortSelect = document.getElementById('sort-select');
    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    const actorModal = document.getElementById('actor-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalBodyContent = document.getElementById('modal-body-content');
    const generateItineraryBtn = document.getElementById('generate-itinerary-btn');
    const itineraryResult = document.getElementById('itinerary-result');
    const actorRegisterForm = document.getElementById('actor-register-form');
    const btnAddActor = document.getElementById('btn-add-actor');

    if (btnAddActor) {
        btnAddActor.addEventListener('click', () => {
            document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ==========================================
    // 2. Render Functions
    // ==========================================

    function filterActors() {
        return actorsData.filter(actor => {
            const matchesCategory = currentCategory === 'all' || actor.category === currentCategory;

            const matchesRegion = !currentRegion || actor.region.toLowerCase().includes(currentRegion.toLowerCase());

            const query = searchQuery.toLowerCase().trim();
            const matchesQuery = !query ||
                actor.name.toLowerCase().includes(query) ||
                actor.description.toLowerCase().includes(query) ||
                actor.location.toLowerCase().includes(query) ||
                actor.categoryLabel.toLowerCase().includes(query);

            return matchesCategory && matchesRegion && matchesQuery;
        }).sort((a, b) => {
            if (currentSort === 'rating') return b.rating - a.rating;
            if (currentSort === 'reviews') return b.reviewCount - a.reviewCount;
            if (currentSort === 'name') return a.name.localeCompare(b.name);
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        });
    }

    function createActorCardHTML(actor) {
        const isBookmarked = bookmarks.has(actor.id);
        return `
            <div class="actor-card" data-id="${actor.id}">
                <div class="card-image-wrap">
                    <img src="${actor.image}" alt="${actor.name}" class="card-image" loading="lazy">
                    <span class="card-badge-category">${actor.categoryLabel}</span>
                    <button class="card-bookmark-btn ${isBookmarked ? 'active' : ''}" data-bookmark-id="${actor.id}" title="Ajouter aux favoris">
                        <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
                    </button>
                </div>
                <div class="card-body">
                    <div class="card-region">
                        <i class="fa-solid fa-location-dot"></i> ${actor.location}
                    </div>
                    <h3 class="card-title">${actor.name}</h3>
                    <p class="card-desc">${actor.summary}</p>
                    <div class="card-meta">
                        <div class="card-rating">
                            <i class="fa-solid fa-star"></i> ${actor.rating}
                            <span class="card-reviews">(${actor.reviewCount} avis)</span>
                        </div>
                        <button class="card-details-btn" data-detail-id="${actor.id}">
                            Détails <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderActors() {
        const filtered = filterActors();

        if (filtered.length === 0) {
            actorsGrid.innerHTML = '';
            emptyState.classList.remove('hidden');
            actorsCountEl.textContent = '0 acteur trouvé';
        } else {
            emptyState.classList.add('hidden');
            actorsGrid.innerHTML = filtered.map(actor => createActorCardHTML(actor)).join('');
            actorsCountEl.textContent = `${filtered.length} acteur${filtered.length > 1 ? 's' : ''} disponible${filtered.length > 1 ? 's' : ''}`;
        }

        renderBookmarks();
        updateFavBadge();
    }

    function renderBookmarks() {
        const bookmarkedActors = actorsData.filter(a => bookmarks.has(a.id));

        if (bookmarkedActors.length === 0) {
            bookmarksGrid.innerHTML = '';
            emptyBookmarks.classList.remove('hidden');
        } else {
            emptyBookmarks.classList.add('hidden');
            bookmarksGrid.innerHTML = bookmarkedActors.map(actor => createActorCardHTML(actor)).join('');
        }
    }

    function updateFavBadge() {
        favCountBadge.textContent = bookmarks.size;
        localStorage.setItem('terra_bookmarks', JSON.stringify(Array.from(bookmarks)));
    }

    // ==========================================
    // 3. Modal & Details View
    // ==========================================

    function openModal(actorId) {
        const actor = actorsData.find(a => a.id === actorId);
        if (!actor) return;

        const isBookmarked = bookmarks.has(actor.id);

        modalBodyContent.innerHTML = `
            <img src="${actor.image}" alt="${actor.name}" class="modal-hero-img">
            <div class="modal-content-inner">
                <div class="modal-actor-header">
                    <div class="modal-title-group">
                        <h2>${actor.name}</h2>
                        <div class="modal-badge-row">
                            <span class="card-badge-category" style="position:static;">${actor.categoryLabel}</span>
                            <span style="color: var(--text-secondary);"><i class="fa-solid fa-location-dot glow-text"></i> ${actor.location}</span>
                        </div>
                    </div>
                    <div class="card-rating" style="font-size: 1.2rem;">
                        <i class="fa-solid fa-star"></i> ${actor.rating} <span class="card-reviews">(${actor.reviewCount} avis certifiés)</span>
                    </div>
                </div>

                <p style="font-size: 1.05rem; color: var(--text-primary); margin-bottom: 20px;">
                    ${actor.description}
                </p>

                <h4 class="modal-section-title"><i class="fa-solid fa-check-double"></i> Prestations & Services Inclus</h4>
                <div class="services-list">
                    ${actor.services.map(s => `<span class="service-chip"><i class="fa-solid fa-angle-right glow-text"></i> ${s}</span>`).join('')}
                </div>

                <div style="background: rgba(0, 255, 136, 0.05); border: 1px solid var(--border-glow); padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <span style="font-size: 0.85rem; color: var(--text-secondary);">Tarif indicatif</span>
                            <div style="font-size: 1.25rem; font-weight: 800; color: var(--primary-neon);">${actor.priceRange}</div>
                        </div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary);">
                            <i class="fa-solid fa-shield-halved glow-text"></i> Acteur 100% Vérifié TerraAfrika
                        </div>
                    </div>
                </div>

                <div class="modal-actions">
                    <a href="https://wa.me/${actor.whatsapp}?text=Bonjour%20${encodeURIComponent(actor.name)},%20je%20vous%20contacte%20depuis%20TerraAfrika%20pour%20une%20demande%20d'information."
                       target="_blank" class="btn-neon full-width" style="text-align: center;">
                        <i class="fa-brands fa-whatsapp" style="font-size: 1.2rem;"></i> Contacter par WhatsApp
                    </a>
                    <a href="tel:${actor.contactPhone}" class="btn-neon-outline full-width" style="text-align: center;">
                        <i class="fa-solid fa-phone"></i> Appeler le ${actor.contactPhone}
                    </a>
                </div>
            </div>
        `;

        actorModal.classList.remove('hidden');
    }

    function closeModal() {
        actorModal.classList.add('hidden');
    }

    // ==========================================
    // 4. Event Listeners
    // ==========================================

    // Category Tabs Filter
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderActors();
        });
    });

    // Hero Search Trigger
    heroSearchBtn.addEventListener('click', () => {
        searchQuery = heroSearchInput.value;
        currentRegion = heroRegionSelect.value;
        renderActors();
        document.getElementById('acteurs-section').scrollIntoView({ behavior: 'smooth' });
    });

    heroSearchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchQuery = heroSearchInput.value;
            currentRegion = heroRegionSelect.value;
            renderActors();
            document.getElementById('acteurs-section').scrollIntoView({ behavior: 'smooth' });
        }
    });

    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        renderActors();
    });

    resetFiltersBtn.addEventListener('click', () => {
        currentCategory = 'all';
        currentRegion = '';
        searchQuery = '';
        heroSearchInput.value = '';
        heroRegionSelect.value = '';
        categoryBtns.forEach(b => b.classList.remove('active'));
        categoryBtns[0].classList.add('active');
        renderActors();
    });

    // Event Delegation for Bookmarks and Modal Details
    document.addEventListener('click', (e) => {
        const bookmarkBtn = e.target.closest('[data-bookmark-id]');
        if (bookmarkBtn) {
            e.stopPropagation();
            const id = bookmarkBtn.dataset.bookmarkId;
            if (bookmarks.has(id)) {
                bookmarks.delete(id);
            } else {
                bookmarks.add(id);
            }
            renderActors();
            return;
        }

        const detailBtn = e.target.closest('[data-detail-id]');
        if (detailBtn) {
            const id = detailBtn.dataset.detailId;
            openModal(id);
            return;
        }
    });

    modalCloseBtn.addEventListener('click', closeModal);
    actorModal.addEventListener('click', (e) => {
        if (e.target === actorModal) closeModal();
    });

    // ==========================================
    // 5. Itinerary Planner Logic
    // ==========================================

    generateItineraryBtn.addEventListener('click', () => {
        const region = document.getElementById('itinerary-region').value;
        const duration = document.getElementById('itinerary-duration').value;
        const style = document.getElementById('itinerary-style').value;

        // Find relevant actors for the region
        const regionActors = actorsData.filter(a => a.location.toLowerCase().includes(region.toLowerCase().split(' ')[0]));
        const selectedActors = regionActors.length > 0 ? regionActors : actorsData.slice(0, 3);

        itineraryResult.innerHTML = `
            <div style="margin-bottom: 20px;">
                <span class="section-subtitle" style="font-size: 0.75rem;"><i class="fa-solid fa-check"></i> Circuit sur-mesure prêt</span>
                <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--primary-neon); margin-top: 6px;">
                    Proproposition de Séjour (${duration})
                </h3>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">
                    Thématique : <strong>${style}</strong> à <strong>${region}</strong>.
                </p>
            </div>

            <div class="itinerary-timeline">
                <div class="timeline-step">
                    <span class="step-day">Jour 1 - 2</span>
                    <div class="step-content">
                        <h4>Accueil Teranga & Immersion Locale</h4>
                        <p>Installation dans votre hébergement partenaire et visite guidée du centre historique avec un expert local certifié.</p>
                        <div class="step-actors">
                            ${selectedActors.map(a => `<span class="actor-pill"><i class="fa-solid fa-star"></i> ${a.name}</span>`).join('')}
                        </div>
                    </div>
                </div>

                <div class="timeline-step">
                    <span class="step-day">Jour 3 - 5</span>
                    <div class="step-content">
                        <h4>Excursion Nature & Gastronomie</h4>
                        <p>Traversée en pirogue des réserves naturelles, observation de la faune et dégustation de produits locaux préparés par les chefs de la région.</p>
                    </div>
                </div>

                <div class="timeline-step">
                    <span class="step-day">Fin de séjour</span>
                    <div class="step-content">
                        <h4>Artisanat & Souvenirs Authentiques</h4>
                        <p>Rencontre avec les maîtres artisans locaux et transfert retour sécurisé vers votre point de départ.</p>
                    </div>
                </div>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color); text-align: center;">
                <a href="#contact-section" class="btn-neon full-width">
                    <i class="fa-solid fa-paper-plane"></i> Réserver ce circuit avec nos acteurs
                </a>
            </div>
        `;
    });

    // ==========================================
    // 6. Registration Form Handler
    // ==========================================

    actorRegisterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('🎉 Félicitations ! Votre demande d\'inscription a été soumise avec succès. L\'équipe TerraAfrika prendra contact avec vous dans les 24h pour valider votre fiche d\'acteur.');
        actorRegisterForm.reset();
    });

    // ==========================================
    // 7. Mobile Bottom Navigation Dock Scroll Tracker
    // ==========================================

    const dockItems = document.querySelectorAll('.dock-item');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let currentSectionId = 'hero';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            const height = sec.offsetHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                currentSectionId = sec.id;
            }
        });

        dockItems.forEach(item => {
            if (item.dataset.dock === currentSectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    // Initial render
    renderActors();
});
