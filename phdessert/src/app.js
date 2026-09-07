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
const menuList = document.getElementById('menuList');

const PRODUCTS = [
  { id:'product-01', zh:'桃花酥', en:'Peach Blossom Pastry', categories:['chinese','pastry'] },
  { id:'product-02', zh:'桂花糕', en:'Osmanthus Cake', categories:['chinese','pastry'] },
  { id:'product-03', zh:'蝴蝶酥', en:'Palmier', categories:['french','pastry','biscuit'] },
  { id:'product-04', zh:'台式芋头酥', en:'Taiwanese Taro Pastry', categories:['chinese','pastry'] },
  { id:'product-05', zh:'可可巴斯克', en:'Cocoa Basque Cheesecake', categories:['cake'] },
  { id:'product-06', zh:'抹茶巴斯克', en:'Matcha Basque Cheesecake', categories:['cake'] },
  { id:'product-07', zh:'原味巴斯克', en:'Classic Basque Cheesecake', categories:['cake'] },
  { id:'product-08', zh:'开心果巴斯克', en:'Pistachio Basque Cheesecake', categories:['cake'] },
  { id:'product-09', zh:'抹茶柚子巴斯克', en:'Matcha Yuzu Basque Cheesecake', categories:['cake'] },
  { id:'product-10', zh:'柠檬巴巴露亚', en:'Lemon Bavarois', categories:['french','cake'] },
  { id:'product-11', zh:'肉松小贝', en:'Pork Floss Sponge Cake', categories:['chinese','pastry'] },
  { id:'product-12', zh:'茉莉青提抹茶奶油蛋糕', en:'Jasmine Grape Matcha Cream Cake', categories:['cake','seasonal'] },
  { id:'product-13', zh:'椰子天使卷', en:'Coconut Angel Roll', categories:['cake'] },
  { id:'product-14', zh:'抹茶格莱斯无花果蛋糕', en:'Matcha Fig Cake', categories:['cake','seasonal'] },
  { id:'product-15', zh:'柚子柠檬乳酪慕斯蛋糕', en:'Yuzu Lemon Cheesecake Mousse', categories:['cake'] },
  { id:'product-16', zh:'酸奶碗', en:'Yoghurt Bowl', categories:['pastry'] },
  { id:'product-17', zh:'抹茶柚子芝士蛋糕', en:'Matcha Yuzu Cheesecake', categories:['cake'] },
  { id:'product-18', zh:'椰奶冻冻杨枝甘露蛋糕', en:'Coconut Jelly Mango Pomelo Cake', categories:['cake','seasonal'] },
  { id:'product-19', zh:'绿豆糕', en:'Mung Bean Cake', categories:['chinese','pastry'] },
  { id:'product-20', zh:'纯大米糕', en:'Steamed Rice Cake', categories:['chinese','pastry'] },
  { id:'product-21', zh:'提拉米苏', en:'Tiramisu', categories:['cake'] },
  { id:'product-22', zh:'轻乳酪蛋糕', en:'Light Cheesecake', categories:['cake'] },
  { id:'product-23', zh:'草莓鲜奶蛋糕', en:'Strawberry Fresh Cream Cake', categories:['cake','seasonal'] },
  { id:'product-24', zh:'蜂蜜蛋糕', en:'Honey Cake', categories:['pastry','cake'] },
  { id:'product-25', zh:'双皮奶', en:'Double-Skin Milk Pudding', categories:['chinese'] },
];

const CATEGORY_LABELS = {
  chinese:'中式 / Chinese', french:'法式 / French-inspired', pastry:'糕点 / Pastry', cake:'蛋糕 / Cakes', biscuit:'饼干 / Biscuits', seasonal:'季节限定 / Seasonal'
};

let currentLocale = readStoredLocale();
let lastOrder = null;
let activeFilter = 'all';

function readStoredLocale() {
  try { return normaliseLocale(localStorage.getItem(STORAGE_KEY) || 'en'); }
  catch { return 'en'; }
}
function persistLocale(locale) { try { localStorage.setItem(STORAGE_KEY, locale); } catch {} }

function renderMenu(filter = activeFilter) {
  activeFilter = filter;
  const shown = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.categories.includes(filter));
  menuList.innerHTML = shown.map((p) => {
    const index = String(PRODUCTS.indexOf(p) + 1).padStart(2, '0');
    const tags = p.categories.map((c) => `<span>${CATEGORY_LABELS[c]}</span>`).join('');
    return `<article class="menu-item reveal is-visible" data-categories="${p.categories.join(' ')}">
      <div class="menu-number">${index}</div>
      <div class="menu-name"><h3>${p.zh}</h3><p>${p.en}</p></div>
      <div class="menu-tags">${tags}</div>
      <button class="product-link order-trigger" type="button" data-product="${p.id}"><span>${t(currentLocale,'product.enquire')}</span><span aria-hidden="true">↗</span></button>
    </article>`;
  }).join('');
  bindOrderTriggers(menuList);
}

function populateProductSelect() {
  const first = productSelect.querySelector('option[value=""]');
  productSelect.innerHTML = '';
  if (first) productSelect.append(first);
  PRODUCTS.forEach((p) => {
    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = `${p.zh} · ${p.en}`;
    productSelect.append(option);
  });
}

function applyTranslations(locale) {
  currentLocale = normaliseLocale(locale);
  html.dataset.locale = currentLocale;
  html.lang = currentLocale === 'zh' ? 'zh-Hans' : 'en';
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t(currentLocale, node.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => { node.setAttribute('placeholder', t(currentLocale, node.dataset.i18nPlaceholder)); });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((node) => { node.setAttribute('aria-label', t(currentLocale, node.dataset.i18nAriaLabel)); });
  languageToggle.querySelector('.lang-en')?.classList.toggle('is-active', currentLocale === 'en');
  languageToggle.querySelector('.lang-zh')?.classList.toggle('is-active', currentLocale === 'zh');
  renderMenu(activeFilter);
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
  orderForm.hidden = false; orderResult.hidden = true; lastOrder = null;
  if (typeof orderModal.showModal === 'function') orderModal.showModal(); else orderModal.setAttribute('open','');
  requestAnimationFrame(() => productSelect.focus());
}
function closeOrder() { if (typeof orderModal.close === 'function' && orderModal.open) orderModal.close(); else orderModal.removeAttribute('open'); }
function bindOrderTriggers(scope = document) { scope.querySelectorAll('.order-trigger').forEach((button) => { if (button.dataset.bound) return; button.dataset.bound='1'; button.addEventListener('click', () => openOrder(button.dataset.product || '')); }); }

function formDataObject() {
  const formData = new FormData(orderForm);
  return { product:String(formData.get('product')||''), size:String(formData.get('size')||''), date:String(formData.get('date')||''), name:String(formData.get('name')||'').trim(), contact:String(formData.get('contact')||'').trim(), notes:String(formData.get('notes')||'').trim(), consent:formData.get('consent')==='on' };
}
function clearErrors() { document.querySelectorAll('[data-error-for]').forEach((n)=>{n.textContent='';}); orderForm.querySelectorAll('[aria-invalid="true"]').forEach((n)=>n.removeAttribute('aria-invalid')); }
function showErrors(errors) { clearErrors(); for (const [field,message] of Object.entries(errors)) { const errorNode=document.querySelector(`[data-error-for="${field}"]`); if(errorNode) errorNode.textContent=message; const input=orderForm.elements.namedItem(field); if(input&&'setAttribute' in input) input.setAttribute('aria-invalid','true'); } const first=orderForm.elements.namedItem(Object.keys(errors)[0]); if(first&&'focus' in first) first.focus(); }
function productLabel() { return productSelect.selectedOptions[0]?.textContent?.trim() || productSelect.value; }
function renderOrderResult(data) {
  const summary = formatOrderSummary(data,currentLocale,productLabel()); summaryNode.textContent=summary;
  if(CONTACT_EMAIL){const subject=currentLocale==='zh'?'PhDessert 预约咨询':'PhDessert Order Enquiry'; emailOrder.href=`mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`; emailOrder.hidden=false;} else emailOrder.hidden=true;
}
async function copySummary(){const text=summaryNode.textContent;if(!text)return;try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(text);else{const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();}copyOrder.textContent=t(currentLocale,'result.copied');setTimeout(()=>{copyOrder.textContent=t(currentLocale,'result.copy');},1500);}catch{copyOrder.textContent=t(currentLocale,'result.copy');}}

languageToggle.addEventListener('click',()=>applyTranslations(currentLocale==='en'?'zh':'en'));
document.querySelectorAll('.menu-filter').forEach((button)=>button.addEventListener('click',()=>{document.querySelectorAll('.menu-filter').forEach((b)=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});button.classList.add('is-active');button.setAttribute('aria-pressed','true');renderMenu(button.dataset.filter||'all');}));
modalClose.addEventListener('click',closeOrder); modalCancel.addEventListener('click',closeOrder); orderModal.addEventListener('click',(e)=>{if(e.target===orderModal)closeOrder();});
orderForm.addEventListener('submit',(e)=>{e.preventDefault();const data=formDataObject();const validation=validateOrder(data,currentLocale);if(!validation.ok){showErrors(validation.errors);return;}clearErrors();lastOrder=data;renderOrderResult(data);orderForm.hidden=true;orderResult.hidden=false;orderResult.focus?.();});
copyOrder.addEventListener('click',copySummary);editOrder.addEventListener('click',()=>{orderResult.hidden=true;orderForm.hidden=false;productSelect.focus();});
faqList.addEventListener('click',(event)=>{const button=event.target.closest('.faq-question');if(!button)return;const panel=document.getElementById(button.getAttribute('aria-controls'));const willOpen=button.getAttribute('aria-expanded')!=='true';faqList.querySelectorAll('.faq-question').forEach((b)=>{const p=document.getElementById(b.getAttribute('aria-controls'));b.setAttribute('aria-expanded','false');if(p)p.hidden=true;});button.setAttribute('aria-expanded',String(willOpen));if(panel)panel.hidden=!willOpen;});

function initReveal(){const els=document.querySelectorAll('.reveal');if(!('IntersectionObserver' in window)){els.forEach((el)=>el.classList.add('is-visible'));return;}const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -24px'});els.forEach((el)=>observer.observe(el));}

populateProductSelect();
renderMenu('all');
bindOrderTriggers(document);
setMinimumCollectionDate();
applyTranslations(currentLocale);
document.getElementById('copyrightYear').textContent=String(new Date().getFullYear());
initReveal();
