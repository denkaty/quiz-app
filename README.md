# Quiz App

## Project Description
This is a simple Quiz App developed using JavaScript, HTML, and CSS. The app fetches quiz questions from the Open Trivia Database (OpenTDB) API and allows users to take a quiz, see their scores, and save their top 5 highest scores in the local storage.

## Installation and Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/quiz-app.git
    ```
2. Navigate to the project directory:
    ```sh
    cd quiz-app
    ```
3. Open `index.html` in your preferred web browser to start the application.

## File Structure
- `index.html`: The main entry point of the application.
- `index.css`: Styling for the main entry point.
- `game.html`: The main game interface where users answer quiz questions.
- `game.css`: Styling for the game interface.
- `game.js`: Logic for fetching questions, displaying them, and handling user interactions.
- `end.html`: The end screen that shows the final score and allows users to save their score.
- `end.css`: Styling for the end screen.
- `end.js`: Logic for displaying the final score and saving it to local storage.
- `highscores.html`: A page displaying the top 5 highest scores.
- `highscores.css`: Styling for the high scores page.
- `highscores.js`: Logic for retrieving and displaying the high scores from local storage.
- `app.css`: Common styling used across the application.

## Features
- **Fetching Questions**: Uses the Open Trivia Database (OpenTDB) API to fetch quiz questions.
- **Quiz Gameplay**: Users can answer a series of quiz questions.
- **Score Saving**: After completing the quiz, users can enter their username and save their score.
- **High Scores**: The top 5 highest scores are saved in the local storage and can be viewed on the high scores page.

## Usage
1. **Starting the Quiz**:
    - Open `index.html` in your web browser.
    - Click on the "Start Quiz" button to begin.

2. **Playing the Game**:
    - Answer the questions displayed on `game.html`.
    - Your score is calculated based on correct answers.

3. **Saving Your Score**:
    - After completing the quiz, you are redirected to `end.html`.
    - Enter your username and click "Save Score" to store your score in local storage.

4. **Viewing High Scores**:
    - Navigate to `highscores.html` to view the top 5 highest scores saved in local storage.

## API Integration
This project uses the [Open Trivia Database API](https://opentdb.com/api_config.php) to fetch quiz questions. The questions are retrieved dynamically and displayed to the user during the quiz.

## Local Storage
The application uses the browser's local storage to save the top 5 highest scores. This allows scores to persist even after the browser is closed or the page is refreshed.
