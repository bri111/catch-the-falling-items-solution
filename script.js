const basket = document.getElementById("basket");
const fallingItem = document.getElementById("falling-item");
const startButton = document.getElementById("start-game");
const stopButton = document.getElementById("stop-game");

let gameInterval = null;
let basketPosition = 50; // Percentage for basket's position
let fallingItemPosition = { x: Math.random() * 90, y: 0 }; // Random horizontal start
let isGameRunning = false; // Track game state
let score = 0;
let misses = 0;

// Move the basket with arrow keys
document.addEventListener("keydown", (event) => {
  if (!isGameRunning) return;
  if (event.key === "ArrowLeft" && basketPosition > 0) {
    basketPosition -= 7;
  } else if (event.key === "ArrowRight" && basketPosition < 90) {
    basketPosition += 7;
  }
  basket.style.left = `${basketPosition}%`;
});

// Update falling item's position
function updateFallingItem() {
  fallingItemPosition.y += 6; // Falling speed
  fallingItem.style.top = `${fallingItemPosition.y}px`;
  fallingItem.style.left = `${fallingItemPosition.x}%`;

  // Check if caught by the basket
  if (
    fallingItemPosition.y >= 380 && // Near the basket
    fallingItemPosition.x > basketPosition - 10 &&
    fallingItemPosition.x < basketPosition + 10
  ) {
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
    resetFallingItem();

    // Stop the game when the score reaches 10
    if (score >= 10) {
      stopGame();
      alert("Congratulations! You reached a score of 10! Game Over.");
    }
  }

  // Check if missed
  if (fallingItemPosition.y > 400) {
    misses++;
    document.getElementById("misses").textContent = `Misses: ${misses}`;
    resetFallingItem();

    // End game after 3 misses
    if (misses >= 3) {
      stopGame();
      alert("Game Over! Refresh or click 'Start Game' to play again.");
    }
  }
}

// Reset the falling item
function resetFallingItem() {
  fallingItemPosition = { x: Math.random() * 90, y: -30 }; // Random horizontal start
}

// Start the game
function startGame() {
  if (isGameRunning) return;
  isGameRunning = true;
  score = 0;
  misses = 0;
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("misses").textContent = `Misses: ${misses}`;
  startButton.disabled = true;
  stopButton.disabled = false;
  gameInterval = setInterval(updateFallingItem, 30); // Game loop speed
}

// Stop the game
function stopGame() {
  if (!isGameRunning) return;
  isGameRunning = false;
  clearInterval(gameInterval);
  startButton.disabled = false;
  stopButton.disabled = true;
}

// Event listeners for buttons
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
