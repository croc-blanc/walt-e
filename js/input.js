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

    "X-User-Email": "gregoire.d@gmail.com",
    "X-User-Token": "PdFyyk-v1TNpJxiyDo1z"
  };

  var apiBaseUrl = "https://walt-ia.herokuapp.com/api/v1";



  input.on('keyup', function(event) {
    if (event.which != 13) {
      return;
      // here the key up function (enter on keyboard) "declenche" some actions (step 1, then 2, then 3)
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
      resetForm();
    }

    input.val("");
  });



  function stepAction() {

    // here I display the when input in html(class="date_output") with some cool effect (show)
    // if the input match with actionType
    // also i attribute the value to the variable action to send it in ajax
    // also change placeholder

    if (actionType == "reminder", "remind", "remindme") {
      var remind = $('#output').html(input.val());
      remind.hide();
      if (remind.is( ":hidden" )) {
        remind.show("slow");
      }
      input.attr("placeholder", "What       ?");
    }
  }


  function stepMessage() {

    // here I display the conten input in html(class="content_output") with some cool effect (show),
    // also i attribute the value to the variable action to send it in ajax
    // also change placeholder
    var message = $('#content_output').html(input.val());
    message.hide();
    if (message.is( ":hidden" )) {

      message.show("slow");
    }


    action.content = input.val();
    input.attr("placeholder", "When       ?");
  }


  function extractActionType() {
    // check if the input is correct and assign that value to action.type (to save it in rails)
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

    // here I display the when input in html(class="date_output") with some cool effect (show),
    // also i attribute the value to the variable action to send it in ajax
    var date_display = $('#date_output').html(input.val());
    date_display.hide();
    if (date_display.is( ":hidden" )) {

      date_display.show("slow");
    }
    action.when = input.val();
  }


  function sendAction() {

    // send to rails informations about one reminder to save it and get feedback about the when action
    $.ajax({
      type: "POST",
      url: apiBaseUrl + "/reminders",
      headers: ajaxHeaders,
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
  // var date_display = $('#date_output').val();
  // var message_display = $('#content_output').val();
  // var action_display = $('#output').val();
  // date_display.slideDown();

    step = 1;
    input.attr("placeholder", "Action       ?");
  }
});
