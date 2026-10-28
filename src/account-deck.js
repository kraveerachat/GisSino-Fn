// Component-local geometry and motion. No account data or financial calculations live here.
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
export const deckTiming=Object.freeze({hold:260,snap:240,wheel:360});
export function boundedIndex(index,step,count) { return count?clamp(index+step,0,count-1):-1; }
export function deckMode(value) { return value==='horizontal'?'horizontal':'vertical'; }
export function deckLayout(count,index,mode,width,height) {
  const horizontal=deckMode(mode)==='horizontal',cardWidth=Math.max(1,Math.min(horizontal?360:420,width-(horizontal?48:16)));
  const left=(width-cardWidth)/2,exposure=width<520?24:28;
  const behind=Math.min(width<520?2:3,Math.max(0,count-1));
  const order=[index,...Array.from({length:count-index-1},(_,n)=>index+n+1),...Array.from({length:index},(_,n)=>index-n-1)];
  return {cardWidth,height:height+(horizontal?16:behind*exposure)+16,travel:horizontal?cardWidth*.86:Math.min(140,height*.72),
    poses:Array.from({length:count},(_,i)=>{
      const rank=order.indexOf(i),distance=i-index,visible=horizontal?Math.abs(distance)<=2:rank<=behind;
      return {x:horizontal?left+distance*cardWidth*.86:left,y:horizontal?8:(behind-Math.min(rank,behind))*exposure+8,
        z:count-(horizontal?Math.abs(distance):rank),opacity:visible?1:0,visible};
    })};
}
export function dragDecision(index,count,offset,travel) {
  const direction=offset<0?1:offset>0?-1:0,target=boundedIndex(index,direction,count);
  const progress=target===index?0:clamp(Math.abs(offset)/travel,0,1);
  return {target,progress,commit:target!==index&&Math.abs(offset)>=Math.max(36,travel*.3)};
}
export function wheelDecision(previous,delta,mode,index,count,now,ctrlKey=false) {
  const amount=delta*(mode===1?16:mode===2?640:1),step=Math.sign(amount);
  if(ctrlKey||!step||boundedIndex(index,step,count)===index)return {capture:false,step:0,state:{sum:0,last:previous.last||0}};
  if(previous.last&&now-previous.last<deckTiming.wheel)return {capture:true,step:0,state:previous};
  const sum=Math.sign(previous.sum||0)===step?(previous.sum||0)+amount:amount;
  if(Math.abs(sum)<48)return {capture:true,step:0,state:{sum,last:previous.last||0}};
  return {capture:true,step,state:{sum:0,last:now}};
}

export function mountAccountDeck(root,{onSelect,t}) {
  const board=root.closest('.account-board'),cards=[...root.querySelectorAll('[data-deck-card]')];
  const ids=cards.map(card=>card.dataset.accountId),mode=deckMode(root.dataset.mode),handle=root.querySelector('[data-deck-handle]');
  let index=Math.max(0,ids.indexOf(root.dataset.selected)),layout,poses=[],destroyed=false;
  let animation=0,dragFrame=0,holdTimer=0,pointer=null,suppressUntil=0,tap=null,tapStart=null,doubleClickCard=null;
  let wheelState={sum:0,last:0};
  const events=new AbortController(),signal=events.signal;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const phase=value=>{root.dataset.phase=value;};
  const axis=event=>mode==='horizontal'?event.clientX:event.clientY;
  const interpolate=(from,to,progress)=>to.map((end,i)=>({
    x:from[i].x+(end.x-from[i].x)*progress,y:from[i].y+(end.y-from[i].y)*progress,
    opacity:from[i].opacity+(end.opacity-from[i].opacity)*progress,
    z:progress<.5?from[i].z:end.z,visible:from[i].visible||end.visible
  }));
  const name=i=>cards[i].querySelector('.folder-name').textContent;
  function paint(next) {
    poses=next.map(p=>({...p}));
    cards.forEach((card,i)=>{
      const p=poses[i];card.style.transform=`translate3d(${p.x}px,${p.y}px,0)`;
      card.style.opacity=String(p.opacity);card.style.zIndex=String(p.z);
      card.style.setProperty('--deck-elevation',String(p.z/Math.max(1,cards.length)));
      card.inert=!p.visible;card.style.pointerEvents=p.visible?'':'none';
    });
    const active=poses[index];
    handle.style.transform=`translate3d(${active.x+layout.cardWidth-44}px,${active.y}px,0)`;
  }
  function semantics() {
    root.dataset.selected=ids[index];
    cards.forEach((card,i)=>{
      card.dataset.active=String(i===index);
      const content=card.querySelector('.folder-content');content.inert=i!==index;content.setAttribute('aria-hidden',String(i!==index));
      card.querySelector('.deck-card-select').hidden=i===index;
    });
    // Roving tabindex: the account list is one tab stop; arrow keys move within it (WP-20 F15).
    board.querySelectorAll('.account-choice').forEach(button=>{button.setAttribute('aria-pressed',String(button.dataset.id===ids[index]));button.tabIndex=button.dataset.id===ids[index]?0:-1;});
    board.querySelectorAll('[data-deck-dot]').forEach(dot=>dot.dataset.current=String(dot.dataset.deckDot===ids[index]));
    for(const button of board.querySelectorAll('[data-deck-step]'))button.disabled=boundedIndex(index,Number(button.dataset.deckStep),ids.length)===index;
    handle.setAttribute('aria-valuenow',String(index+1));handle.setAttribute('aria-valuetext',name(index));
    board.querySelector('[data-deck-status]').textContent=`${name(index)} · ${t('selectedAccount')}`;
  }
  function measure() {
    const width=root.clientWidth;if(!width||destroyed)return;
    cancelMotion();releasePointer();phase('idle');
    layout=deckLayout(ids.length,index,mode,width,160);
    cards.forEach(card=>{card.style.width=`${layout.cardWidth}px`;card.querySelector('.account-folder').style.height='auto';});
    const height=Math.ceil(Math.max(160,...cards.map(card=>card.querySelector('.account-folder').getBoundingClientRect().height)));
    cards.forEach(card=>card.querySelector('.account-folder').style.height=`${height}px`);
    layout=deckLayout(ids.length,index,mode,width,height);root.style.height=`${layout.height}px`;
    paint(layout.poses);semantics();
  }
  function select(id) {
    const next=ids.indexOf(id);if(next<0||destroyed)return;
    releasePointer();settle(next);
  }
  function cancelMotion() {cancelAnimationFrame(animation);cancelAnimationFrame(dragFrame);animation=0;dragFrame=0;}
  function releasePointer() {
    clearTimeout(holdTimer);holdTimer=0;
    if(pointer){const id=pointer.id;pointer=null;if(root.hasPointerCapture(id))root.releasePointerCapture(id);}
  }
  function settle(next) {
    cancelMotion();phase('settling');
    const from=poses.map(p=>({...p})),target=deckLayout(ids.length,next,mode,root.clientWidth,Number.parseFloat(cards[0].querySelector('.account-folder').style.height));
    const finish=()=>{index=next;layout=target;paint(layout.poses);semantics();phase('idle');onSelect(ids[index]);animation=0;};
    if(reduced.matches){finish();return;}
    let start;
    const frame=now=>{
      if(destroyed)return;
      start??=now;const progress=Math.min(1,(now-start)/deckTiming.snap);
      paint(interpolate(from,target.poses,1-(1-progress)**3));
      if(progress<1)animation=requestAnimationFrame(frame);else finish();
    };
    animation=requestAnimationFrame(frame);
  }
  function drawDrag() {
    dragFrame=0;if(!pointer||root.dataset.phase!=='dragging')return;
    const {target,progress}=dragDecision(index,ids.length,pointer.offset,layout.travel);
    const end=deckLayout(ids.length,target,mode,root.clientWidth,Number.parseFloat(cards[0].querySelector('.account-folder').style.height));
    const next=interpolate(layout.poses,end.poses,progress),position=mode==='horizontal'?'x':'y';
    next[index][position]=layout.poses[index][position]+pointer.offset*(target===index?.2:1);
    if(target!==index){next[target].opacity=1;next[target].visible=true;}
    paint(next);
  }
  function beginDrag() {if(!pointer)return;cancelMotion();phase('dragging');tap=null;}
  function down(event) {
    if(!event.isPrimary||event.button!==0||pointer)return;
    const element=event.target instanceof Element?event.target:null;
    doubleClickCard=null;
    if(!element||element.closest('a,button,input,select'))return;
    const active=element.closest('[data-deck-card][data-active="true"]');
    doubleClickCard=active;
    tapStart=event.pointerType==='touch'&&active?{x:event.clientX,y:event.clientY,id:active.dataset.accountId}:null;
    const isHandle=!!element.closest('[data-deck-handle]');
    if(event.pointerType==='touch'&&mode==='vertical'&&!isHandle)return;
    cancelMotion();paint(layout.poses);phase('press-pending');
    pointer={id:event.pointerId,origin:axis(event),x:event.clientX,y:event.clientY,offset:0,touch:event.pointerType==='touch',held:false};
    root.setPointerCapture(event.pointerId);
    if(pointer.touch&&mode==='vertical')holdTimer=setTimeout(()=>{if(pointer){pointer.held=true;beginDrag();}},deckTiming.hold);
  }
  function move(event) {
    if(tapStart&&Math.hypot(event.clientX-tapStart.x,event.clientY-tapStart.y)>8)tapStart=null;
    if(!pointer||event.pointerId!==pointer.id)return;
    pointer.offset=axis(event)-pointer.origin;
    if(root.dataset.phase==='press-pending'){
      if(pointer.touch&&mode==='vertical'){
        if(Math.hypot(event.clientX-pointer.x,event.clientY-pointer.y)>8){releasePointer();phase('idle');}
        return;
      }
      if(Math.abs(pointer.offset)<6)return;
      beginDrag();
    }
    if(event.cancelable)event.preventDefault();
    if(!dragFrame)dragFrame=requestAnimationFrame(drawDrag);
  }
  function openActive() {cards[index].querySelector('.folder-details').click();}
  function up(event) {
    if(pointer&&event.pointerId===pointer.id){
      const dragging=root.dataset.phase==='dragging',offset=pointer.offset;
      if(dragging){drawDrag();suppressUntil=performance.now()+500;tapStart=null;}
      const decision=dragDecision(index,ids.length,offset,layout.travel);
      releasePointer();if(dragging)settle(decision.commit?decision.target:index);else phase('idle');
    }
    if(tapStart&&performance.now()>suppressUntil){
      const now=performance.now();if(tap&&tap.id===tapStart.id&&now-tap.time<330){openActive();tap=null;}else tap={id:tapStart.id,time:now};
    }
    tapStart=null;
  }
  function cancel() {if(!pointer)return;const dragging=root.dataset.phase==='dragging';releasePointer();tapStart=null;if(dragging){suppressUntil=performance.now()+500;settle(index);}else phase('idle');}
  root.addEventListener('pointerdown',down,{signal});
  root.addEventListener('pointermove',move,{signal});
  root.addEventListener('pointerup',up,{signal});
  root.addEventListener('pointercancel',cancel,{signal});
  root.addEventListener('lostpointercapture',cancel,{signal});
  window.addEventListener('blur',cancel,{signal});
  root.addEventListener('dragstart',event=>event.preventDefault(),{signal});
  root.addEventListener('click',event=>{if(performance.now()<suppressUntil){event.preventDefault();event.stopImmediatePropagation();}},{capture:true,signal});
  root.addEventListener('dblclick',event=>{
    if(performance.now()<suppressUntil||root.dataset.phase!=='idle'||event.target.closest('a,button,[data-deck-handle]'))return;
    if(event.target.closest('[data-deck-card]')===cards[index]||doubleClickCard===cards[index])openActive();
  },{signal});
  root.addEventListener('keydown',event=>{
    if(event.altKey||event.ctrlKey||event.metaKey||event.target.closest('a,button,input,select'))return;
    const previous=mode==='vertical'?'ArrowUp':'ArrowLeft',next=mode==='vertical'?'ArrowDown':'ArrowRight';
    const target=event.key==='Home'?0:event.key==='End'?ids.length-1:event.key===previous?boundedIndex(index,-1,ids.length):event.key===next?boundedIndex(index,1,ids.length):-1;
    if(target<0)return;event.preventDefault();select(ids[target]);
  },{signal});
  board.querySelector('.account-overview-list')?.addEventListener('keydown',event=>{
    const choices=[...board.querySelectorAll('.account-choice')],current=choices.indexOf(event.target.closest('.account-choice'));
    if(current<0||event.altKey||event.ctrlKey||event.metaKey)return;
    const target=event.key==='Home'?0:event.key==='End'?choices.length-1:['ArrowUp','ArrowLeft'].includes(event.key)?Math.max(0,current-1):['ArrowDown','ArrowRight'].includes(event.key)?Math.min(choices.length-1,current+1):-1;
    if(target<0)return;event.preventDefault();choices[target].focus({preventScroll:true});select(choices[target].dataset.id);
  },{signal});
  board.addEventListener('click',event=>{const step=event.target.closest('[data-deck-step]');if(step)select(ids[boundedIndex(index,Number(step.dataset.deckStep),ids.length)]);},{signal});
  root.addEventListener('wheel',event=>{
    if(pointer)return;
    const delta=mode==='vertical'?event.deltaY:Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:0;
    const decision=wheelDecision(wheelState,delta,event.deltaMode,index,ids.length,performance.now(),event.ctrlKey);
    wheelState=decision.state;if(!decision.capture)return;
    event.preventDefault();if(decision.step)select(ids[boundedIndex(index,decision.step,ids.length)]);
  },{passive:false,signal});
  let lastWidth=0;
  const observer=new ResizeObserver(()=>{if(Math.abs(root.clientWidth-lastWidth)>.5){lastWidth=root.clientWidth;measure();}});
  observer.observe(root);measure();document.fonts.ready.then(()=>{if(!destroyed)measure();});
  return {select,destroy(){destroyed=true;cancelMotion();releasePointer();events.abort();observer.disconnect();}};
}
