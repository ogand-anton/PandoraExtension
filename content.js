(function() {
	var CONST_LOG_FLAG = true,
		// CONST_PANDORA_AD_SIDEBAR_CLASS = "DisplayAdController",
		// CONST_PANDORA_AD_SNIP_CLASS = "--rightRail",
		// CONST_PANDORA_APP_CLASS = "App",
		CONST_PANDORA_PLAY_PAUSE_BUTTON_CLASS = "TunerControl PlayButton Tuner__Control__Button Tuner__Control__Play__Button",
		CONST_PANDORA_PLAY_PAUSE_BUTTON_ATTR = "data-qa",
		CONST_PANDORA_PLAY_ATTR_VAL = "play_button",
		CONST_PANDORA_PAUSE_ATTR_VAL = "pause_button",
		CONST_PANDORA_STILL_LISTENING_CLASS = "StillListeningBody",
		CONST_POLL_RATE = 1000;
	
	var loadedFlag = false,
		listenerSetFlag = false,
		manualPauseFlag = false;
	
	(function init() {
		log("Starting Pandora Scripts");		
		setInterval(run, CONST_POLL_RATE);
	})();

    function dismissStillListening() {
		var popup = document.getElementsByClassName(CONST_PANDORA_STILL_LISTENING_CLASS).item(0);
		if (popup && popup.lastChild) {
            alert("Detected Still Listening dialog...");
            popup.lastChild.click();
		}
	}

	function findPlayPauseButton() {
		return document.getElementsByClassName(CONST_PANDORA_PLAY_PAUSE_BUTTON_CLASS).item(0);
	}
	
	function isPaused() {
		var button = findPlayPauseButton();
		return !!button && button.getAttribute(CONST_PANDORA_PLAY_PAUSE_BUTTON_ATTR) === CONST_PANDORA_PLAY_ATTR_VAL; // paused if play is shown
	}
	
	function isPlaying() {
		var button = findPlayPauseButton();
		return !!button && button.getAttribute(CONST_PANDORA_PLAY_PAUSE_BUTTON_ATTR) === CONST_PANDORA_PAUSE_ATTR_VAL; // playing if pause is shown
	}	
	
	function log(str) {
		if (CONST_LOG_FLAG) { console.log(str) }
	}

    // TODO reload/hit play if not playing for non-obvious reasons
	function reloadIfNotPlaying() {
		if (isPaused() && !manualPauseFlag) {
			// for now depend on easy way to continue playing 
			// if reload is required, check more conditions
			// (ex. 0:00 time when switching songs, didn't just unpause, didn't just skip, didn't just replay)
			// Pandora.playTrack(); // global variables are NOT accessible to content script - use background scripts or reload page
			// location.reload();
            log("Detected non-manual pause...");
		}
	}

	// function removeAds() {
	// 	// no longer "removes" adds as requests are blocked by background scripts
	// 	// display seems to fix itself when no ads loaded (probs because js files not loaded for ads any more)
	// 	// remove main sidebar
	// 	var appElem = document.getElementsByClassName(CONST_PANDORA_APP_CLASS).item(0),
	// 		adSidebar = document.getElementsByClassName(CONST_PANDORA_AD_SIDEBAR_CLASS).item(0);
    //
	// 	if (appElem && adSidebar) { appElem.removeChild(adSidebar) }
    //
	// 	// fix display
	// 	var elemArr = document.querySelectorAll("[class$='" + CONST_PANDORA_AD_SNIP_CLASS + "']");
	// 	for (var i = 0; i < elemArr.length; i++) {
	// 		var elem = elemArr.item(i);
    //
	// 		if (elem.className.animVal && elem.className.baseVal) {
	// 			elem.className.baseVal = elem.className.baseVal.replace(CONST_PANDORA_AD_SNIP_CLASS, "");
	// 			elem.className.animVal = elem.className.animVal.replace(CONST_PANDORA_AD_SNIP_CLASS, "");
	// 		} else {
	// 			elem.className = elem.className.replace(CONST_PANDORA_AD_SNIP_CLASS, "");
	// 		}
	// 	}
	// }
	
	function run() {
		if (loadedFlag) {
			setListeners();
            dismissStillListening();
			reloadIfNotPlaying();
		} else {
			loadedFlag = isPlaying();
			log("Pandora " + (loadedFlag ? "loaded!" : "loading..."));
		}
	}
	
	function setListeners() {
		if (!listenerSetFlag) {
			var button = findPlayPauseButton();
			if (button) { button.addEventListener("click", setManualPauseFlag) }
			document.addEventListener("keydown", setManualPauseFlagOnSpace)
		}
	}
	
	function setManualPauseFlag() {
		manualPauseFlag = isPlaying();
		log("Manual Pause Flag: " + manualPauseFlag);
	}
	
	function setManualPauseFlagOnSpace(event) {
		if (event.keyCode === 32) { setManualPauseFlag() }
	}
})();