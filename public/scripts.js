$(document).ready(function() {
  var currentQuote = null;
  var currentColor = null;

  var randomizeColor = function() {
    var colors = [180, 163, 205, 200, 168, 357, 297, 187, 319];

    do {
      var randomColor = colors[Math.floor(Math.random()*colors.length)];
    } while (currentColor && randomColor == currentColor);

    currentColor = randomColor;

    $("body").css({
      background: 'hsl(' + randomColor + ', 50%, 55%)'
    });
  }

  var randomizeQuote = function() {
    do {
      var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
    } while (currentQuote && randomQuote.quote == currentQuote.quote);

    currentQuote = randomQuote;

    $("blockquote").addClass("flipOutX");

    setTimeout(function() {
      $(".quote").text(randomQuote.quote);
      $(".author").text("– " + randomQuote.author);
      $("blockquote").removeClass("flipOutX");
      $("blockquote").addClass("flipInX");
    }, 1000);
  }

  $("body, blockquote").on("click", function() {
    randomizeColor();
    randomizeQuote();
  });

  randomizeColor();
  randomizeQuote();

  if(window.location.hash == "#tv") {
    $(".links").hide();

    var interval = setInterval(function() {
      randomizeColor();
      randomizeQuote();
    }, 30 * 1000);
  }
});
