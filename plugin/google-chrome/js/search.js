define('wikia.assistant.search', ['wikia.assistant.settings'], function(settings) {
	var loader = document.getElementById('loader'),
		error = document.getElementById('error'),
		resultsPlaceholder = document.getElementById('results-placeholder'),
		resultsContainer = document.getElementById('results'),
		userWikia = 'batman.wikia.com';

	function showError(errorMessage) {
		hide(resultsContainer);
		show(resultsPlaceholder);

		error.innerHTML = errorMessage;
		show(error);
	}

	function getUrl(url, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status === 200) {
					var response = JSON.parse(xhr.responseText);
					success(response);
				} else {
					error(xhr);
				}
			}
		};
		xhr.send();
	}

	function changeUiToWaitState() {
		hide(resultsContainer);
		show(resultsPlaceholder);
		show(loader);
	}

	function changeUiToReadyState() {
		show(resultsContainer);
		hide(resultsPlaceholder);
		hide(loader);
	}

	function searchForWikia(query) {
		changeUiToWaitState();

		getUrl(
			'http://www.wikia.com/api/v1/Wikis/ByString?string=' + query + '&lang=en&limit=25&batch=1&includeDomain=true',
			function (response) {
				generateWikiasResponse(response);
				changeUiToReadyState();
			},
			function () {
				showError('Connection error with API occurred. Please try again later.');
				hide(loader);
			}
		);
	}

	function generateWikiasResponse(response) {
		var output;

		if (response.items && response.items.length === 0) {
			output = 'There are no results for your search phrase.';
		} else {
			output = '<ul>';
			Object.keys(response.items).forEach(function (i) {
				output += '<li><a href="http://' + response.items[i].domain + '">' + response.items[i].name + '</a></li>';
			});
			output += '</ul>';
		}

		resultsContainer.innerHTML = output;

		[].forEach.call(document.querySelectorAll('#results a'), function (a) {
			a.addEventListener('click', function() {
				if(this.href) {
					openTab(this.href);
				}
			}, false );
		});
	}

	function generateArticlesResponse(response) {
		var output;

		if (response.length === 0) {
			output = 'There are no results for your search phrase.';
		} else {
			output = '<ul>';
			Object.keys(response).forEach(function (i) {
				output += '<li><a href="http://' + response[i].url + '">' + response[i].title + '</a></li>';
			});
			output += '</ul>';
		}

		resultsContainer.innerHTML = output;

		[].forEach.call(document.querySelectorAll('#results a'), function (a) {
			a.addEventListener('click', function() {
				if(this.href) {
					openTab(this.href);
				}
			}, false );
		});
	}

	function searchWikia(query) {
		changeUiToWaitState();

		getUrl(
			'http://' + userWikia + '/wiki/Special:Search?search=' + query + '&fulltext=Search&format=json',
			function (response) {
				generateArticlesResponse(response);
				changeUiToReadyState();
			},
			function () {
				showError('Connection error with API occurred. Please try again later.');
				hide(loader);
			}
		);
	}

	function search(query) {
		settings.restore(function (items) {
			if(items.searchOption === 'search-opts-wikias') {
				searchForWikia(query);
			} else if(items.searchOption === 'search-opts-articles') {
				searchWikia(query);
			}
		});
	}

	function doSearch(query) {
		if(query) {
			search(query);
		} else {
			showError('Enter the phrase you are looking for, please.');
		}
	}

	return {
		doSearch: doSearch
	}
});
