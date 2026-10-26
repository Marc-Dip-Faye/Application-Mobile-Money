// Initial Sample Data for Senegal Tourism Actors
const tourismActors = [
    {
        id: 1,
        name: "Hôtel Radisson Blu Dakar",
        category: "hotel",
        location: "Dakar",
        price: 120000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        description: "Hôtel 5 étoiles de prestige situé sur la corniche ouest de Dakar avec vue panoramique sur l'Océan Atlantique."
    },
    {
        id: 2,
        name: "Lodge de la Somone",
        category: "hotel",
        location: "Saly",
        price: 65000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        description: "Bungalows éco-responsables nichés au bord de la lagune de la Somone, idéal pour le calme et la nature."
    },
    {
        id: 3,
        name: "Chez Loutcha Gastronomie",
        category: "restaurant",
        location: "Dakar",
        price: 12000,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
        description: "Spécialités sénégalaises authentiques: Thieboudienne, Yassa au poulet et Mafé dans une ambiance conviviale."
    },
    {
        id: 4,
        name: "Restaurant La Fourchette",
        category: "restaurant",
        location: "Dakar",
        price: 25000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
        description: "Cuisine fusion internationale et fruits de mer frais en plein centre-ville de Dakar."
    },
    {
        id: 5,
        name: "Guide Culturel Île de Gorée - Ousmane",
        category: "guide",
        location: "Gorée",
        price: 15000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        description: "Circuit historique guidé personnalisé sur l'île de Gorée et la Maison des Esclaves."
    },
    {
        id: 6,
        name: "Teranga Excursions Delta Saloum",
        category: "transport",
        location: "Sine Saloum",
        price: 35000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        description: "Balade en pirogue motorisée traditionnelle à travers la mangrove du Sine Saloum."
    },
    {
        id: 7,
        name: "Village Artisanal de Soumbédioune",
        category: "artisan",
        location: "Dakar",
        price: 10000,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80",
        description: "Sculptures sur bois, bijoux en argent, tableaux sous verre et objets d'art sénégalais."
    },
    {
        id: 8,
        name: "Cap Skirring Ocean Resort",
        category: "hotel",
        location: "Casamance",
        price: 85000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
        description: "Hôtel de luxe bordé de cocotiers sur les magnifiques plages de sable blanc de Casamance."
    }
];

// Initial Wallets State
let wallets = [
    { client: "Awa Diop", telephone: "778123456", code: "1234", solde: 150000 },
    { client: "Jean Dupont", telephone: "781002030", code: "0000", solde: 85000 }
];

let activeWalletIndex = 0;
let transactions = [];

// Helper Functions
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

function verificationTailleNumero(telephone, code) {
    return telephone.length === 9 && code.length === 4;
}

function debutNumero(telephone) {
    const validPrefixes = ['70', '75', '76', '77', '78'];
    const prefix = telephone.substring(0, 2);
    return validPrefixes.includes(prefix);
}

function verifiTelephoneExiste(phone) {
    return wallets.some(w => w.telephone === phone);
}

function verifiCodeExiste(code) {
    return wallets.some(w => w.code === code);
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3500);
}

// UI Render Functions
function renderActors(categoryFilter = 'all', searchQuery = '', locationFilter = 'all') {
    const grid = document.getElementById('actors-grid');
    grid.innerHTML = '';

    const filtered = tourismActors.filter(actor => {
        const matchesCategory = categoryFilter === 'all' || actor.category === categoryFilter;
        const matchesLocation = locationFilter === 'all' || actor.location === locationFilter;
        const matchesSearch = actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              actor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              actor.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesLocation && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<p class="empty-text" style="grid-column: 1/-1;">Aucun acteur du tourisme ne correspond à vos critères.</p>`;
        return;
    }

    filtered.forEach(actor => {
        const card = document.createElement('div');
        card.className = 'actor-card glass-card';
        card.innerHTML = `
            <div class="actor-card-header" style="background-image: url('${actor.image}')">
                <span class="actor-category-badge">${getCategoryLabel(actor.category)}</span>
                <span class="actor-rating"><i class="fa-solid fa-star"></i> ${actor.rating}</span>
            </div>
            <div class="actor-card-body">
                <p class="actor-location"><i class="fa-solid fa-location-dot"></i> ${actor.location}, Sénégal</p>
                <h3 class="actor-name">${actor.name}</h3>
                <p class="actor-desc">${actor.description}</p>
                <div class="actor-card-footer">
                    <div class="price-box">
                        <span class="price-label">À partir de</span>
                        <span class="price-val">${actor.price.toLocaleString('fr-FR')} CFA</span>
                    </div>
                    <button class="btn btn-primary btn-pay-actor" data-id="${actor.id}">
                        <i class="fa-solid fa-bolt"></i> Réserver
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Attach payment buttons listener
    document.querySelectorAll('.btn-pay-actor').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const actorId = parseInt(e.currentTarget.getAttribute('data-id'));
            openPaymentModal(actorId);
        });
    });
}

function getCategoryLabel(cat) {
    switch (cat) {
        case 'hotel': return 'Hôtel & Lodge';
        case 'restaurant': return 'Restaurant';
        case 'guide': return 'Guide Touristique';
        case 'transport': return 'Transport';
        case 'artisan': return 'Artisanat';
        default: return 'Tourisme';
    }
}

function renderWalletUI() {
    const activeWallet = wallets[activeWalletIndex];

    if (activeWallet) {
        document.getElementById('wallet-holder-name').textContent = activeWallet.client;
        document.getElementById('wallet-holder-phone').innerHTML = `<i class="fa-solid fa-phone"></i> Numéro: ${activeWallet.telephone}`;
        document.getElementById('wallet-balance').textContent = activeWallet.solde.toLocaleString('fr-FR');
        document.getElementById('header-wallet-balance').textContent = `${activeWallet.solde.toLocaleString('fr-FR')} CFA`;
    } else {
        document.getElementById('wallet-holder-name').textContent = "Aucun Wallet";
        document.getElementById('wallet-holder-phone').textContent = "Numéro: --";
        document.getElementById('wallet-balance').textContent = "0";
        document.getElementById('header-wallet-balance').textContent = "0 CFA";
    }

    // Render wallet switcher list
    const selectorList = document.getElementById('wallet-selector-list');
    selectorList.innerHTML = '';

    wallets.forEach((w, index) => {
        const item = document.createElement('button');
        item.className = `wallet-item-btn ${index === activeWalletIndex ? 'active' : ''}`;
        item.innerHTML = `
            <div>
                <strong>${w.client}</strong>
                <div style="font-size:0.75rem; color:var(--text-dim);">${w.telephone}</div>
            </div>
            <span style="font-weight:700; color:var(--neon-green);">${w.solde.toLocaleString('fr-FR')} CFA</span>
        `;
        item.addEventListener('click', () => {
            activeWalletIndex = index;
            renderWalletUI();
            showToast(`Wallet actif changé pour ${w.client}`);
        });
        selectorList.appendChild(item);
    });

    // Render transactions history
    const historyContainer = document.getElementById('transaction-history');
    if (transactions.length === 0) {
        historyContainer.innerHTML = `<p class="empty-text">Aucune transaction enregistrée.</p>`;
    } else {
        historyContainer.innerHTML = '';
        transactions.slice().reverse().forEach(tx => {
            const walletClient = wallets[tx.indexClient] ? wallets[tx.indexClient].client : 'Inconnu';
            const item = document.createElement('div');
            item.className = 'tx-item';

            let isNegative = tx.type === 'retrait' || tx.type === 'paiement';
            let typeLabel = tx.type === 'retrait' ? 'Retrait' : (tx.type === 'depot' ? 'Dépôt' : 'Paiement Service');
            let iconClass = tx.type === 'depot' ? 'fa-arrow-down-long' : 'fa-arrow-up-long';

            item.innerHTML = `
                <div class="tx-icon ${tx.type}">
                    <i class="fa-solid ${iconClass}"></i>
                </div>
                <div class="tx-details">
                    <div class="tx-title">${typeLabel} ${tx.target ? '- ' + tx.target : ''}</div>
                    <div class="tx-sub">${walletClient} ${tx.frais ? '• Frais: ' + tx.frais + ' CFA' : ''}</div>
                </div>
                <div class="tx-amount ${isNegative ? 'neg' : 'pos'}">
                    ${isNegative ? '-' : '+'}${tx.montant.toLocaleString('fr-FR')} CFA
                </div>
            `;
            historyContainer.appendChild(item);
        });
    }
}

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function openPaymentModal(actorId) {
    const actor = tourismActors.find(a => a.id === actorId);
    if (!actor) return;

    document.getElementById('pay-actor-id').value = actor.id;
    document.getElementById('pay-actor-title').textContent = actor.name;
    document.getElementById('pay-actor-price').textContent = `${actor.price.toLocaleString('fr-FR')} CFA`;

    const paySelect = document.getElementById('pay-phone');
    paySelect.innerHTML = '';
    wallets.forEach((w, idx) => {
        const opt = document.createElement('option');
        opt.value = w.telephone;
        opt.textContent = `${w.client} (${w.telephone}) - Solde: ${w.solde.toLocaleString('fr-FR')} CFA`;
        if (idx === activeWalletIndex) opt.selected = true;
        paySelect.appendChild(opt);
    });

    openModal('modal-payment');
}

// Event Listeners Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderActors();
    renderWalletUI();

    // Search and filters
    const searchInput = document.getElementById('search-input');
    const locationSelect = document.getElementById('location-select');
    const categoryChips = document.querySelectorAll('.chip');

    let currentCategory = 'all';

    categoryChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            categoryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentCategory = chip.getAttribute('data-category');
            renderActors(currentCategory, searchInput.value, locationSelect.value);
        });
    });

    searchInput.addEventListener('input', () => {
        renderActors(currentCategory, searchInput.value, locationSelect.value);
    });

    locationSelect.addEventListener('change', () => {
        renderActors(currentCategory, searchInput.value, locationSelect.value);
    });

    // Header Quick Wallet Button
    document.getElementById('quick-wallet-btn').addEventListener('click', () => {
        document.getElementById('wallet-section').scrollIntoView({ behavior: 'smooth' });
    });

    // Modal Triggers
    document.getElementById('btn-open-create').addEventListener('click', () => openModal('modal-create-wallet'));
    document.getElementById('btn-open-deposit').addEventListener('click', () => {
        const activeWallet = wallets[activeWalletIndex];
        if (activeWallet) {
            document.getElementById('deposit-phone').value = activeWallet.telephone;
        }
        openModal('modal-deposit');
    });
    document.getElementById('btn-open-withdraw').addEventListener('click', () => {
        const activeWallet = wallets[activeWalletIndex];
        if (activeWallet) {
            document.getElementById('withdraw-phone').value = activeWallet.telephone;
        }
        openModal('modal-withdraw');
    });

    // Close Modal buttons
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = e.currentTarget.getAttribute('data-close');
            closeModal(modalId);
        });
    });

    // Create Wallet Form Handler
    document.getElementById('form-create-wallet').addEventListener('submit', (e) => {
        e.preventDefault();
        const client = document.getElementById('create-client').value.trim();
        const phone = document.getElementById('create-phone').value.trim();
        const code = document.getElementById('create-code').value.trim();
        const solde = parseInt(document.getElementById('create-solde').value);

        if (!verificationTailleNumero(phone, code)) {
            showToast("Téléphone (9 chiffres) ou Code (4 chiffres) invalide.", "error");
            return;
        }
        if (!debutNumero(phone)) {
            showToast("Le numéro doit commencer par 70, 75, 76, 77 ou 78.", "error");
            return;
        }
        if (verifiTelephoneExiste(phone)) {
            showToast("Ce numéro de téléphone est déjà enregistré.", "error");
            return;
        }
        if (verifiCodeExiste(code)) {
            showToast("Ce code secret est déjà utilisé.", "error");
            return;
        }

        const newWallet = { client, telephone: phone, code, solde };
        wallets.push(newWallet);
        activeWalletIndex = wallets.length - 1;

        renderWalletUI();
        closeModal('modal-create-wallet');
        showToast("Portefeuille Teranga Pass créé avec succès !");
        e.target.reset();
    });

    // Deposit Form Handler
    document.getElementById('form-deposit').addEventListener('submit', (e) => {
        e.preventDefault();
        const phone = document.getElementById('deposit-phone').value.trim();
        const amount = parseInt(document.getElementById('deposit-amount').value);

        const index = wallets.findIndex(w => w.telephone === phone);
        if (index === -1) {
            showToast("Aucun wallet trouvé pour ce numéro.", "error");
            return;
        }
        if (amount <= 0) {
            showToast("Le montant doit être positif.", "error");
            return;
        }

        wallets[index].solde += amount;
        transactions.push({
            type: 'depot',
            montant: amount,
            indexClient: index
        });

        activeWalletIndex = index;
        renderWalletUI();
        closeModal('modal-deposit');
        showToast(`Dépôt de ${amount.toLocaleString('fr-FR')} CFA effectué !`);
        e.target.reset();
    });

    // Withdraw Calculation & Form Handler
    const withdrawAmountInput = document.getElementById('withdraw-amount');
    withdrawAmountInput.addEventListener('input', () => {
        const val = parseInt(withdrawAmountInput.value) || 0;
        const fee = calculerFrais(val);
        document.getElementById('withdraw-fee-calc').textContent = `${fee} CFA`;
        document.getElementById('withdraw-total-calc').textContent = `Total débité: ${(val + fee).toLocaleString('fr-FR')} CFA`;
    });

    document.getElementById('form-withdraw').addEventListener('submit', (e) => {
        e.preventDefault();
        const phone = document.getElementById('withdraw-phone').value.trim();
        const amount = parseInt(withdrawAmountInput.value);

        const index = wallets.findIndex(w => w.telephone === phone);
        if (index === -1) {
            showToast("Aucun wallet associé à ce numéro.", "error");
            return;
        }
        if (amount <= 0) {
            showToast("Le montant du retrait doit être positif.", "error");
            return;
        }

        const frais = calculerFrais(amount);
        const total = amount + frais;

        if (wallets[index].solde < total) {
            showToast(`Solde insuffisant. Requis: ${total.toLocaleString('fr-FR')} CFA`, "error");
            return;
        }

        wallets[index].solde -= total;
        transactions.push({
            type: 'retrait',
            montant: amount,
            frais: frais,
            indexClient: index
        });

        activeWalletIndex = index;
        renderWalletUI();
        closeModal('modal-withdraw');
        showToast(`Retrait de ${amount.toLocaleString('fr-FR')} CFA réussi !`);
        e.target.reset();
    });

    // Payment Form Handler
    document.getElementById('form-payment').addEventListener('submit', (e) => {
        e.preventDefault();
        const actorId = parseInt(document.getElementById('pay-actor-id').value);
        const phone = document.getElementById('pay-phone').value;
        const actor = tourismActors.find(a => a.id === actorId);

        if (!actor) return;

        const index = wallets.findIndex(w => w.telephone === phone);
        if (index === -1) {
            showToast("Wallet introuvable.", "error");
            return;
        }

        if (wallets[index].solde < actor.price) {
            showToast("Solde insuffisant sur ce portefeuille.", "error");
            return;
        }

        wallets[index].solde -= actor.price;
        transactions.push({
            type: 'paiement',
            montant: actor.price,
            target: actor.name,
            indexClient: index
        });

        activeWalletIndex = index;
        renderWalletUI();
        closeModal('modal-payment');
        showToast(`Réservation et paiement confirmés auprès de ${actor.name} !`);
    });

    // Mobile Dock Navigation switching
    document.querySelectorAll('.dock-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.dock-item').forEach(b => b.classList.remove('active'));
            const target = btn.getAttribute('data-target');
            btn.classList.add('active');
            document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
        });
    });
});
