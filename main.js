// Global Variables
let currentSection = 'home';
const sections = document.querySelectorAll('section');
const menuLinks = document.querySelectorAll('#menu ul li a');

// Show specific section
function showSection(sectionId) {
  // Hide all sections
  sections.forEach((section) => {
    section.style.display = 'none';
  });

  // Show the selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = 'block';
    currentSection = sectionId;

    // Update active link in navigation
    updateActiveLink();
  }
}

// Update active link in navigation
function updateActiveLink() {
  menuLinks.forEach((link) => {
    if (link.getAttribute('href').slice(1) === currentSection) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Initialize app by showing home section
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
});

// Event delegation for navigation links
document.querySelector('#menu').addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const targetSection = event.target.getAttribute('href').slice(1);
    showSection(targetSection);
  }
});

// Mini Game Implementation - Fishing Clicker
const fishId = document.getElementById("fishId");
const scoreBox = document.getElementById("score");
let score = 0;

// Function to generate random numbers
function GetRandom(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

// Move the fish to a random position within the game area
function MoveFish() {
  const gameArea = document.getElementById("game-area");
  const gameAreaWidth = gameArea.offsetWidth - fishId.offsetWidth;
  const gameAreaHeight = gameArea.offsetHeight - fishId.offsetHeight;

  fishId.style.left = GetRandom(0, gameAreaWidth) + "px";
  fishId.style.top = GetRandom(0, gameAreaHeight) + "px";
}

// Start moving the fish every second
setInterval(MoveFish, 1000);

// Function to increase score when fish is clicked
function CatchFish() {
  score++;
  scoreBox.textContent = score;
}

// Add click event listener to the fish
fishId.addEventListener("click", CatchFish);