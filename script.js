/**
 * Teranga Tourisme Sénégal & Teranga Pass Wallet
 * Interactive Frontend Engine
 */

// Initial Data - Tourism Actors
const ACTORS_DATA = [
    {
        id: 1,
        name: "Lamu Hotel & Spa",
        category: "hotel",
        categoryLabel: "Hôtel & Lodge",
        location: "Dakar, Almadies",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        desc: "Hôtel d'exception 5 étoiles avec vue imprenable sur l'Océan Atlantique, piscine à débordement et spa traditionnel.",
        phone: "+221 33 820 12 34",
        price: "120 000 FCFA / nuit"
    },
    {
        id: 2,
        name: "Mamadou Diallo - Guide Agréé UNESCO",
        category: "guide",
        categoryLabel: "Guide Touristique",
        location: "Île de Gorée & Dakar",
        rating: "5.0",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        desc: "Guide passionné certifié par le Ministère du Tourisme. Visite historique de l'Île de Gorée et découverte culturelle de Dakar.",
        phone: "+221 77 512 88 90",
        price: "25 000 FCFA / journée"
    },
    {
        id: 3,
        name: "Chez Loutcha",
        category: "restaurant",
        categoryLabel: "Restaurant",
        location: "Dakar Plateau",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        desc: "Gastronomie sénégalaise et ouest-africaine authentique. Dégustez le véritable Thiéboudienne, Yassa au poulet et Caldou.",
        phone: "+221 33 821 55 10",
        price: "Plats à partir de 5 000 FCFA"
    },
    {
        id: 4,
        name: "Galerie Artisanale Soumbédioune",
        category: "artisan",
        categoryLabel: "Artisanat",
        location: "Dakar, Corniche Ouest",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
        desc: "Village artisanal réputé réunissant sculpteurs sur bois, maroquiniers, bijoutiers et peintres sous verre (Fixés).",
        phone: "+221 78 100 45 67",
        price: "Souvenirs uniques"
    },
    {
        id: 5,
        name: "Ecolodge de Lompoul",
        category: "hotel",
        categoryLabel: "Hôtel & Lodge",
        location: "Désert de Lompoul",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
        desc: "Bivouac de charme sous tentes mauritaniennes au cœur des dunes de sable ambré. Randonnées en dromadaire et soirées sous les étoiles.",
        phone: "+221 33 955 80 00",
        price: "65 000 FCFA / nuit"
    },
    {
        id: 6,
        name: "Teranga Express Transport",
        category: "transport",
        categoryLabel: "Transport",
        location: "Aéroport AIBD - Saly - Dakar",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        desc: "Service de navettes privées et véhicules climatisés avec chauffeur professionnel pour vos transferts aéroport et circuits.",
        phone: "+221 70 333 22 11",
        price: "A partir de 20 000 FCFA"
    },
    {
        id: 7,
        name: "Le Saint-Louisian Lodge",
        category: "hotel",
        categoryLabel: "Hôtel & Lodge",
        location: "Saint-Louis, Île",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        desc: "Demeure coloniale restaurée avec goût au bord du fleuve Sénégal. Proche du pont Faidherbe et des marchés historiques.",
        phone: "+221 33 961 40 20",
        price: "55 000 FCFA / nuit"
    },
    {
        id: 8,
        name: "Awa Ndiaye - Guide Casamance",
        category: "guide",
        categoryLabel: "Guide Touristique",
        location: "Ziguinchor & Cap Skirring",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        desc: "Excursions en pirogue dans les bolongs, découverte de l'île d'Elinkine et immersion culturelle dans la tradition diola.",
        phone: "+221 76 990 12 34",
        price: "30 000 FCFA / journée"
    }
];

// App State (Mirroring PHP Repository Data)
let wallets = [
    {
        client: "Ousmane Sow",
        telephone: "778451234",
        code: "1234",
        solde: 150000
    }
];

let transactions = [
    {
        type: "depot",
        montant: 150000,
        frais: 0,
        indexClient: 0,
        date: new Date().toLocaleDateString('fr-FR')
    }
];

let currentCategoryFilter = "all";

// --- DOM Loaded Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderActors();
    updateWalletPreview();
    renderTransactionHistory();
    setupScrollSpy();
});

// --- Category & Search Filter Logic ---
function setCategoryFilter(category) {
    currentCategoryFilter = category;

    // Update active UI tab button
    const buttons = document.querySelectorAll('#filter-tabs .filter-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderActors();
}

function filterActors() {
    renderActors();
}

function renderActors() {
    const grid = document.getElementById('actors-grid');
    const searchTerm = document.getElementById('actor-search').value.toLowerCase().trim();

    const filtered = ACTORS_DATA.filter(actor => {
        const matchesCategory = currentCategoryFilter === 'all' || actor.category === currentCategoryFilter;
        const matchesSearch = actor.name.toLowerCase().includes(searchTerm) ||
                              actor.location.toLowerCase().includes(searchTerm) ||
                              actor.desc.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-dim);"></i>
                <p>Aucun acteur ne correspond à votre recherche.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(actor => `
        <div class="actor-card">
            <div class="actor-img-wrapper">
                <img src="${actor.image}" alt="${actor.name}" class="actor-img">
                <span class="actor-category-tag"><i class="fa-solid fa-tag"></i> ${actor.categoryLabel}</span>
            </div>
            <div class="actor-body">
                <span class="actor-location"><i class="fa-solid fa-location-dot"></i> ${actor.location}</span>
                <h3 class="actor-name">${actor.name}</h3>
                <p class="actor-desc">${actor.desc}</p>
                <div class="actor-footer">
                    <span class="actor-rating"><i class="fa-solid fa-star"></i> ${actor.rating}</span>
                    <button class="btn btn-secondary btn-sm" onclick="openActorModal(${actor.id})">
                        <i class="fa-solid fa-circle-info"></i> Détails
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// --- Modal Functionality ---
function openActorModal(id) {
    const actor = ACTORS_DATA.find(a => a.id === id);
    if (!actor) return;

    const modalContent = document.getElementById('modal-actor-content');
    modalContent.innerHTML = `
        <div class="modal-actor-header">
            <img src="${actor.image}" alt="${actor.name}" class="modal-actor-img">
            <div class="modal-actor-info">
                <h3>${actor.name}</h3>
                <div class="modal-actor-meta">
                    <span><i class="fa-solid fa-location-dot"></i> ${actor.location}</span>
                    <span><i class="fa-solid fa-star" style="color:var(--secondary);"></i> ${actor.rating}</span>
                </div>
                <span class="badge" style="background:rgba(16,185,129,0.2); color:var(--primary); padding:0.2rem 0.6rem; border-radius:4px; font-size:0.8rem; font-weight:700;">
                    ${actor.categoryLabel}
                </span>
            </div>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size:0.95rem; margin-bottom:0.4rem; color:var(--text-muted);">À propos</h4>
            <p style="color:var(--text-main); font-size:0.95rem; line-height:1.5;">${actor.desc}</p>
        </div>
        <div style="background:rgba(0,0,0,0.25); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.5rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.9rem;">
                <span style="color:var(--text-muted);"><i class="fa-solid fa-phone"></i> Contact :</span>
                <strong>${actor.phone}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                <span style="color:var(--text-muted);"><i class="fa-solid fa-tag"></i> Tarifs indicatifs :</span>
                <strong style="color:var(--secondary);">${actor.price}</strong>
            </div>
        </div>
        <div style="display:flex; gap:1rem;">
            <button class="btn btn-primary" style="flex:1;" onclick="simulateBooking('${actor.name}')">
                <i class="fa-solid fa-calendar-check"></i> Réserver avec Teranga Pass
            </button>
        </div>
    `;

    document.getElementById('actor-modal').classList.add('active');
}

function closeActorModal() {
    document.getElementById('actor-modal').classList.remove('active');
}

function simulateBooking(actorName) {
    alert(`Demande de réservation envoyée pour : ${actorName}\nPaiement possible via votre Teranga Pass !`);
    closeActorModal();
}

// --- TERANGA WALLET ENGINE (Matching PHP Rules) ---

function switchWalletTab(tabName) {
    const tabs = document.querySelectorAll('.console-tab');
    tabs.forEach(t => t.classList.remove('active'));

    // Highlight clicked tab
    event.currentTarget.classList.add('active');

    // Hide all forms/panels
    document.getElementById('form-create-wallet').classList.add('hidden');
    document.getElementById('form-depot').classList.add('hidden');
    document.getElementById('form-retrait').classList.add('hidden');
    document.getElementById('panel-history').classList.add('hidden');

    // Hide alert
    hideAlert();

    // Show target
    if (tabName === 'create') {
        document.getElementById('form-create-wallet').classList.remove('hidden');
    } else if (tabName === 'depot') {
        document.getElementById('form-depot').classList.remove('hidden');
    } else if (tabName === 'retrait') {
        document.getElementById('form-retrait').classList.remove('hidden');
    } else if (tabName === 'history') {
        document.getElementById('panel-history').classList.remove('hidden');
        renderTransactionHistory();
    }
}

// Validation Functions (matching validator.php)
function verificationTailleNumero(phone, code) {
    return phone.length === 9 && code.length === 4;
}

function debutNumero(phone) {
    const prefixes = ['70', '75', '76', '77', '78'];
    const prefix = phone.substring(0, 2);
    return prefixes.includes(prefix);
}

function verifiTelephoneExiste(phone) {
    return wallets.some(w => w.telephone === phone);
}

function verifiCodeExiste(code) {
    return wallets.some(w => w.code === code);
}

function trouverWalletIndex(phone) {
    return wallets.findIndex(w => w.telephone === phone);
}

// Calculation Function (matching services.php)
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

// Form Handlers (matching controller.php)
function handleCreateWallet(event) {
    event.preventDefault();
    hideAlert();

    const nom = document.getElementById('create-nom').value.trim();
    const phone = document.getElementById('create-phone').value.trim();
    const code = document.getElementById('create-code').value.trim();
    const solde = parseInt(document.getElementById('create-solde').value, 10);

    // Validations
    if (!verificationTailleNumero(phone, code)) {
        showAlert("Erreur : Le téléphone doit comporter 9 chiffres et le code 4 chiffres.", "error");
        return;
    }

    if (!debutNumero(phone)) {
        showAlert("Erreur : Le numéro doit commencer par 70, 75, 76, 77 ou 78.", "error");
        return;
    }

    if (isNaN(solde) || solde < 0) {
        showAlert("Erreur : Le solde initial doit être positif ou nul.", "error");
        return;
    }

    if (verifiTelephoneExiste(phone)) {
        showAlert("Erreur : Ce numéro de téléphone est déjà associé à un wallet.", "error");
        return;
    }

    if (verifiCodeExiste(code)) {
        showAlert("Erreur : Ce code secret existe déjà.", "error");
        return;
    }

    // Success - Create
    const newWallet = {
        client: nom,
        telephone: phone,
        code: code,
        solde: solde
    };

    wallets.push(newWallet);
    showAlert(`Wallet créé avec succès pour ${nom} ! Solde initial : ${solde.toLocaleString()} FCFA`, "success");

    // Reset Form & Update View
    document.getElementById('form-create-wallet').reset();
    updateWalletPreview(wallets.length - 1);
}

function handleDepot(event) {
    event.preventDefault();
    hideAlert();

    const phone = document.getElementById('depot-phone').value.trim();
    const montant = parseInt(document.getElementById('depot-montant').value, 10);

    if (isNaN(montant) || montant <= 0) {
        showAlert("Erreur : Le montant du dépôt doit être supérieur à 0.", "error");
        return;
    }

    const index = trouverWalletIndex(phone);
    if (index === -1) {
        showAlert("Erreur : Aucun wallet trouvé pour ce numéro.", "error");
        return;
    }

    wallets[index].solde += montant;

    transactions.push({
        type: 'depot',
        montant: montant,
        frais: 0,
        indexClient: index,
        date: new Date().toLocaleDateString('fr-FR')
    });

    showAlert(`Dépôt de ${montant.toLocaleString()} FCFA réussi. Nouveau solde : ${wallets[index].solde.toLocaleString()} FCFA`, "success");
    document.getElementById('form-depot').reset();
    updateWalletPreview(index);
}

function handleRetrait(event) {
    event.preventDefault();
    hideAlert();

    const phone = document.getElementById('retrait-phone').value.trim();
    const montant = parseInt(document.getElementById('retrait-montant').value, 10);

    if (isNaN(montant) || montant <= 0) {
        showAlert("Erreur : Le montant à retirer doit être positif.", "error");
        return;
    }

    const index = trouverWalletIndex(phone);
    if (index === -1) {
        showAlert("Erreur : Aucun wallet associé à ce numéro.", "error");
        return;
    }

    const frais = calculerFrais(montant);
    const totalDebit = montant + frais;

    if (wallets[index].solde < totalDebit) {
        showAlert(`Erreur : Solde insuffisant. Actuel: ${wallets[index].solde.toLocaleString()} FCFA | Requis (montant + frais): ${totalDebit.toLocaleString()} FCFA`, "error");
        return;
    }

    // Process Withdrawal
    wallets[index].solde -= totalDebit;

    transactions.push({
        type: 'retrait',
        montant: montant,
        frais: frais,
        indexClient: index,
        date: new Date().toLocaleDateString('fr-FR')
    });

    showAlert(`Retrait effectué avec succès ! Montant: ${montant.toLocaleString()} FCFA | Frais: ${frais.toLocaleString()} FCFA. Nouveau solde : ${wallets[index].solde.toLocaleString()} FCFA`, "success");
    document.getElementById('form-retrait').reset();
    updateCalculatedFees();
    updateWalletPreview(index);
}

function updateCalculatedFees() {
    const input = document.getElementById('retrait-montant');
    const montant = parseInt(input.value, 10);

    if (isNaN(montant) || montant <= 0) {
        document.getElementById('calc-frais').textContent = "0 FCFA";
        document.getElementById('calc-total').textContent = "0 FCFA";
        return;
    }

    const frais = calculerFrais(montant);
    const total = montant + frais;

    document.getElementById('calc-frais').textContent = `${frais.toLocaleString()} FCFA`;
    document.getElementById('calc-total').textContent = `${total.toLocaleString()} FCFA`;
}

function updateWalletPreview(walletIndex = 0) {
    if (wallets.length === 0) return;

    const w = wallets[walletIndex] || wallets[0];
    document.getElementById('preview-holder').textContent = w.client;
    document.getElementById('preview-phone').textContent = `+221 ${w.telephone.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4')}`;
    document.getElementById('preview-code').textContent = '••••';
    document.getElementById('preview-balance').textContent = `${w.solde.toLocaleString()} FCFA`;

    document.getElementById('stat-wallets-count').textContent = wallets.length;
    document.getElementById('stat-trans-count').textContent = transactions.length;
}

function renderTransactionHistory() {
    const list = document.getElementById('history-list');

    if (transactions.length === 0) {
        list.innerHTML = `
            <p style="text-align:center; color:var(--text-muted); padding:2rem;">Aucune transaction enregistrée.</p>
        `;
        return;
    }

    list.innerHTML = transactions.slice().reverse().map(t => {
        const clientName = wallets[t.indexClient] ? wallets[t.indexClient].client : "Client Inconnu";
        const isDepot = t.type === 'depot';
        const iconClass = isDepot ? 'fa-arrow-down-to-line depot' : 'fa-arrow-up-from-line retrait';
        const amountSign = isDepot ? '+' : '-';
        const amountColor = isDepot ? 'var(--primary)' : 'var(--secondary)';

        return `
            <div class="history-item">
                <div class="history-icon ${t.type}">
                    <i class="fa-solid ${iconClass}"></i>
                </div>
                <div class="history-details">
                    <p class="history-type">${t.type.toUpperCase()} • ${clientName}</p>
                    <p class="history-client">${t.date || 'Aujourd\'hui'}</p>
                </div>
                <div>
                    <p class="history-amount" style="color:${amountColor};">${amountSign}${t.montant.toLocaleString()} FCFA</p>
                    ${t.frais > 0 ? `<p class="history-frais">Frais: ${t.frais.toLocaleString()} FCFA</p>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function showAlert(message, type) {
    const box = document.getElementById('wallet-alert');
    box.className = `alert-box ${type}`;
    box.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i> ${message}`;
    box.classList.remove('hidden');
}

function hideAlert() {
    const box = document.getElementById('wallet-alert');
    box.classList.add('hidden');
}

// --- Active ScrollSpy for Mobile Dock & Header ---
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.dock-item').forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });

                document.querySelectorAll('.nav-link').forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
}
