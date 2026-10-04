/**
 * TERANGA PASS & TOURISME SÉNÉGAL - APPLICATION LOGIC
 * Integrates Senegal Tourism Actors directory and Digital Wallet business logic.
 */

// Initial Sample Data for Tourism Actors in Senegal
const TOURISM_ACTORS = [
    {
        id: 1,
        name: "King Fahd Palace Hotel",
        category: "hotel",
        location: "Dakar - Les Almadies",
        rating: "4.9",
        price: 95000,
        priceUnit: "/ nuit",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Hôtel 5 étoiles emblématique situé sur la pointe des Almadies avec vue panoramique sur l'Océan Atlantique, golf et suites de luxe.",
        services: ["Chambre VIP", "Spa & Wellness", "Golf 9 trous", "Piscine Olympique", "Paiement Teranga Pass"],
        phone: "776001122"
    },
    {
        id: 2,
        name: "Ecolodge de Lompoul",
        category: "hotel",
        location: "Désert de Lompoul, Louga",
        rating: "4.8",
        price: 45000,
        priceUnit: "/ nuit",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        description: "Une expérience inoubliable au cœur des dunes de sable de Lompoul avec tentes mauritaniennes de grand confort et soirées folkloriques.",
        services: ["Tentes Khaïmas", "Balade à Chameau", "Dîner sous les étoiles", "Feu de Camp"],
        phone: "775553311"
    },
    {
        id: 3,
        name: "Teranga Safari & Excursions",
        category: "agency",
        location: "Réserve de Bandia & Sine Saloum",
        rating: "4.9",
        price: 25000,
        priceUnit: "/ personne",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
        description: "Agence agréée de safari guidé dans la réserve de Bandia (Rhinos, Girafes, Zèbres) et excursions en pirogue dans le Sine Saloum.",
        services: ["Guide Bilingue", "4x4 Privatisé", "Billets d'entrée inclus", "Déjeuner Buffet"],
        phone: "784409988"
    },
    {
        id: 4,
        name: "Navette Express AIBD - Dakar",
        category: "transport",
        location: "Aéroport AIBD / Dakar / Saly",
        rating: "4.7",
        price: 10000,
        priceUnit: "/ trajet",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        description: "Service de transport VIP climatisé reliant l'Aéroport International Blaise Diagne (AIBD) vers Dakar centre, Saly et Mbour.",
        services: ["Climatisation", "Wifi Gratuit", "Prise en charge 24/7", "Bagages inclus"],
        phone: "703332211"
    },
    {
        id: 5,
        name: "Village Artisanal de Soumbédioune",
        category: "artisan",
        location: "Dakar - Corniche Ouest",
        rating: "4.6",
        price: 5000,
        priceUnit: "/ souvenir",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
        description: "Regroupement des maîtres artisans sénégalais : sculptures en bois d'ébène, bijoux en argent filigrané, peintures sous verre (Suwer).",
        services: ["Maroquinerie", "Bijouterie d'art", "Peintures Suwer", "Expédition Internationale"],
        phone: "762221100"
    },
    {
        id: 6,
        name: "Maison des Esclaves & Île de Gorée",
        category: "agency",
        location: "Île de Gorée, Dakar",
        rating: "5.0",
        price: 15000,
        priceUnit: "/ circuit",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
        description: "Visite guidée historique du patrimoine mondial de l'UNESCO sur l'île de Gorée, comprenant la Chaloupe, la Maison des Esclaves et les ateliers d'artistes.",
        services: ["Traversée Chaloupe", "Guide Historien", "Visite des Musées", "Ateliers d'Arts"],
        phone: "771112233"
    }
];

// In-Memory Wallet & Transaction Storage (Mirrors PHP repository state)
let stateWallets = [
    { client: "Awa Ndiaye", telephone: "771234567", code: "1234", solde: 150000 },
    { client: "Modou Fall", telephone: "789876543", code: "5678", solde: 45000 }
];

let stateTransactions = [
    { type: "depot", montant: 150000, frais: 0, indexClient: 0 },
    { type: "retrait", montant: 20000, frais: 500, indexClient: 0 },
    { type: "depot", montant: 45000, frais: 0, indexClient: 1 }
];

let currentActiveWalletIndex = 0; // Default active account index
let currentCategoryFilter = 'all';

/* ==========================================================================
   INITIALIZATION & RENDERING
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    renderActors();
    updateQuickWalletBadge();
    renderTransactionsTable();
    renderWalletsTable();
    updateRetraitCalculations();
});

/* Scroll smoothly to specified anchor section */
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ==========================================================================
   TOURISM ACTORS DIRECTORY LOGIC
   ========================================================================== */
function renderActors() {
    const grid = document.getElementById('actorsGrid');
    const searchVal = document.getElementById('actorSearchInput').value.toLowerCase().trim();

    const filtered = TOURISM_ACTORS.filter(actor => {
        const matchesCat = (currentCategoryFilter === 'all') || (actor.category === currentCategoryFilter);
        const matchesSearch = actor.name.toLowerCase().includes(searchVal) ||
                              actor.location.toLowerCase().includes(searchVal) ||
                              actor.description.toLowerCase().includes(searchVal);
        return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; color: var(--accent-neon);"></i>
                <p>Aucun acteur touristique ne correspond à votre recherche.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(actor => `
        <div class="actor-card">
            <div class="actor-img-wrapper" style="background-image: url('${actor.image}');">
                <span class="actor-category-badge">
                    <i class="${getCategoryIcon(actor.category)}"></i> ${getCategoryLabel(actor.category)}
                </span>
                <span class="actor-rating">
                    <i class="fa-solid fa-star"></i> ${actor.rating}
                </span>
            </div>
            <div class="actor-body">
                <span class="actor-location"><i class="fa-solid fa-location-dot"></i> ${actor.location}</span>
                <h3 class="actor-name">${actor.name}</h3>
                <p class="actor-desc">${actor.description}</p>
                <div class="actor-footer">
                    <div class="actor-price-tag">
                        <span class="price-label">À partir de</span>
                        <span class="price-val">${actor.price.toLocaleString('fr-FR')} FCFA <small style="font-size:0.75rem; color:var(--text-muted);">${actor.priceUnit}</small></span>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="openActorModal(${actor.id})">
                        Détails & Pay
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryIcon(cat) {
    switch (cat) {
        case 'hotel': return 'fa-solid fa-hotel';
        case 'agency': return 'fa-solid fa-map-location-dot';
        case 'transport': return 'fa-solid fa-van-shuttle';
        case 'artisan': return 'fa-solid fa-palette';
        default: return 'fa-solid fa-store';
    }
}

function getCategoryLabel(cat) {
    switch (cat) {
        case 'hotel': return 'Hôtel & Lodge';
        case 'agency': return 'Guide & Agence';
        case 'transport': return 'Transport';
        case 'artisan': return 'Artisanat';
        default: return 'Tourisme';
    }
}

function filterActors() {
    renderActors();
}

function setCategoryFilter(category, btnEl) {
    currentCategoryFilter = category;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
    renderActors();
}

/* Modal details & payment for actor */
function openActorModal(actorId) {
    const actor = TOURISM_ACTORS.find(a => a.id === actorId);
    if (!actor) return;

    const activeWallet = stateWallets[currentActiveWalletIndex];
    const modalBody = document.getElementById('actorModalBody');

    modalBody.innerHTML = `
        <div class="modal-hero-img" style="background-image: url('${actor.image}');"></div>
        <div class="modal-body-content">
            <span class="actor-location"><i class="fa-solid fa-location-dot"></i> ${actor.location}</span>
            <h2 class="modal-title">${actor.name}</h2>
            <div class="modal-subtitle">${actor.price.toLocaleString('fr-FR')} FCFA ${actor.priceUnit}</div>
            <p style="color: var(--text-muted); font-size: 0.95rem;">${actor.description}</p>

            <h4 style="margin-top: 1.25rem; font-size:0.9rem;">Services Proposés:</h4>
            <div class="services-list">
                ${actor.services.map(s => `<span class="service-chip"><i class="fa-solid fa-check text-neon"></i> ${s}</span>`).join('')}
            </div>

            <div style="background: var(--bg-input); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); margin-top: 1.5rem;">
                <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-wallet text-neon"></i> Payer avec votre Teranga Wallet</h4>
                ${activeWallet ? `
                    <div style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">
                        Wallet Actif: <strong>${activeWallet.client}</strong> (${activeWallet.telephone}) - Solde: <strong style="color:var(--accent-neon);">${activeWallet.solde.toLocaleString('fr-FR')} FCFA</strong>
                    </div>
                    <button class="btn btn-primary btn-block" onclick="payActorWithWallet(${actor.price}, '${actor.name}')">
                        <i class="fa-solid fa-credit-card"></i> Regler la Prestation (${actor.price.toLocaleString('fr-FR')} FCFA)
                    </button>
                ` : `
                    <div style="font-size: 0.88rem; color: #ef4444; margin-bottom: 1rem;">
                        Aucun wallet disponible. Veuillez créer un portefeuille Teranga ci-dessous.
                    </div>
                    <button class="btn btn-outline btn-block" onclick="closeActorModal(); scrollToSection('wallet');">
                        Créer un Wallet maintenant
                    </button>
                `}
            </div>
        </div>
    `;

    document.getElementById('actorModal').classList.remove('hidden');
}

function closeActorModal() {
    document.getElementById('actorModal').classList.add('hidden');
}

function payActorWithWallet(amount, actorName) {
    const activeWallet = stateWallets[currentActiveWalletIndex];
    if (!activeWallet) {
        showToast("Aucun wallet sélectionné", "error");
        return;
    }

    if (activeWallet.solde < amount) {
        showToast(`Solde insuffisant ! Requis: ${amount.toLocaleString()} FCFA`, "error");
        return;
    }

    activeWallet.solde -= amount;
    stateTransactions.push({
        type: "paiement",
        montant: amount,
        frais: 0,
        indexClient: currentActiveWalletIndex
    });

    updateQuickWalletBadge();
    renderTransactionsTable();
    renderWalletsTable();
    closeActorModal();
    showToast(`Paiement de ${amount.toLocaleString()} FCFA à ${actorName} réussi !`, "success");
}

/* ==========================================================================
   BUSINESS LOGIC & VALIDATIONS (Reflects PHP backend validator/services)
   ========================================================================== */

/**
 * Fee calculation rules (services.php)
 * - <= 10 000 FCFA -> 200 FCFA
 * - <= 100 000 FCFA -> 500 FCFA
 * - > 100 000 FCFA -> 1% (capped at 5000 FCFA)
 */
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

/**
 * Phone and Code validation rules (validator.php)
 * - 9 digits long for phone, 4 digits for code
 * - Phone prefixes: 70, 75, 76, 77, 78
 */
function verificationTailleNumero(telephone, code) {
    return telephone.length === 9 && code.length === 4;
}

function debutNumero(telephone) {
    const prefixValide = ['70', '75', '76', '77', '78'];
    const prefix = telephone.substring(0, 2);
    return prefixValide.includes(prefix);
}

function verifiTelephoneExiste(telephone) {
    return stateWallets.some(w => w.telephone === telephone);
}

function verifiCodeExiste(code) {
    return stateWallets.some(w => w.code === code);
}

function trouverWalletIndex(telephone) {
    return stateWallets.findIndex(w => w.telephone === telephone);
}

/* ==========================================================================
   WALLET HANDLERS & TAB MANAGEMENT
   ========================================================================== */

function switchWalletTab(tabId, btnEl) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    btnEl.classList.add('active');
}

function toggleWalletView(view) {
    const txContainer = document.getElementById('transactionsContainer');
    const wContainer = document.getElementById('walletsContainer');
    const btnTx = document.getElementById('btnShowTransactions');
    const btnW = document.getElementById('btnShowWallets');

    if (view === 'transactions') {
        txContainer.classList.remove('hidden');
        wContainer.classList.add('hidden');
        btnTx.classList.add('active');
        btnW.classList.remove('active');
    } else {
        txContainer.classList.add('hidden');
        wContainer.classList.remove('hidden');
        btnTx.classList.remove('active');
        btnW.classList.add('active');
    }
}

function updateQuickWalletBadge() {
    const activeWallet = stateWallets[currentActiveWalletIndex];
    const labelEl = document.getElementById('quickWalletLabel');
    const balanceEl = document.getElementById('quickWalletBalance');
    const previewClient = document.getElementById('previewClient');
    const previewPhone = document.getElementById('previewPhone');
    const previewBalance = document.getElementById('previewBalance');

    if (activeWallet) {
        labelEl.textContent = activeWallet.client;
        balanceEl.textContent = `${activeWallet.solde.toLocaleString('fr-FR')} FCFA`;

        previewClient.textContent = activeWallet.client;
        previewPhone.textContent = activeWallet.telephone;
        previewBalance.textContent = `${activeWallet.solde.toLocaleString('fr-FR')} FCFA`;
    } else {
        labelEl.textContent = "Aucun Wallet";
        balanceEl.textContent = "0 FCFA";
        previewClient.textContent = "Aucun Compte";
        previewPhone.textContent = "-- --- -- --";
        previewBalance.textContent = "0 FCFA";
    }
}

function handleCreateWallet(event) {
    event.preventDefault();
    const client = document.getElementById('clientName').value.trim();
    const telephone = document.getElementById('clientPhone').value.trim();
    const code = document.getElementById('clientCode').value.trim();
    const solde = parseInt(document.getElementById('initialBalance').value, 10) || 0;

    if (!verificationTailleNumero(telephone, code)) {
        showToast("Erreur : Le numéro doit faire 9 chiffres et le code 4 chiffres.", "error");
        return;
    }

    if (!debutNumero(telephone)) {
        showToast("Erreur : Le numéro doit commencer par 70, 75, 76, 77 ou 78.", "error");
        return;
    }

    if (solde < 0) {
        showToast("Erreur : Le solde initial doit être positif ou nul.", "error");
        return;
    }

    if (verifiTelephoneExiste(telephone)) {
        showToast("Erreur : Ce numéro de téléphone existe déjà.", "error");
        return;
    }

    if (verifiCodeExiste(code)) {
        showToast("Erreur : Ce code secret existe déjà.", "error");
        return;
    }

    const newWallet = { client, telephone, code, solde };
    stateWallets.push(newWallet);
    currentActiveWalletIndex = stateWallets.length - 1;

    updateQuickWalletBadge();
    renderWalletsTable();
    showToast("Wallet créé avec succès !", "success");
    document.getElementById('createWalletForm').reset();
}

function handleDepot(event) {
    event.preventDefault();
    const telephone = document.getElementById('depotPhone').value.trim();
    const montant = parseInt(document.getElementById('depotAmount').value, 10);

    if (!montant || montant <= 0) {
        showToast("Erreur : Montant invalide.", "error");
        return;
    }

    const index = trouverWalletIndex(telephone);
    if (index === -1) {
        showToast("Erreur : Wallet introuvable avec ce numéro.", "error");
        return;
    }

    stateWallets[index].solde += montant;
    stateTransactions.push({
        type: 'depot',
        montant: montant,
        frais: 0,
        indexClient: index
    });

    currentActiveWalletIndex = index;
    updateQuickWalletBadge();
    renderTransactionsTable();
    renderWalletsTable();
    showToast(`Dépôt de ${montant.toLocaleString()} FCFA réussi ! Nouveau solde: ${stateWallets[index].solde.toLocaleString()} FCFA`, "success");
    document.getElementById('depotForm').reset();
}

function handleRetrait(event) {
    event.preventDefault();
    const telephone = document.getElementById('retraitPhone').value.trim();
    const montant = parseInt(document.getElementById('retraitAmount').value, 10);

    if (!montant || montant <= 0) {
        showToast("Erreur : Montant invalide.", "error");
        return;
    }

    const index = trouverWalletIndex(telephone);
    if (index === -1) {
        showToast("Erreur : Aucun wallet associé à ce numéro.", "error");
        return;
    }

    const frais = calculerFrais(montant);
    const totalDebit = montant + frais;

    if (stateWallets[index].solde < totalDebit) {
        showToast(`Solde insuffisant ! Solde: ${stateWallets[index].solde.toLocaleString()} FCFA, Requis (montant + frais): ${totalDebit.toLocaleString()} FCFA`, "error");
        return;
    }

    stateWallets[index].solde -= totalDebit;
    stateTransactions.push({
        type: 'retrait',
        montant: montant,
        frais: frais,
        indexClient: index
    });

    currentActiveWalletIndex = index;
    updateQuickWalletBadge();
    renderTransactionsTable();
    renderWalletsTable();
    showToast(`Retrait de ${montant.toLocaleString()} FCFA réussi (Frais: ${frais} FCFA). Solde restant: ${stateWallets[index].solde.toLocaleString()} FCFA`, "success");
    document.getElementById('retraitForm').reset();
    updateRetraitCalculations();
}

function updateRetraitCalculations() {
    const amountVal = parseInt(document.getElementById('retraitAmount').value, 10) || 0;
    const frais = amountVal > 0 ? calculerFrais(amountVal) : 0;
    const total = amountVal + frais;

    document.getElementById('previewRetraitMontant').textContent = `${amountVal.toLocaleString('fr-FR')} FCFA`;
    document.getElementById('previewRetraitFrais').textContent = `${frais.toLocaleString('fr-FR')} FCFA`;
    document.getElementById('previewRetraitTotal').textContent = `${total.toLocaleString('fr-FR')} FCFA`;
}

function renderTransactionsTable() {
    const tbody = document.getElementById('transactionsTableBody');
    if (stateTransactions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Aucune transaction enregistrée</td></tr>`;
        return;
    }

    tbody.innerHTML = stateTransactions.map((tx, idx) => {
        const clientObj = stateWallets[tx.indexClient];
        const clientName = clientObj ? clientObj.client : "Client Inconnu";
        return `
            <tr>
                <td>#${idx + 1}</td>
                <td><strong>${clientName}</strong></td>
                <td><span class="badge-type ${tx.type}">${tx.type}</span></td>
                <td>${tx.montant.toLocaleString('fr-FR')} FCFA</td>
                <td>${tx.frais ? tx.frais.toLocaleString('fr-FR') + ' FCFA' : '0 FCFA'}</td>
            </tr>
        `;
    }).join('');
}

function renderWalletsTable() {
    const tbody = document.getElementById('walletsTableBody');
    if (stateWallets.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">Aucun wallet enregistré</td></tr>`;
        return;
    }

    tbody.innerHTML = stateWallets.map((w, idx) => `
        <tr style="cursor:pointer;" onclick="selectWalletAsActive(${idx})">
            <td><strong>${w.client}</strong> ${idx === currentActiveWalletIndex ? '<span style="color:var(--accent-neon); font-size:0.75rem;">(Actif)</span>' : ''}</td>
            <td>${w.telephone}</td>
            <td>••••</td>
            <td style="color:var(--accent-neon); font-weight:700;">${w.solde.toLocaleString('fr-FR')} FCFA</td>
        </tr>
    `).join('');
}

function selectWalletAsActive(index) {
    currentActiveWalletIndex = index;
    updateQuickWalletBadge();
    renderWalletsTable();
    showToast(`Wallet actif changé : ${stateWallets[index].client}`, "success");
}

function setDockActive(dockEl) {
    document.querySelectorAll('.dock-item').forEach(d => d.classList.remove('active'));
    dockEl.classList.add('active');
}

/* ==========================================================================
   TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = "success") {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="${type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
