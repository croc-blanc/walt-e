$(document).ready(function(){
  console.log("document ready on list.js");
  var remindersValues = [];
  var input = $("#txt_name").on("keyup", function(e) {
    console.log("list keyup");
    if(e.which == 13) {
      if(input.val() == 'list') {
        getStoredReminders();

        // $('#output').html(input.val());
        // $(this).val("");
      }
    }
  });



  function getStoredReminders() {
    // recupere la stringify des reminders
    var remindString = localStorage.getItem("remindplusiduser");
    console.log("getStoredReminders " + remindString);
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
    reminders.forEach(function(reminder) {
      $('<br>' + '<div class="btn_list_content" />' + '<br>').appendTo('#list').text(reminder.content + '   ' + reminder.date)
    });
  };
});
