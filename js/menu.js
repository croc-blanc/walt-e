$(function() {

    // Dropdown toggle
    $('.dropdown-toggle').click(function() {
        $(this).next('.dropdown').toggle();
        if (localStorage.getItem("settingsPlusId") != null) {
            var settings = JSON.parse(localStorage.getItem("settingsPlusId"));
            $('#phone_number').val(settings.phone_number);
            $('#phone_notification').prop('checked', settings.phone_notification);
            $('#web_notification').prop('checked', settings.web_notification)
        } else {
            $('#web_notification').prop('checked', true);
        }
    })
});