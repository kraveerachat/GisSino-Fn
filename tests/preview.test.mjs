import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { messages, translator, escapeHTML, money } from '../src/i18n.js';

test('Thai and English provide the same nonempty message catalog', () => {
  assert.deepEqual(Object.keys(messages.th).sort(), Object.keys(messages.en).sort());
  for (const catalog of Object.values(messages)) for (const value of Object.values(catalog)) assert.equal(typeof value === 'string' && value.length > 0, true);
  assert.equal(translator('th')('days', { n: 7 }), '7 วัน');
  assert.throws(() => translator('th')('missing-message'), /Missing translation/);
});
test('User-entered markup is escaped instead of becoming executable HTML', () => {
  assert.equal(escapeHTML('<img src=x onerror="alert(1)">'), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
  assert.equal(escapeHTML("A&B's"), 'A&amp;B&#39;s');
});
test('Amounts are locale-formatted and preserve the requested precision', () => {
  assert.match(money(116850,'th',true), /116,850\.00/);
  assert.match(money(85,'en'), /85/);
});
test('Production startup refuses the synthetic fixture server', async () => {
  const child = spawn(process.execPath,['server.mjs'], { cwd: new URL('..',import.meta.url), env: { ...process.env, NODE_ENV:'production' }, stdio:['ignore','pipe','pipe'], windowsHide:true });
  let error=''; child.stderr.on('data',chunk=>{error+=chunk;});
  const [code]=await once(child,'exit');
  assert.equal(code,1); assert.match(error,/development-only/);
});
test('The preview serves public files, blocks writes, and rejects encoded path traversal', async () => {
  process.env.PORT='0'; process.env.NODE_ENV='development';
  const {server}=await import('../server.mjs');
  if(!server.listening) await once(server,'listening');
  const base=`http://127.0.0.1:${server.address().port}`;
  try {
    const page=await fetch(base);assert.equal(page.status,200);assert.match(await page.text(),/<html lang="th"/);
    assert.match(page.headers.get('content-security-policy'),/connect-src 'self'/);
    assert.equal((await fetch(base+'/src/fixtures.js')).status,200);
    const logo=await fetch(base+'/assets/brand/gissino-s-shield.png');
    assert.equal(logo.status,200);
    assert.equal(logo.headers.get('content-type'),'image/png');
    assert.deepEqual([...new Uint8Array(await logo.arrayBuffer()).subarray(0,8)],[137,80,78,71,13,10,26,10]);
    assert.equal((await fetch(base,{method:'POST',body:'not a transaction'})).status,405);
    for(const route of ['/PRODUCT.md','/package.json','/src/..%2fPRODUCT.md','/assets/..%5cPRODUCT.md','/src/..%2f.git%2fconfig','/src/%2e%2e%5cpackage.json']) {
      assert.equal((await fetch(base+route)).status,404,`must not expose ${route}`);
    }
  } finally { server.closeAllConnections();await new Promise(resolve=>server.close(resolve)); }
});
