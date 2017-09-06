$(document).ready(function() {
    $('#submit_settings').on("click", function() {
        $('.dropdown-toggle').next('.dropdown').toggle();
    });

    // si l'user est logger, on recupère le contenu du localstorage 'user' et recrer un objet
    if (localStorage.getItem("user") != null) {
        var ajaxHeaders = {
            "X-User-Email": JSON.parse(localStorage.getItem("user")).email,
            "X-User-Token": JSON.parse(localStorage.getItem("user")).token
        };
    };


    var localsettings = getSettings();
    var newSettings = {};
    var input = $("#txt_name");
    var step = 1;
    var actionType;
    var validated = $('#done').hide();
    var action = {
        phone_number: localsettings.phone_number,
        web_notification: localsettings.web_notification,
        phone_notification: localsettings.phone_notification,
        type: undefined,
        when: undefined,
        content: undefined
    };

    var hash = {
        reminder: action
    };

    //var apiBaseUrl = "http://127.0.0.1:3000";
    var apiBaseUrl = "https://walt-ia.herokuapp.com";


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
        }

        input.val("");
    });



    function stepAction() {
        // here I display the when input in html(class="date_output") with some cool effect (show)
        // if the input match with actionType
        // also i attribute the value to the variable action to send it in ajax
        // also change placeholder

        if (actionType == "reminder", "remind", "remindme", "Reminder", "REMINDER", "rappelle moi", "rappel moi", "memo") {
            var remind = $('#output').html(input.val());
            $('#list').empty();
            remind.hide();

            remind.fadeIn();
            input.attr("placeholder", "What ?");

        }
    };


    function stepMessage() {
        // here I display the conten input in html(class="content_output") with some cool effect (show),
        // also i attribute the value to the variable action to send it in ajax
        // also change placeholder
        action.content = input.val();
        input.attr("placeholder", "When ?");

        // debugger;
        if (input.val().length > 25) { 
            var messageTextSliced = input.val().slice(0, 20);
            var message = $('#content_output').html(messageTextSliced);
        } else {
            var messageText = input.val();
            var message = $('#content_output').html(messageText);
        }

        message.hide();
        message.fadeIn();
    };


    function extractActionType() {
        // check if the input is correct and assign that value to action.type (to save it in rails)
        var value = input.val();
        var validActions = ["reminder", "remind", "rappelle moi", "rappel moi", "REMIND", "REMINDER", "Remind", "rappel-moi", "memo"];

        if (validActions.indexOf(value) >= 0) {
            action.type = value;
        } else {
            action.type = undefined;
        }
    };


    function stepDate() {
        // here I display the when input in html(class="date_output") with some cool effect (show),
        // also i attribute the value to the variable action to send it in ajax
        var date_display = $('#date_output').html(input.val());
        $('#date_output').hide();

        $('#date_output').fadeIn();

        action.when = input.val();
    };


    function sendAction() {
        // send to rails informations about one reminder to save it and get feedback about the when action
        var data = hash;
        $.ajax({
            type: "POST",
            url: apiBaseUrl + "/api/v1/reminders",
            headers: ajaxHeaders,
            data: data,
            success: function(data) {
                hideButtons();
                console.log("POST Success: " + data);


            },
            error: function(jqXHR) {
                console.error(jqXHR.responseText);
            }
        });
    };

    function hideButtons() {
        setTimeout(function() {
            $('#output').fadeOut(300) + $('#content_output').fadeOut(300) + $('#date_output').fadeOut(300)
        }, 700);

        setTimeout(function() {
            $('#done').fadeIn(800)
        }, 1200);

        setTimeout(function() {
            $('#done').fadeOut(1600)
        }, 2500);


        step = 1;
        input.attr("placeholder", "Action ?");
    };

    $('#submit_settings').click(function() {
        newSettings["phone_number"] = $('#phone_number').val();
        newSettings["phone_notification"] = $('#phone_notification').prop('checked');
        newSettings["web_notification"] = $('#web_notification').prop('checked');
        window.location.reload();
        console.log(newSettings);

        storeSettings();
    });

    function storeSettings() {
        // stock settings en local storage dans une "variable" appelé "settingsPlusId"
        localStorage.setItem("settingsPlusId", JSON.stringify(newSettings));
    };

    function getSettings() {
        var str = localStorage.getItem("settingsPlusId");
        if (str) {
            return JSON.parse(str);
        } else {
            return {
                "phone_number": "",
                "web_notification": true,
                "phone_notification": false,
            };
        }
    }
});