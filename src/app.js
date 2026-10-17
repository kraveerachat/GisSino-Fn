import { shell, addMenu, addForm, activityResults } from './screens.js';
import { translator, money, escapeHTML as esc } from './i18n.js';
import { icon } from './icons.js';
import { transactions, bills, accounts, creditCard } from './fixtures.js';
import { amountKey, validAmountText } from './amount.js';
import { navigationOverlay } from './navigation.js';
import { desktopSidebar } from './desktop-sidebar.js';
import { accountBoard, parseAccountHash } from './account-board.js';
import { assetAccounts, accountPreview } from './account-display.js';
import { mountAccountDeck } from './account-deck.js';
import { accountProfileForm, profileDraft, applyProfile } from './account-profile.js';
import { publicRoutes, isPublicRoute, welcomeScreen } from './welcome.js';
import { createPreviewFlow,mountPreviewFlow,routeTitles } from './preview-flow.js';

const app = document.querySelector('#app');
const sheet = document.querySelector('#sheet');
const validRoutes = ['home','wallet','activity','bills','party','settings','transfer','credit-card',...publicRoutes];
const state = {
  locale: 'th', theme: 'light', route: parseAccountHash(location.hash)?'wallet':validRoutes.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'welcome',
  balanceVisible: true, previewState: 'sample', filter: 'all', search: '', billsView: 'list', month: 'october',
  mode: null, shareStreak: true, shareXP: true,
  accountSelected: 'daily', accountView: 'vertical', accountState: 'sample',
  accountProfiles: accounts.map(account=>({...account})),
  transferSource:'daily', transferDestination:'savings', transferAmount:'0', cardReminder:false,cardReturn:'bills'
};
const scrollPositions = new Map();
const previewFlow=createPreviewFlow();
let opener = null;
let toastTimer;
let searchTimer;
let suppressSheetFocus=false;
let accountSheetClosingForNavigation=false;
let accountDetailId=null;
let editingProfileId=null;
let accountDeck=null;
const moreOverlay=navigationOverlay(sheet,closeSheet);
const t = (key, values) => translator(state.locale)(key, values);
const sidebar=desktopSidebar(app,t);

function applyTheme() {
  const appearance=isPublicRoute(state.route)?'light':state.theme;
  document.documentElement.dataset.theme = appearance;
  document.querySelector('meta[name="theme-color"]').content = isPublicRoute(state.route)?'#f6faff':appearance === 'dark' ? '#242323' : '#94dffc';
}
function render(focusMain = false) {
  accountDeck?.destroy();accountDeck=null;
  applyTheme();
  document.documentElement.lang = state.locale;
  const titleKey=isPublicRoute(state.route)?routeTitles[state.route]:state.route==='credit-card'?'creditCardTitle':state.route;
  document.title = `${t('appName')} · ${t(titleKey)} · Design Preview`;
  document.querySelector('#skip-link').textContent = t('skip');
  app.innerHTML = isPublicRoute(state.route)?welcomeScreen(state,t,previewFlow):shell(state, t);
  if(isPublicRoute(state.route))mountPreviewFlow(app,previewFlow,t,id=>{render();document.getElementById(id)?.focus({preventScroll:true});});
  sidebar.rendered();
  mountDeck();
  if (focusMain) document.querySelector('#main').focus({ preventScroll: true });
}
function announce(message) { document.querySelector('#announcer').textContent = message; }
function toast(message) {
  clearTimeout(toastTimer);
  const element = document.querySelector('#toast');
  element.textContent = message; element.hidden = false;
  toastTimer = setTimeout(() => { element.hidden = true; }, 4000);
}
function showSheet(titleKey, content, back = false) {
  sidebar.suspend();
  moreOverlay.close();
  if (!sheet.open) opener = document.activeElement;
  sheet.innerHTML = `<div class="sheet-handle" aria-hidden="true"></div><div class="sheet-header">${back ? `<button class="icon-button sheet-back" data-action="add" aria-label="${t('back')}">${icon('arrow')}</button>` : ''}<h2 id="sheet-title" tabindex="-1">${t(titleKey)}</h2><button class="icon-button close-button" data-action="close" aria-label="${t('close')}">${icon('close')}</button></div><div class="sheet-content">${content}</div>`;
  sheet.classList.toggle('add-sheet', titleKey === 'addTitle');
  if (!sheet.open) { sheet.showModal(); document.body.classList.add('has-sheet'); }
  sheet.scrollTop = 0;
  document.querySelector('#sheet-title').focus({ preventScroll: true });
}
function closeSheet(restoreFocus=true) { if (sheet.open) {suppressSheetFocus=!restoreFocus;sheet.close();} }
sheet.addEventListener('close', () => {
  // A queued close event can arrive after hash navigation has opened the next dialog.
  if(sheet.open){accountSheetClosingForNavigation=false;suppressSheetFocus=false;return;}
  document.body.classList.remove('has-sheet');
  state.mode = null;
  if(!accountSheetClosingForNavigation&&parseAccountHash(location.hash)) history.replaceState(null,'','#wallet');
  accountSheetClosingForNavigation=false;
  if(suppressSheetFocus){suppressSheetFocus=false;opener=null;accountDetailId=null;return;}
  const accountLink=accountDetailId?[...document.querySelectorAll('.provider-account-row')].find(row=>row.dataset.accountId===accountDetailId):null;
  if(accountLink)accountLink.focus({preventScroll:true});
  else if (opener?.isConnected) opener.focus({ preventScroll: true });
  else document.querySelector('[data-action="visibility"], [data-title="privacy"]')?.focus({ preventScroll: true });
  opener = null;
  accountDetailId=null;
});
sheet.addEventListener('click', event => {
  if (event.target !== sheet) return;
  const rect = sheet.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeSheet();
});

function openMode(mode) {
  if(mode==='transfer') {closeSheet();location.hash='transfer';return;}
  state.mode = mode;
  if (['expense','income','transfer'].includes(mode)) {
    showSheet(({expense:'manualExpense',income:'manualIncome',transfer:'transferAction'})[mode], addForm(mode,state,t),true);
  } else if (mode === 'check') {
    showSheet('checkinTitle',`<div class="checkin-art" aria-hidden="true">${icon('check')}</div><p class="centered">${t('checkinBody')}</p><button class="button primary full-width" data-action="checkin-preview">${t('checkinAction')}${icon('arrow')}</button><p class="sheet-disclaimer">${t('addNote')}</p>`,true);
  } else if (mode === 'slip') {
    showSheet('slipTitle',`<div class="attachment-preview">${icon('upload')}<strong>${t('slipTitle')}</strong><p>${t('slipPrivacy')}</p><button class="button secondary" data-action="sample-slip">${t('showSlip')}</button></div><p class="sheet-disclaimer">${t('addNote')}</p>`,true);
  } else if (mode === 'ai') {
    showSheet('aiEntry',`<div class="future-preview"><span class="empty-symbol">${icon('sparkle')}</span><span class="status">${t('future')}</span><p>${t('aiDisabled')}</p><label class="field">${t('aiDesc')}<textarea disabled rows="3" aria-describedby="ai-note"></textarea></label><p id="ai-note" class="small muted">${t('aiDisabled')}</p></div>`,true);
  }
}
function definitionList(rows) { return `<dl class="details-list">${rows.map(([name,value])=>`<div><dt>${name}</dt><dd>${value}</dd></div>`).join('')}</dl>`; }
function openTransaction(id) {
  const item = transactions.find(x=>x.id===id); if (!item) return;
  const value = state.balanceVisible ? money(item.amount,state.locale,true) : t('hiddenAmount');
  showSheet('transactionDetail',`<div class="detail-hero"><span class="well-icon ${item.type}">${icon(item.icon)}</span><h3>${t(item.name)}</h3><strong>${value}</strong>${item.needsDetails?`<span class="status warning">${t('needsDetails')}</span>`:''}</div>${definitionList([[t('category'),t(item.category)],[t('account'),t(item.account)],[t('time'),item.time],[t('reference'),`DEMO-${item.id.toUpperCase()}`]])}<p class="info-callout">${icon('info')}${t(item.type==='transfer'?'transferNote':item.needsDetails?'needDetailBody':'detailNote')}</p><p class="sheet-disclaimer">${t('detailNote')}</p>`);
}
function openBill(id) {
  if(id==='card') {closeSheet();location.hash='credit-card';return;}
  const item = bills.find(x=>x.id===id); if (!item) return;
  showSheet('billDetail',`<div class="detail-hero"><span class="well-icon">${icon(item.icon)}</span><h3>${t(item.name)}</h3><strong>${state.balanceVisible?money(item.amount,state.locale,true):t('hiddenAmount')}</strong><span class="status ${item.status==='dueSoon'?'warning':''}">${t(item.status)}</span></div>${definitionList([[t('category'),t(item.category)],[t('date'),t('dayMonth',{day:item.due})],...(item.installment?[[t('installment'),item.installment]]:[])])}<p class="info-callout">${icon('shield')}${t('paymentNote')}</p><p class="sheet-disclaimer">${t('detailNote')}</p>`);
}
function openVisibility() {
  showSheet('visibilityTitle',`<p class="sheet-subtitle">${t('privacyBody')}</p><div class="visibility-options">${[['shareStreak','share-streak'],['shareXP','share-xp']].map(([key,id])=>`<label class="switch-row"><span>${t(key)}</span><input type="checkbox" role="switch" id="${id}" data-control="${key}" ${state[key]?'checked':''}><span class="switch-track" aria-hidden="true"></span></label>`).join('')}</div><p class="sheet-disclaimer">${icon('shield')}${t('privacyPreview')}</p>`);
}
function openAccount(id) {
  accountDetailId=id;
  const account=assetAccounts(state.accountProfiles).find(a=>a.id===id);
  showSheet('accountDetail',account?accountPreview(account,state,t):`<p class="settings-info">${t('boardUnavailableBody')}</p>`);
}
function openProfile(id=null) {
  const account=state.accountProfiles.find(a=>a.id===id);
  if(id&&!account)return;
  editingProfileId=id;
  showSheet(id?'editAccountProfile':'addAccount',accountProfileForm(profileDraft(account,state,t),state,t,Boolean(id)));
}
document.addEventListener('error',event=>{
  if(event.target.matches?.('.provider-badge img'))event.target.closest('.provider-badge').classList.add('logo-failed');
},true);
function mountDeck() {
  const root=document.querySelector('[data-account-deck]');
  if(root)accountDeck=mountAccountDeck(root,{onSelect:id=>{state.accountSelected=id;},t});
}
function refreshAccountBoard(focusSelector) {
  const board=document.querySelector('.account-board');if(!board)return;
  accountDeck?.destroy();accountDeck=null;
  board.outerHTML=accountBoard(state,t);mountDeck();
  if(focusSelector)document.querySelector(focusSelector)?.focus({preventScroll:true});
}
function selectBoardAccount(id,focusSelector='[data-account-deck]') {
  if(!assetAccounts(state.accountProfiles).some(account=>account.id===id))return;
  accountDeck?.select(id);
  document.querySelector(focusSelector)?.focus({preventScroll:true});
}

document.addEventListener('click',event=>{
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action=button.dataset.action;
  if(action==='close-more')moreOverlay.close(true);
  else if (action==='add') { state.mode=null; showSheet('addTitle',addMenu(t)); }
  else if (action==='close') closeSheet();
  else if (action==='mode') openMode(button.dataset.mode);
  else if (action==='all-accounts') location.hash='wallet';
  else if(action==='account-select') {
    const focus=button.classList.contains('account-choice')?`.account-choice[data-id="${button.dataset.id}"]`:'[data-account-deck]';
    selectBoardAccount(button.dataset.id,focus);
  } else if(action==='board-reset') {
    state.accountState='sample';refreshAccountBoard('[data-control="board-state"]');
  } else if(action==='add-account') {
    openProfile();
  } else if(action==='edit-account') {
    openProfile(button.dataset.id);
  } else if(action==='profile-cancel') {
    if(editingProfileId)openAccount(editingProfileId);else closeSheet();
  }
  else if (action==='amount-key') {
    state.transferAmount=amountKey(/^\d{1,9}(?:\.\d{0,2})?$/.test(state.transferAmount)?state.transferAmount:'0',button.dataset.key);
    updateTransferAmount();
  } else if(action==='transfer-destination') {
    state.transferDestination=button.dataset.id;render();document.querySelector(`[data-action="transfer-destination"][data-id="${state.transferDestination}"]`)?.focus({preventScroll:true});
  } else if(action==='review-transfer') {
    const invalid=!validAmountText(state.transferAmount)||state.transferSource===state.transferDestination;
    const error=document.querySelector('#transfer-error');
    document.querySelector('#transfer-amount').setAttribute('aria-invalid',String(invalid));
    if(invalid){error.textContent=t('transferAmountError');error.hidden=false;document.querySelector('#transfer-amount').focus();return;}
    const from=accounts.find(a=>a.id===state.transferSource),to=accounts.find(a=>a.id===state.transferDestination);
    showSheet('sampleTransferSummary',`<div class="result-status">${icon('eye')}${t('resultNote')}</div>${definitionList([[t('fromAccount'),t(from.name)],[t('toAccount'),t(to.name)],[t('amount'),money(Number(state.transferAmount),state.locale,true)]])}<p class="info-callout">${icon('shield')}${t('unchangedBalance')}</p><p class="sheet-disclaimer">${t('detailNote')}</p>`);
  } else if(action==='card-preview') {
    const view=button.dataset.view;
    if(view==='activity') {showSheet('cardSampleActivity',`<p class="sheet-subtitle">${t('noIssuerSync')}</p>${definitionList(transactions.slice(0,2).map(item=>[t(item.name),state.balanceVisible?money(item.amount,state.locale):t('hiddenAmount')]))}`);return;}
    const titles={statement:'cardStatement',due:'cardAmountDue',payment:'cardPayment',reminder:'cardReminder',account:'cardInformation'};
    const copy={statement:'cardStatementPreview',payment:'cardPaymentPreview',reminder:'reminderPreview',account:'accountNote'};
    showSheet(titles[view],view==='due'?`${definitionList([[t('fullPayment'),state.balanceVisible?money(creditCard.fullAmountMinor/100,state.locale):t('hiddenAmount')],[t('paymentDueDate'),t('dayMonth',{day:creditCard.dueDay})],[t('minimumPayment'),t('notRecorded')]])}<p class="sheet-disclaimer">${t('detailNote')}</p>`:`<p class="settings-info">${t(copy[view])}</p><p class="sheet-disclaimer">${t('detailNote')}</p>`);
  }
  else if (action==='focus-field') { event.preventDefault(); document.querySelector(`#entry-${button.dataset.field}`)?.focus(); }
  else if (action==='settings') location.hash='settings';
  else if (action==='theme'||action==='set-theme') {
    const focusAction=action==='theme'?'[data-action="theme"]':`[data-action="set-theme"][data-theme="${button.dataset.theme}"]`;
    state.theme=action==='theme'?(state.theme==='light'?'dark':'light'):button.dataset.theme;
    render(); document.querySelector(focusAction)?.focus({preventScroll:true}); announce(t('themeChanged'));
  } else if (action==='balance') {
    state.balanceVisible=!state.balanceVisible; render(); document.querySelector('[data-action="balance"]')?.focus({preventScroll:true}); announce(t(state.balanceVisible?'showBalance':'hiddenAmount'));
  } else if (action==='transaction') openTransaction(button.dataset.id);
  else if (action==='bill') openBill(button.dataset.id);
  else if (action==='account') {
    if(assetAccounts(state.accountProfiles).some(a=>a.id===button.dataset.id)) location.hash=`wallet/account/${encodeURIComponent(button.dataset.id)}`;
  } else if (action==='filter') {
    state.filter=button.dataset.filter;
    render(); document.querySelector(`[data-action="filter"][data-filter="${state.filter}"]`)?.focus({preventScroll:true});
  } else if (action==='clear-search') {
    state.search=''; state.filter='all'; render(); document.querySelector('#activity-search')?.focus();
  } else if (action==='retry') {
    state.previewState='sample'; render(); document.querySelector('#preview-state')?.focus({preventScroll:true});
  } else if (action==='bills-view') {
    state.billsView=button.dataset.view; render(); document.querySelector(`[data-action="bills-view"][data-view="${state.billsView}"]`)?.focus({preventScroll:true});
  } else if (action==='notifications') {
    showSheet('notifications',`<div class="empty-state sheet-empty"><span class="empty-symbol">${icon('bell')}</span><h3>${t('notificationsEmpty')}</h3><p>${t('notificationsBody')}</p></div>`);
  } else if (action==='invite') {
    showSheet('inviteTitle',`<div class="invite-symbol">${icon('party')}</div><p class="centered">${t('inviteBody')}</p><p class="info-callout">${icon('info')}${t('inviteNote')}</p>`);
  } else if (action==='visibility') openVisibility();
  else if (action==='settings-detail') {
    if (button.dataset.title==='privacy') { openVisibility(); return; }
    showSheet(button.dataset.title,`<p class="settings-info">${t(button.dataset.content)}</p><p class="sheet-disclaimer">${icon('info')}${t('settingsPreview')}</p>`);
  } else if (action==='sample-slip') {
    showSheet('slipTitle',`<div class="sample-attachment">${icon('bills')}<strong>${t('slipBody')}</strong><span class="status">${t('sampleOnly')}</span></div><p class="info-callout">${icon('shield')}${t('slipPrivacy')}</p>`,true);
  } else if (action==='checkin-preview') {
    showSheet('checkinTitle',`<div class="checkin-art complete" aria-hidden="true">${icon('check')}</div><p class="centered">${t('checkinResult')}</p><p class="sheet-disclaimer">${t('detailNote')}</p>`,true);
  }
});
document.addEventListener('input',event=>{
  if(event.target.id==='profile-nickname') {
    event.target.removeAttribute('aria-invalid');
    document.querySelector('#profile-name-error').hidden=true;
  }
  if(event.target.id==='transfer-amount') {state.transferAmount=event.target.value;updateTransferAmount(false);}
  if (event.target.id==='activity-search') {
    state.search=event.target.value;
    document.querySelector('#activity-results').innerHTML=activityResults(state,t);
    clearTimeout(searchTimer);
    searchTimer=setTimeout(()=>announce(t('searchResultCount',{n:document.querySelectorAll('#activity-results .transaction-row').length})),180);
  }
});
document.addEventListener('change',event=>{
  if(event.target.matches('[data-profile-control]')) {
    const form=event.target.closest('form');
    const draft=Object.fromEntries(new FormData(form));
    draft.optionsOpen=form.querySelector('.profile-options').open;
    if(event.target.name==='accountType') {
      draft.providerId=({bank:'kbank',ewallet:'truemoney',cash:'cash'})[draft.accountType];
      draft.profileLabel=({bank:'profileSavings',ewallet:'profileWallet',cash:'profileCash'})[draft.accountType];
    }
    sheet.querySelector('.sheet-content').innerHTML=accountProfileForm(draft,state,t,Boolean(editingProfileId));
    sheet.querySelector(`[name="${event.target.name}"]`)?.focus({preventScroll:true});
    return;
  }
  const control=event.target.dataset.control;
  if(control==='board-state') { state.accountState=event.target.value;refreshAccountBoard('[data-control="board-state"]'); }
  else if(control==='account-display-mode') {state.accountView=event.target.value==='horizontal'?'horizontal':'vertical';render();document.querySelector('#account-display-mode')?.focus({preventScroll:true});}
  else if (control==='preview-state') { state.previewState=event.target.value; render(); document.querySelector('#preview-state')?.focus({preventScroll:true}); }
  else if (control==='month') { state.month=event.target.value; toast(t('monthNote')); }
  else if (control==='locale') { state.locale=event.target.value; render(); document.querySelector('#locale-select')?.focus({preventScroll:true}); announce(t('localeChanged')); }
  else if(control==='transfer-source') {
    state.transferSource=event.target.value;
    if(state.transferSource===state.transferDestination)state.transferDestination=accounts.find(a=>a.id!==state.transferSource).id;
    render();document.querySelector('#transfer-source')?.focus({preventScroll:true});
  } else if(control==='card-reminder') {state.cardReminder=event.target.checked;announce(t(state.cardReminder?'cardReminderEnabled':'cardReminderDisabled'));}
  else if (['shareStreak','shareXP'].includes(control)) { state[control]=event.target.checked; render(); announce(t('privacyPreview')); }
});
function updateTransferAmount(updateInput=true) {
  if(updateInput)document.querySelector('#transfer-amount').value=state.transferAmount;
  document.querySelector('#transfer-summary-amount').textContent=validAmountText(state.transferAmount)?money(Number(state.transferAmount),state.locale,true):'—';
  document.querySelector('#transfer-error').hidden=true;
  document.querySelector('#transfer-amount').removeAttribute('aria-invalid');
}
document.addEventListener('submit',event=>{
  if(event.target.id==='account-profile-form') {
    event.preventDefault();
    const form=event.target;
    try {
      const id=editingProfileId||`sample-${crypto.randomUUID()}`;
      state.accountProfiles=applyProfile(state.accountProfiles,Object.fromEntries(new FormData(form)),editingProfileId,id);
      state.accountSelected=id;state.accountState='sample';
      render();
      opener=state.route==='home'?document.querySelector(`[data-action="add-account"]`):document.querySelector(`[data-account-id="${id}"]`);
      closeSheet();toast(t('profileApplied'));announce(t('profileApplied'));
    } catch {
      form.querySelector('#profile-name-error').hidden=false;
      const input=form.elements.nickname;input.setAttribute('aria-invalid','true');input.focus();
    }
    return;
  }
  if (event.target.id!=='entry-form') return;
  event.preventDefault();
  const form=event.target;const data=new FormData(form);
  const amount=Number(data.get('amount'));const note=String(data.get('note')||'').trim();
  const invalidAmount=!Number.isFinite(amount)||amount<=0||!form.elements.amount.validity.valid;
  const sameAccounts=state.mode==='transfer'&&data.get('account')===data.get('destination');
  const errors=[];
  if(invalidAmount) errors.push({field:'amount',key:'amountError'});
  if(!note) errors.push({field:'note',key:'noteError'});
  if(form.elements.date&&!form.elements.date.validity.valid) errors.push({field:'date',key:'dateError'});
  if(sameAccounts) errors.push({field:'destination',key:'transferError'});
  for(const field of ['amount','note','date','account','destination']) {
    const input=form.elements[field];if(!input) continue;
    const invalid=errors.some(error=>error.field===field)||(sameAccounts&&field==='account');
    input.setAttribute('aria-invalid',String(invalid));
    if(invalid) input.setAttribute('aria-describedby','form-error');else input.removeAttribute('aria-describedby');
  }
  if (errors.length) {
    const error=form.querySelector('#form-error');
    error.innerHTML=`<strong>${t('formError')}</strong><ul>${errors.map(item=>`<li><a href="#entry-${item.field}" data-action="focus-field" data-field="${item.field}">${t(item.key)}</a></li>`).join('')}</ul>`;
    error.hidden=false;error.focus();return;
  }
  const account=accounts.find(a=>a.id===data.get('account'));
  showSheet('resultTitle',`<div class="result-status">${icon('eye')}<span>${t('resultNote')}</span></div><div class="detail-hero"><h3>${esc(note)}</h3><strong>${money(amount,state.locale,true)}</strong></div>${definitionList([[t('category'),t(state.mode)],[t('account'),t(account.name)],...(state.mode==='transfer'?[[t('toAccount'),t(accounts.find(a=>a.id===data.get('destination')).name)]]:[[t('date'),esc(data.get('date'))]])])}<p class="info-callout">${icon('shield')}${t('detailNote')}</p><button class="button secondary full-width" data-action="add">${t('makeAnother')}</button>`,true);
});
window.addEventListener('hashchange',()=>{
  const accountId=parseAccountHash(location.hash);
  const next=accountId?'wallet':location.hash.slice(1)||'welcome';
  if (!validRoutes.includes(next)) { if(next!=='main') location.hash='welcome';return; }
  document.querySelectorAll('[data-credential]').forEach(input=>input.value='');
  scrollPositions.set(state.route,window.scrollY);
  if(next==='credit-card')state.cardReturn=state.route==='wallet'?'wallet':'bills';
  moreOverlay.close();
  if(sheet.open)accountSheetClosingForNavigation=true;
  closeSheet(false); state.route=next;state.previewState='sample';render(true);
  window.scrollTo({top:scrollPositions.get(next)||0,behavior:'instant'});
  if(accountId)openAccount(accountId);
});
render();
if(parseAccountHash(location.hash))openAccount(parseAccountHash(location.hash));
