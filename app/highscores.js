const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const highScoresTableBody = document.getElementById("highScoresTableBody");

const rows = highScores.map((score) => {
  const row = document.createElement("tr");

  const usernameCell = document.createElement("th");
  usernameCell.textContent = score.name;

  const scoreCell = document.createElement("td");
  scoreCell.textContent = score.score;

  row.appendChild(usernameCell);
  row.appendChild(scoreCell);

  return row;
});

highScoresTableBody.innerHTML = "";
rows.forEach((row) => highScoresTableBody.appendChild(row));
