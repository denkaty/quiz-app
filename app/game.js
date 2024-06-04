const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
const CATEGORY_ID = 18;
const DIFFICULTY = "easy";
const ANSWERS_TYPE = "multiple";

const questionElement = document.getElementById("question");
const choiceElements = Array.from(
  document.getElementsByClassName("choice-text")
);
const progressTextElement = document.getElementById("progressText");
const scoreTextElement = document.getElementById("score");
const progressBarFullElement = document.getElementById("progressBarFull");
const loaderElement = document.getElementById("loader");
const gameElement = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

choiceElements.forEach((choice) => {
  choice.addEventListener("click", (event) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.dataset.number;
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNextQuestion();
    }, 1000);
  });
});

initializeGame();

async function initializeGame() {
  questionCounter = 0;
  score = 0;
  loaderElement.classList.remove("hidden");
  gameElement.classList.add("hidden");
  try {
    const loadedQuestions = await fetchQuestions();
    availableQuestions = loadedQuestions.map((question) =>
      formatQuestion(question)
    );
    startGame();
  } catch (error) {
    console.error("Failed to initialize game:", error);
  } finally {
    loaderElement.classList.add("hidden");
    gameElement.classList.remove("hidden");
  }
}

async function fetchQuestions() {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${MAX_QUESTIONS}&category=${CATEGORY_ID}&difficulty=${DIFFICULTY}&type=${ANSWERS_TYPE}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}

function formatQuestion(questionData) {
  const formattedQuestion = {
    question: decodeHtml(questionData.question),
    answer: Math.floor(Math.random() * 4) + 1,
  };
  const answerChoices = questionData.incorrect_answers.map((choice) =>
    decodeHtml(choice)
  );
  answerChoices.splice(
    formattedQuestion.answer - 1,
    0,
    decodeHtml(questionData.correct_answer)
  );
  answerChoices.forEach((choice, index) => {
    formattedQuestion["choice" + (index + 1)] = choice;
  });
  return formattedQuestion;
}

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...availableQuestions];
  getNextQuestion();
}

function getNextQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressTextElement.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFullElement.style.width = `${
    (questionCounter / MAX_QUESTIONS) * 100
  }%`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  questionElement.innerText = currentQuestion.question;
  choiceElements.forEach((choice, index) => {
    const choiceNumber = index + 1;
    choice.textContent = currentQuestion["choice" + choiceNumber];
    choice.dataset.number = choiceNumber;
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

function incrementScore(points) {
  score += points;
  scoreTextElement.innerText = score;
}



