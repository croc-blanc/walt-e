$(document).ready(function(){
  var apiBaseUrl = "http://127.0.0.1:3000";
  // var apiBaseUrl = "https://walt-ia.herokuapp.com";
  var ajaxHeaders = {
      "X-User-Email": JSON.parse(localStorage.getItem("user")).email,
      "X-User-Token": JSON.parse(localStorage.getItem("user")).token
  };

  console.log("document ready on list.js");
  var remindersValues = [];
  var input = $("#txt_name").on("keyup", function(e) {
    console.log("list keyup");
    if(e.which == 13) {
      if(input.val() == 'list') {
        getStoredReminders();

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
    // comment ajouter l'image dans la div des reminders ?
    var del = $( '<img />' )
    del.attr("src", "/img/delete.png");
    var i = 100;
    reminders.forEach(function(reminder, index) {
      var r = $('<br>' + "<div class='btn_list' />' + '<img id='"+ index +"' src='/img/delete.png'/>'<br>").appendTo('#list').text('reminder' + ' ' + reminder.content + ' ' + reminder.date).hide();
      setTimeout(function() {
        r.fadeIn(500)
      }, i += 300);
      $('#'+index).click(function(){
        removable(reminder);
      });
    });
  };

  function removable(reminder) {
    $.ajax({
      type: "DELETE",
      url: apiBaseUrl + "/api/v1/reminders/"+reminder.id,
      headers: ajaxHeaders,
      success: function(data) {
        alert(reminder.content + " Has been removed : ");
      },
      error: function(jqXHR) {
        console.error(jqXHR.responseText);
      }
    });
  };
});

