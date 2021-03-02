(function () {
    var CONST_LOG_FLAG = true,
        CONST_YOUTUBE_SKIP_ADD_CLASS = "ytp-ad-text ytp-ad-skip-button-text",
        CONST_POLL_RATE = 1000;

    var loadedFlag = false,
        listenerSetFlag = false,
        manualPauseFlag = false;

    (function init() {
        log("Starting YouTube Scripts");
		run();
        setInterval(run, CONST_POLL_RATE);
    })();

    function clickSkipAdd() {
        var popup = document.getElementsByClassName(CONST_YOUTUBE_SKIP_ADD_CLASS).item(0);
        if (popup) {
            log("Detected Skip Ad button");
            popup.click();
        }
    }

    function log(str, alertFlag) {
        if (CONST_LOG_FLAG) {
            if (alertFlag) {
                alert(str);
            } else {
                console.log(str)
            }
        }
    }

    function run() {
		clickSkipAdd();
    }
})();