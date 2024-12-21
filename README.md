# hello-world-test

## Simple Website Tutorial

Welcome to the Simple Website Tutorial! This guide will walk you through the steps to create a basic website using HTML, CSS, and JavaScript.

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

### 3. Create 2 JavaScript Files

Create a file named `scoreboard.js` --Only if file has not been created already
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

1. Initialize Game Elements
- Start by identifying the elements of your game in the HTML file.
- Use `document.getElementById()` to get references to these elements
```
// Get references to HTML elements
const basket = document.getElementById("basket"); // The basket element
const fallingItem = document.getElementById("falling-item"); // The falling item element
const startButton = document.getElementById("start-game"); // Start button
const stopButton = document.getElementById("stop-game"); // Stop button
```

2. Define Game Variables
- Create variables to track the game state, including the position of the basket and falling item.
- Initialize variables to control the score, misses, and whether the game is running.
- 
```
// Variables to track the game state
let gameInterval = null; // The interval for the game loop
let basketPosition = 50; // Basket position as a percentage of the game area width
let fallingItemPosition = { x: Math.random() * 90, y: 0 }; // Random starting position for the falling item
let isGameRunning = false; // Flag to track if the game is running
let score = 0; // Player's score
let misses = 0; // Number of missed items
```

3. Move the Basket
- Use the `keydown` event listener to move the basket left or right when arrow keys are pressed.
- Update the basket's position using inline CSS.
What does this do?
- Check if the game is running. If not, ignore input.
- Update the basketPosition based on key presses.
- Apply the new position to the basket.
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
If you finish early, feel free to try out these additions to your website!

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
