// Scoreboard Module
export const scoreboard = {
  // Initialize the score and misses counters to zero
  score: 0,
  misses: 0,

  // Maximum number of misses allowed before the game ends
  maxMisses: 3,

  /**
   * Update the score:
   * - Increment the score by 1.
   * - Update the score display in the HTML.
   */
  updateScore() {
    this.score++; // Increase the score
    document.getElementById("score").textContent = `Score: ${this.score}`; // Update the score on the page
  },

  /**
   * Update the misses:
   * - Increment the misses counter by 1.
   * - Update the misses display in the HTML.
   * - If the number of misses reaches the maximum allowed, alert the player and stop the game.
   */
  updateMisses() {
    this.misses++; // Increase the misses
    document.getElementById("misses").textContent = `Misses: ${this.misses}`; // Update the misses on the page

    // Check if the misses have reached the maximum allowed
    if (this.misses >= this.maxMisses) {
      alert("Game Over! Refresh to play again."); // Alert the user that the game is over
      stopGame(); // Stop the game (assumes stopGame() is defined elsewhere)
    }
  },

  /**
   * Reset the scoreboard:
   * - Set the score and misses counters to zero.
   * - Update the score and misses displays in the HTML.
   */
  reset() {
    this.score = 0; // Reset score to 0
    this.misses = 0; // Reset misses to 0
    document.getElementById("score").textContent = `Score: ${this.score}`; // Reset score display on the page
    document.getElementById("misses").textContent = `Misses: ${this.misses}`; // Reset misses display on the page
  }
};
