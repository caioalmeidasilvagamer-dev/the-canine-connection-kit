/**
 * config.js — The Canine Connection Kit sales page configuration
 *
 * HOW TO USE:
 *   1. Set CHECKOUT_URL to your payment link (Hotmart, Gumroad, Stripe, etc.).
 *   2. Set SUPPORT_EMAIL, TERMS_URL, PRIVACY_URL, REFUND_POLICY_URL when available.
 *   3. Set SHOW_DELIVERY_BLOCK = true and fill DELIVERY_METHOD once you have
 *      confirmed how buyers receive the PDF.
 *
 * While CHECKOUT_URL is empty (""), the purchase button is visually disabled
 * and shows a configuration notice. The page is fully usable for preview.
 */

window.CCK_CONFIG = {

  // ── Promo banner countdown timer ─────────────────────────────────────────
  // Set to an ISO date string to fix the end date (e.g. "2026-12-01T23:59:00").
  // Or configure PROMO_DURATION_MINUTES (defaults to 15 minutes rolling countdown per visitor).
  PROMO_END_DATE: "",
  PROMO_DURATION_MINUTES: 15,

  // ── Payment ──────────────────────────────────────────────────────────────
  CHECKOUT_URL: "https://pay.cakto.com.br/3fp3pzg_1293813",

  // ── Contact and policy links ──────────────────────────────────────────────
  SUPPORT_EMAIL: "",          // e.g. "hello@yourdomain.com"
  TERMS_URL:     "",          // e.g. "https://yourdomain.com/terms"
  PRIVACY_URL:   "",          // e.g. "https://yourdomain.com/privacy"
  REFUND_POLICY_URL: "",      // e.g. "https://yourdomain.com/refunds"

  // ── Delivery ──────────────────────────────────────────────────────────────
  // Set SHOW_DELIVERY_BLOCK to true only after you have confirmed the
  // delivery method end-to-end. Never invent or guess delivery details.
  SHOW_DELIVERY_BLOCK: false,
  DELIVERY_METHOD: "",
  // Human-readable description shown in the "After you purchase" section
  // and in the FAQ. Example:
  //   "After completing checkout, you will receive an email with a download link.
  //    Open it in any PDF reader — on your phone, tablet, or computer."

};

