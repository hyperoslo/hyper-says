document.addEventListener('DOMContentLoaded', function() {
  var querySelector = document.querySelector.bind(document);
  var canvas = querySelector('#canvas');
  var canvasCtx = canvas.getContext('2d');
  var showTalkingHeads = false;
  var canvasInterval = null;

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
    document.body.style.background = 'hsl(' + color + ', 50%, 55%)';
  }

  function setQuote(quote) {
    var author = querySelector('.author');
    var blockquote = querySelector('blockquote');
    var content = querySelector('.quote');

    if (showTalkingHeads) {
      hideTalkingHead();
      setTimeout(function() {
        showTalkingHead(quote.author, quote.quote);
      }, 1000);
    } else {
      hideTalkingHead();
    }

    blockquote.classList.add('flipOutX');

    setTimeout(function() {
      author.textContent = '— ' + quote.author;

      blockquote.classList.remove('flipOutX');
      blockquote.classList.add('flipInX');

      content.textContent = quote.quote;
      content.classList.add('notation');
    }, 1000);
  }

  function showTalkingHead(author, quote) {
    canvas.style.visibility = 'visible';

    var img = new Image();
    var author = author.toLowerCase();

    img.onload = function() { makeAuthorTalk(this, author, quote) };
    img.src = 'images/faces/' + author.toLowerCase() + '.png';
  }

  function muteTalkingHead() {
    clearInterval(canvasInterval);
  }

  function hideTalkingHead() {
    muteTalkingHead();
    canvas.style.visibility = 'hidden';
  }

  function makeAuthorTalk(img, author, quote) {
    canvas.width = img.width;
    canvas.height = img.height;
    var said = false

    canvasInterval = setInterval(function() {
      authorMakeTalking(img, author);

      if (!said) {
        var synth = window.speechSynthesis;
        var utterance = new SpeechSynthesisUtterance(quote);
        utterance.onend = muteTalkingHead;
        synth.speak(utterance);
        said = true
      }
    }, 300);
  }

  function authorMakeTalking(img, author) {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.drawImage(img, 0, 0);

    var coords = faces[author];
    var data = canvasCtx.getImageData(
      coords.x, coords.y, coords.width, coords.height
    );

    canvasCtx.fillRect(coords.x, coords.y, coords.width, coords.height);
    canvasCtx.putImageData(data, coords.x, coords.y + 5);

    setTimeout(function() {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.drawImage(img, 0, 0);
    }, Math.floor((Math.random() * 200) + 100))
  }

  var quotes = shuffle(window.quotes);
  var colors = shuffle([180, 163, 205, 200, 168, 357, 297, 187, 319]);

  // Change to the given quote.
  //
  // index - An Integer describing the index of a particular quote, or falsy
  //         for a random quote.
  function changeQuote(index) {
    // Prevent switching quote and color if event is triggered by text selection
    if (getSelection().toString()) return;

    rotate(colors, setBackground);

    if (index) {
      setQuote(window.quotes[index]);
    } else {
      rotate(quotes, setQuote);
    }
  }

  var interval = null;

  var startInterval = function() {
    clearInterval(interval);

    changeQuote();

    interval = setInterval(changeQuote, 10000);
  };

  if (window.location.hash.startsWith('#q=')) {
    var index = window.location.hash.match(/#q=([0-9]+)/)[1];
    changeQuote(index);
  } else {
    rotate(colors, setBackground);

    setTimeout(function() {
      startInterval();

      document.body.addEventListener('click', startInterval);
    }, 3000);
  }

  if (window.location.hash.toLowerCase() === '#tv') {
    querySelector('.links').style.display = 'none';
  }

  querySelector('.sound img').addEventListener('click', function() {
    showTalkingHeads = !showTalkingHeads;
    this.src = showTalkingHeads ? 'images/sound.png' : 'images/mute.png';
  });
});
