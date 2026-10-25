/**
 * TERANGA TOURISM & WALLET SENEGAL - INTERACTIVE LOGIC
 */

// Données initiales des acteurs du tourisme au Sénégal
const ACTEURS_DATA = [
    {
        id: 1,
        title: "King Fahd Palace Hotel",
        category: "hotel",
        categoryLabel: "Hôtel & Resort 5★",
        rating: 4.8,
        location: "Almadies, Dakar",
        description: "Complexe hôtelier mythique en bord de mer offrant des suites de luxe, golf 9 trous et centre de congrès international.",
        price: "120 000 CFA / nuit",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Lamantin Beach Resort & Spa",
        category: "hotel",
        categoryLabel: "Lodge & Spa",
        rating: 4.9,
        location: "Saly Portudal, Mbour",
        description: "Hôtel 5 étoiles construit avec des matériaux traditionnels, situé au bord de la plage de Saly avec spa marin.",
        price: "95 000 CFA / nuit",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Ecovillage & Lodge de la Somone",
        category: "hotel",
        categoryLabel: "Éco-Lodge",
        rating: 4.7,
        location: "Lagune de Somone",
        description: "Havre de paix au cœur de la réserve naturelle de la Somone, idéal pour la contemplation des oiseaux migrateurs.",
        price: "45 000 CFA / nuit",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "Sahel Safari Excursions",
        category: "guide",
        categoryLabel: "Agence & Guides",
        rating: 4.9,
        location: "Réserve de Bandia & Djoudj",
        description: "Excursions guidées en 4x4 à la découverte des rhinocéros, girafes, zèbres et du patrimoine ornithologique du Sénégal.",
        price: "35 000 CFA / pers.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        title: "Guide Officiel de la Maison des Esclaves",
        category: "guide",
        categoryLabel: "Circuit Histoire & Mémoire",
        rating: 5.0,
        location: "Île de Gorée",
        description: "Visites guidées privées passionnantes sur l'histoire atlantique, la Maison des Esclaves et le patrimoine artistique de Gorée.",
        price: "15 000 CFA / groupe",
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        title: "Galerie & Restaurant L'Atelier Soumbédioune",
        category: "artisan",
        categoryLabel: "Artisanat & Gastronomie",
        rating: 4.6,
        location: "Marché Artisanal, Dakar",
        description: "Créations originales en pirogues sculptées, bijoux en bronze et dégustation du Thieboudienne traditionnel du chef.",
        price: "12 000 CFA / menu",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        title: "Parc National du Niokolo-Koba",
        category: "site",
        categoryLabel: "Patrimoine UNESCO",
        rating: 4.8,
        location: "Tambacounda / Kedougou",
        description: "Vaste réserve de faune d'Afrique de l'Ouest traversée par le fleuve Gambie. Accueil éco-responsable.",
        price: "5 000 CFA / entrée",
        image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        title: "Campement du Lac Rose (Retba)",
        category: "site",
        categoryLabel: "Lieu Naturel Incontournable",
        rating: 4.5,
        location: "Niaga, Dakar",
        description: "Activités de quad, balades à dos de chameau et traversée en pirogue du célèbrissime Lac Rose.",
        price: "20 000 CFA / activité",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    }
];

// État de l'application (Wallets & Transactions)
let wallets = [
    {
        client: "Aminata Diallo",
        telephone: "771234567",
        code: "1234",
        solde: 150000
    },
    {
        client: "Ousmane Sow",
        telephone: "769876543",
        code: "5678",
        solde: 75000
    }
];

let transactions = [
    {
        type: "retrait",
        montant: 20000,
        frais: 500,
        telephone: "771234567",
        client: "Aminata Diallo",
        date: "Aujourd'hui, 14:30"
    }
];

let currentCategory = 'all';

// Fonctions de validation (miroir exact des règles validator.php)
function verificationTailleNumero(phone, code) {
    return phone.length === 9 && code.length === 4;
}

function debutNumero(phone) {
    const prefixes = ['70', '75', '76', '77', '78'];
    const prefix = phone.substring(0, 2);
    return prefixes.includes(prefix);
}

function soldeInitialValide(solde) {
    return Number.isInteger(solde) && solde >= 0;
}

function montantValide(montant) {
    return Number.isInteger(montant) && montant > 0;
}

function trouverWalletIndex(phone) {
    return wallets.findIndex(w => w.telephone === phone);
}

function verifiTelephoneExiste(phone) {
    return wallets.some(w => w.telephone === phone);
}

function verifiCodeExiste(code) {
    return wallets.some(w => w.code === code);
}

// Logique de calcul des frais (miroir exact de services.php)
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

// Formatage Monétaire
function formatCFA(amount) {
    return new Intl.NumberFormat('fr-FR').format(amount) + " CFA";
}

// Notifications Toast
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success'
        ? '<i class="fa-solid fa-circle-check text-accent"></i>'
        : '<i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Rendu des Acteurs du Tourisme
function renderActors(items = ACTEURS_DATA) {
    const grid = document.getElementById('actors-grid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fa-solid fa-magnifying-glass"></i>
                <p>Aucun acteur touristique ne correspond à votre recherche.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map(actor => `
        <div class="actor-card">
            <div class="actor-img-wrapper" style="background-image: url('${actor.image}')">
                <span class="actor-category-badge">${actor.categoryLabel}</span>
                <span class="actor-rating"><i class="fa-solid fa-star"></i> ${actor.rating}</span>
            </div>
            <div class="actor-body">
                <h3 class="actor-title">${actor.title}</h3>
                <div class="actor-location"><i class="fa-solid fa-location-dot text-accent"></i> ${actor.location}</div>
                <p class="actor-description">${actor.description}</p>
                <div class="actor-footer">
                    <div class="actor-price">À partir de <br><strong>${actor.price}</strong></div>
                    <button class="btn btn-outline" onclick="payWithWallet('${actor.title}', '${actor.price}')">
                        <i class="fa-solid fa-bolt"></i> Réserver
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filtrage et Recherche
function filterActors() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const filtered = ACTEURS_DATA.filter(actor => {
        const matchesCategory = currentCategory === 'all' || actor.category === currentCategory;
        const matchesQuery = actor.title.toLowerCase().includes(query) ||
                             actor.location.toLowerCase().includes(query) ||
                             actor.description.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
    });
    renderActors(filtered);
}

function setCategory(category) {
    currentCategory = category;
    document.querySelectorAll('#category-chips .chip').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    filterActors();
}

// Rendu de la section Teranga Wallet
function renderWallets() {
    const list = document.getElementById('wallets-list');
    const countBadge = document.getElementById('wallet-count');
    if (!list || !countBadge) return;

    countBadge.textContent = `${wallets.length} Wallet${wallets.length > 1 ? 's' : ''}`;

    if (wallets.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-wallet"></i>
                <p>Aucun portefeuille enregistré. Cliquez sur "Nouveau Wallet" pour commencer.</p>
            </div>
        `;
        return;
    }

    list.innerHTML = wallets.map(w => `
        <div class="wallet-item">
            <div class="wallet-item-info">
                <div class="wallet-item-name">${w.client}</div>
                <div class="wallet-item-phone"><i class="fa-solid fa-mobile-screen"></i> +221 ${w.telephone}</div>
            </div>
            <div class="wallet-item-balance">
                <div class="balance-amount">${formatCFA(w.solde)}</div>
                <div class="balance-label">Solde disponible</div>
            </div>
        </div>
    `).join('');
}

// Rendu de l'historique des Transactions
function renderTransactions() {
    const list = document.getElementById('transactions-list');
    if (!list) return;

    if (transactions.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-receipt"></i>
                <p>Aucune transaction enregistrée.</p>
            </div>
        `;
        return;
    }

    list.innerHTML = transactions.map(t => `
        <div class="transaction-item ${t.type}">
            <div class="tx-details">
                <div class="tx-title">${t.type === 'depot' ? 'Dépôt sur' : 'Retrait de'} ${t.client}</div>
                <div class="tx-sub">+221 ${t.telephone} • ${t.date || 'Récemment'} ${t.frais ? `(Frais: ${formatCFA(t.frais)})` : ''}</div>
            </div>
            <div class="tx-amount ${t.type}">
                ${t.type === 'depot' ? '+' : '-'}${formatCFA(t.montant)}
            </div>
        </div>
    `).join('');
}

// Gestionnaires de Modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

// Actions du Wallet (Créer, Dépôt, Retrait)
function handleCreateWallet(event) {
    event.preventDefault();
    const client = document.getElementById('create-client').value.trim();
    const phone = document.getElementById('create-phone').value.trim();
    const code = document.getElementById('create-code').value.trim();
    const solde = parseInt(document.getElementById('create-solde').value, 10);

    // Validation
    if (!verificationTailleNumero(phone, code)) {
        showToast("Erreur : Le numéro doit faire 9 chiffres et le code 4 chiffres", "error");
        return;
    }

    if (!debutNumero(phone)) {
        showToast("Erreur : Le numéro doit commencer par 70, 75, 76, 77 ou 78", "error");
        return;
    }

    if (!soldeInitialValide(solde)) {
        showToast("Erreur : Le solde initial doit être positif ou nul", "error");
        return;
    }

    if (verifiTelephoneExiste(phone)) {
        showToast("Erreur : Ce numéro de téléphone possède déjà un wallet", "error");
        return;
    }

    if (verifiCodeExiste(code)) {
        showToast("Erreur : Ce code secret est déjà utilisé", "error");
        return;
    }

    wallets.push({ client, telephone: phone, code, solde });
    renderWallets();
    closeModal('modal-create-wallet');
    document.getElementById('form-create-wallet').reset();
    showToast(`Wallet créé avec succès pour ${client} !`);
}

function handleDepot(event) {
    event.preventDefault();
    const phone = document.getElementById('depot-phone').value.trim();
    const montant = parseInt(document.getElementById('depot-montant').value, 10);

    if (!montantValide(montant)) {
        showToast("Montant du dépôt invalide", "error");
        return;
    }

    const index = trouverWalletIndex(phone);
    if (index === -1) {
        showToast("Erreur : Aucun wallet trouvé pour ce numéro", "error");
        return;
    }

    wallets[index].solde += montant;

    transactions.unshift({
        type: 'depot',
        montant: montant,
        telephone: phone,
        client: wallets[index].client,
        date: "À l'instant"
    });

    renderWallets();
    renderTransactions();
    closeModal('modal-depot');
    document.getElementById('form-depot').reset();
    showToast(`Dépôt de ${formatCFA(montant)} effectué avec succès !`);
}

function updateRetraitCalcul() {
    const phone = document.getElementById('retrait-phone').value.trim();
    const montant = parseInt(document.getElementById('retrait-montant').value, 10);
    const preview = document.getElementById('retrait-preview');

    if (montantValide(montant)) {
        const frais = calculerFrais(montant);
        const total = montant + frais;
        document.getElementById('preview-frais').textContent = formatCFA(frais);
        document.getElementById('preview-total').textContent = formatCFA(total);
        preview.style.display = 'block';
    } else {
        preview.style.display = 'none';
    }
}

function handleRetrait(event) {
    event.preventDefault();
    const phone = document.getElementById('retrait-phone').value.trim();
    const montant = parseInt(document.getElementById('retrait-montant').value, 10);

    if (!montantValide(montant)) {
        showToast("Erreur : Le montant du retrait doit être positif", "error");
        return;
    }

    const index = trouverWalletIndex(phone);
    if (index === -1) {
        showToast("Erreur : Aucun wallet trouvé pour ce numéro", "error");
        return;
    }

    const frais = calculerFrais(montant);
    const totalDebit = montant + frais;

    if (wallets[index].solde < totalDebit) {
        showToast(`Solde insuffisant ! Requis : ${formatCFA(totalDebit)} (Frais incl.)`, "error");
        return;
    }

    wallets[index].solde -= totalDebit;

    transactions.unshift({
        type: 'retrait',
        montant: montant,
        frais: frais,
        telephone: phone,
        client: wallets[index].client,
        date: "À l'instant"
    });

    renderWallets();
    renderTransactions();
    closeModal('modal-retrait');
    document.getElementById('form-retrait').reset();
    document.getElementById('retrait-preview').style.display = 'none';
    showToast(`Retrait de ${formatCFA(montant)} réussi (Frais: ${formatCFA(frais)})`);
}

function clearTransactions() {
    transactions = [];
    renderTransactions();
    showToast("Historique des transactions réinitialisé");
}

function payWithWallet(actorTitle, price) {
    openModal('modal-retrait');
    showToast(`Paiement direct pour : ${actorTitle}`);
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    renderActors();
    renderWallets();
    renderTransactions();
});
