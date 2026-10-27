import { installGuide } from './pwa-install.js';
import { logo,icon } from './icons.js';
import { escapeHTML as esc } from './i18n.js';
import { providerOptions,resolveProvider } from './providers.js';
import { providerBadge } from './account-display.js';
import { createPreviewFlow,setupSteps,stepNavigation,approximateAge,routeTitles } from './preview-flow.js';
export { publicRoutes,isPublicRoute } from './preview-flow.js';

// Tablet orientation wins below 1440px when the short side is >=768px.
// Desktop 1280×800 stays desktop; iPad 1366×1024 stays tablet landscape.
export const welcomeArt=Object.freeze([
  {name:'tablet-portrait',media:'(min-width: 600px) and (min-height: 600px) and (orientation: portrait)',width:1536,height:2048},
  {name:'tablet-landscape',media:'(min-width: 768px) and (min-height: 900px) and (max-width: 1439px) and (orientation: landscape), (min-width: 768px) and (max-width: 1279px) and (min-height: 600px) and (orientation: landscape)',width:2048,height:1536},
  {name:'desktop',media:'(min-width: 1280px)',width:2560,height:1440}
]);
export function backgroundArtwork() {
  return `<picture class="welcome-art" aria-hidden="true">${welcomeArt.map(a=>`<source media="${a.media}" type="image/webp" srcset="/assets/welcome/${a.name}.webp" width="${a.width}" height="${a.height}">`).join('')}<img src="/assets/welcome/mobile.webp" width="1080" height="1920" alt="" fetchpriority="high" decoding="async"></picture>`;
}
const action=(href,label,primary=true)=>`<a class="welcome-cta ${primary?'welcome-primary':'welcome-secondary'}" href="#${href}">${label}${primary?icon('arrow'):''}</a>`;
function brand(t,large=false) {return `<div class="${large?'welcome-identity':'flow-brand'}">${logo}<span class="flow-brand-name">${t('appName')}</span></div>`;}
function inputField(t,{name,label,type='text',value='',credential=false,hint='',extra=''}) {
  const password=type==='password';
  return `<div class="flow-field"><label for="pv-${name}">${t(label)}</label><div class="flow-input-wrap"><input id="pv-${name}" name="${name}" type="${type}" value="${esc(value)}" ${credential?'data-credential autocomplete="off"':'data-preview-field="'+name+'"'} aria-describedby="pv-${name}-error${hint?' pv-'+name+'-hint':''}" ${extra}>${password?`<button type="button" class="password-toggle" data-preview-action="password" data-target="pv-${name}" aria-label="${t('pvShowPassword')}" aria-pressed="false">${icon('eye')}</button>`:''}</div>${hint?`<p class="field-hint" id="pv-${name}-hint">${t(hint)}</p>`:''}<p class="field-error" id="pv-${name}-error" data-error-for="${name}" hidden></p></div>`;
}
const validation=()=>'<p class="flow-message error" data-validation-summary role="alert" hidden></p>';
const submit=(t,label)=>`<button class="welcome-cta welcome-primary" type="submit">${t(label)}${icon('arrow')}</button>`;
function progress(route,t) {
  const nav=stepNavigation(route);if(!nav)return '';
  return `<div class="flow-progress"><p>${t('setupProgress',{n:nav.index+1,total:6})}</p><ol aria-label="${t('setupProgressLabel')}">${setupSteps.map((step,i)=>`<li class="${i<nav.index?'is-past':''}" ${i===nav.index?'aria-current="step"':''}><span class="sr-only">${t(step+'Step')}</span></li>`).join('')}</ol></div>`;
}
function credentials(route,t) {
  const signup=route==='signup';
  return `<form data-preview-form="${route}" novalidate autocomplete="off">
  ${inputField(t,{name:'email',label:'emailLabel',type:'email',credential:true,extra:'inputmode="email" autocapitalize="none" spellcheck="false"'})}
  ${inputField(t,{name:'password',label:'passwordLabel',type:'password',credential:true})}
  ${signup?inputField(t,{name:'confirm',label:'confirmPassword',type:'password',credential:true}):`<div class="forgot-password"><button type="button" disabled aria-describedby="demo-description">${t('forgotPasswordPreview')}</button></div>`}
  <div class="flow-actions">${submit(t,signup?'welcomeSignup':'welcomeLogin')}
  <div class="auth-separator"><span>${t('authSeparator')}</span></div>
  <button class="welcome-cta welcome-secondary google-option" type="button" data-preview-action="google" aria-describedby="demo-description">${t(signup?'googleSignup':'googleContinue')}</button>
  <a class="flow-text-link" href="#${signup?'login':'signup'}">${t(signup?'existingAccount':'needAccount')}</a></div></form>`;
}
function profile(flow,t) {
  return `${inputField(t,{name:'displayName',label:'displayNameLabel',value:flow.displayName,extra:'maxlength="60" autocomplete="off"'})}${inputField(t,{name:'nickname',label:'nicknameLabel',value:flow.nickname,hint:'nicknameHint',extra:'maxlength="60" autocomplete="off"'})}
  <fieldset class="avatar-picker"><legend>${t('avatarLabel')}</legend><div class="avatar-options">${['shield','sun','flame','wallet'].map(value=>`<label class="avatar-choice"><input id="avatar-${value}" type="radio" name="avatar" data-preview-field="avatar" value="${value}" ${flow.avatar===value?'checked':''}><span>${icon(value)}</span><span class="sr-only">${t('avatar'+value)}</span></label>`).join('')}</div></fieldset>`;
}
function about(flow,t) {
  const age=approximateAge(flow.birthYear);
  return `${inputField(t,{name:'birthYear',label:'birthYearLabel',value:flow.birthYear,hint:'birthYearHint',extra:'inputmode="numeric" maxlength="4" autocomplete="off"'})}<p class="age-preview" id="age-preview" role="status">${age===null?t('ageEmpty'):t('ageApproximate',{age})}</p>
  <fieldset class="flow-radio-group"><legend>${t('genderLabel')}</legend>${['male','female','unspecified'].map(value=>`<label><input id="gender-${value}" name="gender" type="radio" data-preview-field="gender" value="${value}" ${flow.gender===value?'checked':''}><span>${t('gender'+value)}</span></label>`).join('')}</fieldset>`;
}
function consent(flow,t) {
  return `<div class="privacy-principles">${[['shield','privateFinanceTitle','privateFinanceBody'],['eye','visibilityTitlePreview','visibilityBodyPreview'],['info','sampleDataTitle','sampleDataBody']].map(([glyph,title,body])=>`<section>${icon(glyph)}<div><h2>${t(title)}</h2><p>${t(body)}</p></div></section>`).join('')}</div><label class="flow-check"><input type="checkbox" data-preview-field="consentDemo" ${flow.consentDemo?'checked':''}><span>${t('consentDemoLabel')}</span></label>`;
}
function firstAccounts(flow,state,t) {
  const provider=resolveProvider(flow.providerId,flow.accountType);
  return `<div class="flow-field"><label for="pv-accountType">${t('accountTypePreview')}</label><select id="pv-accountType" data-preview-field="accountType">${['bank','ewallet','cash'].map(type=>`<option value="${type}" ${flow.accountType===type?'selected':''}>${t('type'+type)}</option>`).join('')}</select></div>
  ${flow.accountType!=='cash'?`<div class="flow-field"><label for="pv-providerId">${t('providerPreview')}</label><select id="pv-providerId" data-preview-field="providerId">${providerOptions(flow.accountType).map(p=>`<option value="${p.providerId}" ${p.providerId===flow.providerId?'selected':''}>${esc(state.locale==='th'?p.nameTh:p.nameEn)}</option>`).join('')}</select></div>`:''}
  <div class="flow-field"><label for="pv-currency">${t('currencyPreview')}</label><select id="pv-currency" data-preview-field="currency"><option value="THB" ${flow.currency==='THB'?'selected':''}>THB</option><option value="USD" ${flow.currency==='USD'?'selected':''}>USD</option></select></div>
  <div class="provider-preview">${providerBadge({provider})}<div><strong>${esc(state.locale==='th'?provider.nameTh:provider.nameEn)}</strong><span>${flow.currency}</span></div></div>`;
}
function notifications(flow,t) {
  return `<div class="notification-options">${[['inApp','inAppPreview'],['push','pushPreview'],['emailNotice','emailNotificationPreview']].map(([name,label])=>`<label class="flow-check"><input type="checkbox" data-preview-field="${name}" ${flow[name]?'checked':''}><span>${t(label)}</span></label>`).join('')}</div>`;
}
function install(flow,t) {
  return installGuide(t,{platform:flow.installPlatform});
}
function stepForm(route,flow,state,t) {
  const step=route.split('/')[1];
  const contents={profile:()=>profile(flow,t),about:()=>about(flow,t),consent:()=>consent(flow,t),accounts:()=>firstAccounts(flow,state,t),notifications:()=>notifications(flow,t),install:()=>install(flow,t)};
  return `<form data-preview-form="${step}" novalidate>${validation()}${contents[step]()}<div class="flow-actions">${submit(t,'previewNext')}</div></form>`;
}
function publicContent(route,flow,state,t) {
  if(route==='entry')return `<p class="entry-question">${t('entryQuestion')}</p><div class="flow-actions">${action('login',t('welcomeLogin'))}${action('signup',t('welcomeSignup'),false)}</div>`;
  if(route==='login'||route==='signup')return credentials(route,t);
  if(stepNavigation(route))return stepForm(route,flow,state,t);
  return `<div class="postcard-message"><p>${esc(t('postcardGreeting',{name:flow.nickname.trim()||t('postcardFriend')}))}</p><p>${t('postcardBody')}</p></div><div class="flow-actions">${action('home',t('demoHome'))}</div>`;
}
export function welcomeScreen(state,t,flow=createPreviewFlow()) {
  const route=state.route,hero=route==='welcome',nav=stepNavigation(route);
  const previous=route==='entry'?'welcome':route==='login'||route==='signup'?'entry':nav?.previous||'setup/install';
  const toolbar=`<header class="welcome-toolbar">${hero?'':`<a class="flow-back" href="#${previous}">${icon('arrow')}<span>${t('back')}</span></a>`}<span class="demo-mode" aria-describedby="demo-description">${t('demoMode')}</span><span class="sr-only" id="demo-description">${t('demoModeDescription')}</span><label class="welcome-language" for="locale-select"><span>${t('language')}</span><select id="locale-select" data-control="locale" aria-label="${t('language')}"><option value="th" ${state.locale==='th'?'selected':''}>${t('thai')}</option><option value="en" ${state.locale==='en'?'selected':''}>${t('english')}</option></select></label></header>`;
  if(hero)return `<div class="welcome-screen welcome-hero">${backgroundArtwork()}${toolbar}<main id="main" class="welcome-content" tabindex="-1"><div class="welcome-identity">${logo}<h1 class="welcome-wordmark">${t('appName')}</h1><p class="welcome-tagline">${t('welcomeTagline')}</p><p class="welcome-description">${t('welcomeDescription')}</p></div><div class="welcome-actions">${action('entry',t('getStarted'))}</div></main></div>`;
  const intro=route.startsWith('setup/')?route.split('/')[1]+'Intro':route+'Intro';
  return `<div class="welcome-screen flow-screen ${route==='postcard'?'postcard-screen':''}">${backgroundArtwork()}${toolbar}<main id="main" class="flow-layout" tabindex="-1"><aside class="journey-context" aria-label="${t('journeyTitle')}"><p class="journey-statement">${t('journeyTitle')}</p><p>${t('journeyContext')}</p></aside><article class="flow-panel">${brand(t)}${progress(route,t)}<div class="flow-heading"><h1>${t(routeTitles[route])}</h1>${route==='postcard'?'':`<p>${t(intro)}</p>`}</div>${publicContent(route,flow,state,t)}</article></main></div>`;
}
