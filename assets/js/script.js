

// DOM Elements
const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');
const answerBtns = document.getElementById('answerbtn');
const introEl = document.getElementById('intro');
const questionsEl = document.getElementById('questions');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answers');
const timerEl = document.getElementById('countdown');
const scoreEl = document.getElementById('score');
const quizoverEl = document.getElementById('quizOver');
const scoreresultEl = document.getElementById('quizResult');
const userName = document.getElementById('username');
const savescoreBtn = document.getElementById('savescorebtn');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const scorelistEl = document.getElementById('scorelist');


// Global variables
const maxHighScores = 5;
const initialTime = 120;
let randomQuestion, chosenQuestion;
let timeLeft = initialTime;
let score = 0;

// function to display the countdown within the browser in minutes and seconds.
function renderTime() {
    let minutes = (Math.floor(timeLeft / 60));
    let seconds = timeLeft % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerEl.textContent = minutes + ':' + seconds + ' remaining.';
}

//function that decrements timer countdown once user starts quiz. also calls endQuiz function when time runs out
function setCountdown() {
    renderTime();
    var timerInterval = setInterval(function () {
        renderTime();
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }

    }, 1000);
};

// Resets score when quiz restarted
function resetScore() {
    score = 0;
    scoreEl.innerText = score + ' points.';
};

// funtion to obtain a random question. variables randomQuestion and chosenQuestion defined within start quiz function
function newQuestion() {
    resetQuestion()
    showQuestion(randomQuestion[chosenQuestion])
};

//shows current question and renders answer buttons
function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        answerEl.appendChild(button);
        button.addEventListener('click', chooseAnswer);
    });

};

// executed when user clicks answer button
// adds 10 points for each correct answer and decrements 10 seconds from countdown when wrong answer selected
// also calls nextQuestion function if questions remain in array, otherwise calls endQuiz function
function chooseAnswer() {
    let isRight = questions[chosenQuestion].answers.find(answer => answer.text === this.textContent)
    if (isRight.correct) {
        score += 10;
    } else {
        timeLeft -= 10;
    };
    scoreEl.innerText = score + ' points.';
    if (randomQuestion.length > chosenQuestion + 1) {
        nextQuestion();
    } else {
        endQuiz();
    };

};

//resets question
function resetQuestion() {
    if (answerEl.firstChild) {
        answerEl.innerHTML = "";
    };
};


// selects next question
function nextQuestion() {
    chosenQuestion++
    newQuestion()
};


// Quiz Questions Object Array
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

// Event listeners for Start and Restart button
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

// function that initial starts App
function startQuiz() {
    startBtn.classList.add('hidden');
    introEl.classList.add('hidden');
    questionsEl.classList.remove('hidden');
    randomQuestion = questions.sort(() => Math.random() - .5);
    chosenQuestion = 0;
    newQuestion();
    timeLeft = initialTime;
    setCountdown();
};

// function to restart after quiz has been completed before
function restartQuiz() {
    questionsEl.classList.remove('hidden');
    randomQuestion = questions.sort(() => Math.random() - .5);
    chosenQuestion = 0;
    newQuestion();
    timeLeft = initialTime;
    setCountdown();
    resetScore();
    quizoverEl.classList.add('hidden');
    restartBtn.classList.add('hidden');
};

// function that runs if time runs out or user completes questions
function endQuiz() {
    questionsEl.classList.add('hidden');
    quizoverEl.classList.remove('hidden');
    restartBtn.classList.remove('hidden');
    scoreresultEl.innerHTML = score;
};

// Saves last score to local storage

function saveFinalScore() {
    let userInfo = {
        name: userName.value.trim(),
        scoreResult: score,
    };
    highScores.push(userInfo);
    highScores.sort((a,b) => b.scoreResult - a.scoreResult);
    highScores.slice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
};

// Grabs string storing high score info from local storage and display on page
function renderFinalScore() {
   let userScore = JSON.parse(localStorage.getItem('highScores'));
    var userScoreLength = userScore.length;
    scorelistEl.innerHTML = '';
    for (var i = 0; i < userScoreLength; i++) {
        console.log(userScore[i]);
        const listposition = document.createElement('li');
        listposition.innerText = userScore[i].name + ' ' + userScore[i].scoreResult + ' points';
        listposition.classList.add('scoreplace');
        scorelistEl.appendChild(listposition);
    };
};

// event listener for button to prevent page refresh and submit values to local storage
savescoreBtn.addEventListener('click', function (event) {
    event.preventDefault();
    saveFinalScore();
    renderFinalScore();
});

//function to fire renderFinalScore on page load
/*function init() {
    renderFinalScore();
}
init();*/