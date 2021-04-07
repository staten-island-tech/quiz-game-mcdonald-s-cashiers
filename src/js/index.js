const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = 0;
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availibleQuestions = [];

let questions = [
  {
    question: "Who founded McDonalds?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 2,
  },

  {
    question: "When was McDonalds founded?",
    choice1: "a",
    choice2: "b",
    choice3: "c",
    choice4: "d",
    answer: 3,
  },

  {
    question: "Who is the mascot of McDonalds",
    choice1: "w",
    choice2: "x",
    choice3: "y",
    choice4: "z",
    answer: 1,
  },

  {
    question: "What is the cheapest item on the McDonalds menu?",
    choice1: "o",
    choice2: "p",
    choice3: "q",
    choice4: "r",
    answer: 4,
  },

  {
    question: "What is the most popular item on the McDonalds menu?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 2,
  },
];

const maxQuestions = 5;
const maxPoints = 100;
