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
  var ajaxHeaders = {
    "X-User-Email": "david.messagerie@hotmail.fr",
    "X-User-Token": "EC7PCx-eKZFMtBGBuWS7"
  };

  var apiBaseUrl = "http://localhost:3000/api/v1";

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
    $('#output').html(input.val());

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
    $('#date_output').html(input.val());
    action.when = input.val();
  }


  function sendAction() {
    $.ajax({
      type: "POST",
<<<<<<< HEAD
      url: "http://localhost:3000/api/v1/reminders",
       headers: {
        "X-User-Email": "va@gmail.com",
        "X-User-Token": "nxfSiWuh7zwc9XvxX4k3"
      },
=======
      url: apiBaseUrl + "/reminders",
      headers: ajaxHeaders,
>>>>>>> 47711b284d92356ba0baaec783233e5544b762ee
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
