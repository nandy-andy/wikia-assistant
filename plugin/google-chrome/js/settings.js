define('wikia.assistant.settings', [], function() {
  var options = {},
      defaultOptions = {
        searchOption: 'search-opts-wikias',
        firstViewOption: 'first-view-opts-recent-changes',
        userWikias: []
      },
      usersWikias = [],
      searchOptions = ['search-opts-wikias', 'search-opts-articles'],
      firstViewOptions = ['first-view-opts-recent-changes', 'first-view-opts-curated-content'],
      WIKIA_URL_REGEXP_PATTERN = ".*\.wikia\.com(|\/.*)";

  function getOptions() {
    return options;
  }

  function setOption(name, value) {
    options[name] = value;
  }

  function getUserWikias() {
    return usersWikias;
  }

  function addUserWikia(wikiaUrl) {
    var url = new URL(wikiaUrl).hostname;

    if(
        url !== ''
        && url.match(WIKIA_URL_REGEXP_PATTERN)
        && usersWikias.indexOf(url) === -1
    ) {
      usersWikias.push(url);
    }
  }

  function save(callback) {
    chrome.storage.sync.set(options, callback);
  }

  function restore(callback) {
    chrome.storage.sync.get(defaultOptions, callback);
  }

  return {
    addUserWikia: addUserWikia,
    getUserWikias: getUserWikias,
    getOptions: getOptions,
    setOption: setOption,
    save: save,
    restore: restore
  }
});
