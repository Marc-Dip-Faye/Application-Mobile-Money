// GLOBAL SEARCH & NOTIFICATION DRAWER CONTROLLERS

function setupGlobalSearch() {
  const input = document.getElementById('global-search-input');
  const dropdown = document.getElementById('global-search-dropdown');
  const resultsContainer = document.getElementById('global-search-results');

  if (!input || !dropdown || !resultsContainer) return;

  // Keyboard shortcut Ctrl+K focus
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      input.focus();
    }
  });

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    if (query.length < 2) {
      dropdown.classList.add('hidden');
      return;
    }

    // Search across products, orders, customers
    const matchedProducts = appState.products.filter(p => p.name.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query)).slice(0, 3);
    const matchedOrders = appState.orders.filter(o => o.id.toLowerCase().includes(query) || o.customer.name.toLowerCase().includes(query)).slice(0, 3);
    const matchedCustomers = appState.customers.filter(c => c.name.toLowerCase().includes(query) || c.email.toLowerCase().includes(query)).slice(0, 3);

    const totalMatches = matchedProducts.length + matchedOrders.length + matchedCustomers.length;

    if (totalMatches === 0) {
      resultsContainer.innerHTML = `
        <div class="p-4 text-center text-xs text-slate-400">
          <i data-lucide="search-x" class="w-5 h-5 mx-auto text-slate-500 mb-1"></i>
          Aucun résultat trouvé pour "${query}"
        </div>
      `;
    } else {
      let html = '';

      if (matchedProducts.length > 0) {
        html += `
          <div class="p-2 text-[10px] font-bold uppercase tracking-wider text-indigo-400">Produits</div>
          ${matchedProducts.map(p => `
            <a href="#products" onclick="closeGlobalSearch()" class="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800/80 transition-colors">
              <img class="w-8 h-8 rounded object-cover" src="${p.image}" alt="">
              <div class="min-w-0 flex-1">
                <p class="font-bold text-xs text-white line-clamp-1">${p.name}</p>
                <p class="text-[10px] text-slate-400 font-mono">${p.sku} • ${formatFCFA(p.price)}</p>
              </div>
            </a>
          `).join('')}
        `;
      }

      if (matchedOrders.length > 0) {
        html += `
          <div class="p-2 text-[10px] font-bold uppercase tracking-wider text-indigo-400 border-t border-slate-800">Commandes</div>
          ${matchedOrders.map(o => `
            <a href="#orders" onclick="openOrderDetailModal('${o.id}'); closeGlobalSearch();" class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/80 transition-colors">
              <div>
                <p class="font-bold text-xs font-mono text-indigo-300">${o.id}</p>
                <p class="text-[10px] text-slate-400">${o.customer.name}</p>
              </div>
              <span class="font-mono text-xs font-bold text-white">${formatFCFA(o.totalAmount)}</span>
            </a>
          `).join('')}
        `;
      }

      if (matchedCustomers.length > 0) {
        html += `
          <div class="p-2 text-[10px] font-bold uppercase tracking-wider text-indigo-400 border-t border-slate-800">Clients</div>
          ${matchedCustomers.map(c => `
            <a href="#customers" onclick="openCustomerDetailModal('${c.id}'); closeGlobalSearch();" class="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800/80 transition-colors">
              <img class="w-8 h-8 rounded-full object-cover" src="${c.avatar}" alt="">
              <div>
                <p class="font-bold text-xs text-white">${c.name}</p>
                <p class="text-[10px] text-slate-400">${c.email}</p>
              </div>
            </a>
          `).join('')}
        `;
      }

      resultsContainer.innerHTML = html;
    }

    dropdown.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  });

  // Hide on click outside
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });
}

window.closeGlobalSearch = function() {
  const input = document.getElementById('global-search-input');
  const dropdown = document.getElementById('global-search-dropdown');
  if (input) input.value = '';
  if (dropdown) dropdown.classList.add('hidden');
};

// NOTIFICATIONS DRAWER CONTROLLER
function setupNotifications() {
  const toggleBtn = document.getElementById('notif-toggle-btn');
  const dropdown = document.getElementById('notif-dropdown');
  const notifList = document.getElementById('notif-list');
  const markReadBtn = document.getElementById('mark-notifs-read');
  const notifPing = document.getElementById('notif-ping');
  const notifBadge = document.getElementById('notif-count-badge');

  if (!toggleBtn || !dropdown || !notifList) return;

  const notifications = [
    { id: 1, title: "Nouvelle commande #CMD-2026-8891", text: "Aïssatou Sow a réglé 1 400 000 FCFA via Wave", time: "Il y a 12 min", unread: true },
    { id: 2, title: "Alerte Stock Faible", text: "Samsung Galaxy S24 Ultra : seulement 3 unités restantes", time: "Il y a 45 min", unread: true },
    { id: 3, title: "Nouveau client inscrit", text: "Ibrahima Sarr de Saly s'est inscrit à la boutique", time: "Il y a 2h", unread: true }
  ];

  function renderNotifs() {
    const unreadCount = notifications.filter(n => n.unread).length;

    if (notifPing) {
      if (unreadCount > 0) notifPing.classList.remove('hidden');
      else notifPing.classList.add('hidden');
    }

    if (notifBadge) {
      notifBadge.textContent = unreadCount > 0 ? `${unreadCount} nouvelle(s)` : 'Aucune nouvelle';
    }

    notifList.innerHTML = notifications.map(n => `
      <div class="p-3 hover:bg-slate-800/40 transition-colors ${n.unread ? 'bg-indigo-950/20' : ''}">
        <div class="flex items-center justify-between mb-1">
          <p class="font-bold text-xs text-white">${n.title}</p>
          <span class="text-[10px] text-slate-500">${n.time}</span>
        </div>
        <p class="text-[11px] text-slate-300">${n.text}</p>
      </div>
    `).join('');
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  markReadBtn?.addEventListener('click', () => {
    notifications.forEach(n => n.unread = false);
    renderNotifs();
    showToast('Toutes les notifications marquées comme lues.', 'info');
  });

  renderNotifs();
}
