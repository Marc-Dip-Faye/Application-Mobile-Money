/**
 * Teranga Tourism & Digital Wallet JS
 * Replicates validator.php, services.php, repository.php and controller.php logic
 * with full client interactivity, local storage, and real-time filtering.
 */

// Initial Data: Tourism Actors in Senegal
const TOURISM_ACTORS = [
    {
        id: "act-1",
        name: "Teranga Luxury Eco-Lodge",
        category: "hotel",
        location: "Saly / Somone",
        rating: 4.9,
        badge: "Certifié Éco-responsable",
        description: "Bungalows de charme nichés en bord de lagune avec spa naturel, cuisine sénégalaise raffinée et excursions privées.",
        phone: "77 845 12 90",
        price: "65 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        features: ["Piscine à débordement", "Petit déjeuner inclus", "Paiement Wallet Direct"]
    },
    {
        id: "act-2",
        name: "Dakar Authentic Safari & Excursions",
        category: "guide",
        location: "Dakar & Gorée",
        rating: 4.8,
        badge: "Guide National Agréé",
        description: "Visites guidées historiques de l'Île de Gorée, du Musée des Civilisations Noires et safari photo dans la réserve de Bandia.",
        phone: "76 312 99 40",
        price: "25 000 FCFA / excursion",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
        features: ["Billets coupe-file", "Transport climatisé", "Guide trilingue"]
    },
    {
        id: "act-3",
        name: "Teranga Express Airport Shuttle",
        category: "transport",
        location: "AIBD Aéroport - Dakar / Saly",
        rating: 4.9,
        badge: "Transporteur Officiel AIBD",
        description: "Service de transfert VIP 24h/24 entre l'aéroport AIBD Diass et toutes les zones hôtelières de Dakar, Saly et Saint-Louis.",
        phone: "70 555 12 34",
        price: "18 000 FCFA / trajet",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
        features: ["Chauffeur pro", "WiFi à bord", "Suivi en temps réel"]
    },
    {
        id: "act-4",
        name: "Résidence Hotel Saint-Louis Ndar",
        category: "hotel",
        location: "Saint-Louis",
        rating: 4.7,
        badge: "Patrimoine & Charme",
        description: "Hôtel historique rénové situé sur l'île de Saint-Louis avec vue panoramique sur le Pont Faidherbe et le fleuve Sénégal.",
        phone: "78 400 22 11",
        price: "45 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        features: ["Rooftop bar", "Organisation Djoudj", "Proche Marché"]
    },
    {
        id: "act-5",
        name: "Village Artisanal de Soumbédioune",
        category: "culture",
        location: "Dakar Corniche Ouest",
        rating: 4.6,
        badge: "Artisanat d'Art Agréé",
        description: "Regroupement des maîtres potiers, sculpteurs sur bois, maroquiniers et bijoutiers en argent du Sénégal.",
        phone: "77 601 88 20",
        price: "Visite Libre",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
        features: ["Direct artisans", "Atelier démonstration", "Paiement QR Code Wallet"]
    },
    {
        id: "act-6",
        name: "Cap Skirring Ecolodge & Pirogue",
        category: "hotel",
        location: "Casamance",
        rating: 4.9,
        badge: "Joyau de la Casamance",
        description: "Séjour pieds dans l'eau entre cocotiers et plage de sable fin, dégustation d'huîtres de palétuviers et sorties pêche.",
        phone: "75 990 11 00",
        price: "55 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        features: ["Accès direct plage", "Pirogue privée", "Restauration bio"]
    },
    {
        id: "act-7",
        name: "Restaurant Teranga Chez Loutcha",
        category: "culture",
        location: "Dakar Plateau",
        rating: 4.7,
        badge: "Gastronomie Locale",
        description: "Restaurant mythique servant les grands classiques sénégalais : Thieboudienne au poisson frais, Yassa au poulet et Caldou.",
        phone: "77 200 44 55",
        price: "5 000 FCFA / plat",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
        features: ["Cuisine authentique", "Jus locaux bissap/bouye", "Climatisé"]
    },
    {
        id: "act-8",
        name: "Agence Sénégalaise de Promotion Touristique (ASPT)",
        category: "institutional",
        location: "Dakar",
        rating: 5.0,
        badge: "Institution Publique",
        description: "Organisme national dédié au développement, à la promotion et au label de qualité de la destination Sénégal.",
        phone: "70 000 00 00",
        price: "Information Officielle",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
        features: ["Assistance voyageurs", "Certification guides", "Cartes officielles"]
    }
];

// Initial Demo Wallets (stored in localStorage)
const INITIAL_WALLETS = [
    { client: "Samba Diallo", telephone: "778451290", code: "1234", solde: 250000 },
    { client: "Aïssatou Ndiaye", telephone: "763129940", code: "5678", solde: 120000 },
    { client: "Fatou Sow", telephone: "705551234", code: "0000", solde: 75000 }
];

// Initial Demo Transactions
const INITIAL_TRANSACTIONS = [
    { type: "depot", montant: 250000, frais: 0, indexClient: 0, date: new Date().toLocaleDateString('fr-FR') },
    { type: "retrait", montant: 20000, frais: 200, indexClient: 0, date: new Date().toLocaleDateString('fr-FR') }
];

// Local Storage Manager
class WalletRepository {
    constructor() {
        this.loadData();
    }

    loadData() {
        const storedWallets = localStorage.getItem("teranga_wallets");
        if (storedWallets) {
            this.wallets = JSON.parse(storedWallets);
        } else {
            this.wallets = [...INITIAL_WALLETS];
            this.saveWallets();
        }

        const storedTxs = localStorage.getItem("teranga_transactions");
        if (storedTxs) {
            this.transactions = JSON.parse(storedTxs);
        } else {
            this.transactions = [...INITIAL_TRANSACTIONS];
            this.saveTransactions();
        }
    }

    saveWallets() {
        localStorage.setItem("teranga_wallets", JSON.stringify(this.wallets));
    }

    saveTransactions() {
        localStorage.setItem("teranga_transactions", JSON.stringify(this.transactions));
    }

    // Equivalent to repository.php -> trouverWalletIndex
    trouverWalletIndex(telephone) {
        return this.wallets.findIndex(w => w.telephone === telephone.trim());
    }

    // Equivalent to repository.php -> verifiTelephoneExiste
    verifiTelephoneExiste(telephone) {
        return this.wallets.some(w => w.telephone === telephone.trim());
    }

    // Equivalent to repository.php -> verifiCodeExiste
    verifiCodeExiste(code) {
        return this.wallets.some(w => w.code === code.trim());
    }
}

// Validator Logic (matches validator.php)
class WalletValidator {
    // Matches validator.php -> verificationTailleNumero
    static verificationTailleNumero(newWallet) {
        const numero = newWallet.telephone || "";
        const code = newWallet.code || "";
        return numero.length === 9 && code.length === 4;
    }

    // Matches validator.php -> debutNumero
    static debutNumero(newWallet) {
        const prefixValide = ['70', '75', '76', '77', '78'];
        const prefix = (newWallet.telephone || "").substring(0, 2);
        return prefixValide.includes(prefix);
    }

    // Matches validator.php -> montantValide
    static montantValide(montant) {
        return montant > 0;
    }

    // Matches validator.php -> soldeInitialValide
    static soldeInitialValide(solde) {
        return solde >= 0;
    }
}

// Services Logic (matches services.php)
class WalletServices {
    // Matches services.php -> calculerFrais
    static calculerFrais(montant) {
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
}

// Global App Instance
const db = new WalletRepository();
let currentSelectedIndex = 0;

// Format Currency Utility
function formatFCFA(amount) {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
    initActorsGrid();
    initFilterButtons();
    initWalletUI();
    initWalletForms();
    initModal();
});

// Render Tourism Actors
function initActorsGrid(filterCategory = "all", searchQuery = "") {
    const container = document.getElementById("acteursGrid");
    if (!container) return;

    let filtered = TOURISM_ACTORS;

    if (filterCategory !== "all") {
        filtered = filtered.filter(a => a.category === filterCategory);
    }

    if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(a =>
            a.name.toLowerCase().includes(q) ||
            a.location.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q)
        );
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
                <i class="fa-solid fa-magnifying-glass text-3xl text-slate-600 mb-3 block"></i>
                <p class="text-slate-400 text-sm font-medium">Aucun acteur touristique ne correspond à votre recherche.</p>
                <button onclick="resetFilters()" class="mt-4 text-xs bg-emerald-500/10 text-neon border border-emerald-500/30 px-4 py-2 rounded-xl font-bold">Réinitialiser les filtres</button>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(actor => `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between group">
            <div class="relative h-44 bg-slate-800 overflow-hidden">
                <img src="${actor.image}" alt="${actor.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <span class="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 font-semibold text-[11px] px-2.5 py-1 rounded-lg border border-slate-800">
                    <i class="fa-solid fa-star mr-1"></i>${actor.rating}
                </span>
                <span class="absolute bottom-3 left-3 bg-emerald-500/90 text-slate-950 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    ${actor.badge}
                </span>
            </div>

            <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                    <span class="text-[11px] text-teal-400 font-semibold uppercase tracking-wider block mb-1">
                        <i class="fa-solid fa-location-dot mr-1"></i>${actor.location}
                    </span>
                    <h3 class="text-lg font-bold text-white group-hover:text-neon transition">${actor.name}</h3>
                    <p class="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">${actor.description}</p>
                </div>

                <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                        <span class="text-[10px] text-slate-500 block uppercase">Tarif indicatif</span>
                        <span class="text-slate-200 font-bold font-mono">${actor.price}</span>
                    </div>
                    <button onclick="openActorModal('${actor.id}')" class="bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 font-bold px-3 py-1.5 rounded-xl transition text-xs border border-slate-700">
                        Détails & Contact
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

// Category Filter Click Handler
function initFilterButtons() {
    const buttons = document.querySelectorAll(".cat-filter");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const cat = btn.getAttribute("data-cat");
            initActorsGrid(cat);
        });
    });

    // Hero Search Bar
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    if (searchInput && searchBtn) {
        searchBtn.addEventListener("click", () => {
            const query = searchInput.value;
            initActorsGrid("all", query);
            document.getElementById("acteurs")?.scrollIntoView({ behavior: 'smooth' });
        });

        searchInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                initActorsGrid("all", searchInput.value);
                document.getElementById("acteurs")?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

function filterByLocation(locationKeyword) {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.value = locationKeyword;
    }
    initActorsGrid("all", locationKeyword);
    document.getElementById("acteurs")?.scrollIntoView({ behavior: 'smooth' });
}

function resetFilters() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = "";
    initActorsGrid("all");
}

// Wallet UI Initialization
function initWalletUI() {
    updateWalletDropdown();
    selectWalletIndex(0);
    renderTransactions();
}

function updateWalletDropdown() {
    const dropdown = document.getElementById("selectWalletDropdown");
    const countBadge = document.getElementById("walletCountBadge");
    if (!dropdown) return;

    dropdown.innerHTML = `<option value="">-- Sélectionner un wallet client --</option>` +
        db.wallets.map((w, index) => `
            <option value="${index}" ${index === currentSelectedIndex ? 'selected' : ''}>
                ${w.client} (${w.telephone}) - Solde: ${formatFCFA(w.solde)}
            </option>
        `).join("");

    if (countBadge) {
        countBadge.textContent = `${db.wallets.length} enregistrés`;
    }

    dropdown.onchange = (e) => {
        const val = e.target.value;
        if (val !== "") {
            selectWalletIndex(parseInt(val, 10));
        }
    };
}

function selectWalletIndex(index) {
    if (index < 0 || index >= db.wallets.length) return;
    currentSelectedIndex = index;
    const wallet = db.wallets[index];

    // Update Left Panel Cards
    const displaySolde = document.getElementById("displaySolde");
    const displayClient = document.getElementById("displayClient");
    const displayTelephone = document.getElementById("displayTelephone");
    const displayCode = document.getElementById("displayCode");

    if (displaySolde) displaySolde.textContent = formatFCFA(wallet.solde);
    if (displayClient) displayClient.textContent = wallet.client;
    if (displayTelephone) displayTelephone.textContent = wallet.telephone;
    if (displayCode) displayCode.textContent = "**** (" + wallet.code + ")";

    // Update Hero Virtual Card
    const heroCardOwner = document.getElementById("heroCardOwner");
    const heroCardBalance = document.getElementById("heroCardBalance");
    const heroCardPhone = document.getElementById("heroCardPhone");

    if (heroCardOwner) heroCardOwner.textContent = wallet.client;
    if (heroCardBalance) heroCardBalance.textContent = formatFCFA(wallet.solde);
    if (heroCardPhone) heroCardPhone.textContent = wallet.telephone;

    // Prefill forms phone inputs
    const depotTel = document.getElementById("depotTel");
    const retraitTel = document.getElementById("retraitTel");

    if (depotTel) depotTel.value = wallet.telephone;
    if (retraitTel) retraitTel.value = wallet.telephone;

    updateWalletDropdown();
}

// Wallet Forms & Operations
function initWalletForms() {
    // Tab switching
    const tabs = document.querySelectorAll(".wallet-tab");
    const panes = document.querySelectorAll(".wallet-form-pane");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const targetTab = tab.getAttribute("data-tab");
            panes.forEach(pane => pane.classList.add("hidden"));

            if (targetTab === "create") document.getElementById("formCreateWallet")?.classList.remove("hidden");
            if (targetTab === "depot") document.getElementById("formDepot")?.classList.remove("hidden");
            if (targetTab === "retrait") document.getElementById("formRetrait")?.classList.remove("hidden");
            if (targetTab === "transactions") {
                document.getElementById("paneTransactions")?.classList.remove("hidden");
                renderTransactions();
            }
            hideAlert();
        });
    });

    // Real-time Retrait Fee Calculator
    const retraitMontantInput = document.getElementById("retraitMontant");
    if (retraitMontantInput) {
        retraitMontantInput.addEventListener("input", () => {
            const val = parseInt(retraitMontantInput.value, 10) || 0;
            const frais = WalletServices.calculerFrais(val);
            const total = val + frais;

            document.getElementById("previewFrais").textContent = formatFCFA(frais);
            document.getElementById("previewTotal").textContent = formatFCFA(total);
        });
    }

    // Form 1: Créer Wallet
    const formCreate = document.getElementById("formCreateWallet");
    if (formCreate) {
        formCreate.addEventListener("submit", (e) => {
            e.preventDefault();
            const nom = document.getElementById("createNom").value.trim();
            const tel = document.getElementById("createTel").value.trim();
            const code = document.getElementById("createCode").value.trim();
            const solde = parseInt(document.getElementById("createSolde").value, 10) || 0;

            const newWallet = { client: nom, telephone: tel, code: code, solde: solde };

            // Replicate controller.php -> creerWallet validations
            if (!WalletValidator.verificationTailleNumero(newWallet)) {
                showAlert("Erreur : taille du numéro (9 chiffres) ou du code (4 chiffres) invalide", "error");
                return;
            }

            if (!WalletValidator.debutNumero(newWallet)) {
                showAlert("Erreur : format numéro invalide. Doit débuter par 70, 75, 76, 77 ou 78.", "error");
                return;
            }

            if (!WalletValidator.soldeInitialValide(solde)) {
                showAlert("Erreur : le solde initial doit être positif ou nul", "error");
                return;
            }

            if (db.verifiTelephoneExiste(tel)) {
                showAlert("Erreur : ce numéro de téléphone existe déjà dans le système", "error");
                return;
            }

            if (db.verifiCodeExiste(code)) {
                showAlert("Erreur : ce code secret existe déjà", "error");
                return;
            }

            // Success
            db.wallets.push(newWallet);
            db.saveWallets();

            showAlert(`Wallet créé avec succès pour ${nom} !`, "success");
            formCreate.reset();

            selectWalletIndex(db.wallets.length - 1);
        });
    }

    // Form 2: Faire Dépôt
    const formDepot = document.getElementById("formDepot");
    if (formDepot) {
        formDepot.addEventListener("submit", (e) => {
            e.preventDefault();
            const tel = document.getElementById("depotTel").value.trim();
            const montant = parseInt(document.getElementById("depotMontant").value, 10) || 0;

            // Replicate controller.php -> depot
            if (!WalletValidator.montantValide(montant)) {
                showAlert("Erreur : Le montant du dépôt doit être supérieur à 0 FCFA", "error");
                return;
            }

            const index = db.trouverWalletIndex(tel);
            if (index === -1) {
                showAlert("Erreur : Wallet introuvable pour ce numéro de téléphone", "error");
                return;
            }

            db.wallets[index].solde += montant;
            db.saveWallets();

            // Record transaction
            db.transactions.push({
                type: "depot",
                montant: montant,
                frais: 0,
                indexClient: index,
                date: new Date().toLocaleDateString('fr-FR') + " à " + new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})
            });
            db.saveTransactions();

            showAlert(`Dépôt effectué avec succès. Nouveau solde : ${formatFCFA(db.wallets[index].solde)}`, "success");
            selectWalletIndex(index);
            formDepot.reset();
            document.getElementById("depotTel").value = tel;
        });
    }

    // Form 3: Faire Retrait
    const formRetrait = document.getElementById("formRetrait");
    if (formRetrait) {
        formRetrait.addEventListener("submit", (e) => {
            e.preventDefault();
            const tel = document.getElementById("retraitTel").value.trim();
            const montant = parseInt(document.getElementById("retraitMontant").value, 10) || 0;

            // Replicate controller.php -> retrait
            if (!WalletValidator.montantValide(montant)) {
                showAlert("Erreur : le montant du retrait doit être positif.", "error");
                return;
            }

            const index = db.trouverWalletIndex(tel);
            if (index === -1) {
                showAlert("Erreur : aucun wallet associé à ce numéro de téléphone.", "error");
                return;
            }

            const frais = WalletServices.calculerFrais(montant);
            const totalDebit = montant + frais;

            if (db.wallets[index].solde < totalDebit) {
                showAlert(`Erreur : solde insuffisant. Solde actuel : ${formatFCFA(db.wallets[index].solde)} | Requis : ${formatFCFA(totalDebit)} (Montant + Frais)`, "error");
                return;
            }

            db.wallets[index].solde -= totalDebit;
            db.saveWallets();

            db.transactions.push({
                type: "retrait",
                montant: montant,
                frais: frais,
                indexClient: index,
                date: new Date().toLocaleDateString('fr-FR') + " à " + new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})
            });
            db.saveTransactions();

            showAlert(`Retrait de ${formatFCFA(montant)} effectué ! Frais : ${formatFCFA(frais)}. Nouveau solde : ${formatFCFA(db.wallets[index].solde)}`, "success");
            selectWalletIndex(index);
            formRetrait.reset();
            document.getElementById("retraitTel").value = tel;
            document.getElementById("previewFrais").textContent = "0 FCFA";
            document.getElementById("previewTotal").textContent = "0 FCFA";
        });
    }

    // Clear History Button
    const btnClearHistory = document.getElementById("btnClearHistory");
    if (btnClearHistory) {
        btnClearHistory.addEventListener("click", () => {
            db.transactions = [];
            db.saveTransactions();
            renderTransactions();
            showAlert("Historique des transactions réinitialisé.", "success");
        });
    }
}

// Render Transactions List (matches controller.php -> afficherTransaction)
function renderTransactions() {
    const container = document.getElementById("transactionsContainer");
    if (!container) return;

    if (db.transactions.length === 0) {
        container.innerHTML = `
            <p class="text-center text-xs text-slate-500 py-6">Aucune transaction enregistrée pour le moment.</p>
        `;
        return;
    }

    container.innerHTML = db.transactions.slice().reverse().map((tx, idx) => {
        const client = db.wallets[tx.indexClient] ? db.wallets[tx.indexClient].client : "Client Inconnu";
        const isDepot = tx.type === "depot";

        return `
            <div class="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg ${isDepot ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'} flex items-center justify-center font-bold">
                        <i class="fa-solid ${isDepot ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
                    </div>
                    <div>
                        <p class="text-slate-200 font-bold uppercase tracking-wider text-[11px]">${tx.type} - ${client}</p>
                        <p class="text-[10px] text-slate-500">${tx.date || 'Aujourd\'hui'}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-bold font-mono ${isDepot ? 'text-neon' : 'text-amber-400'}">${isDepot ? '+' : '-'}${formatFCFA(tx.montant)}</p>
                    ${tx.frais ? `<p class="text-[10px] text-slate-500">Frais: ${formatFCFA(tx.frais)}</p>` : ''}
                </div>
            </div>
        `;
    }).join("");
}

// Alert Notification Manager
function showAlert(message, type = "success") {
    const alertBox = document.getElementById("walletAlert");
    const alertMsg = document.getElementById("walletAlertMessage");
    const alertIcon = document.getElementById("walletAlertIcon");

    if (!alertBox || !alertMsg || !alertIcon) return;

    alertBox.classList.remove("hidden", "bg-rose-500/10", "border-rose-500/30", "text-rose-400", "bg-emerald-500/10", "border-emerald-500/30", "text-neon", "border");

    if (type === "error") {
        alertBox.classList.add("bg-rose-500/10", "border", "border-rose-500/30", "text-rose-400");
        alertIcon.className = "fa-solid fa-triangle-exclamation text-rose-400";
    } else {
        alertBox.classList.add("bg-emerald-500/10", "border", "border-emerald-500/30", "text-neon");
        alertIcon.className = "fa-solid fa-circle-check text-neon";
    }

    alertMsg.textContent = message;
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideAlert() {
    const alertBox = document.getElementById("walletAlert");
    if (alertBox) alertBox.classList.add("hidden");
}

// Actor Modal Handler
function initModal() {
    const modal = document.getElementById("actorModal");
    const closeBtn = document.getElementById("closeModalBtn");

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal?.classList.add("hidden");
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal?.classList.add("hidden");
        }
    });
}

function openActorModal(actorId) {
    const actor = TOURISM_ACTORS.find(a => a.id === actorId);
    if (!actor) return;

    const modal = document.getElementById("actorModal");
    const modalContent = document.getElementById("modalContent");

    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <div class="space-y-4">
            <div class="relative h-48 rounded-2xl overflow-hidden">
                <img src="${actor.image}" alt="${actor.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <span class="absolute bottom-3 left-3 bg-emerald-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-full uppercase">
                    ${actor.badge}
                </span>
            </div>

            <div>
                <span class="text-xs text-amber-400 font-semibold"><i class="fa-solid fa-location-dot mr-1"></i>${actor.location}</span>
                <h3 class="text-2xl font-extrabold text-white mt-1">${actor.name}</h3>
                <p class="text-xs text-slate-300 mt-2 leading-relaxed">${actor.description}</p>
            </div>

            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <p class="text-xs text-slate-400 font-semibold uppercase">Prestations Incluses :</p>
                <div class="flex flex-wrap gap-2">
                    ${actor.features.map(f => `<span class="bg-slate-900 border border-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-lg"><i class="fa-solid fa-check text-neon mr-1"></i>${f}</span>`).join("")}
                </div>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                    <span class="text-[10px] text-slate-500 uppercase block">Tarif</span>
                    <span class="text-lg font-extrabold text-neon font-mono">${actor.price}</span>
                </div>
                <button onclick="reserverPrestation('${actor.name}')" class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition flex items-center gap-2">
                    <i class="fa-solid fa-wallet"></i> Réserver via Teranga Wallet
                </button>
            </div>
        </div>
    `;

    modal.classList.remove("hidden");
}

function reserverPrestation(actorName) {
    document.getElementById("actorModal")?.classList.add("hidden");
    const walletSection = document.getElementById("wallet");
    if (walletSection) {
        walletSection.scrollIntoView({ behavior: 'smooth' });
    }
    showAlert(`Pour finaliser votre réservation chez "${actorName}", effectuez un retrait ou un transfert vers leur numéro de marchand via votre Teranga Wallet.`, "success");
}

function reserverExcursion(circuitName, price) {
    const walletSection = document.getElementById("wallet");
    if (walletSection) {
        walletSection.scrollIntoView({ behavior: 'smooth' });
    }
    showAlert(`Option de réservation sélectionnée : "${circuitName}" (${formatFCFA(price)}). Veuillez valider l'opération de retrait depuis votre Teranga Wallet.`, "success");
}
