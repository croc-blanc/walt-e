$( document ).ready(function() {
  // Appelle la fonction qui ce connecte à l'api en ajax
  backRequest();

  function backRequest(){
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/api/v1/reminders",
      email: "david.messagerie@hotmail.fr",
      authentication_token: "a6hYpzsfNJdYC6zEMxs3",
      success: function(data) {
        // appelle la fonction qui traitera les datas
        handleReminders(data);
      },
      error: function(jqXHR) {
        console.log(jqXHR.responseText);
      }
    });
  }


  function handleReminders(reminders) {
    // transforme le json en string
    var stringify = JSON.stringify(reminders);
    // appelle la fonction qui sauvegarde les données en local
    storeReminder(stringify);
    reminders.forEach(function(reminder) {
      // TODO execute on each reminder
    });
  };


  function storeReminder(reminder) {
    // stocke chaque reminder en local storage
    sessionStorage.setItem("remindplusiduser", reminder);
    // recupere les données locales (json stingify)
    getStoredReminders();
    // Maintenant il faut retransformer la string en json et creer une fonction qui itaire dessus toutes les x seconde
    // afin de vérifier si le time.now = reminder.time et reminder.date
    // attention car la variable ce stoke dans seesion storage au lieu de local storage
  };

  function getStoredReminders() {
    // recupere la stringify des reminders
    return sessionStorage.getItem("remindplusiduser");
  };


  function runRemindersTime(reminders) {
    setInterval(function() {
      // boucler sur chaque reminder
      // affiche une notification si c'est l'heure
    }, 60 * 1000);
  }
});




