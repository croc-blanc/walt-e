// $(document).ready(function(){
// $('.dropdown').on('show.bs.dropdown', function() {
//     $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
//   });
// $('.dropdown').on('hide.bs.dropdown', function() {
//     $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
//   });
// });

$(function() {

    // Dropdown toggle
    $('.dropdown-toggle').click(function() {
        $(this).next('.dropdown').toggle();
    })
});
