import { normaliseLocale } from './i18n.js';

const messages = {
  en: {
    product: 'Please choose a dessert.',
    size: 'Please choose a size.',
    date: 'Please choose a collection date.',
    dateFuture: 'Please choose a future collection date.',
    name: 'Please enter your name.',
    contact: 'Please enter a contact method.',
    consent: 'Please confirm the enquiry terms.',
  },
  zh: {
    product: '请选择甜品。',
    size: '请选择尺寸。',
    date: '请选择取货日期。',
    dateFuture: '请选择未来的取货日期。',
    name: '请输入姓名。',
    contact: '请输入联系方式。',
    consent: '请确认预约咨询条款。',
  },
};

function isFutureDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  const candidate = new Date(`${value}T23:59:59`);
  if (Number.isNaN(candidate.getTime())) return false;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return candidate >= today;
}

export function validateOrder(data = {}, locale = 'en') {
  const lang = normaliseLocale(locale);
  const m = messages[lang];
  const errors = {};

  if (!data.product) errors.product = m.product;
  if (!data.size) errors.size = m.size;
  if (!data.date) errors.date = m.date;
  else if (!isFutureDate(data.date)) errors.date = m.dateFuture;
  if (!String(data.name || '').trim()) errors.name = m.name;
  if (!String(data.contact || '').trim()) errors.contact = m.contact;
  if (!data.consent) errors.consent = m.consent;

  return { ok: Object.keys(errors).length === 0, errors };
}

export function formatOrderSummary(data, locale = 'en', productLabel = data.product || '') {
  const lang = normaliseLocale(locale);
  const notes = String(data.notes || '').trim();
  if (lang === 'zh') {
    return [
      'PhDessert 预约咨询',
      `甜品：${productLabel}`,
      `尺寸：${data.size}`,
      `取货日期：${data.date}`,
      `姓名：${data.name}`,
      `联系方式：${data.contact}`,
      `备注：${notes || '无'}`,
    ].join('\n');
  }

  return [
    'PhDessert Order Enquiry',
    `Dessert: ${productLabel}`,
    `Size: ${data.size}`,
    `Collection date: ${data.date}`,
    `Name: ${data.name}`,
    `Contact: ${data.contact}`,
    `Notes: ${notes || 'None'}`,
  ].join('\n');
}
