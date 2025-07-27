'use strict';

(function() {
  (function init() {
    run();
  })();	
  
  function run() {
    console.log('Service worker started.');

    chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
      const msg = `Matched: ${e.request.url}; RulesetId: ${e.rule.rulesetId}`;
      console.log(msg);
    });
  }
})();
