import { icon } from './icons.js';
import { preview,accounts,creditCard } from './fixtures.js';
import { money } from './i18n.js';
import { assetAccounts, walletAccountRow } from './account-display.js';

export function walletScreen(state,t) {
  const value=n=>state.balanceVisible?money(n,state.locale):'••••••';
  const category=(kind,label)=>`<section class="wallet-category"><h2>${t(label)}</h2><div class="enamel-list">${assetAccounts(state.accountProfiles||accounts).filter(a=>a.accountType===kind).map(a=>walletAccountRow(a,state,t)).join('')||`<div class="wallet-empty"><p>${t('walletCategoryEmpty',{category:t(label)})}</p></div>`}</div></section>`;
  return `<div class="wallet-screen"><div class="wallet-heading"><div><h1>${t('walletTitle')}</h1><p>${t('walletSubtitle')}</p></div><button class="icon-plate" data-action="balance" aria-label="${t(state.balanceVisible?'hideBalance':'showBalance')}">${icon(state.balanceVisible?'eye':'eyeoff')}</button></div><section class="wallet-summary cobalt-enamel"><span>${t('walletBalance')}</span><strong>${value(preview.balance)}</strong><small>${t('blueSampleLabel')} · THB</small></section><div class="wallet-categories">${category('bank','bankAccounts')}${category('ewallet','eWallets')}${category('cash','cashAccounts')}<section class="wallet-category"><h2>${t('walletLiabilities')}</h2><a class="wallet-liability enamel-list" href="#credit-card"><span class="mini-plate">${icon('card')}</span><span class="row-copy"><strong>${t('cardNickname')}</strong><small>${t('cardOutstanding')} · THB</small></span><strong>${value(creditCard.outstandingMinor/100)}</strong>${icon('chevron')}</a></section></div><p class="wallet-boundary">${icon('info')}${t('walletBoundary')}</p><button class="button secondary wallet-add-account" data-action="add-account">${icon('plus')}${t('addAccount')}</button><a class="button secondary wallet-transfer" href="#transfer">${icon('transfer')}${t('transferAction')}</a></div>`;
}
