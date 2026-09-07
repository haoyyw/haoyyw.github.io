import { normaliseLocale, t } from './i18n.js';
import { validateOrder, formatOrderSummary } from './order.js';
import { loadSprites } from './sprites.js';

document.documentElement.classList.add('js');

const STORAGE_KEY = 'phdessert-locale';
const CONTACT_EMAIL = '';

import { PRODUCTS, MENU_SECTIONS, SEASONAL_IDS } from './catalogue.js';

const html = document.documentElement;
const languageToggle = document.getElementById('languageToggle');
const menuSections = document.getElementById('menuSections');
const seasonalCards = document.getElementById('seasonalCards');
const orderModal = document.getElementById('orderModal');
const orderForm = document.getElementById('orderForm');
const orderResult = document.getElementById('orderResult');
const productSelect = document.getElementById('orderProduct');
const orderSize = document.getElementById('orderSize');
const dateInput = document.getElementById('orderDate');
const summaryNode = document.getElementById('orderSummary');
const copyOrder = document.getElementById('copyOrder');
const emailOrder = document.getElementById('emailOrder');
const editOrder = document.getElementById('editOrder');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const faqList = document.getElementById('faqList');

let currentLocale = readStoredLocale();
let currentSlide = 0;
let lastOrder = null;

function readStoredLocale() {
  try { return normaliseLocale(localStorage.getItem(STORAGE_KEY) || 'en'); }
  catch { return 'en'; }
}
function persistLocale(locale) {
  try { localStorage.setItem(STORAGE_KEY, locale); } catch {}
}
function productCopy(product) {
  return product[currentLocale] || product.en;
}
function sectionCopy(section) {
  return section[currentLocale] || section.en;
}
function productById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function renderMenu() {
  menuSections.innerHTML = MENU_SECTIONS.map((section) => {
    const copy = sectionCopy(section);
    const products = PRODUCTS.filter((p) => p.section === section.id);
    const cards = products.map((product) => {
      const pc = productCopy(product);
      return `<article class="product-card">
        <figure class="product-image" role="img" aria-label="${pc.name}"><span class="product-image-asset sprite-products" style="background-position:${product.spriteX}% ${product.spriteY}%"></span></figure>
        <h3>${pc.name}</h3>
        <p class="product-description">${pc.description}</p>
        <p class="product-selling">${pc.selling}</p>
        <div class="product-card-footer">
          <span class="product-type">${product.seasonal ? t(currentLocale,'product.seasonal') : copy.title}</span>
          <button class="product-link order-trigger" type="button" data-product="${product.id}">${t(currentLocale,'product.enquire')}</button>
        </div>
      </article>`;
    }).join('');

    return `<section id="${section.id}" class="menu-section">
      <div class="shell">
        <button class="menu-section-header" type="button" aria-expanded="false" aria-controls="${section.id}-panel" data-section-toggle="${section.id}">
          <span class="menu-section-index">${section.index}</span>
          <span class="menu-section-title"><strong>${copy.title}</strong><small>${copy.subtitle} · ${products.length}</small></span>
          <span class="menu-section-toggle" aria-hidden="true">＋</span>
        </button>
        <div id="${section.id}-panel" class="menu-section-panel" hidden>
          <div class="product-grid">${cards}</div>
        </div>
      </div>
    </section>`;
  }).join('');

  menuSections.querySelectorAll('[data-section-toggle]').forEach((button) => {
    button.addEventListener('click', () => toggleSection(button.dataset.sectionToggle));
  });
  bindOrderTriggers(menuSections);
}

function toggleSection(id, forceOpen = null) {
  const button = menuSections.querySelector(`[data-section-toggle="${id}"]`);
  const panel = document.getElementById(`${id}-panel`);
  if (!button || !panel) return;
  const open = forceOpen === null ? button.getAttribute('aria-expanded') !== 'true' : Boolean(forceOpen);
  button.setAttribute('aria-expanded', String(open));
  panel.hidden = !open;
  const marker = button.querySelector('.menu-section-toggle');
  if (marker) marker.textContent = open ? '−' : '＋';
}

function renderSeasonal() {
  seasonalCards.innerHTML = SEASONAL_IDS.map((id) => {
    const p = productById(id);
    const copy = productCopy(p);
    return `<article class="seasonal-card">
      <span class="seasonal-card-image product-image-asset sprite-products" role="img" aria-label="${copy.name}" style="background-position:${p.spriteX}% ${p.spriteY}%"></span>
      <div><h3>${copy.name}</h3><p>${copy.description}</p></div>
      <button class="product-link order-trigger" type="button" data-product="${p.id}">${t(currentLocale,'product.enquire')}</button>
    </article>`;
  }).join('');
  bindOrderTriggers(seasonalCards);
}

function populateProductSelect() {
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = t(currentLocale,'form.select');
  productSelect.innerHTML = '';
  productSelect.append(placeholder);
  PRODUCTS.forEach((p) => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = productCopy(p).name;
    productSelect.append(option);
  });
}

function applyTranslations(locale) {
  currentLocale = normaliseLocale(locale);
  html.dataset.locale = currentLocale;
  html.lang = currentLocale === 'zh' ? 'zh-Hans' : 'en';

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = t(currentLocale, node.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    node.setAttribute('placeholder', t(currentLocale, node.dataset.i18nPlaceholder));
  });

  languageToggle.querySelector('.lang-en')?.classList.toggle('is-active', currentLocale === 'en');
  languageToggle.querySelector('.lang-zh')?.classList.toggle('is-active', currentLocale === 'zh');

  const openSections = [...menuSections.querySelectorAll('.menu-section-header[aria-expanded="true"]')].map((b) => b.dataset.sectionToggle);
  const selectedProduct = productSelect.value;
  renderMenu();
  openSections.forEach((id) => toggleSection(id, true));
  renderSeasonal();
  populateProductSelect();
  if (selectedProduct) productSelect.value = selectedProduct;
  if (lastOrder && !orderResult.hidden) renderOrderResult(lastOrder);
  persistLocale(currentLocale);
}

function setupAnchorOpeners() {
  document.querySelectorAll('[data-open-section]').forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.dataset.openSection;
      toggleSection(id, true);
    });
  });
}

function showSlide(index) {
  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots = [...document.querySelectorAll('[data-slide-to]')];
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    const active = i === currentSlide;
    slide.classList.toggle('is-active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentSlide));
}

function setMinimumCollectionDate() {
  const today = new Date();
  const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  dateInput.min = local.toISOString().slice(0,10);
}

function openOrder(product = '') {
  clearErrors();
  orderForm.hidden = false;
  orderResult.hidden = true;
  lastOrder = null;
  if (product) productSelect.value = product;
  if (typeof orderModal.showModal === 'function') orderModal.showModal();
  else orderModal.setAttribute('open','');
  requestAnimationFrame(() => productSelect.focus());
}

function closeOrder() {
  if (typeof orderModal.close === 'function' && orderModal.open) orderModal.close();
  else orderModal.removeAttribute('open');
}

function bindOrderTriggers(scope = document) {
  scope.querySelectorAll('.order-trigger').forEach((button) => {
    if (button.dataset.bound) return;
    button.dataset.bound = '1';
    button.addEventListener('click', () => openOrder(button.dataset.product || ''));
  });
}

function formDataObject() {
  const formData = new FormData(orderForm);
  return {
    product:String(formData.get('product') || ''),
    size:orderSize.selectedOptions[0]?.textContent?.trim() || String(formData.get('size') || ''),
    date:String(formData.get('date') || ''),
    name:String(formData.get('name') || '').trim(),
    contact:String(formData.get('contact') || '').trim(),
    notes:String(formData.get('notes') || '').trim(),
    consent:formData.get('consent') === 'on'
  };
}

function clearErrors() {
  document.querySelectorAll('[data-error-for]').forEach((n) => n.textContent = '');
  orderForm.querySelectorAll('[aria-invalid="true"]').forEach((n) => n.removeAttribute('aria-invalid'));
}

function showErrors(errors) {
  clearErrors();
  for (const [field,message] of Object.entries(errors)) {
    const errorNode = document.querySelector(`[data-error-for="${field}"]`);
    if (errorNode) errorNode.textContent = message;
    const input = orderForm.elements.namedItem(field);
    if (input && 'setAttribute' in input) input.setAttribute('aria-invalid','true');
  }
  const first = orderForm.elements.namedItem(Object.keys(errors)[0]);
  if (first && 'focus' in first) first.focus();
}

function currentProductLabel(productId) {
  const product = productById(productId);
  return product ? productCopy(product).name : productId;
}

function renderOrderResult(data) {
  const summary = formatOrderSummary(data, currentLocale, currentProductLabel(data.product));
  summaryNode.textContent = summary;
  if (CONTACT_EMAIL) {
    const subject = currentLocale === 'zh' ? 'PhDessert 预约咨询' : 'PhDessert Order Enquiry';
    emailOrder.href = `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
    emailOrder.hidden = false;
  } else {
    emailOrder.hidden = true;
  }
}

async function copySummary() {
  const text = summaryNode.textContent;
  if (!text) return;
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
    else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    copyOrder.textContent = t(currentLocale,'result.copied');
    setTimeout(() => copyOrder.textContent = t(currentLocale,'result.copy'), 1400);
  } catch {
    copyOrder.textContent = t(currentLocale,'result.copy');
  }
}

function setupFaq() {
  faqList.addEventListener('click', (event) => {
    const button = event.target.closest('.faq-question');
    if (!button) return;
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const willOpen = button.getAttribute('aria-expanded') !== 'true';
    faqList.querySelectorAll('.faq-question').forEach((b) => {
      const p = document.getElementById(b.getAttribute('aria-controls'));
      b.setAttribute('aria-expanded','false');
      b.querySelector('span:last-child').textContent = '＋';
      if (p) p.hidden = true;
    });
    button.setAttribute('aria-expanded', String(willOpen));
    button.querySelector('span:last-child').textContent = willOpen ? '−' : '＋';
    if (panel) panel.hidden = !willOpen;
  });
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.08, rootMargin:'0px 0px -24px'});
  els.forEach((el) => observer.observe(el));
}

languageToggle.addEventListener('click', () => applyTranslations(currentLocale === 'en' ? 'zh' : 'en'));
document.getElementById('heroPrev').addEventListener('click', () => showSlide(currentSlide - 1));
document.getElementById('heroNext').addEventListener('click', () => showSlide(currentSlide + 1));
document.getElementById('heroDots').addEventListener('click', (event) => {
  const dot = event.target.closest('[data-slide-to]');
  if (dot) showSlide(Number(dot.dataset.slideTo));
});

modalClose.addEventListener('click', closeOrder);
modalCancel.addEventListener('click', closeOrder);
orderModal.addEventListener('click', (e) => { if (e.target === orderModal) closeOrder(); });
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = formDataObject();
  const validation = validateOrder(data, currentLocale);
  if (!validation.ok) {
    showErrors(validation.errors);
    return;
  }
  clearErrors();
  lastOrder = data;
  renderOrderResult(data);
  orderForm.hidden = true;
  orderResult.hidden = false;
  orderResult.focus?.();
});
copyOrder.addEventListener('click', copySummary);
editOrder.addEventListener('click', () => {
  orderResult.hidden = true;
  orderForm.hidden = false;
  productSelect.focus();
});

async function boot() {
  try {
    const sprites = await loadSprites();
    html.style.setProperty('--products-sprite', `url("${sprites.products}")`);
    html.style.setProperty('--campaign-sprite', `url("${sprites.campaign}")`);
    html.classList.add('assets-ready');
  } catch (error) {
    console.error('PhDessert image assets could not be loaded.', error);
    html.classList.add('assets-error');
  }

  renderMenu();
  renderSeasonal();
  populateProductSelect();
  bindOrderTriggers(document);
  setupAnchorOpeners();
  setupFaq();
  setMinimumCollectionDate();
  applyTranslations(currentLocale);
  showSlide(0);
  document.getElementById('copyrightYear').textContent = String(new Date().getFullYear());
  initReveal();
}

boot();

export { PRODUCTS, MENU_SECTIONS };
