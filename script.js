// Get references to HTML elements
const basket = document.getElementById("basket"); // The basket element
const fallingItem = document.getElementById("falling-item"); // The falling item element
const startButton = document.getElementById("start-game"); // Start button
const stopButton = document.getElementById("stop-game"); // Stop button

// Variables to track the game state
let gameInterval = null; // The interval for the game loop
let basketPosition = 50; // Basket position as a percentage of the game area width
let fallingItemPosition = { x: Math.random() * 90, y: 0 }; // Initial random position of the falling item
let isGameRunning = false; // Flag to track if the game is currently running
let score = 0; // Player's score
let misses = 0; // Number of missed items

// Move the basket with the arrow keys
document.addEventListener("keydown", (event) => {
  if (!isGameRunning) return; // Ignore input if the game is not running

  // Move the basket left if the left arrow key is pressed and it is within bounds
  if (event.key === "ArrowLeft" && basketPosition > 0) {
    basketPosition -= 7; // Move left
  }
  // Move the basket right if the right arrow key is pressed and it is within bounds
  else if (event.key === "ArrowRight" && basketPosition < 90) {
    basketPosition += 7; // Move right
  }

  // Update the basket's position in the game area
  basket.style.left = `${basketPosition}%`;
});

// Update the position of the falling item
function updateFallingItem() {
  fallingItemPosition.y += 6; // Increase the vertical position to simulate falling
  fallingItem.style.top = `${fallingItemPosition.y}px`; // Update the falling item's vertical position
  fallingItem.style.left = `${fallingItemPosition.x}%`; // Update the falling item's horizontal position

  // Check if the falling item is caught by the basket
  if (
    fallingItemPosition.y >= 380 && // The falling item is near the basket
    fallingItemPosition.x > basketPosition - 10 && // The falling item's horizontal position overlaps the basket
    fallingItemPosition.x < basketPosition + 10
  ) {
    score++; // Increment the score
    document.getElementById("score").textContent = `Score: ${score}`; // Update the score display
    resetFallingItem(); // Reset the falling item to its initial position

    // Check if the score has reached the win condition
    if (score >= 10) {
      stopGame(); // Stop the game
      alert("Congratulations! You reached a score of 10! Game Over."); // Notify the player
    }
  }

  // Check if the falling item is missed (falls out of bounds)
  if (fallingItemPosition.y > 400) {
    misses++; // Increment the misses count
    document.getElementById("misses").textContent = `Misses: ${misses}`; // Update the misses display
    resetFallingItem(); // Reset the falling item to its initial position

    // Check if the player has reached the maximum allowed misses
    if (misses >= 3) {
      stopGame(); // Stop the game
      alert("Game Over! Refresh or click 'Start Game' to play again."); // Notify the player
    }
  }
}

// Reset the falling item's position to the top with a new random horizontal position
function resetFallingItem() {
  fallingItemPosition = { x: Math.random() * 90, y: -30 }; // Reset position above the game area
}

// Start the game
function startGame() {
  if (isGameRunning) return; // Prevent starting the game multiple times
  isGameRunning = true; // Set the game state to running
  score = 0; // Reset the score
  misses = 0; // Reset the misses count
  document.getElementById("score").textContent = `Score: ${score}`; // Update the score display
  document.getElementById("misses").textContent = `Misses: ${misses}`; // Update the misses display
  startButton.disabled = true; // Disable the start button
  stopButton.disabled = false; // Enable the stop button
  gameInterval = setInterval(updateFallingItem, 30); // Start the game loop with a 30ms interval
}

// Stop the game
function stopGame() {
  if (!isGameRunning) return; // Prevent stopping the game if it is not running
  isGameRunning = false; // Set the game state to not running
  clearInterval(gameInterval); // Clear the game loop interval
  startButton.disabled = false; // Enable the start button
  stopButton.disabled = true; // Disable the stop button
}

// Event listeners for the start and stop buttons
startButton.addEventListener("click", startGame); // Start the game when the start button is clicked
stopButton.addEventListener("click", stopGame); // Stop the game when the stop button is clicked
