$( document ).ready(function() {
  var ajaxHeaders = {
    "X-User-Email": "david.messagerie@hotmail.fr",
    "X-User-Token": "7gM3HFzUrKUzXppbt_4v"
  };

  var apiBaseUrl = "http://127.0.0.1:3000";

  $( "#send" ).click(function() {
    var email = $("#user_email").val();
    var password = $("#user_password").val();
    // ajaxLogin(email, password);
    console.log("in click");
  });
  // send at ajax and try to login


  function ajaxLogin(email, password) {
    var data = {
      "email": email,
      "password": password,
    };
    var hash = {
      "user": data
    };
    $.ajax({
      type: "POST",
      url: apiBaseUrl + "/users/sign_in",
      headers: ajaxHeaders,
      data: hash,
      success: function(data) {
        console.log(data);
      },
      error: function(jqXHR) {
        console.error(jqXHR.responseText);
      }
    });
  };


});
