import test from 'node:test';
import assert from 'node:assert/strict';
import { navigationContext } from '../src/navigation.js';
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
