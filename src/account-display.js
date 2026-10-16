import { accounts } from './fixtures.js';
import { resolveProvider, providerTheme } from './providers.js';
import { escapeHTML as esc } from './i18n.js';
import { icon } from './icons.js';

export const assetAccounts = (records=accounts) => records.filter(a=>['bank','ewallet','cash'].includes(a.accountType)&&!a.archived).slice().sort((a,b)=>(a.sortOrder||0)-(b.sortOrder||0));
export function accountDisplay(account,state,t) {
  const provider=resolveProvider(account.providerId,account.accountType);
  const currency=['THB','USD'].includes(account.currency)?account.currency:null;
  const validBalance=Number.isSafeInteger(account.balanceMinor)&&currency;
  const balance=!state.balanceVisible?t('hiddenAmount'):!validBalance?t('notRecorded'):new Intl.NumberFormat(state.locale==='th'?'th-TH':'en-US',{style:'currency',currency,minimumFractionDigits:2,maximumFractionDigits:2}).format(account.balanceMinor/100);
  return {id:account.id,name:account.nickname?String(account.nickname):t(account.name||'account'),provider,
    providerName:state.locale==='th'?provider.nameTh:provider.nameEn,
    providerLabel:provider.providerId==='baac'?(state.locale==='th'?'ธ.ก.ส.':'BAAC'):(state.locale==='th'?provider.nameTh:provider.nameEn),
    theme:`${providerTheme(provider)} tone-${['navy','cobalt','slate'].includes(account.folderTone)?account.folderTone:'navy'} ${account.accentTone==='neutral'?'accent-neutral':''}`,currency:currency||t('notRecorded'),balance,
    type:t(['profileSavings','profileCurrent','profileWallet','profileCash','profileOther'].includes(account.profileLabel)?account.profileLabel:({bank:'bankAccounts',ewallet:'eWallets',cash:'cashAccounts'})[account.accountType]||'account'),
    suffix:account.suffix?t('demoSuffix',{suffix:account.suffix}):null,
    context:account.context?t(account.context):null};
}
export const providerBadge = display => `<span class="provider-badge ${display.provider.logoPath?'has-provider-logo':''}" aria-hidden="true">${display.provider.logoPath?`<img src="${display.provider.logoPath}" alt="" width="36" height="36" draggable="false">`:''}<span class="provider-fallback">${icon(display.provider.icon)}</span></span>`;
export function accountPreview(account,state,t) {
  const d=accountDisplay(account,state,t);
  return `<div class="account-detail-preview ${d.theme}" data-account-id="${esc(d.id)}"><div class="account-detail-identity">${providerBadge(d)}<div><h3>${esc(d.name)}</h3><p>${esc(d.providerName)}</p></div></div><strong class="account-detail-balance">${esc(d.balance)}</strong><dl class="details-list"><div><dt>${t('accountType')}</dt><dd>${d.type}</dd></div><div><dt>${t('currency')}</dt><dd>${d.currency}</dd></div>${d.suffix?`<div><dt>${t('reference')}</dt><dd>${esc(d.suffix)}</dd></div>`:''}</dl></div><button class="button secondary full-width" data-action="edit-account" data-id="${esc(d.id)}">${t('editAccountProfile')}</button><p class="info-callout">${icon('shield')}${t('profileSessionNote')}</p>`;
}
export function walletAccountRow(account,state,t) {
  const d=accountDisplay(account,state,t);
  return `<a class="blue-account-row provider-account-row ${d.theme}" href="#wallet/account/${encodeURIComponent(d.id)}" data-account-id="${esc(d.id)}">${providerBadge(d)}<span class="row-copy"><strong>${esc(d.name)}</strong><small>${esc(d.providerName)}</small><small>${d.type} · ${d.currency}${d.suffix?` · ${esc(d.suffix)}`:''}</small></span><strong class="row-amount">${esc(d.balance)}</strong>${icon('chevron','row-chevron')}</a>`;
}
