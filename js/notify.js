$(document).ready(function() {
    var remindersIntervalId;

    // si l'user est logger, on recupère le contenu du localstorage 'user' et recrer un objet
    if (localStorage.getItem("user") != null) {
        var ajaxHeaders = {
            "X-User-Email": JSON.parse(localStorage.getItem("user")).email,
            "X-User-Token": JSON.parse(localStorage.getItem("user")).token
        };
        // Appelle la fonction qui ce connecte à l'api en ajax au chargement de la page puis toute les 2 min
        backRequest();
        setInterval(function() {
            backRequest();
        }, 10 * 1000);
    };


    // var apiBaseUrl = "http://127.0.0.1:3000";
    var apiBaseUrl = "https://walt-ia.herokuapp.com";

    // check si les notifs sont disponible sur le navigateur
    if (!Notification) {
        alert('Les notifications ne sont pas disponible sur votre navigateur. Essayer Chromium.');
        return;
    }
    // si les notif sont desactive, demande l'autorisation de les activées
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }



    function backRequest() {
        $.ajax({
            // hender de connexion a l'api pour recevoir la liste des reminders
            type: "GET",
            url: apiBaseUrl + "/api/v1/reminders",
            headers: ajaxHeaders,
            success: function(data) {
                // appelle la fonction qui traitera les datas
                if (data != []) {
                    handleReminders(data);
                };
            },
            error: function(jqXHR) {
                console.log(jqXHR.responseText);
            }
        });
    }


    function handleReminders(reminders) {
      var newReminders = [];
            // ajoute les reminders seulement si il ne sont pas encore passé
        reminders.forEach(function(reminder) {
            if (Date.parse(reminder.time) > Date.now()) {
                newReminders.push(reminder)
            }
        });
        // transforme l'array de reminders (JSON) en string
        var stringify = JSON.stringify(newReminders);
        // appelle la fonction qui sauvegarde les données en local
        storeReminder(stringify);

    };


    function storeReminder(reminder) {
        // stocke tous reminder en local storage dans une "variable" appelé "remindplusiduser"
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

    function parseToJson(string) {
        // transforme la string du local storage en JSON
        var remindJson = JSON.parse(string);
        // envoie le JSON a la fonction qui check l'heure actuelle et l'heure du reminder
        console.log(remindJson);
        runRemindersTime(remindJson);
    };


    function runRemindersTime(reminders) {
      if (remindersIntervalId) {
        clearTimeout(remindersIntervalId);
      };

      remindersIntervalId = setInterval(function() {
            console.log(reminders);
            reminders.forEach(function(reminder, index) {
                // comparaison entre l'heure du reminder et l'heure actuelle si le reminder est dans le futur il est ajouter en local
                // A verifier si le reminder a un status notif false
                if (Date.parse(reminder.time) <= Date.now() + 5000) {
                    // affiche une notification si c'est l'heure
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

            notification.onclick = function() {
                //si on clique sur la notif, on appelle la fonction snooze
                snoozeNotif(reminder);
            };

        }

    }


    function snoozeNotif(reminder) {
        // transforme les attributs de du reminder a répéter avant de le transmettre au serveur
        reminder.time = new Date(Date.parse(reminder.time) + 60000);
        // la date du reminder est bien modifier, il faut rouver comment l'envoyer a newReminders
    };

});
