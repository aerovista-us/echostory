<!-- SOT: true | sot_id: square | canon_path: docs/SQUARE.md | updated: 2026-08-29 -->

# EchoStory Square checkout

EchoStory is a static GitHub Pages site. There is no server, so it cannot call Square’s Checkout API with a secret access token. Today we use **fixed-price Payment Links** (one link per package tier). Add-ons stay on the Formspree order and are invoiced after review.

## Current flow (Payment Links)

1. Customer completes the 5-step wizard and submits via Formspree.
2. If `config.js` has a real Link ID for the chosen package, the success panel offers **Pay Base Package with Square**.
3. That URL is `https://square.link/u/{linkId}` plus UTM query params only. Square does **not** receive vibe, occasion, scale, or add-on line items from those query params.
4. If Link IDs are still `YOUR_LINK_ID`, the panel tells the customer they will get a Square invoice by email.

Package prices that must match the live Square links:

| Package key | Price | Product name |
|-------------|-------|----------------|
| `mini` | $79 | EchoStory Mini |
| `classic` | $179 | EchoStory Classic |
| `signature` | $349 | EchoStory Signature Experience |
| `legacy` | $649 | EchoStory Legacy Edition |
| `eternal` | $9,999 | EchoStory Eternal Legacy Suite |

Add-ons in the wizard (`extra-songs` $49, `art-pack` $39, `hardcover-pdf` $25, `qr-poster` $19) are **not** charged on the Payment Link.

## Configure Link IDs

1. Square Dashboard → [Online Checkout / Payment Links](https://square.link/dashboard).
2. Create one Payment Link per row above (USD, matching price and name).
3. Copy each Link ID (`sq0idp-...`).
4. Put them in `config.js` → `squareLinks` (or `config.local.js` for a machine that should not change git).
5. Redeploy GitHub Pages (push `config.js` if production IDs live in git).

Do **not** put Square access tokens, OAuth secrets, or webhook signatures in this repo.

## Why UTM only

The storefront used to append `vibe`, `occasion`, and `scale` to the Payment Link URL. Those parameters are not a Square order note. Order truth is the Formspree payload (`chosen_vibe`, `chosen_occasion`, `chosen_scale`, `chosen_package`, `chosen_addons`, `estimated_total`).

## Next: Checkout API (when we want one charge for package + add-ons)

Square’s Checkout API can create a hosted checkout with **line items and a custom total** (package + selected add-ons, buyer email prefilled, `payment_note` with the EchoStory order). That requires:

- A tiny backend (Cloudflare Worker, Vercel function, or NXCore service) that holds the Square access token.
- `POST /v2/online-checkout/payment-links` with an `order.line_items` array (or `quick_pay` for a single amount).
- The storefront calling that backend after Formspree success (or instead of a static link).
- Optional: `checkout_options.redirect_url` back to the EchoStory thank-you page.
- Webhooks (`payment.updated`) if we need fulfillment to wait on paid status.

Until that backend exists, keep Payment Links for the five base packages and invoice add-ons.

## Operator checklist

- [ ] Five live Payment Links, prices match the table
- [ ] `config.js` Link IDs on the deployed site (view-source or Network tab after submit)
- [ ] Formspree form ID live (`YOUR_FORM_ID` replaced)
- [ ] Test Mini in Square sandbox or a $79 live link with a refund
- [ ] Confirm add-on-only orders still get an invoice email
