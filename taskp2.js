let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

startPauseButton.addEventListener('click', () => {
    if (running) {
        pause();
    } else {
        start();
    }
});

resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    running = true;
    startPauseButton.textContent = 'Pause';
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
}

function pause() {
    running = false;
    startPauseButton.textContent = 'Start';
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
}

function reset() {
    running = false;
    clearInterval(timerInterval);
    startPauseButton.textContent = 'Start';
    elapsedTime = 0;
    display.textContent = '00:00:00.000';
    laps.innerHTML = '';
}

function recordLap() {
    const lapTime = formatTime(Date.now() - startTime);
    const li = document.createElement('li');
    li.textContent = lapTime;
    laps.appendChild(li);
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(num, size = 2) {
    let s = "000" + num;
    return s.substr(s.length - size);
}
