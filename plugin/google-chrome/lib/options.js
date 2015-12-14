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
    var checkedElemenets = document.querySelectorAll("input:checked"),
        countOfCheckedElemenets = checkedElemenets.length;

    for(var i = 0; i < countOfCheckedElemenets; i++) {
      var element = checkedElemenets.item(i);
      settings.setOption(element.name, element.id);
    }

    settings.save(function() {
      console.log('Saved.');
    });

    console.log('Saving...');
  });
});
