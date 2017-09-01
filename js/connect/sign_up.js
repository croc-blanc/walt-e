$( document ).ready(function() {
  // variable contenant les headers ainsi que l'url de connection a l'api
  console.log('ready in sign up');
  var ajaxHeaders = {
    "accept": "application/json",
  };

  var apiBaseUrl = "http://localhost:3000";
  // on pose un micro sur le formulaire qui ecoute lorsque l'on clique sur submit
  $( "#new_user" ).on('submit', function(event) {
    // echape l'evenement par defaut du bouton submit
    event.preventDefault();
    console.log('submit cliiiiiik');
    // recupère le contenu des inputs
    var email = $("#user_email").val();
    var password = $("#user_password").val();
    var confirmPassword = $("#user_password_confirmation").val();
    var phone_number = $("#user_phone").val();

    // envoi les données à la fonction ajaxLogin pour tenter de se connecter
    ajaxLogin(email, password, confirmPassword, phone_number);
  });

  function ajaxLogin(email, password, confirmPassword, phone_number) {
    var data = {
      "user": {
        "email": email,
        "password": password,
        "password_confirmation" : confirmPassword,
        "phone_number": phone_number,
      }
    };

    $.ajax({
      type: "POST",
      url: apiBaseUrl + "/users",
      headers: ajaxHeaders,
      data: data,
      dataType: "json",
      success: function(data) {
        // en cas de success
        console.log(data);
        var user = {
          email: data.email,
          token: data.authentication_token
        };
        // on sauvegarde en local l'email et le token d'authentification
        localStorage.setItem("user", JSON.stringify(user));
        $( "#logged" ).show();
        $( "#unlogged" ).hide();
      },

      error: function(jqXHR, status, text) {
        if (jqXHR.responseJSON.error) {
          // en cas d'ereur on affiche une notif contenant le message d'erreur
          $("#form_error")
            .show()
            .html(jqXHR.responseJSON.error);
        }
      }
    });
  };
});
