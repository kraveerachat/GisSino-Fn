import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { flags } from '../src/config/feature-flags.js';

const root = path.resolve(import.meta.dirname, '..');
async function sources(dir = path.join(root, 'src')) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await sources(full));
    else if (entry.name.endsWith('.js')) out.push({ file: path.relative(root, full).replaceAll('\\', '/'), text: await readFile(full, 'utf8') });
  }
  return out;
}

test('Nothing reads the deprecated preview.safe or bills.device.installment fields', async () => {
  for (const { file, text: raw } of await sources()) {
    const text = raw.split('\n').filter(line => !line.trim().startsWith('//')).join('\n');
    assert.doesNotMatch(text, /preview\.safe\b|\bpreview\[['"]safe['"]\]|\{[^}]*\bsafe\b[^}]*\}\s*=\s*preview\b/, file);
    assert.doesNotMatch(text, /\.installment\b(?!s)/, file);
  }
  const fixtures = await readFile(path.join(root, 'src/fixtures.js'), 'utf8');
  assert.equal((fixtures.match(/@deprecated/g) || []).length, 2);
});

test('Money and dates are formatted only in core/money.js and core/dates.js', async () => {
  for (const { file, text } of await sources()) {
    if (!['src/core/money.js'].includes(file)) assert.doesNotMatch(text, /style\s*:\s*['"]currency['"]/, `${file} formats currency outside core/money.js`);
    if (!['src/core/dates.js', 'src/core/clock.js'].includes(file)) assert.doesNotMatch(text, /Intl\.DateTimeFormat/, `${file} formats dates outside core/dates.js`);
    // PWA install/offline bookkeeping measures real elapsed time; it never decides the app's "today".
    if (!file.startsWith('src/core/') && !['src/pwa.js', 'src/pwa-install.js'].includes(file)) assert.doesNotMatch(text, /new Date\(\)|Date\.now\(\)|getFullYear\(\)/, `${file} reads the host clock`);
  }
});

test('Core modules stay pure: no DOM and no imports from UI files', async () => {
  for (const { file, text } of (await sources()).filter(s => s.file.startsWith('src/core/'))) {
    assert.doesNotMatch(text, /\bdocument\.|\bwindow\.|localStorage/, file);
    for (const [, spec] of text.matchAll(/from ['"]([^'"]+)['"]/g)) assert.ok(/^\.\/|^\.\.\/(config|amount\.js)/.test(spec), `${file} imports ${spec}`);
  }
});

test('Every decision flag defaults to the canonical behaviour', () => {
  assert.ok(Object.isFrozen(flags));
  assert.deepEqual(flags, {
    heroLiabilityLine: false, safeToSpendChip: false, dailyClose: false, rankingKey: 'weekly_xp', globalBoard: 'shown',
    savingsAsTransfer: false, installmentNesting: false, dateEra: 'CE', appLock: false, offlineWrites: false, templates: false,
    monthCompare: false, fundingCheck: false, needsDetailsXp: 'on_entry', activityChart: 'd33_donut', copyRevision2026_10: false,
    habitSource: 'home', homeScenarioExtras: false,
    homeDueTodayFirst: false, showPreviewControls: true, creditCardInBillDetail: false
  });
});
