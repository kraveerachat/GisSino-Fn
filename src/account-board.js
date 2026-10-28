import { assetAccounts, accountDisplay, providerBadge } from './account-display.js';
import { escapeHTML as esc } from './i18n.js';
import { icon } from './icons.js';
import { deckMode,boundedIndex } from './account-deck.js';

export function selectedAccount(records,id) { return records.find(a=>a.id===id)||records[0]||null; }
export function stepAccount(records,id,step) { return records[boundedIndex(Math.max(0,records.findIndex(a=>a.id===id)),step,records.length)]?.id||null; }
export function parseAccountHash(hash) {
  const match=hash.replace(/^#/,'').match(/^wallet\/account\/([^/]+)$/);
  if(!match)return null;
  try{return decodeURIComponent(match[1]);}catch{return null;}
}
// Every account uses this complete folder, in both positioning modes and all layers.
export function accountFolder(account,state,t) {
  const d=accountDisplay(account,state,t),labelId=`folder-${encodeURIComponent(d.id)}`;
  return `<div class="account-folder ${d.theme}" aria-labelledby="${labelId}-name ${labelId}-provider">
    <div class="folder-provider">${providerBadge(d)}<span id="${labelId}-provider">${esc(d.providerLabel)}</span></div>
    <div class="folder-body"><div class="folder-name-line"><strong class="folder-name" id="${labelId}-name">${esc(d.name)}</strong><small>${d.currency}</small></div>
      <span class="sr-only">${d.type}</span><strong class="folder-balance">${esc(d.balance)}</strong>
      <div class="folder-bottom"><span>${esc(d.suffix||'')}</span><a class="folder-details" href="#wallet/account/${encodeURIComponent(d.id)}" aria-label="${esc(t('openAccount',{name:d.name}))}">${t('accountDetails')}${icon('chevron')}</a></div>
    </div></div>`;
}
function boardState(kind,t) {
  const key=['empty','loading','error','unavailable'].includes(kind)?kind:'unavailable';
  return `<div class="account-board-state" ${key==='loading'?'aria-busy="true"':''}>${icon(key==='error'?'refresh':'wallet')}<h3>${t(`board${key[0].toUpperCase()+key.slice(1)}Title`)}</h3><p>${t(`board${key[0].toUpperCase()+key.slice(1)}Body`)}</p><button class="small-capsule" data-action="board-reset">${t('retry')}</button></div>`;
}
export function accountBoard(state,t,source=state.accountProfiles) {
  const records=assetAccounts(source),current=selectedAccount(records,state.accountSelected),mode=deckMode(state.accountView);
  const status=state.accountState||'sample',ready=status==='sample'&&current,index=ready?records.indexOf(current):0;
  return `<section class="account-board" aria-labelledby="account-board-title">
    <header class="account-board-heading"><h2 id="account-board-title">${t('accounts')}</h2><div class="board-heading-actions"><a class="small-capsule board-view-all" href="#wallet">${t('viewAll')}${icon('chevron')}</a><button class="board-add" data-action="add-account" aria-label="${t('addAccount')}">${icon('plus')}<span>${t('addAccount')}</span></button></div></header>
    <div class="account-board-content" data-view="${mode}">${!ready?boardState(status==='sample'?'empty':status,t):`
      <div class="account-stack-layout"><div class="account-feature"><div class="account-deck" data-account-deck data-mode="${mode}" data-selected="${esc(current.id)}" data-phase="idle" tabindex="0" role="group" aria-roledescription="${t(mode==='vertical'?'verticalFolderStack':'horizontalFolderCarousel')}" aria-label="${t('accountSelection')}">
        ${records.map((account,i)=>{const d=accountDisplay(account,state,t);return `<article class="deck-card" data-deck-card data-account-id="${esc(account.id)}" data-active="${i===index}"><div class="folder-content" ${i!==index?'inert aria-hidden="true"':''}>${accountFolder(account,state,t)}</div><button class="deck-card-select" data-action="account-select" data-id="${esc(account.id)}" aria-label="${esc(t('selectAccountName',{name:`${d.name} · ${d.providerLabel}`}))}" tabindex="-1" ${i===index?'hidden':''}></button></article>`;}).join('')}
        <div class="deck-drag-handle" data-deck-handle tabindex="-1" role="slider" aria-label="${t('folderDragHandle')}" aria-orientation="${mode}" aria-valuemin="1" aria-valuemax="${records.length}" aria-valuenow="${index+1}" aria-valuetext="${esc(accountDisplay(current,state,t).name)}" aria-describedby="deck-handle-help"><span aria-hidden="true">${icon('layers')}</span></div><span id="deck-handle-help" class="sr-only">${t(mode==='vertical'?'verticalHandleHelp':'horizontalHandleHelp')}</span>
      </div><div class="deck-navigation"><button class="deck-step" data-deck-step="-1" tabindex="-1" aria-label="${t(mode==='vertical'?'previousFolderUp':'previousAccount')}" ${index===0?'disabled':''}>${icon('chevron','deck-previous')}</button><div class="deck-dots" aria-hidden="true">${records.map((account,i)=>`<span data-deck-dot="${esc(account.id)}" data-current="${i===index}"></span>`).join('')}</div><button class="deck-step" data-deck-step="1" tabindex="-1" aria-label="${t(mode==='vertical'?'nextFolderDown':'nextAccount')}" ${index===records.length-1?'disabled':''}>${icon('chevron','deck-next')}</button></div><p class="sr-only" data-deck-status role="status" aria-live="polite" aria-atomic="true">${esc(accountDisplay(current,state,t).name)} · ${t('selectedAccount')}</p></div>
        <div class="account-overview"><div class="account-overview-list" role="group" aria-label="${t('selectAccount')}">${records.map(account=>{const d=accountDisplay(account,state,t),active=account.id===current.id;return `<button class="account-choice ${d.theme}" data-action="account-select" data-id="${esc(d.id)}" aria-pressed="${active}" tabindex="${active?0:-1}">${providerBadge(d)}<span><strong>${esc(d.name)}</strong><small>${esc(d.providerName)}</small></span><span class="account-choice-check" aria-hidden="true">${icon('check')}</span></button>`;}).join('')}</div></div>
      </div>`}</div></section>`;
}
