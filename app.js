/**
 * Teranga Pass Sénégal - Client Application Logic
 */

// Initial Data State for Tourism Actors
const TOURISM_ACTORS = [
  {
    id: 1,
    name: "King Fahd Palace Hotel",
    category: "hotel",
    categoryLabel: "Hôtel 5 Etoiles",
    region: "Dakar",
    location: "Pointe des Almadies, Dakar",
    rating: 4.9,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    description: "Complexe hôtelier d'exception en bord de mer, idéal pour les séjours de luxe et congrès internationaux à Dakar.",
    contact: "+221 33 869 69 69",
    services: ["Piscine olympique", "Golf 9 trous", "Restaurants gastronomiques", "Spa & Wellness"]
  },
  {
    id: 2,
    name: "Teranga Tours & Excursions",
    category: "agence",
    categoryLabel: "Agence de Voyage",
    region: "Dakar",
    location: "Plateau, Dakar",
    rating: 4.8,
    reviewsCount: 185,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    description: "Circuit découverte à Gorée, Lac Rose, Sine Saloum et Casamance avec chauffeurs et guides bilingues professionnels.",
    contact: "+221 77 555 12 34",
    services: ["Transports privatisés", "Circuit 4x4 Lac Rose", "Réservation Pass", "Ecotourisme"]
  },
  {
    id: 3,
    name: "Mamadou Diallo - Guide Agréé",
    category: "guide",
    categoryLabel: "Guide Touristique Certifié",
    region: "Saint-Louis",
    location: "Île de Saint-Louis & Djoudj",
    rating: 5.0,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    description: "Guide passionné d'histoire et d'ornithologie, spécialisé dans la découverte du patrimoine colonial de Saint-Louis.",
    contact: "+221 76 321 98 76",
    services: ["Visites historique en calèche", "Safari oiseaux au Djoudj", "Immersion culturelle"]
  },
  {
    id: 4,
    name: "Chez Loutcha - Gastronomie Teranga",
    category: "resto",
    categoryLabel: "Restaurant Traditionnel",
    region: "Dakar",
    location: "Rue Mousse Diop, Dakar Plateau",
    rating: 4.7,
    reviewsCount: 420,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    description: "Découvrez la véritable cuisine sénégalaise : Thiéboudienne, Yassa au Poulet, Mafé et jus locaux (Bissap, Bouye).",
    contact: "+221 33 821 02 02",
    services: ["Thiéboudienne Penda Mbaye", "Jus d'Afrique", "Service continu", "Commandes Teranga Pass"]
  },
  {
    id: 5,
    name: "Maison des Esclaves de Gorée",
    category: "culture",
    categoryLabel: "Patrimoine & Musée",
    region: "Dakar",
    location: "Île de Gorée",
    rating: 4.9,
    reviewsCount: 850,
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
    description: "Lieu de mémoire universel incontournable inscrit au patrimoine mondial de l'UNESCO.",
    contact: "+221 33 821 19 80",
    services: ["Visites guidées", "Pass Musée", "Espace exposition", "Accès Chaloupe"]
  },
  {
    id: 6,
    name: "Ecolodge de Simal & Somone",
    category: "hotel",
    categoryLabel: "Ecolodge & Resort",
    region: "Thies",
    location: "Lagune de Somone, Petite Côte",
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    description: "Hébergement éco-responsable niché dans la mangrove pour une déconnexion totale au calme.",
    contact: "+221 78 111 22 33",
    services: ["Pirogue dans la Mangrove", "Bungalows sur pilotis", "Cuisine bio", "Pêche sportive"]
  }
];

// Initial Wallets & Transactions State
let state = {
  wallets: [
    { client: "Ousmane Seck", telephone: "771234567", code: "1234", solde: 150000 },
    { client: "Awa Ndiaye", telephone: "789876543", code: "4321", solde: 85000 },
    { client: "Jean Dupont", telephone: "701112233", code: "0000", solde: 42000 }
  ],
  transactions: [
    { type: "depot", montant: 50000, frais: 0, indexClient: 0, date: "2026-10-12 10:15" },
    { type: "retrait", montant: 20000, frais: 200, indexClient: 1, date: "2026-10-12 11:40" }
  ],
  selectedWalletIndex: 0
};

// --- Business Rules Functions (Matching Validator & Services PHP logic) ---

/**
 * Fee calculation rules (calculerFrais in services.php):
 * - <= 10,000 CFA -> 200 CFA
 * - <= 100,000 CFA -> 500 CFA
 * - > 100,000 CFA -> 1% capped at 5000 CFA
 */
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

/**
 * Phone number prefix & length validation (validator.php)
 * - 9 digits
 * - Prefix must start with 70, 75, 76, 77, or 78
 */
function verificationTailleNumero(phone, code) {
  return phone.length === 9 && (!code || code.length === 4);
}

function debutNumero(phone) {
  const prefixValide = ['70', '75', '76', '77', '78'];
  const prefix = phone.substring(0, 2);
  return prefixValide.includes(prefix);
}

function trouverWalletIndex(telephone) {
  return state.wallets.findIndex(w => w.telephone === telephone);
}

function verifiTelephoneExiste(telephone) {
  return state.wallets.some(w => w.telephone === telephone);
}

function verifiCodeExiste(code) {
  return state.wallets.some(w => w.code === code);
}

// --- Toast Helper ---
function showToast(message, isError = false) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${isError ? "error" : ""}`;
  toast.innerHTML = `
    <i class="fa-solid ${isError ? "fa-circle-xmark text-danger" : "fa-circle-check text-neon"}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// --- UI Render Functions ---

function renderActors(categoryFilter = "all", searchQuery = "") {
  const grid = document.getElementById("acteurs-grid");
  grid.innerHTML = "";

  const filtered = TOURISM_ACTORS.filter(actor => {
    const matchCategory = categoryFilter === "all" || actor.category === categoryFilter;
    const matchSearch = !searchQuery ||
      actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      actor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      actor.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.5;"></i>
        <p>Aucun acteur touristique ne correspond à votre recherche.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(actor => {
    const card = document.createElement("div");
    card.className = "actor-card";
    card.innerHTML = `
      <div class="actor-card-img" style="background-image: url('${actor.image}');">
        <span class="actor-card-badge">${actor.categoryLabel}</span>
      </div>
      <div class="actor-card-body">
        <h3 class="actor-card-title">${actor.name}</h3>
        <div class="actor-card-location">
          <i class="fa-solid fa-location-dot text-neon"></i> ${actor.location}
        </div>
        <p class="actor-card-desc">${actor.description}</p>
        <div class="actor-card-footer">
          <div class="rating-box">
            <i class="fa-solid fa-star"></i> ${actor.rating} (${actor.reviewsCount})
          </div>
          <button class="btn btn-secondary btn-sm btn-actor-detail" data-id="${actor.id}">
            Voir fiche <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Attach Detail Event Listeners
  document.querySelectorAll(".btn-actor-detail").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.currentTarget.getAttribute("data-id"));
      openActorModal(id);
    });
  });
}

function openActorModal(actorId) {
  const actor = TOURISM_ACTORS.find(a => a.id === actorId);
  if (!actor) return;

  const modal = document.getElementById("modal-actor-details");
  document.getElementById("modal-actor-title").innerHTML = `<i class="fa-solid fa-building text-neon"></i> ${actor.name}`;

  const body = document.getElementById("modal-actor-body");
  body.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
      <img src="${actor.image}" alt="${actor.name}" style="width:100%; height:240px; object-fit:cover; border-radius:var(--radius-md);">
      <div>
        <span class="badge badge-info" style="margin-bottom:10px;">${actor.categoryLabel} - ${actor.region}</span>
        <p style="color:var(--text-muted); margin-bottom:16px; font-size:0.95rem;">${actor.description}</p>

        <h4 style="margin-bottom:10px; font-family:var(--font-heading);">Services & Prestations :</h4>
        <ul style="list-style:none; display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:20px;">
          ${actor.services.map(s => `<li><i class="fa-solid fa-check text-neon" style="margin-right:6px;"></i>${s}</li>`).join('')}
        </ul>

        <div style="background:rgba(255,255,255,0.03); padding:16px; border-radius:var(--radius-sm); border:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="font-size:0.8rem; color:var(--text-muted); display:block;">Contact Direct</span>
            <strong style="color:var(--neon-green); font-size:1.1rem;">${actor.contact}</strong>
          </div>
          <button class="btn btn-primary" onclick="alert('Réservation initiée pour ${actor.name}. Utilisez votre Pass Teranga !')">
            <i class="fa-solid fa-calendar-check"></i> Réserver via Pass
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

function renderWallets() {
  const container = document.getElementById("wallets-container");
  container.innerHTML = "";

  if (state.wallets.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem; padding:10px;">Aucun wallet enregistré.</p>`;
    return;
  }

  state.wallets.forEach((w, idx) => {
    const isSelected = idx === state.selectedWalletIndex;
    const item = document.createElement("div");
    item.className = `wallet-item ${isSelected ? "selected" : ""}`;
    item.innerHTML = `
      <div class="wallet-item-info">
        <span class="wallet-item-name">${w.client}</span>
        <span class="wallet-item-phone"><i class="fa-solid fa-phone"></i> +221 ${w.telephone}</span>
      </div>
      <div class="wallet-item-solde">${w.solde.toLocaleString('fr-FR')} CFA</div>
    `;
    item.addEventListener("click", () => {
      state.selectedWalletIndex = idx;
      renderWallets();
      updateActiveVirtualCard();
      fillWalletFormsWithSelected();
    });
    container.appendChild(item);
  });

  updateActiveVirtualCard();
}

function updateActiveVirtualCard() {
  const selected = state.wallets[state.selectedWalletIndex];
  if (selected) {
    document.getElementById("card-active-balance").textContent = `${selected.solde.toLocaleString('fr-FR')} CFA`;
    document.getElementById("card-active-client").textContent = selected.client;
    document.getElementById("card-active-phone").textContent = `+221 ${selected.telephone}`;
    document.getElementById("card-active-code").textContent = `* ${selected.code.slice(-2)}`;
  } else {
    document.getElementById("card-active-balance").textContent = "0 CFA";
    document.getElementById("card-active-client").textContent = "Aucun Wallet";
    document.getElementById("card-active-phone").textContent = "-- --- -- --";
    document.getElementById("card-active-code").textContent = "****";
  }
}

function fillWalletFormsWithSelected() {
  const selected = state.wallets[state.selectedWalletIndex];
  if (selected) {
    document.getElementById("depot-telephone").value = selected.telephone;
    document.getElementById("retrait-telephone").value = selected.telephone;
  }
}

function renderTransactions() {
  const tbody = document.getElementById("transactions-tbody");
  tbody.innerHTML = "";

  document.getElementById("tx-count-badge").textContent = `${state.transactions.length} Transaction(s)`;

  if (state.transactions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:16px;">Aucune transaction enregistrée.</td></tr>`;
    return;
  }

  state.transactions.forEach((tx, idx) => {
    const client = state.wallets[tx.indexClient] ? state.wallets[tx.indexClient].client : "Client Inconnu";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>#${idx + 1}</td>
      <td>
        <span class="badge ${tx.type === 'depot' ? 'badge-success' : 'badge-info'}">
          ${tx.type === 'depot' ? 'Dépôt' : 'Retrait'}
        </span>
      </td>
      <strong style="color:var(--text-main); font-weight:700;">${tx.montant.toLocaleString('fr-FR')} CFA</strong>
      <td>${tx.frais ? tx.frais + ' CFA' : '-'}</td>
      <td>${client}</td>
      <td style="color:var(--text-dim); font-size:0.8rem;">${tx.date || 'Aujourd\'hui'}</td>
    `;
    tbody.appendChild(tr);
  });
}

// --- Form Event Handlers ---

function setupWalletForms() {
  // Retrait Dynamic Fee Calculation Listener
  const retraitMontantInput = document.getElementById("retrait-montant");
  retraitMontantInput.addEventListener("input", (e) => {
    const val = parseInt(e.target.value) || 0;
    if (val > 0) {
      const frais = calculerFrais(val);
      const total = val + frais;
      document.getElementById("display-retrait-amount").textContent = `${val.toLocaleString('fr-FR')} CFA`;
      document.getElementById("display-retrait-fee").textContent = `${frais.toLocaleString('fr-FR')} CFA`;
      document.getElementById("display-retrait-total").textContent = `${total.toLocaleString('fr-FR')} CFA`;
    } else {
      document.getElementById("display-retrait-amount").textContent = "0 CFA";
      document.getElementById("display-retrait-fee").textContent = "0 CFA";
      document.getElementById("display-retrait-total").textContent = "0 CFA";
    }
  });

  // Handle Dépôt Form Submission
  document.getElementById("form-depot").addEventListener("submit", (e) => {
    e.preventDefault();
    const phone = document.getElementById("depot-telephone").value.trim();
    const montant = parseInt(document.getElementById("depot-montant").value);

    if (montant <= 0) {
      showToast("Montant invalide. Le montant doit être supérieur à 0.", true);
      return;
    }

    const index = trouverWalletIndex(phone);
    if (index === -1) {
      showToast("Wallet introuvable pour ce numéro de téléphone.", true);
      return;
    }

    // Process Dépôt
    state.wallets[index].solde += montant;
    state.transactions.push({
      type: "depot",
      montant: montant,
      frais: 0,
      indexClient: index,
      date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    });

    showToast(`Dépôt de ${montant.toLocaleString('fr-FR')} CFA effectué avec succès pour ${state.wallets[index].client} !`);
    document.getElementById("depot-montant").value = "";

    renderWallets();
    renderTransactions();
  });

  // Handle Retrait Form Submission
  document.getElementById("form-retrait").addEventListener("submit", (e) => {
    e.preventDefault();
    const phone = document.getElementById("retrait-telephone").value.trim();
    const montant = parseInt(document.getElementById("retrait-montant").value);

    if (montant <= 0) {
      showToast("Erreur : le montant doit être positif.", true);
      return;
    }

    const index = trouverWalletIndex(phone);
    if (index === -1) {
      showToast("Erreur : aucun wallet associé à ce numéro.", true);
      return;
    }

    const frais = calculerFrais(montant);
    const totalDebit = montant + frais;

    if (state.wallets[index].solde < totalDebit) {
      showToast(`Solde insuffisant ! Requis: ${totalDebit.toLocaleString('fr-FR')} CFA, Solde: ${state.wallets[index].solde.toLocaleString('fr-FR')} CFA.`, true);
      return;
    }

    // Process Retrait
    state.wallets[index].solde -= totalDebit;
    state.transactions.push({
      type: "retrait",
      montant: montant,
      frais: frais,
      indexClient: index,
      date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    });

    showToast(`Retrait effectué avec succès. Nouveau solde : ${state.wallets[index].solde.toLocaleString('fr-FR')} CFA.`);
    document.getElementById("retrait-montant").value = "";
    document.getElementById("display-retrait-amount").textContent = "0 CFA";
    document.getElementById("display-retrait-fee").textContent = "0 CFA";
    document.getElementById("display-retrait-total").textContent = "0 CFA";

    renderWallets();
    renderTransactions();
  });

  // Create Wallet Modal Form Submission
  document.getElementById("form-create-wallet").addEventListener("submit", (e) => {
    e.preventDefault();
    const client = document.getElementById("create-client").value.trim();
    const phone = document.getElementById("create-telephone").value.trim();
    const code = document.getElementById("create-code").value.trim();
    const solde = parseInt(document.getElementById("create-solde").value) || 0;

    // Validations (Matching validator.php)
    if (!verificationTailleNumero(phone, code)) {
      showToast("Erreur : taille du numéro (9 chiffres) ou du code (4 chiffres) invalide.", true);
      return;
    }

    if (!debutNumero(phone)) {
      showToast("Erreur : le numéro doit commencer par 70, 75, 76, 77 ou 78.", true);
      return;
    }

    if (solde < 0) {
      showToast("Erreur : le solde initial doit être positif ou nul.", true);
      return;
    }

    if (verifiTelephoneExiste(phone)) {
      showToast("Erreur : ce numéro de téléphone existe déjà.", true);
      return;
    }

    if (verifiCodeExiste(code)) {
      showToast("Erreur : ce code secret existe déjà.", true);
      return;
    }

    // Add New Wallet
    const newWallet = { client, telephone: phone, code, solde };
    state.wallets.push(newWallet);
    state.selectedWalletIndex = state.wallets.length - 1;

    showToast(`Wallet créé avec succès pour ${client} !`);
    document.getElementById("form-create-wallet").reset();
    closeModals();

    renderWallets();
    fillWalletFormsWithSelected();
  });
}

// --- Global UI Listeners (Modals, Tabs, Search) ---

function setupUIEventListeners() {
  // Category Filter Tabs
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      const category = e.currentTarget.getAttribute("data-category");
      renderActors(category, document.getElementById("hero-search-input").value);
    });
  });

  // Hero Search Input
  document.getElementById("hero-search-input").addEventListener("input", (e) => {
    const query = e.target.value;
    const activeCat = document.querySelector(".filter-btn.active")?.getAttribute("data-category") || "all";
    renderActors(activeCat, query);
  });

  // Hero Region Select Filter
  document.getElementById("hero-region-select").addEventListener("change", (e) => {
    const region = e.target.value;
    const activeCat = document.querySelector(".filter-btn.active")?.getAttribute("data-category") || "all";
    if (region === "all") {
      renderActors(activeCat, document.getElementById("hero-search-input").value);
    } else {
      renderActors(activeCat, region);
    }
  });

  // Wallet Tabs (Dépôt / Retrait)
  document.querySelectorAll(".wallet-tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".wallet-tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

      e.currentTarget.classList.add("active");
      const tabId = e.currentTarget.getAttribute("data-tab");
      document.getElementById(`tab-${tabId}`).classList.add("active");
    });
  });

  // Open Create Wallet Modal
  document.getElementById("btn-open-wallet-modal").addEventListener("click", () => {
    document.getElementById("modal-create-wallet").classList.add("active");
  });

  // Close Modals
  document.querySelectorAll(".btn-close-modal, .modal-overlay").forEach(el => {
    el.addEventListener("click", closeModals);
  });

  // Contact Form
  document.getElementById("form-contact").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Votre message a été envoyé à l'équipe Teranga Pass !");
    e.target.reset();
  });

  // Refresh Wallets Button
  document.getElementById("btn-refresh-wallets").addEventListener("click", () => {
    renderWallets();
    showToast("Liste des wallets rafraîchie.");
  });
}

function closeModals() {
  document.querySelectorAll(".modal").forEach(m => m.classList.remove("active"));
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  renderActors();
  renderWallets();
  renderTransactions();
  fillWalletFormsWithSelected();
  setupWalletForms();
  setupUIEventListeners();
});
