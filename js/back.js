$( document ).ready(function() {
  if (localStorage.getItem("user") != null){
    $( "#logged" ).show();
    $( "#unlogged" ).hide();
  }
  else{
    $( "#logged" ).hide();
    $( "#unlogged" ).show();
  };

});
