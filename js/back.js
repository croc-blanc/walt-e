$( document ).ready(function() {
  if (localStorage.getItem("user") == null){
    $( "#logged" ).hide();
    $( "#unlogged" ).show();
  }
  else{
    $( "#logged" ).show();
    $( "#unlogged" ).hide();
  };

});
