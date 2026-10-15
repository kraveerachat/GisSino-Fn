import { icon } from './icons.js';

export const islandDestinations = Object.freeze(['home','wallet','activity']);
export const moreDestinations = Object.freeze([
  { route:'bills', label:'moreBills', description:'moreBillsDescription', icon:'calendar' },
  { route:'party', label:'party', description:'morePartyDescription', icon:'party' }
]);
export function navigationContext(route,cardReturn='bills') {
  if(route==='credit-card'&&cardReturn==='wallet')return 'wallet';
  if (['bills','party','credit-card'].includes(route)) return 'more';
  if (route==='transfer') return 'wallet';
  return islandDestinations.includes(route) ? route : null;
}
export function desktopContext(route,cardReturn='bills') {
  const context=navigationContext(route,cardReturn);
  return context==='more'?(route==='party'?'party':'bills'):context;
}
export function desktopAdd(t) {
  return `<button class="desktop-add" data-action="add" aria-label="${t('add')}" title="${t('add')}" aria-haspopup="dialog">${icon('plus')}</button>`;
}
export function floatingNavigation(state,t) {
  const context=navigationContext(state.route,state.cardReturn);
  return `<div class="mobile-navigation floating-islands"><nav class="navigation island-capsule" aria-label="${t('navLabel')}">${islandDestinations.map(route=>`<a class="nav-item ${context===route?'is-active':''}" href="#${route}" ${context===route?'aria-current="page"':''}>${icon(route)}<span>${t(route)}</span></a>`).join('')}<button class="nav-item more-trigger ${context==='more'?'is-active':''}" data-action="more" aria-expanded="false" aria-controls="more-panel" popovertarget="more-panel" aria-haspopup="dialog" ${context==='more'?'data-current-context="true"':''}><span class="more-symbol">${icon('more')}</span><span class="more-close-symbol">${icon('close')}</span><span>${t('more')}</span></button></nav><button class="island-add" data-action="add" aria-label="${t('add')}" aria-haspopup="dialog">${icon('plus')}</button></div>
  <section id="more-panel" class="more-panel" popover="auto" role="dialog" aria-labelledby="more-title"><div class="more-panel-header"><h2 id="more-title">${t('more')}</h2><button class="icon-button" data-action="close-more" autofocus aria-label="${t('closeMore')}">${icon('close')}</button></div><nav class="more-grid" aria-label="${t('moreDestinations')}">${moreDestinations.map(item=>`<a class="more-tile ${state.route===item.route||(item.route==='bills'&&state.route==='credit-card'&&state.cardReturn!=='wallet')?'is-current':''}" href="#${item.route}" ${state.route===item.route?'aria-current="page"':''}><span class="more-tile-icon">${icon(item.icon)}</span><strong>${t(item.label)}</strong><small>${t(item.description)}</small></a>`).join('')}</nav></section>`;
}
// Native popover is the single source of truth; no duplicated open-state flag.
export function navigationOverlay(sheet,closeSheet) {
  const panel=()=>document.querySelector('#more-panel');
  const trigger=()=>document.querySelector('[data-action="more"]');
  const isOpen=()=>panel()?.matches(':popover-open') ?? false;
  function sync(open=isOpen()) {
    trigger()?.setAttribute('aria-expanded',String(open));
    trigger()?.classList.toggle('is-expanded',open);
  }
  function close(restoreFocus=false) {
    if (!isOpen()) return;
    panel().hidePopover();sync();
    if(restoreFocus)trigger()?.focus({preventScroll:true});
  }
  document.addEventListener('beforetoggle',event=>{
    if(event.target!==panel())return;
    if(event.newState==='open'&&sheet.open)closeSheet(false);
    sync(event.newState==='open');
  },true);
  document.addEventListener('toggle',event=>{if(event.target===panel())sync();},true);
  document.addEventListener('click',event=>{
    const link=event.target.closest('#more-panel a');
    if(link)close(link.getAttribute('href')===location.hash);
  },true);
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&isOpen()){event.preventDefault();close(true);}
  },true);
  document.addEventListener('pointerdown',event=>{
    if(!isOpen()||panel().contains(event.target)||trigger()?.contains(event.target))return;
    close(!event.target.closest('a,button,input,select,textarea,[tabindex]'));
  },true);
  document.addEventListener('focusin',event=>{
    if(isOpen()&&!panel().contains(event.target)&&!trigger()?.contains(event.target))close();
  });
  window.matchMedia('(min-width:1100px)').addEventListener('change',event=>{
    if(event.matches&&isOpen()) {
      close();document.querySelector('.sidebar .nav-item.is-active,.sidebar .nav-item')?.focus({preventScroll:true});
    }
  });
  return {close,isOpen};
}
