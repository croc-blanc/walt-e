$( document ).ready(function() {
  // check si les notifs sont disponible sur le navigateur
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }
  // si les notif sont desactive, demande l'autorisation de les activées
  if (Notification.permission !== "granted")
    Notification.requestPermission();

  // Appelle la fonction qui ce connecte à l'api en ajax
  backRequest();


  function backRequest(){
    $.ajax({
      // hender de connexion a l'api pour recevoir la liste des reminders
      type: "GET",
      url: "http://localhost:3000/api/v1/reminders",
      headers: {
        "X-User-Email": "david.messagerie@hotmail.fr",
        "X-User-Token": "PxLs6XsLKtnPeB87xDWP"
      },
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
    var newReminders = []
    // ajoute les reminders seulement si il ne sont pas encore passé
    reminders.forEach(function(reminder) {
      if (reminder.jstime > Date.now()) {
        newReminders.push(reminder)
      }
    });
    // transforme l'array de reminders (JSON) en string
    var stringify = JSON.stringify(newReminders);
    console.log(stringify);
    // appelle la fonction qui sauvegarde les données en local
    storeReminder(stringify);

  };


  function storeReminder(reminder) {
    // stocke chaque reminder en local storage dans une "variable" appelé "remindplusiduser"
    localStorage.setItem("remindplusiduser", reminder);
    // recupere les données locales (json stingify)
    getStoredReminders();
  };

  function getStoredReminders() {
    // recupere la stringify des reminders
    var remindString = localStorage.getItem("remindplusiduser");
    // appelle la fonction pour reconstruire le local storage en JSON
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
          notifyMe(reminder)
        }
      });
    }, 5 * 1000);
  }

  function notifyMe(reminder) {
    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      var notification = new Notification('Walt Notification', {
        icon: '/img/walt_128.png',
        body: reminder.content,
        sound: 'sound/walt.wav',
      });

      notification.onclick = function () {
        window.open("http://www.wall-app.fr");
      };

    }

  }
});
