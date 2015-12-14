define('wikia.assistant.userWikias', [], function() {
	var WIKIA_URL_PATTERN = "*://*.wikia.com/*",
		WIKIA_HISTORY_TEXT = "wikia";

	function getWikiasFromHistory(callback) {
		chrome.history.search({
				text: WIKIA_HISTORY_TEXT
			},
			callback
		);
	}

	function getWikiasFromOpenTabs(callback) {
		chrome.tabs.query({
				url: WIKIA_URL_PATTERN
			},
			callback
		);
	}

	return {
		getWikiasFromHistory: getWikiasFromHistory,
		getWikiasFromOpenTabs: getWikiasFromOpenTabs
	}
});
