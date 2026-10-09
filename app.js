/**
 * Teranga Tourisme Sénégal - Interactive Application Logic
 * Pure JavaScript with full search, category filtering, favorites, modals, dynamic stats & toasts
 */

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------
    // Mock Data: Tourism Actors in Senegal
    // ------------------------------------------------------------------
    const tourismActors = [
        {
            id: 1,
            name: "Eco-Lodge La Somone",
            category: "hebergement",
            categoryLabel: "Hôtel & Eco-Lodge",
            region: "Thies",
            location: "Somone, Petite-Côte",
            rating: 4.9,
            price: "45 000 FCFA / nuit",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
            description: "Un havre de paix éco-responsable au bord de la lagune de la Somone. Bungalows sur pilotis et excursions ornithologiques.",
            phone: "+221 77 111 22 33",
            email: "contact@lasomone-ecolodge.sn",
            services: ["Wifi gratuit", "Piscine", "Excursions en pirogue", "Cuisine locale bio"]
        },
        {
            id: 2,
            name: "Ousmane Ba - Guide Officiel Gorée & Dakar",
            category: "guide",
            categoryLabel: "Guide Touristique Certifié",
            region: "Dakar",
            location: "Île de Gorée, Dakar",
            rating: 5.0,
            price: "25 000 FCFA / journée",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
            description: "Passionné par l'histoire du Sénégal et de Gorée, Ousmane vous fait vivre des circuits culturels vivants et chaleureux.",
            phone: "+221 77 555 44 33",
            email: "ousmane.guide@teranga.sn",
            services: ["Visite de Gorée", "Musée des Civilisations Noires", "Circuit Marché Soumbédioune", "Français & Anglais"]
        },
        {
            id: 3,
            name: "Restaurant Chez Loutcha",
            category: "restauration",
            categoryLabel: "Gastronomie Sénégalaise",
            region: "Dakar",
            location: "Plateau, Dakar",
            rating: 4.8,
            price: "Plats dès 3 500 FCFA",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
            description: "L'institution incontournable de Dakar pour savourer le meilleur Thiéboudienne, Yassa au poulet et Caldou frais.",
            phone: "+221 33 821 00 11",
            email: "loutcha@restaurant-dakar.sn",
            services: ["Cuisine traditionnelle", "Service continu", "Jus locaux (Bissap, Bouye, Corossol)", "Terrasse"]
        },
        {
            id: 4,
            name: "Teranga Express & Excursions",
            category: "transport",
            categoryLabel: "Transport Touristique",
            region: "Dakar",
            location: "Aéroport AIBD / Dakar / Saly",
            rating: 4.7,
            price: "Transfert AIBD dès 20 000 FCFA",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
            description: "Service de transport VIP et navettes climatisées de haute qualité avec chauffeurs professionnels expérimentés.",
            phone: "+221 78 999 88 77",
            email: "booking@terangaexpress.sn",
            services: ["Transferts Aéroport 24/7", "Chauffeur privé", "Minibus pour groupes", "Climatisation VIP"]
        },
        {
            id: 5,
            name: "Village des Artisans de Soumbédioune",
            category: "artisanat",
            categoryLabel: "Culture & Artisanat",
            region: "Dakar",
            location: "Corniche Ouest, Dakar",
            rating: 4.6,
            price: "Entrée Libre",
            image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
            description: "Regroupement de plus de 100 artistes sculpteurs, bijoutiers, maroquiniers et peintres sous le verre.",
            phone: "+221 33 822 45 67",
            email: "artisanat@soumbedioune.sn",
            services: ["Sculptures sur bois", "Bijoux en argent", "Tableaux de sable", "Ateliers de démonstration"]
        },
        {
            id: 6,
            name: "Hôtel Résidence La Saint-Louisienne",
            category: "hebergement",
            categoryLabel: "Hôtel Colonial & de Charme",
            region: "Saint-Louis",
            location: "Île de Saint-Louis",
            rating: 4.8,
            price: "38 000 FCFA / nuit",
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
            description: "Au cœur de la ville historique, une demeure coloniale restaurée avec goût offrant une vue splendide sur le fleuve.",
            phone: "+221 33 961 12 34",
            email: "info@saintlouisienne.sn",
            services: ["Vue sur le fleuve", "Restaurant gastronomique", "Location de vélos", "Organisations de tours en caleche"]
        },
        {
            id: 7,
            name: "Casamance Ecotour & Pirogues",
            category: "guide",
            categoryLabel: "Agence d'Excursion & Guide",
            region: "Casamance",
            location: "Ziguinchor & Cap Skirring",
            rating: 4.9,
            price: "Excursion dès 18 000 FCFA",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
            description: "Spécialiste des bolongs et des forêts de baobabs géants de la Casamance. Immersion culturelle et observation de la faune.",
            phone: "+221 77 333 22 11",
            email: "contact@casamance-ecotour.sn",
            services: ["Balades en pirogue", "Visite des villages Diolas", "Pêche sportive", "Circuit ornithologique"]
        },
        {
            id: 8,
            name: "Le Lagoon 1 Restaurant",
            category: "restauration",
            categoryLabel: "Restaurant Bord de Mer",
            region: "Dakar",
            location: "Plage de la Petite Corniche",
            rating: 4.7,
            price: "Plats dès 9 000 FCFA",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
            description: "Restaurant sur ponton au-dessus de l'océan Atlantique. Spécialités de poissons frais et fruits de mer grillés.",
            phone: "+221 33 821 28 29",
            email: "reservation@lelagoon.sn",
            services: ["Poisson frais grillé", "Ponton privé", "Coucher de soleil féerique", "Cocktails tropicaux"]
        },
        {
            id: 9,
            name: "Campement Solidaire de Mar Lodj",
            category: "hebergement",
            categoryLabel: "Éco-Campement Solidaire",
            region: "Sine-Saloum",
            location: "Île de Mar Lodj, Sine Saloum",
            rating: 4.9,
            price: "28 000 FCFA en pension complète",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
            description: "Campement communautaire géré par les habitants de l'île. Cadre enchanteur sous les mangroves du Saloum.",
            phone: "+221 77 645 32 10",
            email: "marlodj.campement@teranga.sn",
            services: ["Pension complète", "Soirées tam-tam", "Baignade rivière", "Randonnées pédestres"]
        },
        {
            id: 10,
            name: "Musée Théodore Monod & IFAN",
            category: "artisanat",
            categoryLabel: "Musée & Culture",
            region: "Dakar",
            location: "Place Soweto, Dakar",
            rating: 4.8,
            price: "2 000 FCFA",
            image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=600&q=80",
            description: "Un des plus anciens musées d'art d'Afrique de l'Ouest regroupant plus de 9 000 objets d'art traditionnel africain.",
            phone: "+221 33 825 98 90",
            email: "ifan@ucad.edu.sn",
            services: ["Expositions temporaires", "Visites guidées", "Masques et statues d'Afrique", "Boutique souvenirs"]
        },
        {
            id: 11,
            name: "Royam Hotel Saly",
            category: "hebergement",
            categoryLabel: "Hôtel Balnéaire 4 Étoiles",
            region: "Thies",
            location: "Saly Portudal",
            rating: 4.7,
            price: "65 000 FCFA / nuit",
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
            description: "Bungalows nichés dans un jardin tropical bordant la plage de Saly. Ambiance chaleureuse et confort haut de gamme.",
            phone: "+221 33 957 20 20",
            email: "resas@royam-hotel.sn",
            services: ["Plage privée", "Spa & Massages", "Piscine lagon", "Spectacles du soir"]
        },
        {
            id: 12,
            name: "Safari Bandia Excursions",
            category: "transport",
            categoryLabel: "Circuit & Safari 4x4",
            region: "Thies",
            location: "Réserve de Bandia, Mbour",
            rating: 4.9,
            price: "22 000 FCFA / personne",
            image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=600&q=80",
            description: "Observez rhinocéros, girafes, zèbres et autruches en liberté totale dans un parc naturel préservé de 3500 hectares.",
            phone: "+221 33 958 50 00",
            email: "bandia@safari-senegal.sn",
            services: ["Safari en 4x4 ouvert", "Guide ranger dédié", "Restaurant au bord de la mare aux crocodiles"]
        }
    ];

    // State
    let currentCategory = 'all';
    let currentSearchQuery = '';
    let currentRegion = 'all';
    let favorites = JSON.parse(localStorage.getItem('teranga_favs')) || [];

    // DOM Elements
    const actorsContainer = document.getElementById('actorsContainer');
    const noResults = document.getElementById('noResults');
    const categoryFilters = document.getElementById('categoryFilters');
    const searchInput = document.getElementById('searchInput');
    const regionSelect = document.getElementById('regionSelect');
    const searchBtn = document.getElementById('searchBtn');
    const resetSearchBtn = document.getElementById('resetSearchBtn');
    const favBadge = document.getElementById('favBadge');
    const btnFavoriteList = document.getElementById('btnFavoriteList');
    const actorModal = document.getElementById('actorModal');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const bookingForm = document.getElementById('bookingForm');
    const newsletterForm = document.getElementById('newsletterForm');

    // ------------------------------------------------------------------
    // Render Functions
    // ------------------------------------------------------------------
    function updateFavBadge() {
        if (favBadge) {
            favBadge.textContent = favorites.length;
        }
    }

    function renderActors() {
        const filtered = tourismActors.filter(actor => {
            const matchesCategory = (currentCategory === 'all') || (actor.category === currentCategory);
            const matchesRegion = (currentRegion === 'all') || (actor.region === currentRegion);

            const q = currentSearchQuery.toLowerCase().trim();
            const matchesSearch = !q ||
                actor.name.toLowerCase().includes(q) ||
                actor.location.toLowerCase().includes(q) ||
                actor.description.toLowerCase().includes(q) ||
                actor.categoryLabel.toLowerCase().includes(q);

            return matchesCategory && matchesRegion && matchesSearch;
        });

        if (filtered.length === 0) {
            actorsContainer.innerHTML = '';
            noResults.classList.remove('hidden');
            return;
        }

        noResults.classList.add('hidden');
        actorsContainer.innerHTML = filtered.map(actor => {
            const isFav = favorites.includes(actor.id);
            return `
                <div class="actor-card" data-id="${actor.id}">
                    <div class="actor-image-wrap">
                        <img src="${actor.image}" alt="${actor.name}" loading="lazy">
                        <span class="actor-badge-category">${actor.categoryLabel}</span>
                        <button class="fav-btn ${isFav ? 'active' : ''}" data-fav-id="${actor.id}" title="Ajouter aux favoris">
                            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                        </button>
                    </div>
                    <div class="actor-body">
                        <span class="actor-location"><i class="fa-solid fa-location-dot"></i> ${actor.location}</span>
                        <h3 class="actor-name">${actor.name}</h3>
                        <p class="actor-desc">${actor.description}</p>
                        <div class="actor-meta">
                            <div class="actor-rating">
                                <i class="fa-solid fa-star"></i>
                                <span>${actor.rating}</span>
                            </div>
                            <div class="actor-price">${actor.price}</div>
                        </div>
                    </div>
                    <div class="actor-card-footer">
                        <button class="btn btn-sm btn-outline view-actor-btn" data-id="${actor.id}" style="flex:1;">
                            <i class="fa-solid fa-eye"></i> Détails
                        </button>
                        <a href="#contact" class="btn btn-sm btn-primary contact-actor-btn" data-name="${actor.name}" style="flex:1;">
                            <i class="fa-solid fa-envelope"></i> Contact
                        </a>
                    </div>
                </div>
            `;
        }).join('');

        // Attach Card Action Events
        document.querySelectorAll('.fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.favId, 10);
                toggleFavorite(id);
            });
        });

        document.querySelectorAll('.view-actor-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id, 10);
                openActorModal(id);
            });
        });

        document.querySelectorAll('.contact-actor-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.dataset.name;
                const messageBox = document.getElementById('contactMessage');
                if (messageBox) {
                    messageBox.value = `Bonjour, je souhaite obtenir des informations concernant : ${name}.`;
                    messageBox.focus();
                }
            });
        });
    }

    function toggleFavorite(id) {
        if (favorites.includes(id)) {
            favorites = favorites.filter(favId => favId !== id);
            showToast("Acteur retiré de vos favoris", "info");
        } else {
            favorites.push(id);
            showToast("Acteur ajouté à vos favoris !", "success");
        }
        localStorage.setItem('teranga_favs', JSON.stringify(favorites));
        updateFavBadge();
        renderActors();
    }

    function openActorModal(id) {
        const actor = tourismActors.find(a => a.id === id);
        if (!actor) return;

        modalBody.innerHTML = `
            <div style="margin-bottom:1.5rem; position:relative; height:240px; border-radius:12px; overflow:hidden;">
                <img src="${actor.image}" alt="${actor.name}" style="width:100%; height:100%; object-fit:cover;">
                <span class="actor-badge-category">${actor.categoryLabel}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; margin-bottom:1rem;">
                <div>
                    <span style="color:var(--accent-gold); font-weight:600; font-size:0.9rem;">
                        <i class="fa-solid fa-location-dot"></i> ${actor.location}
                    </span>
                    <h2 style="font-size:1.75rem; margin-top:0.2rem; color:#fff;">${actor.name}</h2>
                </div>
                <div style="background:rgba(16,185,129,0.15); border:1px solid var(--primary); padding:0.4rem 0.8rem; border-radius:8px; text-align:center;">
                    <div style="color:var(--primary); font-weight:800; font-size:1.1rem;">★ ${actor.rating}</div>
                    <span style="font-size:0.7rem; color:var(--text-muted);">Note Vérifiée</span>
                </div>
            </div>
            <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6; margin-bottom:1.5rem;">${actor.description}</p>

            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); padding:1rem; border-radius:12px; margin-bottom:1.5rem;">
                <h4 style="font-size:0.95rem; margin-bottom:0.8rem; color:var(--primary);">Services & Offres :</h4>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                    ${actor.services.map(s => `<span style="background:var(--bg-dark); border:1px solid var(--border-color); padding:0.3rem 0.7rem; border-radius:20px; font-size:0.8rem; color:var(--text-main);"><i class="fa-solid fa-check" style="color:var(--primary); font-size:0.7rem;"></i> ${s}</span>`).join('')}
                </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
                <div style="background:var(--bg-dark); padding:0.8rem; border-radius:8px; border:1px solid var(--border-color);">
                    <small style="color:var(--text-muted); display:block;">Téléphone Direct :</small>
                    <a href="tel:${actor.phone}" style="color:var(--primary); font-weight:700;">${actor.phone}</a>
                </div>
                <div style="background:var(--bg-dark); padding:0.8rem; border-radius:8px; border:1px solid var(--border-color);">
                    <small style="color:var(--text-muted); display:block;">Tarification :</small>
                    <strong style="color:#fff;">${actor.price}</strong>
                </div>
            </div>

            <a href="#contact" class="btn btn-primary btn-block btn-glow modal-reserve-btn" data-actor="${actor.name}">
                <i class="fa-solid fa-calendar-check"></i> Effectuer une demande de réservation
            </a>
        `;

        actorModal.classList.remove('hidden');

        document.querySelector('.modal-reserve-btn').addEventListener('click', () => {
            actorModal.classList.add('hidden');
            const messageBox = document.getElementById('contactMessage');
            if (messageBox) {
                messageBox.value = `Demande de réservation pour : ${actor.name}`;
            }
        });
    }

    // ------------------------------------------------------------------
    // Event Listeners & Interactions
    // ------------------------------------------------------------------

    // Category Filter Pills
    if (categoryFilters) {
        categoryFilters.addEventListener('click', (e) => {
            const btn = e.target.closest('.pill-btn');
            if (!btn) return;

            document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentCategory = btn.dataset.category;
            renderActors();
        });
    }

    // Search and Region Trigger
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            currentSearchQuery = searchInput.value;
            currentRegion = regionSelect.value;
            renderActors();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                currentSearchQuery = searchInput.value;
                currentRegion = regionSelect.value;
                renderActors();
            }
        });
    }

    if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', () => {
            currentCategory = 'all';
            currentRegion = 'all';
            currentSearchQuery = '';
            if (searchInput) searchInput.value = '';
            if (regionSelect) regionSelect.value = 'all';
            document.querySelectorAll('.pill-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.category === 'all');
            });
            renderActors();
        });
    }

    // Quick Search Tags
    document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.dataset.search;
            if (searchInput) searchInput.value = query;
            currentSearchQuery = query;
            renderActors();
            document.getElementById('acteurs').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Destination Card Region Quick Filter
    document.querySelectorAll('.filter-region-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const region = btn.dataset.region;
            currentRegion = region;
            if (regionSelect) regionSelect.value = region;
            renderActors();
        });
    });

    // Open Booking from Experience Cards
    document.querySelectorAll('.open-booking-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const subject = btn.dataset.subject;
            const messageBox = document.getElementById('contactMessage');
            if (messageBox) {
                messageBox.value = `Réservation d'expérience : ${subject}`;
            }
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Favorites List Modal / Filter Trigger
    if (btnFavoriteList) {
        btnFavoriteList.addEventListener('click', () => {
            if (favorites.length === 0) {
                showToast("Votre liste de favoris est vide.", "info");
                return;
            }
            // Temporarily filter by favs
            const favActors = tourismActors.filter(a => favorites.includes(a.id));
            actorsContainer.innerHTML = favActors.map(actor => `
                <div class="actor-card" data-id="${actor.id}">
                    <div class="actor-image-wrap">
                        <img src="${actor.image}" alt="${actor.name}">
                        <span class="actor-badge-category">Favori</span>
                    </div>
                    <div class="actor-body">
                        <span class="actor-location"><i class="fa-solid fa-location-dot"></i> ${actor.location}</span>
                        <h3 class="actor-name">${actor.name}</h3>
                        <p class="actor-desc">${actor.description}</p>
                    </div>
                    <div class="actor-card-footer">
                        <button class="btn btn-sm btn-outline view-actor-btn" data-id="${actor.id}" style="flex:1;">
                            <i class="fa-solid fa-eye"></i> Voir
                        </button>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.view-actor-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    openActorModal(parseInt(btn.dataset.id, 10));
                });
            });

            document.getElementById('acteurs').scrollIntoView({ behavior: 'smooth' });
            showToast(`Affichage de vos ${favorites.length} acteurs favoris`, "success");
        });
    }

    // Modal Close
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            actorModal.classList.add('hidden');
        });
    }

    if (actorModal) {
        actorModal.addEventListener('click', (e) => {
            if (e.target === actorModal) {
                actorModal.classList.add('hidden');
            }
        });
    }

    // Mobile Menu Toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Form Submissions
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast("Votre demande a été transmise avec succès ! Un conseiller vous recontactera sous 24h.", "success");
            bookingForm.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast("Merci ! Vous êtes désormais inscrit à la newsletter Teranga.", "success");
            newsletterForm.reset();
        });
    }

    // Toast Notification Helper
    function showToast(message, type = "info") {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast';

        let icon = "fa-circle-info";
        if (type === "success") icon = "fa-circle-check";

        toast.innerHTML = `<i class="fa-solid ${icon}" style="color:var(--primary);"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Initialize
    updateFavBadge();
    renderActors();
});
