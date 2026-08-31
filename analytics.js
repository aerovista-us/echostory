/**
 * EchoStory funnel analytics — Umami custom events (enter, nav order, exit).
 * Requires config.js umamiWebsiteId and stats.aerocoreos.com script in <head>.
 * See docs/UMAMI.md
 */
(function (global) {
    'use strict';

    var LOCAL_HOSTS = ['localhost', '127.0.0.1'];
    var funnel = {
        enteredAt: Date.now(),
        path: [],
        lastScreen: 'enter',
        exitSent: false
    };

    function configId() {
        var cfg = global.ECHOSTORY_CONFIG || {};
        return cfg.umamiWebsiteId || '';
    }

    function isEnabled() {
        if (LOCAL_HOSTS.indexOf(location.hostname) !== -1) return false;
        var id = configId();
        return Boolean(id) && String(id).indexOf('YOUR_') !== 0;
    }

    function whenUmamiReady(fn) {
        if (typeof global.umami !== 'undefined') {
            fn();
            return;
        }
        var tries = 0;
        var timer = setInterval(function () {
            tries += 1;
            if (typeof global.umami !== 'undefined' || tries > 60) {
                clearInterval(timer);
                fn();
            }
        }, 100);
    }

    function track(eventName, data) {
        if (!isEnabled()) return;
        var payload = data || {};
        whenUmamiReady(function () {
            if (typeof global.umami !== 'undefined') {
                global.umami.track(eventName, payload);
            }
        });
    }

    function trackPageView(screenId) {
        if (!isEnabled()) return;
        var slug = String(screenId).replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-');
        whenUmamiReady(function () {
            if (typeof global.umami !== 'undefined') {
                global.umami.track({
                    url: '/echostory/funnel/' + slug,
                    title: 'EchoStory · ' + screenId
                });
            }
        });
    }

    function trackScreen(screenId, extra) {
        funnel.lastScreen = screenId;
        funnel.path.push(screenId);

        var data = {
            screen: screenId,
            order: funnel.path.length,
            path: funnel.path.join('|')
        };

        if (extra && typeof extra === 'object') {
            Object.keys(extra).forEach(function (key) {
                data[key] = extra[key];
            });
        }

        track('funnel-nav', data);
        trackPageView(screenId);
    }

    function trackEnter() {
        track('funnel-enter', {
            referrer: document.referrer || 'direct',
            url: location.href
        });
        trackScreen('landing-loading');
    }

    function trackExit(reason) {
        if (funnel.exitSent || !isEnabled()) return;
        funnel.exitSent = true;

        track('funnel-exit', {
            last: funnel.lastScreen,
            path: funnel.path.join(' > '),
            steps: funnel.path.length,
            seconds: Math.round((Date.now() - funnel.enteredAt) / 1000),
            reason: reason || 'leave'
        });
    }

    global.EchoStoryAnalytics = {
        trackScreen: trackScreen,
        trackEvent: track,
        trackEnter: trackEnter,
        trackExit: trackExit,
        getPath: function () { return funnel.path.slice(); }
    };

    global.addEventListener('pagehide', function () {
        trackExit('pagehide');
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackEnter);
    } else {
        trackEnter();
    }
}(window));

/**
 * EchoStory presentation layer.
 * Keeps the landing experience visually contained without touching the large
 * single-file application. This patch is intentionally DOM-driven so the
 * wizard logic and existing event handlers remain intact.
 */
(function (global) {
    'use strict';

    var FIT_MIN = 0.62;
    var resizeTimer = null;

    function injectLayoutStyles() {
        if (document.getElementById('echostory-layout-patch')) return;

        var style = document.createElement('style');
        style.id = 'echostory-layout-patch';
        style.textContent = `
            /* Landing: place the supporting copy and CTA over the hero art. */
            .hero-screen.ux-hero-overlay {
                position: relative !important;
                width: min(100%, 760px) !important;
                min-height: 100dvh !important;
                margin: 0 auto !important;
                padding: clamp(8px, 1.5vh, 16px) !important;
                justify-content: center !important;
                overflow: hidden !important;
            }

            .hero-screen.ux-hero-overlay .hero-image {
                display: block !important;
                width: min(94vw, 600px) !important;
                max-width: 100% !important;
                max-height: calc(100dvh - 20px) !important;
                height: auto !important;
                margin: 0 !important;
                object-fit: contain !important;
            }

            .hero-screen.ux-hero-overlay .hero-overlay-stack {
                position: absolute !important;
                left: 50% !important;
                top: 69% !important;
                transform: translate(-50%, -50%) !important;
                z-index: 8 !important;
                width: min(82%, 510px) !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                gap: clamp(7px, 1.1vh, 12px) !important;
                padding: clamp(12px, 2vh, 20px) clamp(14px, 3vw, 26px) !important;
                border-radius: 22px !important;
                text-align: center !important;
                background: linear-gradient(180deg, rgba(10, 1, 24, 0.12) 0%, rgba(10, 1, 24, 0.74) 100%) !important;
                border: 1px solid rgba(0, 217, 255, 0.18) !important;
                box-shadow: 0 18px 55px rgba(0, 0, 0, 0.34) !important;
                backdrop-filter: blur(3px) !important;
                -webkit-backdrop-filter: blur(3px) !important;
            }

            .hero-screen.ux-hero-overlay .hero-tagline {
                margin: 0 !important;
                font-size: clamp(1.15rem, 3.2vw, 1.7rem) !important;
                line-height: 1.1 !important;
                text-shadow: 0 2px 14px rgba(0, 0, 0, 0.82) !important;
            }

            .hero-screen.ux-hero-overlay .hero-subtitle {
                max-width: 460px !important;
                margin: 0 !important;
                font-size: clamp(0.82rem, 1.8vw, 1rem) !important;
                line-height: 1.42 !important;
                color: #f0eaff !important;
                text-shadow: 0 2px 12px rgba(0, 0, 0, 0.95) !important;
            }

            .hero-screen.ux-hero-overlay .hero-cta {
                margin: 2px 0 0 !important;
                width: min(100%, 360px) !important;
                padding: clamp(11px, 1.8vh, 14px) 22px !important;
            }

            /* Page 2 + 3: one viewport, no internal scrolling. */
            body.ux-education-active {
                height: 100dvh !important;
                overflow: hidden !important;
            }

            .landing-page .landing-frame.education-fit {
                height: 100dvh !important;
                max-height: 100dvh !important;
                overflow: hidden !important;
                padding: clamp(8px, 1.25vh, 14px) clamp(10px, 2.5vw, 24px) !important;
            }

            .landing-frame.education-fit .education-screen.show {
                display: flex !important;
                width: 100% !important;
                height: 100% !important;
                min-height: 0 !important;
                max-height: 100% !important;
                margin: 0 auto !important;
                padding: 0 !important;
                justify-content: center !important;
                overflow: hidden !important;
                transform-origin: top center !important;
            }

            .landing-frame.education-fit .education-image {
                width: auto !important;
                max-width: min(72vw, 360px) !important;
                max-height: min(29dvh, 230px) !important;
                margin-bottom: clamp(7px, 1.2vh, 13px) !important;
                object-fit: contain !important;
            }

            .landing-frame.education-fit .education-title {
                font-size: clamp(1.18rem, 3.1vh, 1.75rem) !important;
                line-height: 1.15 !important;
                margin-bottom: clamp(7px, 1.1vh, 12px) !important;
            }

            .landing-frame.education-fit .education-content {
                width: min(100%, 720px) !important;
                margin: 0 auto clamp(7px, 1.2vh, 12px) !important;
            }

            .landing-frame.education-fit .education-paragraph {
                font-size: clamp(0.78rem, 1.65vh, 0.98rem) !important;
                line-height: 1.4 !important;
                margin-bottom: clamp(6px, 0.9vh, 10px) !important;
            }

            .landing-frame.education-fit .education-features {
                width: min(100%, 780px) !important;
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
                gap: clamp(7px, 1.2vw, 14px) !important;
                margin: clamp(7px, 1.15vh, 12px) auto !important;
            }

            .landing-frame.education-fit .education-feature {
                padding: clamp(8px, 1.25vh, 12px) !important;
            }

            .landing-frame.education-fit .education-feature-icon {
                font-size: clamp(1.2rem, 3vh, 1.65rem) !important;
                margin-bottom: 4px !important;
            }

            .landing-frame.education-fit .education-feature-title {
                font-size: clamp(0.72rem, 1.5vh, 0.9rem) !important;
                line-height: 1.2 !important;
                margin-bottom: 4px !important;
            }

            .landing-frame.education-fit .education-feature-desc {
                font-size: clamp(0.64rem, 1.3vh, 0.8rem) !important;
                line-height: 1.32 !important;
            }

            .landing-frame.education-fit #educationScreen2 > div:not(.education-features):not(.frame-footer-nav) {
                width: min(100%, 720px) !important;
                padding: clamp(9px, 1.45vh, 14px) !important;
                margin: clamp(7px, 1.15vh, 12px) 0 !important;
            }

            .landing-frame.education-fit #educationScreen2 > div:not(.education-features):not(.frame-footer-nav) > div {
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
                gap: clamp(7px, 1.2vw, 14px) !important;
            }

            .landing-frame.education-fit #educationScreen2 > div:not(.education-features):not(.frame-footer-nav) > div > div > div:first-child {
                font-size: clamp(0.68rem, 1.45vh, 0.88rem) !important;
                line-height: 1.2 !important;
                margin-bottom: 4px !important;
            }

            .landing-frame.education-fit #educationScreen2 > div:not(.education-features):not(.frame-footer-nav) > div > div > div:last-child {
                font-size: clamp(0.62rem, 1.25vh, 0.78rem) !important;
                line-height: 1.3 !important;
            }

            .landing-frame.education-fit .frame-footer-nav {
                width: min(100%, 720px) !important;
                margin-top: clamp(5px, 0.8vh, 9px) !important;
                gap: 10px !important;
            }

            .landing-frame.education-fit .frame-footer-nav .btn,
            .landing-frame.education-fit .frame-footer-nav .hero-cta,
            .landing-frame.education-fit #educationScreen1 .hero-cta {
                min-height: 0 !important;
                padding: clamp(9px, 1.25vh, 12px) clamp(14px, 2.5vw, 22px) !important;
                font-size: clamp(0.76rem, 1.45vh, 0.9rem) !important;
            }

            /* FAQ now lives on its own page. */
            #faqSection {
                display: none !important;
            }

            @media (max-width: 620px) {
                .hero-screen.ux-hero-overlay .hero-overlay-stack {
                    top: 70% !important;
                    width: 88% !important;
                    gap: 7px !important;
                    padding: 12px 14px !important;
                }

                .hero-screen.ux-hero-overlay .hero-tagline {
                    font-size: clamp(1.02rem, 5.2vw, 1.35rem) !important;
                }

                .hero-screen.ux-hero-overlay .hero-subtitle {
                    font-size: clamp(0.72rem, 3.1vw, 0.86rem) !important;
                    line-height: 1.34 !important;
                }

                .landing-frame.education-fit .education-image {
                    max-height: min(24dvh, 190px) !important;
                }

                .landing-frame.education-fit .education-features {
                    gap: 6px !important;
                }

                .landing-frame.education-fit .education-feature {
                    padding: 7px 5px !important;
                }
            }

            @media (max-height: 650px) {
                .hero-screen.ux-hero-overlay .hero-overlay-stack {
                    top: 68% !important;
                    padding-top: 10px !important;
                    padding-bottom: 10px !important;
                }

                .landing-frame.education-fit .education-image {
                    max-height: 20dvh !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function setupHeroOverlay() {
        var hero = document.getElementById('heroScreen');
        if (!hero || hero.classList.contains('ux-hero-overlay')) return;

        var image = hero.querySelector('.hero-image');
        var tagline = hero.querySelector('.hero-tagline');
        var subtitle = hero.querySelector('.hero-subtitle');
        var cta = hero.querySelector('.hero-cta');
        if (!image || !tagline || !subtitle || !cta) return;

        var stack = document.createElement('div');
        stack.className = 'hero-overlay-stack';
        stack.setAttribute('aria-label', 'Create your EchoStory');
        stack.appendChild(tagline);
        stack.appendChild(subtitle);
        stack.appendChild(cta);
        image.insertAdjacentElement('afterend', stack);
        hero.classList.add('ux-hero-overlay');
    }

    function fitEducationScreen(screen, frame) {
        if (!screen || !frame || !screen.classList.contains('show')) return;

        screen.style.zoom = '1';
        screen.style.removeProperty('width');

        global.requestAnimationFrame(function () {
            var available = Math.max(1, frame.clientHeight - 4);
            var needed = Math.max(1, screen.scrollHeight);
            var scale = Math.min(1, available / needed);
            scale = Math.max(FIT_MIN, scale);

            if (scale < 0.995) {
                screen.style.zoom = scale.toFixed(3);
                screen.style.width = (100 / scale).toFixed(2) + '%';
            }
        });
    }

    function setupEducationFit() {
        var landing = document.getElementById('landingPage');
        if (!landing) return;

        var frame = landing.querySelector('.landing-frame');
        var first = document.getElementById('educationScreen1');
        var second = document.getElementById('educationScreen2');
        if (!frame || !first || !second) return;

        function activeEducationScreen() {
            if (first.classList.contains('show')) return first;
            if (second.classList.contains('show')) return second;
            return null;
        }

        function sync() {
            var active = activeEducationScreen();
            var isActive = Boolean(active);
            frame.classList.toggle('education-fit', isActive);
            document.body.classList.toggle('ux-education-active', isActive);

            if (isActive) {
                fitEducationScreen(active, frame);
            } else {
                first.style.zoom = '1';
                second.style.zoom = '1';
                first.style.removeProperty('width');
                second.style.removeProperty('width');
            }
        }

        var observer = new MutationObserver(sync);
        observer.observe(first, { attributes: true, attributeFilter: ['class'] });
        observer.observe(second, { attributes: true, attributeFilter: ['class'] });

        var continueButton = document.getElementById('continueButton');
        if (continueButton) {
            continueButton.addEventListener('click', function () {
                frame.classList.remove('education-fit');
                document.body.classList.remove('ux-education-active');
            }, true);
        }

        global.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(sync, 100);
        });

        sync();
    }

    function setupFaqNavigation() {
        var faqButton = document.querySelector('#siteDrawer [data-nav="faq"]');
        if (!faqButton) return;

        faqButton.setAttribute('aria-label', 'Open Frequently Asked Questions page');
        faqButton.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (global.EchoStoryAnalytics) {
                global.EchoStoryAnalytics.trackEvent('menu-faq-page', { destination: 'faq.html' });
            }
            global.location.href = 'faq.html';
        }, true);
    }

    function initExperienceLayout() {
        injectLayoutStyles();
        setupHeroOverlay();
        setupEducationFit();
        setupFaqNavigation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initExperienceLayout);
    } else {
        initExperienceLayout();
    }
}(window));
