$( document ).ready(function() {
  if (localStorage.getItem("user") != null){
    $( "#logged" ).show();
    $( "#unlogged" ).hide();
    $('body').css(["width: 500px", "height: 50px;"])
  }
  else{
    $( "#logged" ).hide();
    $( "#unlogged" ).show();
    $('body').css(["width: 300px", "height: 200px;"])
  };

});



