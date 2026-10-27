import { icon } from './icons.js';
export const dismissalKey = 'gissino-install-dismissed-at';
export const dismissalDays = 14 * 86400000;
export function installEnvironment({ userAgent = '', platform = '', maxTouchPoints = 0, standalone = false } = {}) {
  const ipad = /iPad/.test(userAgent) || platform === 'MacIntel' && maxTouchPoints > 1;
  const ios = ipad || /iPhone|iPod/.test(userAgent);
  const safari = ios && /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent);
  return { standalone: !!standalone, ios, safari, platform: ipad ? 'ipad' : ios ? 'ios' : /Android/.test(userAgent) ? 'android' : 'desktop' };
}
export function wasDismissed(storage, now = Date.now()) {
  try { const stamp = Number(storage?.getItem(dismissalKey)); return stamp > 0 && now >= stamp && now - stamp < dismissalDays; } catch { return false; }
}
export function dismissInstall(storage, now = Date.now()) {
  try { storage?.setItem(dismissalKey, String(now)); } catch { /* Private mode may refuse storage. */ }
}
export function shouldOfferInstall({ standalone, confirmed, dismissed, promptReady, ios }) {
  return !standalone && confirmed && !dismissed && (promptReady || ios);
}
export function createInstaller({ environment, storage, now = Date.now, changed = () => {} }) {
  let event = null, confirmed = false, installed = environment.standalone, dismissed = wasDismissed(storage, now()), busy = false;
  const snapshot = () => ({ ...environment, standalone: installed, confirmed, dismissed, promptReady: !!event, busy,
    offer: shouldOfferInstall({ standalone: installed, confirmed, dismissed, promptReady: !!event, ios: environment.ios }) });
  const emit = () => changed(snapshot());
  return {
    snapshot,
    capture(e) { e.preventDefault(); event = e; emit(); },
    confirm() { confirmed = true; emit(); },
    dismiss() { dismissed = true; dismissInstall(storage, now()); emit(); },
    installed() { installed = true; event = null; emit(); },
    setStandalone(value) { installed = !!value; emit(); },
    async prompt() {
      if (!event || busy || installed) return 'unavailable';
      const captured = event; event = null; busy = true; emit();
      try {
        await captured.prompt();
        const choice = await captured.userChoice;
        if (choice.outcome === 'dismissed') { dismissed = true; dismissInstall(storage, now()); }
        // Acceptance is not proof of installation; appinstalled/display-mode owns that state.
        return choice.outcome;
      } catch { return 'error'; } finally { busy = false; emit(); }
    }
  };
}
// One guide shared by the existing setup route and Settings. These are UI diagrams,
// not browser screenshots; the numbered instructions carry the complete meaning.
export function installGuide(t, { platform = 'desktop', standalone = false, ios = false, safari = true, promptReady = false } = {}) {
  if (standalone) return `<p class="info-callout">${icon('check')}${t('pwaInstalled')}</p>`;
  const selected = ['ios','ipad','android','desktop'].includes(platform) ? platform : 'desktop';
  const apple = selected === 'ios' || selected === 'ipad';
  return `<div data-install-guide data-platform="${selected}"><div class="install-platforms" role="group" aria-label="${t('platformLabel')}">${['ios','ipad','android','desktop'].map(name => `<button type="button" data-pwa-platform="${name}" aria-pressed="${selected === name}">${t(name === 'ipad' ? 'pwaIpad' : name === 'ios' ? 'pwaIphone' : 'platform' + name)}</button>`).join('')}</div>
  ${ios && !safari ? `<p class="info-callout">${icon('info')}${t('pwaUseSafari')}</p>` : ''}
  ${apple ? `<div class="install-browser-diagram ${selected}" aria-hidden="true"><span class="diagram-toolbar">${icon('upload')}<span>GisSino</span></span><span class="diagram-page">${icon('download')}</span></div>` : ''}
  <ol class="install-instructions">${[1,2,3].map(n => `<li>${t(apple ? 'pwa' + selected + n : 'install' + selected + n)}</li>`).join('')}</ol>
  ${promptReady && !apple ? `<button type="button" class="button primary full-width" data-pwa-action="install">${icon('download')}${t('pwaInstall')}</button>` : apple ? '' : `<p class="context-note">${t('pwaBrowserInstall')}</p>`}
  <p class="sheet-disclaimer">${t('pwaShellOnly')}</p></div>`;
}
export function badgeCount(overdue, needsDetails) {
  return [overdue, needsDetails].every(n => Number.isSafeInteger(n) && n >= 0) && Number.isSafeInteger(overdue + needsDetails) ? overdue + needsDetails : 0;
}
export async function updateBadge(navigator, count) {
  try {
    if (count > 0 && typeof navigator.setAppBadge === 'function') await navigator.setAppBadge(count);
    else if (count === 0 && typeof navigator.clearAppBadge === 'function') await navigator.clearAppBadge();
  } catch { /* Unsupported context or denied permission must not interrupt the UI. */ }
}
