import { providerOptions, resolveProvider } from './providers.js';
import { accountDisplay, providerBadge } from './account-display.js';
import { escapeHTML as esc } from './i18n.js';

export const profileLabels = ['profileSavings','profileCurrent','profileWallet','profileCash','profileOther'];
const labelsForType = type => type==='bank'?['profileSavings','profileCurrent','profileOther']:type==='ewallet'?['profileWallet','profileOther']:['profileCash','profileOther'];
export function profileDraft(account,state,t) {
  return {
    accountType:account?.accountType||'bank', providerId:account?.providerId||'kbank',
    nickname:account?accountDisplay(account,state,t).name:'', suffix:account?.suffix||'',
    profileLabel:account?.profileLabel||({bank:'profileSavings',ewallet:'profileWallet',cash:'profileCash'})[account?.accountType||'bank'],
    folderTone:account?.folderTone||'navy', accentTone:account?.accentTone||'provider'
  };
}
export function normalizeProfile(input) {
  const accountType=['bank','ewallet','cash'].includes(input.accountType)?input.accountType:'bank';
  const provider=resolveProvider(input.providerId,accountType);
  return {accountType,providerId:provider.providerId,nickname:String(input.nickname||'').trim().slice(0,60),
    suffix:String(input.suffix||'').trim().slice(0,12),
    profileLabel:labelsForType(accountType).includes(input.profileLabel)?input.profileLabel:labelsForType(accountType)[0],
    folderTone:['navy','cobalt','slate'].includes(input.folderTone)?input.folderTone:'navy',
    accentTone:input.accentTone==='neutral'?'neutral':'provider'};
}
export function applyProfile(records,input,id,newId) {
  const profile=normalizeProfile(input);
  if(!profile.nickname)throw new Error('profileNameRequired');
  if(id&&!records.some(a=>a.id===id))throw new Error('boardUnavailableTitle');
  return id?records.map(a=>a.id===id?{...a,...profile}:a):[...records,{...profile,id:newId,currency:'THB',balanceMinor:undefined,archived:false,sortOrder:Math.max(-1,...records.map(a=>a.sortOrder||0))+1}];
}
export function accountProfileForm(draft,state,t,editing=false) {
  const d=normalizeProfile(draft),provider=resolveProvider(d.providerId,d.accountType);
  const display=accountDisplay({...d,id:'profile-preview',currency:'THB'},state,t);
  const select=(name,label,options)=>`<label class="field" for="profile-${name}">${t(label)}<select id="profile-${name}" name="${name}" data-profile-control="${name}">${options.map(([value,text])=>`<option value="${value}" ${d[name]===value?'selected':''}>${esc(text)}</option>`).join('')}</select></label>`;
  return `<p class="sheet-subtitle" id="profile-session-note">${t('profileSessionNote')}</p>
    <form id="account-profile-form" novalidate aria-describedby="profile-session-note">
      <div class="profile-provider-preview ${display.theme}">${providerBadge(display)}<span>${esc(state.locale==='th'?provider.nameTh:provider.nameEn)}</span></div>
      ${select('accountType','providerType',[['bank',t('bankAccounts')],['ewallet',t('eWallets')],['cash',t('cashAccounts')]])}
      ${d.accountType!=='cash'?select('providerId','profileProvider',providerOptions(d.accountType).map(p=>[p.providerId,state.locale==='th'?p.nameTh:p.nameEn])):''}
      <label class="field" for="profile-nickname">${t('profileNickname')}<input id="profile-nickname" name="nickname" value="${esc(d.nickname)}" maxlength="60" required autocomplete="off" aria-describedby="profile-name-error"><span class="profile-field-error" id="profile-name-error" hidden>${t('profileNameRequired')}</span></label>
      <details class="profile-options" ${draft.optionsOpen?'open':''}><summary>${t('profileOptions')}</summary>
        <label class="field" for="profile-suffix">${t('profileSuffix')}<input id="profile-suffix" name="suffix" value="${esc(d.suffix)}" maxlength="12" autocomplete="off"></label>
        ${select('profileLabel','profileAccountLabel',labelsForType(d.accountType).map(key=>[key,t(key)]))}
        ${select('folderTone','profileFolderTone',['navy','cobalt','slate'].map(value=>[value,t(`tone${value[0].toUpperCase()+value.slice(1)}`)]))}
        ${select('accentTone','profileAccent',[['provider',t('profileProviderAccent')],['neutral',t('profileNeutralAccent')]])}
      </details>
      <div class="profile-form-actions"><button class="button primary full-width" type="submit">${t(editing?'applyProfileChanges':'createSampleProfile')}</button><button class="button secondary full-width" type="button" data-action="profile-cancel">${t('profileCancel')}</button></div>
    </form>`;
}
