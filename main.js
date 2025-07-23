// Target all navigation buttons
const homeBtn = document.querySelector("#homeBtn");
const historyBtn = document.querySelector("#historyBtn");
const equipmentBtn = document.querySelector("#equipmentBtn");
const recipesBtn = document.querySelector("#recipesBtn");
const gameBtn = document.querySelector("#gameBtn");
const homeBtnMobile = document.querySelector("#homeBtnMobile");
const historyBtnMobile = document.querySelector("#historyBtnMobile");
const equipmentBtnMobile = document.querySelector("#equipmentBtnMobile");
const recipesBtnMobile = document.querySelector("#recipesBtnMobile");
const gameBtnMobile = document.querySelector("#gameBtnMobile");

// Select all page sections
const allPages = document.querySelectorAll(".page");

// Function to hide all pages
function hideAll() {
  for (let page of allPages) {
    page.style.display = "none";
  }
}

// Function to show selected page
function show(pageId) {
  hideAll();
  // Show the specific page based on the parameter
  let targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.style.display = "block";
  }
}

// Listen for clicks on the buttons
homeBtn.addEventListener("click", function () {
  show("home");
});
historyBtn.addEventListener("click", function () {
  show("history-of-fishing");
});
equipmentBtn.addEventListener("click", function () {
  show("fishing-equipment");
});
recipesBtn.addEventListener("click", function () {
  show("fish-recipes");
});
gameBtn.addEventListener("click", function () {
  show("mini-game");
});
homeBtnMobile.addEventListener("click", function () {
  show("home")
});
historyBtnMobile.addEventListener("click", function () {
  show("history-of-fishing")
});
equipmentBtnMobile.addEventListener("click", function () {
 show("fishing-equipment")
});
recipesBtnMobile.addEventListener("click", function () {
  show("fish-recipes")
});

gameBtnMobile.addEventListener("click", function () {
  show("mini-game")
});

// Initialize by hiding all pages first, then showing home
hideAll();
show("home");

// --- Content navigation buttons (MOVED OUTSIDE DOMContentLoaded) ---
const startLearningBtn = document.querySelector('#startBtn');
const toRecipesBtn = document.querySelector('#toRecipesBtn');
const toGameBtn = document.querySelector('#toGameBtn');

if (startLearningBtn) startLearningBtn.addEventListener('click', () => show("history-of-fishing"));
if (toRecipesBtn) toRecipesBtn.addEventListener('click', () => show("fish-recipes"));
if (toGameBtn) toGameBtn.addEventListener('click', () => show("mini-game"));


// --- Mini Game: Fishing Clicker (MOVED OUTSIDE DOMContentLoaded) ---
const fishId = document.getElementById("fishId");
const scoreElement = document.getElementById("score");
let score = 0;

function GetRandom(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function MoveFish() {
  if (!fishId) return;

  const gameArea = document.getElementById("game-area");
  if (!gameArea) return;

  const gameAreaWidth = gameArea.offsetWidth - fishId.offsetWidth;
  const gameAreaHeight = gameArea.offsetHeight - fishId.offsetHeight;

  fishId.style.left = GetRandom(0, gameAreaWidth) + "px";
  fishId.style.top = GetRandom(0, gameAreaHeight) + "px";
}

// Start moving fish when game section is shown
if (fishId) {
  setInterval(MoveFish, 1000);
  MoveFish(); // Initial position
}

function CatchFish() {
  score++;
  if (scoreElement) {
    scoreElement.textContent = score;
  }
}

if (fishId) {
  fishId.addEventListener("click", CatchFish);
}


// --- Quiz functionality for Fishing Equipment (MOVED OUTSIDE DOMContentLoaded) ---
const btnSubmit = document.querySelector("#btnSubmit");
const scorebox = document.querySelector("#scorebox");

// Move the score variable declaration here, outside the function
let quizScore = 0; // Renamed to avoid conflict with the game's score variable

function CheckAns() {
  quizScore = 0; // reset score to 0 (use the renamed variable)

  // Check each question
  const q1 = document.querySelector("input[name='q1']:checked");
  const q2 = document.querySelector("input[name='q2']:checked");
  const q3 = document.querySelector("input[name='q3']:checked");
  const q4 = document.querySelector("input[name='q4']:checked");

  // Validate that all questions are answered
  if (!q1 || !q2 || !q3 || !q4) {
    scorebox.innerHTML = "Please answer all questions!";
    scorebox.style.color = "#e74c3c";
    return;
  }

  // Check answers
  if (q1.value === "Incredibly strong with no stretch") quizScore++;
  if (q2.value === "Chest waders") quizScore++;
  if (q3.value === "Safely bringing fish to hand") quizScore++;
  if (q4.value === "Spinning reel") quizScore++;

  // Display score (use the renamed variable)
  scorebox.innerHTML = `Score: ${quizScore}/4`;
  scorebox.style.color = quizScore >= 3 ? "#27ae60" : "#e74c3c";
}

if (btnSubmit) {
  btnSubmit.addEventListener("click", CheckAns);
} 