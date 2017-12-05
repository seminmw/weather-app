$(document).ready(function() {

  var $api = $('#api');
  var $apiKey = $('#apiKey');
  var $apiKeyWrapper = $('.js-api-key-wrapper');
  var $status = $('#status');
  var $save = $('#save');

  function save_options() {
    chrome.storage.sync.set({
      api: $api.val(),
      apiKey: $apiKey.val()
    }, function() {
      // Update status to let user know options were saved.
      $status.html(`
        <div class="alert alert-primary" role="alert">
          Options have been saved !
        </div>
      `);

      setTimeout(function() {
        $status.html('');
      }, 3000);
    });
  }

  function restore_options() {

    chrome.storage.sync.get({
      api: 'Yahoo',
      apiKey: ''
    }, function(items) {
      $api.val(items.api);
      $apiKey.val(items.apiKey);
      adjust_api_key_display();
    });
  }

  function adjust_api_key_display() {
    if ($api.val() === 'Yahoo') {
      $apiKeyWrapper.hide();
      $apiKey.val('');
    }
    else {
      $apiKeyWrapper.show();
    }
  }

  restore_options();

  $api.change(function () {
    adjust_api_key_display();
  });

  $save.click(function () {
    save_options();
  });
});