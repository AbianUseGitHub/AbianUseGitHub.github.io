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

// Function to show selected page and scroll to top
function show(pageId) {
  hideAll();
  // Show the specific page based on the parameter
  let targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.style.display = "block";
  }
  // Scroll smoothly to the top of the page
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
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

// --- Content navigation buttons ---
const startLearningBtn = document.querySelector('#startBtn');
const toEquipmentBtn = document.querySelector('#toEquipmentBtn');
const toRecipesBtn = document.querySelector('#toRecipesBtn');
const toGameBtn = document.querySelector('#toGameBtn');

if (startLearningBtn) startLearningBtn.addEventListener('click', () => show("history-of-fishing"));
if (toEquipmentBtn) toEquipmentBtn.addEventListener('click', () => show("fishing-equipment"));
if (toRecipesBtn) toRecipesBtn.addEventListener('click', () => show("fish-recipes"));
if (toGameBtn) toGameBtn.addEventListener('click', () => show("mini-game"));


// --- Mini Game: Fishing Clicker ---

const fishId = document.getElementById("fishId");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const startGameBtn = document.getElementById("startGameBtn");
const splashAudio = new Audio("audio/splashSound.ogg")

let score = 0;
let timeLeft = 30;
let timerInterval = null;
let gameActive = false;
let moveInterval = null;

// Function to generate a random number within a range
function GetRandom(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

// --- Simple MoveFish Function ---
function MoveFish() {
  if (!fishId || !gameActive) return; // Don't move if game isn't active or element missing

  const gameArea = document.getElementById("game-area");
  if (!gameArea) return;

  const gameAreaWidth = gameArea.offsetWidth - fishId.offsetWidth;
  const gameAreaHeight = gameArea.offsetHeight - fishId.offsetHeight;

  // Set new position
  fishId.style.left = GetRandom(0, gameAreaWidth) + "px";
  fishId.style.top = GetRandom(0, gameAreaHeight) + "px";
}
// --- End Simple MoveFish ---

// --- CatchFish Function ---
function CatchFish() {
  // Check if game is active and fish element exists
  if (!gameActive || !fishId) return;

  // --- Trigger Animations ---
  fishId.classList.add("anim1");

  fishId.classList.add("shrink");

  splashAudio.play();
  setTimeout(() => {
    // Remove the animation classes so they can be re-triggered
    fishId.classList.remove("anim1");
    fishId.classList.remove("shrink");

    // Move the fish after the animations are done and classes are removed
    // Check gameActive again in case the game ended during the timeout
    if (gameActive) {
      MoveFish();
    }
  }, 1000);
  // --- End Remove Classes ---

  // Update score immediately upon click
  score++;
  if (scoreElement) {
    scoreElement.textContent = score;
  }
}
// --- End CatchFish ---

// --- Timer Functions ---
function updateTimer() {
  timeLeft--;
  if (timerElement) {
    timerElement.textContent = timeLeft;
  }

  if (timeLeft <= 0) {
    endGame();
  }
}

function startGame() {
  // Prevent starting if already active or elements missing
  if (gameActive || !fishId || !scoreElement || !timerElement || !startGameBtn) return;

  // Reset game state
  score = 0;
  timeLeft = 30;
  gameActive = true;

  // Update UI
  scoreElement.textContent = score;
  timerElement.textContent = timeLeft;
  startGameBtn.disabled = true; // Disable button during game
  startGameBtn.textContent = "Game Running...";

  // Cancel any existing intervals (safety check)
  if (timerInterval) clearInterval(timerInterval);
  if (moveInterval) clearInterval(moveInterval);

  // Start the timer
  timerInterval = setInterval(updateTimer, 1000);

  // Start moving the fish automatically every 2 seconds
  moveInterval = setInterval(() => {
    if (gameActive) MoveFish(); 
  }, 2000);

  // Initial move to get the fish on screen
  MoveFish();
}

function endGame() {
  gameActive = false; // Mark game as inactive

  // Stop the timers/intervals
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (moveInterval) {
    clearInterval(moveInterval);
    moveInterval = null;
  }

  // Update UI
  startGameBtn.disabled = false; 
  startGameBtn.textContent = "Start Game";

  //console.log(`Game Over! Final Score: ${score}`);
}
// --- End Timer Functions ---

// --- Initialize game elements ---
function initMiniGame() {
  // Check if essential elements exist before attaching listeners
  if (fishId && scoreElement && timerElement && startGameBtn) {
    // Attach the click event listener to the fish
    fishId.addEventListener("click", CatchFish);

    // Attach the click event listener to the start button
    startGameBtn.addEventListener("click", startGame);

    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    startGameBtn.disabled = false;
    startGameBtn.textContent = "Start Game";

    console.log("Mini-game initialized successfully.");
  } else {
    console.error("Mini-game elements not found during initialization. Retrying...");

  }
}

initMiniGame();

// --- End Mini Game: Fishing Clicker ---


// --- Quiz functionality for Fishing Equipment ---
const btnSubmit = document.querySelector("#btnSubmit");
const scorebox = document.querySelector("#scorebox");

// Move the score variable declaration here, outside the function
let quizScore = 0; 

function CheckAns() {
  quizScore = 0; // reset score to 0
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

  // Display score
  scorebox.innerHTML = `Score: ${quizScore}/4`;
  scorebox.style.color = quizScore >= 3 ? "#27ae60" : "#e74c3c";
}

if (btnSubmit) {
  btnSubmit.addEventListener("click", CheckAns);
}

// --- Flip Card Functionality ---
const equipmentContainer = document.querySelector('.equipment-container');

if (equipmentContainer) {
  equipmentContainer.addEventListener('click', function (event) {
    const flipCard = event.target.closest('.flip-card');

    if (flipCard) {
      flipCard.classList.toggle('flipped');
    }
  });
} else {
  console.warn("Flip card container '.equipment-container' not found.");
}
// --- End Flip Card Functionality ---

// --- Footer Back to Top Button Functionality ---
// Select the button in the footer
const backToTopFooterBtn = document.getElementById("backToTopBtnFooter");

// Check if the button exists
if (backToTopFooterBtn) {
  // Function to scroll smoothly to the top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This creates the smooth scrolling effect
    });
  }

  // Attach the click event listener to the button
  backToTopFooterBtn.addEventListener('click', scrollToTop);
} else {
  console.warn("Footer Back to Top button with ID 'backToTopBtnFooter' not found.");
}
// --- End Footer Back to Top Button Functionality ---