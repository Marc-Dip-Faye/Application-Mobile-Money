/**
 * TERANGA TOURISME & PASS SÉNÉGAL - INTERACTIVE SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. TOURISM ACTORS DATA & RENDER ENGINE
    // ==========================================
    const tourismActors = [
        {
            id: 'act-1',
            name: 'Hôtel Teranga & Spa',
            category: 'hotel',
            categoryLabel: 'Hôtel & Lodge',
            region: 'dakar',
            location: 'Place de l\'Indépendance, Dakar',
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
            phone: '77 450 12 34',
            description: 'Établissement 5 étoiles emblématique au cœur de Dakar offrant vue panoramique sur l\'océan Atlantique et l\'île de Gorée.',
            verified: true
        },
        {
            id: 'act-2',
            name: 'El Hadji Ndiaye - Guide National',
            category: 'guide',
            categoryLabel: 'Guide Agréé',
            region: 'dakar',
            location: 'Île de Gorée & Dakar',
            rating: 5.0,
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
            phone: '76 892 45 10',
            description: 'Guide officiel certifié par le Ministère du Tourisme. Spécialiste de la Maison des Esclaves et du patrimoine culturel de Gorée.',
            verified: true
        },
        {
            id: 'act-3',
            name: 'Sahel Excursions & Safari',
            category: 'agency',
            categoryLabel: 'Agence de Voyage',
            region: 'thies',
            location: 'Saly Portudal & Réserve de Bandia',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
            phone: '78 310 99 88',
            description: 'Circuits safari 4x4 vers la Réserve de Bandia, quad au Lac Rose et promenades en pirogue dans la Somone.',
            verified: true
        },
        {
            id: 'act-4',
            name: 'Village des Arts de Soumbédioune',
            category: 'craft',
            categoryLabel: 'Artisanat & Galerie',
            region: 'dakar',
            location: 'Soumbédioune, Dakar',
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
            phone: '75 220 11 00',
            description: 'Regroupement de maîtres sculpteurs sur bois, maroquiniers, peintres sous verre (Suwer) et bijoutiers traditionnels.',
            verified: true
        },
        {
            id: 'act-5',
            name: 'Cap Skirring Eco-Lodge',
            category: 'hotel',
            categoryLabel: 'Hôtel & Lodge',
            region: 'casamance',
            location: 'Cap Skirring, Ziguinchor',
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
            phone: '77 665 43 21',
            description: 'Lodge écoresponsable niché dans une palmeraie au bord des plages immaculées de Casamance.',
            verified: true
        },
        {
            id: 'act-6',
            name: 'Saint-Louis Navette & Transferts',
            category: 'transport',
            categoryLabel: 'Transport Touristique',
            region: 'saint-louis',
            location: 'AIBD - Saint-Louis',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
            phone: '70 112 33 44',
            description: 'Service de transport climatisé haut de gamme reliant l\'Aéroport AIBD à la ville historique de Saint-Louis.',
            verified: true
        },
        {
            id: 'act-7',
            name: 'Moussa Camara - Guide Faune & Flore',
            category: 'guide',
            categoryLabel: 'Guide Agréé',
            region: 'saint-louis',
            location: 'Parc National des Oiseaux du Djoudj',
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
            phone: '77 988 77 66',
            description: 'Expert en ornithologie. Visites guidées en pirogue au cœur de la 3ème réserve mondiale d\'oiseaux migrateurs.',
            verified: true
        },
        {
            id: 'act-8',
            name: 'Les Piroguiers de la Somone',
            category: 'transport',
            categoryLabel: 'Transport Lagunaire',
            region: 'thies',
            location: 'Lagune de la Somone',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
            phone: '76 554 32 10',
            description: 'Balades écologiques en pirogue à moteur électrique ou à rames à travers la mangrove et l\'île aux coquillages.',
            verified: true
        }
    ];

    const actorsGrid = document.getElementById('actors-grid');
    const categoryTabs = document.querySelectorAll('#actor-categories .tab-btn');
    const globalSearch = document.getElementById('global-search');
    const regionFilter = document.getElementById('region-filter');
    const btnSearch = document.getElementById('btn-search');

    let activeCategory = 'all';

    function renderActors() {
        if (!actorsGrid) return;

        const query = globalSearch ? globalSearch.value.toLowerCase().trim() : '';
        const region = regionFilter ? regionFilter.value : 'all';

        const filtered = tourismActors.filter(actor => {
            const matchesCategory = (activeCategory === 'all' || actor.category === activeCategory);
            const matchesRegion = (region === 'all' || actor.region === region);
            const matchesSearch = query === '' ||
                actor.name.toLowerCase().includes(query) ||
                actor.location.toLowerCase().includes(query) ||
                actor.description.toLowerCase().includes(query);

            return matchesCategory && matchesRegion && matchesSearch;
        });

        if (filtered.length === 0) {
            actorsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-lg);">
                    <i class="fa-solid fa-compass" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Aucun acteur ne correspond à votre recherche</h3>
                    <p style="color: var(--text-secondary);">Essayez de modifier vos filtres ou termes de recherche.</p>
                </div>
            `;
            return;
        }

        actorsGrid.innerHTML = filtered.map(actor => `
            <div class="actor-card">
                <div class="actor-image-wrap">
                    <img src="${actor.image}" alt="${actor.name}" loading="lazy">
                    <span class="actor-category-tag">${actor.categoryLabel}</span>
                    ${actor.verified ? '<div class="actor-verified" title="Certifié Teranga"><i class="fa-solid fa-check"></i></div>' : ''}
                </div>
                <div class="actor-info">
                    <div class="actor-header">
                        <h3>${actor.name}</h3>
                        <div class="actor-rating">
                            <i class="fa-solid fa-star"></i>
                            <span>${actor.rating}</span>
                        </div>
                    </div>
                    <div class="actor-location">
                        <i class="fa-solid fa-location-dot" style="color: var(--neon-green);"></i>
                        <span>${actor.location}</span>
                    </div>
                    <p class="actor-desc">${actor.description}</p>
                    <div class="actor-footer">
                        <span class="actor-phone"><i class="fa-solid fa-phone"></i> +221 ${actor.phone}</span>
                        <button class="btn btn-sm btn-emerald view-actor-btn" data-id="${actor.id}">
                            Détails & Pass
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Re-bind modal click events
        document.querySelectorAll('.view-actor-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const actorId = e.currentTarget.getAttribute('data-id');
                const actor = tourismActors.find(a => a.id === actorId);
                if (actor) showActorModal(actor);
            });
        });
    }

    // Category Tabs Event
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeCategory = tab.getAttribute('data-category');
            renderActors();
        });
    });

    if (btnSearch) btnSearch.addEventListener('click', renderActors);
    if (globalSearch) globalSearch.addEventListener('input', renderActors);
    if (regionFilter) regionFilter.addEventListener('change', renderActors);

    // Initial render
    renderActors();


    // ==========================================
    // 2. WALLET & TERANGA PASS SIMULATOR (PHP Mirror Logic)
    // ==========================================
    let wallets = [
        {
            client: 'Fatou Sow (Exemple)',
            telephone: '771002030',
            code: '1234',
            solde: 150000
        }
    ];

    let transactions = [
        {
            type: 'depot',
            montant: 150000,
            frais: 0,
            indexClient: 0
        }
    ];

    // Dom Elements
    const displayClient = document.getElementById('display-client');
    const displayPhone = document.getElementById('display-phone');
    const displaySolde = document.getElementById('display-solde');
    const displayCode = document.getElementById('display-code');

    const walletFeedback = document.getElementById('wallet-feedback');
    const transactionsListBody = document.getElementById('transactions-list-body');

    // Forms
    const formCreerWallet = document.getElementById('form-creer-wallet');
    const formDepot = document.getElementById('form-depot');
    const formRetrait = document.getElementById('form-retrait');

    // Fee Calculator Helper (Mirrors services.php)
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

    // Validator Helpers (Mirrors validator.php)
    function verificationTailleNumero(telephone, code) {
        return telephone.length === 9 && code.length === 4;
    }

    function debutNumero(telephone) {
        const prefixValide = ['70', '75', '76', '77', '78'];
        const prefix = telephone.substring(0, 2);
        return prefixValide.includes(prefix);
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

    // Show Feedback Message
    function showFeedback(message, isSuccess = true) {
        if (!walletFeedback) return;
        walletFeedback.classList.remove('hidden', 'success', 'error');
        walletFeedback.classList.add(isSuccess ? 'success' : 'error');
        walletFeedback.innerHTML = `<i class="fa-solid ${isSuccess ? 'fa-circle-check' : 'fa-circle-xmark'}"></i> ${message}`;

        setTimeout(() => {
            walletFeedback.classList.add('hidden');
        }, 5000);
    }

    // Update Pass Card UI
    function updatePassCardUI(wallet) {
        if (!wallet) {
            if (displayClient) displayClient.textContent = 'Aucun Wallet Actif';
            if (displayPhone) displayPhone.textContent = '77 XXX XX XX';
            if (displaySolde) displaySolde.textContent = '0 FCFA';
            if (displayCode) displayCode.textContent = 'CODE: ****';
            return;
        }

        if (displayClient) displayClient.textContent = wallet.client;
        if (displayPhone) displayPhone.textContent = wallet.telephone.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
        if (displaySolde) displaySolde.textContent = wallet.solde.toLocaleString('fr-FR') + ' FCFA';
        if (displayCode) displayCode.textContent = 'CODE: ' + wallet.code;
    }

    // Render Transactions Table
    function renderTransactions() {
        if (!transactionsListBody) return;

        if (transactions.length === 0) {
            transactionsListBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                        Aucune transaction enregistrée.
                    </td>
                </tr>
            `;
            return;
        }

        transactionsListBody.innerHTML = transactions.map((t, idx) => {
            const clientObj = wallets[t.indexClient];
            const clientName = clientObj ? clientObj.client : 'Client Inconnu';
            return `
                <tr>
                    <td>#${idx + 1}</td>
                    <td><strong>${clientName}</strong></td>
                    <td><span class="badge-type ${t.type}">${t.type}</span></td>
                    <td style="font-weight: 700; color: var(--text-primary);">${t.montant.toLocaleString('fr-FR')} FCFA</td>
                    <td style="color: var(--gold-accent);">${t.frais ? t.frais.toLocaleString('fr-FR') + ' FCFA' : '0 FCFA'}</td>
                </tr>
            `;
        }).join('');
    }

    // 1. Handle Creer Wallet Form
    if (formCreerWallet) {
        formCreerWallet.addEventListener('submit', (e) => {
            e.preventDefault();
            const nom = document.getElementById('create-nom').value.trim();
            const phone = document.getElementById('create-phone').value.trim();
            const code = document.getElementById('create-code').value.trim();
            const solde = parseInt(document.getElementById('create-solde').value, 10);

            if (!verificationTailleNumero(phone, code)) {
                showFeedback('Erreur : Le numéro doit faire 9 chiffres et le code secret 4 chiffres.', false);
                return;
            }

            if (!debutNumero(phone)) {
                showFeedback('Erreur : Format de numéro invalide (doit commencer par 70, 75, 76, 77 ou 78).', false);
                return;
            }

            if (isNaN(solde) || solde < 0) {
                showFeedback('Erreur : Le solde initial doit être positif ou nul.', false);
                return;
            }

            if (verifiTelephoneExiste(phone)) {
                showFeedback('Erreur : Ce numéro de téléphone est déjà enregistré.', false);
                return;
            }

            if (verifiCodeExiste(code)) {
                showFeedback('Erreur : Ce code secret existe déjà. Veuillez en choisir un autre.', false);
                return;
            }

            const newWallet = {
                client: nom,
                telephone: phone,
                code: code,
                solde: solde
            };

            wallets.push(newWallet);
            const newIndex = wallets.length - 1;

            if (solde > 0) {
                transactions.push({
                    type: 'depot',
                    montant: solde,
                    frais: 0,
                    indexClient: newIndex
                });
            }

            updatePassCardUI(newWallet);
            renderTransactions();
            showFeedback(`Wallet créé avec succès pour ${nom} ! Solde: ${solde.toLocaleString('fr-FR')} FCFA.`);
            formCreerWallet.reset();
        });
    }

    // 2. Handle Dépôt Form
    if (formDepot) {
        formDepot.addEventListener('submit', (e) => {
            e.preventDefault();
            const phone = document.getElementById('depot-phone').value.trim();
            const montant = parseInt(document.getElementById('depot-montant').value, 10);

            if (isNaN(montant) || montant <= 0) {
                showFeedback('Erreur : Le montant du dépôt doit être supérieur à 0.', false);
                return;
            }

            const index = trouverWalletIndex(phone);
            if (index === -1) {
                showFeedback('Erreur : Aucun wallet trouvé pour ce numéro de téléphone.', false);
                return;
            }

            wallets[index].solde += montant;

            transactions.push({
                type: 'depot',
                montant: montant,
                frais: 0,
                indexClient: index
            });

            updatePassCardUI(wallets[index]);
            renderTransactions();
            showFeedback(`Dépôt de ${montant.toLocaleString('fr-FR')} FCFA effectué avec succès ! Nouveau solde: ${wallets[index].solde.toLocaleString('fr-FR')} FCFA.`);
            formDepot.reset();
        });
    }

    // 3. Handle Retrait Form with Realtime Fee Calculation
    const retraitMontantInput = document.getElementById('retrait-montant');
    const previewMontant = document.getElementById('preview-montant');
    const previewFrais = document.getElementById('preview-frais');
    const previewTotal = document.getElementById('preview-total');

    if (retraitMontantInput) {
        retraitMontantInput.addEventListener('input', () => {
            const val = parseInt(retraitMontantInput.value, 10) || 0;
            const frais = val > 0 ? calculerFrais(val) : 0;
            const total = val + frais;

            if (previewMontant) previewMontant.textContent = val.toLocaleString('fr-FR') + ' FCFA';
            if (previewFrais) previewFrais.textContent = frais.toLocaleString('fr-FR') + ' FCFA';
            if (previewTotal) previewTotal.textContent = total.toLocaleString('fr-FR') + ' FCFA';
        });
    }

    if (formRetrait) {
        formRetrait.addEventListener('submit', (e) => {
            e.preventDefault();
            const phone = document.getElementById('retrait-phone').value.trim();
            const montant = parseInt(document.getElementById('retrait-montant').value, 10);

            if (isNaN(montant) || montant <= 0) {
                showFeedback('Erreur : Le montant du retrait doit être supérieur à 0.', false);
                return;
            }

            const index = trouverWalletIndex(phone);
            if (index === -1) {
                showFeedback('Erreur : Aucun wallet associé à ce numéro de téléphone.', false);
                return;
            }

            const frais = calculerFrais(montant);
            const totalDebit = montant + frais;

            if (wallets[index].solde < totalDebit) {
                showFeedback(`Erreur : Solde insuffisant. Requis : ${totalDebit.toLocaleString('fr-FR')} FCFA (dont ${frais} FCFA de frais), Solde actuel : ${wallets[index].solde.toLocaleString('fr-FR')} FCFA.`, false);
                return;
            }

            wallets[index].solde -= totalDebit;

            transactions.push({
                type: 'retrait',
                montant: montant,
                frais: frais,
                indexClient: index
            });

            updatePassCardUI(wallets[index]);
            renderTransactions();
            showFeedback(`Retrait de ${montant.toLocaleString('fr-FR')} FCFA validé. Frais: ${frais} FCFA. Nouveau solde: ${wallets[index].solde.toLocaleString('fr-FR')} FCFA.`);
            formRetrait.reset();
            if (previewMontant) previewMontant.textContent = '0 FCFA';
            if (previewFrais) previewFrais.textContent = '0 FCFA';
            if (previewTotal) previewTotal.textContent = '0 FCFA';
        });
    }

    // Panel Tab Switching (Créer / Dépôt / Retrait / History)
    const walletTabBtns = document.querySelectorAll('.w-tab-btn');
    const walletTabContents = document.querySelectorAll('.w-tab-content');

    walletTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            walletTabBtns.forEach(b => b.classList.remove('active'));
            walletTabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetId = 'wtab-' + btn.getAttribute('data-wtab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    // Initialize Pass Display with sample wallet
    if (wallets.length > 0) {
        updatePassCardUI(wallets[0]);
    }
    renderTransactions();


    // ==========================================
    // 3. MODAL HANDLERS
    // ==========================================
    const modal = document.getElementById('actor-detail-modal');
    const modalBody = document.getElementById('modal-body-content');
    const closeModalBtn = document.querySelector('.close-modal');

    function showActorModal(actor) {
        if (!modal || !modalBody) return;

        modalBody.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <img src="${actor.image}" alt="${actor.name}" style="width: 100%; height: 220px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1rem; border: 1px solid var(--border-color);">
                <span class="actor-category-tag" style="position: static; display: inline-block; margin-bottom: 0.5rem;">${actor.categoryLabel}</span>
                <h2 style="font-size: 1.8rem; margin-bottom: 0.25rem;">${actor.name}</h2>
                <p style="color: var(--neon-green); font-size: 0.95rem;"><i class="fa-solid fa-location-dot"></i> ${actor.location}</p>
            </div>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">${actor.description}</p>
            <div style="background: rgba(9, 15, 23, 0.8); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
                    <span style="color: var(--text-muted);">Téléphone Direct :</span>
                    <strong style="color: var(--text-primary);">+221 ${actor.phone}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                    <span style="color: var(--text-muted);">Acceptation Teranga Pass :</span>
                    <strong style="color: var(--neon-green);"><i class="fa-solid fa-circle-check"></i> Actif (0% frais client)</strong>
                </div>
            </div>
            <a href="#wallet" class="btn btn-primary btn-block close-and-pay">
                <i class="fa-solid fa-qrcode"></i> Utiliser mon Teranga Pass chez ce Partenaire
            </a>
        `;

        modal.classList.add('active');

        const closeAndPayBtn = modalBody.querySelector('.close-and-pay');
        if (closeAndPayBtn) {
            closeAndPayBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    const openActorModalBtn = document.getElementById('open-actor-modal');
    if (openActorModalBtn) {
        openActorModalBtn.addEventListener('click', () => {
            if (!modal || !modalBody) return;
            modalBody.innerHTML = `
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <i class="fa-solid fa-handshake" style="font-size: 3rem; color: var(--neon-green); margin-bottom: 1rem;"></i>
                    <h2>Devenir Acteur Partenaire Certifié</h2>
                    <p style="color: var(--text-secondary); font-size: 0.95rem;">Inscrivez votre établissement ou service sur le portail Teranga Tourisme Sénégal.</p>
                </div>
                <form id="partner-form" onsubmit="event.preventDefault(); alert('Votre demande de partenariat a été enregistrée avec succès. Un agent du Ministère prendra contact avec vous sous 24h.'); document.getElementById('actor-detail-modal').classList.remove('active');">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;">Nom de l'Etablissement / Guide</label>
                        <input type="text" placeholder="Ex: Hôtel Teranga du Sine" required style="width: 100%; padding: 0.8rem; background: rgba(9,15,23,0.8); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;">Catégorie</label>
                        <select style="width: 100%; padding: 0.8rem; background: rgba(9,15,23,0.8); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);" required>
                            <option value="hotel">Hôtel / Lodge / Maison d'hôtes</option>
                            <option value="guide">Guide touristique individuel / collectif</option>
                            <option value="agency">Agence d'excursion & safari</option>
                            <option value="craft">Artisanat / Boutique / Galerie</option>
                            <option value="transport">Transport / Chauffeur privé</option>
                        </select>
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;">Téléphone professionnel</label>
                        <input type="tel" placeholder="771234567" required style="width: 100%; padding: 0.8rem; background: rgba(9,15,23,0.8); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary);">
                    </div>
                    <button type="submit" class="btn btn-primary btn-block"><i class="fa-solid fa-paper-plane"></i> Soumettre mon dossier</button>
                </form>
            `;
            modal.classList.add('active');
        });
    }

    // Mobile Navigation Dock active switching
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        item.addEventListener('click', () => {
            dockItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

});
