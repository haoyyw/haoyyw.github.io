import { normaliseLocale, t } from './i18n.js';
import { validateOrder, formatOrderSummary } from './order.js';

document.documentElement.classList.add('js');

const CONTACT_EMAIL = '';
const STORAGE_KEY = 'phdessert-locale';
const html = document.documentElement;
const languageToggle = document.getElementById('languageToggle');
const orderModal = document.getElementById('orderModal');
const orderForm = document.getElementById('orderForm');
const orderResult = document.getElementById('orderResult');
const faqList = document.getElementById('faqList');
const productSelect = document.getElementById('orderProduct');
const dateInput = document.getElementById('orderDate');
const summaryNode = document.getElementById('orderSummary');
const copyOrder = document.getElementById('copyOrder');
const emailOrder = document.getElementById('emailOrder');
const editOrder = document.getElementById('editOrder');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');

let currentLocale = readStoredLocale();
let lastOrder = null;

function readStoredLocale() {
  try {
    return normaliseLocale(localStorage.getItem(STORAGE_KEY) || 'en');
  } catch {
    return 'en';
  }
}

function persistLocale(locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // The site remains fully usable when storage is unavailable.
  }
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

  document.querySelectorAll('[data-i18n-aria-label]').forEach((node) => {
    node.setAttribute('aria-label', t(currentLocale, node.dataset.i18nAriaLabel));
  });

  languageToggle.querySelector('.lang-en')?.classList.toggle('is-active', currentLocale === 'en');
  languageToggle.querySelector('.lang-zh')?.classList.toggle('is-active', currentLocale === 'zh');

  if (lastOrder && !orderResult.hidden) renderOrderResult(lastOrder);
  persistLocale(currentLocale);
}

function setMinimumCollectionDate() {
  const today = new Date();
  const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  dateInput.min = local.toISOString().slice(0, 10);
}

function openOrder(product = '') {
  clearErrors();
  if (product) productSelect.value = product;
  orderForm.hidden = false;
  orderResult.hidden = true;
  lastOrder = null;
  if (typeof orderModal.showModal === 'function') orderModal.showModal();
  else orderModal.setAttribute('open', '');
  requestAnimationFrame(() => productSelect.focus());
}

function closeOrder() {
  if (typeof orderModal.close === 'function' && orderModal.open) orderModal.close();
  else orderModal.removeAttribute('open');
}

function formDataObject() {
  const formData = new FormData(orderForm);
  return {
    product: String(formData.get('product') || ''),
    size: String(formData.get('size') || ''),
    date: String(formData.get('date') || ''),
    name: String(formData.get('name') || '').trim(),
    contact: String(formData.get('contact') || '').trim(),
    notes: String(formData.get('notes') || '').trim(),
    consent: formData.get('consent') === 'on',
  };
}

function clearErrors() {
  document.querySelectorAll('[data-error-for]').forEach((node) => { node.textContent = ''; });
  orderForm.querySelectorAll('[aria-invalid="true"]').forEach((node) => node.removeAttribute('aria-invalid'));
}

function showErrors(errors) {
  clearErrors();
  for (const [field, message] of Object.entries(errors)) {
    const errorNode = document.querySelector(`[data-error-for="${field}"]`);
    if (errorNode) errorNode.textContent = message;
    const input = orderForm.elements.namedItem(field);
    if (input && 'setAttribute' in input) input.setAttribute('aria-invalid', 'true');
  }
  const firstField = Object.keys(errors)[0];
  const firstInput = orderForm.elements.namedItem(firstField);
  if (firstInput && 'focus' in firstInput) firstInput.focus();
}

function productLabel() {
  return productSelect.selectedOptions[0]?.textContent?.trim() || productSelect.value;
}

function renderOrderResult(data) {
  const summary = formatOrderSummary(data, currentLocale, productLabel());
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
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    copyOrder.textContent = t(currentLocale, 'result.copied');
    setTimeout(() => { copyOrder.textContent = t(currentLocale, 'result.copy'); }, 1500);
  } catch {
    copyOrder.textContent = t(currentLocale, 'result.copy');
  }
}

languageToggle.addEventListener('click', () => {
  applyTranslations(currentLocale === 'en' ? 'zh' : 'en');
});

document.querySelectorAll('.order-trigger').forEach((button) => {
  button.addEventListener('click', () => openOrder(button.dataset.product || ''));
});

modalClose.addEventListener('click', closeOrder);
modalCancel.addEventListener('click', closeOrder);
orderModal.addEventListener('click', (event) => {
  if (event.target === orderModal) closeOrder();
});

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();
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

faqList.addEventListener('click', (event) => {
  const button = event.target.closest('.faq-question');
  if (!button) return;
  const panelId = button.getAttribute('aria-controls');
  const panel = document.getElementById(panelId);
  const willOpen = button.getAttribute('aria-expanded') !== 'true';

  faqList.querySelectorAll('.faq-question').forEach((otherButton) => {
    const otherPanel = document.getElementById(otherButton.getAttribute('aria-controls'));
    otherButton.setAttribute('aria-expanded', 'false');
    if (otherPanel) otherPanel.hidden = true;
  });

  button.setAttribute('aria-expanded', String(willOpen));
  if (panel) panel.hidden = !willOpen;
});

function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px' });
  elements.forEach((el) => observer.observe(el));
}

setMinimumCollectionDate();
applyTranslations(currentLocale);
document.getElementById('copyrightYear').textContent = String(new Date().getFullYear());
initReveal();
