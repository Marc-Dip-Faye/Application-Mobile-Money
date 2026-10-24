/**
 * Teranga Tourisme & Pass Senegal - Interactive Web Application Logic
 */

// --- Data Models ---
const DEFAULT_ACTORS = [
    {
        id: 1,
        title: "Hôtel Teranga Palm",
        category: "hotel",
        location: "Saly Portudal, Thies",
        price: "45 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        description: "Complexe hôtelier de luxe pieds dans l'eau avec piscine à débordement, spa et service VIP."
    },
    {
        id: 2,
        title: "Chez Loutcha - Gastronomie",
        category: "restaurant",
        location: "Dakar Plateau",
        price: "7 500 FCFA / plat",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        description: "Spécialités sénégalaises authentiques: Ceebu Jën, Mafé, Yassa au poulet et jus locaux (Bissap, Bouye)."
    },
    {
        id: 3,
        title: "Samba - Guide Écotourisme",
        category: "guide",
        location: "Delta du Saloum / Toubacouta",
        price: "20 000 FCFA / journée",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        rating: 5.0,
        description: "Excursions en pirogue à la découverte des bolongs, observation des oiseaux migrateurs et île aux coquillages."
    },
    {
        id: 4,
        title: "Village Artisanal de Soumbédioune",
        category: "artisanat",
        location: "Dakar",
        price: "Prix variables",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        description: "Sculptures sur bois, bijoux en argent, batiks colorés, instruments de musique traditionnels et maroquinerie."
    },
    {
        id: 5,
        title: "Teranga Express Shuttle",
        category: "transport",
        location: "AIBD - Dakar / Mbour",
        price: "10 000 FCFA / trajet",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        description: "Navettes climatisées haut de gamme reliant l'aéroport Blaise Diagne aux principaux centres touristiques."
    },
    {
        id: 6,
        title: "Lodge des Collines de Niokolo",
        category: "hotel",
        location: "Kédougou",
        price: "60 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        description: "Éco-lodge niché dans les montagnes de la Casamance / Kédougou proche des cascades de Dindéfélo."
    }
];

// --- State Management ---
let state = {
    wallets: [
        {
            client: "Mamadou Sow",
            telephone: "771234567",
            code: "1234",
            solde: 150000
        }
    ],
    transactions: [
        {
            type: "création",
            montant: 150000,
            frais: 0,
            indexClient: 0,
            date: new Date().toLocaleTimeString()
        }
    ],
    activeWalletIndex: 0,
    selectedCategory: "all",
    searchQuery: ""
};

// --- Helper Validation Functions (Matches validator.php) ---
function verificationTailleNumero(telephone, code) {
    return String(telephone).trim().length === 9 && String(code).trim().length === 4;
}

function debutNumero(telephone) {
    const prefixValide = ['70', '75', '76', '77', '78'];
    const prefix = String(telephone).substring(0, 2);
    return prefixValide.includes(prefix);
}

function soldeInitialValide(solde) {
    return Number(solde) >= 0;
}

function montantValide(montant) {
    return Number(montant) > 0;
}

function verifiTelephoneExiste(telephone) {
    return state.wallets.some(w => w.telephone === String(telephone).trim());
}

function verifiCodeExiste(code) {
    return state.wallets.some(w => w.code === String(code).trim());
}

function trouverWalletIndex(telephone) {
    return state.wallets.findIndex(w => w.telephone === String(telephone).trim());
}

// --- Dynamic Fee Calculation (Matches services.php) ---
function calculerFrais(montant) {
    const m = Number(montant);
    if (m <= 10000) {
        return 200;
    } else if (m <= 100000) {
        return 500;
    } else {
        let frais = Math.floor(m * 0.01);
        if (frais > 5000) {
            frais = 5000;
        }
        return frais;
    }
}

// --- Toast Notifications ---
function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icon = type === "success" ? "fa-circle-check text-neon" : "fa-triangle-exclamation";
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// --- UI Renderers ---
function renderWalletDashboard() {
    const currentWallet = state.wallets[state.activeWalletIndex];

    const heroBalance = document.getElementById("heroCardBalance");
    const heroHolder = document.getElementById("heroCardHolder");
    const heroPhone = document.getElementById("heroCardPhone");

    const badgeBalance = document.getElementById("badgeBalance");
    const dashBalance = document.getElementById("dashBalance");
    const dashHolder = document.getElementById("dashHolder");
    const dashPhone = document.getElementById("dashPhone");
    const dashCode = document.getElementById("dashCode");

    if (currentWallet) {
        const formattedSolde = currentWallet.solde.toLocaleString('fr-FR') + " FCFA";

        if (heroBalance) heroBalance.innerHTML = `${currentWallet.solde.toLocaleString('fr-FR')} <small>FCFA</small>`;
        if (heroHolder) heroHolder.textContent = currentWallet.client;
        if (heroPhone) heroPhone.textContent = currentWallet.telephone;

        if (badgeBalance) badgeBalance.textContent = formattedSolde;
        if (dashBalance) dashBalance.textContent = formattedSolde;
        if (dashHolder) dashHolder.textContent = currentWallet.client;
        if (dashPhone) dashPhone.textContent = currentWallet.telephone;
        if (dashCode) dashCode.textContent = "**** (" + currentWallet.code + ")";
    } else {
        if (heroBalance) heroBalance.innerHTML = `0 <small>FCFA</small>`;
        if (heroHolder) heroHolder.textContent = "Non Connecté";
        if (heroPhone) heroPhone.textContent = "77 XXX XX XX";

        if (badgeBalance) badgeBalance.textContent = "0 FCFA";
        if (dashBalance) dashBalance.textContent = "0 FCFA";
        if (dashHolder) dashHolder.textContent = "Aucun wallet sélectionné";
        if (dashPhone) dashPhone.textContent = "-";
        if (dashCode) dashCode.textContent = "****";
    }

    renderTransactions();
}

function renderTransactions() {
    const tbody = document.getElementById("transactionTableBody");
    if (!tbody) return;

    if (state.transactions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-msg">Aucune transaction enregistrée.</td></tr>`;
        return;
    }

    tbody.innerHTML = state.transactions.map((t, idx) => {
        const client = state.wallets[t.indexClient] ? state.wallets[t.indexClient].client : "Client Inconnu";
        const badgeClass = t.type === 'dépôt' || t.type === 'création' ? 'text-neon' : 'text-primary';
        return `
            <tr>
                <td>#${idx + 1}</td>
                <td><strong>${client}</strong></td>
                <td><span class="${badgeClass}">${t.type.toUpperCase()}</span></td>
                <td><strong>${t.montant.toLocaleString('fr-FR')} FCFA</strong></td>
                <td>${t.frais ? t.frais.toLocaleString('fr-FR') + ' FCFA' : '-'}</td>
            </tr>
        `;
    }).reverse().join("");
}

function renderActors() {
    const grid = document.getElementById("acteursGrid");
    if (!grid) return;

    const filtered = DEFAULT_ACTORS.filter(actor => {
        const matchesCategory = state.selectedCategory === "all" || actor.category === state.selectedCategory;
        const matchesSearch = actor.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                              actor.location.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                              actor.description.toLowerCase().includes(state.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 12px; display: block;"></i>
                Aucun acteur touristique ne correspond à votre recherche.
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(actor => `
        <div class="actor-card">
            <div class="actor-image-wrap">
                <img src="${actor.image}" alt="${actor.title}">
                <span class="actor-category-tag">${actor.category.toUpperCase()}</span>
            </div>
            <div class="actor-content">
                <div class="actor-location"><i class="fa-solid fa-location-dot"></i> ${actor.location}</div>
                <h3 class="actor-title">${actor.title}</h3>
                <p class="actor-desc">${actor.description}</p>
                <div class="actor-footer">
                    <span class="actor-price">${actor.price}</span>
                    <button class="btn btn-sm btn-glass" onclick="openActorModal(${actor.id})">
                        <i class="fa-solid fa-circle-info"></i> Détails
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

function openActorModal(actorId) {
    const actor = DEFAULT_ACTORS.find(a => a.id === actorId);
    if (!actor) return;

    const modal = document.getElementById("actorModal");
    const body = document.getElementById("modalBody");
    if (!modal || !body) return;

    body.innerHTML = `
        <img src="${actor.image}" alt="${actor.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 16px;">
        <span class="actor-category-tag" style="position: static; display: inline-block; margin-bottom: 8px;">${actor.category.toUpperCase()}</span>
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; margin-bottom: 8px;">${actor.title}</h2>
        <p style="color: var(--neon-cyan); font-weight: 600; margin-bottom: 12px;"><i class="fa-solid fa-location-dot"></i> ${actor.location}</p>
        <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 0.95rem;">${actor.description}</p>
        <div style="background: var(--bg-card); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass); display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <span style="color: var(--text-muted); font-size: 0.9rem;">Tarif Indicatif :</span>
            <strong style="color: var(--neon-green); font-size: 1.1rem;">${actor.price}</strong>
        </div>
        <button class="btn btn-neon btn-block" onclick="payActorWithPass('${actor.title}', '${actor.price}')">
            <i class="fa-solid fa-credit-card"></i> Réserver via Teranga Pass
        </button>
    `;

    modal.classList.add("active");
}

function payActorWithPass(title, priceStr) {
    closeActorModal();
    const currentWallet = state.wallets[state.activeWalletIndex];
    if (!currentWallet) {
        showToast("Veuillez d'abord créer un portefeuille Teranga Pass.", "error");
        return;
    }

    showToast(`Paiement de la prestation "${title}" initié via Teranga Pass!`);
}

function closeActorModal() {
    const modal = document.getElementById("actorModal");
    if (modal) modal.classList.remove("active");
}

// --- Event Handlers & Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    // Render initial state
    renderWalletDashboard();
    renderActors();

    // Category Filter Tabs
    const categoryTabs = document.getElementById("categoryTabs");
    if (categoryTabs) {
        categoryTabs.addEventListener("click", (e) => {
            const btn = e.target.closest(".cat-btn");
            if (!btn) return;

            document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            state.selectedCategory = btn.dataset.category;
            renderActors();
        });
    }

    // Search Input
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            state.searchQuery = e.target.value.trim();
            renderActors();
        });
    }

    // Tab Navigation for Wallet Actions
    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            const targetPane = document.getElementById(btn.dataset.tab);
            if (targetPane) targetPane.classList.add("active");
        });
    });

    // Real-time Withdrawal Fee Preview
    const retraitAmountInput = document.getElementById("retraitAmount");
    if (retraitAmountInput) {
        retraitAmountInput.addEventListener("input", (e) => {
            const amount = Number(e.target.value) || 0;
            const fee = amount > 0 ? calculerFrais(amount) : 0;
            const total = amount + fee;

            document.getElementById("previewAmount").textContent = `${amount.toLocaleString('fr-FR')} FCFA`;
            document.getElementById("previewFee").textContent = `+ ${fee.toLocaleString('fr-FR')} FCFA`;
            document.getElementById("previewTotal").textContent = `${total.toLocaleString('fr-FR')} FCFA`;
        });
    }

    // Form: Create Wallet
    const formCreate = document.getElementById("formCreateWallet");
    if (formCreate) {
        formCreate.addEventListener("submit", (e) => {
            e.preventDefault();
            const client = document.getElementById("createName").value.trim();
            const telephone = document.getElementById("createPhone").value.trim();
            const code = document.getElementById("createCode").value.trim();
            const solde = parseInt(document.getElementById("createSolde").value, 10);

            const newWallet = { client, telephone, code, solde };

            if (!verificationTailleNumero(telephone, code)) {
                showToast("Erreur : Le numéro doit faire 9 chiffres et le code PIN 4 chiffres.", "error");
                return;
            }

            if (!debutNumero(telephone)) {
                showToast("Erreur : Le numéro doit débuter par 70, 75, 76, 77 ou 78.", "error");
                return;
            }

            if (!soldeInitialValide(solde)) {
                showToast("Erreur : Le solde initial doit être positif ou nul.", "error");
                return;
            }

            if (verifiTelephoneExiste(telephone)) {
                showToast("Erreur : Ce numéro de téléphone existe déjà.", "error");
                return;
            }

            if (verifiCodeExiste(code)) {
                showToast("Erreur : Ce code PIN existe déjà.", "error");
                return;
            }

            state.wallets.push(newWallet);
            state.activeWalletIndex = state.wallets.length - 1;

            state.transactions.push({
                type: 'création',
                montant: solde,
                frais: 0,
                indexClient: state.activeWalletIndex,
                date: new Date().toLocaleTimeString()
            });

            showToast(`Wallet créé avec succès pour ${client} !`);
            renderWalletDashboard();
            formCreate.reset();
        });
    }

    // Form: Dépôt
    const formDepot = document.getElementById("formDepot");
    if (formDepot) {
        formDepot.addEventListener("submit", (e) => {
            e.preventDefault();
            const telephone = document.getElementById("depotPhone").value.trim();
            const montant = parseInt(document.getElementById("depotAmount").value, 10);

            if (!montantValide(montant)) {
                showToast("Erreur : Le montant du dépôt doit être supérieur à 0.", "error");
                return;
            }

            const index = trouverWalletIndex(telephone);
            if (index === -1) {
                showToast("Erreur : Aucun wallet associé à ce numéro de téléphone.", "error");
                return;
            }

            state.wallets[index].solde += montant;
            state.transactions.push({
                type: 'dépôt',
                montant: montant,
                frais: 0,
                indexClient: index,
                date: new Date().toLocaleTimeString()
            });

            showToast(`Dépôt de ${montant.toLocaleString('fr-FR')} FCFA effectué avec succès !`);
            renderWalletDashboard();
            formDepot.reset();
        });
    }

    // Form: Retrait
    const formRetrait = document.getElementById("formRetrait");
    if (formRetrait) {
        formRetrait.addEventListener("submit", (e) => {
            e.preventDefault();
            const telephone = document.getElementById("retraitPhone").value.trim();
            const montant = parseInt(document.getElementById("retraitAmount").value, 10);

            if (!montantValide(montant)) {
                showToast("Erreur : Le montant doit être positif.", "error");
                return;
            }

            const index = trouverWalletIndex(telephone);
            if (index === -1) {
                showToast("Erreur : Aucun wallet associé à ce numéro.", "error");
                return;
            }

            const frais = calculerFrais(montant);
            const totalDebit = montant + frais;

            if (state.wallets[index].solde < totalDebit) {
                showToast(`Erreur : Solde insuffisant. Requis : ${totalDebit.toLocaleString('fr-FR')} FCFA`, "error");
                return;
            }

            state.wallets[index].solde -= totalDebit;
            state.transactions.push({
                type: 'retrait',
                montant: montant,
                frais: frais,
                indexClient: index,
                date: new Date().toLocaleTimeString()
            });

            showToast(`Retrait de ${montant.toLocaleString('fr-FR')} FCFA (Frais: ${frais} FCFA) effectué !`);
            renderWalletDashboard();
            formRetrait.reset();

            // Reset preview
            document.getElementById("previewAmount").textContent = "0 FCFA";
            document.getElementById("previewFee").textContent = "+ 0 FCFA";
            document.getElementById("previewTotal").textContent = "0 FCFA";
        });
    }

    // Modal close button
    const modalClose = document.getElementById("modalClose");
    if (modalClose) {
        modalClose.addEventListener("click", closeActorModal);
    }
});
