const TIME_LIMIT = 20;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

const COLOR_CODES = {
  info: {
    color: 'green',
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD,
  },
};
let remainingPathColor = COLOR_CODES.info.color;
let FULL_DASH_ARRAY = 283;

function formatTimeLeft(time) {
  const minutes = Math.floor(time / 60);

  let seconds = ('' + (time % 60)).padStart(2, '0');

  return `${minutes}:${seconds}`;
}

function startTimer() {
  setCircleDashArray();
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;

      document.getElementById('base-timer-label').innerHTML =
        timePassed === TIME_LIMIT ? 'Finished!' : formatTimeLeft(timeLeft);
      setCircleDashArray();
      setRemainingPathColor(timeLeft);
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDashArray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById('base-timer-path-remaining')
    .setAttribute('stroke-dasharray', circleDasharray);
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;

  if (timeLeft <= alert.threshold) {
    document
      .getElementById('base-timer-path-remaining')
      .classList.remove(warning.color);
    document
      .getElementById('base-timer-path-remaining')
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById('base-timer-path-remaining')
      .classList.remove(info.color);
    document
      .getElementById('base-timer-path-remaining')
      .classList.add(warning.color);
  }
}

document.getElementById('app').innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283 283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">
    ${formatTimeLeft(timeLeft)}
  </span>
</div>
`;

// startTimer();
