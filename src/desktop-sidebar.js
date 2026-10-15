// Session-only navigation preference. Hover is transient and never drives layout.
export const sidebarTiming = Object.freeze({ enter:150, leave:180 });
export function sidebarState() {
  return { pinned:false, temporary:false, suppressed:false, pointerInside:false, focusInside:false };
}
export function sidebarTransition(state,event) {
  const next={...state};
  if(event==='toggle') {
    next.pinned=!state.pinned; next.temporary=false; next.suppressed=!next.pinned&&state.pointerInside;
  } else if(event==='enter') {
    next.pointerInside=true;
  } else if(event==='leave') {
    next.pointerInside=false; next.suppressed=false;
  } else if(event==='open'&&!state.pinned&&!state.suppressed&&state.pointerInside) {
    next.temporary=true;
  } else if(event==='keyboard'&&!state.pinned) {
    next.temporary=true;
  } else if(event==='close'&&!state.pointerInside&&!state.focusInside) {
    next.temporary=false;
  } else if(event==='focus') {
    next.focusInside=true;
  } else if(event==='blur') {
    next.focusInside=false;
  } else if(event==='dismiss'||event==='suspend') {
    next.temporary=false; next.suppressed=state.pointerInside;
  } else if(event==='reset') {
    next.temporary=false; next.suppressed=false; next.pointerInside=false; next.focusInside=false;
  }
  return next;
}
export function desktopSidebar(app,t) {
  let state=sidebarState(),enterTimer,leaveTimer;
  const desktop=matchMedia('(min-width:1100px)');
  const hover=matchMedia('(hover:hover) and (pointer:fine)');
  const rail=()=>app.querySelector('#desktop-sidebar');
  function sync() {
    const expanded=state.pinned||state.temporary;
    app.dataset.sidebarPinned=String(state.pinned);
    const element=rail();
    if(!element)return;
    element.dataset.expanded=String(expanded);
    element.dataset.temporary=String(state.temporary&&!state.pinned);
    const toggle=element.querySelector('[data-action="sidebar-toggle"]');
    toggle.setAttribute('aria-expanded',String(expanded));
    toggle.setAttribute('aria-pressed',String(state.pinned));
    toggle.setAttribute('aria-label',t(state.pinned?'collapseSidebar':'pinSidebar'));
    toggle.title=t(state.pinned?'collapseSidebar':'pinSidebar');
  }
  function send(event) { state=sidebarTransition(state,event); sync(); }
  function cancelTimers() { clearTimeout(enterTimer); clearTimeout(leaveTimer); }
  function scheduleClose() {
    clearTimeout(leaveTimer);
    leaveTimer=setTimeout(()=>send('close'),sidebarTiming.leave);
  }
  // Delegation survives app.innerHTML without attaching listeners on every render.
  app.addEventListener('pointerover',event=>{
    const element=rail();
    if(!desktop.matches||!hover.matches||event.pointerType==='touch'||!element?.contains(event.target)||element.contains(event.relatedTarget))return;
    clearTimeout(leaveTimer);send('enter');
    clearTimeout(enterTimer);enterTimer=setTimeout(()=>send('open'),sidebarTiming.enter);
  });
  app.addEventListener('pointerout',event=>{
    const element=rail();
    if(!element?.contains(event.target)||element.contains(event.relatedTarget))return;
    clearTimeout(enterTimer);send('leave');scheduleClose();
  });
  app.addEventListener('focusin',event=>{
    if(rail()?.contains(event.target)){
      clearTimeout(leaveTimer);send('focus');
      if(desktop.matches&&event.target.matches('.nav-item:focus-visible,.profile-rail:focus-visible'))send('keyboard');
    }
  });
  app.addEventListener('focusout',event=>{
    if(rail()?.contains(event.target)&&!rail().contains(event.relatedTarget)){
      send('blur');
      if(event.relatedTarget&&state.temporary)send('dismiss');
      else scheduleClose();
    }
  });
  app.addEventListener('click',event=>{
    if(event.target.closest('[data-action="sidebar-toggle"]')){cancelTimers();send('toggle');}
  });
  app.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&state.temporary&&!state.pinned) {
      event.preventDefault();cancelTimers();send('dismiss');
      rail()?.querySelector('[data-action="sidebar-toggle"]').focus({preventScroll:true});
    }
  });
  function suspend() { cancelTimers();send('suspend'); }
  desktop.addEventListener('change',()=>{
    cancelTimers();
    const focused=rail()?.contains(document.activeElement);
    send('reset');
    if(!desktop.matches&&focused)app.querySelector('.mobile-navigation .is-active,.mobile-navigation a')?.focus({preventScroll:true});
  });
  hover.addEventListener('change',()=>{cancelTimers();send('reset');});
  window.addEventListener('blur',suspend);
  function rendered() {
    // A replaced DOM cannot retain pointer/focus ownership. Only pin survives.
    cancelTimers();state=sidebarTransition(state,'reset');sync();
  }
  return { rendered,suspend };
}
