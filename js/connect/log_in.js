$( document ).ready(function() {
  var ajaxHeaders = {
    "accept": "application/json",
  };

  var apiBaseUrl = "http://localhost:3000";

  $( "#new_user" ).on('submit', function(event) {
    event.preventDefault();

    var email = $("#user_email").val();
    var password = $("#user_password").val();

    // send at ajax and try to login
    ajaxLogin(email, password);
  });

  function ajaxLogin(email, password) {
    var data = {
      "user": {
        "email": email,
        "password": password,
      }
    };

    $.ajax({
      type: "POST",
      url: apiBaseUrl + "/users/sign_in",
      headers: ajaxHeaders,
      data: data,
      dataType: "json",
      success: function(data) {
        var user = {
          email: data.email,
          token: data.authentication_token
        };

        localStorage.setItem("user", JSON.stringify(user));

        window.location.href = "./index.html";
      },

      error: function(jqXHR, status, text) {
        if (jqXHR.responseJSON.error) {
          $("#form_error")
            .show()
            .html(jqXHR.responseJSON.error);
        }
      }
    });
  };
});
