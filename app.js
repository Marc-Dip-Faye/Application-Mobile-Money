/* ==========================================
   TERANGA TOURISM & WALLET — JAVASCRIPT APPLICATION
   Interactive Actors Directory + Senegal Tourism Wallet Logic
   ========================================== */

// 1. Initial Data - Senegal Tourism Actors
const ACTEURS_DATA = [
  {
    id: 1,
    nom: "King Fahd Palace Hotel",
    category: "hotel",
    categoryLabel: "Hôtel 5 Etoiles",
    region: "Dakar",
    location: "Pointe des Almadies, Dakar",
    description: "Complexe hôtelier mythique en bord de mer aux Almadies. Chambres luxueuses, terrains de golf, piscine olympique et salles de congrès international.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 320,
    prix: "135 000 CFA",
    prixSub: "/ nuitée",
    phone: "+221 33 869 69 69",
    services: ["Piscine Olympique", "Golf 9 trous", "Spa & Wellness", "Restaurants Gastronomiques"]
  },
  {
    id: 2,
    nom: "Lamantin Beach Resort & Spa",
    category: "hotel",
    categoryLabel: "Resort 5 Etoiles",
    region: "Thiès / Saly",
    location: "Saly Portudal, Mbour",
    description: "Écrin d'élégance africaine sur la Petite Côte. Spa de balnéothérapie de 750m², cuisine raffinée, marina privée et plage de sable fin.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 412,
    prix: "110 000 CFA",
    prixSub: "/ nuitée",
    phone: "+221 33 957 07 77",
    services: ["Balnéothérapie", "Sports Nautiques", "Kids Club", "Soirées Musique Live"]
  },
  {
    id: 3,
    nom: "Hôtel de la Poste",
    category: "hotel",
    categoryLabel: "Hôtel Historique",
    region: "Saint-Louis",
    location: "Île de Saint-Louis",
    description: "Hôtel légendaire au cœur de Saint-Louis où logeaient Jean Mermoz et les pilotes de l'Aéropostale. Charme colonial unique face au pont Faidherbe.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 188,
    prix: "65 000 CFA",
    prixSub: "/ nuitée",
    phone: "+221 33 961 11 18",
    services: ["Musée Aéropostale", "Vue sur le Pont", "Excursions en Calèche"]
  },
  {
    id: 4,
    nom: "Teranga Safaris & Ecotours",
    category: "agence",
    categoryLabel: "Agence de Voyage",
    region: "Thiès / Saly",
    location: "Réserve de Bandia / Saly",
    description: "Agence agréée spécialisée dans les safaris à la Réserve de Bandia, les excursions au Lac Rose et les aventures éco-responsables dans le Siné Saloum.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 245,
    prix: "35 000 CFA",
    prixSub: "/ personne",
    phone: "+221 77 638 90 90",
    services: ["Guide Certifié", "Véhicule 4x4", "Déjeuner Inclus", "Transfert Aéroport"]
  },
  {
    id: 5,
    nom: "Le Lagon 1 Gastronomie",
    category: "restaurant",
    categoryLabel: "Restaurant Gastronomique",
    region: "Dakar",
    location: "Plateau, Dakar",
    description: "Restaurant mythique suspendu au-dessus de l'Océan Atlantique face à l'Île de Gorée. Spécialités de poissons frais, fruits de mer et Thiéboudienne royale.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 290,
    prix: "22 000 CFA",
    prixSub: "/ menu moyen",
    phone: "+221 33 821 53 22",
    services: ["Terrasse Panoramique", "Carte des Vins", "Voiturier", "Réservation Pass Wallet"]
  },
  {
    id: 6,
    nom: "Chez Loutcha Teranga",
    category: "restaurant",
    categoryLabel: "Cuisine Locale & Capverdienne",
    region: "Dakar",
    location: "Centre-Ville Plateau, Dakar",
    description: "Adresse incontournable pour déguster un vrai Yassa au Poulet, Mafé, Suppu Kandja ou Catchupa dans une ambiance conviviale sénégalaise.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviews: 512,
    prix: "8 000 CFA",
    prixSub: "/ plat & boisson",
    phone: "+221 33 821 03 02",
    services: ["Cuisine Authentique", "Service Rapide", "Plats à emporter"]
  },
  {
    id: 7,
    nom: "Ousseynou Diop — Guide National Gorée & Dakar",
    category: "guide",
    categoryLabel: "Guide Touristique Certifié",
    region: "Dakar",
    location: "Île de Gorée / Dakar",
    description: "Guide conférencier officiel du Ministère du Tourisme. Expert passionné de la Maison des Esclaves, du Musée des Civilisations Noires et du Monument de la Renaissance.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviews: 180,
    prix: "20 000 CFA",
    prixSub: "/ demi-journée",
    phone: "+221 77 552 14 36",
    services: ["Visite Historique", "Multilingue (Fr/En/Es/Wolof)", "Circuit Gorée"]
  },
  {
    id: 8,
    nom: "Mamadou Sow — Eco-Guide Sine Saloum",
    category: "guide",
    categoryLabel: "Guide Ecotourisme",
    region: "Sine Saloum",
    location: "Ndangane / Toubacouta",
    description: "Originaire du Sine Saloum, Mamadou vous emmène en pirogue à la découverte des bolongs, des colonies de flamants roses et des îlots de coquillages de Joal-Fadiouth.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 94,
    prix: "25 000 CFA",
    prixSub: "/ journée",
    phone: "+221 76 112 88 44",
    services: ["Circuits en Pirogue", "Observation Oiseaux", "Rencontre Villageoise"]
  },
  {
    id: 9,
    nom: "Village Artisanal de Soumbédioune",
    category: "artisanat",
    categoryLabel: "Art & Artisanat Traditionnel",
    region: "Dakar",
    location: "Corniche Ouest, Dakar",
    description: "Le centre névralgique de la création artisanale dakaroise : sculpteurs sur bois, maroquiniers, bijoutiers en argent touareg, peintres sous verre (Suwer) et tisserands.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 310,
    prix: "Libre accès",
    prixSub: "Prix négociables",
    phone: "+221 33 822 41 00",
    services: ["Achat Direct Artisans", "Paiement Pass Wallet Accepté", "Ateliers Démo"]
  },
  {
    id: 10,
    nom: "Espace Culturel & Tissage de Saint-Louis",
    category: "artisanat",
    categoryLabel: "Textile & Art Contemporain",
    region: "Saint-Louis",
    location: "Quartier Nord, Saint-Louis",
    description: "Atelier-galerie dédié à la préservation des pagnes tissés traditionnels (Rabal) et expositions de jeunes artistes contemporains de la Biennale de Dakar.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 76,
    prix: "Créations à partir de 5 000 CFA",
    prixSub: "",
    phone: "+221 78 430 22 11",
    services: ["Expositions Art", "Sur Mesure", "Livraison Internationale"]
  },
  {
    id: 11,
    nom: "Senegal Express Airport & Intercity Express",
    category: "transport",
    categoryLabel: "Transport VIP & Navette AIBD",
    region: "Dakar",
    location: "Aéroport AIBD / Dakar / Saly",
    description: "Services de navettes privées climatisées et VIP entre l'Aéroport International Blaise Diagne (AIBD), Dakar centre et les stations balnéaires de Saly et Cap Skirring.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 520,
    prix: "25 000 CFA",
    prixSub: "/ trajet AIBD-Dakar",
    phone: "+221 70 888 99 00",
    services: ["Chauffeur Professionnel", "Wifi à bord", "Disponible 24h/7", "Paiement Wallet"]
  },
  {
    id: 12,
    nom: "Cap Skirring Ocean Lodge",
    category: "hotel",
    categoryLabel: "Ecolodge de Charme",
    region: "Casamance / Ziguinchor",
    location: "Cap Skirring, Casamance",
    description: "Bungalows éco-conçus nichés au milieu de la cocoteraie bordant la plus belle plage de sable fin de Casamance. Calme absolu, sérénité et dépaysement garanti.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 165,
    prix: "85 000 CFA",
    prixSub: "/ nuitée",
    phone: "+221 33 993 51 00",
    services: ["Plage Privée", "Pêche au Gros", "Pirogue Mangrove", "Cuisine Bio"]
  }
];

// 2. State Storage for Tourism Wallet (Porting logic from PHP)
let walletsState = [
  {
    client: "Aminata Diallo",
    telephone: "771234567",
    code: "1234",
    solde: 150000
  },
  {
    client: "Jean-Pierre Martin",
    telephone: "789012345",
    code: "4321",
    solde: 85000
  }
];

let transactionsState = [
  {
    type: "depot",
    montant: 150000,
    frais: 0,
    indexClient: 0,
    date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  },
  {
    type: "retrait",
    montant: 20000,
    frais: 200,
    indexClient: 0,
    date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  }
];

let activeWalletIndex = 0; // Selected wallet index

// 3. Helper Business Logic (PHP parity)
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

function verificationTailleNumeroJS(telephone, code) {
  return telephone.length === 9 && code.length === 4;
}

function debutNumeroJS(telephone) {
  const prefixValide = ['70', '75', '76', '77', '78'];
  const prefix = telephone.substring(0, 2);
  return prefixValide.includes(prefix);
}

function trouverWalletIndexJS(telephone) {
  return walletsState.findIndex(w => w.telephone === telephone);
}

function verifiTelephoneExisteJS(telephone) {
  return walletsState.some(w => w.telephone === telephone);
}

function verifiCodeExisteJS(code) {
  return walletsState.some(w => w.code === code);
}

// 4. UI Rendering Functions

// Render Acteurs List
function renderActeurs(filterCat = 'all', filterRegion = 'all', searchQuery = '') {
  const grid = document.getElementById('acteursGrid');
  if (!grid) return;

  const filtered = ACTEURS_DATA.filter(item => {
    const matchCat = filterCat === 'all' || item.category === filterCat;
    const matchRegion = filterRegion === 'all' || item.region === filterRegion;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      item.nom.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q);

    return matchCat && matchRegion && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem;" class="text-light">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; color: var(--neon-green); margin-bottom: 1rem;"></i>
        <h3>Aucun acteur touristique trouvé</h3>
        <p>Essayez de modifier votre recherche ou les filtres sélectionnés.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(acteur => `
    <article class="acteur-card">
      <div class="acteur-img-wrapper">
        <img src="${acteur.image}" alt="${acteur.nom}" class="acteur-img" loading="lazy">
        <span class="category-tag"><i class="fa-solid fa-tag"></i> ${acteur.categoryLabel}</span>
        <span class="rating-badge"><i class="fa-solid fa-star"></i> ${acteur.rating} (${acteur.reviews})</span>
      </div>
      <div class="acteur-body">
        <div class="acteur-header">
          <h3 class="acteur-title">${acteur.nom}</h3>
        </div>
        <div class="region-tag"><i class="fa-solid fa-location-dot"></i> ${acteur.location}</div>
        <p class="acteur-description">${acteur.description}</p>
        <div class="acteur-footer">
          <div class="acteur-price">
            <span class="price-val">${acteur.prix}</span>
            <span class="price-sub">${acteur.prixSub}</span>
          </div>
          <button class="btn btn-neon" onclick="openActeurModal(${acteur.id})">
            <i class="fa-solid fa-eye"></i> Dtails
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Render Wallet Visual Display
function updateWalletCardDisplay() {
  const displaySolde = document.getElementById('displaySolde');
  const displayClient = document.getElementById('displayClient');
  const displayTelephone = document.getElementById('displayTelephone');
  const activeBadge = document.getElementById('activeWalletCountBadge');

  if (activeBadge) {
    activeBadge.textContent = `${walletsState.length} Wallet${walletsState.length > 1 ? 's' : ''} actif${walletsState.length > 1 ? 's' : ''}`;
  }

  if (walletsState.length === 0 || activeWalletIndex < 0 || !walletsState[activeWalletIndex]) {
    if (displaySolde) displaySolde.textContent = "0 CFA";
    if (displayClient) displayClient.textContent = "Aucun wallet actif";
    if (displayTelephone) displayTelephone.textContent = "-- -- -- ---";
    return;
  }

  const curr = walletsState[activeWalletIndex];
  if (displaySolde) displaySolde.textContent = `${curr.solde.toLocaleString('fr-FR')} CFA`;
  if (displayClient) displayClient.textContent = curr.client;
  if (displayTelephone) displayTelephone.textContent = curr.telephone;
}

// Render Transactions Table
function renderTransactions() {
  const tbody = document.getElementById('transactionsTbody');
  if (!tbody) return;

  if (transactionsState.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-msg">Aucune transaction enregistrée.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = transactionsState.map((tx, idx) => {
    const clientObj = walletsState[tx.indexClient];
    const clientName = clientObj ? clientObj.client : "Client Inconnu";
    const clientTel = clientObj ? clientObj.telephone : "N/A";

    const badgeClass = tx.type === 'retrait' ? 'type-retrait' : 'type-depot';
    const typeLabel = tx.type === 'retrait' ? 'Retrait' : 'Dépôt';

    return `
      <tr>
        <td>#${idx + 1}</td>
        <td><span class="type-badge ${badgeClass}">${typeLabel}</span></td>
        <td><strong>${clientName}</strong><br><small style="color: var(--text-muted);">${clientTel}</small></td>
        <td><strong>${tx.montant.toLocaleString('fr-FR')} CFA</strong></td>
        <td>${tx.frais !== undefined ? tx.frais.toLocaleString('fr-FR') + ' CFA' : '-'}</td>
      </tr>
    `;
  }).join('');
}

// 5. Toast Notifications
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-neon' : 'fa-circle-exclamation text-red'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// 6. Acteur Modal Logic
function openActeurModal(id) {
  const acteur = ACTEURS_DATA.find(a => a.id === id);
  if (!acteur) return;

  const modal = document.getElementById('acteurModal');
  const body = document.getElementById('acteurModalBody');

  body.innerHTML = `
    <img src="${acteur.image}" alt="${acteur.nom}" class="modal-hero-img">
    <div class="modal-body-padding">
      <span class="category-tag" style="position:static; display:inline-block; margin-bottom:0.75rem;">
        <i class="fa-solid fa-tag"></i> ${acteur.categoryLabel}
      </span>
      <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 0.5rem;">${acteur.nom}</h2>
      <div class="region-tag" style="margin-bottom: 1rem;">
        <i class="fa-solid fa-location-dot"></i> ${acteur.location} — ${acteur.region}
      </div>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6;">${acteur.description}</p>

      <div style="background: rgba(15, 23, 42, 0.6); padding: 1rem; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: var(--neon-green);">
          <i class="fa-solid fa-list-check"></i> Services & Équipements
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${acteur.services.map(s => `<span class="badge-teranga" style="background: rgba(0,255,136,0.15); color: var(--neon-green); border:1px solid rgba(0,255,136,0.3);"><i class="fa-solid fa-check"></i> ${s}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1rem;">
        <div>
          <span style="font-size: 0.75rem; color: var(--text-muted); display:block;">Tarif indicatif</span>
          <span style="font-size: 1.3rem; font-weight: 800; color: var(--neon-green);">${acteur.prix}</span>
        </div>
        <a href="tel:${acteur.phone.replace(/\s+/g, '')}" class="btn btn-neon">
          <i class="fa-solid fa-phone"></i> Contacter (${acteur.phone})
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeActeurModal() {
  const modal = document.getElementById('acteurModal');
  if (modal) modal.classList.remove('active');
}

// Helper to switch to wallet tab programmatically
function openWalletModal(tab = 'create') {
  const walletSection = document.getElementById('wallet');
  if (walletSection) {
    walletSection.scrollIntoView({ behavior: 'smooth' });
  }

  const tabBtns = document.querySelectorAll('.wallet-tab-btn');
  const forms = document.querySelectorAll('.wallet-form');

  let targetTabId = 'tab-creer';
  if (tab === 'depot') targetTabId = 'tab-depot';
  if (tab === 'retrait') targetTabId = 'tab-retrait';
  if (tab === 'liste') targetTabId = 'tab-liste';

  tabBtns.forEach(btn => {
    if (btn.getAttribute('data-tab') === targetTabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  forms.forEach(form => {
    if (form.id === targetTabId || (targetTabId === 'tab-creer' && form.id === 'formCreerWallet') || (targetTabId === 'tab-depot' && form.id === 'formDepot') || (targetTabId === 'tab-retrait' && form.id === 'formRetrait') || (targetTabId === 'tab-liste' && form.id === 'tabListe')) {
      form.classList.add('active-form');
    } else {
      form.classList.remove('active-form');
    }
  });
}

// 7. Event Listeners Initialization
document.addEventListener('DOMContentLoaded', () => {

  // Initialize UI components
  renderActeurs();
  updateWalletCardDisplay();
  renderTransactions();

  // Filter Event Listeners
  const categoryBtns = document.querySelectorAll('.category-btn');
  const regionSelect = document.getElementById('regionSelect');
  const searchInput = document.getElementById('searchInput');

  let currentCategory = 'all';
  let currentRegion = 'all';
  let currentSearch = '';

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderActeurs(currentCategory, currentRegion, currentSearch);
    });
  });

  if (regionSelect) {
    regionSelect.addEventListener('change', (e) => {
      currentRegion = e.target.value;
      renderActeurs(currentCategory, currentRegion, currentSearch);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderActeurs(currentCategory, currentRegion, currentSearch);
    });
  }

  // Wallet Tab Switchers
  const walletTabBtns = document.querySelectorAll('.wallet-tab-btn');
  walletTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      walletTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      document.querySelectorAll('.wallet-form').forEach(f => f.classList.remove('active-form'));

      if (targetTab === 'tab-creer') document.getElementById('formCreerWallet').classList.add('active-form');
      if (targetTab === 'tab-depot') document.getElementById('formDepot').classList.add('active-form');
      if (targetTab === 'tab-retrait') document.getElementById('formRetrait').classList.add('active-form');
      if (targetTab === 'tab-liste') document.getElementById('tabListe').classList.add('active-form');
    });
  });

  // Calculate live fee on Retrait input change
  const retraitMontantInput = document.getElementById('retraitMontant');
  const retraitFraisInput = document.getElementById('retraitFraisEstimes');

  if (retraitMontantInput && retraitFraisInput) {
    retraitMontantInput.addEventListener('input', () => {
      const montant = parseInt(retraitMontantInput.value, 10);
      if (isNaN(montant) || montant <= 0) {
        retraitFraisInput.value = '0 CFA';
      } else {
        const frais = calculerFraisJS(montant);
        retraitFraisInput.value = `${frais.toLocaleString('fr-FR')} CFA`;
      }
    });
  }

  // Form 1: Créer Wallet Handler
  const formCreer = document.getElementById('formCreerWallet');
  if (formCreer) {
    formCreer.addEventListener('submit', (e) => {
      e.preventDefault();
      const nom = document.getElementById('createNom').value.trim();
      const tel = document.getElementById('createTel').value.trim();
      const code = document.getElementById('createCode').value.trim();
      const solde = parseInt(document.getElementById('createSolde').value, 10);

      if (!verificationTailleNumeroJS(tel, code)) {
        showToast("Erreur : Le téléphone doit comporter 9 chiffres et le code 4 chiffres.", 'error');
        return;
      }

      if (!debutNumeroJS(tel)) {
        showToast("Erreur : Le numéro doit commencer par 70, 75, 76, 77 ou 78.", 'error');
        return;
      }

      if (isNaN(solde) || solde < 0) {
        showToast("Erreur : Le solde initial doit être positif ou nul.", 'error');
        return;
      }

      if (verifiTelephoneExisteJS(tel)) {
        showToast("Erreur : Ce numéro de téléphone existe déjà.", 'error');
        return;
      }

      if (verifiCodeExisteJS(code)) {
        showToast("Erreur : Ce code secret existe déjà.", 'error');
        return;
      }

      const newWallet = { client: nom, telephone: tel, code: code, solde: solde };
      walletsState.push(newWallet);
      activeWalletIndex = walletsState.length - 1;

      updateWalletCardDisplay();
      showToast(`Wallet créé avec succès pour ${nom} !`);
      formCreer.reset();
    });
  }

  // Form 2: Dépôt Handler
  const formDepot = document.getElementById('formDepot');
  if (formDepot) {
    formDepot.addEventListener('submit', (e) => {
      e.preventDefault();
      const tel = document.getElementById('depotTel').value.trim();
      const montant = parseInt(document.getElementById('depotMontant').value, 10);

      if (isNaN(montant) || montant <= 0) {
        showToast("Erreur : Montant invalide.", 'error');
        return;
      }

      const index = trouverWalletIndexJS(tel);
      if (index === -1) {
        showToast("Erreur : Wallet introuvable pour ce numéro.", 'error');
        return;
      }

      walletsState[index].solde += montant;
      activeWalletIndex = index;

      transactionsState.unshift({
        type: "depot",
        montant: montant,
        frais: 0,
        indexClient: index,
        date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      });

      updateWalletCardDisplay();
      renderTransactions();
      showToast(`Dépôt de ${montant.toLocaleString('fr-FR')} CFA effectué avec succès !`);
      formDepot.reset();
    });
  }

  // Form 3: Retrait Handler
  const formRetrait = document.getElementById('formRetrait');
  if (formRetrait) {
    formRetrait.addEventListener('submit', (e) => {
      e.preventDefault();
      const tel = document.getElementById('retraitTel').value.trim();
      const montant = parseInt(document.getElementById('retraitMontant').value, 10);

      if (isNaN(montant) || montant <= 0) {
        showToast("Erreur : Le montant doit être positif.", 'error');
        return;
      }

      const index = trouverWalletIndexJS(tel);
      if (index === -1) {
        showToast("Erreur : Aucun wallet associé à ce numéro.", 'error');
        return;
      }

      const frais = calculerFraisJS(montant);
      const totalDebit = montant + frais;

      if (walletsState[index].solde < totalDebit) {
        showToast(`Solde insuffisant ! Requis: ${totalDebit.toLocaleString('fr-FR')} CFA (dont ${frais} CFA de frais).`, 'error');
        return;
      }

      walletsState[index].solde -= totalDebit;
      activeWalletIndex = index;

      transactionsState.unshift({
        type: 'retrait',
        montant: montant,
        frais: frais,
        indexClient: index,
        date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      });

      updateWalletCardDisplay();
      renderTransactions();
      showToast(`Retrait de ${montant.toLocaleString('fr-FR')} CFA réussi (Frais: ${frais} CFA) !`);
      formRetrait.reset();
      if (retraitFraisInput) retraitFraisInput.value = '0 CFA';
    });
  }

  // Close modal when clicking outside content
  const modalOverlay = document.getElementById('acteurModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeActeurModal();
      }
    });
  }

});
