/**
 * Teranga Tourisme & Pass Sénégal - Interactive Application Logic
 */

// --- Dataset of Senegal Tourism Actors ---
const TOURISM_ACTORS = [
    {
        id: "act-1",
        name: "Hôtel Radisson Blu Dakar Sea Plaza",
        category: "hotel",
        categoryLabel: "Hôtel & Lodge",
        region: "Dakar",
        location: "Corniche Ouest, Dakar",
        rating: 4.8,
        reviews: 240,
        price: "120 000",
        priceUnit: "FCFA / nuit",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Hôtel de luxe sur la Corniche Ouest offrant une vue panoramique sur l'Océan Atlantique, piscine infinity et spa d'exception.",
        phone: "+221 33 869 33 33",
        services: ["Piscine à débordement", "Spa & Wellness", "Restaurant Gastronomique", "Wi-Fi Très Haut Débit"]
    },
    {
        id: "act-2",
        name: "Maison des Esclaves & Guide Cheikh",
        category: "guide",
        categoryLabel: "Guide Agrée",
        region: "Gorée",
        location: "Île de Gorée, Dakar",
        rating: 4.9,
        reviews: 310,
        price: "15 000",
        priceUnit: "FCFA / visite",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
        description: "Découverte historique poignante guidée par Cheikh, expert diplômé en histoire du Sénégal et du patrimoine de Gorée.",
        phone: "+221 77 654 32 10",
        services: ["Visite guidée historique", "Traduction Trilingue (FR/EN/WO)", "Billets coupe-file"]
    },
    {
        id: "act-3",
        name: "Restaurant Le Lagon 1",
        category: "restaurant",
        categoryLabel: "Gastronomie",
        region: "Dakar",
        location: "Plateau, Dakar",
        rating: 4.7,
        reviews: 185,
        price: "18 000",
        priceUnit: "FCFA / menu",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        description: "Institution dakaroise suspendue au-dessus de la mer. Spécialités de fruits de mer frais, Thiéboudienne royale et poissons grillés.",
        phone: "+221 33 821 53 22",
        services: ["Terrasse sur mer", "Poisson frais du jour", "Cocktails exotiques", "Paiement Pass Tourisme"]
    },
    {
        id: "act-4",
        name: "Saly Express Taxi Tourisme",
        category: "transport",
        categoryLabel: "Transport",
        region: "Saly",
        location: "Saly Portudal & AIBD",
        rating: 4.8,
        reviews: 95,
        price: "25 000",
        priceUnit: "FCFA / transfert",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
        description: "Service de transport privé climatisé reliant l'Aéroport AIBD Diass à Saly, Somone et Dakar avec chauffeurs professionnels.",
        phone: "+221 78 112 34 56",
        services: ["Transfert Aéroport AIBD 24/7", "Chauffeurs bilingues", "Véhicules Suv climatisés"]
    },
    {
        id: "act-5",
        name: "Village des Artisans de Soumbédioune",
        category: "artisanat",
        categoryLabel: "Artisanat",
        region: "Dakar",
        location: "Soumbédioune, Dakar",
        rating: 4.6,
        reviews: 142,
        price: "5 000",
        priceUnit: "FCFA / souvenir",
        image: "https://images.unsplash.com/photo-1528458901495-32d881518342?auto=format&fit=crop&w=800&q=80",
        description: "Collectif de sculpteurs sur bois, maroquiniers, peintres sous verre (Suwer) et bijoutiers traditionnels sénégalais.",
        phone: "+221 76 987 65 43",
        services: ["Sculptures en bois d'ébène", "Bijoux en bronze & argent", "Ateliers d'initiation"]
    },
    {
        id: "act-6",
        name: "Lamantin Beach Resort & Spa",
        category: "hotel",
        categoryLabel: "Hôtel & Lodge",
        region: "Saly",
        location: "Saly Portudal, Petite-Côte",
        rating: 4.9,
        reviews: 280,
        price: "95 000",
        priceUnit: "FCFA / nuit",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        description: "Hôtel 5 étoiles au cœur de la station balnéaire de Saly. Architecture africaine raffinée, marina et plage de sable fin.",
        phone: "+221 33 957 07 77",
        services: ["Plage privée", "Marina & Pêche au gros", "Spa Balnéo", "Animations Téranga"]
    },
    {
        id: "act-7",
        name: "Excursion Lac Rose & Safari Bandia",
        category: "guide",
        categoryLabel: "Excursion & Safari",
        region: "Sine-Saloum",
        location: "Lac Rose & Réserve de Bandia",
        rating: 4.9,
        reviews: 210,
        price: "35 000",
        priceUnit: "FCFA / personne",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
        description: "Journée combinée safari en 4x4 à la réserve de Bandia (Rhinos, Girafes) et traversée des dunes en quad au Lac Rose.",
        phone: "+221 70 555 44 33",
        services: ["Safari 4x4 guidé", "Quad dans les dunes", "Déjeuner buffet inclus"]
    },
    {
        id: "act-8",
        name: "Hôtel de la Poste Saint-Louis",
        category: "hotel",
        categoryLabel: "Hôtel Historique",
        region: "Saint-Louis",
        location: "Île de Saint-Louis",
        rating: 4.7,
        reviews: 165,
        price: "55 000",
        priceUnit: "FCFA / nuit",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        description: "Hôtel mythique de l'Aéropostale où logeait Jean Mermoz. Emplacement d'exception au pied du Pont Faidherbe.",
        phone: "+221 33 961 11 18",
        services: ["Bar Historique Mermoz", "Vue Pont Faidherbe", "Tours en Calèche"]
    },
    {
        id: "act-9",
        name: "Ecolodge de Djiffer & Delta du Saloum",
        category: "hotel",
        categoryLabel: "Ecolodge",
        region: "Sine-Saloum",
        location: "Delta du Saloum",
        rating: 4.8,
        reviews: 110,
        price: "45 000",
        priceUnit: "FCFA / nuit",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        description: "Havre de paix éco-responsable niché dans les mangroves du Sine-Saloum. Balades en pirogue et observation des oiseaux.",
        phone: "+221 77 444 22 11",
        services: ["Balade pirogue mangrove", "Pêche artisanale", "Cuisine 100% Locale Bio"]
    }
];

// --- Application State ---
const state = {
    wallets: [
        {
            client: "Mariama Diallo",
            telephone: "771234567",
            code: "1234",
            solde: 75000
        }
    ],
    activeWalletIndex: 0,
    transactions: [
        {
            type: "depot",
            montant: 75000,
            frais: 0,
            client: "Mariama Diallo",
            telephone: "771234567",
            date: new Date().toLocaleDateString('fr-FR')
        }
    ],
    selectedCategory: "all",
    searchQuery: "",
    selectedRegion: "all"
};

// --- Helper Functions ---
function formatPrice(amount) {
    return Number(amount).toLocaleString('fr-FR');
}

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

function verificationTailleNumero(telephone) {
    return telephone && telephone.length === 9;
}

function debutNumeroValide(telephone) {
    const prefixes = ['70', '75', '76', '77', '78'];
    const prefix = telephone.substring(0, 2);
    return prefixes.includes(prefix);
}

// --- DOM Rendering ---
function renderActors() {
    const grid = document.getElementById('actorsGrid');
    if (!grid) return;

    let filtered = TOURISM_ACTORS.filter(actor => {
        const matchesCategory = state.selectedCategory === 'all' || actor.category === state.selectedCategory;
        const matchesRegion = state.selectedRegion === 'all' || actor.region.toLowerCase().includes(state.selectedRegion.toLowerCase());
        const matchesQuery = !state.searchQuery ||
            actor.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            actor.location.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            actor.description.toLowerCase().includes(state.searchQuery.toLowerCase());

        return matchesCategory && matchesRegion && matchesQuery;
    });

    // Update counter
    const counterEl = document.getElementById('actorsFoundCount');
    if (counterEl) counterEl.textContent = filtered.length;

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
                <i class="fa-solid fa-compass" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 16px;"></i>
                <h3 style="margin-bottom: 8px;">Aucun acteur touristique trouvé</h3>
                <p style="color: var(--text-secondary);">Essayez de modifier votre recherche ou sélectionnez une autre catégorie.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(actor => `
        <div class="actor-card">
            <div class="actor-img-wrapper">
                <img src="${actor.image}" alt="${actor.name}" class="actor-img" loading="lazy">
                <span class="actor-category-badge">${actor.categoryLabel}</span>
                <span class="actor-rating"><i class="fa-solid fa-star"></i> ${actor.rating} (${actor.reviews})</span>
            </div>
            <div class="actor-body">
                <div class="actor-location">
                    <i class="fa-solid fa-location-dot"></i> ${actor.location}
                </div>
                <h3 class="actor-name">${actor.name}</h3>
                <p class="actor-desc">${actor.description}</p>
                <div class="actor-footer">
                    <div class="actor-price">
                        <span class="price-val">${actor.price} FCFA</span>
                        <span class="price-unit">${actor.priceUnit}</span>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="openActorDetails('${actor.id}')">
                        <i class="fa-solid fa-circle-info"></i> Détails
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateWalletDisplay() {
    const activeWallet = state.wallets[state.activeWalletIndex];

    const soldeEl = document.getElementById('walletSoldeDisplay');
    const clientEl = document.getElementById('walletClientDisplay');
    const phoneEl = document.getElementById('walletPhoneDisplay');

    if (activeWallet) {
        if (soldeEl) soldeEl.textContent = formatPrice(activeWallet.solde);
        if (clientEl) clientEl.textContent = activeWallet.client;
        if (phoneEl) phoneEl.textContent = activeWallet.telephone.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    } else {
        if (soldeEl) soldeEl.textContent = "0";
        if (clientEl) clientEl.textContent = "Aucun wallet actif";
        if (phoneEl) phoneEl.textContent = "-- -- -- --";
    }
}

function renderTransactionsTable() {
    const tbody = document.getElementById('transactionsTableBody');
    if (!tbody) return;

    if (state.transactions.length === 0) {
        tbody.innerHTML = `
            <tr class="empty-row">
                <td colspan="7">
                    <i class="fa-solid fa-folder-open"></i> Aucune transaction enregistrée pour le moment.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = state.transactions.map((tx, idx) => `
        <tr>
            <td><strong>#${idx + 1}</strong></td>
            <td><span class="tx-badge ${tx.type}">${tx.type}</span></td>
            <td>${tx.client || 'Client Pass'} (${tx.telephone})</td>
            <td><strong class="text-emerald">${formatPrice(tx.montant)} FCFA</strong></td>
            <td>${tx.frais ? formatPrice(tx.frais) + ' FCFA' : '0 FCFA'}</td>
            <td><span class="text-emerald"><i class="fa-solid fa-circle-check"></i> Effectué</span></td>
            <td><span style="color: var(--text-muted); font-size: 0.82rem;">${tx.date || new Date().toLocaleDateString('fr-FR')}</span></td>
        </tr>
    `).join('');
}

// --- Toast Notifications ---
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-emerald' : 'fa-circle-exclamation text-orange'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// --- Modal Handlers ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

function openWalletModal() {
    openModal('createWalletModal');
}

function openCreateWalletModal() {
    openModal('createWalletModal');
}

function openDepotModal() {
    const activeWallet = state.wallets[state.activeWalletIndex];
    if (activeWallet) {
        const telInput = document.getElementById('depotTel');
        if (telInput) telInput.value = activeWallet.telephone;
    }
    openModal('depotModal');
}

function openRetraitModal() {
    const activeWallet = state.wallets[state.activeWalletIndex];
    if (activeWallet) {
        const telInput = document.getElementById('retraitTel');
        if (telInput) telInput.value = activeWallet.telephone;
    }
    openModal('retraitModal');
}

function openActorDetails(actorId) {
    const actor = TOURISM_ACTORS.find(a => a.id === actorId);
    if (!actor) return;

    const content = document.getElementById('actorModalContent');
    if (!content) return;

    content.innerHTML = `
        <div style="margin-bottom: 20px;">
            <img src="${actor.image}" alt="${actor.name}" style="width: 100%; height: 220px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <span class="actor-category-badge" style="position: static; display: inline-block; margin-bottom: 8px;">${actor.categoryLabel}</span>
                    <h2 style="font-size: 1.5rem; margin-bottom: 4px;">${actor.name}</h2>
                    <p style="color: var(--text-muted); font-size: 0.88rem;"><i class="fa-solid fa-location-dot text-emerald"></i> ${actor.location}</p>
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 1.4rem; font-weight: 800; color: var(--accent-emerald); font-family: var(--font-heading);">${actor.price} FCFA</span>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${actor.priceUnit}</div>
                </div>
            </div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 0.95rem; line-height: 1.6;">${actor.description}</p>
        <div style="background: var(--bg-card); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 24px;">
            <h4 style="font-size: 0.95rem; margin-bottom: 10px; color: var(--text-primary);"><i class="fa-solid fa-concierge-bell text-emerald"></i> Services & Inclusions</h4>
            <ul style="list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.85rem; color: var(--text-secondary);">
                ${actor.services.map(s => `<li><i class="fa-solid fa-check text-emerald" style="margin-right: 6px;"></i> ${s}</li>`).join('')}
            </ul>
        </div>
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button class="btn btn-ghost" onclick="closeModal('actorModal')">Fermer</button>
            <button class="btn btn-primary-glow" onclick="reserveActor('${actor.name}', '${actor.price}')">
                <i class="fa-solid fa-calendar-check"></i> Réserver avec Pass
            </button>
        </div>
    `;

    openModal('actorModal');
}

function reserveActor(name, price) {
    closeModal('actorModal');
    const activeWallet = state.wallets[state.activeWalletIndex];
    if (!activeWallet) {
        showToast("Veuillez d'abord créer un Pass/Wallet pour réserver", 'error');
        openCreateWalletModal();
        return;
    }

    const priceNum = parseInt(price.replace(/\s/g, ''), 10);
    if (activeWallet.solde < priceNum) {
        showToast(`Solde insuffisant (${formatPrice(activeWallet.solde)} FCFA). Veuillez recharger votre Pass.`, 'error');
        openDepotModal();
        return;
    }

    // Process reservation payment
    activeWallet.solde -= priceNum;
    state.transactions.unshift({
        type: "retrait",
        montant: priceNum,
        frais: 0,
        client: `${activeWallet.client} (Réservation ${name})`,
        telephone: activeWallet.telephone,
        date: new Date().toLocaleDateString('fr-FR')
    });

    updateWalletDisplay();
    renderTransactionsTable();
    showToast(`Réservation pour "${name}" confirmée et réglée par Pass !`, 'success');
}

// --- Wallet Form Actions ---
function handleCreateWallet(event) {
    event.preventDefault();
    const nom = document.getElementById('clientNom').value.trim();
    const tel = document.getElementById('clientTel').value.trim();
    const code = document.getElementById('clientCode').value.trim();
    const solde = parseInt(document.getElementById('clientSolde').value, 10);

    if (!verificationTailleNumero(tel)) {
        showToast("Erreur : le numéro doit comporter exactement 9 chiffres", 'error');
        return;
    }

    if (!debutNumeroValide(tel)) {
        showToast("Erreur : le numéro doit commencer par 70, 75, 76, 77 ou 78", 'error');
        return;
    }

    if (code.length !== 4) {
        showToast("Erreur : le code secret doit comporter 4 chiffres", 'error');
        return;
    }

    // Check existing
    const existingIndex = state.wallets.findIndex(w => w.telephone === tel);
    if (existingIndex !== -1) {
        showToast("Un wallet existe déjà avec ce numéro de téléphone", 'error');
        return;
    }

    const newWallet = { client: nom, telephone: tel, code: code, solde: solde };
    state.wallets.push(newWallet);
    state.activeWalletIndex = state.wallets.length - 1;

    if (solde > 0) {
        state.transactions.unshift({
            type: "depot",
            montant: solde,
            frais: 0,
            client: nom,
            telephone: tel,
            date: new Date().toLocaleDateString('fr-FR')
        });
    }

    updateWalletDisplay();
    renderTransactionsTable();
    closeModal('createWalletModal');
    document.getElementById('createWalletForm').reset();
    showToast(`Pass Tourisme créé avec succès pour ${nom} !`, 'success');
}

function handleDepot(event) {
    event.preventDefault();
    const tel = document.getElementById('depotTel').value.trim();
    const montant = parseInt(document.getElementById('depotMontant').value, 10);

    if (isNaN(montant) || montant <= 0) {
        showToast("Montant de dépôt invalide", 'error');
        return;
    }

    const index = state.wallets.findIndex(w => w.telephone === tel);
    if (index === -1) {
        showToast("Aucun wallet introuvable pour ce numéro", 'error');
        return;
    }

    state.wallets[index].solde += montant;
    state.activeWalletIndex = index;

    state.transactions.unshift({
        type: "depot",
        montant: montant,
        frais: 0,
        client: state.wallets[index].client,
        telephone: tel,
        date: new Date().toLocaleDateString('fr-FR')
    });

    updateWalletDisplay();
    renderTransactionsTable();
    closeModal('depotModal');
    document.getElementById('depotForm').reset();
    showToast(`Recharge de ${formatPrice(montant)} FCFA effectuée avec succès !`, 'success');
}

function handleRetrait(event) {
    event.preventDefault();
    const tel = document.getElementById('retraitTel').value.trim();
    const montant = parseInt(document.getElementById('retraitMontant').value, 10);

    if (isNaN(montant) || montant <= 0) {
        showToast("Erreur : le montant doit être positif", 'error');
        return;
    }

    const index = state.wallets.findIndex(w => w.telephone === tel);
    if (index === -1) {
        showToast("Erreur : aucun wallet associé à ce numéro", 'error');
        return;
    }

    const frais = calculerFrais(montant);
    const totalDebit = montant + frais;

    if (state.wallets[index].solde < totalDebit) {
        showToast(`Solde insuffisant. Requis : ${formatPrice(totalDebit)} FCFA (Frais incl.)`, 'error');
        return;
    }

    state.wallets[index].solde -= totalDebit;
    state.activeWalletIndex = index;

    state.transactions.unshift({
        type: "retrait",
        montant: montant,
        frais: frais,
        client: state.wallets[index].client,
        telephone: tel,
        date: new Date().toLocaleDateString('fr-FR')
    });

    updateWalletDisplay();
    renderTransactionsTable();
    closeModal('retraitModal');
    document.getElementById('retraitForm').reset();
    showToast(`Retrait de ${formatPrice(montant)} FCFA effectué (Frais: ${frais} FCFA)`, 'success');
}

function clearTransactionsLog() {
    state.transactions = [];
    renderTransactionsTable();
    showToast("Historique réinitialisé", 'success');
}

// --- Filtering & Search ---
function filterCategory(cat) {
    state.selectedCategory = cat;

    // Update pills active status
    const pills = document.querySelectorAll('.pill-btn');
    pills.forEach(pill => {
        if (pill.dataset.category === cat) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });

    renderActors();
}

function filterByRegion(regionName) {
    state.selectedRegion = regionName;
    const regionSelect = document.getElementById('heroRegionSelect');
    if (regionSelect) regionSelect.value = regionName;

    renderActors();

    // Smooth scroll to actors section
    const section = document.getElementById('acteurs');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

function triggerSearch() {
    const searchInput = document.getElementById('heroSearchInput');
    const regionSelect = document.getElementById('heroRegionSelect');

    if (searchInput) state.searchQuery = searchInput.value.trim();
    if (regionSelect) state.selectedRegion = regionSelect.value;

    renderActors();

    const section = document.getElementById('acteurs');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

// --- Setup Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Render initial views
    renderActors();
    updateWalletDisplay();
    renderTransactionsTable();

    // Category Pills Event Listeners
    const pills = document.querySelectorAll('.pill-btn');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            filterCategory(pill.dataset.category);
        });
    });

    // Live search on hero input
    const heroSearchInput = document.getElementById('heroSearchInput');
    if (heroSearchInput) {
        heroSearchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.trim();
            renderActors();
        });
    }

    // Fee calculation dynamic update on retrait modal
    const retraitMontantInput = document.getElementById('retraitMontant');
    const feeEstimateValue = document.getElementById('feeEstimateValue');
    if (retraitMontantInput && feeEstimateValue) {
        retraitMontantInput.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val > 0) {
                feeEstimateValue.textContent = `${formatPrice(calculerFrais(val))} FCFA`;
            } else {
                feeEstimateValue.textContent = '0 FCFA';
            }
        });
    }

    // Theme Toggle Handler
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            themeToggleBtn.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
        });
    }

    // Close modals when clicking backdrop
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove('active');
            }
        });
    });
});
