/**
 * EchoStory runtime config — edit this file, not the 4,000-line storefront.
 *
 * Copy to config.local.js (gitignored) for machine-only overrides.
 * Square Payment Link IDs are public URLs; Formspree IDs appear in the
 * form action either way. Do not put Square access tokens here.
 *
 * See docs/SQUARE.md
 */
window.ECHOSTORY_CONFIG = {
    formspreeFormId: 'YOUR_FORM_ID',
    squareCheckoutBase: 'https://square.link/u/',
    squareLinks: {
        mini: 'YOUR_LINK_ID',
        classic: 'YOUR_LINK_ID',
        signature: 'YOUR_LINK_ID',
        legacy: 'YOUR_LINK_ID',
        eternal: 'YOUR_LINK_ID'
    }
};
