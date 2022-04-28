// TODO
// (1) download music & album covers
(function () {
    // urls that may need to be blocked
    var blackListedUrls = [
            "http://adserver.pandora.com/*",
			"http://www.dianomi.com/*",
			"https://ad.doubleclick.net/*",
            "https://adserver.pandora.com/*",
			"https://assets.adobedtm.com/*",
            "https://bat.bing.com/*",
            "https://beacon.krxd.net/*",
			"https://*.cloudfront.net/v4/bugsnag.min.js",
            "https://cache-ssl.celtra.com/*",
            "https://cdn.krxd.net/*",
            "https://connect.facebook.net/*",
            "https://delivery-cdn-cf.adswizz.com/*",
			"https://doubleclick.net/*",
            "https://googleads.g.doubleclick.net/*",
			"https://*.googlesyndication.com/*",
            "https://imasdk.googleapis.com/*",
            "https://lt500.tritondigital.com/*",
            "https://match.adsrvr.org/*",
			"https://pixel.adsafeprotected.com/*",
            "https://player.ooyala.com/*",
            "https://s.adroll.com/*",
            "https://s0.2mdn.net/*",
            "https://sb.scorecardresearch.com/*",
			"https://securepubads.g.doubleclick.net/*",
			"https://serve.truex.com/*",
			"https://stags.bluekai.com/*",
			"https://static.adsafeprotected.com/*",
			"https://static.doubleclick.net/*",
            "https://stats.pandora.com/*",
            "https://synchrobox.adswizz.com/*",
			"https://tpc.googlesyndication.com/*",
            "https://www.google.com/ads*",
			"https://www.google.com/pagead/*",
            "https://www.googleadservices.com/*",
            "https://www.google-analytics.com/*",
			"https://www.googletagmanager.com/*",
            "https://www.googletagservices.com/*",
            "https://www.pandora.com/*ads*",
            "https://www.pandora.com/*brokenAd*",
			//"https://www.pandora.com/*displayAdFrame*",
            "https://www.pandora.com/*getAdList*",
            "https://www.pandora.com/*.mp4",                        // video ads
            "https://www.pandora.com/*mediaserverPublicRedirect*",  // redirects to ad retrievals
			//"https://www.pandora.com/*/playbackPaused*",
            "https://www.pandora.com/*radioAdEmbedGPT*",
            "https://www.pandora.com/*registerImpression*",
			"https://www.pandora.com/*smart_launch_hooks_android*",
            "https://www.pandora.com/*/ad/*",
			"https://www.youtube.com/*/ads*",
			"https://www.youtube.com/*ad_companion*",
			"https://www.youtube.com/*adcompanion*",
			"https://www.youtube.com/csi*",
			"https://www.youtube.com/error_204*",
			"https://www.youtube.com/get_midroll_info*",
			"https://www.youtube.com/*/log_event*",
			"https://www.youtube.com/*/log_interaction*",
			"https://www.youtube.com/pagead/*",
			"https://www.youtube.com/ptracking*",
			"https://www.youtube.com/*/stats/*",
			"https://www.youtube.com/service_ajax*",
			"https://www.youtube.com/sw.js*",
			"https://www.youtube.com/get_video_info*",
			"https://www.youtube.com/youtubei/v1/player/ad_break*"
        ],
        // urls that are an exception to the blacklist
        whiteListedUrls = [
            "https://adserver.pandora.com/*?slot=FLEX_SKIP*",           					// needed for skips
            "https://adserver.pandora.com/*?slot=FLEX_REPLAY*",         					// needed for skips
            // "https://www.pandora.com/ping.txt*",                     					// needed for network connection detection
            // "https://www.pandora.com/*analytics*",                   					// needed to load
            // "https://www.pandora.com/*smartconversion*",             					// needed to load
            "https://www.pandora.com/*/ad/startValueExchange*",         					// needed for replays
            "https://www.pandora.com/*/ad/useReplayReward*",            					// needed for replays
            "https://www.pandora.com/*/ad/useSkipReward*",              					// needed for skips,
            "https://www.pandora.com/*/adsCommon-index-js*",            					// needed to load
			"https://www.pandora.com/*/ads.json",											// needed to bypass ad-blocker check
            //"https://www.pandora.com/*/c_*",                          					// needed to load (?)
            //"https://www.pandora.com/*/d_*",                          					// needed to load (?)
            "https://www.pandora.com/*/d_adsCommon-index-js*",          					// needed to load
            "https://www.pandora.com/*/d_audio-ads*",                   					// needed to load
            "https://www.pandora.com/*/d_ads-common*",                  					// needed to load
            "https://www.pandora.com/*/d_display-ads*",                 					// needed to load
            "https://www.pandora.com/*/d_video-ads*",                   					// needed for skips
			"https://www.pandora.com/static/ads/omsdk-v1_3/omweb-video-v1_3/omweb-v1-m.js",	// needed for playback
			"https://www.youtube.com/service_ajax?name=signalServiceEndpoint*",				// needed to switch account
			"https://www.youtube.com/service_ajax?name=getAccountsListEndpoint*",			// needed to switch account
			"https://www.youtube.com/service_ajax?name=subscribeEndpoint",					// needed to subscribe 
			"https://www.youtube.com/service_ajax?name=unsubscribeEndpoint"					// needed to unsubscribe 
        ];
		
    (function init() {
        run();
    })();

    function blockRequest(request) {
		var cancelFlag = !checkUrlWhiteListed(request.url);
        console.log(cancelFlag ? "Blocking " + request.url : "Allowing " + request.url);
        return  {cancel: cancelFlag};
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
		
        chrome.browserAction.onClicked.addListener(function(activeTab){
            chrome.tabs.create({ url: "chrome://extensions" });
        });
		
		chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
			chrome.tabs.executeScript(null,{file:"content.js"});
		});
    }
})();