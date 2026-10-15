import test from 'node:test';
import assert from 'node:assert/strict';
import { navigationContext, desktopContext } from '../src/navigation.js';
import { sidebarState, sidebarTransition } from '../src/desktop-sidebar.js';
import { accounts,creditCard,preview } from '../src/fixtures.js';

test('Child finance views preserve their navigation parent and entry context',()=>{
  assert.equal(navigationContext('transfer'),'wallet');
  assert.equal(navigationContext('credit-card','wallet'),'wallet');
  assert.equal(navigationContext('credit-card','bills'),'more');
  assert.equal(navigationContext('bills'),'more');
  assert.equal(navigationContext('party'),'more');
  assert.equal(navigationContext('settings'),null);
});
test('Wallet fixtures distinguish asset category from icon and card liability',()=>{
  const savings=accounts.find(a=>a.id==='savings');
  assert.equal(savings.accountType,'bank');
  assert.equal(savings.kind,'wallet');
  assert.equal(accounts.reduce((total,a)=>total+a.amount,0),preview.balance);
  assert.ok(creditCard.outstandingMinor>0);
  assert.ok(!accounts.some(a=>a.id===creditCard.id));
});
test('Desktop destinations preserve the direct Bills and Wallet detail context',()=>{
  assert.equal(desktopContext('credit-card','wallet'),'wallet');
  assert.equal(desktopContext('credit-card','bills'),'bills');
  assert.equal(desktopContext('transfer'),'wallet');
  assert.equal(desktopContext('party'),'party');
  assert.equal(desktopContext('settings'),null);
});
const step=(state,...events)=>events.reduce(sidebarTransition,state);
test('Transient hover never changes the pinned layout preference',()=>{
  const initial=sidebarState();
  const entered=step(initial,'enter');
  assert.equal(entered.temporary,false);
  const open=step(entered,'open');
  assert.equal(open.temporary,true);
  assert.equal(open.pinned,false);
  const left=step(open,'leave','close');
  assert.equal(left.temporary,false);
  assert.equal(left.pinned,false);
  assert.deepEqual(initial,sidebarState());
});
test('Pin survives pointer leave, modal suspension, and responsive resets',()=>{
  const pinned=step(sidebarState(),'enter','open','toggle');
  for(const event of ['leave','close','suspend','reset']) {
    assert.equal(sidebarTransition(pinned,event).pinned,true);
  }
});
test('Unpin suppresses reopening until a fresh pointer entry',()=>{
  const unpinned=step(sidebarState(),'enter','open','toggle','toggle','open');
  assert.equal(unpinned.pinned,false);
  assert.equal(unpinned.temporary,false);
  assert.equal(unpinned.suppressed,true);
  assert.equal(step(unpinned,'leave','enter','open').temporary,true);
  assert.equal(step(sidebarState(),'toggle','toggle','enter','open').temporary,true);
});
test('Keyboard focus holds a temporary panel after pointer exit; Escape only dismisses transient expansion',()=>{
  const focused=step(sidebarState(),'enter','open','focus','leave','close');
  assert.equal(focused.temporary,true);
  assert.equal(step(focused,'blur','close').temporary,false);
  assert.equal(step(focused,'dismiss').temporary,false);
  assert.equal(step(focused,'toggle','dismiss').pinned,true);
});
test('Late hover timers and quick exits cannot reopen a suspended or reset panel',()=>{
  assert.equal(step(sidebarState(),'enter','leave','open').temporary,false);
  assert.equal(step(sidebarState(),'enter','suspend','open').temporary,false);
  assert.equal(step(sidebarState(),'enter','reset','open').temporary,false);
});
test('Keyboard disclosure works without hover; rerender clears transient ownership only',()=>{
  const keyboard=step(sidebarState(),'focus','keyboard');
  assert.equal(keyboard.temporary,true);
  assert.equal(keyboard.pointerInside,false);
  const reset=step(keyboard,'reset');
  assert.deepEqual(reset,sidebarState());
  assert.equal(step(keyboard,'toggle','reset').pinned,true);
});
