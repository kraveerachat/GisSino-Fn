import test from 'node:test';
import assert from 'node:assert/strict';
import { providers, resolveProvider, providerOptions, providerTheme } from '../src/providers.js';
import { accounts,preview } from '../src/fixtures.js';
import { assetAccounts,accountDisplay,accountPreview,walletAccountRow } from '../src/account-display.js';
import { accountBoard,exposedAccounts,stepAccount,selectedAccount,swipeDirection,parseAccountHash } from '../src/account-board.js';
import { translator } from '../src/i18n.js';
const t=translator('en');
const state={locale:'en',balanceVisible:true,accountView:'stack',accountSelected:'daily',accountState:'sample'};

test('Provider identity is separate from accounts and contains no financial records',()=>{
  assert.equal(Object.keys(providers).length,18);
  for(const p of Object.values(providers)) {
    assert.match(p.primaryColor,/^#[a-f0-9]{6}$/i);
    assert.equal(p.logoPath,null);
    assert.equal(p.logoStatus,'VERIFY');
    assert.ok(p.verificationSource.startsWith('https://'));
    assert.equal(p.colorStatus,'PROPOSED_UI_ACCENT');
    assert.ok(!('amount' in p)&&!('balance' in p)&&!('balanceMinor' in p));
  }
  assert.ok(providerOptions('bank').some(p=>p.providerId==='other-bank'));
  assert.ok(providerOptions('ewallet').some(p=>p.providerId==='other-ewallet'));
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
test('Stack cycles the complete account set with at most three exposed tabs',()=>{
  assert.equal(exposedAccounts(accounts,'daily').length,2);
  assert.ok(!exposedAccounts(accounts,'daily').some(a=>a.id==='daily'));
  assert.equal(stepAccount(accounts,accounts.at(-1).id,1),'daily');
  assert.equal(stepAccount(accounts,'daily',-1),accounts.at(-1).id);
  assert.equal(stepAccount([],null,1),null);
  assert.equal(selectedAccount(accounts,'missing').id,'daily');
  assert.equal(selectedAccount([],null),null);
});
test('Swipe threshold preserves vertical scrolling and rejects accidental movement',()=>{
  const origin={x:100,y:100};
  assert.equal(swipeDirection(origin,{x:40,y:102}),1);
  assert.equal(swipeDirection(origin,{x:160,y:95}),-1);
  assert.equal(swipeDirection(origin,{x:120,y:200}),0);
  assert.equal(swipeDirection(origin,{x:60,y:101}),0);
  assert.equal(swipeDirection(origin,{x:160,y:160}),0);
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
  assert.ok(!html.includes('<img'));
  assert.ok(html.includes('&lt;img'));
});
test('Grid, all simulated states, stable detail links and malformed routes are covered',()=>{
  const grid=accountBoard({...state,accountView:'grid'},t);
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
