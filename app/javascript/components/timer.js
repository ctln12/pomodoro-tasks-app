import Timer from 'easytimer.js';

const countdownTimer = () => {
  const countdownElement = document.querySelector('.countdown-timer');

  if (countdownElement) {
    const startBtn = document.getElementById('start');
    const pauseBtn = document.getElementById('pause');
    const stopBtn = document.getElementById('stop');
    const minutesElement = document.querySelector('.minutes');
    const secondsElement = document.querySelector('.seconds');
    const min = parseInt(minutesElement.innerText);

    const setTimer = (minutesElement, secondsElement) => {
      minutesElement.innerText = timer.getTimeValues().toString(['minutes']);
      secondsElement.innerText = timer.getTimeValues().toString(['seconds']);
    };

    const timer = new Timer({countdown: true, startValues: {minutes: min, seconds: 0}, precision: 'seconds'});

    startBtn.addEventListener('click', () => {
      timer.start();
      startBtn.classList.add('hide-control');
      pauseBtn.classList.remove('hide-control');
      stopBtn.classList.remove('hide-control');
    });
    pauseBtn.addEventListener('click', () => {
      timer.pause();
      startBtn.classList.remove('hide-control');
      pauseBtn.classList.add('hide-control');
    });
    stopBtn.addEventListener('click', () => {
      timer.reset();
      timer.stop();
      startBtn.classList.remove('hide-control');
      pauseBtn.classList.add('hide-control');
      stopBtn.classList.add('hide-control');
    });

    timer.addEventListener('secondsUpdated', () => {
      setTimer(minutesElement, secondsElement);
    });
    timer.addEventListener('started', () => {
      setTimer(minutesElement, secondsElement);
    });
    timer.addEventListener('reset', () => {
      setTimer(minutesElement, secondsElement);
    });
  }
};

export { countdownTimer };
