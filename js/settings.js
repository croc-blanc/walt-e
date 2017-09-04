// $(document).ready(function() {
//   var settings = {
//   phone_notification: undefined,
//   web_notification: undefined,
//   phone_number: undefined
//   };

//   var hash = {
//     reminder: settings
//   };

//   var ajaxHeaders = {
//     "X-User-Email": "gregoire.d@gmail.com",
//     "X-User-Token": "PdFyyk-v1TNpJxiyDo1z"
//   };

//   var apiBaseUrl = "https://walt-ia.herokuapp.com/api/v1";

//   // function handleReminders(reminders) {
//   //   var newReminders = []
//   //   // ajoute les reminders seulement si il ne sont pas encore passé
//   //   reminders.forEach(function(reminder) {
//   //     if (Date.parse(reminder.time) > Date.now()) {
//   //       newReminders.push(reminder)
//   //     }
//   //   });
//   //   // transforme l'array de reminders (JSON) en string
//   //   var stringify = JSON.stringify(newReminders);
//   //   console.log(stringify);
//   //   // appelle la fonction qui sauvegarde les données en local
//   //   storeReminder(stringify);

//   // };


//   // function storeReminder(reminder) {
//   //   // stocke chaque reminder en local storage dans une "variable" appelé "remindplusiduser"
//   //   localStorage.setItem("remindplusiduser", reminder);
//   //   // recupere les données locales (json stingify)
//   //   getStoredReminders();
//   // };

//   // function getStoredReminders() {
//   //   // recupere la stringify des reminders
//   //   var remindString = localStorage.getItem("remindplusiduser");
//   //   // appelle la fonction pour reconstruire le local storage en JSON
//   //   parseToJson(remindString);
//   // };

//   // function parseToJson(string){
//   //   // transforme la string du local storage en JSON
//   //   var remindJson = JSON.parse(string);
//   //   // envoie le JSON a la fonction qui check l'heure actuelle et l'heure du reminder
//   //   runRemindersTime(remindJson);
//   // };
// function handleSettings {
//     var newSettings = []
//         newSettings.push(submit.val())
//     var settingsStringify = JSON.stringify(newSettings);
//     console.log(settingsStringify);
//     // appelle la fonction qui sauvegarde les données en local
//     storeReminder(settingsStringify);

//   };

//   function storeSettings(settings) {
//     // stocke chaque reminder en local storage dans une "variable" appelé "remindplusiduser"
//     localStorage.setItem("settingsPlusId", settings);
//     // recupere les données locales (json stingify)
//     getStoredSettings();
//   };

//   function getStoredSettings() {
//     // recupere la stringify des reminders
//     var settingsString = localStorage.getItem("SettingsPlusId");
//     // appelle la fonction pour reconstruire le local storage en JSON
//     parseToJson(settingsString);
//   };

//   function parseToJsonSettings(string){
//     var settingsJson = JSON.parse(string);
// };



// function sendSettings() {
//     $.ajax({
//       type: "POST",
//       url: apiBaseUrl + "/reminders",
//       headers: ajaxHeaders,
//       data: settings,
//       success: function(data) {
//         console.log("POST Success: " + data);


//       },
//       error: function(jqXHR) {
//         console.error(jqXHR.responseText);
//       }
//     });
//   };
