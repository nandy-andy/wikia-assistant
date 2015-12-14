define('wikia.assistant.settings', [], function() {
  var options = {},
      defaultOptions = {
        searchOption: 'search-opts-wikias',
        firstViewOption: 'first-view-opts-recent-changes'
      },
      searchOptions = ['search-opts-wikias', 'search-opts-articles'],
      firstViewOptions = ['first-view-opts-recent-changes', 'first-view-opts-curated-content'];

  function getOptions() {
    return options;
  }

  function setOption(name, value) {
    options[name] = value;
  }

  function save(callback) {
    chrome.storage.sync.set(options, callback);
  }

  function restore(callback) {
    chrome.storage.sync.get(defaultOptions, callback);
  }

  return {
    getOptions: getOptions,
    setOption: setOption,
    save: save,
    restore: restore
  }
});
