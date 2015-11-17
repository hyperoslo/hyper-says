document.addEventListener('DOMContentLoaded', function() {
  var currentQuote = null;
  var currentColor = null;

  var randomizeColor = function() {
    var colors = [180, 163, 205, 200, 168, 357, 297, 187, 319];

    do {
      var randomColor = colors[Math.floor(Math.random() * colors.length)];
    } while (currentColor && randomColor == currentColor);

    currentColor = randomColor;

    var body = document.querySelector('body');
    body.style.background = 'hsl(' + randomColor + ', 50%, 55%)';
  }

  var randomizeQuote = function() {
    do {
      var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (currentQuote && randomQuote.quote == currentQuote.quote);

    currentQuote = randomQuote;

    var blockquote = document.querySelector('blockquote');
    var quote = document.querySelector('.quote');
    var author = document.querySelector('.author');

    blockquote.classList.add("flipOutX");

    setTimeout(function() {
      quote.innerText = randomQuote.quote;
      author.innerText = "– " + randomQuote.author;
      blockquote.classList.remove("flipOutX");
      blockquote.classList.add("flipInX");
    }, 1000);
  }

  var startInterval = function() {
    return setInterval(function() {
      randomizeColor();
      randomizeQuote();
    }, 10 * 1000);
  };

  var interval = startInterval();

  var clickListener = function() {
    clearInterval(interval);

    // Prevent switching quote and color if event is triggered by text selection
    if (getSelection().toString()) return;

    randomizeColor();
    randomizeQuote();

    interval = startInterval();
  };

  function preventTextSelection(element) {
    var attributes = new Array();
    attributes["style"] = "-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;";
    attributes["unselectable"] = "on";
    attributes["onselectstart"] = "return false;";
    attributes["onmousedown"] = "return false;";
    
    for (attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute])
    }
  }

  var bodyElement = document.querySelector('body')
  preventTextSelection(bodyElement)
  bodyElement.addEventListener("click", clickListener);
  document.querySelector('blockquote').addEventListener("click", clickListener);

  randomizeColor();
  randomizeQuote();

  if(window.location.hash.toLowerCase() == "#tv") {
    document.querySelector(".links").style.display = 'none';
  }
});
