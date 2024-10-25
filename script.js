document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);

const quizQuestions = [
    { question: "5+5", answer: "10" },
    { question: "12-6", answer: "6" },
    { question: "7*3", answer: "21" },
    { question: "50/2", answer: "25"}
];

let currentQuestion = 0;
let score = 0;
const progressBar = document.getElementById('progress-bar');

function startQuiz() {
    const username = document.getElementById('username').value;
    if (username.trim() === "") {
        alert("Enter username to begin quiz");
        return;
    }

    document.getElementById('authentication').style.display='none';
    document.getElementById('quiz-section').style.display='block';
    loadQuestion();
}

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `<h3>${quizQuestions[currentQuestion].question}</h3>`;
    document.getElementById('feedback').textContent='';
    document.getElementById('answer').value = '';
}

document.getElementById('quiz-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const userAnswer = document.getElementById('answer').value;
    checkAnswer(userAnswer);
});

function checkAnswer(userAnswer) {
    const feedback = document.getElementById('feedback');
    if (userAnswer === quizQuestions[currentQuestion].answer) {
        feedback.textContent = "Correct!";
        feedback.className = 'correct';
        score++;
    } else {
        feedback.textContent = `Incorrect. The correct answer was ${quizQuestions[currentQuestion].answer}.`
        feedback.className = 'incorrect'
    }

    currentQuestion++;
    updateProgressBar();

    if (currentQuestion < quizQuestions.length) {
        setTimeout(loadQuestion, 1000);
    } else {
        endQuiz();
    }
}

function updateProgressBar() {
    const progress = (currentQuestion / quizQuestions.length) * 100;
    progressBar.style.width = progress + `%`;
}

function endQuiz() {
    document.getElementById(`quiz-section`).style.display = `none`;
    document.getElementById(`score-section`).style.display = `block`;
    document.getElementById(`final-score`).textContent = `Your score: ${score} out of ${quizQuestions.length}`;
}

document.getElementById('restart-btn').addEventListener('click', function () {
    score = 0;
    currentQuestion = 0;
    document.getElementById('score-section').style.display = 'none';
    document.getElementById('authentication').style.display = 'block';
    progressBar.style.width = '0';
})