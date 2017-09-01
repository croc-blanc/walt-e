$( document ).ready(function() {
  var ajaxHeaders = {
    "accept": "application/json",
    "Access-Control-Allow-Origin": "*",
  //  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  //  "Access-Control-Max-Age": 1000,
    //"Access-Control-Allow-Headers": "origin, x-csrftoken, content-type, accept"
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

    console.log('login Data', data);
    $.ajax({
      type: "POST",
      url: apiBaseUrl + "/users/sign_in",
      headers: ajaxHeaders,
      data: { "user":
                    {
                      "email": "david.messagerie@hotmail.fr",
                      "password": "031088"
                    }
            },
      dataType: "json",
    //  contentType : "application/json",
      success: function(data) {
        console.log("success", data);
      },
      error: function(jqXHR, status, text) {
        console.log("error ajax", status);
        console.log(text);
        console.error(jqXHR);
      }
    });
  };


});
