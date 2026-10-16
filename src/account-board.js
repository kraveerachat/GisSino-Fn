import { assetAccounts, accountDisplay, providerBadge } from './account-display.js';
import { escapeHTML as esc } from './i18n.js';
import { icon } from './icons.js';

export function selectedAccount(records,id) { return records.find(a=>a.id===id)||records[0]||null; }
export function stepAccount(records,id,step) {
  if(!records.length)return null;
  const i=Math.max(0,records.findIndex(a=>a.id===id));
  return records[(i+step%records.length+records.length)%records.length].id;
}
export function exposedAccounts(records,id) {
  if(records.length<2)return [];
  const i=Math.max(0,records.findIndex(a=>a.id===id));
  return Array.from({length:Math.min(2,records.length-1)},(_,n)=>records[(i+n+1)%records.length]);
}
export function swipeDirection(start,end) {
  const dx=end.x-start.x,dy=end.y-start.y;
  return Math.abs(dx)>=48&&Math.abs(dx)>Math.abs(dy)*1.5?(dx<0?1:-1):0;
}
export function parseAccountHash(hash) {
  const match=hash.replace(/^#/,'').match(/^wallet\/account\/([^/]+)$/);
  if(!match)return null;
  try {return decodeURIComponent(match[1]);}catch{return null;}
}
function folder(account,state,t,compact=false) {
  const d=accountDisplay(account,state,t);
  const labelId=`folder-${encodeURIComponent(d.id)}`;
  const context=[d.context,d.suffix].filter(Boolean).join(' · ')||t('sampleOnly');
  return `<a class="account-folder ${compact?'folder-compact':''} ${d.theme}" href="#wallet/account/${encodeURIComponent(d.id)}" data-account-id="${esc(d.id)}" draggable="false" aria-labelledby="${labelId}-name ${labelId}-provider" aria-describedby="${labelId}-balance ${labelId}-context"><span class="folder-provider">${providerBadge(d)}<span id="${labelId}-provider">${esc(d.providerLabel)}</span>${icon('arrow','folder-open-icon')}</span><span class="folder-body"><span class="folder-name" id="${labelId}-name">${esc(d.name)}</span><span class="folder-meta">${d.type}<span>${d.currency}</span></span><strong class="folder-balance" id="${labelId}-balance">${esc(d.balance)}</strong><span class="folder-bottom"><span id="${labelId}-context">${esc(context)}</span>${!compact?`<span>${t('accountDetails')}${icon('chevron')}</span>`:''}</span></span></a>`;
}
function boardState(kind,t) {
  const key=['empty','loading','error','unavailable'].includes(kind)?kind:'unavailable';
  return `<div class="account-board-state" ${key==='loading'?'aria-busy="true"':''}>${key==='loading'?'<div class="folder-skeleton" aria-hidden="true"><span></span><span></span><span></span></div>':icon(key==='error'?'refresh':key==='unavailable'?'lock':'wallet')}<h3>${t(`board${key[0].toUpperCase()+key.slice(1)}Title`)}</h3><p>${t(`board${key[0].toUpperCase()+key.slice(1)}Body`)}</p><button class="small-capsule" data-action="board-reset">${t('retry')}</button></div>`;
}
export function accountBoard(state,t,source) {
  const records=assetAccounts(source),current=selectedAccount(records,state.accountSelected),mode=state.accountView==='grid'?'grid':'stack';
  const status=state.accountState||'sample';
  const ready=status==='sample'&&current;
  const d=ready?accountDisplay(current,state,t):null;
  const stateControl=`<details class="board-demo-controls"><summary>${t('boardStateLabel')}</summary><label>${t('stateLabel')}<select data-control="board-state" aria-label="${t('boardStateLabel')}">${['sample','empty','loading','error','unavailable'].map(s=>`<option value="${s}" ${status===s?'selected':''}>${t(`state${s[0].toUpperCase()+s.slice(1)}`)}</option>`).join('')}</select></label></details>`;
  return `<section class="account-board" aria-labelledby="account-board-title"><header class="account-board-heading"><div><h2 id="account-board-title">${t('accounts')}</h2><span class="board-count">${t('boardAccountCount',{n:records.length})}</span></div><div class="board-heading-actions"><a class="small-capsule" href="#wallet">${t('viewAll')}${icon('chevron')}</a><button class="board-add" data-action="add-account" aria-label="${t('addAccount')}">${icon('plus')}<span>${t('addAccount')}</span></button></div></header><div class="board-toolbar"><div class="board-view-toggle" role="group" aria-label="${t('accountView')}">${['stack','grid'].map(v=>`<button data-action="account-view" data-view="${v}" aria-pressed="${mode===v}">${icon(v==='stack'?'layers':'grid')}<span>${t(v==='stack'?'stackView':'gridView')}</span></button>`).join('')}</div><span class="board-type-summary">${t('boardAssetTypes')}</span></div><div class="account-board-content" data-view="${mode}">${!ready?boardState(status==='sample'?'empty':status,t):mode==='grid'?`<div class="account-compact-grid">${records.map(a=>folder(a,state,t,true)).join('')}</div>`:`<div class="account-stack-layout"><div class="account-feature"><div class="account-stack" data-swipe-region tabindex="0" role="group" aria-roledescription="${t('stackView')}" aria-label="${t('accountSelection')}" aria-describedby="board-keyboard-help"><div class="folder-tabs" role="group" aria-label="${t('selectAccount')}">${exposedAccounts(records,current.id).map(a=>{const item=accountDisplay(a,state,t);return `<button class="folder-tab ${item.theme}" data-action="account-select" data-id="${esc(a.id)}" aria-pressed="false" aria-label="${esc(t('selectAccountName',{name:item.name}))}">${providerBadge(item)}<span>${esc(item.name)}</span><small>${esc(item.providerLabel)}</small></button>`;}).join('')}</div><div class="account-featured-folder">${folder(current,state,t)}</div></div><div class="board-pagination"><button class="board-step" data-action="account-step" data-step="-1" aria-label="${t('previousAccount')}" ${records.length<2?'disabled':''}>${icon('chevron','previous-icon')}</button><p role="status" aria-live="polite" aria-atomic="true">${t('accountPosition',{n:records.indexOf(current)+1,total:records.length})}<span class="sr-only"> · ${esc(d.name)} · ${t('selectedAccount')}</span></p><button class="board-step" data-action="account-step" data-step="1" aria-label="${t('nextAccount')}" ${records.length<2?'disabled':''}>${icon('chevron')}</button></div><p id="board-keyboard-help" class="board-keyboard-help">${t('boardNavigationHelp')}</p></div><div class="account-overview"><h3>${t('chooseAccount')}</h3><div class="account-overview-list" role="group" aria-label="${t('selectAccount')}">${records.map(a=>{const item=accountDisplay(a,state,t);const active=a.id===current.id;return `<button class="account-choice ${item.theme}" data-action="account-select" data-id="${esc(a.id)}" aria-pressed="${active}">${providerBadge(item)}<span><strong>${esc(item.name)}</strong><small>${esc(item.providerName)}</small></span>${icon(active?'check':'chevron')}</button>`;}).join('')}</div></div></div>`}</div>${stateControl}</section>`;
}
