import { icon } from './icons.js';
import { accounts } from './fixtures.js';
import { escapeHTML as esc } from './i18n.js';
import { accountDisplay, providerBadge } from './account-display.js';
import { walletOverview, walletMoney } from './wallet-overview.js';

const categories = [
  { kind: 'bank', label: 'bankAccounts', icon: 'bank' },
  { kind: 'ewallet', label: 'eWallets', icon: 'wallet' },
  { kind: 'cash', label: 'cashAccounts', icon: 'cash' },
  { kind: 'liabilities', label: 'walletCardsAndObligations', icon: 'card' }
];

export function walletScreen(state, t) {
  const model = walletOverview(state.accountProfiles || accounts);
  const primary = model.totals[0];
  const amount = (value, currency = 'THB') => esc(!state.balanceVisible ? t('hiddenAmount') : walletMoney(value, currency, state.locale) || t('notRecorded'));
  const movement = mix => !state.balanceVisible ? `<span class="wallet-movement">${t('hiddenAmount')}</span>` : mix ? `<span class="wallet-movement"><span>${t('walletMovementMix', mix)}</span><span class="wallet-mix-track" aria-hidden="true"><i style="width:${mix.income}%"></i></span></span>` : `<span class="wallet-movement">${t('walletNoMovement')}</span>`;
  const itemCard = (item, liability = false) => {
    const display = liability ? null : accountDisplay(item, state, t);
    const kind = liability ? t(item.kind === 'credit' ? 'creditCards' : item.kind) : display.type;
    const name = liability ? t(item.name) : display.name;
    const provider = liability ? t('walletPaymentObligation') : display.providerLabel;
    const currency = liability ? item.currency : display.currency;
    const tag = liability && item.billId ? 'button' : 'a';
    const attrs = liability ? item.billId ? `type="button" data-action="bill" data-id="${esc(item.billId)}"` : 'href="#credit-card"' : `href="#wallet/account/${encodeURIComponent(item.id)}" data-account-id="${esc(item.id)}"`;
    return `<${tag} class="wallet-item ${liability ? 'wallet-obligation' : `provider-account-row ${display.theme}`}" ${attrs}>
      <span class="wallet-item-cap"><span class="wallet-item-type">${esc(kind)}</span>${liability ? '' : movement(model.movements.get(item.id))}</span>
      <svg class="wallet-notch" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true"><path d="M0 24V12Q0 0 16 0H120C145 0 149 24 174 24H400Z"/></svg>
      <span class="wallet-item-body"><span class="wallet-item-identity">${liability ? `<span class="wallet-obligation-icon" aria-hidden="true">${icon(item.icon || 'card')}</span>` : providerBadge(display)}<span class="wallet-item-copy"><strong>${esc(name)}</strong><small>${esc(provider)} · ${esc(currency)}</small></span></span><span class="wallet-item-value"><small>${t(liability ? 'walletAmountDue' : 'walletItemBalance')}</small><strong>${amount(liability ? item.amountMinor : item.balanceMinor, item.currency)}</strong></span>${icon('chevron', 'wallet-item-chevron')}</span>
    </${tag}>`;
  };
  let offset = 0;
  const arcs = state.balanceVisible && primary.chartAvailable ? primary.segments.map(segment => {
    const percent = segment.amount / primary.composition * 100;
    const arc = percent > 0 ? `<circle class="wallet-series-${segment.kind}" cx="160" cy="160" r="130" pathLength="100" stroke-dasharray="${Math.max(0, percent - .45)} 100" stroke-dashoffset="${-offset}"/>` : '';
    offset += percent;
    return arc;
  }).join('') : '';
  const legend = categories.map(category => {
    const segment = primary.segments.find(item => item.kind === category.kind);
    const percent = state.balanceVisible && primary.chartAvailable ? `${new Intl.NumberFormat(state.locale === 'th' ? 'th-TH' : 'en-US', { maximumFractionDigits: 1 }).format(segment.amount / primary.composition * 100)}%` : '';
    return `<div class="wallet-legend-row"><dt><span class="wallet-legend-symbol wallet-series-${category.kind}" aria-hidden="true">${icon(category.icon)}</span>${t(category.label)}</dt><dd><strong>${amount(segment.amount)}</strong>${percent ? `<small>${percent}</small>` : ''}</dd></div>`;
  }).join('');
  const sections = categories.map(category => {
    const liability = category.kind === 'liabilities';
    const items = liability ? model.liabilities : model.assets.filter(item => item.accountType === category.kind);
    return `<section class="wallet-category wallet-category-${category.kind}"><div class="wallet-section-heading"><h2>${t(category.label)}</h2><span>${t('walletItemCount', { count: items.length })}</span></div>${liability ? `<p class="wallet-debit-note">${icon('info')}${t('walletDebitNote')}</p>` : ''}<div class="wallet-item-grid">${items.map(item => itemCard(item, liability)).join('') || `<div class="wallet-category-empty"><p>${t('walletEmptyCategory', { category: t(category.label) })}</p>${liability ? '' : `<button class="button secondary" data-action="add-account">${icon('plus')}${t('addAccount')}</button>`}</div>`}</div></section>`;
  }).join('');
  const otherCurrencies = model.totals.filter(total => total.present && total.currency !== 'THB').map(total => `<div class="wallet-other-currency"><strong>${total.currency}</strong><span>${t('walletAssetTotal')} ${amount(total.assets, total.currency)}</span><span>${t('walletObligations')} ${amount(total.liabilities, total.currency)}</span></div>`).join('');
  return `<div class="wallet-screen wallet-v2"><div class="wallet-heading"><div><h1>${t('walletTitle')}</h1></div><button class="icon-plate" data-action="balance" aria-label="${t(state.balanceVisible ? 'hideBalance' : 'showBalance')}">${icon(state.balanceVisible ? 'eye' : 'eyeoff')}</button></div>
    <section class="wallet-composition" aria-label="${t('walletCompositionTitle')}"><div class="wallet-ring"><svg viewBox="0 0 320 320" aria-hidden="true"><circle class="wallet-ring-track" cx="160" cy="160" r="130"/>${arcs}</svg><div class="wallet-ring-center"><span>${t('walletAssetTotal')} · THB</span><strong class="${state.balanceVisible && (walletMoney(primary.assets, 'THB', state.locale)?.length || 0) > 15 ? 'wallet-long-amount' : ''}">${amount(primary.assets)}</strong><small>${t('walletObligations')}</small><b>${amount(primary.liabilities)}</b></div></div><div class="wallet-composition-details"><h2>${t('walletCompositionTitle')}</h2><p>${t('walletCompositionBasis')}</p><dl class="wallet-legend">${legend}</dl>${state.balanceVisible && !primary.chartAvailable ? `<p class="wallet-chart-note">${t('walletChartUnavailable')}</p>` : ''}</div>${otherCurrencies ? `<div class="wallet-currency-note">${otherCurrencies}<small>${t('walletSeparateCurrencies')}</small></div>` : ''}${model.unsupportedCurrency ? `<p class="wallet-chart-note">${t('walletUnknownCurrency')}</p>` : ''}</section>
    <p class="wallet-movement-basis">${t('walletMovementBasis')}</p><div class="wallet-categories">${sections}</div><div class="wallet-footer-actions"><button class="button primary" data-action="add-account">${icon('plus')}${t('addAccount')}</button><a class="button secondary" href="#transfer">${icon('transfer')}${t('transferAction')}</a></div></div>`;
}
