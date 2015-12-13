require([
  'wikia.assistant.settings',
  'wikia.assistant.optionsStatusBar'
], function(
    settings,
    statusBar
) {
  settings.restore(function(items) {
    Object.keys(items).forEach(function (item) {
      var elId = items[item];
          el = document.getElementById(elId);

      settings.setOption(item, items[item]);

      if(el) {
        el.checked = "checked";
      }
    });
  });

  document.getElementById('save').addEventListener('click', function () {
    settings.setOption('searchOption', 'search-opts-articles');

    settings.save(function() {
      console.log('Saved.');
      console.log(settings.getOptions());
    });

    console.log('Saving...');
  });
});
