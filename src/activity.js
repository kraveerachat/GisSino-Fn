import { icon } from './icons.js';
import { escapeHTML as esc } from './i18n.js';
import { formatMoney } from './core/money.js';
import { formatTime } from './core/dates.js';
import { accountName } from './account-display.js';
import { previewControlsVisible } from './config/feature-flags.js';
import { walletRingSegments } from './wallet-history.js';
import { activityModel, activityTransactions, activityPeriod, activityCategory, activityDateLabel, filteredActivity } from './activity-data.js';

export function activityContext(state) {
  const entries=state.previewState==='empty'?[]:state.activityEntries||activityTransactions;
  const model=activityModel(entries,state.activityPeriod||activityPeriod);
  const present=model.totals.filter(total=>total.present);
  const total=present.find(total=>total.currency===state.activityCurrency)||present[0]||model.totals[0];
  const unavailable=!model.validPeriod||(model.records.length===0&&entries.length>0)||!total.available||model.invalidDates>0||model.unsupportedCurrency;
  return {model,total,unavailable,periodLabel:activityDateLabel(`${model.period}-01`,state.locale)||'—'};
}
const value=(minor,state,t,currency='THB')=>esc(!state.balanceVisible?t('hiddenAmount'):formatMoney(minor,currency,{locale:state.locale})||t('notRecorded'));
// Donut centre and legend: compact numerals; the currency code is labelled beside them.
const numeral=(minor,state,t,currency='THB')=>esc(!state.balanceVisible?t('hiddenAmount'):formatMoney(minor,currency,{locale:state.locale,symbol:false,decimals:'auto'})||t('notRecorded'));
const recordAmount=item=>Number.isSafeInteger(item.amountMinor)&&item.amountMinor>=0?item.amountMinor:null;
const percent=(share,state,t)=>!state.balanceVisible?t('hiddenAmount'):share===null?'—':`${new Intl.NumberFormat(state.locale==='th'?'th-TH':'en-GB',{maximumFractionDigits:1}).format(share)}%`;
const label=(item,t)=>item.type==='transfer'?t('transfer'):item.type==='income'?t('income'):t(activityCategory(item).label);
// Transfers show both ends (WP-20 F9). The fixture transfer names only its destination,
// so an unassigned source reads "Not recorded" instead of an invented account.
const accountLabel=(id,fallbackKey,state,t)=>{const account=(state.accountProfiles||[]).find(a=>a.id===id);return account?accountName(account,state,t):id!==null&&fallbackKey?t(fallbackKey):t('notRecorded');};
function accountRows(item,state,t) {
  if(item.type!=='transfer')return [[t('account'),accountLabel(item.accountId,item.account,state,t)]];
  return [[t('fromAccount'),accountLabel(item.fromAccountId??null,null,state,t)],[t('toAccount'),accountLabel(item.toAccountId??null,item.account,state,t)]];
}
const time=item=>item.date.length===10?'—':formatTime(item.date)||'—';
function categoryRow(category,total,state,t) {
  const show=state.balanceVisible&&total.available&&category.share!==null;
  return `<li class="activity-category activity-category-${category.id}${category.amount===0?' is-zero':''}"><span class="activity-category-icon" aria-hidden="true">${icon(category.icon)}</span><div class="activity-category-copy"><div><span>${t(category.label)}</span><strong>${value(category.amount,state,t,total.currency)}</strong></div><div class="activity-category-bottom"><span class="activity-bar" aria-hidden="true">${show&&category.amount>0?`<svg viewBox="0 0 1000 4" preserveAspectRatio="none"><rect width="${category.share*10}" height="4" rx="2"/></svg>`:''}</span><span class="activity-share">${percent(category.share,state,t)}</span></div></div></li>`;
}
function analytics(state,t,context) {
  const {total,periodLabel}=context;
  const available=!context.unavailable;
  const visible=state.balanceVisible&&available;
  const paths=visible?walletRingSegments([{kind:'income',amount:total.income},{kind:'expense',amount:total.expense}],total.movement):[];
  const top=total.categories.filter(category=>category.amount>0).slice(0,4);
  return `<section class="activity-analytics panel" aria-labelledby="activity-overview-title"><div class="activity-flow"><div class="activity-section-heading"><h2 id="activity-overview-title">${t('activityMonthlyOverview')}</h2><span>${esc(periodLabel)}</span></div><div class="activity-flow-body"><div class="activity-donut"><svg viewBox="0 0 320 320" aria-hidden="true" focusable="false"><circle class="activity-ring-track" cx="160" cy="160" r="128" fill="none" stroke-width="30"/>${paths.map(segment=>`<path class="activity-series-${segment.kind}" d="${segment.path}"/>`).join('')}</svg><div class="activity-donut-center"><span>${t('activityNet')}</span><strong>${numeral(available?total.net:null,state,t,total.currency)}</strong><small>${esc(total.currency)}</small></div></div><dl class="activity-flow-legend">${['income','expense'].map(kind=>`<div class="activity-series-${kind}"><dt><span class="activity-legend-dot" aria-hidden="true"></span>${t(kind)}</dt><dd><strong>${numeral(available?total[kind]:null,state,t,total.currency)}</strong><span>${percent(available?total[`${kind}Share`]:null,state,t)}</span></dd></div>`).join('')}</dl></div><p class="activity-basis">${t(!available?'activityIncomplete':total.movement===0?'activityNoMovement':'activityMovementBasis')}</p></div><div class="activity-breakdown"><div class="activity-section-heading"><h2>${t('activityTopCategories')}</h2><button class="activity-all-categories text-link" data-action="activity-categories"${available?'':' disabled'}>${t('activityViewAllCategories')}${icon('chevron')}</button></div>${!available?`<p class="activity-category-empty">${t('activityIncomplete')}</p>`:top.length?`<ul class="activity-category-list">${top.map(category=>categoryRow(category,total,state,t)).join('')}</ul>`:`<p class="activity-category-empty">${t('activityNoExpenses')}</p>`}<p class="activity-basis">${t('activityCategoryBasis')}</p></div></section>`;
}
export function activityResults(state,t,stateCard) {
  if(!['sample','empty'].includes(state.previewState))return stateCard(state.previewState,t);
  const {model,total}=activityContext(state);
  if(state.previewState==='empty')return stateCard('empty',t);
  const records=model.records.filter(item=>item.currency===total.currency);
  const items=filteredActivity(records,state,t);
  if(!items.length)return `<section class="empty-state panel"><span class="empty-symbol">${icon('search')}</span><h2>${t('noResultsTitle')}</h2><p>${t('noResultsBody')}</p><button class="button secondary" data-action="clear-search">${t('clearSearch')}</button></section>`;
  return [...new Set(items.map(item=>item.dayKey))].map(day=>`<section class="transaction-group"><h2>${esc(activityDateLabel(day,state.locale,{day:'numeric',month:'short'}))}</h2><div class="panel">${items.filter(item=>item.dayKey===day).map(item=>`<button class="transaction-row" data-action="transaction" data-id="${esc(item.id)}"><span class="well-icon ${esc(item.type)}">${icon(item.icon||activityCategory(item).icon)}</span><span class="row-copy"><strong>${esc(t(item.name))}</strong><small>${esc(label(item,t))}<span class="separator">·</span>${time(item)}${item.needsDetails?`<span class="needs-dot">${t('needsDetails')}</span>`:''}</small></span><span class="row-amount ${esc(item.type)}">${state.balanceVisible&&recordAmount(item)!==null?(item.type==='income'?'+':item.type==='expense'?'−':''):''}${value(recordAmount(item),state,t,item.currency)}</span>${icon('chevron','row-chevron')}</button>`).join('')}</div></section>`).join('');
}
export function activityScreen(state,t,{stateCard,stateSelect}) {
  const context=activityContext(state),{model,total}=context;
  const options=model.periods.length?model.periods:[activityPeriod];
  const available=model.totals.filter(item=>item.present);
  return `<div class="activity-v2"><header class="activity-heading"><div><h1>${t('activityTitle')}</h1><p>${t('activitySubtitleV2')}</p></div><div class="activity-heading-controls"><label class="month-select">${icon('calendar')}<span class="sr-only">${t('month')}</span><select id="activity-month" data-control="activity-month">${options.map(period=>`<option value="${period}"${period===model.period?' selected':''}>${esc(activityDateLabel(`${period}-01`,state.locale))}</option>`).join('')}</select></label><button class="icon-button" data-action="balance" aria-label="${t(state.balanceVisible?'hideBalance':'showBalance')}">${icon(state.balanceVisible?'eye':'eyeoff')}</button></div></header>${available.length>1?`<label class="activity-currency">${t('activityCurrency')}<select data-control="activity-currency">${available.map(item=>`<option${item.currency===total.currency?' selected':''}>${item.currency}</option>`).join('')}</select><span>${t('walletSeparateCurrencies')}</span></label>`:''}${['sample','empty'].includes(state.previewState)?analytics(state,t,context):''}<section class="activity-ledger" aria-labelledby="activity-ledger-title"><div class="activity-ledger-heading"><h2 id="activity-ledger-title">${t('activityTransactionsTitle')}</h2><span>${t('activityListScope')}</span></div><div class="activity-toolbar"><label class="search-field">${icon('search')}<span class="sr-only">${t('search')}</span><input id="activity-search" type="search" placeholder="${t('searchPlaceholder')}" value="${esc(state.search)}" autocomplete="off" maxlength="120"></label></div><div class="filter-chips" role="group" aria-label="${t('filterLabel')}">${['all','expense','income','transfer'].map(filter=>`<button class="chip ${state.filter===filter?'selected':''}" data-action="filter" data-filter="${filter}" aria-pressed="${state.filter===filter}">${t(filter)}</button>`).join('')}</div><div id="activity-results">${activityResults(state,t,stateCard)}</div></section>${previewControlsVisible()?`<details class="activity-preview-tools"><summary>${t('activityPreviewStates')}</summary>${stateSelect(state,t)}</details>`:''}<p class="context-note">${t('activityFixtureNote')}</p></div>`;
}
export function activityCategoryDialog(state,t) {
  const context=activityContext(state),{total,periodLabel}=context;
  return `<div class="activity-catalog-summary"><p>${esc(periodLabel)} · ${esc(total.currency)}</p><span>${t('activityExpenseTotal')}</span><strong>${value(context.unavailable?null:total.expense,state,t,total.currency)}</strong></div><p class="activity-basis">${t('activityCategoryBasis')}</p><ul class="activity-category-list">${total.categories.map(category=>categoryRow(category,total,state,t)).join('')}</ul>`;
}
export function activityTransactionDetail(id,state,t) {
  const {model}=activityContext(state),item=model.records.find(record=>record.id===id);
  if(!item)return null;
  return `<div class="detail-hero"><span class="well-icon ${esc(item.type)}">${icon(item.icon||activityCategory(item).icon)}</span><h3>${esc(t(item.name))}</h3><strong>${value(recordAmount(item),state,t,item.currency)}</strong>${item.needsDetails?`<span class="status warning">${t('needsDetails')}</span>`:''}</div><dl class="details-list">${[[t('category'),label(item,t)],...accountRows(item,state,t),[t('date'),activityDateLabel(item.dayKey,state.locale,{day:'numeric',month:'long'})],[t('time'),time(item)],[t('reference'),`DEMO-${item.id.toUpperCase()}`]].map(([name,text])=>`<div><dt>${esc(name)}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl><p class="info-callout">${icon('info')}${t(item.type==='transfer'?'transferNote':item.needsDetails?'needDetailBody':'detailNote')}</p><p class="sheet-disclaimer">${t('detailNote')}</p>`;
}
