/**
 * Teranga Tourism & Wallet Application Script
 */

// --- 1. Initial State & Data ---

const initialActeurs = [
    {
        id: 1,
        nom: "Hôtel Teranga & Spa",
        categorie: "hotel",
        region: "Dakar",
        adresse: "Place de l'Indépendance, Dakar",
        description: "Hôtel 5 étoiles emblématique au cœur de Dakar offrant vue sur l'océan, piscine à débordement et gastronomie raffinée.",
        tarif: 85000,
        unite: "/ nuit",
        rating: 4.9,
        telephone: "776543210",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
        equipements: ["Piscine", "Wifi 5G", "Spa", "Restaurant", "Transfert Aéroport"]
    },
    {
        id: 2,
        nom: "Mamadou Ba - Guide Certifié Gorée & Dakar",
        categorie: "guide",
        region: "Dakar",
        adresse: "Île de Gorée & Dakar",
        description: "Guide touristique officiel passionné par l'histoire de Gorée, la Maison des Esclaves et la culture Lébou.",
        tarif: 25000,
        unite: "/ journée",
        rating: 5.0,
        telephone: "781234567",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
        equipements: ["Français", "Anglais", "Wolof", "Billet chaloupe incl."]
    },
    {
        id: 3,
        nom: "Saly Eco-Lodge & Bungalows",
        categorie: "hotel",
        region: "Thies",
        adresse: "Saly Portudal, Petite Côte",
        description: "Bungalows éco-responsables au bord de la plage avec activités nautiques et jardin tropical d'exception.",
        tarif: 50000,
        unite: "/ nuit",
        rating: 4.8,
        telephone: "772223344",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
        equipements: ["Accès Plage", "Piscine", "Restaurant Bio", "Climatisation"]
    },
    {
        id: 4,
        nom: "Casamance Evasion Safari & Excursions",
        categorie: "agence",
        region: "Casamance",
        adresse: "Ziguinchor / Cap Skirring",
        description: "Excursions en pirogue à travers les bolongs, observation des dauphins et immersion culturelle Diola.",
        tarif: 40000,
        unite: "/ excursion",
        rating: 4.9,
        telephone: "763334455",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
        equipements: ["Pirogue Sécurisée", "Déjeuner Pêcheur", "Guide Local", "Matériel"]
    },
    {
        id: 5,
        nom: "Le Lagon 1 - Gastronomie & Poisson",
        categorie: "restaurant",
        region: "Dakar",
        adresse: "Route de la Corniche Est, Dakar",
        description: "Restaurant mythique sur pilotis proposant le meilleur de la cuisine de mer sénégalaise et internationale.",
        tarif: 18000,
        unite: "/ repas moyen",
        rating: 4.7,
        telephone: "704445566",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
        equipements: ["Vue Mer", "Terrasse Pilotis", "Thieboudienne Royale", "Cocktails"]
    },
    {
        id: 6,
        nom: "Village Artisanal de Soumbédioune",
        categorie: "artisan",
        region: "Dakar",
        adresse: "Soumbédioune, Corniche Ouest",
        description: "Coopérative d'artisanat d'art : sculptures en bois de baobab, bijoux en argent, maroquinerie et sous-verres.",
        tarif: 5000,
        unite: "/ atelier",
        rating: 4.6,
        telephone: "755556677",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
        equipements: ["Sur Mesure", "Atelier Sculpture", "Expédition Express"]
    },
    {
        id: 7,
        nom: "Teranga Express Shuttle Airport AIBD",
        categorie: "transport",
        region: "Dakar",
        adresse: "Aéroport AIBD <-> Dakar / Saly",
        description: "Service de transport touristique VTC premium avec chauffeurs bilingues, wifi à bord et climatisation.",
        tarif: 30000,
        unite: "/ trajet",
        rating: 4.9,
        telephone: "778889900",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop",
        equipements: ["Suivi Vol", "Siège Bébé", "Paiement Mobile", "Clim 4x4"]
    },
    {
        id: 8,
        nom: "Hôtel La Saint-Louisienne & Djoudj Tour",
        categorie: "hotel",
        region: "Saint-Louis",
        adresse: "Île de Saint-Louis",
        description: "Charme colonial sur le fleuve Sénégal avec forfait expédition vers le parc national des oiseaux du Djoudj.",
        tarif: 45000,
        unite: "/ nuit",
        rating: 4.8,
        telephone: "789990011",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
        equipements: ["Patio Colonial", "Visite en Caleche", "Excursion Djoudj"]
    }
];

// PHP-Equivalent Wallet Business Logic State
let wallets = [
    {
        client: "Bamba Ndiaye",
        telephone: "771234567",
        code: "1234",
        solde: 150000
    },
    {
        client: "Fatou Sow",
        telephone: "789876543",
        code: "0000",
        solde: 85000
    }
];

let transactions = [
    {
        type: "depot",
        montant: 50000,
        frais: 0,
        indexClient: 0,
        date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    },
    {
        type: "retrait",
        montant: 20000,
        frais: 500,
        indexClient: 0,
        date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
];

let activeWalletIndex = 0; // Default active wallet

// --- 2. Helper & Validator Functions (Mirroring validator.php & services.php & repository.php) ---

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

function trouverWalletIndex(walletsList, telephone) {
    return walletsList.findIndex(w => w.telephone === telephone);
}

function verifiTelephoneExiste(walletsList, telephone) {
    return walletsList.some(w => w.telephone === telephone);
}

function verifiCodeExiste(walletsList, code) {
    return walletsList.some(w => w.code === code);
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

// Format currency in FCFA
function formatCFA(amount) {
    return new Intl.NumberFormat('fr-FR').format(amount);
}

// --- 3. UI Rendering & Interactions ---

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderActeurs('all', '');
    updateWalletUI();
    renderTransactions();
    setupEventListeners();
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('teranga_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }
}

// Render Acteurs Grid
function renderActeurs(categoryFilter = 'all', searchTerm = '', regionFilter = 'all') {
    const grid = document.getElementById('acteurs-grid');
    if (!grid) return;

    let filtered = initialActeurs.filter(actor => {
        const matchesCategory = categoryFilter === 'all' || actor.categorie === categoryFilter;
        const matchesRegion = regionFilter === 'all' || actor.region === regionFilter;
        const searchLower = searchTerm.toLowerCase().trim();
        const matchesSearch = !searchTerm ||
            actor.nom.toLowerCase().includes(searchLower) ||
            actor.description.toLowerCase().includes(searchLower) ||
            actor.adresse.toLowerCase().includes(searchLower);

        return matchesCategory && matchesRegion && matchesSearch;
    });

    const statCount = document.getElementById('stat-count-acteurs');
    if (statCount) statCount.textContent = `${filtered.length}+`;

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;" class="glass-card">
                <i class="fa-solid fa-compass-slash" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                <h3>Aucun acteur trouvé</h3>
                <p class="text-muted">Essayez de modifier votre recherche ou vos filtres.</p>
            </div>
        `;
        return;
    }

    const categoryLabels = {
        hotel: "Hôtel & Résidence",
        guide: "Guide Certifié",
        agence: "Agence & Excursion",
        restaurant: "Restaurant & Gastronomie",
        artisan: "Artisanat & Culture",
        transport: "Transport Touristique"
    };

    grid.innerHTML = filtered.map(actor => `
        <div class="acteur-card glass-card">
            <div class="acteur-thumb">
                <img src="${actor.image}" alt="${actor.nom}" loading="lazy">
                <span class="category-badge">${categoryLabels[actor.categorie] || actor.categorie}</span>
                <span class="rating-badge"><i class="fa-solid fa-star"></i> ${actor.rating}</span>
            </div>
            <div class="acteur-body">
                <div class="acteur-location">
                    <i class="fa-solid fa-location-dot"></i> ${actor.adresse}
                </div>
                <h3 class="acteur-title">${actor.nom}</h3>
                <p class="acteur-desc">${actor.description}</p>
                <div class="acteur-footer">
                    <div class="price-tag">
                        ${formatCFA(actor.tarif)} <small>FCFA ${actor.unite}</small>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-sm btn-outline btn-details" data-id="${actor.id}">
                            <i class="fa-solid fa-eye"></i> Détails
                        </button>
                        <button class="btn btn-sm btn-primary btn-book" data-id="${actor.id}">
                            <i class="fa-solid fa-bookmark"></i> Payer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Attach event listeners to card buttons
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            showActorDetails(id);
        });
    });

    document.querySelectorAll('.btn-book').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            openBookingModal(id);
        });
    });
}

// Show Actor Modal Details
function showActorDetails(actorId) {
    const actor = initialActeurs.find(a => a.id === actorId);
    if (!actor) return;

    const modal = document.getElementById('actor-modal');
    const content = document.getElementById('modal-content');

    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
            <img src="${actor.image}" alt="${actor.nom}" style="width: 100%; height: 220px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1rem;">
            <span class="category-badge" style="position: static; display: inline-block;">${actor.categorie.toUpperCase()}</span>
            <h2 style="margin-top: 0.5rem;">${actor.nom}</h2>
            <p class="text-muted"><i class="fa-solid fa-location-dot text-primary"></i> ${actor.adresse}</p>
        </div>
        <p style="margin-bottom: 1.5rem;">${actor.description}</p>
        <div style="margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-check-circle text-primary"></i> Prestations & Équipements</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${actor.equipements.map(e => `<span class="fee-info-pill" style="background: rgba(0,255,135,0.1); padding: 0.4rem 0.8rem; border-radius: var(--radius-sm);"><i class="fa-solid fa-shield"></i> ${e}</span>`).join('')}
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1rem;">
            <div class="price-tag">${formatCFA(actor.tarif)} FCFA <small>${actor.unite}</small></div>
            <button class="btn btn-primary" onclick="closeModal('actor-modal'); openBookingModal(${actor.id});">
                <i class="fa-solid fa-credit-card"></i> Payer via Teranga Wallet
            </button>
        </div>
    `;

    modal.classList.remove('hidden');
}

// Booking Modal
function openBookingModal(actorId) {
    const actor = initialActeurs.find(a => a.id === actorId);
    if (!actor) return;

    document.getElementById('pay-actor-id').value = actor.id;
    document.getElementById('pay-actor-name').value = actor.nom;
    document.getElementById('pay-amount').value = actor.tarif;

    // Fill current active wallet phone if available
    if (wallets[activeWalletIndex]) {
        document.getElementById('pay-phone').value = wallets[activeWalletIndex].telephone;
    }

    const bookingModal = document.getElementById('booking-modal');
    bookingModal.classList.remove('hidden');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
}

// --- 4. Wallet Operations & Logic ---

function updateWalletUI() {
    const nameElem = document.getElementById('display-client-name');
    const phoneElem = document.getElementById('display-client-phone');
    const balanceElem = document.getElementById('display-wallet-balance');

    if (wallets.length > 0 && activeWalletIndex >= 0 && wallets[activeWalletIndex]) {
        const current = wallets[activeWalletIndex];
        if (nameElem) nameElem.textContent = current.client;
        if (phoneElem) phoneElem.textContent = `TEL: ${current.telephone}`;
        if (balanceElem) balanceElem.textContent = formatCFA(current.solde);
    } else {
        if (nameElem) nameElem.textContent = "Aucun wallet sélectionné";
        if (phoneElem) phoneElem.textContent = "---";
        if (balanceElem) balanceElem.textContent = "0";
    }
}

function showAlert(message, type = 'success') {
    const alertBox = document.getElementById('wallet-alert');
    if (!alertBox) return;

    alertBox.className = `alert-box ${type}`;
    alertBox.textContent = message;
    alertBox.classList.remove('hidden');

    setTimeout(() => {
        alertBox.classList.add('hidden');
    }, 5000);
}

function renderTransactions() {
    const list = document.getElementById('transactions-list');
    if (!list) return;

    if (transactions.length === 0) {
        list.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem;" class="text-muted">Aucune transaction enregistrée</td></tr>`;
        return;
    }

    list.innerHTML = transactions.map((tx, i) => {
        const client = wallets[tx.indexClient] ? wallets[tx.indexClient].client : "Client Inconnu";
        const phone = wallets[tx.indexClient] ? wallets[tx.indexClient].telephone : "N/A";

        let typeBadgeClass = 'paiement';
        let typeLabel = 'Paiement';
        if (tx.type === 'depot') { typeBadgeClass = 'depot'; typeLabel = 'Dépôt'; }
        if (tx.type === 'retrait') { typeBadgeClass = 'retrait'; typeLabel = 'Retrait'; }

        return `
            <tr>
                <td>#${i + 1}</td>
                <td><span class="badge-tx ${typeBadgeClass}">${typeLabel}</span></td>
                <td><strong>${client}</strong></td>
                <td><code>${phone}</code></td>
                <td class="text-primary font-weight-bold">${formatCFA(tx.montant)} CFA</td>
                <td>${tx.frais !== undefined ? formatCFA(tx.frais) + ' CFA' : '-'}</td>
                <td><span class="text-primary"><i class="fa-solid fa-circle-check"></i> Succès</span></td>
            </tr>
        `;
    }).join('');
}

// --- 5. Event Listeners Setup ---

function setupEventListeners() {
    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('teranga_theme', next);
            updateThemeIcon(next);
        });
    }

    // Search and Category filtering
    let currentCategory = 'all';
    const searchInput = document.getElementById('search-input');
    const regionSelect = document.getElementById('region-filter');
    const btnSearch = document.getElementById('btn-search');

    const triggerFilter = () => {
        const query = searchInput ? searchInput.value : '';
        const region = regionSelect ? regionSelect.value : 'all';
        renderActeurs(currentCategory, query, region);
    };

    if (searchInput) searchInput.addEventListener('input', triggerFilter);
    if (regionSelect) regionSelect.addEventListener('change', triggerFilter);
    if (btnSearch) btnSearch.addEventListener('click', triggerFilter);

    // Category Tabs
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentCategory = e.currentTarget.getAttribute('data-category');
            triggerFilter();
        });
    });

    // Wallet Form Tabs
    document.querySelectorAll('.wallet-tab-btn').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.wallet-tab-btn').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.wallet-form').forEach(f => f.classList.remove('active'));

            const targetTab = e.currentTarget.getAttribute('data-tab');
            e.currentTarget.classList.add('active');
            const formElem = document.getElementById(`form-${targetTab}`);
            if (formElem) formElem.classList.add('active');
        });
    });

    // Retrait Fee live calculation
    const retraitMontantInput = document.getElementById('retrait-montant');
    if (retraitMontantInput) {
        retraitMontantInput.addEventListener('input', (e) => {
            const montant = parseInt(e.target.value) || 0;
            if (montant > 0) {
                const frais = calculerFrais(montant);
                const total = montant + frais;
                document.getElementById('calc-fee-display').textContent = `${formatCFA(frais)} CFA`;
                document.getElementById('calc-total-display').textContent = `${formatCFA(total)} CFA`;
            } else {
                document.getElementById('calc-fee-display').textContent = `0 CFA`;
                document.getElementById('calc-total-display').textContent = `0 CFA`;
            }
        });
    }

    // Modal close triggers
    document.getElementById('modal-close')?.addEventListener('click', () => closeModal('actor-modal'));
    document.getElementById('booking-modal-close')?.addEventListener('click', () => closeModal('booking-modal'));

    // Close modal when clicking on backdrop
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            e.target.classList.add('hidden');
        }
    });

    // --- Wallet Form Submissions ---

    // 1. Form Création Wallet
    const formCreate = document.getElementById('form-create-wallet');
    if (formCreate) {
        formCreate.addEventListener('submit', (e) => {
            e.preventDefault();
            const nom = document.getElementById('create-nom').value.trim();
            const phone = document.getElementById('create-phone').value.trim();
            const code = document.getElementById('create-code').value.trim();
            const solde = parseInt(document.getElementById('create-solde').value);

            if (!verificationTailleNumero(phone, code)) {
                showAlert("Erreur : le numéro doit faire 9 chiffres et le code PIN 4 chiffres.", 'error');
                return;
            }

            if (!debutNumero(phone)) {
                showAlert("Erreur : le numéro doit commencer par 70, 75, 76, 77 ou 78.", 'error');
                return;
            }

            if (!soldeInitialValide(solde)) {
                showAlert("Erreur : le solde initial doit être positif ou nul.", 'error');
                return;
            }

            if (verifiTelephoneExiste(wallets, phone)) {
                showAlert("Erreur : ce numéro de téléphone existe déjà.", 'error');
                return;
            }

            if (verifiCodeExiste(wallets, code)) {
                showAlert("Erreur : ce code PIN existe déjà.", 'error');
                return;
            }

            // Create Wallet
            const newWallet = { client: nom, telephone: phone, code: code, solde: solde };
            wallets.push(newWallet);
            activeWalletIndex = wallets.length - 1;

            updateWalletUI();
            showAlert(`Wallet créé avec succès pour ${nom} !`);
            formCreate.reset();
        });
    }

    // 2. Form Dépôt Wallet
    const formDepot = document.getElementById('form-depot-wallet');
    if (formDepot) {
        formDepot.addEventListener('submit', (e) => {
            e.preventDefault();
            const phone = document.getElementById('depot-phone').value.trim();
            const montant = parseInt(document.getElementById('depot-montant').value);

            if (!montantValide(montant)) {
                showAlert("Montant invalide.", 'error');
                return;
            }

            const index = trouverWalletIndex(wallets, phone);
            if (index === -1) {
                showAlert("Wallet introuvable pour ce numéro.", 'error');
                return;
            }

            wallets[index].solde += montant;
            activeWalletIndex = index;

            transactions.unshift({
                type: 'depot',
                montant: montant,
                frais: 0,
                indexClient: index,
                date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            });

            updateWalletUI();
            renderTransactions();
            showAlert(`Dépôt effectué avec succès. Nouveau solde : ${formatCFA(wallets[index].solde)} CFA`);
            formDepot.reset();
        });
    }

    // 3. Form Retrait Wallet
    const formRetrait = document.getElementById('form-retrait-wallet');
    if (formRetrait) {
        formRetrait.addEventListener('submit', (e) => {
            e.preventDefault();
            const phone = document.getElementById('retrait-phone').value.trim();
            const montant = parseInt(document.getElementById('retrait-montant').value);

            if (!montantValide(montant)) {
                showAlert("Erreur : le montant doit être supérieur à 0.", 'error');
                return;
            }

            const index = trouverWalletIndex(wallets, phone);
            if (index === -1) {
                showAlert("Erreur : aucun wallet associé à ce numéro.", 'error');
                return;
            }

            const frais = calculerFrais(montant);
            const totalDebit = montant + frais;

            if (wallets[index].solde < totalDebit) {
                showAlert(`Solde insuffisant ! Solde actuel : ${formatCFA(wallets[index].solde)} CFA. Requis : ${formatCFA(totalDebit)} CFA (avec frais).`, 'error');
                return;
            }

            wallets[index].solde -= totalDebit;
            activeWalletIndex = index;

            transactions.unshift({
                type: 'retrait',
                montant: montant,
                frais: frais,
                indexClient: index,
                date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            });

            updateWalletUI();
            renderTransactions();
            showAlert(`Retrait de ${formatCFA(montant)} CFA réussi (Frais: ${formatCFA(frais)} CFA). Nouveau solde : ${formatCFA(wallets[index].solde)} CFA`);
            formRetrait.reset();
            document.getElementById('calc-fee-display').textContent = `0 CFA`;
            document.getElementById('calc-total-display').textContent = `0 CFA`;
        });
    }

    // 4. Form Payment/Booking
    const formPay = document.getElementById('form-pay-service');
    if (formPay) {
        formPay.addEventListener('submit', (e) => {
            e.preventDefault();
            const phone = document.getElementById('pay-phone').value.trim();
            const amount = parseInt(document.getElementById('pay-amount').value);
            const code = document.getElementById('pay-code').value.trim();
            const actorName = document.getElementById('pay-actor-name').value;

            const index = trouverWalletIndex(wallets, phone);
            if (index === -1) {
                const payAlert = document.getElementById('pay-alert');
                payAlert.className = 'alert-box error';
                payAlert.textContent = "Aucun wallet associé à ce numéro de téléphone.";
                payAlert.classList.remove('hidden');
                return;
            }

            if (wallets[index].code !== code) {
                const payAlert = document.getElementById('pay-alert');
                payAlert.className = 'alert-box error';
                payAlert.textContent = "Code PIN incorrect.";
                payAlert.classList.remove('hidden');
                return;
            }

            if (wallets[index].solde < amount) {
                const payAlert = document.getElementById('pay-alert');
                payAlert.className = 'alert-box error';
                payAlert.textContent = `Solde insuffisant (${formatCFA(wallets[index].solde)} CFA disponible).`;
                payAlert.classList.remove('hidden');
                return;
            }

            // Deduct payment
            wallets[index].solde -= amount;
            activeWalletIndex = index;

            transactions.unshift({
                type: 'paiement',
                montant: amount,
                frais: 0,
                indexClient: index,
                date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            });

            updateWalletUI();
            renderTransactions();

            const payAlert = document.getElementById('pay-alert');
            payAlert.className = 'alert-box success';
            payAlert.textContent = `Paiement de ${formatCFA(amount)} CFA pour "${actorName}" validé avec succès !`;
            payAlert.classList.remove('hidden');

            setTimeout(() => {
                closeModal('booking-modal');
                payAlert.classList.add('hidden');
                showAlert(`Réservation effectuée avec succès pour ${actorName} !`);
            }, 1800);
        });
    }

    // Refresh Transactions button
    document.getElementById('btn-refresh-tx')?.addEventListener('click', () => {
        renderTransactions();
        showAlert("Historique des transactions actualisé !");
    });
}
