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
  const d=accountDisplay(account,state,t),labelId=`folder-${encodeURIComponent(d.id)}`;
  return `<a class="account-folder ${compact?'folder-compact':''} ${d.theme}" href="#wallet/account/${encodeURIComponent(d.id)}" data-account-id="${esc(d.id)}" draggable="false" aria-labelledby="${labelId}-name ${labelId}-provider" aria-describedby="${labelId}-balance ${labelId}-reference">
    <span class="folder-provider">${providerBadge(d)}<span id="${labelId}-provider">${esc(d.providerLabel)}</span></span>
    <span class="folder-body"><span class="folder-name-line"><span class="folder-name" id="${labelId}-name">${esc(d.name)}</span><small>${d.currency}</small></span>
      <span class="sr-only">${d.type}</span><strong class="folder-balance" id="${labelId}-balance">${esc(d.balance)}</strong>
      <span class="folder-bottom"><span id="${labelId}-reference">${esc(d.suffix||'')}</span>${!compact?`<span>${t('accountDetails')}${icon('chevron')}</span>`:''}</span>
    </span></a>`;
}
function boardState(kind,t) {
  const key=['empty','loading','error','unavailable'].includes(kind)?kind:'unavailable';
  return `<div class="account-board-state" ${key==='loading'?'aria-busy="true"':''}>${icon(key==='error'?'refresh':'wallet')}<h3>${t(`board${key[0].toUpperCase()+key.slice(1)}Title`)}</h3><p>${t(`board${key[0].toUpperCase()+key.slice(1)}Body`)}</p><button class="small-capsule" data-action="board-reset">${t('retry')}</button></div>`;
}
function selectionTabs(records,current,state,t) {
  return `<div class="folder-tabs" role="group" aria-label="${t('selectAccount')}">${exposedAccounts(records,current.id).map(account=>{
    const d=accountDisplay(account,state,t);
    return `<button class="folder-tab ${d.theme}" data-action="account-select" data-id="${esc(d.id)}" aria-label="${esc(t('selectAccountName',{name:`${d.name} · ${d.providerLabel}`}))}">${providerBadge(d)}<span>${esc(d.name)}</span><small>${esc(d.providerLabel)}</small></button>`;
  }).join('')}</div>`;
}
function indicators(records,current,state,t) {
  return `<div class="board-indicators" role="group" aria-label="${t('selectAccount')}">${records.map(account=>{
    const d=accountDisplay(account,state,t);
    return `<button class="board-indicator" data-action="account-select" data-id="${esc(d.id)}" aria-pressed="${account.id===current.id}" aria-label="${esc(t('selectAccountName',{name:`${d.name} · ${d.providerLabel}`}))}"><span aria-hidden="true"></span></button>`;
  }).join('')}</div>`;
}
export function accountBoard(state,t,source=state.accountProfiles) {
  const records=assetAccounts(source),current=selectedAccount(records,state.accountSelected),mode=state.accountView==='grid'?'grid':'stack';
  const status=state.accountState||'sample',ready=status==='sample'&&current;
  const d=ready?accountDisplay(current,state,t):null;
  return `<section class="account-board" aria-labelledby="account-board-title">
    <header class="account-board-heading"><h2 id="account-board-title">${t('accounts')}</h2>
      <div class="board-toolbar"><div class="board-view-toggle" role="group" aria-label="${t('accountView')}">${['stack','grid'].map(view=>`<button data-action="account-view" data-view="${view}" aria-label="${t(view==='stack'?'stackView':'gridView')}" aria-pressed="${mode===view}">${icon(view==='stack'?'layers':'grid')}<span>${t(view==='stack'?'stackView':'gridView')}</span></button>`).join('')}</div></div>
      <div class="board-heading-actions"><a class="small-capsule board-view-all" href="#wallet" aria-label="${t('viewAll')}"><span class="board-view-all-label">${t('viewAll')}</span>${icon('chevron')}</a><button class="board-add" data-action="add-account" aria-label="${t('addAccount')}">${icon('plus')}<span>${t('addAccount')}</span></button></div></header>
    <div class="account-board-content" data-view="${mode}">${!ready?boardState(status==='sample'?'empty':status,t):mode==='grid'?`<div class="account-compact-grid">${records.map(account=>folder(account,state,t,true)).join('')}</div>`:
      `<div class="account-stack-layout"><div class="account-feature"><div class="account-stack" data-swipe-region tabindex="0" role="group" aria-roledescription="${t('stackView')}" aria-label="${t('accountSelection')}">
        ${selectionTabs(records,current,state,t)}<div class="account-featured-folder">${folder(current,state,t)}</div></div>
        ${indicators(records,current,state,t)}<p class="sr-only" role="status" aria-live="polite" aria-atomic="true">${esc(d.name)} · ${t('selectedAccount')}</p></div>
        <div class="account-overview"><div class="account-overview-list" role="group" aria-label="${t('selectAccount')}">${records.map(account=>{
          const item=accountDisplay(account,state,t),active=account.id===current.id;
          return `<button class="account-choice ${item.theme}" data-action="account-select" data-id="${esc(item.id)}" aria-pressed="${active}">${providerBadge(item)}<span><strong>${esc(item.name)}</strong><small>${esc(item.providerName)}</small></span>${icon(active?'check':'chevron')}</button>`;
        }).join('')}</div></div></div>`}</div></section>`;
}
