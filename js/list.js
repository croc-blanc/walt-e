$(document).ready(function() {
    setTimeout(function() {
        // un bot click sur le champ input
        $("#txt_name").focus();
    }, 400);
    var remindersValues = [];
    // when entrer list ===> 
    var input = $("#txt_name").on("keyup", function(e) {
        console.log("list keyup");
        if (e.which == 13) {
            if (input.val() == 'list') {
                // efface la list si existante
                $('#list').empty();
                // reccupere les reminder storé 
                getStoredReminders();
                // clear le champs input 
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

    function parseToJson(string) {
        // parse les reminders pour pouvoir les envoyer en json 
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
        var i = 100;
        reminders.forEach(function(reminder, index) {
            // get the time of the reminder and set it in JS TIME
            var jsTime = new Date(reminder.time);
            // create a string to format the JS Time into Human Time
            var displayText = reminder.content.slice(0, 20) + ' | ' + jsTime.getDate() + "/" + jsTime.getMonth() + "/" + jsTime.getFullYear() + " | " + jsTime.getHours() + "h" + jsTime.getMinutes();
            // create a varibla to contain all element to display
            var r = $('<div id="container-' + reminder.id + '"><br>' + '<div class="btn_list">' + '<div>' + displayText + '</div>' + '<img class="delete-cross" id="delete-' + reminder.id + '" src="/img/delete.png"/>' + '</div>' + '<br> </div>').appendTo('#list').hide();
            setTimeout(function() {
                r.fadeIn(500)
            }, i += 300);
            // get the good element to remove it
            $('#delete-' + reminder.id).click(function() {
                $("#container-" + reminder.id).slideUp("slow", function() {
                    // Animation complete.
                });
                // call the function to remove the reminder in database 
                removable(reminder);
            });
        });
    };

    function removable(reminder) {

        // var apiBaseUrl = "http://127.0.0.1:3000";
        var apiBaseUrl = "https://walt-ia.herokuapp.com";
        var ajaxHeaders = {
            "X-User-Email": JSON.parse(localStorage.getItem("user")).email,
            "X-User-Token": JSON.parse(localStorage.getItem("user")).token
        };

        $.ajax({
            type: "DELETE",
            url: apiBaseUrl + "/api/v1/reminders/" + reminder.id,
            headers: ajaxHeaders,
            success: function(data) {
                // alert(reminder.content + " Has been removed : ");
            },
            error: function(jqXHR) {
                console.error(jqXHR.responseText);
            }
        });
    };
});