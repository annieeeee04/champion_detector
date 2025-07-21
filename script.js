let timerDisplay = document.getElementById("timer");
let messageBox = document.getElementById("message");
let countdownInterval;
let timeLeft = 60;
let isRunning = false;

function updateDisplay() {
    timerDisplay.textContent = timeLeft;
  
    // Color transition from red (rgb(255, 107, 107)) to green (rgb(0, 200, 0))
    const progress = (60 - timeLeft) / 60;  // 0 at start, 1 at end
    const r = Math.round(255 * (1 - progress));
    const g = Math.round(200 * progress);
    const b = Math.round(107 * (1 - progress)); // soften red
  
    timerDisplay.style.color = `rgb(${r}, ${g}, ${b})`;
  }
  

function startCountdown() {
  if (isRunning) return;
  messageBox.style.display = "none";
  isRunning = true;

  countdownInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(countdownInterval);
      isRunning = false;
      messageBox.style.display = "block";
    }
  }, 1000);
}

function pauseCountdown() {
  clearInterval(countdownInterval);
  isRunning = false;
}

function resetCountdown() {
  clearInterval(countdownInterval);
  timeLeft = 60;
  isRunning = false;
  updateDisplay();
  messageBox.style.display = "none";
}

function sendEmail() {
  const heartRate = document.getElementById("heartRateInput").value;
  if (!heartRate) {
    alert("Please enter a heart rate before emailing.");
    return;
  }

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  const subject = encodeURIComponent("Champion's Heart Rate Report");
  const body = encodeURIComponent(`Champion's heart rate:\n${heartRate} bpm\nDate: ${date} ${time}`);
  window.location.href = `mailto:zhichenzhang70@gmail.com?subject=${subject}&body=${body}`;
}

function addRecord(text) {
  const recordList = document.getElementById("recordList");

  const li = document.createElement("li");
  li.className = "record-item";
  li.innerHTML = `
    <span>${text}</span>
    <button onclick="this.parentElement.remove()">Delete</button>
  `;
  recordList.appendChild(li);
}

function saveRecord() {
  const heartRate = document.getElementById("heartRateInput").value;
  if (!heartRate) {
    alert("Please enter a heart rate before saving.");
    return;
  }

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  addRecord(`${date} ${time} — ${heartRate} bpm`);
}

updateDisplay(); // Initialize timer

const dailyMeds = [
    { name: "匹莫苯丹半粒", time: "09:00" },
    { name: "呋塞米一颗", time: "09:00" },
    { name: "匹莫苯丹半粒", time: "21:00" },
    { name: "氯吡格雷一颗", time: "21:00" },
    { name: "呋塞米一颗", time: "22:00" },
  ];
  
  function loadTodoList() {
    const list = document.getElementById("todoList");
    dailyMeds.forEach(med => {
      const li = document.createElement("li");
      li.className = "todo-item";
      li.innerHTML = `
        <label>
          <input type="checkbox" onchange="toggleComplete(this)">
          <span><strong>${med.name}</strong> - Reminders <span style="color:red;">${med.time}</span> 🔁 Daily</span>
        </label>
      `;
      list.appendChild(li);
    });
  }
  
  function toggleComplete(checkbox) {
    const item = checkbox.closest(".todo-item");
    item.classList.toggle("completed", checkbox.checked);
  }
  
  // Load list on page load
  loadTodoList();
  
  const catImages = [
    "pics/Subject 2.png",
    "pics/Subject 3.png",
    "pics/Subject 4.png", // include the original so it appears again
  ];
  let currentImageIndex = 0;
  let imageInterval;
  
  function startImageCycle() {
    const img = document.getElementById("cat-pic");
    imageInterval = setInterval(() => {
      // Fade out
      img.style.opacity = 0;
  
      setTimeout(() => {
        currentImageIndex = (currentImageIndex + 1) % catImages.length;
        img.src = catImages[currentImageIndex];
        // Fade in
        img.style.opacity = 1;
      }, 300); // Wait for fade-out to complete before switching
    }, 1200); // Adjust speed as you like
  }
  
  
  function stopImageCycle() {
    clearInterval(imageInterval);
    currentImageIndex = catImages.length - 1; // Last one is default
    const img = document.getElementById("cat-pic");
  
    // Smooth fade back to original
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = catImages[currentImageIndex];
      img.style.opacity = 1;
    }, 300);
  }
  
  