/* ==========================================================================
   TERANGA TOURISME SÉNÉGAL — INTERACTIVE STAKEHOLDERS PORTAL & PASS WALLET
   ========================================================================== */

// --- Tourism Stakeholders Dataset ---
const tourismActors = [
    {
        id: "actor-1",
        name: "Teranga Safaris Senegal",
        category: "agence",
        categoryLabel: "Agence de Voyage",
        region: "Dakar",
        regionLabel: "Dakar & Gorée",
        rating: 4.9,
        reviewsCount: 128,
        priceFormatted: "À partir de 25 000 CFA",
        defaultPrice: 25000,
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
        description: "Agence leader spécialisée dans les circuits personnalisés à travers tout le Sénégal : Lac Rose, Île de Gorée, Bandia, et désert de Lompoul.",
        tags: ["Excursions 4x4", "Circuit Gorée", "Transfert AIBD", "Certifié MINTOUR"],
        services: [
            "Visite guidée historique de l'Île de Gorée",
            "Excursion safari Réserve de Bandia avec guide privatif",
            "Traversée et safari photo au Lac Rose",
            "Service navette climatisée depuis l'Aéroport AIBD"
        ],
        phone: "+221 77 645 10 20",
        email: "reservation@terangasafaris.sn",
        verified: true
    },
    {
        id: "actor-2",
        name: "Ecolodge de Lompoul",
        category: "hotel",
        categoryLabel: "Hôtel & Éco-Lodge",
        region: "Thies",
        regionLabel: "Lompoul / Louga",
        rating: 4.8,
        reviewsCount: 94,
        priceFormatted: "45 000 CFA / Nuit",
        defaultPrice: 45000,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        description: "Hébergement éco-responsable au cœur des dromadaires et des dunes de sable ocre du désert de Lompoul. Tentes mauritaniennes de luxe.",
        tags: ["Éco-Lodge", "Désert", "Dîner sous les étoiles", "Balade Dromadaire"],
        services: [
            "Nuit sous tente mauritanienne de charme avec lit king size",
            "Dîner gastronomique sénégalais autour du feu de camp",
            "Balade à dos de dromadaire au coucher de soleil",
            "Spectacle de percussions et contes traditionnels"
        ],
        phone: "+221 78 120 44 00",
        email: "booking@lompoul-ecolodge.sn",
        verified: true
    },
    {
        id: "actor-3",
        name: "Mamadou Ndiaye — Guide Gorée",
        category: "guide",
        categoryLabel: "Guide National Agréé",
        region: "Dakar",
        regionLabel: "Île de Gorée",
        rating: 5.0,
        reviewsCount: 210,
        priceFormatted: "15 000 CFA / Demi-journée",
        defaultPrice: 15000,
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
        description: "Guide conférencier natif de Gorée avec 15 ans d'expérience. Passionné d'histoire, d'architecture coloniale et de la mémoire de la traite négrière.",
        tags: ["Guide Gorée", "Historien", "Bilingue Fr/En", "Maison des Esclaves"],
        services: [
            "Visite guidée immersive de la Maison des Esclaves",
            "Découverte des ateliers d'artistes peintres sur sable",
            "Circuit architectural du Castel et des ruelles fleuries",
            "Recommandation des meilleurs restaurants locaux"
        ],
        phone: "+221 70 889 12 34",
        email: "mamadou.goree.guide@gmail.com",
        verified: true
    },
    {
        id: "actor-4",
        name: "Teranga Express Shuttle",
        category: "transport",
        categoryLabel: "Transport Touristique",
        region: "Dakar",
        regionLabel: "AIBD • Dakar • Saly",
        rating: 4.7,
        reviewsCount: 86,
        priceFormatted: "20 000 CFA / Trajet",
        defaultPrice: 20000,
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        description: "Flotte de SUV et Minibus VIP récents avec chauffeurs professionnels expérimentés pour vos navettes aéroport et inter-villes.",
        tags: ["Chauffeur Privé", "Climatisation VIP", "Wifi à bord", "AIBD Direct"],
        services: [
            "Transfert privatif Aéroport AIBD ➔ Dakar ou Petite Côte",
            "Mise à disposition journée avec chauffeur trilingue",
            "Véhicules récents avec Wifi gratuit et rafraîchissements",
            "Suivi des vols en temps réel"
        ],
        phone: "+221 77 300 11 22",
        email: "express@teranga-transport.sn",
        verified: true
    },
    {
        id: "actor-5",
        name: "Maison des Artisans Soumbédioune",
        category: "artisanat",
        categoryLabel: "Artisanat & Souvenirs",
        region: "Dakar",
        regionLabel: "Corniche Ouest, Dakar",
        rating: 4.8,
        reviewsCount: 150,
        priceFormatted: "Articles dès 2 000 CFA",
        defaultPrice: 10000,
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        description: "Collectif d'artisans sculpteurs, maroquiniers et bijoutiers traditionnels du Sénégal. Objets authentiques sous label de qualité garantie.",
        tags: ["Sculpture Bois", "Bijoux Argent", "Maroquinerie", "Batik Sénégalais"],
        services: [
            "Sculptures sur bois de teck et d'ébène certifiées",
            "Créations de bijoux en filigrane d'argent",
            "Ateliers démonstration de tissage et batik",
            "Emballage sécurisé de protection pour transports aériens"
        ],
        phone: "+221 33 821 09 09",
        email: "soumbedioune.art@culture.sn",
        verified: true
    },
    {
        id: "actor-6",
        name: "Casamance Évasion & Lodges",
        category: "agence",
        categoryLabel: "Agence & Ecotourisme",
        region: "Casamance",
        regionLabel: "Ziguinchor & Cap Skirring",
        rating: 4.9,
        reviewsCount: 112,
        priceFormatted: "À partir de 35 000 CFA",
        defaultPrice: 35000,
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
        description: "Spécialiste du tourisme vert en Casamance. Excursions en pirogue dans le bolong, visites des cases à impluvium d'Enampore et plages de Cap Skirring.",
        tags: ["Bolongs", "Cap Skirring", "Case à Impluvium", "Randonnée Pirogue"],
        services: [
            "Circuit en pirogue motorisée dans les bolongs de Carabane",
            "Nuitée en gîte communautaire traditionnel",
            "Rencontre avec le Roi d'Oussouye et traditions Diolas",
            "Dégustation de crevettes grillées et jus de ditakh"
        ],
        phone: "+221 77 550 33 44",
        email: "contact@casamance-evasion.sn",
        verified: true
    },
    {
        id: "actor-7",
        name: "Hôtel Résidence Saint-Louis",
        category: "hotel",
        categoryLabel: "Hôtel Historique",
        region: "Saint-Louis",
        regionLabel: "Île de Saint-Louis",
        rating: 4.8,
        reviewsCount: 78,
        priceFormatted: "55 000 CFA / Nuit",
        defaultPrice: 55000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Demeure coloniale restaurée du XIXe siècle située au cœur du centre historique classé UNESCO de Saint-Louis du Sénégal.",
        tags: ["Style Colonial", "UNESCO", "Vue Fleuve", "Restaurant Gastronomique"],
        services: [
            "Chambres climatisées au style vintage d'époque",
            "Petit-déjeuner buffet sur patio fleuri",
            "Proximité immédiate du Pont Faidherbe",
            "Organisation d'excursions au Parc National du Djoudj"
        ],
        phone: "+221 33 961 12 12",
        email: "hotel@residence-saintlouis.sn",
        verified: true
    },
    {
        id: "actor-8",
        name: "Ibrahima Diallo — Guide Djoudj",
        category: "guide",
        categoryLabel: "Guide Ornithologue Agréé",
        region: "Saint-Louis",
        regionLabel: "Parc du Djoudj",
        rating: 4.9,
        reviewsCount: 63,
        priceFormatted: "20 000 CFA / Visite",
        defaultPrice: 20000,
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        description: "Expert ornithologue certifié du 3e sanctuaire aviaire au monde (Djoudj). Passionné par le grand pélican blanc et les flamants roses.",
        tags: ["Ornithologie", "Pélicans", "Parc Djoudj", "Piroguer Pro"],
        services: [
            "Safari en pirogue au Nichoir des Pélicans Blancs",
            "Observation des espèces migratrices avec jumelles Pro",
            "Explication de la biodiversité du delta du Fleuve",
            "Prise de vue photo animalière assistée"
        ],
        phone: "+221 76 400 90 80",
        email: "ibrahima.djoudj@nature.sn",
        verified: true
    }
];

// --- State Management ---
let state = {
    walletBalance: 50000,
    searchQuery: "",
    selectedRegion: "",
    selectedCategory: "all",
    transactions: [
        {
            id: "tx-101",
            type: "deposit",
            title: "Recharge Initiale Pass Tourisme",
            amount: 50000,
            date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
        }
    ]
};

// --- DOM References ---
const searchInput = document.getElementById('searchInput');
const regionFilter = document.getElementById('regionFilter');
const categoryFilter = document.getElementById('categoryFilter');
const searchBtn = document.getElementById('searchBtn');
const categoryTabs = document.getElementById('categoryTabs');
const actorsGrid = document.getElementById('actorsGrid');
const noResults = document.getElementById('noResults');
const actorCountBadge = document.getElementById('actorCountBadge');
const navWalletBalance = document.getElementById('navWalletBalance');
const walletDisplayAmount = document.getElementById('walletDisplayAmount');
const txModalBalance = document.getElementById('txModalBalance');
const resWalletBalance = document.getElementById('resWalletBalance');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderActors();
    updateWalletDisplays();
    setupEventListeners();
    populateActorSelectOptions();
});

// --- Event Listeners Setup ---
function setupEventListeners() {
    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.toLowerCase().trim();
            renderActors();
        });
    }

    // Region Select Filter
    if (regionFilter) {
        regionFilter.addEventListener('change', (e) => {
            state.selectedRegion = e.target.value;
            renderActors();
        });
    }

    // Category Select Filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            state.selectedCategory = e.target.value || "all";
            setActiveCategoryTab(state.selectedCategory);
            renderActors();
        });
    }

    // Category Tabs Buttons
    if (categoryTabs) {
        categoryTabs.addEventListener('click', (e) => {
            const tabBtn = e.target.closest('.tab-btn');
            if (!tabBtn) return;

            const category = tabBtn.dataset.category;
            state.selectedCategory = category;
            setActiveCategoryTab(category);

            if (categoryFilter) {
                categoryFilter.value = category === "all" ? "" : category;
            }

            renderActors();
        });
    }

    // Keyboard shortcut for search bar (Cmd+K / Ctrl+K)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) searchInput.focus();
        }
    });

    // Payment method selection cards
    const methodCards = document.querySelectorAll('.method-card');
    methodCards.forEach(card => {
        card.addEventListener('click', () => {
            methodCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const radio = card.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    // Dock Navigation Switching
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('wallet-dock')) return;
            dockItems.forEach(d => d.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function setActiveCategoryTab(category) {
    const tabs = document.querySelectorAll('.category-tabs .tab-btn');
    tabs.forEach(tab => {
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// --- Render Stakeholders Grid ---
function renderActors() {
    if (!actorsGrid) return;

    const filtered = tourismActors.filter(actor => {
        const matchesQuery = !state.searchQuery ||
            actor.name.toLowerCase().includes(state.searchQuery) ||
            actor.description.toLowerCase().includes(state.searchQuery) ||
            actor.regionLabel.toLowerCase().includes(state.searchQuery) ||
            actor.tags.some(t => t.toLowerCase().includes(state.searchQuery));

        const matchesRegion = !state.selectedRegion || actor.region === state.selectedRegion;

        const matchesCategory = state.selectedCategory === "all" || actor.category === state.selectedCategory;

        return matchesQuery && matchesRegion && matchesCategory;
    });

    // Update count badge
    if (actorCountBadge) {
        actorCountBadge.textContent = `${filtered.length} Acteur${filtered.length > 1 ? 's' : ''} disponible${filtered.length > 1 ? 's' : ''}`;
    }

    if (filtered.length === 0) {
        actorsGrid.classList.add('hidden');
        if (noResults) noResults.classList.remove('hidden');
        return;
    }

    actorsGrid.classList.remove('hidden');
    if (noResults) noResults.classList.add('hidden');

    actorsGrid.innerHTML = filtered.map(actor => `
        <div class="actor-card">
            <div class="card-img-wrapper" style="background-image: url('${actor.image}');">
                <div class="card-img-overlay"></div>
                <span class="card-badge-category">${actor.categoryLabel}</span>
                ${actor.verified ? `<span class="card-badge-verified" title="Acteur Agréé Teranga"><i class="fa-solid fa-check"></i></span>` : ''}
                <div class="card-location">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>${actor.regionLabel}</span>
                </div>
            </div>

            <div class="card-content">
                <div class="card-header-row">
                    <h3 class="card-title">${actor.name}</h3>
                    <div class="card-rating">
                        <i class="fa-solid fa-star"></i>
                        <span>${actor.rating}</span>
                    </div>
                </div>

                <p class="card-desc">${actor.description}</p>

                <div class="card-tags">
                    ${actor.tags.map(tag => `<span class="tag-item"># ${tag}</span>`).join('')}
                </div>

                <div class="card-footer-row">
                    <div class="card-price">
                        <span class="card-price-label">Tarif Indicatif</span>
                        <span class="card-price-val">${actor.priceFormatted}</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-outline btn-sm" onclick="openActorModal('${actor.id}')">
                            <i class="fa-solid fa-eye"></i>
                            Détails
                        </button>
                        <button class="btn btn-neon btn-sm" onclick="openReservationModal('${actor.id}')">
                            <i class="fa-solid fa-bolt"></i>
                            Payer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function resetFilters() {
    state.searchQuery = "";
    state.selectedRegion = "";
    state.selectedCategory = "all";

    if (searchInput) searchInput.value = "";
    if (regionFilter) regionFilter.value = "";
    if (categoryFilter) categoryFilter.value = "";

    setActiveCategoryTab("all");
    renderActors();
    showToast("Filtres réinitialisés.", "fa-rotate-left");
}

// --- Wallet & State Updates ---
function updateWalletDisplays() {
    const formatted = `${state.walletBalance.toLocaleString('fr-FR')} CFA`;
    if (navWalletBalance) navWalletBalance.textContent = formatted;
    if (walletDisplayAmount) walletDisplayAmount.textContent = formatted;
    if (txModalBalance) txModalBalance.textContent = formatted;
    if (resWalletBalance) resWalletBalance.textContent = formatted;
}

function populateActorSelectOptions() {
    const select = document.getElementById('resActorSelect');
    if (!select) return;

    select.innerHTML = `<option value="">Choisissez un acteur...</option>` +
        tourismActors.map(a => `<option value="${a.id}">${a.name} (${a.categoryLabel} — ${a.region})</option>`).join('');
}

// --- Modals Management ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function openWalletModal() {
    openTransactionsModal();
}

function openActorModal(actorId) {
    const actor = tourismActors.find(a => a.id === actorId);
    if (!actor) return;

    document.getElementById('modalActorBanner').style.backgroundImage = `url('${actor.image}')`;
    document.getElementById('modalActorCategoryTag').textContent = actor.categoryLabel;
    document.getElementById('modalActorName').textContent = actor.name;
    document.getElementById('modalActorRegion').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${actor.regionLabel}, Sénégal`;
    document.getElementById('modalActorRating').innerHTML = `<i class="fa-solid fa-star"></i> ${actor.rating} (${actor.reviewsCount} avis)`;
    document.getElementById('modalActorDesc').textContent = actor.description;

    const servicesList = document.getElementById('modalActorServices');
    servicesList.innerHTML = actor.services.map(s => `<li><i class="fa-solid fa-check-circle"></i> ${s}</li>`).join('');

    document.getElementById('modalActorPhone').textContent = actor.phone;
    document.getElementById('modalActorEmail').textContent = actor.email;

    const bookBtn = document.getElementById('modalActorBookBtn');
    bookBtn.onclick = () => {
        closeModal('actorModal');
        openReservationModal(actor.id);
    };

    openModal('actorModal');
}

function openReservationModal(actorId = null) {
    const select = document.getElementById('resActorSelect');
    if (select && actorId) {
        select.value = actorId;
        updateReservationAmount();
    }

    // Set default date to tomorrow
    const dateInput = document.getElementById('resDate');
    if (dateInput && !dateInput.value) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    openModal('reservationModal');
}

function updateReservationAmount() {
    const select = document.getElementById('resActorSelect');
    const guestsInput = document.getElementById('resGuests');
    const amountInput = document.getElementById('resAmount');

    if (!select || !amountInput) return;

    const actor = tourismActors.find(a => a.id === select.value);
    if (actor) {
        const guests = parseInt(guestsInput.value) || 1;
        const total = actor.defaultPrice * guests;
        amountInput.value = total;
    } else {
        amountInput.value = "";
    }
}

function handleReservationSubmit(e) {
    e.preventDefault();

    const select = document.getElementById('resActorSelect');
    const amountInput = document.getElementById('resAmount');
    const amount = parseInt(amountInput.value);

    const actor = tourismActors.find(a => a.id === select.value);
    if (!actor) {
        showToast("Veuillez choisir un acteur valide.", "fa-circle-exclamation");
        return;
    }

    if (state.walletBalance < amount) {
        showToast("Solde insuffisant dans votre Pass Tourisme. Veuillez le recharger !", "fa-triangle-exclamation");
        closeModal('reservationModal');
        openDepositModal();
        return;
    }

    // Deduct balance and record transaction
    state.walletBalance -= amount;
    state.transactions.unshift({
        id: `tx-${Date.now()}`,
        type: "payment",
        title: `Paiement : ${actor.name}`,
        amount: -amount,
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
    });

    updateWalletDisplays();
    closeModal('reservationModal');
    showToast(`Paiement de ${amount.toLocaleString('fr-FR')} CFA réussi auprès de ${actor.name} !`, "fa-circle-check");
}

function openDepositModal() {
    openModal('depositModal');
}

function setDepositAmount(amount) {
    const input = document.getElementById('depositAmount');
    if (input) input.value = amount;
}

function handleDepositSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('depositAmount');
    const amount = parseInt(input.value);

    if (isNaN(amount) || amount < 1000) {
        showToast("Veuillez saisir un montant valide (min 1 000 CFA)", "fa-triangle-exclamation");
        return;
    }

    state.walletBalance += amount;
    state.transactions.unshift({
        id: `tx-${Date.now()}`,
        type: "deposit",
        title: "Recharge Pass Tourisme",
        amount: amount,
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
    });

    updateWalletDisplays();
    closeModal('depositModal');
    showToast(`Recharge de ${amount.toLocaleString('fr-FR')} CFA effectuée avec succès !`, "fa-bolt");
}

function openTransactionsModal() {
    const txListContainer = document.getElementById('transactionsList');
    if (txListContainer) {
        if (state.transactions.length === 0) {
            txListContainer.innerHTML = `<p class="text-muted" style="text-align:center; padding: 20px;">Aucune transaction enregistrée.</p>`;
        } else {
            txListContainer.innerHTML = state.transactions.map(tx => `
                <div class="tx-item">
                    <div class="tx-icon ${tx.type}">
                        <i class="fa-solid ${tx.type === 'deposit' ? 'fa-arrow-down-left' : 'fa-receipt'}"></i>
                    </div>
                    <div class="tx-details">
                        <div class="tx-title">${tx.title}</div>
                        <div class="tx-date">${tx.date}</div>
                    </div>
                    <div class="tx-amount ${tx.amount > 0 ? 'positive' : 'negative'}">
                        ${tx.amount > 0 ? '+' : ''}${tx.amount.toLocaleString('fr-FR')} CFA
                    </div>
                </div>
            `).join('');
        }
    }

    openModal('transactionsModal');
}

function bookCircuit(circuitName, price) {
    if (state.walletBalance < price) {
        showToast(`Solde insuffisant pour réserver "${circuitName}". Rechargez votre Pass.`, "fa-triangle-exclamation");
        openDepositModal();
        return;
    }

    state.walletBalance -= price;
    state.transactions.unshift({
        id: `tx-${Date.now()}`,
        type: "payment",
        title: `Réservation Circuit : ${circuitName}`,
        amount: -price,
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
    });

    updateWalletDisplays();
    showToast(`Réservation de "${circuitName}" confirmée pour ${price.toLocaleString('fr-FR')} CFA !`, "fa-circle-check");
}

// --- Toast Notification Helper ---
function showToast(message, iconClass = "fa-circle-check") {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
