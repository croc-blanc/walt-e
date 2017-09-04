$(document).ready(function() {
  var settings = {
  sms: undefined,
  popUp: undefined,
  phoneNumber: undefined
  };

  var hash = {
    reminder: settings
  };

  var ajaxHeaders = {
    "X-User-Email": "gregoire.d@gmail.com",
    "X-User-Token": "PdFyyk-v1TNpJxiyDo1z"
  };

  var apiBaseUrl = "https://walt-ia.herokuapp.com/api/v1";

  getSettings() {
    sms.settings + popUp.settings + phoneNumber.settings = submit.val();
  }

function sendSettings() {
    $.ajax({
      type: "POST",
      url: apiBaseUrl + "/reminders",
      headers: ajaxHeaders,
      data: settings,
      success: function(data) {
        console.log("POST Success: " + data);


      },
      error: function(jqXHR) {
        console.error(jqXHR.responseText);
      }
    });
  };
