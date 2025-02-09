 let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const lapTimes = document.getElementById('lap-times');


function formatTime(time) {
  const date = new Date(time);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}


function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}


function startStopwatch() {
  if (isRunning) return;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateDisplay, 10);
  isRunning = true;
}

// Pause the stopwatch
function pauseStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  startTime = 0;
  isRunning = false;
  display.textContent = '00:00:00.000';
  lapTimes.innerHTML = '';
}

// Record a lap time
function recordLap() {
  if (!isRunning) return;
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapTimes.childElementCount + 1}: ${lapTime}`;
  lapTimes.appendChild(lapItem);
}
