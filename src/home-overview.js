import { accounts,bills,transactions,homePreview } from './fixtures.js';
import { icon } from './icons.js';
import { escapeHTML as esc } from './i18n.js';
import { bangkokClock } from './core/clock.js';
import { formatMoney } from './core/money.js';
import { formatDate } from './core/dates.js';
import { safeToSpend } from './core/safe-to-spend.js';
import { withPaid } from './core/obligations.js';
import { worldObligations } from './fixtures/world.js';
import { flags, previewControlsVisible } from './config/feature-flags.js';

export { bangkokClock };

// "Spending shortfall" and "Sample group context" change nothing visible since D31 (their
// renderers are unmounted), so they stay hidden unless flags.homeScenarioExtras is on.
export const previewScenarios=homePreview.scenarios.filter(key=>flags.homeScenarioExtras||!['shortfall','party'].includes(key));

const currencies=['THB','USD'];
const dayOrdinal=key=>Date.parse(key+'T00:00:00Z')/86400000;
const validDay=key=>/^\d{4}-\d{2}-\d{2}$/.test(key)&&Number.isFinite(dayOrdinal(key))&&new Date(key+'T00:00:00Z').toISOString().slice(0,10)===key;
// A read-only fixture projection, not a ledger, obligation or habit engine.
export function deriveHomeOverview({nowLocal,assets=[],obligations=[],entries=[],activityDays=[],streak=0,freezes=0,reminderAt='20:00',party=null,monthlyExpense=null}) {
  const clock=bangkokClock(nowLocal);
  if(!clock)throw new TypeError('Invalid synthetic Bangkok preview time');
  const unpaid=obligations.filter(b=>b.paid===false&&validDay(b.dueDate)).slice().sort((a,b)=>a.dueDate.localeCompare(b.dueDate)||a.id.localeCompare(b.id));
  const nearest=unpaid[0]?{...unpaid[0],days:dayOrdinal(unpaid[0].dueDate)-dayOrdinal(clock.date)}:null;
  const liquid=assets.filter(a=>['bank','ewallet','cash'].includes(a.accountType)&&!a.archived);
  const current=unpaid.filter(b=>b.dueDate.slice(0,7)===clock.month);
  const totals=currencies.filter(c=>liquid.some(a=>a.currency===c)||current.some(b=>b.currency===c)).map(currency=>safeToSpend(liquid,current,currency));
  const due=unpaid.filter(b=>dayOrdinal(b.dueDate)-dayOrdinal(clock.date)<=3);
  const details=entries.filter(e=>e.needsDetails).length;
  const inactive=!activityDays.includes(clock.date)&&clock.time>=reminderAt;
  const today=[];
  if(details)today.push({kind:'details',route:'activity',count:details});
  if(inactive)today.push(streak>0?{kind:'streak',action:'add',count:streak}:{kind:'inactive',action:'add'});
  const upcoming=uniqueObligations(unpaid.filter(b=>dayOrdinal(b.dueDate)-dayOrdinal(clock.date)<=7));
  return {clock,totals,nearest,notices:due,upcoming,today,streak,freezes,party:party?.synthetic===true&&Number.isSafeInteger(party.rank)&&party.rank>0?{...party}:null,monthlyExpense:monthlyExpense?.month===clock.month?monthlyExpense:null};
}

// Home due items are the Bills base dataset (Fixture World) with the session's
// mark-paid overlay, so Home, Bills and Wallet agree on what is still unpaid.
export const homeObligations = (state={}) => withPaid(worldObligations,state.billPreviewPaid||[]).flatMap(record=>record.cycles.map(cycle=>({
  ...cycle,recordId:record.id,name:record.title,icon:record.icon,currency:record.currency
})));
export function homeOverview(state) {
  const scenario=homePreview.scenarios.includes(state.homeScenario)?state.homeScenario:'sample';
  const obligations=homeObligations(state).map(b=>({...b,paid:scenario==='clear'?true:b.paid,amountMinor:scenario==='shortfall'&&b.recordId==='card'&&b.dueDate.startsWith('2026-10')?20000000:b.amountMinor}));
  return deriveHomeOverview({nowLocal:bangkokClock(state.homeNow||'')?state.homeNow:homePreview.nowLocal,assets:state.accountProfiles||accounts,obligations,
    entries:scenario==='clear'?[]:transactions,activityDays:[...homePreview.habit.activeDays,...(state.homeDemoDays||[]),...(scenario==='clear'?[state.homeNow?.slice(0,10)||homePreview.nowLocal.slice(0,10)]:[])],
    streak:homePreview.habit.streak,freezes:homePreview.freezes,reminderAt:homePreview.reminderAt,party:scenario==='party'?homePreview.sampleParty:null,monthlyExpense:homePreview.monthlyExpense});
}

// @deprecated thin wrapper; use formatMoney from core/money.js.
export const homeMoney=(value,currency,locale='th')=>formatMoney(value,currency,{locale});
const showMoney=(value,currency,state,t)=>state.balanceVisible?formatMoney(value,currency,{locale:state.locale})||t('notRecorded'):t('hiddenAmount');
const dayStatus=(days,t)=>days<0?t(days===-1?'homeOverdueOne':'homeOverdue',{n:-days}):days===0?t('homeDueToday'):t(days===1?'homeDueInOne':'homeDueIn',{n:days});
const dateLabel=(date,locale)=>formatDate(date,{locale,day:'numeric',month:'short',year:'numeric'});
const obligationName=(b,state,t)=>b.name&&typeof b.name==='object'?b.name[state.locale]||b.name.th:t(b.name);
export function todayStrip(model,t) {
  if(!model.today.length)return '';
  const row=item=>{
    const labels={due:'homeTodayDue',streak:'homeTodayStreak',details:'homeTodayDetails',inactive:'homeTodayInactive'};
    const glyphs={due:'calendar',streak:'flame',details:'activity',inactive:'plus'};
    return `<${item.route?'a':'button'} class="today-item" ${item.route?`href="#${item.route}"`:'type="button" data-action="add"'}>${icon(glyphs[item.kind])}<span><strong>${t(labels[item.kind],{n:item.count})}</strong></span>${icon('chevron')}</${item.route?'a':'button'}>`;
  };
  return `<section id="today-strip" class="today-strip" aria-labelledby="today-title"><div class="today-heading"><h2 id="today-title">${t('homeTodayTitle')}</h2><span>${t('homePriorityCount',{n:model.today.length})}</span></div><div class="today-items">${model.today.slice(0,2).map(row).join('')}</div>${model.today.length>2?`<details class="today-more"><summary>${t('homeMorePriorities',{n:model.today.length-2})}${icon('down')}</summary><div class="today-items">${model.today.slice(2).map(row).join('')}</div></details>`:''}</section>`;
}
export function homeDecisions(model,state,t) {
  const totals=model.totals.length?model.totals:[{currency:'THB',available:false,safeMinor:null}];
  return `<a class="home-safe" href="#wallet"><span><strong>${t('blueSafe')}</strong><small>${t('homeSafeCompact')}</small></span><span class="safe-values">${totals.map(total=>`<span class="safe-currency ${total.available&&total.safeMinor<0?'has-shortfall':''}"><strong>${total.available?showMoney(total.safeMinor,total.currency,state,t):t('notRecorded')}</strong><small>${total.available&&total.safeMinor<0?t('homeShortfall'):total.currency}</small></span>`).join('')}</span>${icon('chevron')}</a>`;
}
function uniqueObligations(items) {
  const seen=new Set(),ids=new Set();
  return items.filter(item=>{
    const key=JSON.stringify([item.name,item.dueDate,item.currency,item.amountMinor]);
    if(ids.has(item.id)||seen.has(key))return false;
    ids.add(item.id);seen.add(key);return true;
  });
}
export function dueNotices(model) { return uniqueObligations(model.notices); }
// G1 (flags.homeDueTodayFirst, off by default; D31 sort/limit needs owner approval):
// rows due today come first and overdue rows beyond the first collapse into one summary row.
export function dueTodayFirst(rows,today,limit=4) {
  const days=row=>dayOrdinal(row.dueDate)-dayOrdinal(today);
  const dueToday=rows.filter(row=>days(row)===0),overdue=rows.filter(row=>days(row)<0),later=rows.filter(row=>days(row)>0);
  const shownOverdue=overdue.slice(0,1),hidden=overdue.length-shownOverdue.length;
  return {rows:[...dueToday,...shownOverdue,...later].slice(0,hidden?limit-1:limit),hiddenOverdue:hidden};
}
export function upcomingDueList(model,state,t,{todayFirst=flags.homeDueTodayFirst}={}) {
  if(!model.upcoming.length)return '';
  const row=b=>{
    const days=dayOrdinal(b.dueDate)-dayOrdinal(model.clock.date);
    const urgency=days<0?'overdue':days<=3?'soon':'upcoming';
    const known=bills.some(item=>item.id===b.id)||worldObligations.some(record=>record.cycles.some(cycle=>cycle.id===b.id));
    const date=formatDate(b.dueDate,{locale:state.locale,day:'numeric',month:'short'});
    return `<li><${known?'button':'a'} class="home-due-row is-${urgency}" ${known?`type="button" data-action="bill" data-id="${esc(b.id)}"`:'href="#bills"'}><span class="home-due-icon">${icon(b.icon||'calendar')}</span><span class="home-due-copy"><strong>${esc(obligationName(b,state,t))}</strong><small><span class="home-due-status">${dayStatus(days,t)}</span><time datetime="${b.dueDate}">${date}</time></small></span>${icon('chevron')}</${known?'button':'a'}></li>`;
  };
  const ordered=todayFirst?dueTodayFirst(model.upcoming,model.clock.date):{rows:model.upcoming.slice(0,4),hiddenOverdue:0};
  const collapsed=ordered.hiddenOverdue?`<li><a class="home-due-row is-overdue home-due-more" href="#bills"><span class="home-due-icon">${icon('calendar')}</span><span class="home-due-copy"><strong>${t('homeMoreOverdue',{n:ordered.hiddenOverdue})}</strong></span>${icon('chevron')}</a></li>`:'';
  return `<section class="home-due-list" aria-labelledby="home-due-title"><div class="home-due-heading"><h2 id="home-due-title">${t('homeDueSoon')}</h2><a href="#bills">${t('viewAll')}${icon('chevron')}</a></div><ul>${ordered.rows.map(row).join('')}${collapsed}</ul></section>`;
}
export function notificationPreview(model,state,t) {
  const notices=dueNotices(model);
  return `<p class="sheet-disclaimer">${t('homeNoticePreview')}</p>${notices.length?`<ul class="home-notices">${notices.map(b=>`<li><a href="#bills">${icon(b.icon||'calendar')}<span><strong>${esc(obligationName(b,state,t))}</strong><time datetime="${b.dueDate}">${dateLabel(b.dueDate,state.locale)}</time><small class="${b.dueDate<model.clock.date?'has-shortfall':''}">${dayStatus(dayOrdinal(b.dueDate)-dayOrdinal(model.clock.date),t)}</small></span>${icon('chevron')}</a></li>`).join('')}</ul>`:`<div class="empty-state sheet-empty">${icon('bell')}<h3>${t('homeNoObligation')}</h3><p>${t('homeNoticesEmpty')}</p></div>`}`;
}
export function homeStreak(model,state,t) {
  return `<a class="streak-strip home-streak enamel-list" href="#party"><span class="mini-plate">${icon('flame')}</span><span><strong>${t('homeStreakCount',{n:model.streak})}</strong><small>${model.party?esc(t('homePartyRank',{n:model.party.rank,name:state.locale==='th'?model.party.nameTh:model.party.nameEn})):t('homeStreakHint')}</small></span><span class="streak-freeze">${icon('snow')}${t('homeFreezes',{n:model.freezes})}</span>${icon('chevron')}</a>`;
}
export function homeMonthly(model,state,t) {
  const monthly=model.monthlyExpense;
  return `<a class="home-monthly" href="#activity"><span>${t('monthlySummary')} <span class="monthly-value">${monthly?showMoney(monthly.amountMinor,monthly.currency,state,t):t('homeNoMonthly')}</span></span><span class="monthly-destination">${t('homeActivityLink')}${icon('chevron')}</span></a>`;
}
export function homeSnapshot(model,state,t) {
  return `<p class="home-snapshot">${icon('info')}<span>${t('homeSnapshot',{date:formatDate(model.clock.instant,{locale:state.locale,dateStyle:'medium',timeStyle:'short'})})}</span>${previewControlsVisible()?`<a href="#settings">${t('homePreviewAdjust')}</a>`:''}</p>`;
}
export function homePreviewControls(state,t) {
  return `<section class="panel home-preview-controls"><h2>${t('homePreviewControls')}</h2><p>${t('homePreviewScope')}</p><label for="home-preview-scenario">${t('homeScenario')}</label><select id="home-preview-scenario" data-control="home-scenario">${previewScenarios.map(key=>`<option value="${key}" ${state.homeScenario===key?'selected':''}>${t('homeScenario'+key)}</option>`).join('')}</select><label for="home-preview-clock">${t('homeClock')}</label><input id="home-preview-clock" type="datetime-local" min="2000-01-01T00:00" max="2099-12-31T23:59" step="60" data-control="home-clock" value="${esc(state.homeNow||homePreview.nowLocal)}" aria-describedby="home-clock-note"><p id="home-clock-note">${t('homeClockNote',{time:homePreview.reminderAt})}</p><a class="text-link" href="#home">${t('homeReturn')}</a></section>`;
}
