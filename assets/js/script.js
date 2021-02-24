const startBtn = document.getElementById('start');
const questionsEl = document.getElementById('questions');
const questionEl = document.getElementById('question');
const AnswerEl = document.getElementById('answerbtn');

let randomQuestion, chosenQuestion


startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    console.log('Started');
    startBtn.classList.add('hidden');
    questionsEl.classList.remove('hidden');
    randomQuestion = questions.sort(() => Math.random() - .5);
    chosenQuestion = 0;
    newQuestion();
};

function newQuestion() {
    resetQuestion()
 showQuestion(randomQuestion[chosenQuestion])
};

function showQuestion (question) {
questionEl.innerText = question.question;
};

function resetQuestion() {

}

function chooseAnswer() {

};

const questions = [
    {
        question: 'What is a word used to declare a variable?',
        answers: [
            { text: 'vari', correct: false},
            { text: 'y', correct: false},
            { text: 'var', correct: true},
            { text: 'value', correct: false}
        ]
    }
]