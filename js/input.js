// $(document).ready(function(){
//   var input = $("#txt_name").keyup(function(e) {
//     if(e.which == 13) {
//       if(input.val() == 'reminder') {
//         $('#output').html(input.val());
//         $(this).val("");
//         $(this).attr("placeholder", "what do you want to remind to ?")
//       }
//     }
//   });
//         // if($('#output').val() == 'reminder') {
//         // $('#content_output').html(input.val());
//         // $(this).val("");

//         var new_input = $("#txt_name").keyup(function(e) {
//           if(e.which == 13) {
//             $('#content_output').html(input.val());
//             $(this).val("");



//           }






//         });
//         var new_input = $("#txt_name").keyup(function(e) {
//           if(e.which == 13) {

//           });

//   var input = $('#txt_name').val();
//   $('#txt_name').val(input);
// });


$(document).ready(function() {
  var input = $("#txt_name");
  var step = 1;
  var actionType;
  var action = {
    type: undefined,
    when: undefined,
    content: undefined
  };
  var hash = {
    reminder: action
  };

  input.on('keyup', function(event) {
    if (event.which != 13) {
      return;
    }

    console.log("Step : " + step);

    if (step == 1) {
      // valid and extract action type
      extractActionType();

      if (!action.type) {
        return;
      }

      stepAction();
      step++;
    } else if (step == 2) {
      stepMessage();
      step++;
    } else if (step == 3) {
      stepDate();
      sendAction();
    }

    input.val("");
  });



  function stepAction() {
    $('#output').html(actionType);

    if (actionType == "reminder", "remind", "remindme") {
      input.attr("placeholder", "what do you want to remind to ?");
    }
  }


  function stepMessage() {
    $('#content_output').html(input.val());
    action.content = input.val();
    input.attr("placeholder", "When do you want to be reminded ?");
  }


  function extractActionType() {
    var value = input.val();
    var validActions = ["reminder", "remind", "rappelle"];

    if (validActions.indexOf(value) >= 0) {
      action.type = value;
    }
    else {
      action.type = undefined;
    }
  }


  function stepDate() {
    $('#date_output').val(input.val());
    action.when = input.val();
  }


  function sendAction() {
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/v1/reminders",
      data: hash,
      success: function(data) {
        console.log("POST Success: " + data);

        resetForm();
      },
      error: function(jqXHR) {
        console.error(jqXHR.responseText);
      }
    });
  };

  function resetForm() {
    step = 1;
    input.attr("placeholder", "what do you want to remind to ?");
  }
});
