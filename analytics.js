/**
 * Consent-gated Google Analytics (gtag). Set cookieConsent in localStorage via Accept,
 * or call synczonesAcceptAnalyticsCookies() from a banner button.
 */
(function () {
  var MEASUREMENT_ID = 'G-GE0E74V2HF';

  function loadGA() {
    if (window.__sz_ga_loaded) return;
    window.__sz_ga_loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
    s.onload = function () {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', MEASUREMENT_ID);
    };
    document.head.appendChild(s);
  }

  window.synczonesLoadAnalytics = loadGA;
  window.synczonesAcceptAnalyticsCookies = function () {
    try {
      localStorage.setItem('cookieConsent', 'true');
    } catch (e) {}
    loadGA();
  };

  if (typeof localStorage !== 'undefined' && localStorage.getItem('cookieConsent') === 'true') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadGA);
    } else {
      loadGA();
    }
  }
})();
