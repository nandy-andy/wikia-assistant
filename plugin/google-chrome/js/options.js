require([
  'wikia.assistant.settings',
  'wikia.assistant.optionsStatusBar',
  'wikia.assistant.userWikias'
], function(
    settings,
    statusBar,
    userWikias
) {
  var userWikiasUrls,
      output;

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

  //todo: callback hell
  userWikias.getWikiasFromOpenTabs(function (tabs) {
    if(tabs && tabs.length) {
      Object.keys(tabs).forEach(function (tabId) {
        if(tabs[tabId].url) {
          settings.addUserWikia(tabs[tabId].url);
        }
      });

      userWikias.getWikiasFromHistory(function(historyItems) {
        if(historyItems && historyItems.length) {
          Object.keys(historyItems).forEach(function (id) {
            if(historyItems[id].url) {
              settings.addUserWikia(historyItems[id].url);
            }
          });

          userWikiasUrls = settings.getUserWikias();
          output = '';
          Object.keys(userWikiasUrls).forEach(function (id) {
            output += '<li><input name="wikiaUrl" class="user-wikia-url" type="checkbox" /> ' + userWikiasUrls[id] + '</li>';
          });
          document.getElementById('favWikias').innerHTML = output;
        } else {
          console.log('No wikias found in opened tabs.');
        }
      });

    } else {
      console.log('No wikias found in opened tabs.');
    }
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
