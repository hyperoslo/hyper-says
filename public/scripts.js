document.addEventListener("DOMContentLoaded", function() {
  var querySelector = document.querySelector.bind(document);

  function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function shuffle(array) {
    var index = -1;
    var length = array.length;
    var result = array.slice(0);

    while (++index < length) {
      var rand = random(index, length - 1);
      var value = result[rand];

      result[rand] = result[index];
      result[index] = value;
    }

    result.length = length;

    return result;
  }

  function rotate(array, fn) {
    var value = array.pop();

    fn(value);

    array.unshift(value);
  }

  function setBackground(color) {
    document.body.style.background = "hsl(" + color + ", 50%, 55%)";
  }

  function setQuote(quote) {
    var author = querySelector(".author");
    var blockquote = querySelector("blockquote");
    var content = querySelector(".quote");

    blockquote.classList.add("flipOutX");

    setTimeout(function() {
      author.textContent = "— " + quote.author;

      blockquote.classList.remove("flipOutX");
      blockquote.classList.add("flipInX");

      content.textContent = quote.quote;
      content.classList.add("notation");
    }, 1000);
  }

  var quotes = shuffle(window.quotes);
  var colors = shuffle([180, 163, 205, 200, 168, 357, 297, 187, 319]);

  function changeQuote() {
    // Prevent switching quote and color if event is triggered by text selection
    if (getSelection().toString()) return;

    rotate(colors, setBackground);
    rotate(quotes, setQuote);
  }

  var interval = null;

  var startInterval = function() {
    clearInterval(interval);

    changeQuote();

    interval = setInterval(changeQuote, 10000);
  };

  rotate(colors, setBackground);

  setTimeout(function() {
    startInterval();

    document.body.addEventListener("click", startInterval);
  }, 3000);

  if (window.location.hash.toLowerCase() === "#tv") {
    querySelector(".links").style.display = "none";
  }
});
