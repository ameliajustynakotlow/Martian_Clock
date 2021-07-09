// boolean to prevent theme from automatically switching when user has switched the theme
var forceClockTheme = false;

// Function to show time in hours, minutes and seconds in html based on date object
function showCurrentTime() {
  var date = new Date();

  // Always get two digit hours, minutes and seconds
  var hours = getDoubleDigitsTime(date.getHours());
  var minutes = getDoubleDigitsTime(date.getMinutes());
  var seconds = getDoubleDigitsTime(date.getSeconds());

  var time = hours + ":" + minutes + ":" + seconds;
  var martianClock = document.getElementById('martian-clock');

  martianClock.innerHTML = time;
}

// Function to check if passed time digit has one or two digits (always 1 digit when < 10)
// If single digit, then add 0 before the single digit to make it double
function getDoubleDigitsTime(timeDigit) {
  var doubleTimeDigit;

  if (timeDigit < 10) {
    doubleTimeDigit = '0' + timeDigit;
  } else {
    doubleTimeDigit = timeDigit;
  }

  return doubleTimeDigit;
}

// Change the background image based on passed day part
function changeBackgroundImage(dayPart) {
  var backgroundImage = document.getElementById('background-image');

  if (dayPart == 'day') {
    backgroundImage.style.backgroundImage = "url('images/day_background.png')";
  } else {
    backgroundImage.style.backgroundImage = "url('images/night_background.jpg')";
  }
}

// Force change the theme when user clicks a button
// Set forceClockTheme to true to prevent martianClock loop from setting back to theme based on time
function forceChangeTheme(dayPart) {
  forceClockTheme = true;
  changeBackgroundImage(dayPart);
}

document.getElementById('day-button').onclick = function() {
  forceChangeTheme('day');
};

document.getElementById('night-button').onclick = function() {
  forceChangeTheme('night');
};

// Return current day part (day or night) based on current hour
// If current hour is between 6 or 20 then it is day
// Else it is night
function getCurrentDayPart() {
  var dateHours = new Date().getHours();
  var dayPart;

  if (dateHours > 6 && dateHours < 20) {
    dayPart = 'day';
  } else {
    dayPart = 'night';
  }

  return dayPart;
}

// Start martian clock and call showCurrentTime every second
var startMartianClock = setInterval(function() {
  showCurrentTime();

  // Only change theme based on time when user has not forced a change in theme
  if (!forceClockTheme) {
    var currentDayPart = getCurrentDayPart();
    changeBackgroundImage(currentDayPart);
  }
}, 1000);
