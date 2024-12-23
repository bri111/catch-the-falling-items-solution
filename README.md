# Catch the Falling Items

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Step-by-Step Guide](#step-by-step-guide)
  - [1. Create the HTML File](#1-create-the-html-file)
  - [2. Create the CSS File](#2-create-the-css-file)
  - [3. Create the JavaScript File](#3-create-the-javascript-file)
  - [4. Link the CSS and JavaScript Files](#4-link-the-css-and-javascript-files)
  - [5. Open the HTML File in a Browser](#5-open-the-html-file-in-a-browser)
- [Things to Look Out For](#things-to-look-out-for)
- [Conclusion](#conclusion)

## Introduction

In this project, you will create a game where the player controls a basket to catch falling items. The game utilizes HTML for structure, CSS for styling, and JavaScript for interactivity. The project is modular, with separate files for functionality.

## Project Structure

Create a project directory and set up the following file structure:
```plaintext
simple-website/
├── index.html
├── styles.css
├── scoreboard.js
└── script.js
```

## Step-by-Step Guide

### 1. Create the HTML File --Only if file has not been created already

Open your code editor and create a file named `index.html`. Add the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Catch the Falling Items</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Catch the Falling Items!</h1>
  <p id="score">Score: 0</p>
  <p id="misses">Misses: 0</p>
  <button id="start-game">Start Game</button>
  <button id="stop-game" disabled>Stop Game</button>
  <div id="game-area">
    <div id="basket"></div>
    <div id="falling-item"></div>
  </div>
  <script src="script.js" type="module"></script>
</body>
</html>
```
### 2. Create the CSS File --Only if file has not been created already

Create a file named `styles.css` and add the following code to style your webpage:

```css
body {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
  background: #f4f4f9;
  overflow: hidden;
}

#game-area {
  position: relative;
  width: 500px;
  height: 400px;
  background: #e0f7fa;
  border: 2px solid #007BFF;
  margin: 20px auto;
  overflow: hidden;
}

#basket {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 10px;
  background: #007BFF;
  border-radius: 5px;
}

#falling-item {
  position: absolute;
  top: -30px;
  left: 50%;
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
}

```

### 3. Create 2 JavaScript Files -- Only if file has not been created already

Create a file named `scoreboard.js` 
```scoreboard
export const scoreboard = {
  score: 0,
  misses: 0,
  maxMisses: 3,

  updateScore() {
    this.score++;
    document.getElementById("score").textContent = `Score: ${this.score}`;
  },

  updateMisses() {
    this.misses++;
    document.getElementById("misses").textContent = `Misses: ${this.misses}`;
    if (this.misses >= this.maxMisses) {
      alert("Game Over! Refresh to play again.");
      stopGame();
    }
  },

  reset() {
    this.score = 0;
    this.misses = 0;
    document.getElementById("score").textContent = `Score: ${this.score}`;
    document.getElementById("misses").textContent = `Misses: ${this.misses}`;
  }
};

```

Create a file named `script.js` 

### 4. Step-by-Step Guide to Script.js

**1. Find the Important Parts of the Game**
- We need to tell the computer where the basket, the falling item, and the buttons are in the HTML.
- To do that, we "grab" them using JavaScript.
```
// Get references to HTML elements
const basket = document.getElementById("basket"); // The basket element
const fallingItem = document.getElementById("falling-item"); // The falling item element
const startButton = document.getElementById("start-game"); // Start button
const stopButton = document.getElementById("stop-game"); // Stop button
```

**2. Keep Track of the Game**
- We need some "notes" for the computer to remember things like:
- Where the basket is.
  - Where the falling item is.
  - Whether the game is running or not.
  - The player’s score and misses.
```
// Variables to track the game state
let gameInterval = null; // The interval for the game loop
let basketPosition = 50; // Basket position as a percentage of the game area width
let fallingItemPosition = { x: Math.random() * 90, y: 0 }; // Random starting position for the falling item
let isGameRunning = false; // Flag to track if the game is running
let score = 0; // Player's score
let misses = 0; // Number of missed items
```

**3. Move the Basket**
- We want the player to move the basket left and right using the arrow keys also known as `keydown`.
- When the player presses:
  - Left arrow key: Move the basket to the left.
  - Right arrow key: Move the basket to the right.
```
// Move the basket with arrow keys
document.addEventListener("keydown", (event) => {
  if (!isGameRunning) return; // Ignore input if the game is not running

  // Move the basket left
  if (event.key === "ArrowLeft" && basketPosition > 0) {
    basketPosition -= 7;
  }
  // Move the basket right
  else if (event.key === "ArrowRight" && basketPosition < 90) {
    basketPosition += 7;
  }

  // Update the basket's position
  basket.style.left = `${basketPosition}%`;
});
```

**4. Make the Item Fall**
- The falling item needs to "fall" from the top of the screen down to the bottom.
- We do this by moving the item’s position down a little bit every moment.
```
// Make the item fall down
function updateFallingItem() {
  fallingItemPosition.y += 6; // Move the item down
  fallingItem.style.top = `${fallingItemPosition.y}px`; // Update how far down it is
  fallingItem.style.left = `${fallingItemPosition.x}%`; // Update its horizontal position
}
```

**5. Check for Catches or Misses**
- If the item touches the basket, the player scores a point.
- If the item falls past the basket, the player gets a "miss."
```
// Check if the player caught or missed the item
function updateFallingItem() {
  fallingItemPosition.y += 6; // Make the item fall
  fallingItem.style.top = `${fallingItemPosition.y}px`; // Update its position
  fallingItem.style.left = `${fallingItemPosition.x}%`;

  // Check if the item is caught
  if (
    fallingItemPosition.y >= 380 && // Close to the basket
    fallingItemPosition.x > basketPosition - 10 && // Overlaps with the basket
    fallingItemPosition.x < basketPosition + 10
  ) {
    score++; // Add 1 to the score
    document.getElementById("score").textContent = `Score: ${score}`; // Update the score on the screen
    resetFallingItem(); // Reset the falling item

    // Stop the game if the score reaches 10
    if (score >= 10) {
      stopGame();
      alert("Congratulations! You won!");
    }
  }

  // Check if the item is missed
  if (fallingItemPosition.y > 400) {
    misses++; // Add 1 to misses
    document.getElementById("misses").textContent = `Misses: ${misses}`; // Update misses on the screen
    resetFallingItem(); // Reset the falling item

    // End the game if there are 3 misses
    if (misses >= 3) {
      stopGame();
      alert("Game Over!");
    }
  }
}
```

**6. Reset the Falling Item**
- After the player catches or misses an item, it needs to "reset" back to the top of the screen and fall again.
```
// Reset the falling item to the top
function resetFallingItem() {
  fallingItemPosition = { x: Math.random() * 90, y: -30 }; // Start at a random position at the top
}
```

**7. Start the Game**
- The "Start Game" button will:
  - Reset the score and misses.
  - Start the falling item.
```
function startGame() {
  if (isGameRunning) return; // Don’t restart if already running
  isGameRunning = true; // Set the game to running
  score = 0; // Reset the score
  misses = 0; // Reset the misses
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("misses").textContent = `Misses: ${misses}`;
  startButton.disabled = true; // Disable the "Start Game" button
  stopButton.disabled = false; // Enable the "Stop Game" button
  gameInterval = setInterval(updateFallingItem, 30); // Start the falling loop
}
```

**8. Stop the Game**
- The "Stop Game" button will:
- Stop the falling item.
- Allow the player to restart.
```
function stopGame() {
  if (!isGameRunning) return; // If the game isn’t running, do nothing
  isGameRunning = false; // Set the game to stopped
  clearInterval(gameInterval); // Stop the falling loop
  startButton.disabled = false; // Enable the "Start Game" button
  stopButton.disabled = true; // Disable the "Stop Game" button
}
```

**9. Add Button Controls**
- Make the "Start Game" and "Stop Game" buttons work.
```
// Add event listeners to the buttons
startButton.addEventListener("click", startGame); // Start the game when clicked
stopButton.addEventListener("click", stopGame); // Stop the game when clicked

```

Ensure that the CSS and JavaScript files are linked correctly in your `index.html` file. The `<link>` tag for CSS should be inside the `<head>` section, and the `<script>` tag for JavaScript should be just before the closing `</body>` tag.

### 5. Open the HTML File in a Browser

Open your `index.html` file in a web browser to see your simple website in action. You should see a styled heading, a paragraph, and a button that displays an alert when clicked.

## Things to Look Out For

- Ensure the file paths in the `<link>` and `<script>` tags are correct.
- Use proper HTML structure and semantics.
- Keep your CSS organized and use meaningful class names.
- Avoid inline styles and JavaScript as much as possible for better maintainability.
- Test your website in different browsers to ensure compatibility.

## Stretch Goals
If you finish early, feel free to try out these additions to your website
- change the speed of the ball falling

### 6. Make it a Header!
Enclose the "Hello World!" in an ``<h1>`` tag as shown here:
```<h1> Hello World! </h1>```
<br>
The full code should now look like this:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Website</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1> Hello World! </h1>
  <script src="script.js"></script>
</body>
</html>
```


## Conclusion

Congratulations! You've created a simple website using HTML, CSS, and JavaScript. This is just the beginning – there are many more features and technologies to explore. Keep learning and experimenting to build more complex and dynamic websites.

Feel free to reach out if you have any questions or feedback. Happy coding!
