$( document ).ready(function() {
  // Appelle la fonction qui ce connecte à l'api en ajax
  backRequest();

  function backRequest(){
    $.ajax({
      // pb unauthorized user wuand je ne suis pas connecter
      "type": "GET",
      "url": "http://localhost:3000/api/v1/reminders",
      "X-User-Email": "david.messagerie@hotmail.fr",
      "X-User-Token": "7MmXeMsK7UnWGQqLFvND",
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
    console.log(stringify);
    // appelle la fonction qui sauvegarde les données en local
    storeReminder(stringify);
    reminders.forEach(function(reminder) {
      // TODO execute on each reminder
    });
  };


  function storeReminder(reminder) {
    // stocke chaque reminder en local storage
    localStorage.setItem("remindplusiduser", reminder);
    // recupere les données locales (json stingify)
    getStoredReminders();
    // Maintenant il faut retransformer la string en json et creer une fonction qui itaire dessus toutes les x seconde
    // afin de vérifier si le time.now = reminder.time et reminder.date
    // attention car la variable ce stoke dans seesion storage au lieu de local storage
  };

  function getStoredReminders() {
    // recupere la stringify des reminders
    var remindString = localStorage.getItem("remindplusiduser");
    parseToJson(remindString);
  };

  function parseToJson(string){
    var remindJson = JSON.parse(string);
    runRemindersTime(remindJson);
  };


  function runRemindersTime(reminders) {
    setInterval(function() {
      reminders.forEach(function(reminder) {
        // Pour chaque element reconstruction d'une date au format JS
        var remtime = new Date(parseInt(reminder.jstime))
        var time = new Date(Date.now());
        // comparaison entre l'heure du reminder et l'heure actuelle
        if (remtime.getHours() == time.getHours() && remtime.getMinutes() == time.getMinutes()) {
          // affiche une notification si c'est l'heure
          alert("Vous avez un message qui contient" + reminder.content)
        }
      });
    }, 35 * 1000);
  }
});
