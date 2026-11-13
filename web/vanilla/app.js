(() => {
  'use strict';

  const STORAGE_KEY = 'maison-padaria-confeitaria-vanilla-cart-v1';
  const products = [
    { id: 'pao-fermentacao-natural', name: 'Pão de fermentação natural', description: 'Casca crocante, miolo macio e longa fermentação.', price: 28, tag: 'feito com levain', availability: 'Pronta entrega', image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=700&q=80', alt: 'Pão artesanal de fermentação natural' },
    { id: 'croissant', name: 'Croissant amanteigado', description: 'Folhado em camadas, assado fresquinho hoje.', price: 12, tag: 'assado hoje', availability: 'Pronta entrega', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80', alt: 'Croissant dourado recém-assado' },
    { id: 'morango', name: 'Jardim de morango', description: 'Baunilha, creme leve e morangos frescos.', price: 128, tag: 'feito sob encomenda', availability: 'Em até 2 dias', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80', alt: 'Bolo de morango com cobertura delicada' },
    { id: 'combo', name: 'Combo café da manhã', description: 'Pão artesanal, dois croissants e café coado da casa.', price: 42, compareAtPrice: 54, tag: 'combo especial · economize R$ 12', availability: 'Pronta entrega', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80', alt: 'Café da manhã com pão e doces da casa' }
  ];
  const steps = [
    { key: 'size', title: 'Escolha o tamanho', hint: 'Quantas pessoas vão ganhar um pedaço?', options: [{ value: 'P', label: 'Pequeno', detail: '6 a 8 fatias', price: 89 }, { value: 'M', label: 'Médio', detail: '10 a 12 fatias', price: 129 }, { value: 'G', label: 'Grande', detail: '16 a 20 fatias', price: 179 }] },
    { key: 'cake', title: 'Uma massa fofinha', hint: 'Assada no dia, com ingredientes de verdade.', options: [{ value: 'baunilha', label: 'Baunilha artesanal', price: 0 }, { value: 'chocolate', label: 'Chocolate belga', price: 12 }, { value: 'red velvet', label: 'Red velvet', price: 15 }] },
    { key: 'filling', title: 'O coração do bolo', hint: 'Escolha o recheio que vai entre as camadas.', options: [{ value: 'brigadeiro', label: 'Brigadeiro cremoso', price: 0 }, { value: 'doce de leite', label: 'Doce de leite da casa', price: 8 }, { value: 'frutas vermelhas', label: 'Frutas vermelhas', price: 12 }, { value: 'limão siciliano', label: 'Creme de limão', price: 10 }] },
    { key: 'icing', title: 'Vista o seu bolo', hint: 'A cobertura final, do seu jeito.', options: [{ value: 'creme de baunilha', label: 'Creme de baunilha', price: 0 }, { value: 'ganache', label: 'Ganache de chocolate', price: 10 }, { value: 'chantilly', label: 'Chantilly rosado', price: 8 }, { value: 'naked', label: 'Naked cake', price: 5 }] },
    { key: 'extras', title: 'Um último detalhe', hint: 'Adicione um mimo extra (opcional).', options: [{ value: 'frutas frescas', label: 'Frutas frescas', detail: 'Morangos e mirtilos', price: 18 }, { value: 'flores', label: 'Flores comestíveis', detail: 'Um toque delicado', price: 15 }, { value: 'vela', label: 'Velinha especial', detail: 'Para fazer um pedido', price: 5 }], multiple: true }
  ];
  const state = { step: 0, size: 'P', cake: 'baunilha', filling: 'brigadeiro', icing: 'creme de baunilha', extras: [] };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const safeReadCart = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item.name === 'string' && Number.isFinite(item.price)).map((item, index) => ({
        ...item,
        cartId: typeof item.cartId === 'string' ? item.cartId : `restored-${index}`,
        description: typeof item.description === 'string' ? item.description : ''
      })) : [];
    } catch { return []; }
  };
  let cart = safeReadCart();

  function persistCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch { showToast('Não foi possível guardar a sacola neste navegador.'); }
  }

  // Integração futura: substituir o catálogo local por fetch('/api/catalog/products') e manter os mesmos dados de apresentação.
  function renderProducts() {
    const grid = $('#product-grid');
    grid.innerHTML = products.map((product, index) => `<article class="product-card" style="animation-delay:${index * 70}ms"><div class="product-image"><img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.alt)}" loading="lazy" data-fallback><span class="product-tag">${escapeHTML(product.tag)}</span><span class="product-availability">${escapeHTML(product.availability)}</span></div><div class="product-info"><h3>${escapeHTML(product.name)}</h3><p>${escapeHTML(product.description)}</p><div class="product-bottom"><span class="product-pricing"><span class="product-price">${money(product.price)}</span>${product.compareAtPrice ? `<del class="product-price-old">${money(product.compareAtPrice)}</del>` : ''}</span><button type="button" class="add-button" data-product-id="${escapeHTML(product.id)}" aria-label="Adicionar ${escapeHTML(product.name)} à sacola">+</button></div></div></article>`).join('');
    $$('[data-fallback]', grid).forEach((image) => image.addEventListener('error', () => {
      image.hidden = true;
      const art = document.createElement('span');
      art.className = 'fallback-art'; art.setAttribute('aria-hidden', 'true'); art.textContent = '♡';
      image.parentElement.prepend(art);
    }, { once: true }));
  }

  const heroImage = $('.hero-art [data-fallback]');
  heroImage.addEventListener('error', () => {
    heroImage.hidden = true;
    $('.hero-art').style.background = 'radial-gradient(ellipse at 50% 65%, #fff7ee 0 24%, #e8d2c4 25% 43%, #f1e4da 70%)';
  }, { once: true });

  function getCakePrice() {
    const base = steps[0].options.find((option) => option.value === state.size).price;
    const choices = [state.cake, state.filling, state.icing].map((value, index) => steps[index + 1].options.find((option) => option.value === value)?.price || 0);
    const extras = state.extras.reduce((sum, value) => sum + (steps[4].options.find((option) => option.value === value)?.price || 0), 0);
    return base + choices.reduce((sum, value) => sum + value, 0) + extras;
  }

  function renderStep() {
    const step = steps[state.step];
    $('#step-label').textContent = `PASSO ${state.step + 1} DE ${steps.length}`;
    $('#step-name').textContent = step.title.replace(/^Escolha |^Uma |^O |^Vista |^/, '');
    const progress = $('.progress-track span');
    progress.style.width = `${((state.step + 1) / steps.length) * 100}%`;
    $('.progress-track').parentElement.setAttribute('aria-valuenow', String(state.step + 1));
    $('.step-dots').innerHTML = steps.map((_, index) => `<i class="${index === state.step ? 'is-current' : ''}"${index === state.step ? ' aria-current="step"' : ''}></i>`).join('');
    $('#step-back').disabled = state.step === 0;
    $('#step-next').innerHTML = state.step === steps.length - 1 ? 'Adicionar à sacola <span aria-hidden="true">♡</span>' : 'Próximo <span aria-hidden="true">→</span>';
    const currentValue = state[step.key];
    const inputType = step.multiple ? 'checkbox' : 'radio';
    $('#builder-form').innerHTML = `<h3 tabindex="-1">${escapeHTML(step.title)}</h3><p>${escapeHTML(step.hint)}</p><div class="choice-list">${step.options.map((option) => {
      const checked = step.multiple ? currentValue.includes(option.value) : currentValue === option.value;
      return `<label class="choice-option"><input type="${inputType}" name="${step.key}" value="${escapeHTML(option.value)}"${checked ? ' checked' : ''}><span class="choice-main">${escapeHTML(option.label)}${option.detail ? `<span class="choice-detail">${escapeHTML(option.detail)}</span>` : ''}</span><span class="choice-price">${option.price ? `+ ${money(option.price)}` : state.step === 0 ? money(option.price) : 'incluso'}</span></label>`;
    }).join('')}</div>`;
    updatePreview();
  }

  function updatePreview() {
    const price = getCakePrice();
    $('#cake-price').textContent = money(price);
    const sizeName = steps[0].options.find((item) => item.value === state.size).label.toLowerCase();
    $('#cake-time').textContent = state.size === 'G' ? '3 dias' : '2 dias';
    $('#preview-description').textContent = `${sizeName} · ${state.cake} · ${state.filling}`;
    const fillingColors = { brigadeiro: '#805448', 'doce de leite': '#c79861', 'frutas vermelhas': '#b75f70', 'limão siciliano': '#d4c46e' };
    const icingColors = { 'creme de baunilha': '#fff1e2', ganache: '#704b43', chantilly: '#e6afb0', naked: '#e8c69e' };
    const cake = $('.cake-art');
    cake.style.setProperty('--cake-filling', fillingColors[state.filling]);
    cake.style.setProperty('--cake-icing', icingColors[state.icing]);
    cake.style.transform = state.size === 'P' ? 'scale(.88)' : state.size === 'G' ? 'scale(1.12)' : 'scale(1)';
  }

  function showToast(message) {
    const region = $('.toast-region');
    region.innerHTML = `<div class="toast">${escapeHTML(message)}</div>`;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => { region.innerHTML = ''; }, 2600);
  }

  function addToCart(item) {
    cart.push({ ...item, cartId: `${Date.now()}-${Math.random().toString(16).slice(2)}` });
    persistCart(); renderCart(); showToast(`${item.name} foi para a sua sacola ♡`);
  }

  function renderCart() {
    const count = cart.length;
    $$('.cart-count').forEach((node) => { node.textContent = String(count); });
    $('[data-open-cart]').setAttribute('aria-label', `Abrir sacola, ${count} ${count === 1 ? 'item' : 'itens'}`);
    $('#cart-empty').hidden = count > 0;
    $('#cart-total').hidden = count === 0;
    $('#cart-items').innerHTML = cart.map((item) => `<article class="cart-item"><div><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.description || '')}</p><button class="remove-item" type="button" data-remove-id="${escapeHTML(item.cartId)}">Remover</button></div><strong>${money(item.price)}</strong></article>`).join('');
    $('#cart-total strong').textContent = money(cart.reduce((total, item) => total + item.price, 0));
  }

  function openCart() {
    renderCart();
    const dialog = $('#cart-dialog');
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  $('#product-grid').addEventListener('click', (event) => {
    const button = event.target.closest('[data-product-id]');
    if (!button) return;
    const product = products.find((item) => item.id === button.dataset.productId);
    if (product) addToCart({ name: product.name, description: product.description, price: product.price });
  });
  $('#builder-form').addEventListener('change', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    const step = steps[state.step];
    if (step.multiple) state.extras = $$('input:checked', $('#builder-form')).map((choice) => choice.value);
    else state[step.key] = input.value;
    updatePreview();
  });
  $('#step-back').addEventListener('click', () => { if (state.step > 0) { state.step -= 1; renderStep(); $('#builder-form h3').focus(); } });
  $('#step-next').addEventListener('click', () => {
    if (state.step < steps.length - 1) { state.step += 1; renderStep(); $('#builder-form h3').focus(); return; }
    const extras = state.extras.length ? ` · ${state.extras.join(', ')}` : '';
    addToCart({ name: `Bolo ${state.size} personalizado`, description: `${state.cake}, recheio de ${state.filling}, cobertura de ${state.icing}${extras}`, price: getCakePrice() });
    state.step = 0; state.size = 'P'; state.cake = 'baunilha'; state.filling = 'brigadeiro'; state.icing = 'creme de baunilha'; state.extras = []; renderStep();
  });
  $('[data-open-cart]').addEventListener('click', openCart);
  $('#cart-dialog').addEventListener('click', (event) => {
    if (event.target.closest('[data-close-dialog]')) $('#cart-dialog').close();
    const remove = event.target.closest('[data-remove-id]');
    if (remove) { cart = cart.filter((item) => item.cartId !== remove.dataset.removeId); persistCart(); renderCart(); }
  });
  $('#cart-dialog').addEventListener('click', (event) => { if (event.target === $('#cart-dialog')) $('#cart-dialog').close(); });
  $('.menu-toggle').addEventListener('click', (event) => {
    const button = event.currentTarget;
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    button.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
    $('#main-nav').classList.toggle('is-open', !open);
  });
  $('#main-nav').addEventListener('click', (event) => {
    if (event.target.closest('a')) { $('#main-nav').classList.remove('is-open'); $('.menu-toggle').setAttribute('aria-expanded', 'false'); $('.menu-toggle').setAttribute('aria-label', 'Abrir menu'); }
  });
  renderProducts(); renderStep(); renderCart();
})();
