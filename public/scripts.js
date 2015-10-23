$(document).ready(function() {
  var randomizeColor = function() {
    var colors = [180, 163, 205, 200, 168, 357, 297, 187, 319];
    var randomColor = colors[Math.floor(Math.random()*colors.length)];

    $("body").css({
      background: 'hsl(' + randomColor + ', 50%, 55%)'
    });
  }

  var randomizeQuote = function() {
    var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];

    $(".quote").text(randomQuote.quote);
    $(".author").text(randomQuote.author);
  }

  $("body, blockquote").on("click", function() {
    randomizeColor();
    randomizeQuote();
  });

  randomizeColor();
  randomizeQuote();
});
