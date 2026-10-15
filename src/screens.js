import { icon, logo } from './icons.js';
import { preview, transactions, accounts, bills, members } from './fixtures.js';
import { money, number, escapeHTML as esc } from './i18n.js';
import { blueHome, transferScreen, creditCardScreen } from './blue-screens.js';
import { floatingNavigation, navigationContext } from './navigation.js';
import { walletScreen } from './wallet.js';

export const destinations = ['home', 'wallet', 'activity', 'add', 'bills', 'party'];
export function navigation(state, t) {
  const context=navigationContext(state.route,state.cardReturn);
  const selectedRoute=context==='more'?(state.route==='party'?'party':'bills'):context;
  return `<nav class="navigation" aria-label="${t('navLabel')}">${destinations.map(route => route === 'add'
    ? `<button class="nav-item nav-add" data-action="add" aria-haspopup="dialog"><span class="add-disc">${icon('plus')}</span><span>${t('add')}</span></button>`
    : `<a class="nav-item ${selectedRoute === route ? 'is-active' : ''}" href="#${route}" ${selectedRoute === route ? 'aria-current="page"' : ''}>${icon(route)}<span>${t(route)}</span><span class="nav-active-mark"></span></a>`).join('')}</nav>`;
}
export function shell(state, t) {
  const blueRoute = ['home','transfer','credit-card'].includes(state.route);
  return `<aside class="sidebar"><a href="#home" class="brand" aria-label="${t('appName')}">${logo}<span>GisSino<span class="brand-dot">.</span></span></a>${navigation(state, t)}<div class="sidebar-footer"><div class="sidebar-note">${icon('shield')}<span>${t('sampleOnly')}</span></div><p>${t('welcomeNote')}</p><button class="profile-rail" data-action="settings"><span class="avatar">GS</span><span>${t('hello')}<small>${t('settings')}</small></span>${icon('chevron')}</button></div></aside>
  <div class="workspace ${blueRoute?'blue-workspace':''}"><div class="preview-banner">${icon('info')}<span>${t('previewLabel')}</span><span class="banner-detail">${t('previewNote')}</span></div>
    ${blueRoute?'':`<header class="app-header"><a class="brand mobile-brand" href="#home">${logo}<span>GisSino<span class="brand-dot">.</span></span></a><div class="desktop-context">${icon(state.route === 'settings' ? 'home' : state.route)}<span>${t(state.route)}</span></div><div class="header-actions"><button class="icon-button" data-action="theme" aria-label="${t('toggleTheme')}" title="${t('toggleTheme')}">${icon(state.theme === 'dark' ? 'sun' : 'moon')}</button><button class="icon-button" data-action="notifications" aria-label="${t('notifications')}">${icon('bell')}</button><button class="avatar avatar-button" data-action="settings" aria-label="${t('profile')}">GS</button></div></header>`}
    <main id="main" class="${blueRoute?'blue-main':''}" tabindex="-1">${screen(state, t)}</main><footer class="page-footer">${icon('shield')}<span>${t('previewNote')}</span></footer>
  </div>${floatingNavigation(state,t)}`;
}
const sectionHeader = (title, action = '') => `<div class="section-heading"><h2>${title}</h2>${action}</div>`;
const link = (href, label) => `<a class="text-link" href="#${href}">${label}${icon('arrow')}</a>`;
const pageHead = (state, t, options = '') => `<div class="page-heading"><div><p class="greeting">${state.route === 'home' ? t('hello') : t(state.route)}</p><h1>${t(`${state.route}Title`)}</h1><p class="page-subtitle">${t(`${state.route}Subtitle`)}</p></div>${options || `<span class="date-label">${icon('calendar')}${t('sampleDate')}</span>`}</div>`;
const displayMoney = (value, state, decimals = false) => state.balanceVisible ? money(value, state.locale, decimals) : '••••••';
const pill = (text, kind = '') => `<span class="status ${kind}">${text}</span>`;

export function transactionRow(item, state, t) {
  const sign = item.type === 'income' ? '+' : item.type === 'expense' ? '−' : '';
  return `<button class="transaction-row" data-action="transaction" data-id="${item.id}"><span class="well-icon ${item.type}">${icon(item.icon)}</span><span class="row-copy"><strong>${t(item.name)}</strong><small>${t(item.category)}<span class="separator">·</span>${item.time}${item.needsDetails ? `<span class="needs-dot">${t('needsDetails')}</span>` : ''}</small></span><span class="row-amount ${item.type}">${sign}${displayMoney(item.amount, state)}${item.type === 'transfer' ? `<small>${t('transfer')}</small>` : ''}</span>${icon('chevron', 'row-chevron')}</button>`;
}
function accountCards(state, t) {
  return `<div class="account-grid">${accounts.map((a, i) => `<button class="account-card panel" data-action="account" data-id="${a.id}"><span class="account-card-top"><span class="well-icon ${i ? 'neutral' : 'accent'}">${icon(a.kind)}</span>${icon('arrow')}</span><strong>${t(a.name)}</strong><span class="account-suffix">${t('demoSuffix', { suffix: a.suffix })}</span><span class="account-balance">${displayMoney(a.amount, state)}</span><span class="account-rule ${i ? 'secondary' : ''}"></span></button>`).join('')}</div>`;
}
function billRow(item, state, t, compact = false) {
  return `<button class="bill-row ${compact ? 'compact' : ''}" data-action="bill" data-id="${item.id}"><span class="bill-date"><strong>${item.due}</strong><small>${t('shortMonth')}</small></span><span class="row-copy"><strong>${t(item.name)}</strong><small>${t(item.category)}${item.installment ? ` · ${t('installment')} ${item.installment}` : ''}</small></span><span class="row-amount"><strong>${displayMoney(item.amount, state)}</strong>${pill(t(item.status), item.status === 'dueSoon' ? 'warning' : '')}</span>${icon('chevron', 'row-chevron')}</button>`;
}
function week(t, filled = 5) {
  const names = t('weekDays').split(',');
  return `<div class="week-dots" role="img" aria-label="${t('weekProgress', { n: filled })}">${names.map((n, i) => `<span class="week-day ${i < filled ? 'done' : ''}"><small>${n}</small><span>${i < filled ? icon('check') : `<span class="day-empty"></span>`}</span></span>`).join('')}</div>`;
}
function habitCard(t) {
  return `<section class="panel habit-panel">${sectionHeader(t('habitTitle'), `<span class="habit-flame">${icon('flame')}<strong>7</strong></span>`)}<p class="muted small">${t('habitSubtitle')}</p>${week(t)}<div class="habit-bottom"><span>${t('habitProgress')}</span>${link('party', t('habitCTA'))}</div></section>`;
}
function home(state, t) {
  return `${pageHead(state, t)}<div class="dashboard-grid"><div class="dashboard-primary">
    <section class="balance-panel enamel" aria-label="${t('balance')}"><div class="balance-head"><span>${t('balance')}</span><button class="icon-button" data-action="balance" aria-label="${t(state.balanceVisible ? 'hideBalance' : 'showBalance')}">${icon(state.balanceVisible ? 'eye' : 'eyeoff')}</button></div><div class="balance-amount" aria-live="polite">${displayMoney(preview.balance, state, true)}</div><p class="balance-caption">${icon('wallet')}${t('balanceNote')}</p><div class="balance-divider"></div><div class="balance-metrics"><div><span>${t('safe')}${icon('info')}</span><strong>${displayMoney(preview.safe, state)}</strong><small>${t('safeNote')}</small></div><div><span>${t('obligations')}</span><strong>${displayMoney(preview.obligations, state)}</strong><a href="#bills">${t('viewPlan')}${icon('arrow')}</a></div></div></section>
    <section class="quick-actions" aria-label="${t('quickActions')}">${[['expense','recordExpense'],['income','recordIncome'],['transfer','transferAction'],['check','checkin']].map(([mode, text]) => `<button class="quick-action" data-action="mode" data-mode="${mode}"><span class="tactile-key">${icon(mode)}</span><span>${t(text)}</span></button>`).join('')}</section>
    <section class="accounts-section">${sectionHeader(t('accounts'), `<span class="muted small">02</span>`)}${accountCards(state, t)}</section>
    <section class="panel transactions-panel">${sectionHeader(t('recent'), link('activity', t('viewAll')))}<div class="transaction-list">${transactions.slice(0, 3).map(item => transactionRow(item, state, t)).join('')}</div><a class="panel-footer-link" href="#activity">${t('seeActivity')}${icon('arrow')}</a></section>
  </div><div class="dashboard-secondary"><section class="panel upcoming-panel">${sectionHeader(t('dueSoonSection'), icon('calendar', 'muted'))}<p class="muted small">${t('noSurprises')}</p><div class="commitment-figure"><strong>${displayMoney(preview.obligations, state)}</strong><span>${t('thisMonth')}</span></div><div class="bill-list">${bills.slice(0, 2).map(item => billRow(item, state, t, true)).join('')}</div><a class="panel-footer-link" href="#bills">${t('seeBills')}${icon('arrow')}</a></section>${habitCard(t)}<div class="privacy-note">${icon('shield')}<div><strong>${t('privacyTitle')}</strong><p>${t('privacyBody')}</p></div></div></div></div>`;
}
function stateSelect(state, t) {
  return `<label class="state-control"><span>${t('stateLabel')}</span><select id="preview-state" data-control="preview-state">${['sample', 'empty', 'loading', 'error', 'unavailable'].map(s => `<option value="${s}" ${state.previewState === s ? 'selected' : ''}>${t(`state${s[0].toUpperCase()}${s.slice(1)}`)}</option>`).join('')}</select></label>`;
}
export function stateCard(kind, t, billsEmpty = false) {
  if (kind === 'loading') return `<section class="empty-state panel" aria-busy="true"><div class="skeleton-list" aria-hidden="true">${[1,2,3].map(() => '<div class="skeleton-row"><span></span><span></span><span></span></div>').join('')}</div><h2>${t('loadingTitle')}</h2><p>${t('loadingBody')}</p><button class="button secondary" data-action="retry">${t('retry')}</button></section>`;
  const symbol = kind === 'error' ? 'refresh' : kind === 'unavailable' ? 'lock' : 'wallet';
  const title = billsEmpty && kind === 'empty' ? 'billEmptyTitle' : `${kind}Title`;
  const body = billsEmpty && kind === 'empty' ? 'billEmptyBody' : `${kind}Body`;
  return `<section class="empty-state panel"><span class="empty-symbol">${icon(symbol)}</span><h2>${t(title)}</h2><p>${t(body)}</p><button class="button secondary" data-action="${kind === 'empty' ? 'add' : 'retry'}">${t(kind === 'empty' ? 'add' : 'retry')}</button></section>`;
}
function monthSelect(state, t) {
  return `<label class="month-select">${icon('calendar')}<span class="sr-only">${t('month')}</span><select data-control="month" aria-label="${t('month')}" title="${t('monthNote')}"><option value="october">${t('october')}</option></select></label>`;
}
export function activityResults(state, t) {
  if (state.previewState !== 'sample') return stateCard(state.previewState, t);
  const query = state.search.trim().toLocaleLowerCase();
  const items = transactions.filter(item => (state.filter === 'all' || item.type === state.filter) && (!query || `${t(item.name)} ${t(item.category)}`.toLocaleLowerCase().includes(query)));
  if (!items.length) return `<section class="empty-state panel"><span class="empty-symbol">${icon('search')}</span><h2>${t('noResultsTitle')}</h2><p>${t('noResultsBody')}</p><button class="button secondary" data-action="clear-search">${t('clearSearch')}</button></section>`;
  return ['today', 'yesterday'].map(day => {
    const group = items.filter(item => item.day === day);
    return group.length ? `<section class="transaction-group"><h2>${t(day)}</h2><div class="panel">${group.map(item => transactionRow(item, state, t)).join('')}</div></section>` : '';
  }).join('');
}
function activity(state, t) {
  return `${pageHead(state,t,monthSelect(state,t))}<div class="summary-grid"><div class="panel summary-card"><span class="well-icon income">${icon('income')}</span><div><span>${t('income')}</span><strong>${displayMoney(preview.income,state)}</strong></div></div><div class="panel summary-card"><span class="well-icon expense">${icon('expense')}</span><div><span>${t('expense')}</span><strong>${displayMoney(preview.expense,state)}</strong></div></div></div><div class="activity-toolbar"><label class="search-field">${icon('search')}<span class="sr-only">${t('search')}</span><input id="activity-search" type="search" placeholder="${t('searchPlaceholder')}" value="${esc(state.search)}" autocomplete="off" maxlength="120"></label>${stateSelect(state,t)}</div><div class="filter-chips" role="group" aria-label="${t('filterLabel')}">${['all','expense','income','transfer'].map(filter => `<button class="chip ${state.filter === filter ? 'selected' : ''}" data-action="filter" data-filter="${filter}" aria-pressed="${state.filter === filter}">${t(filter)}</button>`).join('')}</div><div id="activity-results">${activityResults(state,t)}</div><p class="context-note">${t('monthNote')}</p>`;
}
function calendar(state,t) {
  return `<section class="panel calendar-panel"><div class="calendar-week" aria-hidden="true">${t('weekDays').split(',').map(x=>`<span>${x}</span>`).join('')}</div><div class="calendar-days">${Array.from({length:3},()=>'<span class="calendar-blank"></span>').join('')}${Array.from({length:31},(_,i)=>{
    const day=i+1;const due=bills.find(b=>b.due===day);
    return due ? `<button class="calendar-day has-bill" data-action="bill" data-id="${due.id}" aria-label="${t('dueDate',{date:t('dayMonth',{day})})}, ${t(due.name)}"><span>${day}</span><span class="calendar-dot"></span></button>` : `<span class="calendar-day ${day===16?'is-today':''}">${day}</span>`;
  }).join('')}</div><div class="calendar-compact"><p class="muted small">${t('calendarCompact')}</p>${bills.map(item=>billRow(item,state,t)).join('')}</div><p class="muted small">${t('calendarHint')}</p></section>`;
}
function billsScreen(state,t) {
  return `${pageHead(state,t,monthSelect(state,t))}<section class="commitments-panel enamel"><div><span>${t('committed')}</span><strong>${displayMoney(preview.obligations,state)}</strong><p>${t('fourBills')}</p></div><span class="commitments-icon">${icon('calendar')}</span></section><div class="bills-toolbar"><div class="segmented" role="group" aria-label="${t('billsView')}">${['list','calendar'].map(view=>`<button data-action="bills-view" data-view="${view}" class="${state.billsView===view?'selected':''}" aria-pressed="${state.billsView===view}">${icon(view)}${t(view)}</button>`).join('')}</div>${stateSelect(state,t)}</div>${state.previewState !== 'sample' ? stateCard(state.previewState,t,true) : state.billsView === 'calendar' ? calendar(state,t) : `<div class="bills-sections">${['creditCards','monthlyBills','installments','subscriptions'].map(cat=>`<section>${sectionHeader(t(cat))}<div class="panel">${bills.filter(b=>b.category===cat).map(b=>billRow(b,state,t)).join('')}</div></section>`).join('')}</div>`}`;
}
function party(state,t) {
  return `${pageHead(state,t,`<button class="button secondary" data-action="visibility">${icon('shield')}${t('visibility')}</button>`)}<div class="party-grid"><div class="party-primary"><section class="party-status enamel"><div class="party-status-header"><span class="avatar avatar-large">GS</span><div><span>${t('myProgress')}</span><h2>${t('hello')}</h2></div><span class="level-pill">${t('level',{n:8})}</span></div><div class="xp-line"><strong>1,240 <span>${t('xp')}</span></strong><span>${t('nextLevel')}</span></div><progress max="1500" value="1240" aria-label="${t('xp')}"></progress><div class="party-stats"><div>${icon('flame')}<span>${t('dayStreak')}<strong>${t('days',{n:7})}</strong></span></div><div>${icon('snow')}<span>${t('freezes')}<strong>${t('freezeCount')}</strong></span></div></div></section><section class="panel badges-panel">${sectionHeader(t('badges'))}<div class="badge-gallery">${[['star','badgeFirst'],['flame','badgeWeek'],['wallet','badgeCalm'],['lock','badgeMonth']].map(([i,k],n)=>`<div class="badge-item ${n===3?'locked':''}"><span class="medallion">${icon(i)}</span><strong>${t(k)}</strong>${n===3?`<small>${t('locked')}</small>`:''}</div>`).join('')}</div></section><section class="panel leaderboard-panel">${sectionHeader(t('leaderboard'),pill(t('weekly')))}${members.map((m,i)=>`<div class="leaderboard-row"><span class="rank">${i+1}</span><span class="avatar ${i===0?'you':''}">${m.initials}</span><span class="row-copy"><strong>${t(m.name)}</strong><small>${m.id==='you'&&!state.shareStreak?t('hiddenFromParty'):t('days',{n:m.streak})}</small></span><strong class="xp-value">${m.id==='you'&&!state.shareXP?`<small>${t('hiddenFromParty')}</small>`:`${number(m.xp,state.locale)} <small>${t('xp')}</small>`}</strong></div>`).join('')}</section></div><div class="party-secondary"><div class="privacy-note panel">${icon('shield')}<div><strong>${t('privacyTitle')}</strong><p>${t('privacyBody')}</p></div></div><section class="panel members-panel">${sectionHeader(t('members'),'<span class="muted small">03</span>')}<div class="member-stack">${members.map(m=>`<span class="avatar">${m.initials}</span>`).join('')}</div><p class="muted small">${t('inviteNote')}</p><button class="button primary full-width" data-action="invite">${icon('plus')}${t('invite')}</button></section><section class="panel feed-panel">${sectionHeader(t('activityFeed'))}<div class="feed-item"><span class="well-icon">${icon('flame')}</span><div><strong>${t('feedOne')}</strong><small>${t('feedTime')}</small></div></div><div class="feed-item"><span class="well-icon">${icon('trophy')}</span><div><strong>${t('feedTwo')}</strong><small>${t('feedTime')}</small></div></div></section></div></div>`;
}
function settings(state,t) {
  const rows=[['party','profileSettings','profileInfo'],['globe','currency','fxInfo'],['tag','categories','categoryInfo'],['bell','notifications','notificationsBody'],['shield','privacy','privacyPreview'],['lock','security','securityInfo'],['download','install','installInfo']];
  return `${pageHead(state,t)}<div class="settings-grid"><section class="panel preferences-panel">${sectionHeader(t('preferences'))}<div class="setting-row"><span>${icon(state.theme==='dark'?'moon':'sun')}${t('theme')}</span><div class="segmented">${['light','dark'].map(mode=>`<button data-action="set-theme" data-theme="${mode}" class="${state.theme===mode?'selected':''}" aria-pressed="${state.theme===mode}">${t(mode)}</button>`).join('')}</div></div><div class="setting-row"><label for="locale-select">${icon('globe')}${t('language')}</label><select id="locale-select" data-control="locale"><option value="th" ${state.locale==='th'?'selected':''}>${t('thai')}</option><option value="en" ${state.locale==='en'?'selected':''}>${t('english')}</option></select></div><p class="context-note">${t('settingsPreview')}</p></section><section class="panel setting-links">${rows.map(([i,k,content])=>`<button class="settings-link" data-action="settings-detail" data-title="${k}" data-content="${content}"><span class="well-icon">${icon(i)}</span><strong>${t(k)}</strong>${icon('chevron')}</button>`).join('')}</section></div>`;
}
export function screen(state,t) {
  if(state.route==='wallet') return walletScreen(state,t);
  if(state.route==='home') return blueHome(state,t,transactionRow);
  if(state.route==='transfer') return transferScreen(state,t);
  if(state.route==='credit-card') return creditCardScreen(state,t,transactionRow);
  return ({activity,bills:billsScreen,party,settings}[state.route]||home)(state,t);
}
export function addMenu(t) {
  const options=[['expense','expense','manualExpense','manualDesc'],['income','income','manualIncome','manualDesc'],['transfer','transfer','transferAction','transferDesc'],['slip','upload','slip','slipDesc'],['check','check','checkin','checkinDesc']];
  return `<p class="sheet-subtitle">${t('addSubtitle')}</p><div class="add-menu">${options.map(([mode,i,k,desc])=>`<button class="add-option" data-action="mode" data-mode="${mode}"><span class="well-icon">${icon(i)}</span><span><strong>${t(k)}</strong><small>${t(desc)}</small></span>${icon('chevron')}</button>`).join('')}<button class="add-option future-option" data-action="mode" data-mode="ai"><span class="well-icon">${icon('sparkle')}</span><span><strong>${t('aiEntry')}</strong><small>${t('future')}</small></span>${icon('chevron')}</button></div><p class="sheet-disclaimer">${icon('info')}${t('addNote')}</p>`;
}
export function addForm(mode,state,t) {
  const isTransfer=mode==='transfer';
  return `<p class="sheet-subtitle">${t('addNote')}</p><form id="entry-form" novalidate><div id="form-error" class="form-error" role="alert" tabindex="-1" hidden></div><label class="field amount-field">${t('amount')}<span class="amount-input"><span>${t('currencySymbol')}</span><input id="entry-amount" name="amount" type="number" min="0.01" max="999999999" step="0.01" inputmode="decimal" placeholder="0.00" required></span></label><label class="field">${t('note')}<input id="entry-note" name="note" maxlength="120" placeholder="${t('notePlaceholder')}" required autocomplete="off"></label><div class="form-grid"><label class="field">${t(isTransfer?'fromAccount':'account')}<select id="entry-account" name="account">${accounts.map(a=>`<option value="${a.id}">${t(a.name)}</option>`).join('')}</select></label>${isTransfer?`<label class="field">${t('toAccount')}<select id="entry-destination" name="destination">${accounts.map((a,i)=>`<option value="${a.id}" ${i===1?'selected':''}>${t(a.name)}</option>`).join('')}</select></label>`:`<label class="field">${t('date')}<input type="date" id="entry-date" name="date" value="2026-10-16" required></label>`}</div><button class="button primary full-width" type="submit">${t('previewAction')}${icon('arrow')}</button><p class="sheet-disclaimer">${icon('shield')}${t('detailNote')}</p></form>`;
}
