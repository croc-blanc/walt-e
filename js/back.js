$(document).ready(function() {
    if (localStorage.getItem("user") != null) {
        $("#style1").attr("disabled", "disabled");
        $("#logged").show();
        $("#unlogged").hide();
        // $("#unlogged").css("display", "none");
        $('body').css({"width": "500px", "height": "50px"})
    } else {
        $("#logged").hide();
        // $("#logged").css("display", "none");
        $("#unlogged").show();
        // $('head:first').append('')
        $('body').css({"width": "300px", "height": "200px"})

    };

});
