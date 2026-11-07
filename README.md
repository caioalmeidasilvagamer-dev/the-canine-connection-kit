# The Canine Connection Kit — Sales Page

A complete, mobile-first direct-response sales page built with HTML, CSS, and minimal vanilla JavaScript. No build step, no framework, no bundler.

---

## Quick Start

```bash
# Any static server will work. Examples:

# Option 1 — Python (usually pre-installed)
cd "Pagina de vendas de ebook pet"
python -m http.server 8080
# Open http://localhost:8080

# Option 2 — Node (npx)
npx serve .

# Option 3 — VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

> **Do not** open `index.html` directly as a `file://` URL in Chrome — some
> browsers restrict local fetch for scripts loaded that way. Use a local server.

---

## Configuration (`config.js`)

All environment-specific values are centralized in [`config.js`](config.js).
Edit that file before going live.

| Key | Required | Notes |
|-----|----------|-------|
| `CHECKOUT_URL` | **Yes** | Payment link (Hotmart, Gumroad, Stripe, etc.). Until set, the purchase button is visually disabled and shows a configuration notice. |
| `SUPPORT_EMAIL` | Recommended | Shown in the footer as a `mailto:` link. |
| `TERMS_URL` | Recommended | Footer link. |
| `PRIVACY_URL` | Recommended | Footer link. |
| `REFUND_POLICY_URL` | Optional | When set, a refund policy link appears below the checkout button. Never show a guarantee or refund claim without real terms. |
| `SHOW_DELIVERY_BLOCK` | **Must confirm** | Set to `true` only after you have tested the delivery end-to-end. Currently `false` — the "After you purchase" section and the delivery FAQ item are hidden. |
| `DELIVERY_METHOD` | Required if `SHOW_DELIVERY_BLOCK` is `true` | Plain-text description of exactly how buyers receive the PDF. |

---

## What Still Needs a Live Test

- [ ] **Checkout URL** — set `CHECKOUT_URL` in `config.js` and confirm the button routes to a real payment page.
- [ ] **Delivery block** — confirm the actual delivery mechanism (email link, platform download, etc.), set `DELIVERY_METHOD`, and set `SHOW_DELIVERY_BLOCK = true`.
- [ ] **Refund policy** — if a refund or guarantee is offered, provide the URL in `REFUND_POLICY_URL`.
- [ ] **Analytics** — replace the stub in [`analytics.js`](analytics.js) with your real pixel or tracking snippet.
- [ ] **Domain / hosting** — the page is not deployed. Upload the entire folder to Netlify, Vercel, or Hostinger (or any static host). No build step required — drag-and-drop works.
- [ ] **End-to-end purchase test** — after the checkout URL is live, complete a real test purchase to verify receipt of the PDF.

---

## PDF Asset Policy

The PDF (`The-Canine-Connection-Kit.pdf`) is the **paid deliverable**.
It must **not** be placed in this folder or any public web directory.
Keep it on your delivery platform only (Hotmart, Gumroad, Google Drive, etc.).

---

## Image Assets

All WebP images in `assets/product-previews/` are exported pages from the actual PDF.

| File | PDF page | Used in |
|------|----------|---------|
| `01-cover.webp` | Cover | Hero mockup (front), Offer mockup (front) |
| `07-body-language.webp` | Page 7 — Small Signs, Big Context | Hero mockup (back), Carousel slide 1, Contents grid, Offer mockup (back) |
| `14-touch-my-hand.webp` | Page 14 — Touch My Hand | Hero mockup (back slot on mobile), Carousel slide 2, Contents grid |
| `23-which-hand.webp` | Page 23 — Which Hand? | Carousel slide 3, Contents grid, Show It In Use |
| `37-activity-log.webp` | Page 37 — My Dog's Activity Log | Carousel slide 4, Contents grid |

---

## Analytics Events

The page fires these logical events via `window.CCK_TRACK()` (defined in `analytics.js`):

| Event | Trigger |
|-------|---------|
| `preview_cta_click` | Hero "See What's Inside" CTA clicked |
| `preview_to_offer_click` | Carousel "See the Full Kit" CTA clicked |
| `offer_view` | `#offer` section enters the viewport (≥ 20%) |
| `checkout_click` | Checkout button clicked (only fires when URL is configured) |
| `close_cta_click` | Emotional close CTA clicked |

> A click event is **not** a confirmed checkout session or purchase.

---

## Breakpoints Tested

| Width | Device target |
|-------|--------------|
| 320 px | Smallest common mobile |
| 390 px | iPhone 14 / common Instagram in-app browser |
| 768 px | Tablet portrait |
| 1200 px + | Desktop |

---

## Running Automated Checks

No automated test suite is included. Manual checklist before launch:

- [ ] No horizontal overflow at 320, 390, 768, 1440 px
- [ ] All in-page anchors work (`#preview`, `#offer`, `#faq`, etc.)
- [ ] Carousel swipe, arrow buttons, and dot indicators work on mobile
- [ ] Tap-to-enlarge (lightbox) opens, is closeable via ✕, overlay click, and Escape
- [ ] Keyboard navigation: Tab through all interactive elements, Enter/Space activates buttons
- [ ] FAQ accordions open and close; `+` icon rotates correctly
- [ ] Checkout button is visually disabled when `CHECKOUT_URL` is empty
- [ ] Checkout button navigates to `CHECKOUT_URL` when set
- [ ] Delivery block and delivery FAQ are hidden when `SHOW_DELIVERY_BLOCK = false`
- [ ] Footer links are hidden when their URL is not set
- [ ] Refund link is hidden when `REFUND_POLICY_URL` is not set
- [ ] Images load lazily below the fold; cover loads eagerly

---

## File Structure

```
Pagina de vendas de ebook pet/
├── index.html          — Page markup (all 12 sections)
├── style.css           — All styles, mobile-first
├── main.js             — Carousel, lightbox, checkout wiring, analytics
├── config.js           — Centralised configuration (edit before launch)
├── analytics.js        — Analytics stub
├── README.md           — This file
└── assets/
    └── product-previews/
        ├── 01-cover.webp
        ├── 07-body-language.webp
        ├── 14-touch-my-hand.webp
        ├── 23-which-hand.webp
        └── 37-activity-log.webp
```

