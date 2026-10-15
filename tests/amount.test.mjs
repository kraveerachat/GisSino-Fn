import test from 'node:test';
import assert from 'node:assert/strict';
import { amountKey, validAmountText, toMinorUnits } from '../src/amount.js';

test('keypad preserves currency precision and integer bounds', () => {
  let text = '0';
  for (const key of ['1','5','0','0','.','2','5','9','.']) text = amountKey(text,key);
  assert.equal(text,'1500.25');
  assert.equal(amountKey('123456789','0'),'123456789');
  assert.equal(amountKey('0','0'),'0');
  assert.equal(amountKey('0','backspace'),'0');
  assert.equal(amountKey('1.2','backspace'),'1.');
  assert.equal(amountKey('12','unexpected'),'12');
});

test('review rejects invalid amounts and converts cents without float rounding', () => {
  for (const value of ['','0','0.00','-1','1e3','1,000','1.234','1234567890','<script>']) {
    assert.equal(validAmountText(value),false,value);
    assert.equal(toMinorUnits(value),null,value);
  }
  assert.equal(toMinorUnits('1500.29'),150029);
  assert.equal(toMinorUnits('0.01'),1);
  assert.equal(toMinorUnits('999999999.99'),99999999999);
  assert.equal(toMinorUnits('1.'),100);
});
