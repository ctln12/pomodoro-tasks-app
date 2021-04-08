import Timer from 'easytimer.js';

const countdownTimer = () => {
  const countdownElement = document.querySelector('.countdown-timer');

  if (countdownElement) {
    const timerTitle = document.getElementById('timer-title');
    const startBtn = document.getElementById('start');
    const pauseBtn = document.getElementById('pause');
    const stopBtn = document.getElementById('stop');
    const minutesElement = document.querySelector('.minutes');
    const secondsElement = document.querySelector('.seconds');
    const minutes = parseInt(minutesElement.innerText);
    const seconds = parseInt(secondsElement.innerText);
    let TIME_LIMIT = minutes * 60 + seconds;
    let FULL_DASH_ARRAY = 283;

    const setTimer = (minutesElement, secondsElement) => {
      minutesElement.innerText = timer.getTimeValues().toString(['minutes']);
      secondsElement.innerText = timer.getTimeValues().toString(['seconds']);
    };

    const timer = new Timer({countdown: true, startValues: {minutes: minutes, seconds: seconds}, precision: 'seconds'});

    const timeToSeconds = (timer) => {
      return timer.getTimeValues().minutes * 60 + timer.getTimeValues().seconds;
    }
    const calculateTimeFraction = (timeLeft) => {
      const rawTimeFraction = timeLeft / TIME_LIMIT;
      return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }
    const setCircleDasharray = (timeLeft) => {
      const circleDasharray = `${(
        calculateTimeFraction(timeLeft, TIME_LIMIT) * FULL_DASH_ARRAY
      ).toFixed(2)} 283`;
      document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
    }

    startBtn.addEventListener('click', () => {
      timer.start();
      startBtn.classList.add('hide-control');
      pauseBtn.classList.remove('hide-control');
      document
        .getElementById("base-timer-path-remaining")
        .classList.add('transition-all');
      timerTitle.innerText = "Focusing...";
    });
    pauseBtn.addEventListener('click', () => {
      timer.pause();
      startBtn.classList.remove('hide-control');
      pauseBtn.classList.add('hide-control');
      timerTitle.innerText = "Paused";
    });
    stopBtn.addEventListener('click', () => {
      timer.reset();
      timer.stop();
      startBtn.classList.remove('hide-control');
      pauseBtn.classList.add('hide-control');
      timerTitle.innerText = "Get to work!";
    });

    timer.addEventListener('secondsUpdated', () => {
      setTimer(minutesElement, secondsElement);
      setCircleDasharray(timeToSeconds(timer));
    });
    timer.addEventListener('started', () => {
      setTimer(minutesElement, secondsElement);
    });
    timer.addEventListener('reset', () => {
      setTimer(minutesElement, secondsElement);
      setCircleDasharray(timeToSeconds(timer));
    });
  }
};

export { countdownTimer };
