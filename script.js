content = document.getElementById("questionContent");
let score = 0;

class Question {
    constructor(statement, answers, rightAnswer) {
    this.statement = statement;
    this.answers = answers;
    this.rightAnswer = rightAnswer;
    }

    displayStatement() {
        content.innerHTML = `<p> ${this.statement} <p>`;
    }

    displayAnswers() {
        for (let i=0; i<this.answers.length; i++) {
            content.innerHTML += `<p>${i+1}. <button id="answer-${i}" class="answer">${this.answers[i]}</button></p>`;
            document.querySelectorAll('.answer').forEach(item => {
                item.addEventListener('click', () => {
                    if (item.innerHTML==this.rightAnswer) {
                        console.log("Bravo! c'est juste!");
                        score++;
                        item.style.backgroundColor = "#2CAE66";
                    } else {
                        console.log("Bouh! Essaye à nouveau :)");
                        item.style.backgroundColor = "#F93822";
                    }
                })
              })
        }
    }
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

function makeQuizz() {
    let question1 = new QuestionWithImg ("Tu es?", ["Une banane", "Une pomme", "Une cerise"], "Une banane", "1");
    question1.displayStatement();
    question1.displayImg();
    question1.displayAnswers();
}

makeQuizz();

