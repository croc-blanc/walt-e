$( document ).ready(function() {
  // Appelle la fonction qui ce connecte à l'api en ajax
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();


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
    var newReminders = []
    reminders.forEach(function(reminder) {
      if (reminder.jstime > Date.now()) {
        newReminders.push(reminder)
      }
    });
    // transforme le json en string
    var stringify = JSON.stringify(newReminders);
    console.log(stringify);
    // appelle la fonction qui sauvegarde les données en local
    storeReminder(stringify);

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
      });

      notification.onclick = function () {
        window.open("http://www.wall-app.fr");
      };

    }

  }
});
