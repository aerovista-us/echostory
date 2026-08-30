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
