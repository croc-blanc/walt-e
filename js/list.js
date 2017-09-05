$(document).ready(function() {
  setTimeout(function() {
    $("#txt_name").focus();
  }, 400 );



  console.log("document ready on list.js");
  var remindersValues = [];
  var input = $("#txt_name").on("keyup", function(e) {
    console.log("list keyup");
    if(e.which == 13) {
      if(input.val() == 'list') {
        $('#list').empty();
        getStoredReminders();
        input.val('');

      }
    }
  });



  function getStoredReminders() {
    // recupere la stringify des reminders
    var remindString = localStorage.getItem("remindplusiduser");
    console.log("getStoredReminders" + remindString);
    parseToJson(remindString);
  };

  function parseToJson(string){
    var remindJson = JSON.parse(string);
    console.log("parseToJson " + remindJson);
    if (!remindJson) {
      return;
    } else {
    showRemindersValue(remindJson);
  }
};


// create div and display reminder content and date for each reminder
  function showRemindersValue(reminders) {
    console.log("showRemindersValue " + reminders);
    var i = 100;
    reminders.forEach(function(reminder) {
      var r = $('<br>' + '<div class="btn_list" />' + '<br>').appendTo('#list').text('reminder' + ' ' + reminder.content.slice(0, 10) + ' ' + reminder.time).hide();
      setTimeout(function() {
        r.fadeIn(500)
      }, i += 300);

    });
  };
});
