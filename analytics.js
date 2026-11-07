/**
 * analytics.js — optional analytics stub
 *
 * To activate: replace the stub below with your real snippet
 * (Meta Pixel, Google Analytics, Clarity, etc.) and add your pixel/tracking ID.
 *
 * The page fires these logical events:
 *   preview_cta_click   — hero CTA clicked ("See What's Inside")
 *   preview_to_offer_click — carousel CTA clicked ("See the Full Kit")
 *   offer_view          — #offer section enters the viewport
 *   checkout_click      — checkout button clicked (only fires when URL is configured)
 *   close_cta_click     — emotional close CTA clicked
 *
 * A click from the sales page is NOT a confirmed checkout session or purchase.
 */

(function () {
  // Replace with your real analytics initialisation if needed.
  window.CCK_TRACK = function (eventName, data) {
    // console.log('[CCK Analytics]', eventName, data || '');
    // Example: fbq('track', 'ViewContent');
  };
})();

