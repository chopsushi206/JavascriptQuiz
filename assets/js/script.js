// write function to decrement timer 10 seconds when wrong answer given
// write a function for choosing an answer
// need a function to keep track of score and store score once quiz is over.
// need to address functionality of timer when quiz is restarted. something funny happens



const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');
const answerBtns = document.getElementById('answerbtn');
const nextBtn = document.getElementById('next');
const questionsEl = document.getElementById('questions');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answers');
const timerEl = document.getElementById('countdown');
const scoreEl = document.getElementById('score');
const quizoverEl = document.getElementById('quizOver');

let randomQuestion, chosenQuestion
let timeLeft;

// Script for Countdown Timer

function setCountdown() {
    timeLeft = 120;
    var timerInterval = setInterval(function () {
        timeLeft--;

        minutes = (Math.floor(timeLeft / 60));
        seconds = timeLeft % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timerEl.textContent = minutes + ':' + seconds + ' remaining.';

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            nextBtn.classList.add('hidden');
            questionsEl.classList.add('hidden');
            quizoverEl.classList.remove('hidden');
            restartBtn.classList.remove('hidden');
        }

    }, 1000);
};

function timerReset() {
    timeLeft = 120;
    var timerInterval = setInterval(function () {
        timeLeft--;
    }, 1000);
};





// Script for questions

function newQuestion() {
    resetQuestion()
    showQuestion(randomQuestion[chosenQuestion])
};


function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        answerEl.appendChild(button);
        button.addEventListener('click', chooseAnswer);

    })

};


function chooseAnswer() {
    if (answers.correct = true) {
        console.log(answers.correct);
    };
    if (randomQuestion.length > chosenQuestion + 1) {
        nextBtn.classList.remove('hidden')
    } else {
        questionsEl.classList.add('hidden');
        quizoverEl.classList.remove('hidden');
        restartBtn.classList.remove('hidden');
    };
};

function resetQuestion() {
    nextBtn.classList.add('hidden');
    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild)
    };
};


nextBtn.addEventListener('click', nextQuestion);

function nextQuestion() {
    chosenQuestion++
    newQuestion()
};

// Quiz Questions Object

const questions = [
    {
        question: 'What is a word used to declare a variable?',
        answers: [
            { text: 'variable', correct: false },
            { text: 'y', correct: false },
            { text: 'var', correct: true },
            { text: 'value', correct: false }
        ]
    },
    {
        question: 'A variable can contain which items?',
        answers: [
            { text: 'Strings', correct: false },
            { text: 'Numbers', correct: false },
            { text: 'Booleans', correct: false },
            { text: 'Any of these', correct: true }
        ]
    },
    {
        question: 'Is javascript a case-sensitive language?',
        answers: [
            { text: 'yes', correct: true },
            { text: 'no', correct: false }
        ]
    },
    {
        question: 'Which of the following type of variable is visible everywhere in your JavaScript code?',
        answers: [
            { text: 'Global variables', correct: true },
            { text: 'Local variables', correct: false },
            { text: 'Both of these', correct: false },
            { text: 'None of these', correct: false }
        ]
    },
    {
        question: 'Which built-in method combines the text of two strings and returns a new string?',
        answers: [
            { text: 'append()', correct: false },
            { text: 'concant()', correct: true },
            { text: 'attatch()', correct: false },
            { text: 'None of these', correct: false }
        ]
    },
    {
        question: 'Which of the following type of variable takes precedence over other if names are same?',
        answers: [
            { text: 'Global', correct: false },
            { text: 'Local', correct: true },
            { text: 'Both of these', correct: false },
            { text: 'None of these', correct: false }
        ]
    },

]

// Script to start quiz

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    startBtn.classList.add('hidden');
    questionsEl.classList.remove('hidden');
    randomQuestion = questions.sort(() => Math.random() - .5);
    chosenQuestion = 0;
    newQuestion();
    setCountdown();
};

function restartQuiz() {
    questionsEl.classList.remove('hidden');
    randomQuestion = questions.sort(() => Math.random() - .5);
    chosenQuestion = 0;
    newQuestion();
    setCountdown();
    quizoverEl.classList.add('hidden');
    restartBtn.classList.add('hidden');
};