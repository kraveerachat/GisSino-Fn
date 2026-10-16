import test from 'node:test';
import assert from 'node:assert/strict';
import { providers, resolveProvider, providerOptions, providerTheme } from '../src/providers.js';
import { accounts,preview } from '../src/fixtures.js';
import { assetAccounts,accountDisplay,accountPreview,walletAccountRow } from '../src/account-display.js';
import { accountBoard,stepAccount,selectedAccount,parseAccountHash } from '../src/account-board.js';
import { deckLayout,deckMode,dragDecision,wheelDecision,deckTiming } from '../src/account-deck.js';
import { translator } from '../src/i18n.js';
const t=translator('en');
const state={locale:'en',balanceVisible:true,accountView:'vertical',accountSelected:'daily',accountState:'sample'};

test('Provider identity is separate from accounts and contains no financial records',()=>{
  assert.equal(Object.keys(providers).length,19);
  for(const p of Object.values(providers)) {
    assert.match(p.primaryColor,/^#[a-f0-9]{6}$/i);
    assert.equal(p.logoStatus,p.logoPath?'OWNER_SUPPLIED':'VERIFY');
    if(p.logoPath)assert.match(p.logoPath,/^\/assets\/providers\/[a-zA-Z]+\.png$/);
    assert.ok(p.verificationSource.startsWith('https://'));
    assert.equal(p.colorStatus,'PROPOSED_UI_ACCENT');
    assert.ok(!('amount' in p)&&!('balance' in p)&&!('balanceMinor' in p));
  }
  assert.ok(providerOptions('bank').some(p=>p.providerId==='other-bank'));
  assert.ok(providerOptions('ewallet').some(p=>p.providerId==='other-ewallet'));
  for(const id of ['truemoney','shopeepay','paotang'])assert.ok(providerOptions('ewallet').some(p=>p.providerId===id&&p.logoPath));
});
test('Unknown and mismatched providers use deterministic neutral styling',()=>{
  for(const id of ['unknown','__proto__','<script>'])assert.equal(providerTheme(resolveProvider(id,'bank')),'provider-neutral');
  assert.equal(resolveProvider('kbank','ewallet').providerId,'other-ewallet');
  assert.equal(providerTheme(resolveProvider('anything','cash')),'provider-cash');
});
test('Asset view models retain unique IDs, integer minor values, categories and coherent totals',()=>{
  assert.equal(new Set(accounts.map(a=>a.id)).size,accounts.length);
  assert.ok(accounts.filter(a=>a.providerId==='kbank').length>=2);
  assert.deepEqual(new Set(assetAccounts().map(a=>a.accountType)),new Set(['bank','ewallet','cash']));
  assert.equal(accounts.reduce((sum,a)=>sum+a.balanceMinor,0),preview.balance*100);
  for(const a of accounts) assert.equal(a.balanceMinor,a.amount*100);
  assert.equal(assetAccounts([...accounts,{id:'liability',accountType:'credit'},{id:'archived',accountType:'bank',archived:true}]).length,accounts.length);
});
test('Account selection is bounded and missing selections resolve safely',()=>{
  assert.equal(stepAccount(accounts,accounts.at(-1).id,1),accounts.at(-1).id);
  assert.equal(stepAccount(accounts,'daily',-1),'daily');
  assert.equal(stepAccount([],null,1),null);
  assert.equal(selectedAccount(accounts,'missing').id,'daily');
  assert.equal(selectedAccount([],null),null);
});
test('Drag follows a continuous range and only commits beyond its threshold',()=>{
  assert.deepEqual(dragDecision(0,6,-20,140),{target:1,progress:1/7,commit:false});
  assert.equal(dragDecision(0,6,-60,140).commit,true);
  assert.equal(dragDecision(0,6,100,140).commit,false);
  assert.equal(dragDecision(5,6,-100,140).target,5);
  assert.equal(dragDecision(2,6,80,140).target,1);
});
test('Hidden balances never leak through rendered board, Wallet rows or detail',()=>{
  const hidden={...state,balanceVisible:false};
  const html=accountBoard(hidden,t)+accounts.map(a=>walletAccountRow(a,hidden,t)+accountPreview(a,hidden,t)).join('');
  for(const a of accounts) assert.ok(!html.includes(new Intl.NumberFormat('en-US',{style:'currency',currency:a.currency}).format(a.balanceMinor/100)));
  assert.ok(html.includes('Balance hidden'));
  assert.ok(!html.includes('title='));
});
test('Missing monetary data is unavailable, USD formats independently, user names are escaped',()=>{
  assert.equal(accountDisplay({...accounts[0],balanceMinor:undefined},state,t).balance,t('notRecorded'));
  assert.match(accountDisplay({...accounts[0],currency:'USD',balanceMinor:12345},state,t).balance,/123\.45/);
  const html=accountPreview({...accounts[0],nickname:'<img src=x onerror=alert(1)>'},state,t);
  assert.ok(!html.includes('<img src=x'));
  assert.ok(html.includes('&lt;img'));
});
test('Both modes retain complete folders, stable detail links and safe states',()=>{
  const grid=accountBoard({...state,accountView:'horizontal'},t);
  assert.equal((grid.match(/class="account-folder /g)||[]).length,accounts.length);
  assert.ok(grid.includes('#wallet/account/daily'));
  assert.ok(!grid.includes('data-swipe-region'));
  for(const status of ['empty','loading','error','unavailable']) {
    const html=accountBoard({...state,accountState:status},t);
    assert.ok(!html.includes('folder-balance'));
    assert.ok(html.includes('board-reset'));
  }
  assert.ok(accountBoard(state,t,[]).includes(t('boardEmptyTitle')));
  assert.equal(parseAccountHash('#wallet/account/daily'),'daily');
  assert.equal(parseAccountHash('#wallet/account/%E0%A4'),null);
  assert.equal(parseAccountHash('#home'),null);
});

test('Compact selection retains every account without visible counters or mode controls',()=>{
  const html=accountBoard(state,t);
  assert.equal((html.match(/data-deck-dot=/g)||[]).length,accounts.length);
  assert.ok(!html.includes('data-action="account-view"'));
  assert.ok(!html.includes('board-pagination')&&!html.includes('board-keyboard-help')&&!html.includes('board-demo-controls'));
  assert.ok(!html.includes(t('accountPosition',{n:1,total:accounts.length})));
  assert.ok(html.includes('aria-live="polite"'));
});

test('Each mode reuses complete full folders instead of header strips',()=>{
  for(const mode of ['vertical','horizontal']){
    const html=accountBoard({...state,accountView:mode},t);
    for(const field of ['class="account-folder ','class="folder-provider"','class="folder-balance"','class="folder-details"'])assert.equal(html.split(field).length-1,accounts.length);
    assert.ok(!html.includes('folder-tab'));
    assert.ok(!html.includes('style='),'initial markup must comply with the preview CSP');
    assert.ok(html.includes(`data-mode="${mode}"`));
  }
  assert.equal(deckMode('grid'),'vertical');
});
test('Vertical geometry occludes full equal-width cards in aligned 24px exposures',()=>{
  const l=deckLayout(6,0,'vertical',358,160),visible=l.poses.filter(p=>p.visible);
  assert.equal(visible.length,3);assert.equal(new Set(visible.map(p=>p.x)).size,1);
  assert.equal(visible[0].y-visible[1].y,24);assert.equal(visible[1].y-visible[2].y,24);
  assert.ok(visible[0].z>visible[1].z&&visible[1].z>visible[2].z);
  assert.ok(l.height<250);
});
test('Horizontal geometry keeps neighbor peeks, preserves selected identity and bounds',()=>{
  const l=deckLayout(6,2,'horizontal',358,160);
  assert.equal(l.poses[2].y,l.poses[1].y);assert.ok(l.poses[1].x<0);
  assert.ok(l.poses[3].x<358&&l.poses[3].x+l.cardWidth>358);
  assert.equal(l.poses[2].z,6);assert.equal(deckLayout(1,0,'vertical',320,160).poses.length,1);
});
test('Wheel accumulates trackpad deltas, throttles transitions, releases bounds and Ctrl',()=>{
  let r=wheelDecision({sum:0,last:0},20,0,0,6,100);assert.equal(r.step,0);
  r=wheelDecision(r.state,30,0,0,6,150);assert.equal(r.step,1);
  assert.equal(wheelDecision(r.state,90,0,1,6,200).step,0);
  assert.equal(wheelDecision(r.state,90,0,1,6,600).step,1);
  assert.equal(wheelDecision({},-90,0,0,6,1000).capture,false);
  assert.equal(wheelDecision({},90,0,5,6,1000).capture,false);
  assert.equal(wheelDecision({},90,0,2,6,1000,true).capture,false);
  assert.equal(wheelDecision({},3,1,2,6,1000).step,1);
  assert.equal(wheelDecision({},1,2,2,6,1000).step,1);
  assert.ok(deckTiming.hold>=220&&deckTiming.hold<=300);
  assert.ok(deckTiming.snap>=180&&deckTiming.snap<=300);
});
