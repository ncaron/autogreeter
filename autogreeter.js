document.addEventListener('DOMContentLoaded', function() {
  var autogreeterSettings = {
    default: [
      'Hello', 'Bonjour', 'Hola', 'Hei', 'Hallo', 'こんにちは',
    ' Здравствуйте', '你好', 'Merhaba', 'Χαίρετε', '안녕하세요'
    ],
    morning: [
      'Good Morning', 'Bonjour', 'Buonos Días', 'Hyvää Huomenta', 'Guten Morgen',
      'おはようございます', 'Доброе утро', '早上好', 'Günaydın', 'Καλημέρα', '좋은 아침'
    ],
    afternoon: [
      'Good Afternoon', 'Bonne Après-Midi', 'Buenas Tardes', 'Hyvää iltapäivää', 'Guten Nachmittag',
      'こんにちは', 'Добрый день', '下午好', 'Tünaydın', 'Καλό απόγευμα', '안녕하세요'
    ],
    evening: [
      'Good Evening', 'Bonsoir', 'Buena Noches', 'Hyvää iltaa', 'Guten Abend',
      'こんばんは', 'Добрый вечер', '晚上好', 'İyi akşamlar', 'Καλό απόγευμα', '안녕하세요'
    ],
    typeSpeed: 90,
    eraseSpeed: 100,
    cursorSpeed: 400,
    eraseDelay: 1600,
    restartDelay: 50,
  }

  var greetings = getGreetingsList();
  var unusedGreetingsList = greetings.slice();
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
  ** Gets the list of greetings based off the time of the day.
  */
  function getGreetingsList() {
    var date = new Date();
    var hour = date.getHours();
    var greetings;

    if (hour >= 5 && hour < 12) {
      greetings = autogreeterSettings.morning;
    } else if (hour >= 12 && hour < 18) {
      greetings = autogreeterSettings.afternoon;
    } else if (hour >= 18 || hour < 5) {
      greetings = autogreeterSettings.evening;
    } else {
      greetings = autogreeterSettings.default;
    }

    greetings = greetings || autogreeterSettings.default;

    return greetings.slice();
  }


  /*
  ** Randomly selects a greeting from the unsused list.
  ** Removes that greeting from the list and return it.
  */
  function getGreeting() {
    if (unusedGreetingsList.length === 0) {
      unusedGreetingsList = greetings.slice();
    }

    var greetingsIndex = Math.floor(Math.random() * unusedGreetingsList.length);

    return unusedGreetingsList.splice(greetingsIndex, 1)[0];
  }


  /*
  ** Input: String
  ** Displays the greeting to the screen, one letter at a time with the interval.
  ** Stops the interval and calls typeDecision on a setTimeout after the greeting is completely displayed.
  ** Starts a blinking cursor.
  ** The first if statement is to add the space at the same time as letter to prevent a jank look.
  */
  function displayGreeting(greeting) {
    var i = 0;

    var typeInterval = setInterval(function() {
      if (greeting[i] === ' ') {
        greetBox.textContent += greeting[i];
        i += 1;
      }
      
      greetBox.textContent += greeting[i];
      i += 1;

      if (greetBox.textContent === greeting) {
        clearInterval(typeInterval);

        cursorInterval = setInterval(function() {
          greetBox.classList.toggle('autogreeter-cursor');
        }, autogreeterSettings.cursorSpeed);

        setTimeout(typeDecision, autogreeterSettings.eraseDelay, true);
      }
    }, autogreeterSettings.typeSpeed);
  }


  /*
  ** Stops the cursor interval.
  ** Removes the greeting, one letter at a time with the interval.
  ** The first if statement is to remove the space at the same time as letter to prevent a jank look.
  */
  function removeGreeting() {
    clearInterval(cursorInterval);

    var removeTypeInterval = setInterval(function() {
      var toRemove = 1;

      if (greetBox.textContent[greetBox.textContent.length - 1] === ' ') {
        toRemove = 2;
      }

      greetBox.textContent = greetBox.textContent.substr(0, greetBox.textContent.length - toRemove);

      if (greetBox.textContent.length === 0) {
        clearInterval(removeTypeInterval);
        setTimeout(typeDecision, autogreeterSettings.restartDelay, false);
      }
    }, autogreeterSettings.eraseSpeed);
  }

  typeDecision(false);
});