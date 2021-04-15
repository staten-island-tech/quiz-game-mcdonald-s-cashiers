const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availibleQuestions = [];

let questions = [
  {
    question: "Who founded McDonalds?",
    choice1: "Elon Musk",
    choice2: "George Washington",
    choice3: "Ronald McDonalds",
    choice4: "Rick Astley",
    answer: 3,
  },

  {
    question: "When was McDonalds founded?",
    choice1: "During the last ice age",
    choice2: "When Harvard students graduated and needed a job",
    choice3: "1955",
    choice4: "1738",
    answer: 3,
  },

  {
    question: "Who is the mascot of McDonalds",
    choice1: "Godzilla",
    choice2: "Goku",
    choice3: "A clown",
    choice4: "Rat from Ratatouille",
    answer: 3,
  },

  {
    question: "What is the cheapest item on the McDonalds menu?",
    choice1: "Fried Rice",
    choice2: "Big Mac",
    choice3: "Directions to Wendy's",
    choice4: "The Menu itself",
    answer: 4,
  },

  {
    question: "What is the most popular item on the McDonalds menu?",
    choice1: "The Big Mac",
    choice2: "Lord Dom's Regard",
    choice3: "Fried Rats",
    choice4: "The Unhappy Meal",
    answer: 1,
  },
];

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
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(maxPoints);
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      NewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

gamestart();
