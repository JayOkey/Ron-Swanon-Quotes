;(function(d){

  "use strict";

  // Variables

  var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes',
      quotes = [],
      blockquote = d.querySelector('blockquote'),
      button = d.querySelector('button');

  // Functions

  var getJSON = function(response) {
    return (response.ok) ? response.json() : Promise.reject(response);
  };

  var rotateQuotes = function(quote) {
    quotes.shift();
    quotes.push(quote);
  }

  var checkQuote = function(data) {
    if (quotes.indexOf(data[0]) === -1) {
        quotes.push(data[0]);
      if (quotes.length < 5) {
        rotateQuotes(data[0]);
      }
    } else {
      getQuote();
    }
    return data;
  };

  var renderQuote = function(data) {
    blockquote.textContent = quotes[quotes.length - 1];
  };

  var renderError = function() {
    console.log('Unable to get quote');
  }

  var getQuote = function() {
    fetch(url)
      .then(getJSON)
      .then(checkQuote)
      .then(renderQuote)
      .catch(renderError);
  };

  // Run

  getQuote();

  button.addEventListener('click', getQuote, false);

})(document);