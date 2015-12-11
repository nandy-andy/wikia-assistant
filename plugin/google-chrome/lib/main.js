var resultsPlaceholderContainer = document.getElementById('results-placeholder'),
	queryInput = document.getElementById('query'),
	searchButton = document.getElementById('search-button'),
	loader = document.getElementById('loader'),
	error = document.getElementById('error'),
	resultsPlaceholder = document.getElementById('results-placeholder'),
	resultsContainer = document.getElementById('results');

function show(element) {
	element.style.display = 'block';
}

function hide(element) {
	element.style.display = 'none';
}

function showError(errorMessage) {
	hide(resultsContainer);
	show(resultsPlaceholder);

	error.innerHTML = errorMessage;
	show(error);
}

function searchForWikia(query) {
	hide(resultsContainer);
	show(resultsPlaceholder);
	show(loader);

	getUrl(
		'http://www.wikia.com/api/v1/Wikis/ByString?string=' + query + '&lang=en&limit=25&batch=1&includeDomain=true',
		function (response) {
			generateResponse(response);
			show(resultsContainer);
			hide(resultsPlaceholder);
			hide(loader);
		},
		function () {
			showError('Connection error with API occurred. Please try again later.');
			hide(loader);
		}
	);
}

function generateResponse(response) {
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

function openTab(url) {
	chrome.tabs.create({
		url: url
	});
}

function doSearch() {
	var query = queryInput.value;

	if(query) {
		searchForWikia(query);
	} else {
		showError('Enter the phrase you are looking for, please.');
	}
}

resultsPlaceholderContainer.addEventListener('click', function() {
	openTab('http://www.wikia.com')
}, false);

queryInput.addEventListener('keyup', function(e) {
	if(e.keyCode === 13) {
		doSearch();
	}
});

searchButton.addEventListener('click', function() {
	doSearch();
}, false);
