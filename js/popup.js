$( document ).ready(function() {
  $( "#popup" ).click(function(e) {
    e.preventDefault();
    console.log('popup');
       chrome.windows.create({'url': 'log_in.html', 'type': 'popup', height: 200, width:200}, function(window) {
    });
  });
});
