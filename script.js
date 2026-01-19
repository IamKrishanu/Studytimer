let time = 25 * 60;
let interval = null;
let startedAt = null;

let mode = "study"; // study | shortBreak | longBreak
let completedSessions = Number(localStorage.getItem("completedSessions") || 0);

const container = document.querySelector(".container");
const sessionKey = "sessionsToday";


const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const intentionInput = document.getElementById("intention");

const studySlider = document.getElementById("studyTime");
const studyLabel = document.getElementById("studyLabel");

let customStudyTime = Number(localStorage.getItem("studyTime") || 25) * 60;
time = customStudyTime;


studySlider.value = customStudyTime / 60;
studyLabel.textContent = `Study Time: ${studySlider.value} min`;

studySlider.oninput = () => {
  studyLabel.textContent = `Study Time: ${studySlider.value} min`;
  customStudyTime = studySlider.value * 60;
  time = customStudyTime;
  localStorage.setItem("studyTime", studySlider.value);
  updateTimer();
};


function updateTimer() {
    // Calculate minutes and seconds
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
  
    // Update the timer display
    timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  
    // Change color in the last 60 seconds
    if (time <= 60) {
      timerEl.style.color = "#f87171";
    } else {
      timerEl.style.color = "#e5e7eb";
    }
  }
  

startBtn.onclick = () => {
    if (interval) return;
  
    startedAt = Date.now();
    container.classList.add("studying");
  
    interval = setInterval(() => {
      if (time > 0) {
        time--;
        updateTimer();
      } else {
        endSession();
      }
    }, 1000);
  };
  
  pauseBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
    container.classList.remove("studying"); // 🔥 THIS FIXES IT
  };
  

resetBtn.onclick = () => {
    if (!startedAt) return;
  
    const elapsed = (Date.now() - startedAt) / 1000;
    if (elapsed < 300) {
      alert("Give it at least 5 minutes.");
      return;
    }
  
    clearInterval(interval);
    interval = null;
    time = 25 * 60;
    updateTimer();
    container.classList.remove("studying");
  };
  

intentionInput.oninput = () => {
  localStorage.setItem("intention", intentionInput.value);
};

intentionInput.value = localStorage.getItem("intention") || "";
updateTimer();

function endSession() {
    clearInterval(interval);
    interval = null;
    container.classList.remove("studying");
  
    if (mode === "study") {
      completedSessions++;
      localStorage.setItem("completedSessions", completedSessions);
  
      if (completedSessions % 4 === 0) {
        mode = "longBreak";
        time = 15 * 60;
        alert("Long break 🌿 15 minutes");
      } else {
        mode = "shortBreak";
        time = 5 * 60;
        alert("Short break ☕ 5 minutes");
      }
    } else {
      mode = "study";
      time = customStudyTime;
      alert("Back to study 💪");
    }
  
    updateTimer();
  }
  
  
  const fullscreenBtn = document.getElementById("fullscreen");

fullscreenBtn.onclick = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
