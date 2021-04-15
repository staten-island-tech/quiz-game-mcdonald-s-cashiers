import { questions } from "./questions";
import {
  question,
  choices,
  progressText,
  scoreText,
  progressBarFull,
} from "./Dom";

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availibleQuestions = [];

const maxQuestions = 5;
const maxPoints = 100;

// This is the function for starting off the game
gamestart = () => {
  questionCounter = 0;
  score = 0;
  availibleQuestions = [...questions];
  // Calls upon a new function known as NewQuestion
  NewQuestion();
};

// The newQuestion function that is called on
NewQuestion = () => {
  // If the amount of available questions is = 0, which means when no questions are left, it compiles the final scores and sends you to the end.html page.
  if (availibleQuestions.length === 0 || questionCounter > maxQuestions) {
    const quitorna = window.confirm(
      "Congrats, your score is: " + score + "\n\nWould you like to restart?"
    );
    if (quitorna == true) {
      window.location.reload();
    } else {
      window.location.assign("index.html");
    }
  }

  // If it does not exceed maxQuestions this code runs which adds 1 to question counter
  questionCounter++;
  // Tells you how many questions were completed
  progressText.innerText = `Question ${questionCounter} out of ${maxQuestions}`;
  // Displays the progress bar with the questions done over max questions as a percentage.
  progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

  // This variable helps to keep track of which questions the game is on
  const WhichQuestion = Math.floor(Math.random() * availibleQuestions.length);
  currentQuestion = availibleQuestions[WhichQuestion];
  question.innerText = currentQuestion.question;

  // ForEach choice, it is looking at the choice's number and assign it to whichever choice we clicked on
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  // Takes away the question just asked so it is not part of the questions array
  availibleQuestions.splice(WhichQuestion, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  // Adds an event listener for a click and when it does, runs the if statement
  choice.addEventListener("click", (e) => {
    // if it does not = accepting answers, stop the function
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    // Targets the event of the selection from the event listener above
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // if true, toggle correct css, if false, toggle incorrect css (diff colors)
    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    // if this is correct, it will increase the score by the amount of points alloted per question
    if (classToApply === "correct") {
      incrementScore(maxPoints);
    }
    // Adds to the display on the page with the allotted points.
    selectedChoice.parentElement.classList.add(classToApply);

    // Gives it a short time pause before the next question and remove the toggle css.
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      NewQuestion();
    }, 1000);
  });
});

// This is the function for incrementing the score referenced earlier.
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

// Runs the gamestart function.
gamestart();
