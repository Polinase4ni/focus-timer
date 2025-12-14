const timeEl = document.getElementById("time");
const selectEl = document.getElementById("duration");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

let totalSeconds = Number(selectEl.value) * 60;
let secondsLeft = totalSeconds;
let interval = null;
let paused = false;

function render() {
  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;
  timeEl.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function resetButtonStates() {
  startBtn.classList.remove("btn-start--running");
  pauseBtn.classList.remove("btn-pause--paused");
}

/* init */
render();

/* duration change */
selectEl.onchange = () => {
  totalSeconds = Number(selectEl.value) * 60;
  secondsLeft = totalSeconds;
  clearInterval(interval);
  interval = null;
  paused = false;
  resetButtonStates();
  render();
};

/* START */
startBtn.onclick = () => {
  if (interval) return;

  resetButtonStates();
  startBtn.classList.add("btn-start--running");

  interval = setInterval(() => {
    secondsLeft--;
    render();

    if (secondsLeft <= 0) {
      clearInterval(interval);
      interval = null;

      const sessions = Number(localStorage.getItem("sessions") || 0) + 1;
      const minutes = Number(localStorage.getItem("minutes") || 0) + Number(selectEl.value);

      localStorage.setItem("sessions", sessions);
      localStorage.setItem("minutes", minutes);

      resetButtonStates();
      secondsLeft = totalSeconds;
      render();
      alert("Session finished!");
    }
  }, 1000);
};

/* PAUSE / RESUME */
pauseBtn.onclick = () => {
  if (!interval && !paused) return;

  if (interval) {
    clearInterval(interval);
    interval = null;
    paused = true;

    pauseBtn.classList.add("btn-pause--paused");
  } else {
    paused = false;
    pauseBtn.classList.remove("btn-pause--paused");

    interval = setInterval(() => {
      secondsLeft--;
      render();

      if (secondsLeft <= 0) {
        clearInterval(interval);
        interval = null;

        const sessions = Number(localStorage.getItem("sessions") || 0) + 1;
        const minutes = Number(localStorage.getItem("minutes") || 0) + Number(selectEl.value);

        localStorage.setItem("sessions", sessions);
        localStorage.setItem("minutes", minutes);

        resetButtonStates();
        secondsLeft = totalSeconds;
        render();
        alert("Session finished!");
      }
    }, 1000);
  }
};

/* RESET */
resetBtn.onclick = () => {
  clearInterval(interval);
  interval = null;
  paused = false;
  secondsLeft = totalSeconds;
  resetButtonStates();
  render();
};
