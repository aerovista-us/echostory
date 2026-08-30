/**
 * Example overlay. Copy to config.js (or config.local.js) and replace placeholders.
 * Link IDs come from https://square.link/dashboard (format: sq0idp-...).
 */
window.ECHOSTORY_CONFIG = {
    formspreeFormId: 'YOUR_FORM_ID',
    squareCheckoutBase: 'https://square.link/u/',
    squareLinks: {
        mini: 'YOUR_LINK_ID',      // $79 Mini
        classic: 'YOUR_LINK_ID',   // $179 Classic
        signature: 'YOUR_LINK_ID', // $349 Signature
        legacy: 'YOUR_LINK_ID',    // $649 Legacy
        eternal: 'YOUR_LINK_ID'    // $9,999 Eternal Legacy Suite
    }
};
