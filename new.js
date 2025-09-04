const quizdata = [
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1,
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Syntax"
        ],
        correct: 1,
    },
    {
        question: "Which programming language is used for web apps and runs in the browser",
        options: ["Python", "Java", "JavaScript", "C++"],
        correct: 2,
    },
    {
        question: 'In Python, what does len("Hello") return?',
        options: ["4", "5", "6", "Error"],
        correct: 1,
    },
    {
        question: "Which data structure uses FIFO (First In, First Out)?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        correct: 1,
    },
];

// step 2 initialization
const quiz = document.querySelector(".quiz");
const answerele = document.querySelectorAll(".answer");

const quationele = document.getElementById("question");
const option_1 = document.getElementById("option_1");
const option_2 = document.getElementById("option_2");
const option_3 = document.getElementById("option_3");
const option_4 = document.getElementById("option_4");

const submitbtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

// step 3 load quiz
const loadquiz = () => {
    const { question, options } = quizdata[currentQuiz];
    quationele.innerText = question;
    option_1.innerText = options[0];
    option_2.innerText = options[1];
    option_3.innerText = options[2];
    option_4.innerText = options[3];
};

loadquiz();

function getselectedoption() {
    let answerelement = Array.from(answerele);
    return answerelement.findIndex((curoption) => curoption.checked);
}

const deselectanswer = () => {
    answerele.forEach((curelem) => (curelem.checked = false));
};

submitbtn.addEventListener("click", function () {
    const selectoptionindex = getselectedoption();
    console.log("Selected:", selectoptionindex);

    if (selectoptionindex === -1) {
        alert("Please select an answer!");
        return;
    }

    if (selectoptionindex === quizdata[currentQuiz].correct) {
        score++;
    }

    currentQuiz++;

    if (currentQuiz < quizdata.length) {
        deselectanswer();
        loadquiz();
    } else {
        quiz.innerHTML = `
            <div class="result">
                <h1>Your Score: ${score}/${quizdata.length} Correct Answers</h1>
                <p>Congratulations on completing the quiz!🎉🎉</p>
                <button class="reload-button" onclick="location.reload()">Play Again</button>
            </div>`;
    }
});
