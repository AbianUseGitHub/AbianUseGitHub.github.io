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
  show("home");
});
historyBtnMobile.addEventListener("click", function () {
  show("history-of-fishing");
});
equipmentBtnMobile.addEventListener("click", function () {
  show("fishing-equipment");
});
recipesBtnMobile.addEventListener("click", function () {
  show("fish-recipes");
});

gameBtnMobile.addEventListener("click", function () {
  show("mini-game");
});

// Initialize by hiding all pages first, then showing home
hideAll();
show("home");

// --- Content navigation buttons ---
const startLearningBtn = document.querySelector('#startBtn');
const toEquipmentBtn = document.querySelector('#toEquipmentBtn');
const toRecipesBtn = document.querySelector('#toRecipesBtn');
const toGameBtn = document.querySelector('#toGameBtn');

if (startLearningBtn) startLearningBtn.addEventListener('click', function () { show("history-of-fishing"); });
if (toEquipmentBtn) toEquipmentBtn.addEventListener('click', function () { show("fishing-equipment"); });
if (toRecipesBtn) toRecipesBtn.addEventListener('click', function () { show("fish-recipes"); });
if (toGameBtn) toGameBtn.addEventListener('click', function () { show("mini-game"); });


// --- Mini Game: Fishing Clicker ---

const fishId = document.getElementById("fishId");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const startGameBtn = document.getElementById("startGameBtn");
const splashAudio = new Audio("audio/splashSound.ogg");

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

  setTimeout(function () {
    fishId.classList.remove("anim1");
    fishId.classList.remove("shrink");

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
  startGameBtn.disabled = true;
  startGameBtn.textContent = "Game Running...";

  // Cancel any existing intervals (safety check)
  if (timerInterval) clearInterval(timerInterval);
  if (moveInterval) clearInterval(moveInterval);

  // Start the timer
  timerInterval = setInterval(updateTimer, 1000);

  // Start moving the fish automatically every 2 seconds
  moveInterval = setInterval(function () {
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
// Get the parent form element for the quiz to insert messages correctly
const equipmentQuizForm = document.getElementById("equipmentQuiz");

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

    // --- NEW: Remove existing feedback message if answers are missing ---
    const existingFeedback = document.querySelector('.quiz-feedback');
    if (existingFeedback) {
      existingFeedback.remove();
    }
    // --- END NEW ---

    return;
  }

  // Check answers
  if (q1.value === "Incredibly strong with no stretch") quizScore++;
  if (q2.value === "Chest waders") quizScore++;
  if (q3.value === "Safely bringing fish to hand") quizScore++;
  if (q4.value === "Spinning reel") quizScore++;

  const oldFeedback = document.querySelector('.quiz-feedback');
  if (oldFeedback) {
    oldFeedback.remove();
  }
  const feedbackMessage = document.createElement('p');
  feedbackMessage.className = 'quiz-feedback';

  // Determine the message based on the score
  if (quizScore === 4) {
    // Perfect Score Feedback
    feedbackMessage.textContent = '🎉 Perfect Score! Fishing Expert! 🎉';
    feedbackMessage.style.color = '#27ae60';
    feedbackMessage.style.fontWeight = 'bold';
    feedbackMessage.style.marginTop = '10px';
    feedbackMessage.style.padding = '10px';
    feedbackMessage.style.backgroundColor = '#e8f5e9';
    feedbackMessage.style.borderRadius = '5px';
  } else if (quizScore >= 2) {
    // Pass (2 or 3 correct)
    feedbackMessage.textContent = 'Good job! You passed the quiz.';
    feedbackMessage.style.color = '#3498db';
    feedbackMessage.style.fontWeight = 'bold';
    feedbackMessage.style.marginTop = '10px';
    feedbackMessage.style.padding = '10px';
    feedbackMessage.style.backgroundColor = '#e3f2fd';
    feedbackMessage.style.borderRadius = '5px';
  } else {
    // Fail (0 or 1 correct)
    feedbackMessage.textContent = 'You can do better, try again!';
    feedbackMessage.style.color = '#e74c3c';
    feedbackMessage.style.fontWeight = 'bold';
    feedbackMessage.style.marginTop = '10px';
    feedbackMessage.style.padding = '10px';
    feedbackMessage.style.backgroundColor = '#ffebee';
    feedbackMessage.style.borderRadius = '5px';
  }

  // Display score
  scorebox.innerHTML = "Score: " + quizScore + "/4";
  scorebox.style.color = quizScore >= 3 ? "#27ae60" : "#e74c3c";

  if (equipmentQuizForm && scorebox) {
    equipmentQuizForm.insertBefore(feedbackMessage, scorebox.nextSibling);
  }
}

if (btnSubmit) {
  btnSubmit.addEventListener("click", CheckAns);
}
// --- End Quiz functionality for Fishing Equipment ---

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
var backToTopFooterBtn = document.getElementById("backToTopBtnFooter");

// Check if the button exists
if (backToTopFooterBtn) {
  // --- Function Expression to scroll smoothly to the top ---
  // Define the function using a function expression assigned to a variable
  var scrollToTop = function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This creates the smooth scrolling effect
    });
  };
  // --- End Function Expression ---

  // Attach the click event listener to the button
  backToTopFooterBtn.addEventListener('click', scrollToTop);
} else {
  console.warn("Footer Back to Top button with ID 'backToTopBtnFooter' not found.");
}
// --- End Footer Back to Top Button Functionality ---

// --- Fullscreen Functionality for Entire Website ---
const btnFS = document.getElementById("btnFS");
const btnWS = document.getElementById("btnWS");

// Check if buttons exist before adding listeners (good practice)
if (btnFS && btnWS) {
  btnFS.addEventListener("click", enterFullscreen);
  btnWS.addEventListener("click", exitFullscreen);

  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari
  document.addEventListener('mozfullscreenchange', handleFullscreenChange);    // Firefox
  document.addEventListener('MSFullscreenChange', handleFullscreenChange);     // IE11

  function handleFullscreenChange() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
      // Fullscreen is active
      btnFS.style.display = 'none';
      btnWS.style.display = 'inline-block';
    } else {
      // Fullscreen is not active
      btnFS.style.display = 'inline-block';
      btnWS.style.display = 'none';
    }
  }
}

function enterFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch(err => {
      console.warn(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
    });
  } else if (elem.mozRequestFullScreen) { // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE/Edge
    elem.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen();
  }
}
// --- END: Fullscreen Functionality for Entire Website ---