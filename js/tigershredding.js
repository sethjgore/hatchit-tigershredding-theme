conditionizr.add('ios', [], function () {
  return /iP(ad|hone|od)/i.test(navigator.userAgent);
});

conditionizr.add('mac', [], function () {
    return /mac/i.test(navigator.platform);
});

conditionizr.load('wp-content/themes/tigershredding/js/ios.js', ['ios']);

$(document).ready(function() {

  $("#slider").owlCarousel({
    navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
      autoPlay: 2250,
      stopOnHover: true
  });

  $("#nav-toggle").click(function(){
    $(".nav__flexbox").toggleClass("j-checked");
  });

});