$( document ).ready(function() {
  // variable contenant les headers ainsi que l'url de connection a l'api
  var ajaxHeaders = {
    "accept": "application/json",
  };

  var apiBaseUrl = "http://localhost:3000";
  // on pose un micro sur le formulaire qui ecoute lorsque l'on clique sur submit
  $( "#new_user" ).on('submit', function(event) {
    // echape l'evenement par defaut du bouton submit
    event.preventDefault();
    // recupère le contenu des inputs
    var email = $("#user_email").val();
    var password = $("#user_password").val();
    var confirmPassword = $("#user_password_confirmation").val();

    // envoi les données à la fonction ajaxLogin pour tenter de se connecter
    ajaxLogin(email, password, confirmPassword);
  });

  function ajaxLogin(email, password, confirmPassword) {
    var data = {
      "user": {
        "email": email,
        "password": password,
        "password_confirmation" : confirmPassword
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
        var user = {
          email: data.email,
          token: data.authentication_token
        };
        // on sauvegarde en local l'email et le token d'authentification
        localStorage.setItem("user", JSON.stringify(user));
        $( "#logged" ).show();
        $( "#unlogged" ).hide();
        window.location.href = 'index.html';
      },

      error: function(jqXHR, status, text) {
        if (jqXHR.responseJSON.error) {
          // en cas d'ereur on affiche une notif contenant le message d'erreur
          // ne fonctionne pas ici
          $("#form_error_new_user")
            .show()
            .html(jqXHR.responseJSON.error);
        }
      }
    });
  };
});
