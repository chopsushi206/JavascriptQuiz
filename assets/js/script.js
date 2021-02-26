// Display quizOver screen when timer ends or all questions answered
// write function to decrement timer 10 seconds when wrong answer given
// have answers from question object insert into answer buttons
// write a function for choosing an answer
// need a function to keep track of score and store score once quiz is over.



const startBtn = document.getElementById('start');
const nextBtn = document.getElementById('next');
const questionsEl = document.getElementById('questions');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answers');
const timerEl = document.getElementById("countdown");


let randomQuestion, chosenQuestion


// Script for Countdown Timer

var timeLeft = 120;

function setCountdown() {
    var timerInterval = setInterval(function () {
        timeLeft--;

        minutes = (Math.floor(timeLeft / 60));
        seconds = timeLeft % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerEl.textContent = minutes + ":" + seconds + " remaining.";

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }

    }, 1000);
};

function sendMessage() {
    timerEl.textContent = "Times Up!";
};

function newQuestion() {
    resetQuestion()
    showQuestion(randomQuestion[chosenQuestion])
};

// Script for questions

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        answerEl.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        };
        button.addEventListener('click', chooseAnswer());
    })

};

function resetQuestion() {
    nextBtn.classList.add('hidden');
    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild)
    };
};

function chooseAnswer() {

};

const questions = [
    {
        question: 'What is a word used to declare a variable?',
        answers: [
            { text: 'variable', correct: false },
            { text: 'y', correct: false },
            { text: 'var', correct: true },
            { text: 'value', correct: false }
        ]
    }
]

// Script to start quiz

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    console.log('Started');
    startBtn.classList.add('hidden');
    questionsEl.classList.remove('hidden');
    randomQuestion = questions.sort(() => Math.random() - .5);
    chosenQuestion = 0;
    newQuestion();
    setCountdown();
};