$( document ).ready(function() {
  var ajaxHeaders = {
    "accept": "application/json",
  };

  var apiBaseUrl = "http://localhost:3000";

  $( "#send" ).click(function() {
    var email = $("#user_email").val();
    var password = $("#user_password").val();
    console.log("in click");
    ajaxLogin(email, password);
  });
  // send at ajax and try to login


  function ajaxLogin(email, password) {
    var data = {
      "user": {
        "email": email,
        "password": password,
      }
    };

    $.ajax({
      method: "POST",
      url: apiBaseUrl + "/users/sign_in",
      headers: ajaxHeaders,
      data: data,
      success: function(data) {
        console.log(data);
      },
      error: function(jqXHR) {
        console.error(jqXHR.responseText);
      }
    });
  };


});
