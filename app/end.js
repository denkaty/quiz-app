const usernameInput = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScoreElement = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

finalScoreElement.innerText = mostRecentScore;

usernameInput.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !usernameInput.value;
});

function saveHighScore(event) {
  event.preventDefault();

  const score = {
    score: mostRecentScore,
    name: usernameInput.value,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("index.html");
}
