$(document).ready(function(){
  var input = $("#txt_name").keyup(function(e) {
    if(e.which == 13) {
      if(input.val() == 'list') {




        // $('#output').html(input.val());
        // $(this).val("");
      }
    }
  }



  function getStoredReminders() {
    // recupere la stringify des reminders
    var remindString = localStorage.getItem("remindplusiduser");
    parseToJson(remindString);
  };

  function parseToJson(string){
    var remindJson = JSON.parse(string);
    listReminder(remindJson)
  };

  function listReminder(reminders) {
   reminders.forEach(function(element) {
    for (var i = 0; i < element.d.length; i++) {
      alert(element.d[i].content);
    }
  }
};


});


 //  function stepDate() {
 //   var valentin = {"type": "reminder", "content": $('#content_output').val(), "date": $('#date_output').val()}
 //   $.ajax({
 //    type: "Post",
 //    url: "https://api/v1/reminders",
 //    data: valentin
 //    success: function(data) {
 //      $('#date_output').html(input.val());
 //      input.attr("placeholder", "what do you want to remind to ?");
 //    },
 //    error: function(jqXHR) {
 //      console.error(jqXHR.responseText);
 //    }
 //  });
 // }
