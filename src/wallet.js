import { icon } from './icons.js';
import { accounts } from './fixtures.js';
import { escapeHTML as esc } from './i18n.js';
import { accountDisplay, providerBadge } from './account-display.js';
import { walletOverview } from './wallet-overview.js';
import { formatMoney } from './core/money.js';
import { bkkDate, bkkMonth } from './core/clock.js';
import { billsOverview, withPaid } from './core/obligations.js';
import { worldObligations } from './fixtures/world.js';
import { walletSnapshots, walletPeriod, walletPeriodLabel, walletRingSegments } from './wallet-history.js';

const categories = [
  { kind: 'bank', label: 'bankAccounts', icon: 'bank' },
  { kind: 'ewallet', label: 'eWallets', icon: 'wallet' },
  { kind: 'cash', label: 'cashAccounts', icon: 'cash' }
];

export function walletScreen(state, t) {
  const period = walletPeriod(state, state.accountProfiles || accounts);
  const model = walletOverview(period.records, undefined, undefined, period.entries, period.period);
  const primary = model.totals[0];
  const periodLabel = walletPeriodLabel(period.period, state.locale);
  const snapshotLabel = walletPeriodLabel(period.period, state.locale, { day: 'numeric' });
  // The ring centre keeps compact numerals ('auto' drops ".00") so it fits at 390px.
  const amount = (value, currency = 'THB', decimals = 'fixed') => esc(!state.balanceVisible ? t('hiddenAmount') : formatMoney(value, currency, { locale: state.locale, decimals }) || t('notRecorded'));
  // "Payments due this month" is the Bills base dataset with the session's mark-paid overlay.
  const monthDue = billsOverview({ month: bkkMonth(), today: bkkDate(), records: withPaid(worldObligations, state.billPreviewPaid || []) }).totals.THB.minor;
  const percent = value => new Intl.NumberFormat(state.locale === 'th' ? 'th-TH' : 'en-US', { maximumFractionDigits: 1 }).format(value);
  const activityButton = (item, display) => {
    if (!state.balanceVisible) return `<span class="wallet-movement">${t('hiddenAmount')}</span>`;
    const activity = model.movements.get(item.id);
    if (!activity) return `<span class="wallet-movement wallet-no-movement">${t('walletNoMonthlyActivity')}</span>`;
    const values = state.walletActivityValues?.[item.id] === true;
    const text = values || activity.income === null ? t('walletMovementValues', { incoming: amount(activity.incoming, item.currency), outgoing: amount(activity.outgoing, item.currency) }) : t('walletMovementMix', activity);
    return `<button type="button" class="wallet-movement wallet-activity-toggle" data-action="wallet-activity" data-id="${esc(item.id)}" aria-pressed="${values}" aria-label="${esc(t('walletToggleActivity', { name: display.name, period: periodLabel, action: t(values ? 'walletShowPercent' : 'walletShowValues') }))}"><span>${text}</span>${icon('transfer')}</button>`;
  };
  const itemCard = item => {
    const display = accountDisplay(item, state, t);
    return `<article class="wallet-item wallet-kind-${item.accountType} ${display.theme}">
      <div class="wallet-item-cap"><span class="wallet-item-type">${esc(display.type)}</span>${activityButton(item, display)}</div>
      <svg class="wallet-notch" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true"><path d="M0 24V12Q0 0 16 0H120C145 0 149 24 174 24H400Z"/></svg>
      <a class="wallet-item-body provider-account-row ${display.theme}" href="#wallet/account/${encodeURIComponent(item.id)}" data-account-id="${esc(item.id)}"${period.history ? ` aria-label="${esc(t('walletOpenCurrentAccount', { name: display.name }))}"` : ''}>
        <span class="wallet-item-identity">${providerBadge(display)}<span class="wallet-item-copy"><strong>${esc(display.name)}</strong><small>${esc(display.providerLabel)} · ${esc(display.currency)}</small></span></span>
        <span class="wallet-item-value"><small>${t(period.history ? 'walletOpeningBalance' : 'walletItemBalance')}</small><strong>${amount(item.balanceMinor, item.currency)}</strong></span>${icon('chevron', 'wallet-item-chevron')}
      </a>
    </article>`;
  };
  const arcs = state.balanceVisible && primary.chartAvailable ? walletRingSegments(primary.segments, primary.composition).map(segment => `<path class="wallet-ring-segment wallet-series-${segment.kind}" d="${segment.path}"/>`).join('') : '';
  const legend = categories.map(category => {
    const segment = primary.segments.find(item => item.kind === category.kind);
    const share = state.balanceVisible && primary.chartAvailable ? `${percent(segment.amount / primary.composition * 100)}%` : '';
    return `<a class="wallet-legend-row wallet-series-${category.kind}" href="#wallet-${category.kind}" data-action="wallet-jump" data-kind="${category.kind}"><span class="wallet-legend-label"><span class="wallet-legend-dot" aria-hidden="true"></span>${t(category.label)}</span><strong>${amount(segment.amount)}</strong><span class="wallet-legend-meta">${share ? `<span>${share}</span><span aria-hidden="true"> · </span>` : ''}${t('walletAccountCount', { count: model.assets.filter(item => item.accountType === category.kind).length })}${icon('chevron')}</span></a>`;
  }).join('');
  const years = [...new Set(walletSnapshots.map(item => item.period.slice(0, 4)))];
  const year = period.period.slice(0, 4);
  const months = Array.from({ length: 12 }, (_, index) => {
    const key = `${year}-${String(index + 1).padStart(2, '0')}`;
    const available = walletSnapshots.some(item => item.period === key);
    const label = walletPeriodLabel(key, state.locale, { year: undefined, month: 'short' });
    return `<button type="button" data-action="wallet-month" data-period="${key}" aria-pressed="${key === period.period}" aria-label="${esc(`${walletPeriodLabel(key, state.locale)}${available ? '' : ` · ${t('walletNoSnapshot')}`}`)}"${available ? '' : ' disabled'}>${esc(label)}</button>`;
  }).join('');
  const historyControls = period.history ? `<div class="wallet-history-controls"><div class="wallet-history-heading"><label class="wallet-year-label" for="wallet-year">${t('walletYear')}<select id="wallet-year" data-control="wallet-year">${years.map(value => `<option value="${value}"${value === year ? ' selected' : ''}>${value}</option>`).join('')}</select></label><span>${t('walletMonthStart')}</span></div><div class="wallet-month-strip" aria-label="${t('walletSnapshotMonth')}"><button type="button" class="wallet-month-arrow" data-action="wallet-month-scroll" data-step="-1" aria-label="${t('walletEarlierMonths')}">${icon('arrow')}</button><div class="wallet-months" tabindex="0" role="group" aria-label="${t('walletSnapshotMonth')}">${months}</div><button type="button" class="wallet-month-arrow" data-action="wallet-month-scroll" data-step="1" aria-label="${t('walletLaterMonths')}">${icon('arrow')}</button></div><span class="wallet-history-note">${t('walletUnavailableMonths')}</span></div>` : '';
  const sections = categories.map(category => {
    const items = model.assets.filter(item => item.accountType === category.kind);
    return `<section id="wallet-${category.kind}" tabindex="-1" class="wallet-category wallet-category-${category.kind}"><div class="wallet-section-heading"><h2><span class="wallet-section-icon wallet-series-${category.kind}" aria-hidden="true">${icon(category.icon)}</span>${t(category.label)}</h2><span>${t('walletAccountCount', { count: items.length })}</span></div><div class="wallet-item-grid">${items.map(itemCard).join('') || `<div class="wallet-category-empty">${icon(category.icon)}<p>${t('walletEmptyCategory', { category: t(category.label) })}</p>${period.history ? '' : `<button class="button secondary" data-action="add-account">${icon('plus')}${t('addAccount')}</button>`}</div>`}</div></section>`;
  }).join('');
  const otherCurrencies = model.totals.filter(total => total.present && total.currency !== 'THB').map(total => `<div class="wallet-other-currency"><strong>${total.currency}</strong><span>${t('walletAssetTotal')} ${amount(total.assets, total.currency)}</span></div>`).join('');
  const obligation = !period.history ? `<a href="#bills" class="wallet-obligations-link">${icon('bills')}<span>${t('walletMonthlyObligations')}</span><strong>${amount(monthDue)}</strong>${icon('chevron')}</a>` : '';
  return `<div class="wallet-screen wallet-v2"><header class="wallet-heading"><div><h1>${t('walletTitle')}</h1><p>${t('walletAssetsSubtitle')}</p></div><button class="icon-plate" data-action="balance" aria-label="${t(state.balanceVisible ? 'hideBalance' : 'showBalance')}">${icon(state.balanceVisible ? 'eye' : 'eyeoff')}</button></header>
    <section class="wallet-composition" aria-label="${t('walletCompositionTitle')}"><div class="wallet-ring"><svg viewBox="0 0 320 320" role="img" aria-label="${esc(t(state.balanceVisible ? 'walletRingDescription' : 'hiddenAmount'))}"><circle class="wallet-ring-track" cx="160" cy="160" r="128"/>${arcs}</svg><div class="wallet-ring-center"><span>${t(period.history ? 'walletSnapshotAssets' : 'walletAssetTotal')}</span><strong class="${state.balanceVisible && (formatMoney(primary.assets, 'THB', { locale: state.locale, decimals: 'auto' })?.length || 0) > 15 ? 'wallet-long-amount' : ''}">${amount(primary.assets, 'THB', 'auto')}</strong><small>${period.history ? esc(t('walletAsOf', { date: snapshotLabel })) : t('walletCurrentBalance')}</small><span class="wallet-currency-label">THB</span></div></div>
    <div class="wallet-composition-details"><div class="wallet-mode-switch" role="group" aria-label="${t('walletSummaryMode')}"><button type="button" data-action="wallet-mode" data-mode="current" aria-pressed="${!period.history}">${t('walletModeCurrent')}</button><button type="button" data-action="wallet-mode" data-mode="history" aria-pressed="${period.history}">${icon('calendar')}${t('walletModeHistory')}</button></div>${historyControls}<nav class="wallet-legend" aria-label="${t('walletAssetBreakdown')}">${legend}</nav>${obligation}${state.balanceVisible && !primary.chartAvailable ? `<p class="wallet-chart-note">${t('walletChartUnavailable')}</p>` : ''}</div>
    ${otherCurrencies ? `<div class="wallet-currency-note">${otherCurrencies}<small>${t('walletSeparateCurrencies')}</small></div>` : ''}${model.unsupportedCurrency ? `<p class="wallet-chart-note">${t('walletUnknownCurrency')}</p>` : ''}</section>
    <p class="wallet-movement-basis"><span class="wallet-month-context">${icon('calendar')}${t('walletMonthlyActivity', { period: periodLabel })}</span><span>${t(period.history ? 'walletHistoryActivityBasis' : 'walletMonthlyActivityBasis')}</span></p><div class="wallet-categories">${sections}</div><div class="wallet-footer-actions"><button class="button primary" data-action="add-account">${icon('plus')}${t('addAccount')}</button><a class="button secondary" href="#transfer">${icon('transfer')}${t('transferAction')}</a></div></div>`;
}
