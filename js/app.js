/**
 * Teranga Tourism & Wallet Sénégal - Application JavaScript Core
 */

document.addEventListener('DOMContentLoaded', () => {

    // Initial Mock Senegal Tourism Actors
    const INITIAL_ACTORS = [
        {
            id: 'act-1',
            nom: 'Hôtel Teranga & Spa Dakar',
            category: 'hotel',
            location: 'Dakar (Plateau)',
            telephone: '776543210',
            description: 'Hôtel de luxe face à l\'Océan Atlantique, offrant des suites raffinées et un centre de bien-être d\'exception.',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
            rating: '4.9 ★'
        },
        {
            id: 'act-2',
            nom: 'Ecolodge de Saly Beach',
            category: 'hotel',
            location: 'Saly Portudal',
            telephone: '781234567',
            description: 'Bungalows éco-responsables nichés entre cocotiers et plage de sable fin pour une détente absolue.',
            image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
            rating: '4.8 ★'
        },
        {
            id: 'act-3',
            nom: 'Sahel Excursions & Safari',
            category: 'agence',
            location: 'Saint-Louis & Bandia',
            telephone: '708889900',
            description: 'Circuits guidés sur-mesure : safari Réserve de Bandia, Île de Gorée, Djoudj et désert de Lompoul.',
            image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80',
            rating: '4.9 ★'
        },
        {
            id: 'act-4',
            nom: 'Teranga Express Transport',
            category: 'transport',
            location: 'AIBD - Dakar - Mbour',
            telephone: '755554433',
            description: 'Navettes climatisées privées et VIP avec chauffeurs bilingues depuis et vers l\'Aéroport AIBD.',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
            rating: '4.7 ★'
        },
        {
            id: 'act-5',
            nom: 'Village Artisanal & Galerie Soumbédioune',
            category: 'artisanat',
            location: 'Dakar (Soumbédioune)',
            telephone: '763332211',
            description: 'Espace d\'exposition et d\'artisanat sénégalais : sculptures sur bois, toiles, bijoux et tissus traditionnels.',
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
            rating: '4.8 ★'
        },
        {
            id: 'act-6',
            nom: 'Restaurant Le Lagon 1',
            category: 'artisanat',
            location: 'Dakar Corniche',
            telephone: '774441122',
            description: 'Gastronomie sénégalaise et fruits de mer sur pilotis surplombant l\'Île de Gorée.',
            image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
            rating: '4.9 ★'
        }
    ];

    // Initial Mock Wallets
    const INITIAL_WALLETS = [
        { client: 'Hôtel Teranga Dakar', telephone: '776543210', code: '1000', solde: 350000 },
        { client: 'Awa Ndiaye (Guide)', telephone: '781234567', code: '2025', solde: 85000 },
        { client: 'Moussa Diallo (Touriste)', telephone: '708889900', code: '4321', solde: 120000 }
    ];

    // Initial Mock Transactions
    const INITIAL_TRANSACTIONS = [
        { type: 'depot', montant: 100000, frais: 0, telephone: '776543210', client: 'Hôtel Teranga Dakar', status: 'Succès', timestamp: new Date().toLocaleTimeString('fr-FR') },
        { type: 'retrait', montant: 25000, frais: 200, telephone: '781234567', client: 'Awa Ndiaye (Guide)', status: 'Succès', timestamp: new Date().toLocaleTimeString('fr-FR') }
    ];

    // State initialization with localStorage fallback
    let wallets = JSON.parse(localStorage.getItem('teranga_wallets')) || INITIAL_WALLETS;
    let transactions = JSON.parse(localStorage.getItem('teranga_transactions')) || INITIAL_TRANSACTIONS;
    let selectedWalletIndex = wallets.length > 0 ? 0 : -1;
    let currentTransactionFilter = 'all';

    // Business Logic Functions (Ported from PHP)

    /**
     * Validates telephone length (9 digits) and PIN code (4 digits)
     */
    function verificationTailleNumero(telephone, code) {
        return String(telephone).trim().length === 9 && String(code).trim().length === 4;
    }

    /**
     * Validates Senegal phone prefix (70, 75, 76, 77, 78)
     */
    function debutNumero(telephone) {
        const prefixValide = ['70', '75', '76', '77', '78'];
        const prefix = String(telephone).substring(0, 2);
        return prefixValide.includes(prefix);
    }

    /**
     * Validates positive amount (> 0)
     */
    function montantValide(montant) {
        return Number(montant) > 0;
    }

    /**
     * Validates initial balance (>= 0)
     */
    function soldeInitialValide(solde) {
        return Number(solde) >= 0;
    }

    /**
     * Checks if telephone already exists
     */
    function verifiTelephoneExiste(telephone) {
        return wallets.some(w => String(w.telephone) === String(telephone).trim());
    }

    /**
     * Checks if code already exists
     */
    function verifiCodeExiste(code) {
        return wallets.some(w => String(w.code) === String(code).trim());
    }

    /**
     * Finds wallet index by phone number
     */
    function trouverWalletIndex(telephone) {
        return wallets.findIndex(w => String(w.telephone) === String(telephone).trim());
    }

    /**
     * Calculates transaction fee based on amount rules
     * <= 10000 -> 200 CFA
     * <= 100000 -> 500 CFA
     * > 100000 -> 1% capped at 5000 CFA
     */
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

    // Storage Saver
    function saveState() {
        localStorage.setItem('teranga_wallets', JSON.stringify(wallets));
        localStorage.setItem('teranga_transactions', JSON.stringify(transactions));
    }

    // UI Toast Notification
    function showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icon = type === 'success' ? 'fa-check-circle text-emerald' : 'fa-triangle-exclamation text-danger';
        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // Render Tourism Actors Grid
    function renderActors(filterCategory = 'all', searchQuery = '') {
        const grid = document.getElementById('actorsGrid');
        if (!grid) return;

        let filtered = INITIAL_ACTORS;

        if (filterCategory !== 'all') {
            filtered = filtered.filter(a => a.category === filterCategory);
        }

        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(a =>
                a.nom.toLowerCase().includes(q) ||
                a.location.toLowerCase().includes(q) ||
                a.description.toLowerCase().includes(q)
            );
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                    <i class="fa-solid fa-compass" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
                    <p>Aucun acteur touristique ne correspond à votre recherche.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(actor => `
            <div class="actor-card">
                <div class="card-image-wrap" style="background-image: url('${actor.image}');">
                    <span class="card-badge">${actor.category}</span>
                    <span class="card-location"><i class="fa-solid fa-location-dot"></i> ${actor.location}</span>
                </div>
                <div class="actor-body">
                    <h3 class="actor-title">${actor.nom}</h3>
                    <p class="actor-desc">${actor.description}</p>
                    <div class="actor-meta">
                        <span class="actor-phone"><i class="fa-solid fa-phone"></i> +221 ${actor.telephone}</span>
                        <span class="actor-rating"><i class="fa-solid fa-star text-gold"></i> ${actor.rating}</span>
                    </div>
                </div>
            </div>
        `).map(item => item).join('');
    }

    // Render Active Wallet Selector and Digital Card
    function updateWalletUI() {
        const select = document.getElementById('activeWalletSelect');
        const holderText = document.getElementById('cardHolderName');
        const balanceText = document.getElementById('cardBalanceCfa');
        const statWallets = document.getElementById('statWalletsCount');
        const statVolume = document.getElementById('statVolumeCFA');

        // Update Wallet Count
        if (statWallets) statWallets.textContent = wallets.length;

        // Update Total Volume
        const totalVolume = transactions.reduce((acc, curr) => acc + curr.montant, 0);
        if (statVolume) statVolume.textContent = totalVolume.toLocaleString('fr-FR') + ' CFA';

        // Update Selector
        if (select) {
            select.innerHTML = '<option value="">-- Sélectionner un Wallet --</option>' +
                wallets.map((w, idx) => `
                    <option value="${idx}" ${idx === selectedWalletIndex ? 'selected' : ''}>
                        ${w.client} (+221 ${w.telephone}) - ${w.solde.toLocaleString('fr-FR')} CFA
                    </option>
                `).join('');
        }

        // Update Card Display
        if (selectedWalletIndex >= 0 && wallets[selectedWalletIndex]) {
            const w = wallets[selectedWalletIndex];
            if (holderText) holderText.textContent = w.client;
            if (balanceText) balanceText.textContent = w.solde.toLocaleString('fr-FR') + ' CFA';
        } else {
            if (holderText) holderText.textContent = 'Sélectionner un compte';
            if (balanceText) balanceText.textContent = '0 CFA';
        }
    }

    // Render Transactions History Table
    function renderTransactions() {
        const tbody = document.getElementById('transactionsTableBody');
        if (!tbody) return;

        let filtered = transactions;
        if (currentTransactionFilter !== 'all') {
            filtered = transactions.filter(t => t.type === currentTransactionFilter);
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                        <i class="fa-solid fa-receipt" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
                        Aucune transaction enregistrée.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map((t, idx) => `
            <tr>
                <td><strong>#${idx + 1}</strong></td>
                <td>
                    <span class="badge-type ${t.type}">
                        <i class="fa-solid ${t.type === 'depot' ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
                        ${t.type === 'depot' ? 'Dépôt' : 'Retrait'}
                    </span>
                </td>
                <td><strong>${t.client || 'Client N°' + t.telephone}</strong></td>
                <td>+221 ${t.telephone}</td>
                <td><strong class="${t.type === 'depot' ? 'text-emerald' : 'text-amber'}">${t.montant.toLocaleString('fr-FR')} CFA</strong></td>
                <td>${t.frais ? t.frais.toLocaleString('fr-FR') + ' CFA' : '0 CFA'}</td>
                <td><span style="color: var(--emerald); font-weight: 600;"><i class="fa-solid fa-circle-check"></i> ${t.status || 'Succès'}</span></td>
            </tr>
        `).join('');
    }

    // Live Fee Preview Calculation for Withdrawal
    function updateRetraitFeePreview() {
        const montantInput = document.getElementById('retraitMontant');
        const feeRetraitElem = document.getElementById('feeMontantRetrait');
        const feeCalculeElem = document.getElementById('feeCalcule');
        const feeTotalElem = document.getElementById('feeTotalDebit');

        if (!montantInput) return;

        const montant = Number(montantInput.value) || 0;
        if (montant > 0) {
            const frais = calculerFrais(montant);
            const total = montant + frais;

            if (feeRetraitElem) feeRetraitElem.textContent = montant.toLocaleString('fr-FR') + ' CFA';
            if (feeCalculeElem) feeCalculeElem.textContent = frais.toLocaleString('fr-FR') + ' CFA';
            if (feeTotalElem) feeTotalElem.textContent = total.toLocaleString('fr-FR') + ' CFA';
        } else {
            if (feeRetraitElem) feeRetraitElem.textContent = '0 CFA';
            if (feeCalculeElem) feeCalculeElem.textContent = '0 CFA';
            if (feeTotalElem) feeTotalElem.textContent = '0 CFA';
        }
    }

    // Form Event Handlers

    // 1. Form Créer Wallet
    const formCreateWallet = document.getElementById('formCreateWallet');
    if (formCreateWallet) {
        formCreateWallet.addEventListener('submit', (e) => {
            e.preventDefault();

            const nom = document.getElementById('clientNom').value.trim();
            const tel = document.getElementById('clientTel').value.trim();
            const code = document.getElementById('clientCode').value.trim();
            const solde = Number(document.getElementById('clientSolde').value);

            // Validations matching controller.php logic
            if (!verificationTailleNumero(tel, code)) {
                showToast('Erreur : La taille du numéro doit être de 9 chiffres et le code de 4 chiffres.', 'error');
                return;
            }

            if (!debutNumero(tel)) {
                showToast('Erreur : Le numéro doit commencer par 70, 75, 76, 77 ou 78.', 'error');
                return;
            }

            if (!soldeInitialValide(solde)) {
                showToast('Erreur : Le solde initial doit être positif ou nul.', 'error');
                return;
            }

            if (verifiTelephoneExiste(tel)) {
                showToast('Erreur : Ce numéro de téléphone possède déjà un Wallet.', 'error');
                return;
            }

            if (verifiCodeExiste(code)) {
                showToast('Erreur : Ce code secret existe déjà. Choisissez-en un autre.', 'error');
                return;
            }

            // Create Wallet
            const newWallet = { client: nom, telephone: tel, code: code, solde: solde };
            wallets.push(newWallet);
            selectedWalletIndex = wallets.length - 1;

            saveState();
            updateWalletUI();
            formCreateWallet.reset();
            showToast(`Wallet créé avec succès pour ${nom} !`);
        });
    }

    // 2. Form Dépôt
    const formDepot = document.getElementById('formDepot');
    if (formDepot) {
        formDepot.addEventListener('submit', (e) => {
            e.preventDefault();

            const tel = document.getElementById('depotTel').value.trim();
            const montant = Number(document.getElementById('depotMontant').value);

            if (!montantValide(montant)) {
                showToast('Erreur : Le montant du dépôt doit être supérieur à 0.', 'error');
                return;
            }

            const idx = trouverWalletIndex(tel);
            if (idx === -1) {
                showToast('Erreur : Aucun wallet trouvé associé à ce numéro de téléphone.', 'error');
                return;
            }

            // Perform Deposit
            wallets[idx].solde += montant;

            // Log Transaction
            transactions.unshift({
                type: 'depot',
                montant: montant,
                frais: 0,
                telephone: tel,
                client: wallets[idx].client,
                status: 'Succès',
                timestamp: new Date().toLocaleTimeString('fr-FR')
            });

            saveState();
            updateWalletUI();
            renderTransactions();
            formDepot.reset();

            showToast(`Dépôt de ${montant.toLocaleString('fr-FR')} CFA effectué avec succès sur le compte de ${wallets[idx].client} !`);
        });
    }

    // 3. Form Retrait
    const formRetrait = document.getElementById('formRetrait');
    if (formRetrait) {
        const retraitMontantInput = document.getElementById('retraitMontant');
        if (retraitMontantInput) {
            retraitMontantInput.addEventListener('input', updateRetraitFeePreview);
        }

        formRetrait.addEventListener('submit', (e) => {
            e.preventDefault();

            const tel = document.getElementById('retraitTel').value.trim();
            const montant = Number(document.getElementById('retraitMontant').value);

            if (!montantValide(montant)) {
                showToast('Erreur : Le montant du retrait doit être positif.', 'error');
                return;
            }

            const idx = trouverWalletIndex(tel);
            if (idx === -1) {
                showToast('Erreur : Aucun wallet associé à ce numéro.', 'error');
                return;
            }

            const frais = calculerFrais(montant);
            const totalDebit = montant + frais;

            if (wallets[idx].solde < totalDebit) {
                showToast(`Erreur : Solde insuffisant. Requis : ${totalDebit.toLocaleString('fr-FR')} CFA (dont ${frais} CFA de frais).`, 'error');
                return;
            }

            // Perform Withdrawal
            wallets[idx].solde -= totalDebit;

            // Log Transaction
            transactions.unshift({
                type: 'retrait',
                montant: montant,
                frais: frais,
                telephone: tel,
                client: wallets[idx].client,
                status: 'Succès',
                timestamp: new Date().toLocaleTimeString('fr-FR')
            });

            saveState();
            updateWalletUI();
            renderTransactions();
            formRetrait.reset();
            updateRetraitFeePreview();

            showToast(`Retrait de ${montant.toLocaleString('fr-FR')} CFA réussi. Frais : ${frais} CFA. Nouveau solde : ${wallets[idx].solde.toLocaleString('fr-FR')} CFA.`);
        });
    }

    // Wallet Selector Event
    const walletSelectElem = document.getElementById('activeWalletSelect');
    if (walletSelectElem) {
        walletSelectElem.addEventListener('change', (e) => {
            selectedWalletIndex = e.target.value === '' ? -1 : Number(e.target.value);
            updateWalletUI();

            if (selectedWalletIndex >= 0 && wallets[selectedWalletIndex]) {
                const tel = wallets[selectedWalletIndex].telephone;
                const depotTel = document.getElementById('depotTel');
                const retraitTel = document.getElementById('retraitTel');
                if (depotTel) depotTel.value = tel;
                if (retraitTel) retraitTel.value = tel;
            }
        });
    }

    // Category Filter Buttons Event
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.getAttribute('data-category');
            const searchInput = document.getElementById('actorSearchInput');
            renderActors(cat, searchInput ? searchInput.value : '');
        });
    });

    // Search Input Event
    const searchInput = document.getElementById('actorSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilter = document.querySelector('.filter-btn.active');
            const cat = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
            renderActors(cat, e.target.value);
        });
    }

    // Operation Tab Switchers
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // Quick Navbar Action Buttons
    const btnQuickWallet = document.getElementById('btnQuickWallet');
    if (btnQuickWallet) {
        btnQuickWallet.addEventListener('click', () => {
            const walletSection = document.getElementById('wallet');
            if (walletSection) walletSection.scrollIntoView({ behavior: 'smooth' });

            const tabCreer = document.querySelector('[data-tab="tab-creer"]');
            if (tabCreer) tabCreer.click();
        });
    }

    const btnQuickDeposit = document.getElementById('btnQuickDeposit');
    if (btnQuickDeposit) {
        btnQuickDeposit.addEventListener('click', () => {
            const walletSection = document.getElementById('wallet');
            if (walletSection) walletSection.scrollIntoView({ behavior: 'smooth' });

            const tabDepot = document.querySelector('[data-tab="tab-depot"]');
            if (tabDepot) tabDepot.click();
        });
    }

    // Filter Transaction Buttons
    const btnFilterAllTrans = document.getElementById('btnFilterAllTrans');
    const btnFilterDepotTrans = document.getElementById('btnFilterDepotTrans');
    const btnFilterRetraitTrans = document.getElementById('btnFilterRetraitTrans');

    if (btnFilterAllTrans && btnFilterDepotTrans && btnFilterRetraitTrans) {
        btnFilterAllTrans.addEventListener('click', () => {
            currentTransactionFilter = 'all';
            renderTransactions();
        });
        btnFilterDepotTrans.addEventListener('click', () => {
            currentTransactionFilter = 'depot';
            renderTransactions();
        });
        btnFilterRetraitTrans.addEventListener('click', () => {
            currentTransactionFilter = 'retrait';
            renderTransactions();
        });
    }

    // Dock Navigation Highlighting on Scroll
    const dockItems = document.querySelectorAll('.dock-item');
    window.addEventListener('scroll', () => {
        let currentSection = 'hero';
        const sections = document.querySelectorAll('section');

        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            if (window.scrollY >= top) {
                currentSection = sec.getAttribute('id');
            }
        });

        dockItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-nav') === currentSection) {
                item.classList.add('active');
            }
        });
    });

    // Initial Render Calls
    renderActors();
    updateWalletUI();
    renderTransactions();

});
