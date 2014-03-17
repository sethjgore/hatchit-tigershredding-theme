$(document).ready(function() {

  $("#slider").owlCarousel({
    navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
  });

  $("#nav-toggle").click(function(){
    $(".nav__flexbox").toggleClass("j-checked");
  });

});