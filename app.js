/**
 * Teranga Tourism & Pass Wallet - Application Frontend Script
 * Sénégal Tourism Actors & Mobile Wallet System
 */

// Initial Data: Acteurs Touristiques du Sénégal
const initialActors = [
    {
        id: 1,
        nom: "King Fahd Palace Hotel",
        category: "hotel",
        region: "Dakar",
        location: "Pointe des Almadies, Dakar",
        telephone: "776389201",
        prix: 85000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Hôtel 5 étoiles face à l'océan Atlantique avec golf 9 trous, spa d'exception et restaurants gastronomiques sénégalais."
    },
    {
        id: 2,
        nom: "Mamour Diallo - Guide Spécialiste Gorée & Musée",
        category: "guide",
        region: "Dakar",
        location: "Île de Gorée, Dakar",
        telephone: "775123456",
        prix: 15000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        description: "Guide agréé passionné d'histoire. Visite guidée privée de la Maison des Esclaves et des ateliers d'artistes de Gorée."
    },
    {
        id: 3,
        nom: "Teranga Express Safaris & Navettes Saly",
        category: "transport",
        region: "Thiès",
        location: "Saly Portudal & Aéroport AIBD",
        telephone: "781092837",
        prix: 25000,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        description: "Transport touristique climatisé premium. Transferts aéroport AIBD - Saly / Somone / Dakar et circuits privés."
    },
    {
        id: 4,
        nom: "Le Flamingo Saint-Louis",
        category: "resto",
        region: "Saint-Louis",
        location: "Bord du Fleuve Sénégal, Saint-Louis",
        telephone: "708912345",
        prix: 12000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        description: "Restaurant mythique de Saint-Louis offrant le meilleur Thiéboudienne de mérou et des concerts de Jazz en soirée."
    },
    {
        id: 5,
        nom: "Ecolodge de Simal - Sine Saloum",
        category: "hotel",
        region: "Fatick",
        location: "Fimela, Sine Saloum",
        telephone: "764501928",
        prix: 45000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        description: "Bungalows sur les bolongs du Sine Saloum. Balades en pirogue au coucher du soleil, observation des oiseaux et pèche."
    },
    {
        id: 6,
        nom: "Casamance Evasion - Excursions Cap Skirring",
        category: "agence",
        region: "Ziguinchor",
        location: "Cap Skirring / Karabane",
        telephone: "753928174",
        prix: 30000,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        description: "Circuit découverte des villages Diolas, royaume d'Oussouye, pèche artisanale et nuits en campements traditionnels."
    }
];

// In-Memory Data Store (Equivalent to repository.php)
let wallets = [
    {
        client: "Ousmane Sarr (Démo Tourist)",
        telephone: "778889900",
        code: "1234",
        solde: 150000
    },
    {
        client: "Aïcha Bâ",
        telephone: "761112233",
        code: "4321",
        solde: 45000
    }
];

let transactions = [
    {
        type: 'depot',
        montant: 150000,
        frais: 0,
        indexClient: 0,
        telephone: "778889900",
        clientNom: "Ousmane Sarr (Démo Tourist)",
        date: new Date().toLocaleTimeString()
    }
];

let bookings = [];
let selectedActorForBooking = null;

// ==========================================
// VALIDATION LOGIC (Mirroring validator.php)
// ==========================================

function verificationTailleNumero(telephone, code) {
    return telephone.length === 9 && code.length === 4;
}

function debutNumero(telephone) {
    const prefixValide = ['70', '75', '76', '77', '78'];
    const prefix = telephone.substring(0, 2);
    return prefixValide.includes(prefix);
}

function montantValide(montant) {
    return !isNaN(montant) && montant > 0;
}

function soldeInitialValide(solde) {
    return !isNaN(solde) && solde >= 0;
}

function verifiTelephoneExiste(telephone) {
    return wallets.some(w => w.telephone === telephone);
}

function verifiCodeExiste(code) {
    return wallets.some(w => w.code === code);
}

function trouverWalletIndex(telephone) {
    return wallets.findIndex(w => w.telephone === telephone);
}

// ==========================================
// SERVICES LOGIC (Mirroring services.php)
// ==========================================

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

// ==========================================
// UI HELPER FUNCTIONS & RENDERING
// ==========================================

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : 'toast-success'}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check'}"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

function formatCFA(amount) {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' CFA';
}

function renderActorsGrid(actorsList = initialActors) {
    const grid = document.getElementById('actorsGrid');
    const badge = document.getElementById('actorCountBadge');

    badge.textContent = `${actorsList.length} Acteur(s) trouvé(s)`;

    if (actorsList.length === 0) {
        grid.innerHTML = `
            <div class="empty-state-box" style="grid-column: 1 / -1;">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h3>Aucun résultat trouvé</h3>
                <p>Ajustez vos filtres de recherche pour découvrir nos prestataires touristiques.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = actorsList.map(actor => `
        <div class="actor-card">
            <div class="actor-card-header">
                <img src="${actor.image}" alt="${actor.nom}" loading="lazy">
                <span class="actor-category-tag">${actor.category}</span>
                <span class="actor-rating"><i class="fa-solid fa-star"></i> ${actor.rating}</span>
            </div>
            <div class="actor-card-body">
                <h3 class="actor-title">${actor.nom}</h3>
                <p class="actor-location"><i class="fa-solid fa-location-dot text-neon"></i> ${actor.location}</p>
                <p class="actor-desc">${actor.description}</p>
                <div class="actor-card-footer">
                    <div class="actor-price-tag">
                        <span class="price-label">Tarif moyen</span>
                        <span class="price-amount">${formatCFA(actor.prix)}</span>
                    </div>
                    <button class="btn-book" onclick="openBookingModal(${actor.id})">
                        <i class="fa-solid fa-calendar-check"></i> Réserver
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateWalletDropdowns() {
    const activeSelect = document.getElementById('selectActiveWallet');
    const modalSelect = document.getElementById('bookingWalletSelect');

    const options = wallets.length > 0
        ? wallets.map((w, index) => `<option value="${index}">${w.client} (${w.telephone}) - ${formatCFA(w.solde)}</option>`).join('')
        : '<option value="">-- Aucun Wallet Créé --</option>';

    activeSelect.innerHTML = options;
    modalSelect.innerHTML = '<option value="">-- Sélectionner votre Wallet --</option>' + options;

    updateCardDisplay();
}

function updateCardDisplay() {
    const select = document.getElementById('selectActiveWallet');
    const index = select.value;

    if (index !== "" && wallets[index]) {
        const w = wallets[index];
        document.getElementById('displayWalletSolde').innerHTML = `${new Intl.NumberFormat('fr-FR').format(w.solde)} <small>CFA</small>`;
        document.getElementById('displayWalletClient').textContent = w.client;
        document.getElementById('displayWalletPhone').textContent = w.telephone;
        document.getElementById('displayWalletCode').textContent = w.code;
    } else {
        document.getElementById('displayWalletSolde').innerHTML = `0 <small>CFA</small>`;
        document.getElementById('displayWalletClient').textContent = "Aucun wallet";
        document.getElementById('displayWalletPhone').textContent = "-- -- -- ---";
        document.getElementById('displayWalletCode').textContent = "****";
    }
}

function renderTransactions() {
    const tbody = document.getElementById('transactionsTableBody');
    if (transactions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center empty-msg">Aucune transaction enregistrée.</td></tr>`;
        return;
    }

    tbody.innerHTML = transactions.map((t, idx) => `
        <tr>
            <td>#${idx + 1}</td>
            <td><span class="${t.type === 'depot' ? 'badge-depot' : 'badge-retrait'}">${t.type.toUpperCase()}</span></td>
            <td><strong>${t.clientNom}</strong><br><small class="text-muted">${t.telephone}</small></td>
            <td><strong class="${t.type === 'depot' ? 'text-neon' : 'text-gold'}">${formatCFA(t.montant)}</strong></td>
            <td>${t.frais ? formatCFA(t.frais) : '0 CFA'}</td>
            <td><i class="fa-solid fa-circle-check text-neon"></i> Effectué</td>
        </tr>
    `).join('');
}

function renderBookings() {
    const container = document.getElementById('bookingListContainer');
    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="empty-state-box">
                <i class="fa-regular fa-calendar-xmark"></i>
                <h3>Aucune réservation en cours</h3>
                <p>Sélectionnez un acteur touristique depuis la liste pour effectuer une réservation directe.</p>
                <button class="btn-primary-neon nav-trigger" data-target="acteurs" onclick="switchTab('acteurs')">Découvrir les Acteurs</button>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="table-responsive">
            <table class="transactions-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Prestataire</th>
                        <th>Catégorie</th>
                        <th>Payé par</th>
                        <th>Montant</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    ${bookings.map(b => `
                        <tr>
                            <td>${b.date}</td>
                            <td><strong>${b.actorName}</strong><br><small class="text-muted">${b.actorLocation}</small></td>
                            <td><span class="actor-category-tag" style="position:static;">${b.category}</span></td>
                            <td>${b.clientName} (${b.telephone})</td>
                            <td><strong class="text-neon">${formatCFA(b.montant)}</strong></td>
                            <td><span class="badge-depot"><i class="fa-solid fa-check"></i> Confirmé</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Modal logic
function openBookingModal(actorId) {
    const actor = initialActors.find(a => a.id === actorId);
    if (!actor) return;

    selectedActorForBooking = actor;
    document.getElementById('modalActorName').textContent = actor.nom;
    document.getElementById('modalActorCategory').textContent = actor.category.toUpperCase();
    document.getElementById('modalActorLocation').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${actor.location}`;
    document.getElementById('modalActorRating').textContent = actor.rating;
    document.getElementById('modalActorPhone').textContent = actor.telephone;
    document.getElementById('modalActorPrice').textContent = formatCFA(actor.prix);
    document.getElementById('modalActorDesc').textContent = actor.description;

    // Set default date to today
    document.getElementById('bookingDate').value = new Date().toISOString().split('T')[0];

    updateWalletDropdowns();
    document.getElementById('bookingModal').classList.add('open');
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.remove('open');
    selectedActorForBooking = null;
}

// Navigation Tab Switcher
function switchTab(targetId) {
    document.querySelectorAll('.app-section').forEach(sec => sec.classList.remove('active-section'));
    const targetSec = document.getElementById(targetId);
    if (targetSec) targetSec.classList.add('active-section');

    // Update active nav links
    document.querySelectorAll('.nav-link, .m-nav-item').forEach(link => {
        if (link.getAttribute('data-target') === targetId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// EVENT LISTENERS & INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // Initial renders
    renderActorsGrid();
    updateWalletDropdowns();
    renderTransactions();
    renderBookings();

    // Navigation triggers
    document.querySelectorAll('[data-target]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const target = trigger.getAttribute('data-target');
            if (target) {
                e.preventDefault();
                switchTab(target);
            }
        });
    });

    document.getElementById('quickWalletBtn').addEventListener('click', () => {
        switchTab('wallet');
    });

    // Category Filter Pills
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', function() {
            document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            filterActors();
        });
    });

    // Region & Search Filters
    document.getElementById('regionFilter').addEventListener('change', filterActors);
    document.getElementById('globalSearchInput').addEventListener('input', filterActors);
    document.getElementById('heroSearchBtn').addEventListener('click', () => {
        switchTab('acteurs');
        filterActors();
    });

    function filterActors() {
        const activeCategory = document.querySelector('.filter-pill.active')?.getAttribute('data-category') || 'all';
        const activeRegion = document.getElementById('regionFilter').value;
        const searchQuery = document.getElementById('globalSearchInput').value.toLowerCase().trim();
        const heroCategory = document.getElementById('heroCategorySelect').value;

        const filtered = initialActors.filter(actor => {
            const matchCategory = activeCategory === 'all'
                ? (heroCategory === 'all' || actor.category === heroCategory)
                : actor.category === activeCategory;

            const matchRegion = activeRegion === 'all' || actor.region === activeRegion;

            const matchSearch = searchQuery === '' ||
                actor.nom.toLowerCase().includes(searchQuery) ||
                actor.location.toLowerCase().includes(searchQuery) ||
                actor.description.toLowerCase().includes(searchQuery);

            return matchCategory && matchRegion && matchSearch;
        });

        renderActorsGrid(filtered);
    }

    // Wallet Selector Dropdown
    document.getElementById('selectActiveWallet').addEventListener('change', updateCardDisplay);

    // Wallet Sub-Tabs
    document.querySelectorAll('.w-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.w-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.w-tab-content').forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            const targetContent = document.getElementById(this.getAttribute('data-tab'));
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // Live fee estimation on Retrait form input
    document.getElementById('retraitMontant').addEventListener('input', function() {
        const montant = parseInt(this.value);
        const previewBlock = document.getElementById('feePreviewBlock');

        if (montantValide(montant)) {
            const frais = calculerFrais(montant);
            const total = montant + frais;
            document.getElementById('calcFraisVal').textContent = new Intl.NumberFormat('fr-FR').format(frais);
            document.getElementById('calcTotalVal').textContent = new Intl.NumberFormat('fr-FR').format(total);
            previewBlock.style.display = 'block';
        } else {
            previewBlock.style.display = 'none';
        }
    });

    // 1. Form Action: Créer Wallet
    document.getElementById('formCreateWallet').addEventListener('submit', (e) => {
        e.preventDefault();
        const nom = document.getElementById('createNom').value.trim();
        const phone = document.getElementById('createPhone').value.trim();
        const code = document.getElementById('createCode').value.trim();
        const solde = parseInt(document.getElementById('createSolde').value);

        if (!verificationTailleNumero(phone, code)) {
            showToast("Erreur : Le numéro doit comporter 9 chiffres et le code 4 chiffres.", 'error');
            return;
        }

        if (!debutNumero(phone)) {
            showToast("Erreur : Le numéro doit commencer par 70, 75, 76, 77 ou 78.", 'error');
            return;
        }

        if (!soldeInitialValide(solde)) {
            showToast("Erreur : Le solde initial doit être supérieur ou égal à 0.", 'error');
            return;
        }

        if (verifiTelephoneExiste(phone)) {
            showToast("Erreur : Ce numéro de téléphone est déjà associé à un wallet.", 'error');
            return;
        }

        if (verifiCodeExiste(code)) {
            showToast("Erreur : Ce code secret existe déjà. Veuillez en choisir un autre.", 'error');
            return;
        }

        const newWallet = {
            client: nom,
            telephone: phone,
            code: code,
            solde: solde
        };

        wallets.push(newWallet);
        updateWalletDropdowns();
        showToast(`Wallet pour ${nom} créé avec succès !`, 'success');
        document.getElementById('formCreateWallet').reset();
    });

    // 2. Form Action: Dépôt
    document.getElementById('formDepot').addEventListener('submit', (e) => {
        e.preventDefault();
        const phone = document.getElementById('depotPhone').value.trim();
        const montant = parseInt(document.getElementById('depotMontant').value);

        if (!montantValide(montant)) {
            showToast("Erreur : Montant invalide.", 'error');
            return;
        }

        const index = trouverWalletIndex(phone);
        if (index === -1) {
            showToast("Erreur : Wallet introuvable pour ce numéro.", 'error');
            return;
        }

        wallets[index].solde += montant;

        transactions.unshift({
            type: 'depot',
            montant: montant,
            frais: 0,
            indexClient: index,
            telephone: phone,
            clientNom: wallets[index].client,
            date: new Date().toLocaleTimeString()
        });

        updateWalletDropdowns();
        renderTransactions();
        showToast(`Dépôt de ${formatCFA(montant)} effectué. Nouveau solde : ${formatCFA(wallets[index].solde)}`, 'success');
        document.getElementById('formDepot').reset();
    });

    // 3. Form Action: Retrait
    document.getElementById('formRetrait').addEventListener('submit', (e) => {
        e.preventDefault();
        const phone = document.getElementById('retraitPhone').value.trim();
        const montant = parseInt(document.getElementById('retraitMontant').value);

        if (!montantValide(montant)) {
            showToast("Erreur : Le montant du retrait doit être positif.", 'error');
            return;
        }

        const index = trouverWalletIndex(phone);
        if (index === -1) {
            showToast("Erreur : Aucun wallet associé à ce numéro.", 'error');
            return;
        }

        const frais = calculerFrais(montant);
        const totalDebit = montant + frais;

        if (wallets[index].solde < totalDebit) {
            showToast(`Solde insuffisant ! Requis : ${formatCFA(totalDebit)} (dont ${formatCFA(frais)} de frais).`, 'error');
            return;
        }

        wallets[index].solde -= totalDebit;

        transactions.unshift({
            type: 'retrait',
            montant: montant,
            frais: frais,
            indexClient: index,
            telephone: phone,
            clientNom: wallets[index].client,
            date: new Date().toLocaleTimeString()
        });

        updateWalletDropdowns();
        renderTransactions();
        document.getElementById('feePreviewBlock').style.display = 'none';
        showToast(`Retrait de ${formatCFA(montant)} (frais: ${formatCFA(frais)}) réussi. Nouveau solde : ${formatCFA(wallets[index].solde)}`, 'success');
        document.getElementById('formRetrait').reset();
    });

    // 4. Modal Booking Submit Form
    document.getElementById('formSubmitBooking').addEventListener('submit', (e) => {
        e.preventDefault();
        if (!selectedActorForBooking) return;

        const date = document.getElementById('bookingDate').value;
        const walletIndex = document.getElementById('bookingWalletSelect').value;

        if (walletIndex === "") {
            showToast("Veuillez sélectionner un Teranga Pass Wallet pour le paiement.", 'error');
            return;
        }

        const wallet = wallets[walletIndex];
        const montant = selectedActorForBooking.prix;
        const frais = calculerFrais(montant);
        const total = montant + frais;

        if (wallet.solde < total) {
            showToast(`Solde insuffisant sur ce wallet. Requis : ${formatCFA(total)} (avec frais).`, 'error');
            return;
        }

        wallet.solde -= total;

        bookings.unshift({
            date: date,
            actorName: selectedActorForBooking.nom,
            actorLocation: selectedActorForBooking.location,
            category: selectedActorForBooking.category,
            clientName: wallet.client,
            telephone: wallet.telephone,
            montant: montant
        });

        transactions.unshift({
            type: 'retrait',
            montant: montant,
            frais: frais,
            indexClient: walletIndex,
            telephone: wallet.telephone,
            clientNom: wallet.client,
            date: new Date().toLocaleTimeString()
        });

        updateWalletDropdowns();
        renderTransactions();
        renderBookings();
        closeBookingModal();
        showToast(`Réservation auprès de ${selectedActorForBooking.nom} confirmée et réglée par Teranga Pass !`, 'success');
    });

    // Close Modal Button & Overlay Click
    document.getElementById('closeBookingModal').addEventListener('click', closeBookingModal);
    document.getElementById('bookingModal').addEventListener('click', (e) => {
        if (e.target.id === 'bookingModal') closeBookingModal();
    });

});
