/**
 * TerraAfrika — Senegal Tourism & Actors Platform
 * Application Logic & Dynamic Interactions
 * Focused strictly on Senegal tourism actors with luxury Teranga branding
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Data Store: Verified Tourism Actors in Senegal
    // ==========================================
    const actorsData = [
        {
            id: 'actor-1',
            name: 'Écolodge de Lompoul & Safari Désert',
            category: 'hotel',
            categoryLabel: 'Hôtel & Éco-Lodge',
            region: 'Saint-Louis',
            location: 'Désert de Lompoul, Région de Louga / Saint-Louis',
            rating: 4.9,
            reviewCount: 148,
            image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
            summary: 'Hébergement sous tentes mauritaniennes de charme au cœur des dunes dorées du désert de Lompoul.',
            description: 'L’Écolodge de Lompoul offre une parenthèse féérique au milieu des dunes ocre du Sahel. Savourez des soirées aux rythmes envoûtants des djembés sénégalais sous la voûte céleste, des randonnées chamelières au coucher du soleil et une gastronomie raffinée du terroir valorisant l’agriculture biologique locale.',
            services: ['Tentes Royales Isolées', 'Dîner Gastronomique Sahel', 'Balade Randonnée Dromadaire', 'Soirées Acoustiques Djembé', 'Navette 4x4 Désert'],
            tags: ['Éco-Certifié', 'Désert Sahel', 'Nuit sous les Étoiles'],
            contactPhone: '+221 77 638 20 20',
            whatsapp: '221776382020',
            email: 'contact@lompoul-ecolodge.sn',
            priceRange: '45 000 — 65 000 FCFA / nuitée',
            featured: true
        },
        {
            id: 'actor-2',
            name: 'Ousmane Ndiaye — Guide d’État Gorée & Dakar',
            category: 'guide',
            categoryLabel: 'Guide Touristique Agréé',
            region: 'Dakar',
            location: 'Île de Gorée & Plateau Historique, Dakar',
            rating: 5.0,
            reviewCount: 236,
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
            summary: 'Guide conférencier d’État, historien passionné spécialiste de l’Île de Gorée et de la mémoire africaine.',
            description: 'Ousmane vous convie à un voyage mémoriel profondément humain à travers la Maison des Esclaves, les venelles coloniales fleuries de Gorée, le Musée des Civilisations Noires et le Monument de la Renaissance Africaine. Visites personnalisées bilingues (Français, Anglais, Wolof).',
            services: ['Visite Historique Gorée Privée', 'Parcours Patrimoine Dakar Colonial', 'Musée Civilisations Noires VIP', 'Échanges & Conférences'],
            tags: ['Guide Agréé État', 'Patrimoine UNESCO', 'Bilingue FR/EN'],
            contactPhone: '+221 78 145 90 30',
            whatsapp: '221781459030',
            email: 'ousmane.goree.guide@gmail.com',
            priceRange: '25 000 FCFA / demi-journée',
            featured: true
        },
        {
            id: 'actor-3',
            name: 'Les Mangroves du Sine-Saloum & Bolongs Safari',
            category: 'agency',
            categoryLabel: 'Agence & Excursions',
            region: 'Sine-Saloum',
            location: 'Toubacouta & Ndangane, Réserve de Biosphère du Sine-Saloum',
            rating: 4.8,
            reviewCount: 112,
            image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
            summary: 'Excursions en pirogue traditionnelle motorisée dans le labyrinthe des bolongs et sanctuaire d’oiseaux.',
            description: 'Référence de l’écotourisme fluvial au Sénégal, notre collectif organise des traversées exclusives du delta classé Réserve Mondiale de Biosphère par l’UNESCO : reposoir des sternes royales, dégustation d’huîtres de palétuvier sur banc de sable et bivouac insulaire écologique.',
            services: ['Safari Pirogue Bolongs', 'Observation Ornithologique', 'Pique-Nique Insulaire', 'Pêche Sportive Halieutique'],
            tags: ['Réserve UNESCO', 'Ornithologie', 'Pirogue Solaire'],
            contactPhone: '+221 76 520 11 22',
            whatsapp: '221765201122',
            email: 'info@sinesaloum-safari.sn',
            priceRange: '35 000 — 50 000 FCFA / jour',
            featured: false
        },
        {
            id: 'actor-4',
            name: 'Chez Loutcha & Table Teranga Dakaroise',
            category: 'restaurant',
            categoryLabel: 'Gastronomie & Terroir',
            region: 'Dakar',
            location: 'Rue Mousse Diop, Quartier Plateau, Dakar',
            rating: 4.8,
            reviewCount: 195,
            image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
            summary: 'Véritable sanctuaire culinaire célébrant le Thiéboudienne rouge, le Yassa au poisson frais et le Mafé.',
            description: 'Depuis plus de trois décennies, Chez Loutcha perpétue les lettres de noblesse de la cuisine sénégalaise. Poisson noble arrivage de la baie de Soumbédioune, riz cassé parfumé et nectars locaux faits maison (Bissap menthe, Bouye fruit de baobab et Gingembre doux).',
            services: ['Thiéboudienne Penda Mbaye', 'Yassa Guith & Poulet Fermier', 'Jus Naturels Pressés', 'Salons Privatisables'],
            tags: ['Table Authentique', 'Saveurs Teranga', 'Produits Locaux'],
            contactPhone: '+221 33 821 02 02',
            whatsapp: '221773004050',
            email: 'contact@chezloutcha.sn',
            priceRange: '4 500 — 12 000 FCFA / personne',
            featured: true
        },
        {
            id: 'actor-5',
            name: 'Village Artisanal de Soumbédioune & Maîtres Sculpteurs',
            category: 'artisan',
            categoryLabel: 'Artisans & Culture',
            region: 'Dakar',
            location: 'Baie de Soumbédioune, Corniche Ouest, Dakar',
            rating: 4.8,
            reviewCount: 174,
            image: 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&w=800&q=80',
            summary: 'Collectif d’artisans d’élite : ébénistes du bois de teck et baobab, peintres sous-verre et orfèvres.',
            description: 'Plongez dans le creuset de la création manuelle sénégalaise. Rencontrez des sculpteurs perpétuant les masques rituels sérères et casamançais, les maîtres de la maroquinerie fine en cuir de Thiès et participez à des ateliers de fixation de sous-verre traditionnel (suwers).',
            services: ['Exposition Sculpture Bois', 'Fixés sous-verre (Suwers)', 'Maroquinerie Fine Cuir', 'Ateliers Découverte'],
            tags: ['Métiers d’Art', 'Transmission Maître-Élève', 'Sur-mesure'],
            contactPhone: '+221 77 410 88 99',
            whatsapp: '221774108899',
            email: 'artisanat.soumbedioune@gmail.com',
            priceRange: 'Accès Libre — Pièces d’art dès 5 000 FCFA',
            featured: false
        },
        {
            id: 'actor-6',
            name: 'Dakar Express Navettes VIP & Safari Réserve de Bandia',
            category: 'transport',
            categoryLabel: 'Transports & Safaris',
            region: 'Petite Côte',
            location: 'Aéroport AIBD / Saly Portudal / Réserve de Bandia',
            rating: 4.9,
            reviewCount: 135,
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
            summary: 'Flotte haut de gamme 4x4 et vans climatisés avec chauffeurs professionnels bilingues agréés ministère.',
            description: 'Liaisons 24/7 entre l’Aéroport International Blaise Diagne (AIBD), les stations balnéaires de Saly et Somone, et organisation de safaris photo privés à la Réserve de Bandia (rhinocéros blancs, girafes d’Afrique de l’Ouest, antilopes et zèbres).',
            services: ['Transfert Aéroport AIBD VIP', 'Safari Photo Bandia Privé', 'Chauffeur Dédié Long Séjour', 'Wifi Haut Débit & Climatisation'],
            tags: ['Flotte Sécurisée', 'Chauffeur Bilingue', 'Agréé Ministère'],
            contactPhone: '+221 77 888 33 44',
            whatsapp: '221778883344',
            email: 'reservation@dakarexpress-navette.sn',
            priceRange: '25 000 FCFA / trajet transfert',
            featured: true
        },
        {
            id: 'actor-7',
            name: 'Cap Skirring Ocean & Rizières Éco-Resort',
            category: 'hotel',
            categoryLabel: 'Hôtel & Éco-Lodge',
            region: 'Casamance',
            location: 'Bouyouye & Plage de Cap Skirring, Région de Ziguinchor',
            rating: 4.9,
            reviewCount: 165,
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            summary: 'Havre paradisiaque en bordure d’océan, entre cocotiers majestueux, fromagers sacrés et rizières diolas.',
            description: 'Vivez la plénitude de la Casamance, royaume de la paix et de la nature luxuriante. Bungalows bio-climatiques bâtis en terre battue et palmes de rôniers, initiation à la récolte du vin de palme, navigation vers l’île historique de Carabane et dégustation de crevettes sauvages.',
            services: ['Bungalows Éco-Océan', 'Expéditions Île de Carabane', 'Initiation Pêche & Pirogue', 'Détente Plage Sauvage'],
            tags: ['Éco-Luxe', 'Casamance Sauvage', 'Bord de Mer'],
            contactPhone: '+221 77 220 99 00',
            whatsapp: '221772209900',
            email: 'stay@cap-skirring-ecoresort.sn',
            priceRange: '55 000 — 85 000 FCFA / nuitée',
            featured: true
        },
        {
            id: 'actor-8',
            name: 'Mamadou Diallo — Guide Fluvial de Saint-Louis & Djoudj',
            category: 'guide',
            categoryLabel: 'Guide Touristique Agréé',
            region: 'Saint-Louis',
            location: 'Pont Faidherbe, Île de Saint-Louis & Parc National du Djoudj',
            rating: 4.9,
            reviewCount: 104,
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
            summary: 'Connaisseur émérite des bâtisses coloniales classées UNESCO et ornithologue du sanctuaire du Djoudj.',
            description: 'Parcourez en calèche d’époque les ruelles chargées de souvenirs de l’ancienne capitale de l’AOF, puis embarquez à l’aube en barque fluviale au Parc National des Oiseaux du Djoudj (3 millions d’oiseaux migrateurs, pélicans blancs et cormorans).',
            services: ['Balade Calèche Saint-Louis', 'Safari Ornithologique Djoudj', 'Histoire Fluviale Sénégal', 'Rencontre Signares & Musique Jazz'],
            tags: ['Ornithologie Djoudj', 'UNESCO Saint-Louis', 'Historien Local'],
            contactPhone: '+221 77 555 12 34',
            whatsapp: '221775551234',
            email: 'mamadou.saintlouis@gmail.com',
            priceRange: '20 000 — 30 000 FCFA / circuit',
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
            const targetSection = document.getElementById('contact-section');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ==========================================
    // 2. Filter & Render Functions
    // ==========================================

    function filterActors() {
        return actorsData.filter(actor => {
            const matchesCategory = currentCategory === 'all' || actor.category === currentCategory;

            const matchesRegion = !currentRegion ||
                actor.region.toLowerCase().includes(currentRegion.toLowerCase()) ||
                actor.location.toLowerCase().includes(currentRegion.toLowerCase());

            const query = searchQuery.toLowerCase().trim();
            const matchesQuery = !query ||
                actor.name.toLowerCase().includes(query) ||
                actor.description.toLowerCase().includes(query) ||
                actor.location.toLowerCase().includes(query) ||
                actor.categoryLabel.toLowerCase().includes(query) ||
                (actor.tags && actor.tags.some(t => t.toLowerCase().includes(query)));

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
        const tagsHTML = actor.tags && actor.tags.length > 0
            ? `<div class="card-tags">${actor.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}</div>`
            : '';

        return `
            <article class="actor-card" data-id="${actor.id}">
                <div class="card-image-wrap">
                    <img src="${actor.image}" alt="${actor.name}" class="card-image" loading="lazy">
                    <div class="card-image-gradient"></div>
                    <span class="card-badge-category">${actor.categoryLabel}</span>
                    ${actor.featured ? `<span class="card-badge-featured"><i class="fa-solid fa-crown"></i> Sélection Teranga</span>` : ''}
                    <button class="card-bookmark-btn ${isBookmarked ? 'active' : ''}" data-bookmark-id="${actor.id}" aria-label="Sauvegarder dans mes favoris" title="Ajouter aux favoris">
                        <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
                    </button>
                </div>
                <div class="card-body">
                    <div class="card-region">
                        <i class="fa-solid fa-location-dot"></i> <span>${actor.location}</span>
                    </div>
                    <h3 class="card-title">${actor.name}</h3>
                    <p class="card-desc">${actor.summary}</p>
                    ${tagsHTML}
                    <div class="card-meta">
                        <div class="card-rating">
                            <i class="fa-solid fa-star"></i> <span>${actor.rating.toFixed(1)}</span>
                            <span class="card-reviews">(${actor.reviewCount} avis)</span>
                        </div>
                        <div class="card-actions-row">
                            <a href="https://wa.me/${actor.whatsapp}?text=Bonjour%20${encodeURIComponent(actor.name)},%20je%20vous%20contacte%20depuis%20TerraAfrika."
                               target="_blank" rel="noopener noreferrer" class="card-quick-wa" title="WhatsApp Direct" aria-label="Contacter sur WhatsApp">
                                <i class="fa-brands fa-whatsapp"></i>
                            </a>
                            <button class="card-details-btn" data-detail-id="${actor.id}">
                                <span>Détails</span> <i class="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    function renderActors() {
        const filtered = filterActors();

        if (filtered.length === 0) {
            actorsGrid.innerHTML = '';
            emptyState.classList.remove('hidden');
            actorsCountEl.textContent = '0 acteur correspondant';
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
        if (favCountBadge) {
            favCountBadge.textContent = bookmarks.size;
        }
        localStorage.setItem('terra_bookmarks', JSON.stringify(Array.from(bookmarks)));
    }

    // ==========================================
    // 3. Modal & Details View
    // ==========================================

    function openModal(actorId) {
        const actor = actorsData.find(a => a.id === actorId);
        if (!actor) return;

        modalBodyContent.innerHTML = `
            <div class="modal-hero-img-wrap">
                <img src="${actor.image}" alt="${actor.name}" class="modal-hero-img">
                <div class="card-image-gradient"></div>
            </div>
            <div class="modal-content-inner">
                <div class="modal-actor-header">
                    <div class="modal-title-group">
                        <h2>${actor.name}</h2>
                        <div class="modal-badge-row">
                            <span class="card-badge-category" style="position:static; box-shadow:none;">${actor.categoryLabel}</span>
                            <span style="color: var(--text-secondary);"><i class="fa-solid fa-location-dot glow-text"></i> ${actor.location}</span>
                        </div>
                    </div>
                    <div class="card-rating" style="font-size: 1.25rem;">
                        <i class="fa-solid fa-star"></i> <span>${actor.rating.toFixed(1)}</span>
                        <span class="card-reviews">(${actor.reviewCount} avis certifiés)</span>
                    </div>
                </div>

                <p style="font-size: 1.05rem; color: var(--text-primary); margin-bottom: 22px; line-height: 1.7;">
                    ${actor.description}
                </p>

                <h4 class="modal-section-title"><i class="fa-solid fa-circle-check"></i> Prestations & Engagements Teranga</h4>
                <div class="services-list">
                    ${actor.services.map(s => `<span class="service-chip"><i class="fa-solid fa-angle-right glow-text"></i> ${s}</span>`).join('')}
                </div>

                <div class="modal-info-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
                        <div>
                            <span style="font-size: 0.82rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Tarification Indicative</span>
                            <div style="font-size: 1.35rem; font-weight: 800; color: var(--primary-neon);">${actor.priceRange}</div>
                        </div>
                        <div style="font-size: 0.9rem; color: var(--text-secondary); display: flex; align-items: center; gap: 8px;">
                            <i class="fa-solid fa-shield-halved glow-text" style="font-size: 1.2rem;"></i>
                            <span>Acteur Agréé & Vérifié TerraAfrika</span>
                        </div>
                    </div>
                </div>

                <div class="modal-actions">
                    <a href="https://wa.me/${actor.whatsapp}?text=Bonjour%20${encodeURIComponent(actor.name)},%20je%20vous%20contacte%20depuis%20TerraAfrika%20pour%20une%20demande%20d'information%20ou%20réservation."
                       target="_blank" rel="noopener noreferrer" class="btn-neon full-width" style="text-align: center;">
                        <i class="fa-brands fa-whatsapp" style="font-size: 1.25rem;"></i> Contacter par WhatsApp Direct
                    </a>
                    <a href="tel:${actor.contactPhone}" class="btn-neon-outline full-width" style="text-align: center;">
                        <i class="fa-solid fa-phone"></i> Appeler le ${actor.contactPhone}
                    </a>
                </div>
            </div>
        `;

        actorModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        actorModal.classList.add('hidden');
        document.body.style.overflow = '';
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
    if (heroSearchBtn) {
        heroSearchBtn.addEventListener('click', () => {
            searchQuery = heroSearchInput.value;
            currentRegion = heroRegionSelect.value;
            renderActors();
            const targetSection = document.getElementById('acteurs-section');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (heroSearchInput) {
        heroSearchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                searchQuery = heroSearchInput.value;
                currentRegion = heroRegionSelect.value;
                renderActors();
                const targetSection = document.getElementById('acteurs-section');
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            currentSort = sortSelect.value;
            renderActors();
        });
    }

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            currentCategory = 'all';
            currentRegion = '';
            searchQuery = '';
            heroSearchInput.value = '';
            heroRegionSelect.value = '';
            categoryBtns.forEach(b => b.classList.remove('active'));
            if (categoryBtns[0]) categoryBtns[0].classList.add('active');
            renderActors();
        });
    }

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

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (actorModal) {
        actorModal.addEventListener('click', (e) => {
            if (e.target === actorModal) closeModal();
        });
    }

    // Close modal on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !actorModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // ==========================================
    // 5. Itinerary Planner Logic
    // ==========================================

    if (generateItineraryBtn) {
        generateItineraryBtn.addEventListener('click', () => {
            const regionSelect = document.getElementById('itinerary-region');
            const durationSelect = document.getElementById('itinerary-duration');
            const styleSelect = document.getElementById('itinerary-style');

            const region = regionSelect ? regionSelect.value : 'Dakar & Gorée';
            const duration = durationSelect ? durationSelect.value : '7 jours';
            const style = styleSelect ? styleSelect.value : 'Culture & Histoire';

            // Find relevant actors for the chosen region
            const regionKeyword = region.split('&')[0].trim().toLowerCase();
            const regionActors = actorsData.filter(a =>
                a.location.toLowerCase().includes(regionKeyword) ||
                a.region.toLowerCase().includes(regionKeyword)
            );
            const selectedActors = regionActors.length > 0 ? regionActors : actorsData.slice(0, 3);

            itineraryResult.innerHTML = `
                <div style="margin-bottom: 22px;">
                    <span class="section-subtitle" style="font-size: 0.76rem; padding: 4px 14px;">
                        <i class="fa-solid fa-check"></i> Circuit Personnalisé Validé
                    </span>
                    <h3 style="font-family: var(--font-heading); font-size: 1.45rem; color: var(--primary-neon); margin-top: 8px;">
                        Programme d'Excellence — ${duration}
                    </h3>
                    <p style="font-size: 0.92rem; color: var(--text-secondary); margin-top: 4px;">
                        Thématique : <strong style="color: var(--text-primary);">${style}</strong> • Destination : <strong style="color: var(--text-primary);">${region}</strong>.
                    </p>
                </div>

                <div class="itinerary-timeline">
                    <div class="timeline-step">
                        <span class="step-day">Étape 1</span>
                        <div class="step-content">
                            <h4>Accueil Teranga & Immersion Authentique</h4>
                            <p>Arrivée et installation avec vos hôtes. Découverte de la gastronomie locale et visite historique commentée par un guide officiel agréé.</p>
                            <div class="step-actors">
                                ${selectedActors.map(a => `<span class="actor-pill"><i class="fa-solid fa-star glow-text"></i> ${a.name}</span>`).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="timeline-step">
                        <span class="step-day">Étape 2</span>
                        <div class="step-content">
                            <h4>Exploration Nature, Réserves & Bolongs</h4>
                            <p>Traversée en pirogue à la rencontre des écosystèmes préservés, observation des espèces protégées et haltes gourmandes au bord de l'eau.</p>
                        </div>
                    </div>

                    <div class="timeline-step">
                        <span class="step-day">Étape 3</span>
                        <div class="step-content">
                            <h4>Rencontre des Maîtres Artisans & Départ Serein</h4>
                            <p>Ateliers de savoir-faire traditionnel, acquisition d'œuvres éthiques d'artisans locaux et transfert VIP retour sécurisé.</p>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 26px; padding-top: 18px; border-top: 1px solid var(--border-subtle); text-align: center;">
                    <a href="#acteurs-section" class="btn-neon full-width">
                        <i class="fa-solid fa-address-book"></i> Contacter les acteurs de ce parcours
                    </a>
                </div>
            `;
        });
    }

    // ==========================================
    // 6. Registration Form Handler
    // ==========================================

    if (actorRegisterForm) {
        actorRegisterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('🎉 Félicitations ! Votre demande d\'inscription a été soumise avec succès.\n\nL\'équipe TerraAfrika prendra contact avec vous dans un délai de 24h par WhatsApp pour valider votre fiche officielle d\'acteur du tourisme au Sénégal.');
            actorRegisterForm.reset();
        });
    }

    // ==========================================
    // 7. Mobile Bottom Navigation Dock Scroll Tracker
    // ==========================================

    const dockItems = document.querySelectorAll('.dock-item');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let currentSectionId = 'hero';
        sections.forEach(sec => {
            const top = sec.offsetTop - 150;
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
