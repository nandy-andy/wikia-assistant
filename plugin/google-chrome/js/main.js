var resultsPlaceholderContainer = document.getElementById('results-placeholder'),
	queryInput = document.getElementById('query'),
	searchButton = document.getElementById('search-button'),
	error = document.getElementById('error'),
	settingsButton = document.getElementById('settings-button');

function show(element) {
	element.style.display = 'block';
}

function hide(element) {
	element.style.display = 'none';
}

function openTab(url) {
	chrome.tabs.create({
		url: url
	});
}

require([
	'wikia.assistant.search'
], function(
	search
) {
	resultsPlaceholderContainer.addEventListener('click', function() {
		openTab('http://www.wikia.com')
	}, false);

	queryInput.addEventListener('keyup', function(e) {
		if(e.keyCode === 13) {
			search.doSearch(queryInput.value);
		}
	});

	searchButton.addEventListener('click', function() {
		search.doSearch(queryInput.value);
	}, false);

	settingsButton.addEventListener('click', function () {
		if (chrome.runtime.openOptionsPage) {
			chrome.runtime.openOptionsPage();
		} else {
			window.open(chrome.runtime.getURL('options.html'));
		}
	});

});
