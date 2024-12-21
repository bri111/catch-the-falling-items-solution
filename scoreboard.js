
// Scoreboard Module
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
      stopGame(); // Stop the game when max misses reached
    }
  },

  reset() {
    this.score = 0;
    this.misses = 0;
    document.getElementById("score").textContent = `Score: ${this.score}`;
    document.getElementById("misses").textContent = `Misses: ${this.misses}`;
  }
};
