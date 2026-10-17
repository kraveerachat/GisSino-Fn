import { logo } from './icons.js';

export const publicRoutes = Object.freeze(['welcome','login','signup']);
export const isPublicRoute = route => publicRoutes.includes(route);
export const welcomeArt = Object.freeze([
  {name:'desktop',media:'(min-width: 1280px)',width:2560,height:1440},
  {name:'tablet-landscape',media:'(min-width: 600px) and (min-height: 600px) and (orientation: landscape)',width:2048,height:1536},
  {name:'tablet-portrait',media:'(min-width: 600px) and (min-height: 600px) and (orientation: portrait)',width:1536,height:2048}
]);

export function welcomeScreen(state,t) {
  const welcome=state.route==='welcome';
  return `<div class="welcome-screen ${welcome?'':'welcome-placeholder'}">
    <picture class="welcome-art" aria-hidden="true">${welcomeArt.map(art=>`<source media="${art.media}" type="image/webp" srcset="/assets/welcome/${art.name}.webp" width="${art.width}" height="${art.height}">`).join('')}<img src="/assets/welcome/mobile.webp" width="1080" height="1920" alt="" fetchpriority="high" decoding="async"></picture>
    <header class="welcome-toolbar"><label class="welcome-language" for="locale-select">${t('language')}<select id="locale-select" data-control="locale"><option value="th" ${state.locale==='th'?'selected':''}>${t('thai')}</option><option value="en" ${state.locale==='en'?'selected':''}>${t('english')}</option></select></label></header>
    <main id="main" class="welcome-content" tabindex="-1"><div class="welcome-identity">${logo}
      <h1 class="welcome-wordmark">${welcome?t('appName'):t(state.route==='login'?'welcomeLogin':'welcomeSignup')}</h1>
      ${welcome?`<p class="welcome-tagline">${t('welcomeTagline')}</p><p class="welcome-description">${t('welcomeDescription')}</p>`:`<p class="welcome-description">${t('authNotImplemented')}</p>`}
    </div><div class="welcome-actions">${welcome?`<a class="welcome-cta welcome-primary" href="#login">${t('welcomeLogin')}</a><a class="welcome-cta welcome-secondary" href="#signup">${t('welcomeSignup')}</a>`:`<a class="welcome-cta welcome-primary" href="#welcome">${t('backToWelcome')}</a>`}<footer class="welcome-disclosure"><p>${t('welcomePrototype')}</p></footer></div></main>
  </div>`;
}
