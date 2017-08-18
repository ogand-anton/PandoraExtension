// TODO
// (1) download music & album covers
(function () {
    var blackListedUrls = [
            "http://adserver.pandora.com/*",
            "https://adserver.pandora.com/*",
            "https://bat.bing.com/*",
            "https://beacon.krxd.net/*",
            "https://cache-ssl.celtra.com/*",
            "https://cdn.krxd.net/*",
            "https://connect.facebook.net/*",
            "https://imasdk.googleapis.com/*",
            "https://lt500.tritondigital.com/*",
            "https://match.adsrvr.org/*",
            "https://player.ooyala.com/*",
            "https://s.adroll.com/*",
            "https://sb.scorecardresearch.com/*",
            "https://stats.pandora.com/*",
            "https://www.google.com/ads*",
            "https://www.googleadservices.com/*",
            "https://www.google-analytics.com/*",
            "https://www.pandora.com/*ads*",
            "https://www.pandora.com/*brokenAd*",
            "https://www.pandora.com/*getAdList*",
            "https://www.pandora.com/*.mp4",						// video ads
            "https://www.pandora.com/*mediaserverPublicRedirect*", 	// redirects to ad retrievals
            "https://www.pandora.com/*radioAdEmbedGPT*",
            "https://www.pandora.com/*registerImpression*",
            "https://www.pandora.com/*/ad/*"
        ],
        whiteListedUrls = [
            // "https://www.pandora.com/ping.txt*", 			        // needed for network connection detection
            // "https://www.pandora.com/*analytics*", 			        // needed to load
            // "https://www.pandora.com/*smartconversion*",		        // needed to load
            "https://www.pandora.com/*/ad/startValueExchange*",         // needed for replays
            "https://www.pandora.com/*/ad/useReplayReward*",            // needed for replays
            "https://www.pandora.com/*/ad/useSkipReward*",              // needed for skips
            "https://adserver.pandora.com/*?slot=FLEX_SKIP*",           // needed for skips
            "https://adserver.pandora.com/*?slot=FLEX_REPLAY*"          // needed for skips
        ];

    (function init() {
        run();
    })();

    function blockRequest(request) {
        return  {cancel: !checkUrlWhiteListed(request.url)};
    }

    function checkUrlPatternMatches(url, pattern) {
        var components = pattern.split("*"),
            componentsFoundFlag = true;

        for (var i = 0; i < components.length && componentsFoundFlag; i++) {
            componentsFoundFlag = url.indexOf(components[i]) > -1
        }

        return componentsFoundFlag;
    }

    function checkUrlWhiteListed(url) {
        return !!whiteListedUrls.find(function (whiteListedUrl) {
            return checkUrlPatternMatches(url, whiteListedUrl);
        });
    }

    function run() {
        chrome.webRequest.onBeforeRequest.addListener(
            blockRequest,
            {urls: blackListedUrls},
            ["blocking"]
        );
    }
})();