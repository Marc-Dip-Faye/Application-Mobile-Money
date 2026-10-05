/**
 * TerraAfrika Tourism Platform & Digital Wallet System
 */

// Tourism Actors Dataset
const TOURISM_ACTORS = [
    {
        id: 1,
        name: "Écolodge des Niayes & Lac Rose",
        category: "hotel",
        categoryLabel: "Hôtel & Écolodge",
        region: "Dakar",
        location: "Lac Rose, Région de Dakar",
        rating: 4.9,
        reviewsCount: 84,
        price: 45000,
        priceFormatted: "45 000 CFA / nuit",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Hébergement éco-responsable niché au bord des dunes du Lac Rose. Bungalows traditionnels en matériaux locaux, énergie solaire et gastronomie locale bio.",
        tags: ["Éco-Lodge", "Solaire", "Piscine", "Vue Lac", "Petit-déjeuner inclus"],
        phone: "776123456"
    },
    {
        id: 2,
        name: "Ousmane Diallo - Guide Gorée & Dakar",
        category: "guide",
        categoryLabel: "Guide & Agence",
        region: "Dakar",
        location: "Île de Gorée & Dakar Plateau",
        rating: 5.0,
        reviewsCount: 120,
        price: 25000,
        priceFormatted: "25 000 CFA / journée",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        description: "Guide culturel national certifié par le Ministère du Tourisme. Découverte historique approfondie de la Maison des Esclaves, des ruelles de Gorée et des marchés d'art.",
        tags: ["Historique", "Français/Anglais", "Privé", "Circuit Culturel"],
        phone: "775987654"
    },
    {
        id: 3,
        name: "Maison du Tissage Artisanal Ndagane",
        category: "artisan",
        categoryLabel: "Artisan & Culture",
        region: "Sine Saloum",
        location: "Ndagane, Delta du Saloum",
        rating: 4.8,
        reviewsCount: 42,
        price: 15000,
        priceFormatted: "15 000 CFA / atelier",
        image: "https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=800&q=80",
        description: "Coopérative d'artisans sérères spécialisée dans le tissage traditionnel de pagnes et la confection de tentures aux motifs ethniques sénégalais.",
        tags: ["Commerce Équitable", "Atelier Tissage", "Souvenirs Local"],
        phone: "708112233"
    },
    {
        id: 4,
        name: "Restaurant Teranga & Thieboudienne Ndar",
        category: "restaurant",
        categoryLabel: "Gastronomie",
        region: "Saint-Louis",
        location: "Île de Saint-Louis",
        rating: 4.9,
        reviewsCount: 156,
        price: 8000,
        priceFormatted: "8 000 CFA / repas",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        description: "Spécialités authentiques de Saint-Louis, capitale gastronomique. Savourez le vrai Ceebu Jën (riz au poisson) cuit au feu de bois dans un cadre colonial rénové.",
        tags: ["Plat National", "Terrasse Fleuve", "Jus de Bissap Bio"],
        phone: "763344556"
    },
    {
        id: 5,
        name: "Campement Solidaire Cap Skirring",
        category: "hotel",
        categoryLabel: "Hôtel & Écolodge",
        region: "Casamance",
        location: "Cap Skirring, Basse Casamance",
        rating: 4.7,
        reviewsCount: 65,
        price: 35000,
        priceFormatted: "35 000 CFA / nuit",
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
        description: "Bungalows pieds dans l'eau ombragés sous les cocotiers. Un hébergement géré par la communauté locale pour soutenir les écoles de la région.",
        tags: ["Plage Privée", "Pirogue", "Pêche", "Solidaire"],
        phone: "774455667"
    },
    {
        id: 6,
        name: "Sine Saloum Pirogue Excursions",
        category: "transport",
        categoryLabel: "Excursion & Transport",
        region: "Sine Saloum",
        location: "Toubacouta & Mangroves",
        rating: 4.9,
        reviewsCount: 98,
        price: 30000,
        priceFormatted: "30 000 CFA / demi-journée",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        description: "Balades guidées en pirogue traditionnelle motorisée dans le labyrinthe des bolongs et la réserve d'oiseaux de Djiffer.",
        tags: ["Observation Oiseaux", "Mangroves", "Safari Pirogue"],
        phone: "781122334"
    },
    {
        id: 7,
        name: "Resort & Spa Lagoon Saly",
        category: "hotel",
        categoryLabel: "Hôtel & Écolodge",
        region: "Saly/Thiès",
        location: "Saly Portudal, Petite-Côte",
        rating: 4.8,
        reviewsCount: 210,
        price: 75000,
        priceFormatted: "75 000 CFA / nuit",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        description: "Complexe hôtelier haut de gamme au bord de l'Océan Atlantique. Piscine à débordement, soins spa aux huiles de Baobab et restauration gastronomique.",
        tags: ["Luxe", "Spa & Wellness", "Sports Nautiques"],
        phone: "772233445"
    },
    {
        id: 8,
        name: "Galerie d'Art Sculptures Bronze Dakar",
        category: "artisan",
        categoryLabel: "Artisan & Culture",
        region: "Dakar",
        location: "Village des Arts, Dakar",
        rating: 4.9,
        reviewsCount: 51,
        price: 20000,
        priceFormatted: "Visite libre / Pièces à partir de 20 000 CFA",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
        description: "Atelier de fonderie à la cire perdue. Rencontrez les maîtres sculpteurs sénégalais de renommée internationale.",
        tags: ["Art Contemporain", "Bronze", "Village des Arts"],
        phone: "769988776"
    }
];

// App State (Simulated Backend repository & Session)
const state = {
    actors: [...TOURISM_ACTORS],
    selectedCategory: "all",
    selectedRegion: "all",
    searchQuery: "",
    currentTheme: localStorage.getItem("terra_theme") || "dark",

    // Wallet State (mimicking the PHP model)
    wallet: JSON.parse(localStorage.getItem("terra_wallet")) || null,
    transactions: JSON.parse(localStorage.getItem("terra_transactions")) || []
};

// DOM Elements
const elements = {
    themeToggle: document.getElementById("theme-toggle"),
    dockTheme: document.getElementById("dock-theme"),
    actorsGrid: document.getElementById("actors-grid"),
    actorCount: document.getElementById("actor-count"),
    globalSearch: document.getElementById("global-search"),
    actorSearch: document.getElementById("actor-search"),
    regionFilter: document.getElementById("region-filter"),
    categoryChips: document.getElementById("category-chips"),

    // Modal Elements
    actorModal: document.getElementById("actor-modal"),
    modalClose: document.getElementById("modal-close"),
    modalImg: document.getElementById("modal-img"),
    modalCategory: document.getElementById("modal-category"),
    modalTitle: document.getElementById("modal-title"),
    modalRating: document.getElementById("modal-rating"),
    modalLocation: document.getElementById("modal-location"),
    modalDesc: document.getElementById("modal-desc"),
    modalTags: document.getElementById("modal-tags"),
    modalPrice: document.getElementById("modal-price"),
    modalPayBtn: document.getElementById("modal-pay-btn"),
    modalBookBtn: document.getElementById("modal-book-btn"),

    // Wallet Elements
    openWalletBtn: document.getElementById("open-wallet-btn"),
    bannerWalletTrigger: document.getElementById("banner-wallet-trigger"),
    dockWallet: document.getElementById("dock-wallet"),
    walletModalBackdrop: document.getElementById("wallet-modal-backdrop"),
    walletModalClose: document.getElementById("wallet-modal-close"),
    navBalance: document.getElementById("nav-balance"),
    visualBalance: document.getElementById("visual-balance"),
    visualHolder: document.getElementById("visual-holder"),
    visualPhone: document.getElementById("visual-phone"),

    // Wallet Sections
    walletCreateSection: document.getElementById("wallet-create-section"),
    walletOperationsSection: document.getElementById("wallet-operations-section"),
    createWalletForm: document.getElementById("create-wallet-form"),
    depotForm: document.getElementById("depot-form"),
    retraitForm: document.getElementById("retrait-form"),
    historyList: document.getElementById("transactions-history-list"),
    walletMessage: document.getElementById("wallet-message"),
    retraitMontantInput: document.getElementById("retrait-montant"),
    feeNotice: document.getElementById("fee-calculator-notice")
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    applyTheme(state.currentTheme);
    renderActors();
    updateWalletUI();
    setupEventListeners();
});

// Calculate Transaction Fee (mirroring PHP services.php)
function calculerFrais(montant) {
    if (montant <= 10000) {
        return 200;
    } else if (montant <= 100000) {
        return 500;
    } else {
        let frais = Math.floor(montant * 0.01);
        return frais > 5000 ? 5000 : frais;
    }
}

// Validation Functions (mirroring PHP validator.php)
function verificationTailleNumero(telephone, code) {
    return telephone.length === 9 && code.length === 4;
}

function debutNumero(telephone) {
    const prefixes = ['70', '75', '76', '77', '78'];
    const prefix = telephone.substring(0, 2);
    return prefixes.includes(prefix);
}

// Render Actor Cards Grid
function renderActors() {
    const filtered = state.actors.filter(actor => {
        const matchesCategory = state.selectedCategory === "all" || actor.category === state.selectedCategory;
        const matchesRegion = state.selectedRegion === "all" || actor.region === state.selectedRegion;
        const query = state.searchQuery.toLowerCase().trim();
        const matchesSearch = !query ||
            actor.name.toLowerCase().includes(query) ||
            actor.description.toLowerCase().includes(query) ||
            actor.location.toLowerCase().includes(query) ||
            actor.tags.some(t => t.toLowerCase().includes(query));

        return matchesCategory && matchesRegion && matchesSearch;
    });

    elements.actorCount.textContent = `${filtered.length} acteur(s) trouvé(s)`;

    if (filtered.length === 0) {
        elements.actorsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                <i class="fa-solid fa-magnifying-glass-location" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--neon-green);"></i>
                <h3>Aucun acteur trouvé</h3>
                <p>Essayez de modifier vos critères de recherche ou filtres de région.</p>
            </div>
        `;
        return;
    }

    elements.actorsGrid.innerHTML = filtered.map(actor => `
        <article class="actor-card" data-id="${actor.id}">
            <div class="card-img-wrapper">
                <img src="${actor.image}" alt="${actor.name}" loading="lazy">
                <span class="badge-category">${actor.categoryLabel}</span>
                <span class="card-rating"><i class="fa-solid fa-star"></i> ${actor.rating} (${actor.reviewsCount})</span>
            </div>
            <div class="card-content">
                <div class="card-region"><i class="fa-solid fa-location-dot"></i> ${actor.location}</div>
                <h3 class="card-title">${actor.name}</h3>
                <p class="card-desc">${actor.description}</p>
                <div class="card-tags">
                    ${actor.tags.slice(0, 3).map(tag => `<span class="card-tag">${tag}</span>`).join('')}
                </div>
                <div class="card-footer">
                    <span class="card-price">${actor.priceFormatted}</span>
                    <button class="btn-card-action view-detail-btn" onclick="openActorModal(${actor.id})">
                        Détails <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

// Open Actor Details Modal
window.openActorModal = function(id) {
    const actor = state.actors.find(a => a.id === id);
    if (!actor) return;

    elements.modalImg.src = actor.image;
    elements.modalImg.alt = actor.name;
    elements.modalCategory.textContent = actor.categoryLabel;
    elements.modalTitle.textContent = actor.name;
    elements.modalRating.innerHTML = `<i class="fa-solid fa-star"></i> ${actor.rating} (${actor.reviewsCount} avis)`;
    elements.modalLocation.querySelector("span").textContent = actor.location;
    elements.modalDesc.textContent = actor.description;
    elements.modalPrice.textContent = actor.priceFormatted;

    elements.modalTags.innerHTML = actor.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('');

    elements.modalPayBtn.onclick = () => {
        closeModal(elements.actorModal);
        openWalletModal();
        // Pre-fill withdrawal/payment form
        const tabRetraitBtn = document.querySelector('[data-tab="tab-retrait"]');
        if (tabRetraitBtn) tabRetraitBtn.click();
        elements.retraitMontantInput.value = actor.price;
        updateFeeNotice(actor.price);
    };

    elements.modalBookBtn.onclick = () => {
        alert(`Réservation transmise à ${actor.name} (${actor.phone}). Un conseiller vous recontactera par SMS.`);
    };

    openModal(elements.actorModal);
};

// Wallet UI Synchronizer
function updateWalletUI() {
    if (state.wallet) {
        elements.navBalance.textContent = `${state.wallet.solde.toLocaleString()} CFA`;
        elements.visualBalance.textContent = `${state.wallet.solde.toLocaleString()} CFA`;
        elements.visualHolder.textContent = state.wallet.client;
        elements.visualPhone.textContent = state.wallet.telephone;

        elements.walletCreateSection.style.display = "none";
        elements.walletOperationsSection.style.display = "block";
        renderHistory();
    } else {
        elements.navBalance.textContent = "0 CFA";
        elements.visualBalance.textContent = "0 CFA";
        elements.visualHolder.textContent = "Non Enregistré";
        elements.visualPhone.textContent = "-- -- -- --";

        elements.walletCreateSection.style.display = "block";
        elements.walletOperationsSection.style.display = "none";
    }
}

// Render Transaction History
function renderHistory() {
    if (state.transactions.length === 0) {
        elements.historyList.innerHTML = `<p class="empty-state">Aucune transaction enregistrée.</p>`;
        return;
    }

    elements.historyList.innerHTML = state.transactions.slice().reverse().map(t => {
        const isDepot = t.type === 'dépôt' || t.type === 'creation';
        const icon = isDepot ? 'fa-arrow-down-left' : 'fa-arrow-up-right';
        const color = isDepot ? 'var(--neon-green)' : '#FF8F7D';
        const sign = isDepot ? '+' : '-';

        return `
            <div class="history-item">
                <div>
                    <strong style="display: block; text-transform: capitalize;"><i class="fa-solid ${icon}" style="color: ${color}"></i> ${t.type}</strong>
                    <small style="color: var(--text-muted);">${t.date}</small>
                </div>
                <div style="text-align: right;">
                    <span style="font-weight: 700; color: ${color}">${sign} ${t.montant.toLocaleString()} CFA</span>
                    ${t.frais ? `<small style="display: block; color: var(--text-muted);">frais: ${t.frais} CFA</small>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Show Alert inside Wallet Modal
function showWalletAlert(message, isError = false) {
    elements.walletMessage.textContent = message;
    elements.walletMessage.className = `wallet-alert ${isError ? 'error' : 'success'}`;
    elements.walletMessage.style.display = "block";
    setTimeout(() => {
        elements.walletMessage.style.display = "none";
    }, 4000);
}

// Fee Calculator helper
function updateFeeNotice(montant) {
    if (!montant || montant <= 0) {
        elements.feeNotice.innerHTML = `<i class="fa-solid fa-circle-info"></i> Frais de transaction calculés automatiquement.`;
        return;
    }
    const frais = calculerFrais(parseInt(montant));
    const total = parseInt(montant) + frais;
    elements.feeNotice.innerHTML = `
        <i class="fa-solid fa-circle-info"></i> Frais appliqués: <strong>${frais.toLocaleString()} CFA</strong>
        (Total débité: <strong>${total.toLocaleString()} CFA</strong>)
    `;
}

// Theme Switcher
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("terra_theme", theme);
    state.currentTheme = theme;

    const iconClass = theme === "dark" ? "fa-sun" : "fa-moon";
    if (elements.themeToggle) elements.themeToggle.querySelector("i").className = `fa-solid ${iconClass}`;
    if (elements.dockTheme) elements.dockTheme.querySelector("i").className = `fa-solid ${iconClass}`;
}

// Modal helper controls
function openModal(modal) {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModal(modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function openWalletModal() {
    openModal(elements.walletModalBackdrop);
}

// Setup Event Listeners
function setupEventListeners() {
    // Theme toggling
    elements.themeToggle.addEventListener("click", () => {
        applyTheme(state.currentTheme === "dark" ? "light" : "dark");
    });
    elements.dockTheme.addEventListener("click", () => {
        applyTheme(state.currentTheme === "dark" ? "light" : "dark");
    });

    // Modal triggers
    elements.openWalletBtn.addEventListener("click", openWalletModal);
    elements.dockWallet.addEventListener("click", openWalletModal);
    elements.bannerWalletTrigger.addEventListener("click", openWalletModal);

    elements.modalClose.addEventListener("click", () => closeModal(elements.actorModal));
    elements.walletModalClose.addEventListener("click", () => closeModal(elements.walletModalBackdrop));

    // Close modal on backdrop click
    [elements.actorModal, elements.walletModalBackdrop].forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // Search inputs
    const handleSearch = (val) => {
        state.searchQuery = val;
        elements.globalSearch.value = val;
        elements.actorSearch.value = val;
        renderActors();
    };

    elements.globalSearch.addEventListener("input", (e) => handleSearch(e.target.value));
    elements.actorSearch.addEventListener("input", (e) => handleSearch(e.target.value));

    // Region Select
    elements.regionFilter.addEventListener("change", (e) => {
        state.selectedRegion = e.target.value;
        renderActors();
    });

    // Category Chips
    elements.categoryChips.addEventListener("click", (e) => {
        const chip = e.target.closest(".chip");
        if (!chip) return;

        elements.categoryChips.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");

        state.selectedCategory = chip.dataset.category;
        renderActors();
    });

    // Wallet Tabs Switcher
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

            btn.classList.add("active");
            const target = document.getElementById(btn.dataset.tab);
            if (target) target.classList.add("active");
        });
    });

    // Dynamic fee calculator input
    elements.retraitMontantInput.addEventListener("input", (e) => {
        updateFeeNotice(e.target.value);
    });

    // Create Wallet Form Submission
    elements.createWalletForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const client = document.getElementById("w-name").value.trim();
        const telephone = document.getElementById("w-phone").value.trim();
        const code = document.getElementById("w-code").value.trim();
        const solde = parseInt(document.getElementById("w-balance").value) || 0;

        if (!verificationTailleNumero(telephone, code)) {
            showWalletAlert("Erreur : Téléphone doit faire 9 chiffres et Code 4 chiffres.", true);
            return;
        }

        if (!debutNumero(telephone)) {
            showWalletAlert("Erreur : Le numéro doit débuter par 70, 75, 76, 77 ou 78.", true);
            return;
        }

        if (solde < 0) {
            showWalletAlert("Erreur : Le solde initial doit être positif ou nul.", true);
            return;
        }

        // Save wallet in state & localStorage
        state.wallet = { client, telephone, code, solde };
        state.transactions = [{
            type: "création",
            montant: solde,
            date: new Date().toLocaleDateString('fr-FR')
        }];

        localStorage.setItem("terra_wallet", JSON.stringify(state.wallet));
        localStorage.setItem("terra_transactions", JSON.stringify(state.transactions));

        updateWalletUI();
        showWalletAlert("Félicitations ! Votre Pass Touristique a été créé avec succès.");
    });

    // Recharger Form (Deposit)
    elements.depotForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const montant = parseInt(document.getElementById("depot-montant").value);

        if (!montant || montant <= 0) {
            showWalletAlert("Montant invalide.", true);
            return;
        }

        state.wallet.solde += montant;
        state.transactions.push({
            type: "dépôt",
            montant: montant,
            date: new Date().toLocaleDateString('fr-FR')
        });

        localStorage.setItem("terra_wallet", JSON.stringify(state.wallet));
        localStorage.setItem("terra_transactions", JSON.stringify(state.transactions));

        updateWalletUI();
        elements.depotForm.reset();
        showWalletAlert(`Rechargement de ${montant.toLocaleString()} CFA effectué avec succès !`);
    });

    // Payer / Retirer Form (Withdrawal & Payment)
    elements.retraitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const montant = parseInt(elements.retraitMontantInput.value);

        if (!montant || montant <= 0) {
            showWalletAlert("Erreur : Le montant doit être positif.", true);
            return;
        }

        const frais = calculerFrais(montant);
        const totalDebit = montant + frais;

        if (state.wallet.solde < totalDebit) {
            showWalletAlert(`Solde insuffisant ! Solde: ${state.wallet.solde.toLocaleString()} CFA | Requis (avec frais): ${totalDebit.toLocaleString()} CFA`, true);
            return;
        }

        state.wallet.solde -= totalDebit;
        state.transactions.push({
            type: "paiement/retrait",
            montant: montant,
            frais: frais,
            date: new Date().toLocaleDateString('fr-FR')
        });

        localStorage.setItem("terra_wallet", JSON.stringify(state.wallet));
        localStorage.setItem("terra_transactions", JSON.stringify(state.transactions));

        updateWalletUI();
        elements.retraitForm.reset();
        updateFeeNotice(0);
        showWalletAlert(`Paiement de ${montant.toLocaleString()} CFA réussi (Frais: ${frais} CFA).`);
    });
}
