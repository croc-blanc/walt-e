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
      "url": "http://192.168.2.244:3000/api/v1/reminders",
      "X-User-Email": "gregoire.dupouy@gmail.com",
      "X-User-Token": "b7jKyzMbg3jc231n-qYD",
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
    // reminders.forEach(function(reminder) {
    //   // todo execute on each reminder
    // });
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
        if (remtime > Date.now() && remtime < Date.now() + 15000) {
          // affiche une notification si c'est l'heure
          notifyMe(reminder);
        }
      });
    }, 5 * 1000);
  }

  function notifyMe(reminder) {
    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      var notification = new Notification('Walt Notification', {
        icon: '/',
        body: "Hey there! You've been notified!",
      });

      notification.onclick = function () {
        window.open("http://stackoverflow.com/a/13328397/1269037");
      };

    }

  }
});
