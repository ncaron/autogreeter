document.addEventListener('DOMContentLoaded', function() {
  var GREETINGS = [
    'Hello', 'Bonjour', 'Hola', 'Hei', 'Hallo', 'こんにちは',
  ' Здравствуйте', '你好', 'Merhaba', 'Χαίρετε', '안녕하세요'
  ];
  var TYPE_SPEED = 100;
  var ERASE_SPEED = 125;
  var CURSOR_SPEED = 400;
  var ERASE_DELAY = 1600;
  var RESTART_DELAY = 50;
  var unusedGreetingsList = resetGreetings();
  var greetBox = document.querySelector('.autogreeter-greeting');
  var cursorInterval;

  /*
  ** Input: Boolean
  ** Decides if the greeting should be removed or typed.
  */
  function typeDecision(isTyped) {
    if (isTyped) {
      removeGreeting();
    } else {
      displayGreeting(getGreeting());
    }
  }


  /*
  ** Resets the list of greetings when all greetings have been used.
  */
  function resetGreetings() {
    return GREETINGS.slice();
  }


  /*
  ** Randomly selects a greeting from the unsused list.
  ** Removes that greeting from the list and return it.
  */
  function getGreeting() {
    if (unusedGreetingsList.length === 0) {
      unusedGreetingsList = resetGreetings();
    }

    var greetingsIndex = Math.floor(Math.random() * unusedGreetingsList.length);

    return unusedGreetingsList.splice(greetingsIndex, 1)[0];
  }


  /*
  ** Input: String
  ** Displays the greeting to the screen, one letter at a time with the interval.
  ** Stops the interval and calls typeDecision on a setTimeout after the greeting is completely displayed.
  ** Starts a blinking cursor.
  */
  function displayGreeting(greeting) {
    var i = 0;

    var typeInterval = setInterval(function() {
      greetBox.textContent += greeting[i];
      i += 1;

      if (greetBox.textContent === greeting) {
        clearInterval(typeInterval);

        cursorInterval = setInterval(function() {
          greetBox.classList.toggle('autogreeter-cursor');
        }, CURSOR_SPEED);

        setTimeout(typeDecision, ERASE_DELAY, true);
      }
    }, TYPE_SPEED);
  }


  /*
  ** Stops the cursor interval.
  ** Removes the greeting, one letter at a time with the interval.
  */
  function removeGreeting() {
    clearInterval(cursorInterval);

    var removeTypeInterval = setInterval(function() {
      greetBox.textContent = greetBox.textContent.substr(0, greetBox.textContent.length - 1);

      if (greetBox.textContent.length === 0) {
        clearInterval(removeTypeInterval);
        setTimeout(typeDecision, RESTART_DELAY, false);
      }
    }, ERASE_SPEED);
  }

  typeDecision(false);
});