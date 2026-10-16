import test from 'node:test';
import assert from 'node:assert/strict';
import {access,readFile} from 'node:fs/promises';
import {providers} from '../src/providers.js';
import {accounts} from '../src/fixtures.js';
import {accountDisplay,walletAccountRow,accountPreview} from '../src/account-display.js';
import {accountBoard} from '../src/account-board.js';
import {applyProfile,normalizeProfile,profileDraft,accountProfileForm} from '../src/account-profile.js';
import {translator} from '../src/i18n.js';
const t=translator('en'),state={locale:'en',balanceVisible:true};

test('Every supplied logo resolves to a valid project PNG',async()=>{
  const withLogos=Object.values(providers).filter(p=>p.logoPath);
  assert.equal(withLogos.length,13);
  for(const p of withLogos){
    const path=new URL('..'+p.logoPath,import.meta.url);await access(path);
    const bytes=await readFile(path);assert.equal(bytes.subarray(1,4).toString(),'PNG');
  }
});
test('A new profile has no fabricated balance and shares identity across Home Wallet detail',()=>{
  const result=applyProfile(accounts,{accountType:'ewallet',providerId:'paotang',nickname:'My sample wallet',folderTone:'cobalt',accentTone:'neutral'},null,'sample-one');
  assert.equal(accounts.length,6);assert.equal(result.length,7);
  const a=result.at(-1);assert.equal(a.balanceMinor,undefined);assert.equal(a.currency,'THB');
  assert.equal(accountDisplay(a,state,t).balance,t('notRecorded'));
  for(const html of [accountBoard({...state,accountProfiles:result,accountSelected:a.id},t),walletAccountRow(a,state,t),accountPreview(a,state,t)]){
    assert.ok(html.includes('My sample wallet')&&html.includes('Paotang')&&html.includes('tone-cobalt'));
  }
});
test('Editing a profile preserves ID, currency and integer balance without mutating fixtures',()=>{
  const result=applyProfile(accounts,{...profileDraft(accounts[0],state,t),nickname:'Updated sample',providerId:'scb'},'daily');
  assert.equal(result[0].id,'daily');assert.equal(result[0].balanceMinor,accounts[0].balanceMinor);assert.equal(result[0].currency,'THB');
  assert.equal(accounts[0].nickname,undefined);assert.equal(result[0].providerId,'scb');
  assert.throws(()=>applyProfile(accounts,{nickname:'  '},null,'x'),/profileNameRequired/);
  assert.throws(()=>applyProfile(accounts,{nickname:'Example'},'missing'),/boardUnavailableTitle/);
});
test('Provider/type and appearance inputs remain allowlisted and profile text is escaped',()=>{
  assert.ok(accountProfileForm(profileDraft(null,state,t),state,t).includes('account-profile-form'));
  const d=normalizeProfile({accountType:'cash',providerId:'kbank',folderTone:'evil" style="color:red',accentTone:'url(x)',nickname:'<img src=x onerror=alert(1)>'});
  assert.equal(d.providerId,'cash');assert.equal(d.folderTone,'navy');assert.equal(d.accentTone,'provider');
  const html=accountProfileForm(d,state,t);
  assert.ok(html.includes('&lt;img')&&!html.includes('<img src=x'));
  assert.ok(!html.includes('name="providerId"'));
  const wallet=accountProfileForm({...d,accountType:'ewallet',providerId:'paotang'},state,t);
  assert.ok(wallet.includes('value="paotang" selected')&&!wallet.includes('value="kbank"'));
});
