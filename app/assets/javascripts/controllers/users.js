$(document).on('ready page:load', function () {
  $('.submenu').hide();

  $('.graphs-trigger').bind('click', function(e){
    $('.submenu').hide();
    $('.graphs-submenu').slideToggle('fast'); 
   // apply the toggle to the ul
    $(this).parent().toggleClass('is-expanded');
    e.preventDefault();
  });

  $('.maps-trigger').bind('click', function(e){
    $('.submenu').hide();
    $('.maps-submenu').slideToggle('fast'); 
   // apply the toggle to the ul
    $(this).parent().toggleClass('is-expanded');
    e.preventDefault();
  });
});