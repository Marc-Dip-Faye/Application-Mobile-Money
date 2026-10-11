/**
 * Teranga Tourism & Wallet Application Logic
 */

// Dataset of Senegal Tourism Actors
const TOURISM_ACTORS = [
    {
        id: 1,
        name: "Lamu Saly Hotel & Spa",
        category: "hotel",
        categoryLabel: "Hôtel & Lodge",
        city: "Saly",
        rating: 4.8,
        price: "45 000 FCFA / nuit",
        priceValue: 45000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Hôtel d'exception en bord de mer à Saly Portudal avec spa traditionnel et piscines lagon.",
        phone: "+221 33 957 10 00",
        address: "Station Balnéaire, Saly Portudal, Mbour"
    },
    {
        id: 2,
        name: "Ousmane Diallo - Guide Île de Gorée",
        category: "guide",
        categoryLabel: "Guide Touristique",
        city: "Gorée",
        rating: 4.9,
        price: "15 000 FCFA / jour",
        priceValue: 15000,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        description: "Guide agréé passionné retraçant l'histoire fascinante et émouvante de l'Île de Gorée.",
        phone: "+221 77 645 32 10",
        address: "Débarcadère de la Chaloupe, Île de Gorée"
    },
    {
        id: 3,
        name: "Teranga Express Safaris",
        category: "transport",
        categoryLabel: "Transport & Circuit",
        city: "Dakar",
        rating: 4.7,
        price: "35 000 FCFA / excursion",
        priceValue: 35000,
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
        description: "Excursions guidées en 4x4 vers la Réserve de Bandia, le Lac Rose et la Somone.",
        phone: "+221 70 812 99 00",
        address: "Avenue Léopold Sédar Senghor, Dakar"
    },
    {
        id: 4,
        name: "Galerie d'Art & Artisanat de Soumbédioune",
        category: "artisan",
        categoryLabel: "Artisans & Galerie",
        city: "Dakar",
        rating: 4.6,
        price: "Articles dès 5 000 FCFA",
        priceValue: 5000,
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        description: "Sculptures en bois d'ébène, bijoux traditionnels en argent et toiles peintes sous verre.",
        phone: "+221 76 331 44 22",
        address: "Village Artisanal de Soumbédioune, Dakar"
    },
    {
        id: 5,
        name: "Hôtel Saint-Louis Elegance",
        category: "hotel",
        categoryLabel: "Hôtel & Lodge",
        city: "Saint-Louis",
        rating: 4.8,
        price: "50 000 FCFA / nuit",
        priceValue: 50000,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        description: "Demeure coloniale restaurée au bord du fleuve Sénégal sur l'île historique de Saint-Louis.",
        phone: "+221 33 961 22 11",
        address: "Rue Millès, Île de Saint-Louis"
    },
    {
        id: 6,
        name: "Le Lagoon 1 - Resto Gastronomique",
        category: "resto",
        categoryLabel: "Gastronomie",
        city: "Dakar",
        rating: 4.7,
        price: "18 000 FCFA / plat",
        priceValue: 18000,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        description: "Cuisine sénégalaise raffinée (Thiéboudienne, Yassa au poulet) sur un ponton surplombant l'océan.",
        phone: "+221 33 821 53 22",
        address: "Route de la Corniche Est, Dakar"
    },
    {
        id: 7,
        name: "Cap Skirring Eco-Lodge",
        category: "hotel",
        categoryLabel: "Hôtel & Lodge",
        city: "Cap Skirring",
        rating: 4.9,
        price: "60 000 FCFA / nuit",
        priceValue: 60000,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        description: "Bungalows éco-responsables nichés entre la cocoteraie et l'océan Atlantique en Casamance.",
        phone: "+221 33 993 51 00",
        address: "Plage de Kabrousse, Cap Skirring"
    },
    {
        id: 8,
        name: "Kédougou Randonnées Bassari",
        category: "guide",
        categoryLabel: "Guide Touristique",
        city: "Kedougou",
        rating: 4.9,
        price: "20 000 FCFA / jour",
        priceValue: 20000,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        description: "Randonnées guidées aux cascades de Dindéfélo et immersion dans les villages Bedik & Bassari.",
        phone: "+221 78 510 88 44",
        address: "Centre Culturel, Kédougou"
    }
];

// In-Memory Database State for Teranga Wallet & Transactions
let state = {
    wallets: [
        {
            client: "Moussa Diop",
            telephone: "771234567",
            code: "1234",
            solde: 75000
        }
    ],
    currentActiveWalletIndex: 0,
    transactions: [
        {
            type: "depot",
            montant: 75000,
            frais: 0,
            indexClient: 0,
            clientName: "Moussa Diop",
            date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        }
    ],
    filterCategory: "all",
    filterCity: "all",
    searchQuery: ""
};

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    renderActors();
    updateWalletUI();
    setupEventListeners();
    setupFeeCalculator();
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation Tabs
    const navLinks = document.querySelectorAll('.nav-link, .dock-item');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Open Wallet Button in Header
    document.getElementById('openWalletBtn').addEventListener('click', () => {
        switchTab('wallet');
    });

    // Search Input
    document.getElementById('searchInput').addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase();
        renderActors();
    });

    // City Filter Select
    document.getElementById('cityFilter').addEventListener('change', (e) => {
        state.filterCity = e.target.value;
        renderActors();
    });

    // Category Filter Select
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        state.filterCategory = e.target.value;
        updateActivePill(e.target.value);
        renderActors();
    });

    // Category Pills Click
    const pillBtns = document.querySelectorAll('#categoryPills .pill-btn');
    pillBtns.forEach(pill => {
        pill.addEventListener('click', () => {
            const cat = pill.getAttribute('data-cat');
            state.filterCategory = cat;
            document.getElementById('categoryFilter').value = cat;
            updateActivePill(cat);
            renderActors();
        });
    });

    // Wallet Subtab Navigation
    const subtabBtns = document.querySelectorAll('.subtab-btn');
    subtabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const subtabId = btn.getAttribute('data-subtab');
            switchWalletSubTab(subtabId);
        });
    });

    // Forms Handlers
    document.getElementById('createWalletForm').addEventListener('submit', handleCreateWallet);
    document.getElementById('depotForm').addEventListener('submit', handleDepot);
    document.getElementById('retraitForm').addEventListener('submit', handleRetrait);

    // Clear Tx History
    document.getElementById('clearTxBtn').addEventListener('click', () => {
        state.transactions = [];
        renderTransactionsTable();
        showToast("Historique réinitialisé", "success");
    });
}

function updateActivePill(cat) {
    document.querySelectorAll('#categoryPills .pill-btn').forEach(pill => {
        if (pill.getAttribute('data-cat') === cat) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });
}

// Tab Switching
function switchTab(tabId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-tab') === tabId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    document.querySelectorAll('.dock-item').forEach(item => {
        if (item.getAttribute('data-tab') === tabId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    document.querySelectorAll('.tab-content').forEach(section => {
        if (section.id === tabId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchWalletSubTab(subtabId) {
    document.querySelectorAll('.subtab-btn').forEach(btn => {
        if (btn.getAttribute('data-subtab') === subtabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    document.querySelectorAll('.wallet-subtab-content').forEach(content => {
        if (content.id === `subtab-${subtabId}`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Render Tourism Actors Grid
function renderActors() {
    const grid = document.getElementById('actorsGrid');
    const filtered = TOURISM_ACTORS.filter(actor => {
        const matchesCategory = state.filterCategory === 'all' || actor.category === state.filterCategory;
        const matchesCity = state.filterCity === 'all' || actor.city === state.filterCity;
        const matchesSearch = actor.name.toLowerCase().includes(state.searchQuery) ||
                              actor.description.toLowerCase().includes(state.searchQuery) ||
                              actor.city.toLowerCase().includes(state.searchQuery);
        return matchesCategory && matchesCity && matchesSearch;
    });

    document.getElementById('resultsCount').innerText = `Affichage de ${filtered.length} acteur(s)`;

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
            <i class="fa-solid fa-compass-slash" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--neon-green);"></i>
            <p>Aucun acteur touristique ne correspond à vos critères de recherche.</p>
        </div>`;
        return;
    }

    grid.innerHTML = filtered.map(actor => `
        <div class="actor-card">
            <div class="card-img-wrapper">
                <img src="${actor.image}" alt="${actor.name}" loading="lazy">
                <span class="card-category-badge">${actor.categoryLabel}</span>
                <span class="card-location-badge"><i class="fa-solid fa-location-dot"></i> ${actor.city}</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">${actor.name}</h3>
                <p class="card-desc">${actor.description}</p>
                <div class="card-meta">
                    <span class="card-rating"><i class="fa-solid fa-star"></i> ${actor.rating}</span>
                    <span class="card-price">${actor.price}</span>
                </div>
                <div class="card-actions">
                    <button class="btn btn-outline btn-block" onclick="openActorModal(${actor.id})"><i class="fa-solid fa-circle-info"></i> Détails</button>
                    <button class="btn btn-primary btn-block" onclick="payWithWallet(${actor.priceValue}, '${escapeHtml(actor.name)}')"><i class="fa-solid fa-wallet"></i> Réserver</button>
                </div>
            </div>
        </div>
    `).join('');
}

function escapeHtml(str) {
    return str.replace(/'/g, "\\'");
}

// Modal Handling
function openActorModal(actorId) {
    const actor = TOURISM_ACTORS.find(a => a.id === actorId);
    if (!actor) return;

    const modalBody = document.getElementById('actorModalBody');
    modalBody.innerHTML = `
        <img src="${actor.image}" alt="${actor.name}" class="modal-actor-img">
        <div class="modal-actor-header">
            <div>
                <h2 class="modal-actor-title">${actor.name}</h2>
                <span class="card-category-badge" style="position:static; display:inline-block; margin-top:0.4rem;">${actor.categoryLabel}</span>
            </div>
            <div class="modal-actor-price">${actor.price}</div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.2rem;">${actor.description}</p>
        <div class="modal-actor-details">
            <p><i class="fa-solid fa-location-dot text-neon"></i> <strong>Adresse:</strong> ${actor.address}</p>
            <p><i class="fa-solid fa-phone text-neon"></i> <strong>Téléphone:</strong> ${actor.phone}</p>
            <p><i class="fa-solid fa-star text-neon"></i> <strong>Évaluation Clients:</strong> ${actor.rating} / 5.0</p>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
            <button class="btn btn-primary btn-block" onclick="payWithWallet(${actor.priceValue}, '${escapeHtml(actor.name)}'); closeModal();">
                <i class="fa-solid fa-credit-card"></i> Payer ${actor.priceValue.toLocaleString()} FCFA via Teranga Wallet
            </button>
        </div>
    `;

    document.getElementById('actorModal').classList.add('active');
}

function closeModal() {
    document.getElementById('actorModal').classList.remove('active');
}

// Wallet Operations & PHP Business Logic Replica

function verificationTailleNumero(telephone, code) {
    return telephone.length === 9 && code.length === 4;
}

function debutNumero(telephone) {
    const prefixValide = ['70', '75', '76', '77', '78'];
    const prefix = telephone.substring(0, 2);
    return prefixValide.includes(prefix);
}

function soldeInitialValide(solde) {
    return solde >= 0;
}

function verifiTelephoneExiste(telephone) {
    return state.wallets.some(w => w.telephone === telephone);
}

function verifiCodeExiste(code) {
    return state.wallets.some(w => w.code === code);
}

function calculerFrais(montant) {
    if (montant <= 10000) {
        return 200;
    } else if (montant <= 100000) {
        return 500;
    } else {
        let frais = Math.floor(montant * 0.01);
        if (frais > 5000) {
            frais = 5000;
        }
        return frais;
    }
}

// Setup Retrait Live Fee Calculation
function setupFeeCalculator() {
    const retraitInput = document.getElementById('retraitAmount');
    if (!retraitInput) return;

    retraitInput.addEventListener('input', (e) => {
        const amount = parseInt(e.target.value) || 0;
        if (amount > 0) {
            const fee = calculerFrais(amount);
            document.getElementById('computedFeeDisplay').innerText = `${fee.toLocaleString()} FCFA`;
            document.getElementById('computedTotalDebitDisplay').innerText = `${(amount + fee).toLocaleString()} FCFA`;
        } else {
            document.getElementById('computedFeeDisplay').innerText = `0 FCFA`;
            document.getElementById('computedTotalDebitDisplay').innerText = `0 FCFA`;
        }
    });
}

// Create Wallet Handler
function handleCreateWallet(e) {
    e.preventDefault();
    const client = document.getElementById('clientName').value.trim();
    const telephone = document.getElementById('clientPhone').value.trim();
    const code = document.getElementById('clientCode').value.trim();
    const solde = parseInt(document.getElementById('clientSolde').value) || 0;

    if (!verificationTailleNumero(telephone, code)) {
        showToast("Erreur : Le numéro doit comporter 9 chiffres et le code 4 chiffres", "error");
        return;
    }

    if (!debutNumero(telephone)) {
        showToast("Erreur : Le numéro doit commencer par 70, 75, 76, 77 ou 78", "error");
        return;
    }

    if (!soldeInitialValide(solde)) {
        showToast("Erreur : Le solde initial doit être positif ou nul", "error");
        return;
    }

    if (verifiTelephoneExiste(telephone)) {
        showToast("Erreur : Ce numéro de téléphone possède déjà un wallet", "error");
        return;
    }

    if (verifiCodeExiste(code)) {
        showToast("Erreur : Ce code secret existe déjà", "error");
        return;
    }

    const newWallet = { client, telephone, code, solde };
    state.wallets.push(newWallet);
    state.currentActiveWalletIndex = state.wallets.length - 1;

    updateWalletUI();
    showToast(`Wallet créé avec succès pour ${client} !`, "success");
    e.target.reset();
    switchWalletSubTab('depot');
}

// Depot Handler
function handleDepot(e) {
    e.preventDefault();
    const telephone = document.getElementById('depotPhone').value.trim();
    const montant = parseInt(document.getElementById('depotAmount').value) || 0;

    if (montant <= 0) {
        showToast("Montant invalide", "error");
        return;
    }

    const walletIndex = state.wallets.findIndex(w => w.telephone === telephone);
    if (walletIndex === -1) {
        showToast("Wallet introuvable pour ce numéro", "error");
        return;
    }

    state.wallets[walletIndex].solde += montant;
    state.currentActiveWalletIndex = walletIndex;

    state.transactions.push({
        type: "depot",
        montant: montant,
        frais: 0,
        indexClient: walletIndex,
        clientName: state.wallets[walletIndex].client,
        date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    });

    updateWalletUI();
    showToast(`Dépôt de ${montant.toLocaleString()} FCFA effectué avec succès. Nouveau solde : ${state.wallets[walletIndex].solde.toLocaleString()} FCFA`, "success");
    e.target.reset();
}

// Retrait Handler
function handleRetrait(e) {
    e.preventDefault();
    const telephone = document.getElementById('retraitPhone').value.trim();
    const montant = parseInt(document.getElementById('retraitAmount').value) || 0;

    if (montant <= 0) {
        showToast("Erreur : Le montant doit être positif.", "error");
        return;
    }

    const walletIndex = state.wallets.findIndex(w => w.telephone === telephone);
    if (walletIndex === -1) {
        showToast("Erreur : Aucun wallet associé à ce numéro.", "error");
        return;
    }

    const frais = calculerFrais(montant);
    const totalDebit = montant + frais;

    if (state.wallets[walletIndex].solde < totalDebit) {
        showToast(`Erreur : Solde insuffisant. Solde : ${state.wallets[walletIndex].solde.toLocaleString()} FCFA | Requis : ${totalDebit.toLocaleString()} FCFA`, "error");
        return;
    }

    state.wallets[walletIndex].solde -= totalDebit;
    state.currentActiveWalletIndex = walletIndex;

    state.transactions.push({
        type: "retrait",
        montant: montant,
        frais: frais,
        indexClient: walletIndex,
        clientName: state.wallets[walletIndex].client,
        date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    });

    updateWalletUI();
    showToast(`Retrait effectué avec succès. ${montant.toLocaleString()} FCFA retiré. Frais : ${frais} FCFA. Nouveau solde : ${state.wallets[walletIndex].solde.toLocaleString()} FCFA`, "success");
    e.target.reset();
    document.getElementById('computedFeeDisplay').innerText = `0 FCFA`;
    document.getElementById('computedTotalDebitDisplay').innerText = `0 FCFA`;
}

// Pay Booking with Active Wallet
function payWithWallet(amount, serviceName) {
    if (state.wallets.length === 0) {
        showToast("Aucun wallet disponible. Veuillez en créer un d'abord.", "error");
        switchTab('wallet');
        switchWalletSubTab('creer');
        return;
    }

    const currentWallet = state.wallets[state.currentActiveWalletIndex];
    if (currentWallet.solde < amount) {
        showToast(`Solde insuffisant dans votre wallet (${currentWallet.solde.toLocaleString()} FCFA). Dépôt nécessaire.`, "error");
        switchTab('wallet');
        switchWalletSubTab('depot');
        document.getElementById('depotPhone').value = currentWallet.telephone;
        return;
    }

    currentWallet.solde -= amount;
    state.transactions.push({
        type: "paiement",
        montant: amount,
        frais: 0,
        indexClient: state.currentActiveWalletIndex,
        clientName: `${currentWallet.client} (${serviceName})`,
        date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    });

    updateWalletUI();
    showToast(`Paiement de ${amount.toLocaleString()} FCFA pour "${serviceName}" effectué avec succès !`, "success");
}

// Update UI Components
function updateWalletUI() {
    if (state.wallets.length > 0 && state.currentActiveWalletIndex >= 0) {
        const activeWallet = state.wallets[state.currentActiveWalletIndex];
        document.getElementById('navBalance').innerText = `${activeWallet.solde.toLocaleString()} FCFA`;
        document.getElementById('walletBalanceDisplay').innerText = `${activeWallet.solde.toLocaleString()} FCFA`;
        document.getElementById('walletOwnerDisplay').innerText = activeWallet.client;
        document.getElementById('walletPhoneDisplay').innerText = activeWallet.telephone;

        // Autofill forms with active phone
        document.getElementById('depotPhone').value = activeWallet.telephone;
        document.getElementById('retraitPhone').value = activeWallet.telephone;
    } else {
        document.getElementById('navBalance').innerText = `0 FCFA`;
        document.getElementById('walletBalanceDisplay').innerText = `0 FCFA`;
        document.getElementById('walletOwnerDisplay').innerText = `Aucun wallet actif`;
        document.getElementById('walletPhoneDisplay').innerText = `--`;
    }

    renderTransactionsTable();
}

function renderTransactionsTable() {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;

    if (state.transactions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="empty-msg">Aucune transaction enregistrée.</td></tr>`;
        return;
    }

    tbody.innerHTML = state.transactions.map((tx, idx) => {
        let typeBadgeClass = 'badge-depot';
        let typeLabel = 'Dépôt';

        if (tx.type === 'retrait') {
            typeBadgeClass = 'badge-retrait';
            typeLabel = 'Retrait';
        } else if (tx.type === 'paiement') {
            typeBadgeClass = 'badge-paiement';
            typeLabel = 'Paiement';
        }

        return `
            <tr>
                <td><strong>#${idx + 1}</strong></td>
                <td><span class="badge-type ${typeBadgeClass}">${typeLabel}</span></td>
                <td><strong>${tx.montant.toLocaleString()} FCFA</strong></td>
                <td>${tx.frais ? tx.frais.toLocaleString() + ' FCFA' : '0 FCFA'}</td>
                <td>${tx.clientName || 'Inconnu'}</td>
                <td><i class="fa-solid fa-circle-check text-neon"></i> Validé</td>
            </tr>
        `;
    }).join('');
}

// Notification Toast System
function showToast(message, type = "success") {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
