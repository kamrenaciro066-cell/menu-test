const supabaseUrl = 'https://vyprrahovtpzdjhrqzjz.supabase.co';
const supabaseAnonKey = 'sb_publishable_WeASCwnQ92wTsYfaqeFfDQ_kD2x60L4';

const supabaseClient =
  supabaseAnonKey && typeof supabase !== 'undefined'
    ? supabase.createClient(supabaseUrl, supabaseAnonKey)
    : null;

const CONFIG = {
  name: 'The Corner Café',
  tagline: 'Fresh coffee & homemade food',
  logo: 'CC',
  theme: {
    bg: '#f2f0eb',
    surface: '#ffffff',
    text: '#1a2e28',
    textMuted: '#6b7c76',
    primary: '#264d3d',
    primaryLight: '#3d6b58',
    accent: '#b8e0d2',
    accentDark: '#7ec4ae',
    highlight: '#d4a574',
    highlightLight: '#f5e6d3',
    border: '#e0ddd6',
    shadow: '0 2px 12px rgba(38, 77, 61, 0.08)',
    overlay: 'rgba(26, 46, 40, 0.4)',
    radius: '12px',
    radiusSm: '8px',
    font: 'DM Sans',
    fontUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap',
    logoRadius: '8px',
    sectionStyle: 'underline'
  },
  locations: ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Counter'],
  defaultLocation: 'Table 4',
  categories: [
    { id: 'all', label: 'All' },
    { id: 'coffee', label: 'Coffee' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'sweets', label: 'Sweets' }
  ],
  menu: [
    {
      category: 'coffee',
      section: 'Coffee',
      items: [
        { id: 'flat-white', name: 'Flat White', desc: 'Double shot espresso with velvety steamed milk', price: 3.20, icon: '☕' },
        { id: 'latte', name: 'Latte', desc: 'Smooth espresso with steamed milk', price: 3.20, icon: '☕' },
        { id: 'cappuccino', name: 'Cappuccino', desc: 'Equal parts espresso, steamed milk & foam', price: 3.20, icon: '☕' },
        { id: 'americano', name: 'Americano', desc: 'Double shot espresso with hot water', price: 2.80, icon: '☕' },
        { id: 'espresso', name: 'Espresso', desc: 'Single shot of our house blend', price: 2.20, icon: '☕' }
      ]
    },
    {
      category: 'drinks',
      section: 'Drinks',
      items: [
        { id: 'orange-juice', name: 'Fresh Orange Juice', desc: 'Pressed to order, no added sugar', price: 4.15, icon: '🍊' },
        { id: 'english-breakfast', name: 'English Breakfast Tea', desc: 'Pot for one, served with milk', price: 2.50, icon: '🫖' },
        { id: 'hot-chocolate', name: 'Hot Chocolate', desc: 'Rich Belgian chocolate with whipped cream', price: 3.50, icon: '🍫' },
        { id: 'sparkling-water', name: 'Sparkling Water', desc: '330ml bottle', price: 2.00, icon: '💧' }
      ]
    },
    {
      category: 'breakfast',
      section: 'Breakfast & Brunch',
      items: [
        { id: 'avocado-toast', name: 'Avocado Toast', desc: 'Smashed avocado, chilli flakes & poached egg on sourdough', price: 8.50, icon: '🥑' },
        { id: 'full-english', name: 'Full English', desc: 'Eggs, bacon, sausage, beans, tomato & toast', price: 10.95, icon: '🍳' },
        { id: 'porridge', name: 'Porridge', desc: 'Oats with honey, banana & toasted seeds', price: 5.50, icon: '🥣' },
        { id: 'croissant', name: 'Butter Croissant', desc: 'Freshly baked, served warm', price: 2.80, icon: '🥐' }
      ]
    },
    {
      category: 'lunch',
      section: 'Lunch',
      items: [
        { id: 'club-sandwich', name: 'Club Sandwich', desc: 'Chicken, bacon, lettuce, tomato & mayo on toasted bread', price: 8.00, icon: '🥪' },
        { id: 'soup-day', name: 'Soup of the Day', desc: "Chef's daily special — ask your server", price: 5.30, icon: '🍲' },
        { id: 'quiche', name: 'Spinach & Feta Quiche', desc: 'Served with mixed leaf salad', price: 7.50, icon: '🥧' },
        { id: 'soup-cake-combo', name: 'Soup & Cake Combo', desc: 'Soup of the day with a slice of carrot cake', price: 9.45, icon: '🍽️' }
      ]
    },
    {
      category: 'sweets',
      section: 'Sweets & Treats',
      items: [
        { id: 'carrot-cake', name: 'Carrot Cake', desc: 'Homemade with cream cheese frosting', price: 4.15, icon: '🍰' },
        { id: 'brownie', name: 'Chocolate Brownie', desc: 'Rich, fudgy & served warm', price: 4.15, icon: '🍫' },
        { id: 'lemon-drizzle', name: 'Lemon Drizzle Cake', desc: 'Light sponge with citrus glaze', price: 4.15, icon: '🍋' },
        { id: 'cookie', name: 'Chocolate Chip Cookie', desc: 'Baked fresh every morning', price: 2.50, icon: '🍪' }
      ]
    }
  ]
};

let MENU = [];
const cart = {};
let orderCounter = 47;
let activeCategory = 'all';
let selectedCardBrand = 'visa';
let paymentRequestSupported = false;
let currentLocation = CONFIG.defaultLocation;

const menuEl = document.getElementById('menu');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartPanel = document.getElementById('cartPanel');
const overlay = document.getElementById('overlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartLocation = document.getElementById('cartLocation');
const tableDisplay = document.getElementById('tableDisplay');
const payOnline = document.getElementById('payOnline');
const payCounter = document.getElementById('payCounter');
const paymentModal = document.getElementById('paymentModal');
const paymentBack = document.getElementById('paymentBack');
const closePayment = document.getElementById('closePayment');
const paymentTotal = document.getElementById('paymentTotal');
const payCardAmount = document.getElementById('payCardAmount');
const applePayBtn = document.getElementById('applePayBtn');
const googlePayBtn = document.getElementById('googlePayBtn');
const walletNote = document.getElementById('walletNote');
const cardForm = document.getElementById('cardForm');
const cardTypeRow = document.getElementById('cardTypeRow');
const cardName = document.getElementById('cardName');
const cardNumber = document.getElementById('cardNumber');
const cardExpiry = document.getElementById('cardExpiry');
const cardCvv = document.getElementById('cardCvv');
const cardError = document.getElementById('cardError');
const payCardBtn = document.getElementById('payCardBtn');
const counterModal = document.getElementById('counterModal');
const counterBack = document.getElementById('counterBack');
const closeCounter = document.getElementById('closeCounter');
const counterTotal = document.getElementById('counterTotal');
const counterLocation = document.getElementById('counterLocation');
const counterItems = document.getElementById('counterItems');
const confirmCounterBtn = document.getElementById('confirmCounterBtn');
const confirmCounterAmount = document.getElementById('confirmCounterAmount');
const counterSuccessModal = document.getElementById('counterSuccessModal');
const counterOrderNumber = document.getElementById('counterOrderNumber');
const counterSuccessLocation = document.getElementById('counterSuccessLocation');
const counterSuccessTotal = document.getElementById('counterSuccessTotal');
const counterSuccessDone = document.getElementById('counterSuccessDone');
const paymentProcessing = document.getElementById('paymentProcessing');
const paymentProcessingText = document.getElementById('paymentProcessingText');
const toast = document.getElementById('toast');
const categories = document.getElementById('categories');
const app = document.getElementById('app');

function applyTheme(theme) {
  const root = document.documentElement;
  const vars = {
    '--bg': theme.bg,
    '--surface': theme.surface,
    '--text': theme.text,
    '--text-muted': theme.textMuted,
    '--green': theme.primary,
    '--green-light': theme.primaryLight,
    '--mint': theme.accent,
    '--mint-dark': theme.accentDark,
    '--orange': theme.highlight,
    '--orange-light': theme.highlightLight,
    '--border': theme.border,
    '--shadow': theme.shadow,
    '--radius': theme.radius,
    '--radius-sm': theme.radiusSm,
    '--overlay': theme.overlay,
    '--logo-radius': theme.logoRadius
  };

  Object.entries(vars).forEach(([key, value]) => root.style.setProperty(key, value));

  document.getElementById('fontLink').href = theme.fontUrl;
  document.body.style.fontFamily = `'${theme.fontBody || theme.font}', system-ui, sans-serif`;
  document.querySelector('.brand-text h1').style.fontFamily = `'${theme.font}', serif, system-ui, sans-serif`;

  app.className = 'app';
  if (theme.sectionStyle) {
    app.dataset.sectionStyle = theme.sectionStyle;
  }
}

function resolveLocationFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const locationParam = params.get('location') ?? params.get('loc');
  const tableParam = params.get('table') ?? params.get('t');

  if (locationParam && CONFIG.locations.includes(locationParam)) {
    return locationParam;
  }

  if (tableParam) {
    if (/^counter$/i.test(tableParam.trim())) {
      return 'Counter';
    }

    const num = tableParam.replace(/\D/g, '');
    if (num) {
      const byNumber = CONFIG.locations.find(loc => {
        const match = loc.match(/\d+/);
        return match && match[0] === num;
      });
      if (byNumber) return byNumber;
    }

    const asLabel = tableParam.trim();
    if (CONFIG.locations.includes(asLabel)) return asLabel;
  }

  return CONFIG.defaultLocation;
}

function initApp() {
  MENU = CONFIG.menu;
  currentLocation = resolveLocationFromUrl();
  document.title = CONFIG.name + ' — Menu';
  document.getElementById('logo').textContent = CONFIG.logo;
  document.getElementById('restaurantName').textContent = CONFIG.name;
  document.getElementById('tagline').textContent = CONFIG.tagline;

  applyTheme(CONFIG.theme);

  if (tableDisplay) tableDisplay.textContent = currentLocation;

  categories.innerHTML = CONFIG.categories.map((cat, i) => {
    const active = i === 0 ? ' active' : '';
    return `<button class="cat-btn${active}" data-cat="${cat.id}">${cat.label}</button>`;
  }).join('');

  activeCategory = CONFIG.categories[0].id;
  cartLocation.textContent = currentLocation;
  renderMenu();
  updateCartUI();
  initPayment();
}

const CARD_BRANDS = {
  visa: { label: 'Visa', lengths: [16], cvvLength: 3, pattern: /^4/ },
  mastercard: { label: 'Mastercard', lengths: [16], cvvLength: 3, pattern: /^(5[1-5]|2[2-7])/ },
  amex: { label: 'Amex', lengths: [15], cvvLength: 4, pattern: /^3[47]/ },
  maestro: { label: 'Maestro', lengths: [12, 13, 14, 15, 16, 17, 18, 19], cvvLength: 3, pattern: /^(5[06-9]|6)/ },
};

function formatPrice(amount) {
  return '£' + amount.toFixed(2);
}

function getTotalItems() {
  return Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
}

function getTotalPrice() {
  return Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderMenu() {
  menuEl.innerHTML = '';

  MENU.forEach(section => {
    if (activeCategory !== 'all' && section.category !== activeCategory) return;

    const sectionEl = document.createElement('div');
    sectionEl.className = 'menu-section';
    sectionEl.innerHTML = `<h2 class="section-title">${section.section}</h2>`;

    section.items.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'menu-item';
      itemEl.innerHTML = `
        <div class="item-icon">${item.icon}</div>
        <div class="item-details">
          <div class="item-name">${item.name}</div>
          <div class="item-desc">${item.desc}</div>
          <div class="item-footer">
            <span class="item-price">${formatPrice(item.price)}</span>
            <button class="add-btn" data-id="${item.id}">Add</button>
          </div>
        </div>
      `;
      sectionEl.appendChild(itemEl);
    });

    menuEl.appendChild(sectionEl);
  });

  menuEl.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id));
  });
}

function findItem(id) {
  for (const section of MENU) {
    const item = section.items.find(i => i.id === id);
    if (item) return item;
  }
  return null;
}

function addToCart(id) {
  const item = findItem(id);
  if (!item) return;

  if (cart[id]) {
    cart[id].qty++;
  } else {
    cart[id] = { ...item, qty: 1 };
  }

  updateCartUI();
  showToast(`${item.name} added`);
}

function updateQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  updateCartUI();
}

function updateCartUI() {
  const total = getTotalItems();
  cartCount.textContent = total;
  cartCount.dataset.count = total;

  const price = getTotalPrice();
  cartTotal.textContent = formatPrice(price);

  const hasItems = total > 0;
  payOnline.disabled = !hasItems;
  payCounter.disabled = !hasItems;

  if (!hasItems) {
    cartItems.innerHTML = '<li class="cart-empty">Your cart is empty</li>';
    return;
  }

  cartItems.innerHTML = '';
  Object.values(cart).forEach(item => {
    const li = document.createElement('li');
    li.className = 'cart-line';
    li.innerHTML = `
      <div class="cart-line-info">
        <div class="cart-line-name">${item.name}</div>
        <div class="cart-line-price">${formatPrice(item.price)} each</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  cartItems.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateQty(btn.dataset.id, parseInt(btn.dataset.delta));
    });
  });
}

function openCart() {
  cartPanel.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartPanel() {
  closePaymentModal();
  closeCounterModal();
  closeCounterOrderSuccess();
  cartPanel.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function openPaymentModal() {
  if (getTotalItems() === 0) return;

  const total = formatPrice(getTotalPrice());
  paymentTotal.textContent = total;
  payCardAmount.textContent = total;
  clearCardError();
  cardForm.reset();
  setSelectedCardBrand('visa');

  cartLocation.textContent = getLocationLabel();
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  paymentModal.classList.add('open');
  paymentModal.setAttribute('aria-hidden', 'false');
  updateWalletButtons();
}

function closePaymentModal() {
  paymentModal.classList.remove('open');
  paymentModal.setAttribute('aria-hidden', 'true');
  hidePaymentProcessing();
}

function openCounterModal() {
  if (getTotalItems() === 0) return;

  const total = formatPrice(getTotalPrice());
  const location = getLocationLabel();

  counterTotal.textContent = total;
  confirmCounterAmount.textContent = total;
  counterLocation.textContent = location;
  counterItems.innerHTML = Object.values(cart).map(item => `
    <li class="cart-line">
      <div class="cart-line-info">
        <div class="cart-line-name">${item.qty}x ${item.name}</div>
        <div class="cart-line-price">${formatPrice(item.price)} each</div>
      </div>
      <div class="cart-line-price">${formatPrice(item.price * item.qty)}</div>
    </li>
  `).join('');

  cartLocation.textContent = location;
  confirmCounterBtn.disabled = false;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  counterModal.classList.add('open');
  counterModal.setAttribute('aria-hidden', 'false');
}

function closeCounterModal() {
  counterModal.classList.remove('open');
  counterModal.setAttribute('aria-hidden', 'true');
}

function showCounterOrderSuccess(orderNum, location, totalPrice) {
  counterOrderNumber.textContent = `#${orderNum}`;
  counterSuccessLocation.textContent = location;
  counterSuccessTotal.textContent = formatPrice(totalPrice);

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  counterSuccessModal.classList.add('open');
  counterSuccessModal.setAttribute('aria-hidden', 'false');
}

function closeCounterOrderSuccess() {
  counterSuccessModal.classList.remove('open');
  counterSuccessModal.setAttribute('aria-hidden', 'true');
}

function showPaymentProcessing(message) {
  paymentProcessingText.textContent = message;
  paymentProcessing.classList.add('show');
}

function hidePaymentProcessing() {
  paymentProcessing.classList.remove('show');
}

function clearCardError() {
  cardError.textContent = '';
  cardError.classList.add('hidden');
  [cardName, cardNumber, cardExpiry, cardCvv].forEach(input => input.classList.remove('invalid'));
}

function showCardError(message) {
  cardError.textContent = message;
  cardError.classList.remove('hidden');
}

function setSelectedCardBrand(brand) {
  if (!CARD_BRANDS[brand]) return;
  selectedCardBrand = brand;
  cardTypeRow.querySelectorAll('.card-type-btn').forEach(btn => {
    const active = btn.dataset.brand === brand;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  cardCvv.placeholder = CARD_BRANDS[brand].cvvLength === 4 ? '1234' : '123';
  cardCvv.maxLength = CARD_BRANDS[brand].cvvLength;
}

function detectCardBrand(digits) {
  for (const [brand, config] of Object.entries(CARD_BRANDS)) {
    if (config.pattern.test(digits)) return brand;
  }
  return selectedCardBrand;
}

function luhnCheck(number) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function formatCardNumberInput(value) {
  const digits = value.replace(/\D/g, '').slice(0, 19);
  const brand = detectCardBrand(digits);
  if (brand !== selectedCardBrand) setSelectedCardBrand(brand);

  const maxLen = CARD_BRANDS[selectedCardBrand].lengths.slice(-1)[0];
  const trimmed = digits.slice(0, maxLen);
  const grouped = trimmed.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  return grouped;
}

function formatExpiryInput(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
}

function validateCardPayment() {
  clearCardError();

  const name = cardName.value.trim();
  const digits = cardNumber.value.replace(/\D/g, '');
  const expiryDigits = cardExpiry.value.replace(/\D/g, '');
  const cvv = cardCvv.value.replace(/\D/g, '');
  const brand = detectCardBrand(digits);
  const brandConfig = CARD_BRANDS[brand];

  if (name.length < 2) {
    cardName.classList.add('invalid');
    showCardError('Enter the name shown on your card.');
    return null;
  }

  if (!brandConfig.lengths.includes(digits.length)) {
    cardNumber.classList.add('invalid');
    showCardError(`${brandConfig.label} numbers must be ${brandConfig.lengths.join(' or ')} digits.`);
    return null;
  }

  if (!luhnCheck(digits)) {
    cardNumber.classList.add('invalid');
    showCardError('That card number does not look valid. Check and try again.');
    return null;
  }

  if (expiryDigits.length !== 4) {
    cardExpiry.classList.add('invalid');
    showCardError('Enter expiry as MM / YY.');
    return null;
  }

  const month = parseInt(expiryDigits.slice(0, 2), 10);
  const year = parseInt(`20${expiryDigits.slice(2)}`, 10);
  const now = new Date();
  const expiryDate = new Date(year, month, 0);

  if (month < 1 || month > 12) {
    cardExpiry.classList.add('invalid');
    showCardError('Expiry month must be between 01 and 12.');
    return null;
  }

  if (expiryDate < now) {
    cardExpiry.classList.add('invalid');
    showCardError('This card appears to be expired.');
    return null;
  }

  if (cvv.length !== brandConfig.cvvLength) {
    cardCvv.classList.add('invalid');
    showCardError(`${brandConfig.label} security code must be ${brandConfig.cvvLength} digits.`);
    return null;
  }

  return {
    method: `${brandConfig.label} card`,
    last4: digits.slice(-4),
  };
}

function buildPaymentRequest() {
  if (!window.PaymentRequest) return null;

  const total = getTotalPrice().toFixed(2);
  const details = {
    total: {
      label: `${CONFIG.name} order`,
      amount: { currency: 'GBP', value: total },
    },
  };

  const methods = [
    {
      supportedMethods: 'https://google.com/pay',
      data: {
        environment: 'TEST',
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX'],
          },
        }],
      },
    },
    {
      supportedMethods: 'https://apple.com/apple-pay',
      data: {
        version: 3,
        merchantIdentifier: 'merchant.com.tapslow.demo',
        merchantCapabilities: ['supports3DS'],
        supportedNetworks: ['visa', 'masterCard', 'amex'],
        countryCode: 'GB',
      },
    },
    {
      supportedMethods: 'basic-card',
      data: { supportedNetworks: ['visa', 'mastercard', 'amex'] },
    },
  ];

  try {
    return new PaymentRequest(methods, details);
  } catch (err) {
    console.warn('PaymentRequest unavailable', err);
    return null;
  }
}

async function updateWalletButtons() {
  const request = buildPaymentRequest();
  paymentRequestSupported = Boolean(request);

  if (!request) {
    applePayBtn.disabled = false;
    googlePayBtn.disabled = false;
    walletNote.textContent = 'Wallet buttons use demo checkout on this preview. Live Apple Pay and Google Pay need HTTPS and a payment provider.';
    return;
  }

  try {
    const canPay = await request.canMakePayment();
    applePayBtn.disabled = !canPay;
    googlePayBtn.disabled = !canPay;
    walletNote.textContent = canPay
      ? 'Your device wallet is ready for checkout.'
      : 'Wallet pay is not set up on this device — use card details below or demo wallet checkout.';
  } catch (err) {
    applePayBtn.disabled = false;
    googlePayBtn.disabled = false;
    walletNote.textContent = 'Use card details below, or tap a wallet button for demo checkout.';
  }
}

function simulatePaymentDelay(ms = 1400) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processWalletPayment(walletLabel) {
  if (getTotalItems() === 0) return;

  showPaymentProcessing(`Contacting ${walletLabel}…`);
  payCardBtn.disabled = true;
  applePayBtn.disabled = true;
  googlePayBtn.disabled = true;

  try {
    const request = buildPaymentRequest();

    if (request && paymentRequestSupported) {
      try {
        const canPay = await request.canMakePayment();
        if (canPay) {
          const response = await request.show();
          await response.complete('success');
          await completeCheckout(walletLabel);
          return;
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          showToast('Payment cancelled.');
          return;
        }
      }
    }

    await simulatePaymentDelay();
    await completeCheckout(walletLabel);
  } finally {
    hidePaymentProcessing();
    payCardBtn.disabled = false;
    updateWalletButtons();
  }
}

async function processCardPayment(event) {
  event.preventDefault();
  const paymentInfo = validateCardPayment();
  if (!paymentInfo) return;

  showPaymentProcessing(`Processing ${paymentInfo.method}…`);
  payCardBtn.disabled = true;
  applePayBtn.disabled = true;
  googlePayBtn.disabled = true;

  try {
    await simulatePaymentDelay();
    await completeCheckout(`${paymentInfo.method} ·••• ${paymentInfo.last4}`);
  } finally {
    hidePaymentProcessing();
    payCardBtn.disabled = false;
    updateWalletButtons();
  }
}

function initPayment() {
  cardTypeRow.addEventListener('click', e => {
    const btn = e.target.closest('.card-type-btn');
    if (!btn) return;
    setSelectedCardBrand(btn.dataset.brand);
  });

  cardNumber.addEventListener('input', () => {
    cardNumber.value = formatCardNumberInput(cardNumber.value);
  });

  cardExpiry.addEventListener('input', () => {
    cardExpiry.value = formatExpiryInput(cardExpiry.value);
  });

  cardCvv.addEventListener('input', () => {
    cardCvv.value = cardCvv.value.replace(/\D/g, '').slice(0, CARD_BRANDS[selectedCardBrand].cvvLength);
  });

  cardForm.addEventListener('submit', processCardPayment);
  paymentBack.addEventListener('click', closePaymentModal);
  closePayment.addEventListener('click', () => {
    closePaymentModal();
    closeCartPanel();
  });
  applePayBtn.addEventListener('click', () => processWalletPayment('Apple Pay'));
  googlePayBtn.addEventListener('click', () => processWalletPayment('Google Pay'));
}

function getLocationLabel() {
  return currentLocation;
}

function parseTableNumber(locationLabel) {
  const match = locationLabel.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function formatOrderItems() {
  return Object.values(cart)
    .map(item => `${item.qty}x ${item.name}`)
    .join(', ');
}

async function saveOrderToSupabase(tableNumber, items, totalPrice) {
  if (!supabaseClient) {
    throw new Error('Supabase is not configured.');
  }

  const { error } = await supabaseClient.from('orders').insert({
    table_number: tableNumber,
    items,
    total_price: totalPrice,
    status: 'Pending',
  });

  if (error) throw error;
}

async function completeCheckout(paymentLabel) {
  const location = getLocationLabel();
  const tableNumber = parseTableNumber(location);
  const items = formatOrderItems();
  const totalPrice = getTotalPrice();

  payOnline.disabled = true;
  payCounter.disabled = true;
  payCardBtn.disabled = true;

  try {
    await saveOrderToSupabase(tableNumber, items, totalPrice);

    orderCounter++;
    const orderNum = String(orderCounter).padStart(3, '0');

    closePaymentModal();
    closeCartPanel();
    showToast(`Order #${orderNum} paid! ${paymentLabel} · ${location} · ${formatPrice(totalPrice)}`, 4500);

    Object.keys(cart).forEach(k => delete cart[k]);
    updateCartUI();
  } catch (err) {
    console.error(err);
    showToast('Payment succeeded but the order could not be saved. Please try again.', 4000);
    payOnline.disabled = getTotalItems() === 0;
    payCounter.disabled = getTotalItems() === 0;
    payCardBtn.disabled = false;
  }
}

async function confirmCounterOrder() {
  const location = getLocationLabel();
  const tableNumber = parseTableNumber(location);
  const items = formatOrderItems();
  const totalPrice = getTotalPrice();

  payOnline.disabled = true;
  payCounter.disabled = true;
  confirmCounterBtn.disabled = true;

  try {
    await saveOrderToSupabase(tableNumber, items, totalPrice);

    orderCounter++;
    const orderNum = String(orderCounter).padStart(3, '0');

    Object.keys(cart).forEach(k => delete cart[k]);
    updateCartUI();

    closeCounterModal();
    cartPanel.classList.remove('open');
    showCounterOrderSuccess(orderNum, location, totalPrice);
  } catch (err) {
    console.error(err);
    showToast('Could not save your order. Please try again.', 4000);
    payOnline.disabled = getTotalItems() === 0;
    payCounter.disabled = getTotalItems() === 0;
    confirmCounterBtn.disabled = false;
  }
}

function showToast(message, duration = 1800) {
  toast.innerHTML = message;
  toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartPanel);
overlay.addEventListener('click', () => {
  if (counterSuccessModal.classList.contains('open')) {
    return;
  }
  if (paymentModal.classList.contains('open')) {
    closePaymentModal();
    return;
  }
  if (counterModal.classList.contains('open')) {
    closeCounterModal();
    return;
  }
  closeCartPanel();
});
payOnline.addEventListener('click', openPaymentModal);
payCounter.addEventListener('click', openCounterModal);
counterBack.addEventListener('click', closeCounterModal);
closeCounter.addEventListener('click', closeCartPanel);
confirmCounterBtn.addEventListener('click', confirmCounterOrder);
counterSuccessDone.addEventListener('click', closeCartPanel);

categories.addEventListener('click', e => {
  const btn = e.target.closest('.cat-btn');
  if (!btn) return;
  categories.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeCategory = btn.dataset.cat;
  renderMenu();
});

initApp();
