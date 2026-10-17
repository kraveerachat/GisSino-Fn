import { accounts,bills,transactions,homePreview } from './fixtures.js';
import { icon } from './icons.js';
import { escapeHTML as esc } from './i18n.js';

const currencies=['THB','USD'];
const dayOrdinal=key=>Date.parse(key+'T00:00:00Z')/86400000;
const validDay=key=>/^\d{4}-\d{2}-\d{2}$/.test(key)&&Number.isFinite(dayOrdinal(key))&&new Date(key+'T00:00:00Z').toISOString().slice(0,10)===key;
export function bangkokClock(local) {
  if(!/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(local))return null;
  const instant=new Date(local+':00+07:00');
  if(!validDay(local.slice(0,10))||!Number.isFinite(instant.valueOf()))return null;
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(instant).map(p=>[p.type,p.value]));
  const checked=`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  return checked===local?{instant,date:checked.slice(0,10),month:checked.slice(0,7),time:checked.slice(11)}:null;
}

// A read-only fixture projection, not a ledger, obligation or habit engine.
export function deriveHomeOverview({nowLocal,assets=[],obligations=[],entries=[],activityDays=[],streak=0,freezes=0,reminderAt='20:00',party=null,monthlyExpense=null}) {
  const clock=bangkokClock(nowLocal);
  if(!clock)throw new TypeError('Invalid synthetic Bangkok preview time');
  const unpaid=obligations.filter(b=>b.paid===false&&validDay(b.dueDate)).slice().sort((a,b)=>a.dueDate.localeCompare(b.dueDate)||a.id.localeCompare(b.id));
  const nearest=unpaid[0]?{...unpaid[0],days:dayOrdinal(unpaid[0].dueDate)-dayOrdinal(clock.date)}:null;
  const liquid=assets.filter(a=>['bank','ewallet','cash'].includes(a.accountType)&&!a.archived);
  const current=unpaid.filter(b=>b.dueDate.slice(0,7)===clock.month);
  const totals=currencies.filter(c=>liquid.some(a=>a.currency===c)||current.some(b=>b.currency===c)).map(currency=>{
    const cash=liquid.filter(a=>a.currency===currency),due=current.filter(b=>b.currency===currency);
    let available=cash.every(a=>Number.isSafeInteger(a.balanceMinor))&&due.every(b=>Number.isSafeInteger(b.amountMinor)&&b.amountMinor>=0);
    const liquidMinor=cash.reduce((sum,a)=>sum+BigInt(Number.isSafeInteger(a.balanceMinor)?a.balanceMinor:0),0n);
    const unpaidMinor=due.reduce((sum,b)=>sum+BigInt(Number.isSafeInteger(b.amountMinor)?b.amountMinor:0),0n);
    const safe=liquidMinor-unpaidMinor;
    available=available&&[liquidMinor,unpaidMinor,safe].every(v=>v>=BigInt(Number.MIN_SAFE_INTEGER)&&v<=BigInt(Number.MAX_SAFE_INTEGER));
    return {currency,available,liquidMinor:available?Number(liquidMinor):null,unpaidMinor:available?Number(unpaidMinor):null,safeMinor:available?Number(safe):null};
  });
  const due=unpaid.filter(b=>dayOrdinal(b.dueDate)-dayOrdinal(clock.date)<=3);
  const details=entries.filter(e=>e.needsDetails).length;
  const inactive=!activityDays.includes(clock.date)&&clock.time>=reminderAt;
  const today=[];
  if(details)today.push({kind:'details',route:'activity',count:details});
  if(inactive)today.push(streak>0?{kind:'streak',action:'add',count:streak}:{kind:'inactive',action:'add'});
  return {clock,totals,nearest,notices:due,today,streak,freezes,party:party?.synthetic===true&&Number.isSafeInteger(party.rank)&&party.rank>0?{...party}:null,monthlyExpense:monthlyExpense?.month===clock.month?monthlyExpense:null};
}

export function homeOverview(state) {
  const scenario=homePreview.scenarios.includes(state.homeScenario)?state.homeScenario:'sample';
  const obligations=bills.map(b=>({...b,paid:scenario==='clear'?true:b.paid,amountMinor:scenario==='shortfall'&&b.id==='card'?20000000:b.amountMinor}));
  return deriveHomeOverview({nowLocal:bangkokClock(state.homeNow||'')?state.homeNow:homePreview.nowLocal,assets:state.accountProfiles||accounts,obligations,
    entries:scenario==='clear'?[]:transactions,activityDays:[...homePreview.habit.activeDays,...(state.homeDemoDays||[]),...(scenario==='clear'?[state.homeNow?.slice(0,10)||homePreview.nowLocal.slice(0,10)]:[])],
    streak:homePreview.habit.streak,freezes:homePreview.freezes,reminderAt:homePreview.reminderAt,party:scenario==='party'?homePreview.sampleParty:null,monthlyExpense:homePreview.monthlyExpense});
}

// Exact minor-unit formatting, including -1 minor unit; no floating-point money arithmetic.
export function homeMoney(value,currency,locale='th') {
  if(!Number.isSafeInteger(value)||!currencies.includes(currency))return null;
  const minor=BigInt(value),major=minor/100n,fraction=(minor<0n?-minor:minor)%100n;
  const format=new Intl.NumberFormat(locale==='th'?'th-TH':'en-US',{style:'currency',currency,currencyDisplay:'narrowSymbol',minimumFractionDigits:2,maximumFractionDigits:2});
  return format.formatToParts(minor<0n&&major===0n?-0:major).map(p=>p.type==='fraction'?fraction.toString().padStart(2,'0'):p.value).join('');
}
const showMoney=(value,currency,state,t)=>state.balanceVisible?homeMoney(value,currency,state.locale)||t('notRecorded'):t('hiddenAmount');
const dayStatus=(days,t)=>days<0?t(days===-1?'homeOverdueOne':'homeOverdue',{n:-days}):days===0?t('homeDueToday'):t(days===1?'homeDueInOne':'homeDueIn',{n:days});
const dateLabel=(date,locale)=>new Intl.DateTimeFormat(locale==='th'?'th-TH':'en-GB',{timeZone:'Asia/Bangkok',day:'numeric',month:'short',year:'numeric'}).format(new Date(date+'T00:00:00+07:00'));
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
export function dueNotices(model) {
  const seen=new Set();
  return model.notices.filter(item=>{
    const key=JSON.stringify([item.name,item.dueDate,item.currency,item.amountMinor]);
    if(seen.has(key))return false;
    seen.add(key);return true;
  });
}
export function notificationPreview(model,state,t) {
  const notices=dueNotices(model);
  return `<p class="sheet-disclaimer">${t('homeNoticePreview')}</p>${notices.length?`<ul class="home-notices">${notices.map(b=>`<li><a href="#bills">${icon(b.icon||'calendar')}<span><strong>${t(b.name)}</strong><time datetime="${b.dueDate}">${dateLabel(b.dueDate,state.locale)}</time><small class="${b.dueDate<model.clock.date?'has-shortfall':''}">${dayStatus(dayOrdinal(b.dueDate)-dayOrdinal(model.clock.date),t)}</small></span>${icon('chevron')}</a></li>`).join('')}</ul>`:`<div class="empty-state sheet-empty">${icon('bell')}<h3>${t('homeNoObligation')}</h3><p>${t('homeNoticesEmpty')}</p></div>`}`;
}
export function homeStreak(model,state,t) {
  return `<a class="streak-strip home-streak enamel-list" href="#party"><span class="mini-plate">${icon('flame')}</span><span><strong>${t('homeStreakCount',{n:model.streak})}</strong><small>${model.party?esc(t('homePartyRank',{n:model.party.rank,name:state.locale==='th'?model.party.nameTh:model.party.nameEn})):t('homeStreakHint')}</small></span><span class="streak-freeze">${icon('snow')}${t('homeFreezes',{n:model.freezes})}</span>${icon('chevron')}</a>`;
}
export function homeMonthly(model,state,t) {
  const monthly=model.monthlyExpense;
  return `<a class="home-monthly" href="#activity"><span>${t('monthlySummary')} <span class="monthly-value">${monthly?showMoney(monthly.amountMinor,monthly.currency,state,t):t('homeNoMonthly')}</span></span><span class="monthly-destination">${t('homeActivityLink')}${icon('chevron')}</span></a>`;
}
export function homeSnapshot(model,state,t) {
  return `<p class="home-snapshot">${icon('info')}<span>${t('homeSnapshot',{date:new Intl.DateTimeFormat(state.locale==='th'?'th-TH':'en-GB',{timeZone:'Asia/Bangkok',dateStyle:'medium',timeStyle:'short'}).format(model.clock.instant)})}</span><a href="#settings">${t('homePreviewAdjust')}</a></p>`;
}
export function homePreviewControls(state,t) {
  return `<section class="panel home-preview-controls"><h2>${t('homePreviewControls')}</h2><p>${t('homePreviewScope')}</p><label for="home-preview-scenario">${t('homeScenario')}</label><select id="home-preview-scenario" data-control="home-scenario">${homePreview.scenarios.map(key=>`<option value="${key}" ${state.homeScenario===key?'selected':''}>${t('homeScenario'+key)}</option>`).join('')}</select><label for="home-preview-clock">${t('homeClock')}</label><input id="home-preview-clock" type="datetime-local" min="2000-01-01T00:00" max="2099-12-31T23:59" step="60" data-control="home-clock" value="${esc(state.homeNow||homePreview.nowLocal)}" aria-describedby="home-clock-note"><p id="home-clock-note">${t('homeClockNote',{time:homePreview.reminderAt})}</p><a class="text-link" href="#home">${t('homeReturn')}</a></section>`;
}
