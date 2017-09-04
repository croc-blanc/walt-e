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
      "X-User-Email": JSON.parse(localStorage.getItem("user")).email,
      "X-User-Token": JSON.parse(localStorage.getItem("user")).token
  };

  var apiBaseUrl = "https://walt-ia.herokuapp.com";
// var apiBaseUrl = "http://127.0.0.1:3000";
  getSettings() {
    sms.settings + popUp.settings + phoneNumber.settings = submit.val();
  }

function sendSettings() {
    $.ajax({
      type: "POST",
      url: apiBaseUrl + "/api/v1/reminders",
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
