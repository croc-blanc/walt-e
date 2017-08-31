$( "#popup2" ).click(function(e) {
  e.eventDefault();
  console.log('popup');
chrome.windows.create({url: "http://www.google.fr"});
});
