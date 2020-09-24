content = document.getElementById("questionContent");
nextButton = document.getElementById("next");
let score = 0;
let questionList = [];
let allCorrect = false;

function playFail() {
  let audio = document.getElementById("audioFail");
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

function playSuccess() {
  let audio = document.getElementById("audioSuccess");
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

class Question {
  constructor(statement, answers, rightAnswer) {
    this.statement = statement;
    this.answers = answers;
    this.rightAnswer = rightAnswer;
  }

  displayStatement() {
    content.innerHTML += `<p> ${this.statement} <p>`;
  }

  displayAnswers() {
    this.nbrRightAnswers = 0;
    for (let i = 0; i < this.answers.length; i++) {
      content.innerHTML += `<p>${
        i + 1
      }. <button id="answer-${i}" class="answer">${
        this.answers[i]
      }</button></p>`;
      document.querySelectorAll(".answer").forEach((item) => {
        item.addEventListener("click", () => {
          if (item.innerHTML == this.rightAnswer[0] || item.innerHTML == this.rightAnswer[1]) {
            console.log("Bravo! c'est juste!");
            item.style.backgroundColor = "#2CAE66";
            item.setAttribute("onclick", playSuccess());
            this.nbrRightAnswers++;
          } else {
            console.log("Bouh! Essaye à nouveau :)");
            item.style.backgroundColor = "#F93822";
            item.setAttribute("onclick", playFail());
            this.nbrRightAnswers--;
          }

          if (this.nbrRightAnswers == this.rightAnswer.length) {
            allCorrect = true;
          } else {
            allCorrect = false;
          }
        });
      });
    }
  }
}

function allAnswersRight(userAnswer, answers) {
  let nbrRightAnswers = 0;
  let allRight = false;
  for (let i = 0; i < answers.length; i++) {
    if (userAnswer == answers[i]) {
      nbrRightAnswers++;
    }
  }
  if (nbrRightAnswers == answers.length) {
    allRight = true;
  }
  return allRight;
}

class QuestionWithImg extends Question {
  constructor(statement, answers, rightAnswer, image) {
    super(statement, answers, rightAnswer);
    this.image = image;
  }

  displayImg() {
    content.innerHTML += `<p><img src="img/${this.image}.jpg" alt="question image"></p>`;
  }
}

function makeQuestion(statement, answers, rightAnswer, image = "none") {
  let question;
  if (image != "none") {
    question = new QuestionWithImg(statement, answers, rightAnswer, image);
    questionList.push(question);
  } else {
    question = new Question(statement, answers, rightAnswer);
    questionList.push(question);
  }
}

function displayQuizz(questionList, index) {
  content.innerHTML = "";
  content.innerHTML = `<div id="currentQuestion">Question ${index + 1}/${
    questionList.length
  }</div>`;
  if (questionList[index].hasOwnProperty("image")) {
    questionList[index].displayStatement();
    questionList[index].displayImg();
  } else {
    questionList[index].displayStatement();
  }

  questionList[index].displayAnswers();

  nextButton.addEventListener("click", () => {
    if (index < questionList.length - 1) {
      displayQuizz(questionList, index + 1);
      if (allCorrect) {
        score++;
        allCorrect = false;
      }
    } else {
      content.innerHTML = "<p id='score'>Score: " + +score + "/" + questionList.length + "</p>";
      nextButton.innerHTML = "Try Again!";
      nextButton.setAttribute("onClick", "window.location.reload();");
    }
  });
}

console.log("Je t'es vu, ferme l'outil dev!");
makeQuestion(
  "What are 2 native functions to run code asynchronously in JavaScript ?",
  [
    "timeout",
    "setTimeout",
    "startInterval",
    "delay",
    "setInterval",
    "repeat",
    "interval",
  ],
  ["setTimeout", "setInterval"]
);

makeQuestion(
  "What's the output of this code : ",
  ["2", "undefined", "x", "8"],
  ["2"], 
  "2"
);

makeQuestion(
  "Question 3 : What's the output of this code : ",
  ["2", "callback", "undefined", "nothing", "x", "4"],
  ["2"], 
  "3"
);
displayQuizz(questionList, 0);
