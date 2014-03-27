conditionizr.add('ios', [], function () {
  return /iP(ad|hone|od)/i.test(navigator.userAgent);
});

conditionizr.load('wp-content/themes/tigershredding/js/ios.js', ['ios']);

$(document).ready(function() {

  $("#slider").owlCarousel({
    navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
      autoPlay: 10000,
      stopOnHover: true
  });

  $("#nav-toggle").click(function(){
    $(".nav__flexbox").toggleClass("j-checked");
  });

  $("#nav-toggle-bar").click(function(){
    $(".nav__flexbox").toggleClass("j-checked");
  });
});