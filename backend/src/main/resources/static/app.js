(() => {
  'use strict';

  const STORAGE_KEY = 'maison-static-store-v1';
  let branches = [
    { id: 'jardins', name: 'Jardins', address: 'Alameda Lorena, 1250 · São Paulo', hours: 'Todos os dias, 7h às 20h' },
    { id: 'pinheiros', name: 'Pinheiros', address: 'Rua dos Pinheiros, 480 · São Paulo', hours: 'Todos os dias, 7h às 20h' },
    { id: 'moema', name: 'Moema', address: 'Av. Moema, 310 · São Paulo', hours: 'Todos os dias, 7h às 20h' }
  ];
  const demoBranches = branches.map((branch) => ({ ...branch }));
  let products = [
    { id: 'croissant', name: 'Fornada Dourada', description: 'Croissant de manteiga com delicadas camadas crocantes.', price: 12.9, category: 'Pães', icon: '🥐', art: 'bread', tag: 'Mais amado', image: '/assets/croissant-fornada-dourada.jpg' },
    { id: 'cake', name: 'Jardim de Morangos', description: 'Fatia de bolo de baunilha, creme e morangos frescos.', price: 24.9, category: 'Bolos', icon: '🍰', art: 'cake', tag: 'Feito com carinho', image: '/assets/fatia-jardim-morango.jpg' },
    { id: 'bread', name: 'Raízes da Casa', description: 'Pão de fermentação natural com casca crocante.', price: 28, category: 'Pães', icon: '🍞', art: 'bread', tag: '', image: '/assets/pao-raizes-da-casa.jpg' },
    { id: 'cheese', name: 'Pérolas da Serra', description: 'Pão de queijo artesanal, quentinho por dentro.', price: 8.5, category: 'Salgados', icon: '🧀', art: 'savory', tag: '', image: '/assets/pao-queijo-perolas-serra.jpg' },
    { id: 'brownie', name: 'Cacau & Afeto', description: 'Brownie de chocolate intenso e centro macio.', price: 16.9, category: 'Doces', icon: '🍫', art: 'sweet', tag: 'Favorito da casa', image: '/assets/brownie-cacau-afeto.jpg' },
    { id: 'pao-frances', name: 'Amanhecer Crocante', description: 'Pão francês de casca dourada e miolo leve · unidade.', price: 2.5, category: 'Pães', icon: '🥖', art: 'bread', tag: 'Novidade', image: '/assets/pao-frances-amanhecer.jpg' },
    { id: 'brioche', name: 'Nuvem de Manteiga', description: 'Brioche amanteigado, macio e delicado · pão inteiro.', price: 24.9, category: 'Pães', icon: '🍞', art: 'bread', tag: 'Novidade', image: '/assets/brioche-nuvem-manteiga.jpg' },
    { id: 'pao-integral', name: 'Essência do Campo', description: 'Pão integral com aveia e sementes · pão inteiro.', price: 22.9, category: 'Pães', icon: '🌾', art: 'bread', tag: 'Novidade', image: '/assets/pao-integral-campo.jpg' },
    { id: 'focaccia', name: 'Jardim de Alecrim', description: 'Focaccia artesanal com azeite e alecrim · porção.', price: 16.9, category: 'Pães', icon: '🍕', art: 'bread', tag: 'Novidade', image: '/assets/focaccia-jardim-alecrim.jpg' },
    { id: 'pao-de-leite', name: 'Laço de Carinho', description: 'Pão de leite com miolo fofinho · unidade.', price: 4.9, category: 'Pães', icon: '🥯', art: 'bread', tag: 'Novidade', image: '/assets/pao-leite-laco-carinho.jpg' },
    { id: 'combo-festa', name: 'Combo de festa', description: 'Caixa de coxinhas douradas, bolinhas de queijo e bolo de chocolate.', price: 189.9, category: 'Combos', icon: '🎁', art: 'combo', tag: 'Para compartilhar', combo: true, image: '/assets/product-grid.jpg' },
    { id: 'piscina-da-paixao', name: 'Piscina da Paixão', description: 'Torta de morango com creme de baunilha e toque de pâtisserie fina.', price: 149.9, category: 'Bolos', icon: '🍓', art: 'cake', tag: 'Novidade', image: '/assets/fatia-jardim-morango.jpg' },
    { id: 'torta-limao', name: 'Suspiro de Verão', description: 'Torta de limão com merengue tostado na hora.', price: 119.9, category: 'Doces', icon: '🍋', art: 'sweet', tag: '', image: '/assets/torta-limao-suspiro-de-verao.jpg' },
    { id: 'bolo-cenoura', name: 'Erupção de Alegria', description: 'Bolo de cenoura com vulcão de brigadeiro.', price: 99.9, category: 'Doces', icon: '🍫', art: 'sweet', tag: 'Favorito da casa', image: '/assets/bolo-cenoura-erupcao-de-alegria.jpg' },
    { id: 'cheesecake', name: 'Nuvem do Bosque', description: 'Cheesecake cremoso com frutas vermelhas frescas.', price: 139.9, category: 'Doces', icon: '🫐', art: 'sweet', tag: '', image: '/assets/cheesecake-nuvem-do-bosque.jpg' },
    { id: 'abraco-de-vo', name: 'Abraço de Vó', description: 'Pavê de doce de leite em camadas generosas.', price: 89.9, category: 'Doces', icon: '🍮', art: 'sweet', tag: '', image: '/assets/pave-abraco-de-vo.jpg' },
    { id: 'folhas-de-ouro', name: 'Folhas de Ouro', description: 'Mil folhas de baunilha com massa folhada crocante.', price: 109.9, category: 'Doces', icon: '🥐', art: 'sweet', tag: '', image: '/assets/mil-folhas-folhas-de-ouro.jpg' },
    { id: 'espelho-doce', name: 'Espelho Doce', description: 'Pudim de leite condensado com calda de caramelo.', price: 79.9, category: 'Doces', icon: '🍮', art: 'sweet', tag: '', image: '/assets/pudim-espelho-doce.jpg' },
    { id: 'segredo-europeu', name: 'Segredo Europeu', description: 'Torta holandesa com ganache e raspas de chocolate.', price: 129.9, category: 'Doces', icon: '🍰', art: 'sweet', tag: '', image: '/assets/torta-holandesa-segredo-europeu.jpg' },
    { id: 'veludo-real', name: 'Veludo Real', description: 'Bolo Red Velvet tradicional com cream cheese.', price: 159.9, category: 'Doces', icon: '🍰', art: 'sweet', tag: '', image: '/assets/bolo-red-velvet-veludo-real.jpg' },
    { id: 'coxinha', name: 'A Rainha da Festa', description: 'Coxinha de frango com catupiry, dourada e crocante.', price: 9.9, category: 'Salgados', icon: '🥟', art: 'savory', tag: 'Mais amado', image: '/assets/coxinha-rainha-da-festa.jpg' },
    { id: 'ouro-derretido', name: 'Ouro Derretido', description: 'Bolinha de queijo com coração cremoso.', price: 8.9, category: 'Salgados', icon: '🧀', art: 'savory', tag: '', image: '/assets/bolinha-queijo-ouro-derretido.jpg' },
    { id: 'meia-lua-saborosa', name: 'Meia-Lua Saborosa', description: 'Risólis de carne com casquinha crocante.', price: 9.5, category: 'Salgados', icon: '🥟', art: 'savory', tag: '', image: '/assets/risolis-carne-meia-lua.jpg' },
    { id: 'tesouro-arabe', name: 'Tesouro Árabe', description: 'Kibe recheado com carne temperada e hortelã.', price: 10.9, category: 'Salgados', icon: '🥙', art: 'savory', tag: '', image: '/assets/kibe-tesouro-arabe.jpg' },
    { id: 'casquinha-perfeita', name: 'Casquinha Perfeita', description: 'Empadinha de palmito com massa amanteigada.', price: 9.9, category: 'Salgados', icon: '🥧', art: 'savory', tag: '', image: '/assets/empadinha-palmito-casquinha.jpg' },
    { id: 'classico-de-domingo', name: 'Clássico de Domingo', description: 'Esfiha de carne aberta, suculenta e temperada.', price: 9.9, category: 'Salgados', icon: '🥟', art: 'savory', tag: '', image: '/assets/esfiha-carne-classico.jpg' },
    { id: 'abraco-quentinho', name: 'Abraço Quentinho', description: 'Enroladinho de salsicha em massa fofinha.', price: 8.9, category: 'Salgados', icon: '🌭', art: 'savory', tag: '', image: '/assets/enroladinho-salsicha-abraco.jpg' },
    { id: 'crocancia-absoluta', name: 'Crocância Absoluta', description: 'Croquete de carne desfiada, sequinho por fora.', price: 9.5, category: 'Salgados', icon: '🥟', art: 'savory', tag: '', image: '/assets/croquete-carne-crocancia.jpg' },
    { id: 'brisa-salgada', name: 'Brisa Salgada', description: 'Pastelzinho de queijo com massa fina e estalinhos.', price: 8.9, category: 'Salgados', icon: '🥟', art: 'savory', tag: '', image: '/assets/pastelzinho-queijo-brisa.jpg' },
    { id: 'pao-queijo-recheado', name: 'Orgulho Mineiro', description: 'Pão de queijo recheado, quentinho e puxa-puxa.', price: 10.9, category: 'Salgados', icon: '🧀', art: 'savory', tag: '', image: '/assets/pao-queijo-recheado-orgulho.jpg' }
  ];
  const demoProducts = products.map((product) => ({ ...product }));
  const defaultCampaigns = [
    { id: 'forno-da-casa', name: 'Carinho de boas-vindas', code: 'MAISON10', description: '10% de desconto no primeiro pedido.', type: 'percent', value: 10, active: true },
    { id: 'combo-da-manha', name: 'Combo café da manhã', code: 'FORNO5', description: 'R$ 5 de desconto para acompanhar sua fornada.', type: 'fixed', value: 5, active: true },
    { id: 'festa-do-bolo', name: 'Um mimo para o seu bolo', code: 'BOLO15', description: '15% de desconto em bolos personalizados.', type: 'cake', value: 15, active: true }
  ];
  const seedReviews = [
    { id: 'review-1', name: 'Marina', stars: 5, text: 'O pão de fermentação natural chegou quentinho e estava incrível. Já quero repetir!', item: 'Raízes da Casa', date: 'Há 2 dias' },
    { id: 'review-2', name: 'Rafael', stars: 5, text: 'O bolo ficou lindo e muito gostoso. Atendimento super atencioso do começo ao fim.', item: 'Jardim de Morangos', date: 'Há 1 semana' },
    { id: 'review-3', name: 'Lívia', stars: 4, text: 'Croissant perfeito para acompanhar o café da manhã. Dá para sentir o carinho.', item: 'Fornada Dourada', date: 'Há 2 semanas' }
  ];
  const defaultState = {
    selectedBranch: null,
    cart: [],
    coupon: null,
    orders: [],
    user: null,
    accounts: [],
    inventory: {},
    campaigns: defaultCampaigns,
    reviews: seedReviews,
    chat: [],
    builder: { step: 0, shape: 'Redondo', size: 15, dough: 'Baunilha', fillings: ['Creme de Baunilha'], frosting: 'Branca', flowers: false, berries: false, message: '' }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0);
  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const validBranch = (id) => branches.some((branch) => branch.id === id);

  function readState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved || typeof saved !== 'object') return structuredClone(defaultState);
      return {
        ...structuredClone(defaultState),
        ...saved,
        selectedBranch: typeof saved.selectedBranch === 'string' ? saved.selectedBranch : null,
        cart: Array.isArray(saved.cart) ? saved.cart.filter((item) => item && typeof item.id === 'string' && Number.isFinite(item.price) && Number.isInteger(item.quantity)).map((item) => ({ ...item, quantity: Math.max(1, item.quantity) })) : [],
        orders: Array.isArray(saved.orders) ? saved.orders : [],
        accounts: Array.isArray(saved.accounts) ? saved.accounts : [],
        inventory: saved.inventory && typeof saved.inventory === 'object' ? saved.inventory : {},
        campaigns: Array.isArray(saved.campaigns) ? saved.campaigns : structuredClone(defaultCampaigns),
        reviews: Array.isArray(saved.reviews) ? saved.reviews : structuredClone(seedReviews),
        chat: Array.isArray(saved.chat) ? saved.chat : [],
        builder: { ...defaultState.builder, ...(saved.builder || {}), step: Math.max(0, Math.min(4, Number(saved.builder?.step) || 0)), fillings: Array.isArray(saved.builder?.fillings) ? saved.builder.fillings.slice(0, 2) : ['Creme de Baunilha'] }
      };
    } catch {
      return structuredClone(defaultState);
    }
  }

  let state = readState();
  const app = $('#app');
  let catalogFilter = 'Todos';
  let catalogQuery = '';
  let toastTimer;
  let apiStatus = 'Conferindo filiais e estoque…';

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch { showToast('O navegador não conseguiu salvar este estado local.'); }
  }

  // API adapter central: URLs relativas mantêm esta SPA no mesmo host do Spring Boot.
  // Contratos REST esperados estão listados no final deste arquivo; o fallback local segue disponível.
  const API = {
    async request(path, options = {}) {
      let response;
      try {
        response = await fetch(path, {
          method: options.method || 'GET',
          credentials: 'same-origin',
          headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) },
          ...(options.body ? { body: typeof options.body === 'string' ? options.body : JSON.stringify(options.body) } : {})
        });
      } catch (cause) {
        const error = new Error(`Backend indisponível em ${path}.`);
        error.networkUnavailable = true;
        error.cause = cause;
        throw error;
      }
      const contentType = response.headers.get('content-type') || '';
      let payload = null;
      if (contentType.includes('application/json')) {
        try { payload = await response.json(); }
        catch { throw new Error(`Resposta JSON inválida (${response.status}) em ${path}.`); }
      } else {
        const text = await response.text();
        payload = text ? { message: text } : null;
      }
      if (!response.ok) {
        const error = new Error(payload?.message || `Falha REST ${response.status} em ${path}.`);
        error.status = response.status;
        throw error;
      }
      return payload;
    },
    async optional(path, options = {}) {
      try { return { ok: true, data: await this.request(path, options), error: null }; }
      catch (error) { return { ok: false, data: null, unreachable: Boolean(error?.networkUnavailable), status: error?.status || null, error: error instanceof Error ? error.message : 'Falha de conexão.' }; }
    }
  };
  /*
   * REST routes confirmed in Spring controllers:
   * GET/POST /api/filiais -> {id,nome,endereco,contato}; GET/GET by id/POST /api/estoque -> {id,nome,categoria,quantidade,preco,descricao};
   * GET/GET by id/POST /api/encomendas -> {id,nome,endereco,contato,itens:[{nome,quantidade,precoUnitario}],total,status,criadaEm};
   * GET/POST /api/mensagens -> {id,nome,email,contato,texto,criadaEm}; GET/POST /api/cobrancas -> demonstracao:true, no payment processed.
   * The SPA reads GET /api/filiais and GET /api/estoque, then submits DTO-compatible POSTs to encomendas, mensagens and cobrancas.
   * Auth, user-scoped order history, branch-specific stock updates, promotions, reviews, account and admin APIs are absent.
   * GET lists for orders/messages/charges are unscoped; this UI intentionally doesn't expose them as private histories.
   */

  function routePath() {
    const raw = window.location.hash.slice(1) || '/';
    return raw.startsWith('/') ? raw : `/${raw}`;
  }

  function selectedBranch() { return branches.find((branch) => branch.id === state.selectedBranch) || null; }

  function inventoryRecord(productId, branchId = state.selectedBranch) {
    return (branchId && state.inventory[branchId] && state.inventory[branchId][productId]) || {};
  }

  function productPrice(product, branchId = state.selectedBranch) {
    const override = inventoryRecord(product.id, branchId);
    return Number.isFinite(Number(override.price)) && Number(override.price) > 0 ? Number(override.price) : product.price;
  }

  function productStock(product, branchId = state.selectedBranch) {
    if (!branchId) return null;
    const override = inventoryRecord(product.id, branchId);
    if (override.active === false || (override.status && override.status !== 'DISPONIVEL')) return 0;
    if (Number.isInteger(Number(override.qty))) return Math.max(0, Number(override.qty));
    return Number.isInteger(product.remoteStock) ? Math.max(0, product.remoteStock) : 20;
  }

  function isProductAvailable(product, branchId = state.selectedBranch) {
    const stock = productStock(product, branchId);
    const status = inventoryRecord(product.id, branchId).status;
    return stock === null || (stock > 0 && (!status || status === 'DISPONIVEL'));
  }

  function getProduct(productId) { return products.find((product) => product.id === productId); }
  function cartSubtotal() { return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0); }
  function deliveryFee(method = 'delivery') { return method === 'delivery' ? 12 : 0; }

  function normalizedName(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLocaleLowerCase('pt-BR');
  }

  function categoryDetails(value) {
    const category = String(value || 'Produtos');
    const normalized = normalizedName(category);
    if (normalized.includes('pao') || normalized.includes('padaria')) return { category: 'Pães', art: 'bread', icon: '🥖' };
    if (normalized.includes('bolo') || normalized.includes('torta')) return { category: 'Bolos', art: 'cake', icon: '🍰' };
    if (normalized.includes('salg') || normalized.includes('sanduiche')) return { category: 'Salgados', art: 'savory', icon: '🥟' };
    if (normalized.includes('combo')) return { category: 'Combos', art: 'combo', icon: '🎁' };
    return { category: category || 'Doces', art: 'sweet', icon: '🍰' };
  }

  async function hydrateBackendData() {
    const [branchResult, stockResult] = await Promise.all([
      API.optional('/api/filiais'),
      API.optional('/api/estoque')
    ]);
    const connected = [];
    const localFallbacks = [];
    const backendErrors = [];
    if (branchResult.ok && Array.isArray(branchResult.data)) {
      const seedBranches = branches;
      branches = branchResult.data.filter((row) => row && row.id != null && row.nome).map((row) => {
        const seed = seedBranches.find((item) => normalizedName(item.name) === normalizedName(row.nome));
        return { id: seed?.id || `filial-${row.id}`, apiId: row.id, name: String(row.nome), address: String(row.endereco || ''), contact: String(row.contato || ''), hours: seed?.hours || 'Consulte a loja para horários.' };
      });
      connected.push('filiais');
    } else if (branchResult.unreachable) {
      branches = demoBranches.map((branch) => ({ ...branch }));
      localFallbacks.push('filiais demo (offline)');
    } else {
      branches = [];
      backendErrors.push(`/api/filiais: ${branchResult.error}`);
    }
    if (branchResult.ok && !Array.isArray(branchResult.data)) {
      branches = [];
      backendErrors.push('/api/filiais: resposta não veio como uma lista JSON');
    }
    if (stockResult.ok && Array.isArray(stockResult.data)) {
      products = stockResult.data.filter((row) => row && row.id != null && row.nome && Number.isFinite(Number(row.preco))).map((row) => {
        const details = categoryDetails(row.categoria);
        return {
          id: `estoque-${row.id}`,
          apiId: row.id,
          name: String(row.nome),
          description: String(row.descricao || 'Produto cadastrado pela equipe da loja.'),
          price: Math.max(0, Number(row.preco)),
          remoteStock: Number.isInteger(Number(row.quantidade)) ? Math.max(0, Number(row.quantidade)) : null,
          category: details.category,
          icon: details.icon,
          art: details.art,
          tag: 'Catálogo da loja'
        };
      });
      connected.push('estoque');
    } else if (stockResult.unreachable) {
      products = demoProducts.map((product) => ({ ...product }));
      localFallbacks.push('catálogo demo (offline)');
    } else {
      products = [];
      backendErrors.push(`/api/estoque: ${stockResult.error}`);
    }
    if (stockResult.ok && !Array.isArray(stockResult.data)) {
      products = [];
      backendErrors.push('/api/estoque: resposta não veio como uma lista JSON');
    }
    if (state.selectedBranch && !validBranch(state.selectedBranch)) state.selectedBranch = null;
    apiStatus = [connected.length ? `Backend: ${connected.join(' e ')}` : '', localFallbacks.length ? `Fallback local apenas por indisponibilidade: ${localFallbacks.join(', ')}` : '', backendErrors.length ? `Erro do backend (sem fallback): ${backendErrors.join(' · ')}` : '', 'Login, campanhas, avaliações e gestão continuam locais demo.'].filter(Boolean).join(' · ');
    saveState();
    updateHeader();
    const status = $('#backend-status');
    if (status) status.textContent = apiStatus;
    render();
  }

  function activeCoupon() {
    if (!state.coupon) return null;
    return state.campaigns.find((campaign) => campaign.active && campaign.code.toUpperCase() === state.coupon.toUpperCase()) || null;
  }

  function couponDiscount(subtotal = cartSubtotal()) {
    const coupon = activeCoupon();
    if (!coupon) return 0;
    if (coupon.type === 'cake') {
      const cakesTotal = state.cart.filter((item) => item.cake).reduce((sum, item) => sum + item.price * item.quantity, 0);
      return Math.min(cakesTotal, cakesTotal * Number(coupon.value) / 100);
    }
    if (coupon.type === 'fixed') return Math.min(subtotal, Number(coupon.value));
    return Math.min(subtotal, subtotal * Number(coupon.value) / 100);
  }

  function showToast(message) {
    const region = $('.toast-region');
    region.innerHTML = `<div class="toast">${escapeHTML(message)}</div>`;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => { region.innerHTML = ''; }, 3200);
  }

  function updateHeader() {
    const branch = selectedBranch();
    $('#header-branch').textContent = branch ? branch.name : 'Escolher filial';
    $('#bag-count').textContent = String(state.cart.reduce((sum, item) => sum + item.quantity, 0));
    $('.bag-link').setAttribute('aria-label', `Sacola, ${state.cart.reduce((sum, item) => sum + item.quantity, 0)} itens`);
  }

  function branchChooserPrompt() {
    const branch = selectedBranch();
    return `<div class="branch-prompt"><span class="branch-prompt__mark" aria-hidden="true">⌖</span><div><strong>${branch ? `Comprando em ${escapeHTML(branch.name)}` : 'Escolha sua Maison antes de pedir'}</strong><p>${branch ? escapeHTML(branch.address) : 'Confira disponibilidade e produtos fresquinhos da sua loja.'}</p></div><a class="button button--outline button--small" href="#/filial">${branch ? 'Trocar filial' : 'Selecionar filial'}</a></div>`;
  }

  function productCard(product, index = 0) {
    const stock = productStock(product);
    const unavailable = stock === 0;
    const badge = product.tag ? `<span class="product-card__tag">${escapeHTML(product.tag)}</span>` : '';
    const stockBadge = !state.selectedBranch ? 'Escolha uma filial' : unavailable ? 'Indisponível hoje' : `Pronta entrega · ${stock} un.`;
    const price = productPrice(product);
    return `<article class="product-card" style="animation-delay:${index * 45}ms"><div class="product-card__visual"><div class="product-card__art product-card__art--${escapeHTML(product.art)}" aria-hidden="true">${product.image ? `<img src="${escapeHTML(product.image)}" alt="" loading="lazy" onerror="this.remove()">` : ''}<span>${escapeHTML(product.icon)}</span></div>${badge}<span class="product-card__availability">${escapeHTML(stockBadge)}</span></div><div class="product-card__body"><p class="product-card__category">${escapeHTML(product.category)}</p><h3>${escapeHTML(product.name)}</h3><p class="product-card__description">${escapeHTML(product.description)}</p><div class="product-card__bottom"><span><span class="product-card__price">${money(price)}</span>${product.combo ? '<small class="product-card__old-price">Combo para compartilhar</small>' : ''}</span><button class="add-button" type="button" data-action="add-product" data-product-id="${escapeHTML(product.id)}" aria-label="Adicionar ${escapeHTML(product.name)} à sacola" ${!state.selectedBranch || unavailable ? 'disabled' : ''}>+</button></div></div></article>`;
  }

  function productGridMarkup(items) {
    if (!items.length) return '<div class="empty-state full-width"><span class="empty-state__icon">⌕</span>Nenhum produto combina com a sua busca. Tente outra palavra ou categoria.</div>';
    return items.map(productCard).join('');
  }

  function filterProducts() {
    const normalized = catalogQuery.trim().toLocaleLowerCase('pt-BR');
    return products.filter((product) => {
      const matchesCategory = catalogFilter === 'Todos' || product.category === catalogFilter;
      const matchesSearch = !normalized || `${product.name} ${product.description} ${product.category}`.toLocaleLowerCase('pt-BR').includes(normalized);
      return matchesCategory && matchesSearch;
    });
  }

  function renderHome() {
      const featured = ['bread', 'croissant', 'cake', 'brownie'].map(getProduct).filter(Boolean);
      return `${branchChooserPrompt()}<section class="home-hero"><div class="home-hero__copy"><p class="eyebrow">O MELHOR DO SEU DIA COMEÇA AQUI</p><h1 class="display-title">Um carinho<br>em cada <em>fornada.</em></h1><p class="home-hero__description">Pães artesanais, doces que abraçam e pequenos prazeres feitos para você.</p><div class="home-hero__actions"><a class="button button--dark" href="#/catalogo">Explorar a vitrine <span aria-hidden="true">↗</span></a><a class="button button--text" href="#/bolo">Monte seu bolo <span aria-hidden="true">↓</span></a></div><p class="home-hero__signature"><strong>✳</strong> ingredientes de verdade. Feito à mão.</p></div><div class="hero-art" role="img" aria-label="Croissants artesanais dourados e café coado"><div class="hero-art__plate"></div><div class="hero-art__cake"></div><div class="hero-art__sticker"><small>feito à</small><b>mão</b></div><span class="hero-art__caption">fresquinho, todos os dias <i>·</i> Maison</span></div></section><section class="home-section"><div class="page-shell"><div class="home-section__head"><div><p class="eyebrow">ESCOLHA SEU MOMENTO FAVORITO</p><h2 class="section-title">Nossa <em>vitrine</em></h2></div><a class="button button--outline button--small" href="#/catalogo">Ver todos os produtos ↗</a></div>${state.selectedBranch ? '' : '<p class="notice notice--pink">Você pode conhecer o catálogo, mas escolha uma filial para confirmar disponibilidade e adicionar itens.</p>'}<div class="product-grid">${featured.map(productCard).join('')}</div></div></section><section class="home-section home-section--tint"><div class="page-shell"><div class="home-section__head"><div><p class="eyebrow">DA NOSSA COZINHA PARA SUA MESA</p><h2 class="section-title">Feito à mão.<br><em>Todos os dias.</em></h2></div><a class="button button--text" href="#/avaliacoes">Leia histórias da casa ↗</a></div><div class="promise-grid"><article class="promise-card"><span class="promise-card__icon">✳</span><h3>Artesanal, de verdade</h3><p>Tempo, cuidado e bons ingredientes em cada receita.</p></article><article class="promise-card"><span class="promise-card__icon">♡</span><h3>Fresquinho todo dia</h3><p>Da nossa cozinha para a sua mesa, feito em pequenos lotes.</p></article><article class="promise-card"><span class="promise-card__icon">⌖</span><h3>Do seu jeito</h3><p>Retire na loja ou receba em casa, conforme sua filial.</p></article></div></div></section>`;
    }

  function renderBranches() {
    return `<section class="page-section page-shell"><header class="page-heading"><div class="page-heading__copy"><p class="eyebrow">ESCOLHA SUA LOJA</p><h1 class="section-title">Qual Maison fica <em>mais perto?</em></h1><p class="page-intro">A disponibilidade e o estoque são separados por filial. Escolha onde prefere retirar ou receber seu pedido.</p></div></header>${branches.length ? `<div class="branch-grid">${branches.map((branch) => `<article class="branch-card ${state.selectedBranch === branch.id ? 'branch-card--selected' : ''}"><span class="branch-card__mark" aria-hidden="true">⌖</span><h2>${escapeHTML(branch.name)}</h2><p>${escapeHTML(branch.address)}<br>${escapeHTML(branch.hours)}</p><button class="button ${state.selectedBranch === branch.id ? 'button--dark' : 'button--outline'} button--small" type="button" data-action="choose-branch" data-branch-id="${escapeHTML(branch.id)}">${state.selectedBranch === branch.id ? 'Sua filial selecionada ✓' : 'Escolher esta filial'}</button></article>`).join('')}</div>` : '<div class="empty-state">O backend respondeu sem filiais cadastradas. Cadastre uma em /api/filiais para habilitar compras; não substituímos uma resposta vazia por filiais fictícias.</div>'}<p class="notice" style="margin-top:18px">Seleção mantida neste navegador. A disponibilidade depende dos dados fornecidos pelo backend.</p></section>`;
  }

  function renderCatalog() {
    const categories = ['Todos', 'Pães', 'Bolos', 'Doces', 'Salgados', 'Combos'];
    return `<section class="page-section page-shell"><header class="page-heading"><div class="page-heading__copy"><p class="eyebrow">A VITRINE DA MAISON</p><h1 class="section-title">Da fornada <em>à sua mesa.</em></h1><p class="page-intro">Pães, doces, bolos e salgados preparados em pequenos lotes.</p></div><a class="button button--outline button--small" href="#/filial">${selectedBranch() ? `⌖ ${escapeHTML(selectedBranch().name)}` : '⌖ Escolher filial'}</a></header><div class="catalog-toolbar"><label class="search-box"><span class="skip-link">Buscar produtos</span><input id="catalog-search" type="search" value="${escapeHTML(catalogQuery)}" placeholder="Buscar pão, bolo, doce..." autocomplete="off"></label><span class="small-copy">${state.selectedBranch ? 'Disponibilidade atualizada para sua filial' : 'Escolha uma filial para comprar'}</span></div><div class="filter-list" aria-label="Filtrar por categoria">${categories.map((category) => `<button class="filter-chip" type="button" data-action="filter-category" data-category="${escapeHTML(category)}" aria-pressed="${catalogFilter === category}">${escapeHTML(category)}</button>`).join('')}</div><div class="product-grid" id="catalog-products" aria-live="polite">${productGridMarkup(filterProducts())}</div><div class="catalog-foot"><span>Produtos disponíveis para retirada ou entrega, conforme a filial.</span><a href="#/promocoes">Ver ofertas da semana ↗</a></div></section>`;
  }

  function renderPromotions() {
    const active = state.campaigns.filter((campaign) => campaign.active);
    return `<section class="page-section page-shell"><header class="page-heading"><div class="page-heading__copy"><p class="eyebrow">UM MIMO A MAIS</p><h1 class="section-title">Ofertas feitas <em>com carinho.</em></h1><p class="page-intro">Use um código na sacola antes de finalizar seu pedido. Promoções demonstrativas deste protótipo.</p></div><a class="button button--dark button--small" href="#/carrinho">Ir para a sacola ↗</a></header><div class="offer-grid">${active.map((campaign) => `<article class="offer-card"><span class="offer-card__flag">Oferta Maison</span><h2>${escapeHTML(campaign.name)}</h2><p>${escapeHTML(campaign.description)}</p><button class="coupon-code" type="button" data-action="use-coupon" data-code="${escapeHTML(campaign.code)}">${escapeHTML(campaign.code)} <span aria-hidden="true">＋</span></button></article>`).join('') || '<div class="empty-state">No momento não há campanhas ativas.</div>'}</div><p class="notice" style="margin-top:18px">Códigos são aplicados localmente e não representam um desconto cobrado em uma venda real.</p></section>`;
  }

  const builderSteps = [
    { title: 'Escolha o formato', hint: 'Uma forma especial para a sua comemoração.', key: 'shape', options: [{ value: 'Redondo', label: 'Redondo', detail: 'Clássico da casa' }, { value: 'Quadrado', label: 'Quadrado', detail: 'Para dividir em muitos pedaços' }, { value: 'Coração', label: 'Coração', detail: 'Um carinho em forma de bolo' }] },
    { title: 'Para quantas pessoas?', hint: 'O tamanho muda o número de fatias e o valor base.', key: 'size', options: [{ value: 15, label: '15 cm', detail: '10 fatias · pequeno', price: 120 }, { value: 20, label: '20 cm', detail: '20 fatias · médio', price: 180 }, { value: 25, label: '25 cm', detail: '30 fatias · grande', price: 240 }] },
    { title: 'Escolha a massa', hint: 'Assada no dia, com ingredientes de verdade.', key: 'dough', options: [{ value: 'Baunilha', label: 'Baunilha', detail: 'Leve e delicada' }, { value: 'Chocolate', label: 'Chocolate', detail: 'Cacau e conforto' }, { value: 'Red Velvet', label: 'Red Velvet', detail: 'Um toque aveludado', price: 15 }] },
    { title: 'Escolha até dois recheios', hint: 'O coração macio entre as camadas.', key: 'fillings', multiple: true, options: [{ value: 'Creme de Baunilha', label: 'Creme de baunilha' }, { value: 'Brigadeiro', label: 'Brigadeiro' }, { value: 'Doce de Leite', label: 'Doce de leite' }, { value: 'Morango', label: 'Morango' }] },
    { title: 'Acabamento e detalhes', hint: 'Finalize a decoração e deixe uma mensagem, se quiser.', key: 'frosting', options: [{ value: 'Branca', label: 'Creme branco' }, { value: 'Chocolate', label: 'Chocolate' }, { value: 'Naked', label: 'Naked cake' }, { value: 'Rosa delicado', label: 'Rosa delicado' }] }
  ];

  function cakePrice() {
    const sizeBase = { 15: 120, 20: 180, 25: 240 }[state.builder.size] || 120;
    return sizeBase + (state.builder.shape === 'Coração' ? 20 : 0) + (state.builder.dough === 'Red Velvet' ? 15 : 0) + state.builder.fillings.length * 10 + (state.builder.flowers ? 15 : 0) + (state.builder.berries ? 12 : 0) + (state.builder.message.trim() ? 8 : 0);
  }

  function renderBuilderStep() {
    const step = builderSteps[state.builder.step];
    const chosen = state.builder[step.key];
    const inputType = step.multiple ? 'checkbox' : 'radio';
    const options = step.options.map((option) => {
      const checked = step.multiple ? chosen.includes(option.value) : String(chosen) === String(option.value);
      const cost = option.price ? `+ ${money(option.price)}` : step.key === 'size' ? money(option.price) : 'incluso';
      return `<label class="choice"><input type="${inputType}" name="builder-choice" value="${escapeHTML(option.value)}" ${checked ? 'checked' : ''}><span class="choice__text">${escapeHTML(option.label)}${option.detail ? `<small>${escapeHTML(option.detail)}</small>` : ''}</span><span class="choice__price">${cost}</span></label>`;
    }).join('');
    const extras = state.builder.step === 4 ? `<hr class="divider"><div class="form-grid"><label class="field--inline"><input type="checkbox" data-builder-extra="flowers" ${state.builder.flowers ? 'checked' : ''}>Flores comestíveis <span class="small-copy">+ R$ 15</span></label><label class="field--inline"><input type="checkbox" data-builder-extra="berries" ${state.builder.berries ? 'checked' : ''}>Frutas vermelhas <span class="small-copy">+ R$ 12</span></label><label class="field full-width"><span class="field__label">Mensagem no bolo (opcional)</span><input type="text" data-builder-message maxlength="50" value="${escapeHTML(state.builder.message)}" placeholder="Feliz aniversário!"><small class="field__hint">Mensagem decorativa · + R$ 8</small></label></div>` : '';
    $('#builder-step-content').innerHTML = `<h2 tabindex="-1">${escapeHTML(step.title)}</h2><p>${escapeHTML(step.hint)}</p><div class="choice-grid">${options}</div>${extras}`;
    $('#builder-progress-label').textContent = `PASSO ${state.builder.step + 1} DE ${builderSteps.length}`;
    $('#builder-progress-name').textContent = step.title;
    $('.progress-track span').style.width = `${((state.builder.step + 1) / builderSteps.length) * 100}%`;
    $('.progress-track').setAttribute('aria-valuenow', String(state.builder.step + 1));
    $('#builder-back').disabled = state.builder.step === 0;
    $('#builder-next').innerHTML = state.builder.step === builderSteps.length - 1 ? 'Adicionar à sacola <span aria-hidden="true">♡</span>' : 'Próximo <span aria-hidden="true">→</span>';
    $('#builder-dots').innerHTML = builderSteps.map((_, index) => `<i class="${index === state.builder.step ? 'is-current' : ''}"${index === state.builder.step ? ' aria-current="step"' : ''}></i>`).join('');
    updateCakePreview();
  }

  function updateCakePreview() {
    const icing = { 'Creme branco': '#fff0e1', Chocolate: '#79574b', 'Naked cake': '#e6c79c', 'Rosa delicado': '#e8b5b2' }[state.builder.frosting] || '#fff0e1';
    const filling = state.builder.fillings.includes('Morango') ? '#b96370' : state.builder.fillings.includes('Doce de Leite') ? '#bf9363' : state.builder.fillings.includes('Brigadeiro') ? '#765047' : '#d29b82';
    $('.cake-illustration__tier').style.setProperty('--cake-icing', icing);
    $('.cake-illustration__tier').style.setProperty('--cake-filling', filling);
    $('.cake-preview__decor').textContent = `${state.builder.flowers ? '✿ ' : ''}${state.builder.berries ? '● ' : ''}${state.builder.frosting === 'Rosa delicado' ? '♡' : ''}`;
    $('#cake-preview-summary').textContent = `${state.builder.shape} · ${state.builder.size} cm · ${state.builder.dough} · ${state.builder.fillings.join(' + ') || 'sem recheio'}`;
    $('#cake-preview-price').textContent = money(cakePrice());
    $('#cake-preview-time').textContent = Number(state.builder.size) === 25 ? '3 dias' : '2 dias';
  }

  function renderBuilder() {
    return `<section class="page-section page-shell"><header class="page-heading"><div class="page-heading__copy"><p class="eyebrow">UM BOLO COM A SUA ASSINATURA</p><h1 class="section-title">Imagine. <em>A gente confeita.</em></h1><p class="page-intro">Monte cada detalhe e acompanhe o preço e a prévia do seu bolo.</p></div><span class="status-pill">Feito sob encomenda · 2 a 3 dias</span></header>${!state.selectedBranch ? '<p class="notice notice--pink">Escolha uma filial antes de adicionar o bolo à sacola. <a href="#/filial">Selecionar filial ↗</a></p>' : ''}<div class="builder-layout"><section class="builder-card" aria-label="Construtor de bolo"><div class="builder-card__progress"><div class="progress-copy"><strong id="builder-progress-label">Passo 1 de 5</strong><span id="builder-progress-name"></span></div><div class="progress-track" role="progressbar" aria-label="Progresso do construtor" aria-valuemin="1" aria-valuemax="5" aria-valuenow="1"><span></span></div></div><div class="builder-card__content" id="builder-step-content" aria-live="polite"></div><div class="builder-card__controls"><button class="button button--outline button--small" id="builder-back" data-action="builder-back" type="button">← Voltar</button><span class="builder-dots" id="builder-dots" aria-label="Etapas"></span><button class="button button--dark button--small" id="builder-next" data-action="builder-forward" type="button">Próximo →</button></div></section><aside class="cake-preview" aria-label="Prévia e preço do bolo"><div class="cake-preview__label"><span>SUA CRIAÇÃO</span><span aria-hidden="true">✳</span></div><div class="cake-illustration" aria-hidden="true"><div class="cake-illustration__plate"></div><div class="cake-illustration__tier"></div><span class="cake-preview__decor"></span></div><p class="cake-preview__summary" id="cake-preview-summary"></p><div class="cake-preview__estimate"><div><span>PREÇO ESTIMADO</span><strong id="cake-preview-price"></strong></div><div><span>FICA PRONTO EM</span><strong id="cake-preview-time"></strong></div></div><p class="small-copy">Estimativa demonstrativa; a loja confirma a encomenda.</p></aside></div></section>`;
  }

  function cartRow(item) {
    const product = getProduct(item.productId);
    const comboPrep = product?.combo ? `<label class="field"><span class="field__label">Preparo do combo</span><select data-preparation="${escapeHTML(item.id)}"><option value="" ${!item.preparation ? 'selected' : ''}>Escolha o preparo</option><option value="Frito" ${item.preparation === 'Frito' ? 'selected' : ''}>Frito na hora</option><option value="Congelado" ${item.preparation === 'Congelado' ? 'selected' : ''}>Congelado para depois</option></select></label>` : '';
    const cakeDescription = item.cake ? `${escapeHTML(item.cake.shape)} · ${escapeHTML(item.cake.size)} cm · ${escapeHTML(item.cake.dough)} · ${escapeHTML(item.cake.fillings.join(' + '))}${item.cake.frosting ? ` · cobertura ${escapeHTML(item.cake.frosting)}` : ''}` : escapeHTML(item.description || 'Feito com carinho pela Maison.');
    return `<article class="cart-row"><div class="cart-row__art" aria-hidden="true">${escapeHTML(item.icon || '🎂')}</div><div><h3>${escapeHTML(item.name)}</h3><p>${cakeDescription}</p>${comboPrep}<div class="quantity-control" aria-label="Quantidade de ${escapeHTML(item.name)}"><button type="button" data-action="quantity" data-item-id="${escapeHTML(item.id)}" data-delta="-1" aria-label="Diminuir quantidade">−</button><output>${item.quantity}</output><button type="button" data-action="quantity" data-item-id="${escapeHTML(item.id)}" data-delta="1" aria-label="Aumentar quantidade">+</button></div></div><div class="cart-row__end"><span class="cart-row__price">${money(item.price * item.quantity)}</span><button class="text-button" type="button" data-action="remove-item" data-item-id="${escapeHTML(item.id)}">Remover</button></div></article>`;
  }

  function renderCart() {
    const subtotal = cartSubtotal();
    const discount = couponDiscount(subtotal);
    const coupon = activeCoupon();
    return `<section class="page-section page-shell"><header class="page-heading"><div><p class="eyebrow">SUA SELEÇÃO</p><h1 class="section-title">Sua sacola <em>Maison.</em></h1><p class="page-intro">${state.selectedBranch ? `Filial ${escapeHTML(selectedBranch().name)} · ${escapeHTML(selectedBranch().address)}` : 'Escolha uma filial antes de finalizar o pedido.'}</p></div><a class="button button--outline button--small" href="#/catalogo">Continuar escolhendo ↗</a></header>${!state.selectedBranch ? '<div class="notice notice--pink">Para confirmar disponibilidade, <a href="#/filial">escolha uma filial</a>.</div>' : ''}${state.cart.length ? `<div class="cart-layout"><div class="cart-list">${state.cart.map(cartRow).join('')}</div><aside class="cart-summary"><h2>Resumo do pedido</h2><form class="coupon-form" data-form="coupon"><label class="skip-link" for="coupon-code">Código de oferta</label><input id="coupon-code" name="code" value="${escapeHTML(state.coupon || '')}" placeholder="CÓDIGO" autocomplete="off"><button class="button button--outline button--small" type="submit">Aplicar</button></form><p class="coupon-status">${coupon ? `${escapeHTML(coupon.code)} aplicado · ${escapeHTML(coupon.name)}` : state.coupon ? 'Esse código não está ativo.' : 'Tem um código? Aplique aqui.'}</p><div class="summary-line"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>${discount ? `<div class="summary-line"><span>Desconto</span><strong>− ${money(discount)}</strong></div>` : ''}<div class="summary-line"><span>Entrega estimada</span><strong>A calcular</strong></div><div class="summary-line summary-line--total"><span>Total estimado</span><strong>${money(subtotal - discount)}</strong></div><p class="small-copy">A entrega é simulada no próximo passo. Nenhum pagamento real será feito.</p><button class="button button--dark" type="button" data-action="go-checkout" ${!state.selectedBranch ? 'disabled' : ''}>Continuar para entrega <span aria-hidden="true">→</span></button></aside></div>` : '<div class="empty-state"><span class="empty-state__icon">♡</span><h2>Sua sacola ainda está vazia.</h2><p>Tem uma fornada esperando por você.</p><a class="button button--dark" href="#/catalogo">Conhecer a vitrine</a></div>'}</section>`;
  }

  function checkoutPage() {
    const subtotal = cartSubtotal();
    const discount = couponDiscount(subtotal);
    const valid = state.selectedBranch && state.cart.length > 0;
    return `<section class="page-section page-shell"><header class="page-heading"><div><p class="eyebrow">QUASE NA MESA</p><h1 class="section-title">Como prefere <em>receber?</em></h1><p class="page-intro">Filial ${escapeHTML(selectedBranch()?.name || 'não selecionada')} · escolha retirada ou entrega.</p></div><a class="button button--outline button--small" href="#/carrinho">← Voltar à sacola</a></header>${valid ? '' : '<div class="notice notice--pink">Sua sacola precisa ter itens e uma filial selecionada. <a href="#/filial">Escolher filial</a></div>'}${valid ? `<div class="checkout-layout"><form class="checkout-form" data-form="checkout"><h2>Seus dados</h2><div class="form-grid"><div class="field"><label for="checkout-name">Nome</label><input id="checkout-name" name="name" required autocomplete="name" value="${escapeHTML(state.user?.name || '')}"></div><div class="field"><label for="checkout-email">E-mail</label><input id="checkout-email" name="email" type="email" required autocomplete="email" value="${escapeHTML(state.user?.email || '')}"></div><div class="field full-width"><label>Receber pedido</label><div class="radio-row"><label class="radio-card"><input type="radio" name="method" value="delivery" checked> Entrega · R$ 12,00</label><label class="radio-card"><input type="radio" name="method" value="pickup"> Retirar na Maison</label></div></div><div class="field full-width" id="delivery-address-field"><label for="checkout-address">Endereço de entrega</label><input id="checkout-address" name="address" required autocomplete="street-address" placeholder="Rua, número, complemento e bairro"><p class="field__hint">A entrega é simulada. Confirme a região com a loja antes de um pedido real.</p></div><div class="field full-width"><label>Pagamento demonstrativo</label><div class="radio-row"><label class="radio-card"><input type="radio" name="payment" value="Pix" checked> Pix (simulado)</label><label class="radio-card"><input type="radio" name="payment" value="Cartão"> Cartão (simulado)</label><label class="radio-card"><input type="radio" name="payment" value="Na retirada"> Na retirada</label></div></div></div><p class="notice notice--pink">Protótipo local: pagamento demonstrativo, sem cobrança. Se a API não estiver disponível, o pedido fica somente neste navegador.</p><button class="button button--dark" type="submit">Confirmar pedido demonstrativo · ${money(subtotal - discount + deliveryFee())}</button></form><aside class="cart-summary"><h2>Seu pedido</h2>${state.cart.map((item) => `<div class="summary-line"><span>${item.quantity} × ${escapeHTML(item.name)}</span><strong>${money(item.price * item.quantity)}</strong></div>`).join('')}<hr class="divider"><div class="summary-line"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>${discount ? `<div class="summary-line"><span>Desconto</span><strong>− ${money(discount)}</strong></div>` : ''}<div class="summary-line"><span>Entrega</span><strong id="checkout-fee">${money(deliveryFee())}</strong></div><div class="summary-line summary-line--total"><span>Total</span><strong id="checkout-total">${money(subtotal - discount + deliveryFee())}</strong></div></aside></div>` : ''}</section>`;
  }

  const statusProgress = ['Recebido', 'Em preparo', 'Pronto', 'Concluído'];

  function orderCard(order, management = false) {
    const statusIndex = statusProgress.indexOf(order.status);
    const progress = statusProgress.map((_, index) => `<span class="${index <= statusIndex ? 'is-done' : ''}"></span>`).join('');
    const managerStatus = management ? `<label class="field"><span class="field__label">Atualizar status da demo</span><select data-order-status="${escapeHTML(order.id)}">${[...statusProgress, 'Cancelado'].map((status) => `<option ${order.status === status ? 'selected' : ''}>${escapeHTML(status)}</option>`).join('')}</select></label>` : '';
    return `<article class="order-card"><div class="order-card__head"><div><h2>Pedido ${escapeHTML(order.id)}</h2><span class="order-card__meta">${escapeHTML(order.createdAt)} · ${escapeHTML(order.branchName)}</span></div><span class="status-pill ${order.status === 'Cancelado' ? 'status-pill--off' : ''}">${escapeHTML(order.status)}</span></div><div class="order-progress" aria-label="Andamento do pedido">${progress}</div><p class="order-items">${order.items.map((item) => `${item.quantity} × ${escapeHTML(item.name)}`).join(' · ')}</p><div class="summary-line"><span>${escapeHTML(order.method === 'pickup' ? 'Retirada na loja' : 'Entrega demonstrativa')}</span><strong>${money(order.total)}</strong></div>${managerStatus}<p class="small-copy">${escapeHTML(order.statusMessage || 'Acompanhe por aqui. Este pedido foi criado no protótipo local.')}</p></article>`;
  }

  function renderOrders() {
    return `<section class="page-section page-shell"><header class="page-heading"><div><p class="eyebrow">DA MAISON ATÉ VOCÊ</p><h1 class="section-title">Pedidos & <em>acompanhamento.</em></h1><p class="page-intro">Histórico salvo apenas neste navegador.</p></div><a class="button button--outline button--small" href="#/conta">Minha conta</a></header>${state.orders.length ? state.orders.slice().reverse().map((order) => orderCard(order)).join('') : '<div class="empty-state"><span class="empty-state__icon">⌁</span><h2>Ainda não há pedidos por aqui.</h2><p>Seus pedidos demonstrativos vão aparecer nesta tela.</p><a class="button button--dark" href="#/catalogo">Escolher uma delícia</a></div>'}<p class="notice">Acompanhamento simulado. Esta tela não consulta transportadora nem sistema de pedidos real.</p></section>`;
  }

  function renderReviews() {
    const average = state.reviews.length ? (state.reviews.reduce((total, review) => total + Number(review.stars), 0) / state.reviews.length).toFixed(1).replace('.', ',') : '—';
    return `<section class="page-section page-shell"><header class="page-heading"><div><p class="eyebrow">BILHETINHOS DA NOSSA COMUNIDADE</p><h1 class="section-title">Palavras que <em>aqueceram a casa.</em></h1><p class="page-intro">Avaliações de demonstração e mensagens guardadas somente neste navegador.</p></div></header><div class="reviews-overview"><strong class="reviews-overview__score">${escapeHTML(average)}</strong><div><div class="stars" aria-label="Média das avaliações">★★★★★</div><span class="small-copy">${state.reviews.length} histórias na mesa</span></div></div><div class="review-list">${state.reviews.slice().reverse().map((review) => `<article class="review-card"><div class="review-card__head"><h3>${escapeHTML(review.name)}</h3><span class="stars" aria-label="${review.stars} de 5 estrelas">${'★'.repeat(Math.max(1, Math.min(5, Number(review.stars))))}</span></div><p>${escapeHTML(review.text)}</p><small>${escapeHTML(review.item)} · ${escapeHTML(review.date)}</small></article>`).join('')}</div><form class="review-form" data-form="review"><p class="eyebrow">CONTE COMO FOI</p><h2 class="section-title">Deixe seu carinho.</h2><div class="form-grid"><div class="field"><label for="review-name">Seu nome</label><input id="review-name" name="name" maxlength="40" required value="${escapeHTML(state.user?.name || '')}"></div><div class="field"><label for="review-stars">Sua nota</label><select id="review-stars" name="stars"><option value="5">5 estrelas</option><option value="4">4 estrelas</option><option value="3">3 estrelas</option><option value="2">2 estrelas</option><option value="1">1 estrela</option></select></div><div class="field full-width"><label for="review-text">Sua mensagem</label><textarea id="review-text" name="text" maxlength="300" required placeholder="O que você provou? Conte para a gente."></textarea></div></div><button class="button button--dark" type="submit">Publicar avaliação demo</button></form></section>`;
  }

  function authAside() {
    return '<aside class="auth-aside"><div><p class="eyebrow">A CASA É SUA</p><h2>Um bom momento merece ser guardado.</h2></div><p>Entre para rever pedidos e conversar com a equipe. Esta conta é apenas uma simulação salva neste navegador — não use uma senha importante.</p></aside>';
  }

  function renderAuth(mode = 'login') {
    const heading = mode === 'register' ? 'Crie sua conta demo' : mode === 'reset' ? 'Redefinir acesso demo' : 'Boas-vindas à Maison';
    let form;
    if (mode === 'register') form = `<form data-form="register"><div class="field"><label for="register-name">Seu nome</label><input id="register-name" name="name" required maxlength="60" autocomplete="name"></div><div class="field"><label for="register-email">E-mail</label><input id="register-email" name="email" required type="email" autocomplete="email"></div><div class="field"><label for="register-password">Senha demo</label><input id="register-password" name="password" required type="password" minlength="4" autocomplete="new-password"><p class="field__hint">A senha não será guardada. Este fluxo não cria autenticação segura.</p></div><button class="button button--dark" type="submit">Criar conta local</button><p class="small-copy">Já tem uma conta? <a href="#/login">Entrar ↗</a></p></form>`;
    else if (mode === 'reset') form = `<form data-form="reset"><div class="field"><label for="reset-email">E-mail cadastrado</label><input id="reset-email" name="email" type="email" required autocomplete="email"></div><button class="button button--dark" type="submit">Enviar instruções demonstrativas</button><p class="small-copy">Nenhum e-mail será enviado. <a href="#/login">Voltar ao acesso ↗</a></p></form>`;
    else form = `<form data-form="login"><div class="field"><label for="login-email">E-mail</label><input id="login-email" name="email" type="email" required autocomplete="email" placeholder="voce@email.com"></div><div class="field"><label for="login-password">Senha</label><input id="login-password" name="password" type="password" required autocomplete="current-password"><p class="field__hint">Digite qualquer senha demo. Ela não será armazenada.</p></div><button class="button button--dark" type="submit">Entrar no protótipo</button><p class="small-copy"><a href="#/cadastro">Criar conta</a> · <a href="#/redefinir">Esqueci minha senha</a></p></form><div class="divider"></div><p class="field__label">Acessos de demonstração (sem senha)</p><div class="demo-roles"><button class="button button--outline button--small" type="button" data-action="quick-role" data-role="customer">Cliente demo</button><button class="button button--outline button--small" type="button" data-action="quick-role" data-role="employee">Equipe demo</button><button class="button button--outline button--small" type="button" data-action="quick-role" data-role="admin">Admin demo</button></div>`;
    return `<section class="page-section page-shell"><div class="auth-layout">${authAside()}<div class="auth-main"><p class="eyebrow">ÁREA DA COMUNIDADE</p><h1>${heading}</h1><nav class="auth-tabs" aria-label="Opções de conta"><a href="#/login" ${mode === 'login' ? 'aria-current="page"' : ''}>Entrar</a><a href="#/cadastro" ${mode === 'register' ? 'aria-current="page"' : ''}>Criar conta</a><a href="#/redefinir" ${mode === 'reset' ? 'aria-current="page"' : ''}>Redefinir</a></nav>${form}</div></div></section>`;
  }

  function renderAccount() {
    if (!state.user) return `<section class="page-section page-shell"><div class="empty-state"><span class="empty-state__icon">♡</span><h1 class="section-title">Sua conta, do seu jeito.</h1><p>Entre em modo demonstração para ver dados de perfil locais.</p><a class="button button--dark" href="#/login">Entrar na conta demo</a></div></section>`;
    const roleLabel = { customer: 'Cliente demo', employee: 'Equipe demo', admin: 'Admin demo' }[state.user.role] || 'Cliente demo';
    return `<section class="page-section page-shell"><header class="page-heading"><div><p class="eyebrow">BEM-VINDA À MESA</p><h1 class="section-title">Olá, <em>${escapeHTML(state.user.name || 'Maison')}</em>.</h1><p class="page-intro">${escapeHTML(state.user.email)} · ${roleLabel} (modo local)</p></div><button class="button button--outline button--small" type="button" data-action="logout">Sair da conta demo</button></header><div class="profile-layout"><nav class="account-menu" aria-label="Minha conta"><a href="#/conta" aria-current="page">Meu perfil</a><a href="#/pedidos">Meus pedidos</a><a href="#/suporte">Falar com a Maison</a>${['employee', 'admin'].includes(state.user.role) ? '<a href="#/gestao">Área da equipe</a>' : ''}</nav><form class="panel" data-form="profile"><p class="eyebrow">DADOS LOCAIS</p><h2 class="section-title">Seu perfil</h2><div class="form-grid" style="margin-top:18px"><div class="field"><label for="profile-name">Nome</label><input id="profile-name" name="name" required maxlength="60" value="${escapeHTML(state.user.name)}"></div><div class="field"><label for="profile-email">E-mail</label><input id="profile-email" name="email" type="email" required value="${escapeHTML(state.user.email)}"></div><div class="field"><label for="profile-phone">Telefone</label><input id="profile-phone" name="phone" type="tel" autocomplete="tel" value="${escapeHTML(state.user.phone || '')}" placeholder="(11) 90000-0000"></div></div><button class="button button--dark" type="submit">Salvar neste navegador</button><p class="small-copy" style="margin-top:15px">Informações simuladas: não são enviadas nem protegidas por uma conta real.</p></form></div></section>`;
  }

  function renderChat() {
    const messages = state.chat.length ? state.chat : [{ id: 'hello', from: 'support', text: `Olá${state.user?.name ? `, ${state.user.name}` : ''}! Como podemos deixar seu dia mais gostoso?`, time: 'Agora' }];
    return `<section class="page-section page-shell"><header class="page-heading"><div><p class="eyebrow">ESTAMOS POR AQUI</p><h1 class="section-title">Conversa de <em>balcão.</em></h1><p class="page-intro">Tire uma dúvida e receba uma resposta automática de demonstração.</p></div></header><div class="chat-shell"><div class="chat-head"><span class="chat-head__online" aria-hidden="true"></span><div><strong>Atendimento Maison</strong><small>Respostas simuladas · não é um canal monitorado</small></div></div><div class="chat-messages" id="chat-messages" aria-live="polite">${messages.map((message) => `<div class="chat-message ${message.from === 'customer' ? 'chat-message--mine' : ''}">${escapeHTML(message.text)}<small>${message.from === 'customer' ? 'Você' : 'Maison'} · ${escapeHTML(message.time || 'Agora')}</small></div>`).join('')}</div><form class="chat-form" data-form="chat"><label class="skip-link" for="chat-input">Escreva sua mensagem</label><input id="chat-input" name="message" maxlength="500" required placeholder="Escreva uma mensagem..."><button class="button button--dark button--small" type="submit">Enviar</button></form></div><p class="notice" style="margin-top:14px">Não envie dados sensíveis. Se /api/mensagens responder, seu texto será enviado ao backend demonstrativo; a resposta automática permanece fictícia.</p></section>`;
  }

  function renderManagement(tab = 'inicio') {
    const allowed = ['admin', 'employee'].includes(state.user?.role);
    if (!allowed) return `<section class="page-section page-shell"><div class="empty-state"><span class="empty-state__icon">⌂</span><h1 class="section-title">Espaço de <em>gestão demo.</em></h1><p>Entre em um perfil de equipe para experimentar estoque, campanhas, pedidos e contas fictícias.</p><button class="button button--dark" type="button" data-action="quick-role" data-role="admin">Entrar como admin demo</button><p class="small-copy">Papéis e permissões existem apenas no protótipo do navegador.</p></div></section>`;
    const tabs = [['inicio', 'Resumo'], ['estoque', 'Estoque'], ['campanhas', 'Campanhas'], ['pedidos', 'Pedidos'], ['contas', 'Contas']];
    let content = '';
    if (tab === 'inicio') {
      const totalOrders = state.orders.length;
      const pending = state.orders.filter((order) => !['Concluído', 'Cancelado'].includes(order.status)).length;
      const branch = selectedBranch();
      content = `<div class="metric-grid"><article class="metric-card"><span>Pedidos demo</span><strong>${totalOrders}</strong></article><article class="metric-card"><span>Em andamento</span><strong>${pending}</strong></article><article class="metric-card"><span>Itens na vitrine</span><strong>${products.length}</strong></article><article class="metric-card"><span>Filial selecionada</span><strong>${escapeHTML(branch?.name || '—')}</strong></article></div><div class="panel"><p class="eyebrow">FERRAMENTAS DA EQUIPE</p><h2 class="section-title">Uma visão rápida da casa.</h2><p class="page-intro">Os ajustes abaixo alteram somente os dados salvos neste navegador.</p><div class="button-row" style="margin-top:18px"><a class="button button--outline button--small" href="#/gestao/estoque">Atualizar estoque</a><a class="button button--outline button--small" href="#/gestao/campanhas">Criar campanha</a><a class="button button--outline button--small" href="#/gestao/pedidos">Ver pedidos</a><a class="button button--outline button--small" href="#/gestao/contas">Contas demo</a></div></div>`;
    } else if (tab === 'estoque') content = renderInventoryManagement();
    else if (tab === 'campanhas') content = renderCampaignManagement();
    else if (tab === 'pedidos') content = state.orders.length ? state.orders.slice().reverse().map((order) => orderCard(order, true)).join('') : '<div class="empty-state">Os pedidos de demonstração aparecem aqui depois da finalização.</div>';
    else if (tab === 'contas') content = renderAccountsManagement();
    else content = '<div class="empty-state">Escolha uma área de gestão no menu.</div>';
    return `<section class="page-section page-shell"><header class="management-hero"><div><p class="eyebrow">AMBIENTE LOCAL DE TESTE · SEM DADOS REAIS</p><h1>Gestão da Maison</h1><p>Você está usando o perfil ${state.user.role === 'admin' ? 'Admin' : 'Equipe'} demo. Alterações ficam neste navegador.</p></div><button class="button button--outline button--small" type="button" data-action="logout">Sair do perfil demo</button></header><nav class="management-tabs" aria-label="Seções da gestão">${tabs.map(([id, label]) => `<a href="#/gestao/${id === 'inicio' ? '' : id}" ${tab === id ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>${content}</section>`;
  }

  function renderInventoryManagement() {
    const branch = selectedBranch() || branches[0];
    if (!branch) return '<div class="empty-state">Cadastre uma filial no backend para editar o estoque local demonstrativo.</div>';
    return `<div class="page-heading"><div><p class="eyebrow">ESTOQUE POR FILIAL</p><h2 class="section-title">Disponibilidade de hoje.</h2><p class="page-intro">Altere preço, quantidade ou disponibilidade. Estoque inicial fictício: 20 unidades por produto.</p></div><a class="button button--outline button--small" href="#/filial">Filial: ${escapeHTML(branch.name)} · trocar</a></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Produto</th><th>Preço (R$)</th><th>Unidades</th><th>Disponibilidade</th><th>Visível</th><th></th></tr></thead><tbody>${products.map((product) => {
      const row = inventoryRecord(product.id, branch.id);
      const quantity = Number.isInteger(Number(row.qty)) ? Number(row.qty) : 20;
      const status = quantity === 0 ? 'ESGOTADO' : row.status || 'DISPONIVEL';
      const formId = `inventory-${product.id}`;
      return `<tr><td><span class="admin-product"><span class="admin-product__icon" aria-hidden="true">${escapeHTML(product.icon)}</span>${escapeHTML(product.name)}</span><form id="${escapeHTML(formId)}" data-form="inventory" data-product-id="${escapeHTML(product.id)}" data-branch-id="${escapeHTML(branch.id)}"></form></td><td><input form="${escapeHTML(formId)}" name="price" type="number" min="0.01" step="0.01" required value="${productPrice(product, branch.id)}" aria-label="Preço de ${escapeHTML(product.name)}"></td><td><input form="${escapeHTML(formId)}" name="qty" type="number" min="0" step="1" value="${quantity}" aria-label="Estoque de ${escapeHTML(product.name)}"></td><td><select form="${escapeHTML(formId)}" name="status" aria-label="Disponibilidade de ${escapeHTML(product.name)}"><option value="DISPONIVEL" ${status === 'DISPONIVEL' ? 'selected' : ''}>Disponível</option><option value="ESGOTADO" ${status === 'ESGOTADO' ? 'selected' : ''}>Esgotado</option><option value="EM_PRODUCAO" ${status === 'EM_PRODUCAO' ? 'selected' : ''}>Em produção</option></select></td><td><input form="${escapeHTML(formId)}" name="active" type="checkbox" ${row.active !== false ? 'checked' : ''} aria-label="Produto visível"></td><td><button class="button button--outline button--small" form="${escapeHTML(formId)}" type="submit">Salvar</button></td></tr>`;
    }).join('')}</tbody></table></div><p class="notice" style="margin-top:14px">Uma quantidade zero sempre aparece como esgotado. Este estoque não é sincronizado com a loja real.</p>`;
  }

  function renderCampaignManagement() {
    return `<div class="page-heading"><div><p class="eyebrow">VANTAGENS DA CASA</p><h2 class="section-title">Campanhas locais.</h2><p class="page-intro">Crie ou ative códigos usados somente no carrinho deste protótipo.</p></div></div><form class="management-form" data-form="campaign"><h2>Nova campanha</h2><div class="form-grid"><div class="field"><label for="campaign-name">Nome</label><input id="campaign-name" name="name" required maxlength="60"></div><div class="field"><label for="campaign-code">Código</label><input id="campaign-code" name="code" required maxlength="16" pattern="[A-Za-z0-9]+"></div><div class="field"><label for="campaign-description">Descrição</label><input id="campaign-description" name="description" required maxlength="100"></div><div class="field"><label for="campaign-type">Desconto</label><select id="campaign-type" name="type"><option value="percent">Percentual</option><option value="fixed">Valor em reais</option><option value="cake">Percentual para bolos</option></select></div><div class="field"><label for="campaign-value">Valor</label><input id="campaign-value" name="value" type="number" min="1" max="100" step="1" required></div></div><button class="button button--dark" type="submit">Salvar campanha demo</button></form><div class="offer-grid">${state.campaigns.map((campaign) => `<article class="offer-card"><span class="offer-card__flag">${campaign.active ? 'Ativa' : 'Pausada'}</span><h2>${escapeHTML(campaign.name)}</h2><p>${escapeHTML(campaign.description)} · ${escapeHTML(campaign.code)}</p><button class="button button--outline button--small" type="button" data-action="toggle-campaign" data-campaign-id="${escapeHTML(campaign.id)}">${campaign.active ? 'Pausar' : 'Ativar'}</button></article>`).join('')}</div>`;
  }

  function renderAccountsManagement() {
    const accounts = [...state.accounts];
    if (state.user && !accounts.some((account) => account.email === state.user.email)) accounts.unshift({ ...state.user });
    return `<div class="page-heading"><div><p class="eyebrow">CONTAS FICTÍCIAS</p><h2 class="section-title">Perfis da comunidade.</h2><p class="page-intro">Os papéis abaixo são apenas para testar as telas. Não concedem permissões reais.</p></div></div>${accounts.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Nome</th><th>E-mail</th><th>Perfil demo</th><th></th></tr></thead><tbody>${accounts.map((account, index) => { const formId = `account-role-${index}`; return `<tr><td>${escapeHTML(account.name)}</td><td>${escapeHTML(account.email)}<form id="${formId}" data-form="account-role" data-account-email="${escapeHTML(account.email)}"></form></td><td><select form="${formId}" name="role" aria-label="Perfil de ${escapeHTML(account.name)}"><option value="customer" ${account.role === 'customer' ? 'selected' : ''}>Cliente</option><option value="employee" ${account.role === 'employee' ? 'selected' : ''}>Equipe</option><option value="admin" ${account.role === 'admin' ? 'selected' : ''}>Admin</option></select></td><td><button class="button button--outline button--small" form="${formId}" type="submit">Salvar</button></td></tr>`; }).join('')}</tbody></table></div>` : '<div class="empty-state">Nenhuma conta fictícia foi criada neste navegador.</div>'}`;
  }

  function render() {
    updateHeader();
    const path = routePath().split('?')[0].replace(/\/$/, '') || '/';
    const parts = path.split('/').filter(Boolean);
    const route = parts[0] || 'inicio';
    if (route === 'inicio') app.innerHTML = renderHome();
    else if (route === 'filial') app.innerHTML = renderBranches();
    else if (route === 'catalogo') app.innerHTML = renderCatalog();
    else if (route === 'promocoes') app.innerHTML = renderPromotions();
    else if (route === 'bolo') app.innerHTML = renderBuilder();
    else if (route === 'carrinho') app.innerHTML = renderCart();
    else if (route === 'checkout') app.innerHTML = checkoutPage();
    else if (route === 'pedidos') app.innerHTML = renderOrders();
    else if (route === 'avaliacoes') app.innerHTML = renderReviews();
    else if (route === 'login') app.innerHTML = state.user ? renderAccount() : renderAuth('login');
    else if (route === 'cadastro') app.innerHTML = renderAuth('register');
    else if (route === 'redefinir') app.innerHTML = renderAuth('reset');
    else if (route === 'conta') app.innerHTML = renderAccount();
    else if (route === 'suporte') app.innerHTML = renderChat();
    else if (route === 'gestao') app.innerHTML = renderManagement(parts[1] || 'inicio');
    else app.innerHTML = `<section class="page-section page-shell"><div class="empty-state"><h1 class="section-title">Essa página ainda não chegou à Maison.</h1><a class="button button--dark" href="#/">Voltar ao início</a></div></section>`;
    if (route === 'bolo') renderBuilderStep();
    if (route === 'suporte') $('#chat-messages').scrollTop = $('#chat-messages').scrollHeight;
  }

  function addProduct(productId) {
    if (!state.selectedBranch) {
      showToast('Escolha uma filial para ver disponibilidade e adicionar itens.');
      window.location.hash = '#/filial';
      return;
    }
    const product = getProduct(productId);
    if (!product) return;
    const existing = state.cart.find((item) => item.productId === product.id && !item.cake);
    const stock = productStock(product);
    if (stock < (existing?.quantity || 0) + 1) { showToast('Esse item está esgotado ou não há unidades suficientes nesta filial.'); return; }
    if (existing) existing.quantity += 1;
    else state.cart.push({ id: `item-${Date.now()}-${Math.random().toString(16).slice(2)}`, productId: product.id, name: product.name, description: product.description, icon: product.icon, price: productPrice(product), quantity: 1, preparation: '' });
    saveState(); render(); showToast(`${product.name} foi para a sacola.`);
  }

  function addCake() {
    if (!state.selectedBranch) { showToast('Escolha uma filial antes de encomendar seu bolo.'); window.location.hash = '#/filial'; return; }
    const config = { ...state.builder, fillings: [...state.builder.fillings] };
    const details = `${config.shape} · ${config.size} cm · ${config.dough} · ${config.fillings.join(' + ')}${config.flowers ? ' · flores comestíveis' : ''}${config.berries ? ' · frutas vermelhas' : ''}${config.message.trim() ? ` · mensagem: ${config.message.trim()}` : ''}`;
    state.cart.push({ id: `cake-${Date.now()}`, name: `Bolo Maison personalizado`, description: details, icon: '🎂', price: cakePrice(), quantity: 1, cake: config });
    state.builder = structuredClone(defaultState.builder);
    saveState(); window.location.hash = '#/carrinho'; showToast('Seu bolo personalizado foi para a sacola.');
  }

  function quantityChange(itemId, delta) {
    const item = state.cart.find((cartItem) => cartItem.id === itemId);
    if (!item) return;
    if (delta > 0 && item.productId) {
      const product = getProduct(item.productId);
      if (productStock(product) <= item.quantity) { showToast('Não há mais unidades disponíveis nesta filial.'); return; }
    }
    item.quantity += delta;
    if (item.quantity <= 0) state.cart = state.cart.filter((cartItem) => cartItem.id !== itemId);
    saveState(); render();
  }

  function addAccount(account) {
    const existing = state.accounts.findIndex((item) => item.email.toLowerCase() === account.email.toLowerCase());
    if (existing >= 0) state.accounts[existing] = { ...state.accounts[existing], ...account };
    else state.accounts.push(account);
  }

  async function checkout(form) {
    if (!state.selectedBranch || !state.cart.length) { showToast('Adicione itens e escolha uma filial primeiro.'); window.location.hash = '#/carrinho'; return; }
    if (state.cart.some((item) => getProduct(item.productId)?.combo && !item.preparation)) { showToast('Escolha o preparo de cada combo na sacola.'); window.location.hash = '#/carrinho'; return; }
    const unavailable = state.cart.find((item) => item.productId && (productStock(getProduct(item.productId)) < item.quantity || !isProductAvailable(getProduct(item.productId))));
    if (unavailable) { showToast(`${unavailable.name} não tem estoque suficiente. Ajuste sua sacola.`); window.location.hash = '#/carrinho'; return; }
    const data = new FormData(form);
    const method = data.get('method') === 'pickup' ? 'pickup' : 'delivery';
    const branch = selectedBranch();
    const subtotal = cartSubtotal();
    const discount = couponDiscount(subtotal);
    const delivery = deliveryFee(method);
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    const orderName = String(data.get('name') || '').trim();
    const orderEmail = String(data.get('email') || '').trim();
    const orderAddress = method === 'pickup' ? `Retirada na filial ${branch.name} · ${branch.address}` : String(data.get('address') || '').trim();
    const apiResult = await API.optional('/api/encomendas', {
      method: 'POST',
      body: {
        nome: orderName,
        endereco: orderAddress,
        contato: orderEmail,
        itens: state.cart.map((item) => ({
          nome: `${item.name}${item.description ? ` · ${item.description}` : ''}${item.preparation ? ` · preparo: ${item.preparation}` : ''}`.slice(0, 160),
          quantidade: item.quantity,
          precoUnitario: Number(item.price.toFixed(2))
        })),
        total: Number(Math.max(0, subtotal - discount + delivery).toFixed(2)),
        status: 'RECEBIDA'
      }
    });
    if (!apiResult.ok && !apiResult.unreachable) {
      if (submitButton) submitButton.disabled = false;
      showToast(`Backend recusou a encomenda (${apiResult.status || 'erro'}). Sacola mantida; não criamos um pedido demo.`);
      return;
    }
    // Only network unavailability permits a local order; HTTP errors are surfaced without pretending success.
    const apiOrder = apiResult.ok && apiResult.data && (typeof apiResult.data.id === 'string' || typeof apiResult.data.id === 'number') ? apiResult.data : null;
    if (apiResult.ok && !apiOrder) {
      if (submitButton) submitButton.disabled = false;
      showToast('O backend respondeu, mas faltou o identificador da encomenda. Nada foi salvo localmente.');
      return;
    }
    let chargeResult = null;
    if (apiOrder && Number.isFinite(Number(apiOrder.id))) {
      chargeResult = await API.optional('/api/cobrancas', {
        method: 'POST',
        body: { encomendaId: Number(apiOrder.id), valor: Number(Math.max(0, subtotal - discount + delivery).toFixed(2)), metodo: String(data.get('payment') || 'Pix') }
      });
    }
    const responseDate = apiOrder?.criadaEm ? new Date(apiOrder.criadaEm) : new Date();
    const responseStatus = apiOrder?.status === 'RECEBIDA' ? 'Recebido' : apiOrder?.status;
    const order = {
      id: apiOrder ? String(apiOrder.id) : `DEMO-${String(Date.now()).slice(-7)}`,
      createdAt: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(Number.isNaN(responseDate.getTime()) ? new Date() : responseDate),
      branchId: branch.id,
      branchName: branch.name,
      name: orderName,
      email: orderEmail,
      address: orderAddress,
      method,
      payment: String(data.get('payment') || 'Pix'),
      items: state.cart.map((item) => ({ name: item.name, price: item.price, quantity: item.quantity, preparation: item.preparation || '' })),
      subtotal,
      discount,
      deliveryFee: deliveryFee(method),
      total: Math.max(0, subtotal - discount + deliveryFee(method)),
      status: apiOrder && statusProgress.includes(responseStatus) ? responseStatus : 'Recebido',
      statusMessage: apiOrder ? `Encomenda salva no backend ${chargeResult?.ok ? 'e registro de cobrança demo criado' : '· cobrança demo não confirmada pelo backend'}. Pagamento não processado.` : 'API de encomendas indisponível ou sem o contrato esperado. Registro salvo apenas neste navegador; nenhuma cobrança foi feita.'
    };
    for (const item of state.cart) {
      if (!item.productId) continue;
      const current = inventoryRecord(item.productId, branch.id);
      const qty = productStock(getProduct(item.productId), branch.id) - item.quantity;
      state.inventory[branch.id] ||= {};
      state.inventory[branch.id][item.productId] = { ...current, qty, status: qty === 0 ? 'ESGOTADO' : current.status || 'DISPONIVEL' };
    }
    state.orders.push(order);
    if (state.user) state.user = { ...state.user, name: order.name, email: order.email };
    state.cart = [];
    state.coupon = null;
    saveState();
    window.location.hash = '#/pedidos';
    showToast(apiOrder ? `Encomenda ${order.id} salva no backend; pagamento não processado.` : `API indisponível: pedido ${order.id} salvo somente em modo local.`);
  }

  function mockReply(message) {
    const normalized = message.toLocaleLowerCase('pt-BR');
    if (normalized.includes('pedido') || normalized.includes('entrega')) return 'Posso ajudar! Acompanhe pedidos demo na área Pedidos. Para uma entrega real, fale diretamente com a filial escolhida.';
    if (normalized.includes('bolo') || normalized.includes('encomenda')) return 'Que delícia! O construtor mostra uma previsão de 2 a 3 dias. Esta resposta é automática e não confirma uma encomenda real.';
    if (normalized.includes('horário') || normalized.includes('filial')) return 'Nossas lojas demo funcionam todos os dias, das 7h às 20h. Selecione uma filial para ver o endereço completo.';
    return 'Obrigada por escrever para a Maison! Esta resposta automática é só uma demonstração. Para atendimento real, consulte sua loja.';
  }

  async function sendSupportMessage(message) {
    const now = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date());
    const response = await API.optional('/api/mensagens', {
      method: 'POST',
      body: { nome: state.user?.name || 'Visitante Maison', email: state.user?.email || null, contato: state.user?.phone || null, texto: message }
    });
    if (!response.ok && !response.unreachable) {
      showToast(`O backend recusou a mensagem (${response.status || 'erro'}); a conversa não foi substituída por mock.`);
      return;
    }
    state.chat.push({ id: `chat-${Date.now()}`, from: 'customer', text: message, time: now });
    saveState(); render();
    showToast(response.ok ? 'Mensagem salva no backend demonstrativo; resposta automática.' : 'Backend offline: conversa mantida só neste navegador.');
    window.setTimeout(() => {
      state.chat.push({ id: `reply-${Date.now()}`, from: 'support', text: mockReply(message), time: 'Agora' });
      saveState();
      if (routePath().startsWith('/suporte')) { render(); $('#chat-messages').scrollTop = $('#chat-messages').scrollHeight; }
    }, 450);
  }

  // Ações de tela centralizadas mantêm a navegação acessível e evitam handlers inline no HTML.
  document.addEventListener('click', (event) => {
    const menuButton = event.target.closest('.menu-toggle');
    if (menuButton) {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
      $('.primary-nav').classList.toggle('is-open', !expanded);
      return;
    }
    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) return;
    const { action } = actionButton.dataset;
    if (action === 'choose-branch') {
      state.selectedBranch = actionButton.dataset.branchId;
      saveState(); render(); showToast(`Filial ${selectedBranch().name} selecionada.`);
    } else if (action === 'add-product') addProduct(actionButton.dataset.productId);
    else if (action === 'quantity') quantityChange(actionButton.dataset.itemId, Number(actionButton.dataset.delta));
    else if (action === 'remove-item') { state.cart = state.cart.filter((item) => item.id !== actionButton.dataset.itemId); saveState(); render(); showToast('Item removido da sacola.'); }
    else if (action === 'filter-category') {
      catalogFilter = actionButton.dataset.category;
      $$('.filter-chip').forEach((chip) => chip.setAttribute('aria-pressed', String(chip === actionButton)));
      const grid = $('#catalog-products');
      if (grid) grid.innerHTML = productGridMarkup(filterProducts());
    } else if (action === 'go-checkout') {
      if (!state.selectedBranch) { showToast('Escolha uma filial antes de continuar.'); window.location.hash = '#/filial'; }
      else window.location.hash = '#/checkout';
    } else if (action === 'use-coupon') {
      state.coupon = actionButton.dataset.code;
      saveState(); window.location.hash = '#/carrinho'; showToast(`Código ${state.coupon} selecionado.`);
    } else if (action === 'quick-role') {
      const role = actionButton.dataset.role;
      const email = role === 'admin' ? 'admin@maison.demo' : role === 'employee' ? 'equipe@maison.demo' : 'cliente@maison.demo';
      const name = role === 'admin' ? 'Equipe Maison' : role === 'employee' ? 'Atendimento Maison' : 'Cliente Maison';
      state.user = { name, email, role, phone: '' };
      addAccount(state.user); saveState();
      window.location.hash = role === 'admin' || role === 'employee' ? '#/gestao' : '#/conta';
      showToast('Perfil fictício ativado apenas neste navegador.');
    } else if (action === 'logout') {
      state.user = null; saveState(); window.location.hash = '#/'; showToast('Você saiu do perfil demo.');
    } else if (action === 'toggle-campaign') {
      const campaign = state.campaigns.find((item) => item.id === actionButton.dataset.campaignId);
      if (campaign) { campaign.active = !campaign.active; saveState(); render(); showToast('Campanha atualizada neste navegador.'); }
    } else if (action === 'builder-back' || action === 'builder-forward') {
      if (action === 'builder-back' && state.builder.step > 0) state.builder.step -= 1;
      if (action === 'builder-forward' && state.builder.step < builderSteps.length - 1) state.builder.step += 1;
      else if (action === 'builder-forward' && state.builder.step === builderSteps.length - 1) { addCake(); return; }
      saveState(); render(); $('#builder-step-content h2')?.focus();
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target.id === 'catalog-search') {
      catalogQuery = event.target.value;
      const grid = $('#catalog-products');
      if (grid) grid.innerHTML = productGridMarkup(filterProducts());
    }
    if (event.target.matches('[data-builder-message]')) {
      state.builder.message = event.target.value.slice(0, 50);
      updateCakePreview();
    }
  });

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (target.name === 'builder-choice') {
      const step = builderSteps[state.builder.step];
      if (step.multiple) {
        const value = target.value;
        if (target.checked && state.builder.fillings.length >= 2) {
          target.checked = false; showToast('Escolha no máximo dois recheios.'); return;
        }
        state.builder.fillings = target.checked ? [...state.builder.fillings, value] : state.builder.fillings.filter((filling) => filling !== value);
      } else state.builder[step.key] = step.key === 'size' ? Number(target.value) : target.value;
      saveState(); updateCakePreview();
    }
    if (target.matches('[data-builder-extra]')) {
      state.builder[target.dataset.builderExtra] = target.checked;
      saveState(); updateCakePreview();
    }
    if (target.matches('[data-preparation]')) {
      const item = state.cart.find((cartItem) => cartItem.id === target.dataset.preparation);
      if (item) { item.preparation = target.value; saveState(); }
    }
    if (target.name === 'method') {
      const pickup = target.value === 'pickup';
      const address = $('#checkout-address');
      if (address) { address.required = !pickup; address.disabled = pickup; }
      const fee = $('#checkout-fee');
      const total = $('#checkout-total');
      if (fee && total) {
        const methodFee = deliveryFee(pickup ? 'pickup' : 'delivery');
        fee.textContent = money(methodFee);
        total.textContent = money(cartSubtotal() - couponDiscount() + methodFee);
        $('[data-form="checkout"] button[type="submit"]').textContent = `Confirmar pedido demonstrativo · ${money(cartSubtotal() - couponDiscount() + methodFee)}`;
      }
    }
    if (target.matches('[data-order-status]')) {
      const order = state.orders.find((item) => item.id === target.dataset.orderStatus);
      if (order) { order.status = target.value; order.statusMessage = 'Status alterado manualmente pela gestão demo.'; saveState(); render(); showToast('Status do pedido demo atualizado.'); }
    }
  });

  document.addEventListener('submit', (event) => {
    const form = event.target.closest('form[data-form]');
    if (!form) return;
    event.preventDefault();
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    if (form.dataset.form === 'coupon') {
      const code = String(values.code || '').trim().toUpperCase();
      const campaign = state.campaigns.find((item) => item.active && item.code.toUpperCase() === code);
      if (!campaign) showToast('Não encontramos esse código ativo. Veja as ofertas da Maison.');
      else { state.coupon = campaign.code; saveState(); render(); showToast(`${campaign.code} aplicado à sacola.`); }
    } else if (form.dataset.form === 'checkout') checkout(form);
    else if (form.dataset.form === 'login') {
      const email = String(values.email).trim().toLowerCase();
      const account = state.accounts.find((item) => item.email.toLowerCase() === email);
      state.user = account ? { ...account } : { name: email.split('@')[0].replace(/[._-]/g, ' '), email, role: 'customer', phone: '' };
      addAccount(state.user); saveState(); window.location.hash = '#/conta'; showToast('Acesso demo iniciado. Isso não é uma autenticação segura.');
    } else if (form.dataset.form === 'register') {
      const email = String(values.email).trim().toLowerCase();
      if (state.accounts.some((item) => item.email.toLowerCase() === email)) { showToast('Já existe uma conta demo com esse e-mail neste navegador.'); return; }
      state.user = { name: String(values.name).trim(), email, role: 'customer', phone: '' };
      addAccount(state.user); saveState(); window.location.hash = '#/conta'; showToast('Conta demo criada localmente. Senha descartada; nenhum cadastro real foi enviado.');
    } else if (form.dataset.form === 'reset') {
      showToast('Se este endereço existir, as instruções apareceriam aqui (demonstração local; nenhum e-mail enviado).'); form.reset();
    } else if (form.dataset.form === 'profile') {
      state.user = { ...state.user, name: String(values.name).trim(), email: String(values.email).trim().toLowerCase(), phone: String(values.phone || '') };
      addAccount(state.user); saveState(); render(); showToast('Perfil demo salvo neste navegador.');
    } else if (form.dataset.form === 'review') {
      state.reviews.push({ id: `review-${Date.now()}`, name: String(values.name).trim(), stars: Math.max(1, Math.min(5, Number(values.stars) || 5)), text: String(values.text).trim(), item: 'Visita à Maison', date: 'Agora · demonstração' });
      saveState(); render(); showToast('Sua avaliação foi adicionada a este protótipo.');
    } else if (form.dataset.form === 'chat') {
      const message = String(values.message || '').trim();
      if (!message) return;
      void sendSupportMessage(message);
    } else if (form.dataset.form === 'inventory') {
      const productId = form.dataset.productId;
      const branchId = form.dataset.branchId;
      const qty = Math.max(0, Math.floor(Number(values.qty)));
      const price = Math.max(.01, Number(values.price));
      const status = qty === 0 ? 'ESGOTADO' : String(values.status);
      state.inventory[branchId] ||= {};
      state.inventory[branchId][productId] = { ...inventoryRecord(productId, branchId), qty, price, status, active: data.has('active') };
      saveState(); render(); showToast('Preço e disponibilidade demo atualizados.');
    } else if (form.dataset.form === 'campaign') {
      const code = String(values.code).trim().toUpperCase();
      if (state.campaigns.some((campaign) => campaign.code.toUpperCase() === code)) { showToast('Esse código já está cadastrado.'); return; }
      state.campaigns.push({ id: `campaign-${Date.now()}`, name: String(values.name).trim(), code, description: String(values.description).trim(), type: String(values.type), value: Math.max(1, Number(values.value)), active: true });
      saveState(); render(); showToast('Campanha demo criada e ativa.');
    } else if (form.dataset.form === 'account-role') {
      const account = state.accounts.find((item) => item.email === form.dataset.accountEmail);
      if (account) { account.role = ['customer', 'employee', 'admin'].includes(values.role) ? values.role : 'customer'; saveState(); render(); showToast('Perfil local atualizado.'); }
    }
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.primary-nav a')) {
      $('.primary-nav').classList.remove('is-open');
      $('.menu-toggle').setAttribute('aria-expanded', 'false');
      $('.menu-toggle').setAttribute('aria-label', 'Abrir menu');
    }
  });
  window.addEventListener('hashchange', render);

  if (!window.location.hash) window.location.hash = '#/';
  else render();
  void hydrateBackendData();
})();
