$( document ).ready(function() {
  var ajaxHeaders = {
    "X-User-Email": "david.messagerie@hotmail.fr",
    "X-User-Token": "EC7PCx-eKZFMtBGBuWS7"
  };

  var apiBaseUrl = "http://localhost:3000/api/v1";

  // check si les notifs sont disponible sur le navigateur
  if (!Notification) {
    alert('Les notifications ne sont pas disponible sur votre navigateur. Essayer Chromium.');
    return;
  }
  // si les notif sont desactive, demande l'autorisation de les activées
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  // Appelle la fonction qui ce connecte à l'api en ajax au chargement de la page puis toute les 2 min
  backRequest();
  setInterval(function() {
    backRequest();
  }, 120 * 1000);



  function backRequest(){
    $.ajax({
      // hender de connexion a l'api pour recevoir la liste des reminders
      type: "GET",
      url: apiBaseUrl + "/reminders",
      headers: ajaxHeaders,
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
      if (Date.parse(reminder.time) > Date.now()) {
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
    // transforme la string du local storage en JSON
    var remindJson = JSON.parse(string);
    // envoie le JSON a la fonction qui check l'heure actuelle et l'heure du reminder
    runRemindersTime(remindJson);
  };


  function runRemindersTime(reminders) {
    setInterval(function() {
      reminders.forEach(function(reminder, index) {
        console.log(index);
        console.log(reminder);
        console.log("--------------------------");
        // comparaison entre l'heure du reminder et l'heure actuelle
        if (Date.parse(reminder.time) <= Date.now() + 15000) {
          // affiche une notification si c'est l'heure
          console.log("notification");
          notifyMe(reminder);
          reminders.splice(index, 1);
        }
      });
    }, 5 * 1000);
  }
  // fonction de notification
  function notifyMe(reminder) {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      var notification = new Notification('Walt Notification', {
        icon: '/img/walt_128.png',
        body: reminder.content,
        sound: 'sound/walt.wav',
      });

      notification.onclick = function () {
        // si on clique sur la notif, on appelle la fonction snooze
        // snoozeNotif(reminder);
      };

    }

  }


  // function snoozeNotif(reminder) {
  //   // transforme les attributs de du reminder a répéter avant de le transmettre au serveur
  //   var newTime = parseInt(reminder.jstime) + 30000; // snooze pour 30 sec
  //   reminder.jstime = newTime;
  //   reminder.id = null;
  //   reminder.time = null;
  //   var action = {
  //     type: undefined,
  //     when: undefined,
  //     content: undefined
  //   };
  //   var hash = {
  //     reminder: action
  //   };
  //   $.ajax({
  //     type: "POST",
  //     url: apiBaseUrl + "/reminders",
  //     headers: ajaxHeaders,
  //     data: reminder,
  //     success: function(data) {
  //       console.log("SNOOZE Success: " + data);
  //       alert("La répétition dans 5 min à était activé");
  //     },
  //     error: function(jqXHR) {
  //       console.error(jqXHR.responseText);
  //       alert("Une erreur est survenue :" + jqXHR.responseText)
  //     }
  //   });
  // };

});
