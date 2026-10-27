import { createInstaller, installEnvironment, installGuide, updateBadge } from './pwa-install.js';
import { icon } from './icons.js';
import { formatTime } from './core/dates.js';
export function mountPwa({ t, showSheet, toast, getBadgeCount, isPublic, hasPendingDraft = () => false }) {
  const mode = matchMedia('(display-mode: standalone)');
  const environment = installEnvironment({ userAgent: navigator.userAgent, platform: navigator.platform, maxTouchPoints: navigator.maxTouchPoints, standalone: mode.matches || navigator.standalone === true });
  let storage; try { storage = window.localStorage; } catch { /* Storage disabled. */ }
  let worker = null, registration = null, reloadRequested = false, lastOnline = null;
  const dirtyForms = new WeakSet();
  const dirtyRoutes = new Set();
  let transferDirty = false;
  const root = document.createElement('div'); root.id = 'pwa-notices'; document.body.append(root);
  const offline = document.createElement('div'); offline.className = 'pwa-offline'; offline.setAttribute('role', 'status'); document.body.prepend(offline);
  const confirm = document.createElement('dialog'); confirm.className = 'pwa-confirm'; confirm.setAttribute('aria-labelledby', 'pwa-refresh-title'); document.body.append(confirm);
  const installer = createInstaller({ environment, storage, changed: () => refresh() });
  const dirty = () => transferDirty || hasPendingDraft() || [...document.querySelectorAll('form')].some(form => form.getClientRects().length > 0 && (dirtyForms.has(form) || dirtyRoutes.has(location.hash)));
  function refresh() {
    const model = installer.snapshot();
    document.documentElement.classList.toggle('pwa-standalone', model.standalone);
    const time = lastOnline ? formatTime(new Date(lastOnline), { locale: document.documentElement.lang }) : null;
    offline.hidden = navigator.onLine !== false;
    offline.textContent = time ? t('pwaOffline', { time }) : t('pwaOfflineUnknown');
    root.innerHTML = `${worker ? `<div class="pwa-notice" role="status"><span>${t('pwaUpdate')}</span><button type="button" data-pwa-action="refresh">${t('pwaRefresh')}</button></div>` : ''}${model.offer && !isPublic() ? `<div class="pwa-notice" role="status"><span>${t('pwaInstallHint')}</span><button type="button" data-pwa-action="offer">${t('pwaInstall')}</button><button type="button" class="icon-button" data-pwa-action="dismiss" aria-label="${t('close')}">${icon('close')}</button></div>` : ''}`;
    document.querySelectorAll('[data-install-guide]').forEach(guide => {
      const platform = guide.dataset.platform || model.platform;
      guide.outerHTML = installGuide(t, { ...model, platform });
    });
    document.querySelectorAll('[data-pwa-settings-install]').forEach(row => row.hidden = model.standalone);
    // Only entry mutations are blocked: filters, sample habit/relationship actions and
    // settings remain usable. No transaction queue or persistence is introduced.
    document.querySelectorAll('#entry-form button[type="submit"], [data-preview-form="accounts"] button[type="submit"], #bill-entry-form button[type="submit"], [data-action="review-transfer"], [data-action="bill-pay-confirm"], [data-action="bill-pay-review"]').forEach(button => {
      if (navigator.onLine === false) { button.dataset.pwaOfflineDisabled = 'true'; button.disabled = true; }
      else if (button.dataset.pwaOfflineDisabled) { button.disabled = false; delete button.dataset.pwaOfflineDisabled; }
    });
  }
  function openGuide() { showSheet('install', installGuide(t, installer.snapshot())); }
  function performRefresh() {
    reloadRequested = true;
    if (worker) { worker.postMessage({ type: 'ACTIVATE_UPDATE' }); }
    else window.location.reload();
  }
  function requestRefresh() {
    if (!dirty()) { performRefresh(); return; }
    confirm.innerHTML = `<h2 id="pwa-refresh-title">${t('pwaDirtyTitle')}</h2><p>${t('pwaDirtyBody')}</p><div class="pwa-confirm-actions"><button type="button" class="button secondary" data-pwa-action="cancel-refresh">${t('pwaKeepEditing')}</button><button type="button" class="button primary" data-pwa-action="confirm-refresh">${t('pwaDiscardRefresh')}</button></div>`;
    if (!confirm.open) confirm.showModal();
    confirm.querySelector('button').focus();
  }
  document.addEventListener('input', event => {
    const form = event.target.closest('form'); if (form) { dirtyForms.add(form); dirtyRoutes.add(location.hash); }
  }, true);
  document.addEventListener('change', event => {
    const form = event.target.closest('form'); if (form) { dirtyForms.add(form); dirtyRoutes.add(location.hash); }
  }, true);
  document.addEventListener('click', async event => {
    const platformButton = event.target.closest('[data-pwa-platform]');
    if (platformButton) {
      const guide = platformButton.closest('[data-install-guide]');
      guide.outerHTML = installGuide(t, { ...installer.snapshot(), platform: platformButton.dataset.pwaPlatform });
      document.querySelector(`[data-install-guide] [data-pwa-platform="${platformButton.dataset.pwaPlatform}"]`)?.focus();
      return;
    }
    const action = event.target.closest('[data-pwa-action]')?.dataset.pwaAction;
    if (!action) return;
    if (action === 'offer') { if (installer.snapshot().promptReady) { const result = await installer.prompt(); if (result === 'error') toast(t('pwaInstallFailed')); } else openGuide(); }
    if (action === 'install') { const result = await installer.prompt(); if (result === 'error') toast(t('pwaInstallFailed')); }
    if (action === 'dismiss') { installer.dismiss(); document.querySelector('#main')?.focus({ preventScroll: true }); }
    if (action === 'refresh') requestRefresh();
    if (action === 'cancel-refresh') confirm.close();
    if (action === 'confirm-refresh') { confirm.close(); performRefresh(); }
  });
  window.addEventListener('beforeinstallprompt', event => installer.capture(event));
  window.addEventListener('appinstalled', () => installer.installed());
  mode.addEventListener?.('change', () => installer.setStandalone(mode.matches || navigator.standalone === true));
  window.addEventListener('online', refresh); window.addEventListener('offline', refresh);
  window.addEventListener('hashchange', () => { transferDirty = false; dirtyRoutes.clear(); refresh(); });
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data?.type === 'SHELL_STATUS' && typeof event.data.cachedAt === 'string') { lastOnline = event.data.cachedAt; refresh(); }
    });
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // A different tab may activate a worker. Never reload without this tab's consent.
      if (reloadRequested) window.location.reload();
      worker = registration?.waiting || null; refresh();
      navigator.serviceWorker.controller?.postMessage({ type: 'GET_SHELL_STATUS' });
    });
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).then(reg => {
      registration = reg;
      const waiting = () => { worker = reg.waiting; refresh(); };
      waiting();
      const observeInstalling = () => {
        const pending = reg.installing;
        if (!pending) return;
        pending.addEventListener('statechange', () => {
          // reg.waiting may not be assigned yet during the installed event.
          if (pending.state === 'installed' && navigator.serviceWorker.controller) {
            worker = reg.waiting || pending; refresh();
          } else if (pending.state === 'redundant' && !reg.active) toast(t('pwaUnavailable'));
        });
      };
      reg.addEventListener('updatefound', observeInstalling);
      observeInstalling();
      navigator.serviceWorker.ready.then(() => navigator.serviceWorker.controller?.postMessage({ type: 'GET_SHELL_STATUS' }));
    }).catch(() => toast(t('pwaUnavailable')));
  }
  refresh(); updateBadge(navigator, getBadgeCount());
  return {
    refresh, openGuide, requestRefresh,
    confirmedEntry() { installer.confirm(); },
    transferChanged() { transferDirty = true; },
    updateBadge() { updateBadge(navigator, getBadgeCount()); },
    async checkUpdate() { try { await registration?.update(); } catch { toast(t('pwaUnavailable')); } }
  };
}
