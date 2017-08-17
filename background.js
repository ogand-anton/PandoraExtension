// TODO
// (1) download music & album covers
(function() {
	var adUrls = [
		// "http://adserver.pandora.com/*", 				// partially needed for replays & skips
		// "htps://adserver.pandora.com/*",					// partially needed for replays & skips
		// "https://www.pandora.com/ping.txt*", 			// needed for network connection detection
		// "https://www.pandora.com/*analytics*", 			// needed to load
		// "https://www.pandora.com/*smartconversion*",		// needed to load
		// "https://www.pandora.com/*/ad/*"					// needed for skips & replays
		"http://adserver.pandora.com/*tracking-event*",
		"https://adserver.pandora.com/*tracking-event*",
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
		"https://www.pandora.com/*.mp4",						// video ads
		"https://www.pandora.com/*mediaserverPublicRedirect*", 	// redirects to ad retrievals
		"https://www.pandora.com/*radioAdEmbedGPT*"
	];
	
	(function init() {
		chrome.webRequest.onBeforeRequest.addListener(blockRequest, {urls: adUrls}, ["blocking"]);
	})();
	
	function blockRequest() {
        return {cancel: true};
	}
})();