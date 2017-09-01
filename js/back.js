$( document ).ready(function() {

  if (localStorage.getItem("user") != null){
    $( "#login" ).hide();
  }
  else{
    $( "#login" ).show();
  };

});
