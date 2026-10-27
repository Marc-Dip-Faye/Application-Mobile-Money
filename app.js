/**
 * Teranga Tourism & Pass Sénégal - Main Interactive Logic
 */

// Initial Tourism Actors Dataset
const TOURISM_ACTORS = [
    {
        id: 1,
        name: "King Fahd Palace Hotel",
        category: "hotel",
        categoryLabel: "Hôtel 5 Etoiles",
        region: "Dakar",
        regionLabel: "Dakar - Les Almadies",
        price: "120 000 CFA / nuit",
        rating: 4.8,
        phone: "+221 33 869 69 69",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Hôtel luxueux bord de mer avec golf 9 trous, piscine olympique et salles de conférence de haut niveau."
    },
    {
        id: 2,
        name: "Lodge de la Somone",
        category: "hotel",
        categoryLabel: "Ecolodge Balnéaire",
        region: "Thies",
        regionLabel: "Petite Côte - Somone",
        price: "65 000 CFA / nuit",
        rating: 4.9,
        phone: "+221 77 520 12 34",
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
        description: "Bungalows écologiques nichés au cœur de la réserve ornithologique de la lagune de la Somone."
    },
    {
        id: 3,
        name: "Samba Ndiaye - Guide Gorée",
        category: "guide",
        categoryLabel: "Guide National Certifié",
        region: "Dakar",
        regionLabel: "Île de Gorée",
        price: "15 000 CFA / jour",
        rating: 5.0,
        phone: "+221 77 638 45 90",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        description: "Spécialiste de l'histoire de la Maison des Esclaves et du patrimoine culturel de l'île de Gorée."
    },
    {
        id: 4,
        name: "Awa Ba - Guide Djoudj & Casamance",
        category: "guide",
        categoryLabel: "Guide Eco-Tourisme",
        region: "Saint-Louis",
        regionLabel: "Saint-Louis & Nord",
        price: "20 000 CFA / jour",
        rating: 4.9,
        phone: "+221 78 112 33 44",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        description: "Expertise en ornithologie au parc national du Djoudj et randonnées immersives en Casamance."
    },
    {
        id: 5,
        name: "Le Lagon 1",
        category: "restaurant",
        categoryLabel: "Restaurant Gastronomique",
        region: "Dakar",
        regionLabel: "Dakar Plateau - Corniche",
        price: "25 000 CFA / pers",
        rating: 4.7,
        phone: "+221 33 821 58 80",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        description: "Cuisine raffinée de fruits de mer suspendue sur l'océan Atlantique avec vue imprenable sur Gorée."
    },
    {
        id: 6,
        name: "Chez Loutcha",
        category: "restaurant",
        categoryLabel: "Spécialités Africaines",
        region: "Dakar",
        regionLabel: "Dakar Centre",
        price: "8 000 CFA / pers",
        rating: 4.8,
        phone: "+221 33 821 03 02",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        description: "Incontournable pour goûter au Thiéboudienne, Yassa au poulet et Mafé dans une ambiance chaleureuse."
    },
    {
        id: 7,
        name: "Teranga Express Shuttle",
        category: "transport",
        categoryLabel: "Transport VIP / Navette",
        region: "Dakar",
        regionLabel: "AIBD - Dakar - Saly",
        price: "30 000 CFA / trajet",
        rating: 4.8,
        phone: "+221 76 500 88 99",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
        description: "Transferts privés climatisés et sécurisés depuis l'aéroport international Blaise Diagne (AIBD)."
    },
    {
        id: 8,
        name: "Casamance Pirogue Safari",
        category: "transport",
        categoryLabel: "Excursion Fluviale",
        region: "Casamance",
        regionLabel: "Ziguinchor - Carabane",
        price: "35 000 CFA / excursion",
        rating: 4.9,
        phone: "+221 70 888 22 11",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
        description: "Balades en pirogue à travers les bolongs, observation des dauphins et visite des îles de la Casamance."
    },
    {
        id: 9,
        name: "Village Artisanal de Soumbédioune",
        category: "artisan",
        categoryLabel: "Galerie & Artisanat",
        region: "Dakar",
        regionLabel: "Dakar - Soumbédioune",
        price: "Sur devis / Direct",
        rating: 4.7,
        phone: "+221 33 822 10 20",
        image: "https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=800&q=80",
        description: "Sculptures en bois d'ébène, maroquinerie, bijoux en argent et peintures sous verre (Suwer)."
    },
    {
        id: 10,
        name: "Tissage & Batik de Thies",
        category: "artisan",
        categoryLabel: "Manufacture Textile",
        region: "Thies",
        regionLabel: "Thiès",
        price: "Sur devis",
        rating: 4.9,
        phone: "+221 77 410 99 00",
        image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80",
        description: "Tapisseries d'art uniques de Thiès et tissus traditionnels teints à la main (Batik & Bogolan)."
    },
    {
        id: 11,
        name: "Hotel de la Poste",
        category: "hotel",
        categoryLabel: "Hôtel Historique",
        region: "Saint-Louis",
        regionLabel: "Saint-Louis Centre",
        price: "55 000 CFA / nuit",
        rating: 4.6,
        phone: "+221 33 961 11 18",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        description: "L'hôtel mythique de l'Aéropostale où séjourna Jean Mermoz face au pont Faidherbe."
    },
    {
        id: 12,
        name: "Ecolodge du Sine Saloum",
        category: "hotel",
        categoryLabel: "Ecolodge Nature",
        region: "Sine-Saloum",
        regionLabel: "Toubacouta",
        price: "70 000 CFA / nuit",
        rating: 4.9,
        phone: "+221 77 300 44 55",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        description: "Bungalows sur pilotis avec vue sur les mangroves et safari dans la réserve de Fathala."
    }
];

// App State (In-Memory Wallets & Transactions inspired by PHP services)
let state = {
    currentCategory: 'all',
    wallets: [
        { client: "Moussa Diop", telephone: "771234567", code: "1234", solde: 150000 },
        { client: "Fatou Sow", telephone: "789876543", code: "5678", solde: 85000 },
        { client: "Jean Pierre", telephone: "765432109", code: "0000", solde: 45000 }
    ],
    transactions: [
        { type: "retrait", montant: 20000, frais: 500, indexClient: 0, clientName: "Moussa Diop" },
        { type: "depot", montant: 50000, frais: 0, indexClient: 1, clientName: "Fatou Sow" }
    ],
    activeWalletIndex: 0,
    isCodeVisible: false
};

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderActors();
    renderWalletSelector();
    updateWalletCardDisplay();
    renderTransactionsTable();
    setupSmoothScrolling();
});

// Category and Filter Handlers
function setCategory(category) {
    state.currentCategory = category;

    // Update tab styling
    document.querySelectorAll('#category-tabs .tab-btn').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    filterActors();
}

function filterActors() {
    const searchVal = document.getElementById('search-input').value.toLowerCase().trim();
    const regionVal = document.getElementById('region-filter').value;

    const filtered = TOURISM_ACTORS.filter(actor => {
        const matchesCategory = (state.currentCategory === 'all' || actor.category === state.currentCategory);
        const matchesRegion = (regionVal === 'all' || actor.region === regionVal);
        const matchesSearch = actor.name.toLowerCase().includes(searchVal) ||
                              actor.description.toLowerCase().includes(searchVal) ||
                              actor.regionLabel.toLowerCase().includes(searchVal);

        return matchesCategory && matchesRegion && matchesSearch;
    });

    renderActors(filtered);
}

function renderActors(actorsList = TOURISM_ACTORS) {
    const container = document.getElementById('actors-grid');
    if (!container) return;

    if (actorsList.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--bg-card-border);">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-dim);"></i>
                <p>Aucun acteur ne correspond à votre recherche.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = actorsList.map(actor => `
        <div class="actor-card">
            <div class="actor-img-wrapper" style="background-image: url('${actor.image}');">
                <span class="actor-badge">${actor.categoryLabel}</span>
                <span class="actor-rating"><i class="fa-solid fa-star"></i> ${actor.rating}</span>
            </div>
            <div class="actor-content">
                <h3 class="actor-name">${actor.name}</h3>
                <div class="actor-location"><i class="fa-solid fa-location-dot"></i> ${actor.regionLabel}</div>
                <p class="actor-desc">${actor.description}</p>
                <div class="actor-meta">
                    <div class="actor-price">${actor.price}</div>
                    <button class="btn btn-outline" onclick="openContactModal(${actor.id})">
                        <i class="fa-solid fa-envelope"></i> Contacter
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Teranga Pass Wallet Business Logic (Aligned with validator.php & services.php)

function calculerFraisJS(montant) {
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

function validateSenegalPhone(phone) {
    if (phone.length !== 9) return false;
    const prefix = phone.substring(0, 2);
    const validPrefixes = ['70', '75', '76', '77', '78'];
    return validPrefixes.includes(prefix);
}

function handleCreateWallet(event) {
    event.preventDefault();
    const client = document.getElementById('create-client').value.trim();
    const telephone = document.getElementById('create-phone').value.trim();
    const code = document.getElementById('create-code').value.trim();
    const solde = parseInt(document.getElementById('create-solde').value, 10);

    // Validation checks
    if (!validateSenegalPhone(telephone)) {
        showToast("Numéro invalide! Doit comporter 9 chiffres commençant par 70, 75, 76, 77, 78.", "error");
        return;
    }

    if (code.length !== 4 || isNaN(code)) {
        showToast("Code PIN invalide! Doit comporter exactement 4 chiffres.", "error");
        return;
    }

    if (isNaN(solde) || solde < 0) {
        showToast("Le solde initial doit être positif ou nul.", "error");
        return;
    }

    if (state.wallets.some(w => w.telephone === telephone)) {
        showToast("Ce numéro de téléphone possède déjà un Wallet enregistré.", "error");
        return;
    }

    if (state.wallets.some(w => w.code === code)) {
        showToast("Ce code secret est déjà attribué. Veuillez en choisir un autre.", "error");
        return;
    }

    // Add new wallet
    const newWallet = { client, telephone, code, solde };
    state.wallets.push(newWallet);
    state.activeWalletIndex = state.wallets.length - 1;

    // Reset Form
    document.getElementById('form-create-wallet').reset();

    renderWalletSelector();
    updateWalletCardDisplay();
    showToast(`Wallet pour ${client} créé avec succès!`, "success");
}

function handleDepot(event) {
    event.preventDefault();
    const phone = document.getElementById('depot-phone').value.trim();
    const montant = parseInt(document.getElementById('depot-montant').value, 10);

    if (isNaN(montant) || montant <= 0) {
        showToast("Montant de dépôt invalide.", "error");
        return;
    }

    const index = state.wallets.findIndex(w => w.telephone === phone);
    if (index === -1) {
        showToast("Aucun Wallet associé à ce numéro de téléphone.", "error");
        return;
    }

    // Perform deposit
    state.wallets[index].solde += montant;

    // Record Transaction
    state.transactions.unshift({
        type: "depot",
        montant: montant,
        frais: 0,
        indexClient: index,
        clientName: state.wallets[index].client
    });

    document.getElementById('form-depot').reset();

    // Auto switch if needed
    state.activeWalletIndex = index;
    renderWalletSelector();
    updateWalletCardDisplay();
    renderTransactionsTable();

    showToast(`Dépôt de ${formatCFA(montant)} effectué avec succès! Nouveau solde: ${formatCFA(state.wallets[index].solde)}`, "success");
}

function handleRetrait(event) {
    event.preventDefault();
    const phone = document.getElementById('retrait-phone').value.trim();
    const montant = parseInt(document.getElementById('retrait-montant').value, 10);

    if (isNaN(montant) || montant <= 0) {
        showToast("Montant du retrait invalide.", "error");
        return;
    }

    const index = state.wallets.findIndex(w => w.telephone === phone);
    if (index === -1) {
        showToast("Aucun Wallet associé à ce numéro de téléphone.", "error");
        return;
    }

    const frais = calculerFraisJS(montant);
    const totalDebit = montant + frais;

    if (state.wallets[index].solde < totalDebit) {
        showToast(`Solde insuffisant! Solde: ${formatCFA(state.wallets[index].solde)}, Requis (frais incl.): ${formatCFA(totalDebit)}`, "error");
        return;
    }

    // Perform withdrawal
    state.wallets[index].solde -= totalDebit;

    // Record Transaction
    state.transactions.unshift({
        type: "retrait",
        montant: montant,
        frais: frais,
        indexClient: index,
        clientName: state.wallets[index].client
    });

    document.getElementById('form-retrait').reset();
    document.getElementById('fee-amount').innerText = "0 CFA";
    document.getElementById('fee-total').innerText = "0 CFA";

    state.activeWalletIndex = index;
    renderWalletSelector();
    updateWalletCardDisplay();
    renderTransactionsTable();

    showToast(`Retrait de ${formatCFA(montant)} réussi! Frais: ${formatCFA(frais)}. Nouveau solde: ${formatCFA(state.wallets[index].solde)}`, "success");
}

function calculateFeesPreview() {
    const montantInput = document.getElementById('retrait-montant');
    const montant = parseInt(montantInput.value, 10);

    if (isNaN(montant) || montant <= 0) {
        document.getElementById('fee-amount').innerText = "0 CFA";
        document.getElementById('fee-total').innerText = "0 CFA";
        return;
    }

    const frais = calculerFraisJS(montant);
    const total = montant + frais;

    document.getElementById('fee-amount').innerText = formatCFA(frais);
    document.getElementById('fee-total').innerText = formatCFA(total);
}

// UI State Renderers for Wallet
function renderWalletSelector() {
    const select = document.getElementById('active-wallet-select');
    if (!select) return;

    if (state.wallets.length === 0) {
        select.innerHTML = `<option value="">Aucun portefeuille</option>`;
        return;
    }

    select.innerHTML = state.wallets.map((w, idx) => `
        <option value="${idx}" ${idx === state.activeWalletIndex ? 'selected' : ''}>
            ${w.client} (${w.telephone}) - ${formatCFA(w.solde)}
        </option>
    `).join('');
}

function switchActiveWallet() {
    const select = document.getElementById('active-wallet-select');
    if (!select) return;
    state.activeWalletIndex = parseInt(select.value, 10);
    updateWalletCardDisplay();
}

function updateWalletCardDisplay() {
    const current = state.wallets[state.activeWalletIndex];

    if (!current) {
        document.getElementById('display-balance').innerText = "0 CFA";
        document.getElementById('display-holder').innerText = "Aucun Wallet";
        document.getElementById('display-phone').innerText = "N/A";
        document.getElementById('display-code').innerText = "****";
        return;
    }

    document.getElementById('display-balance').innerText = formatCFA(current.solde);
    document.getElementById('display-holder').innerText = current.client;
    document.getElementById('display-phone').innerText = current.telephone;
    document.getElementById('display-code').innerText = state.isCodeVisible ? current.code : "****";

    // Auto autofill form phone numbers for convenience
    const depotPhone = document.getElementById('depot-phone');
    const retraitPhone = document.getElementById('retrait-phone');
    if (depotPhone && !depotPhone.value) depotPhone.value = current.telephone;
    if (retraitPhone && !retraitPhone.value) retraitPhone.value = current.telephone;
}

function toggleCodeVisibility() {
    state.isCodeVisible = !state.isCodeVisible;
    const icon = document.getElementById('code-toggle-icon');
    if (icon) {
        icon.className = state.isCodeVisible ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    }
    updateWalletCardDisplay();
}

function showWalletTab(tabName) {
    document.querySelectorAll('.wtab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.wtab-content').forEach(content => content.classList.remove('active'));

    const activeBtn = Array.from(document.querySelectorAll('.wtab-btn')).find(b => b.getAttribute('onclick').includes(tabName));
    if (activeBtn) activeBtn.classList.add('active');

    const activeContent = document.getElementById(`wtab-${tabName}`);
    if (activeContent) activeContent.classList.add('active');
}

function renderTransactionsTable() {
    const body = document.getElementById('transactions-body');
    const count = document.getElementById('trans-count');
    if (!body) return;

    if (count) count.innerText = `${state.transactions.length} transaction(s)`;

    if (state.transactions.length === 0) {
        body.innerHTML = `<tr><td colspan="6" class="empty-msg">Aucune transaction enregistrée.</td></tr>`;
        return;
    }

    body.innerHTML = state.transactions.map((t, idx) => {
        const typeBadge = t.type === 'depot'
            ? `<span style="color: var(--accent-neon); font-weight: 700;"><i class="fa-solid fa-arrow-down"></i> Dépôt</span>`
            : `<span style="color: var(--danger); font-weight: 700;"><i class="fa-solid fa-arrow-up"></i> Retrait</span>`;

        const totalDebit = t.montant + (t.frais || 0);

        return `
            <tr>
                <td>#${state.transactions.length - idx}</td>
                <td>${typeBadge}</td>
                <td><strong>${t.clientName}</strong></td>
                <td>${formatCFA(t.montant)}</td>
                <td>${t.frais ? formatCFA(t.frais) : '0 CFA'}</td>
                <td><strong>${formatCFA(totalDebit)}</strong></td>
            </tr>
        `;
    }).join('');
}

// Modal Handlers
function openContactModal(actorId) {
    const actor = TOURISM_ACTORS.find(a => a.id === actorId);
    if (!actor) return;

    document.getElementById('modal-actor-name').innerText = actor.name;
    document.getElementById('modal-actor-category').innerText = actor.categoryLabel;
    document.getElementById('modal-actor-region').innerText = actor.regionLabel;
    document.getElementById('modal-actor-phone').innerText = actor.phone;
    document.getElementById('modal-actor-rating').innerText = `${actor.rating} / 5`;

    const modal = document.getElementById('contact-modal');
    if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

function handleActorContactSubmit(event) {
    event.preventDefault();
    closeModal('contact-modal');
    showToast("Votre demande a été transmise à l'acteur avec succès!", "success");
}

// Toast Feedback Utility
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';

    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
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

// Helper Utils
function formatCFA(amount) {
    return new Intl.NumberFormat('fr-FR').format(amount) + " CFA";
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                scrollToSection(targetId);

                // Update active state in nav
                document.querySelectorAll('.nav-item, .dock-item').forEach(item => {
                    if (item.getAttribute('href') === `#${targetId}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    });
}
