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
        var remtime = parseInt(reminder.jstime)
        // comparaison entre l'heure du reminder et l'heure actuelle
        if (remtime > Date.now() && remtime < Date.now() + 8000) {
          // affiche une notification si c'est l'heure
          alert("Vous avez un message qui contient" + reminder.content)
        }
      });
    }, 5 * 1000);
  }
});
