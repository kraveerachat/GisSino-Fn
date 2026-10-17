// Transient design-preview values only. Credentials never enter this model.
export const setupSteps = Object.freeze(['profile','about','consent','accounts','notifications','install']);
export const publicRoutes = Object.freeze(['welcome','entry','login','signup',...setupSteps.map(step=>'setup/'+step),'postcard']);
export const isPublicRoute = route => publicRoutes.includes(route);
export const routeTitles = Object.freeze({welcome:'welcomeTitle',entry:'entryTitle',login:'welcomeLogin',signup:'createAccountTitle','setup/profile':'profileStep','setup/about':'aboutStep','setup/consent':'consentStep','setup/accounts':'accountsStep','setup/notifications':'notificationsStep','setup/install':'installStep',postcard:'postcardTitle'});
// Demo navigation only: this is not a production authentication contract.
export const credentialDemoTarget = kind => kind==='login'?'home':kind==='signup'?'setup/profile':null;
export function createPreviewFlow() {
  return {displayName:'',nickname:'',avatar:'shield',birthYear:'',gender:'unspecified',consentDemo:false,accountType:'bank',providerId:'kbank',currency:'THB',inApp:false,push:false,emailNotice:false,installPlatform:'ios'};
}
export function updatePreviewValue(flow,key,value) {
  if (!Object.hasOwn(createPreviewFlow(),key)) return false;
  const choices={avatar:['shield','sun','flame','wallet'],gender:['male','female','unspecified'],accountType:['bank','ewallet','cash'],currency:['THB','USD'],installPlatform:['ios','android','desktop']};
  if (choices[key] && !choices[key].includes(value)) return false;
  if (['consentDemo','inApp','push','emailNotice'].includes(key)) { if(typeof value!=='boolean')return false; }
  else if(typeof value!=='string')return false;
  if (['displayName','nickname'].includes(key)) value=value.slice(0,60);
  if (key==='birthYear') value=value.slice(0,4);
  if (key==='providerId' && !/^[a-z-]{1,32}$/.test(value))return false;
  flow[key]=value;
  if(key==='accountType') flow.providerId=({bank:'kbank',ewallet:'truemoney',cash:'cash'})[value];
  return true;
}
export function stepNavigation(route) {
  const index=setupSteps.findIndex(step=>route==='setup/'+step);
  return index<0?null:{index,previous:index?'setup/'+setupSteps[index-1]:'signup',next:index===5?'postcard':'setup/'+setupSteps[index+1]};
}
export function approximateAge(year,currentYear=new Date().getFullYear()) {
  return /^\d{4}$/.test(year)&&Number(year)>=1000&&Number(year)<=currentYear?currentYear-Number(year):null;
}
export function validatePreviewFields(kind,values,currentYear=new Date().getFullYear()) {
  const errors={};
  if(kind==='about'&&values.birthYear&&approximateAge(values.birthYear,currentYear)===null)errors.birthYear='yearFormat';
  return errors;
}
export function mountPreviewFlow(root,flow,t,rerender) {
  const surface=root.querySelector('.welcome-screen');
  if(!surface)return;
  const fieldError=(form,name,key)=>{
    const input=form.elements.namedItem(name),message=form.querySelector('[data-error-for="'+name+'"]');
    if(!input||!message)return;
    input.setAttribute('aria-invalid',key?'true':'false');
    message.textContent=key?t(key):'';message.hidden=!key;
  };
  const continueDemo=form=>{
    const destination=credentialDemoTarget(form?.dataset.previewForm);
    if(!destination)return false;
    form.querySelectorAll('[data-credential]').forEach(input=>input.value='');
    location.hash=destination;
    return true;
  };
  surface.addEventListener('input',event=>{
    const key=event.target.dataset.previewField;
    if(!key)return;
    updatePreviewValue(flow,key,event.target.type==='checkbox'?event.target.checked:event.target.value);
    if(key==='birthYear'){
      const age=approximateAge(flow.birthYear),output=surface.querySelector('#age-preview');
      if(output)output.textContent=age===null?t('ageEmpty'):t('ageApproximate',{age});
    }
  });
  surface.addEventListener('change',event=>{
    const key=event.target.dataset.previewField;
    if(!key)return;
    updatePreviewValue(flow,key,event.target.type==='checkbox'?event.target.checked:event.target.value);
    if(['accountType','providerId','currency','avatar','gender'].includes(key))rerender(event.target.id);
  });
  surface.addEventListener('click',event=>{
    const button=event.target.closest('[data-preview-action]');
    if(!button)return;
    if(button.dataset.previewAction==='password'){
      const input=surface.querySelector('#'+button.dataset.target);
      if(!input)return;
      const visible=input.type==='password';input.type=visible?'text':'password';
      button.setAttribute('aria-pressed',String(visible));button.setAttribute('aria-label',t(visible?'pvHidePassword':'pvShowPassword'));
    }else if(button.dataset.previewAction==='google'){
      continueDemo(button.closest('[data-preview-form]'));
    }else if(button.dataset.previewAction==='platform'){
      updatePreviewValue(flow,'installPlatform',button.dataset.platform);rerender(button.id);
    }
  });
  surface.addEventListener('submit',event=>{
    const form=event.target.closest('[data-preview-form]');if(!form)return;
    event.preventDefault();
    const kind=form.dataset.previewForm;
    if(continueDemo(form))return;
    const errors=validatePreviewFields(kind,flow);
    fieldError(form,'birthYear',errors.birthYear);
    const summary=form.querySelector('[data-validation-summary]');
    if(Object.keys(errors).length){
      if(summary){summary.textContent=t('formErrors');summary.hidden=false;}
      form.elements.namedItem(Object.keys(errors)[0])?.focus();
      return;
    }
    if(summary){summary.textContent='';summary.hidden=true;}
    location.hash=stepNavigation('setup/'+kind)?.next||'welcome';
  });
}
