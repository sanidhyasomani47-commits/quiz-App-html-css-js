const quiz = document.querySelector(".quiz");
const answerele = document.querySelectorAll(".answer");

const quationele = document.getElementById("question");
const option_1 = document.getElementById("option_1");
const option_2 = document.getElementById("option_2");
const option_3 = document.getElementById("option_3");
const option_4 = document.getElementById("option_4");

const submitbtn = document.getElementById("submit");
const toggleBtn = document.getElementById("toggle-dark");
const quizSection = document.querySelector(".quiz-section");

// Check saved theme in localStorage
if (localStorage.getItem("theme") === "dark") {
    quizSection.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.addEventListener("click", () => {
    quizSection.classList.toggle("dark-mode");

    if (quizSection.classList.contains("dark-mode")) {
        toggleBtn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        toggleBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
});

let quizdata = [];   // will be filled from API
let currentQuiz = 0;
let score = 0;

// 🔹 Fetch questions from API
async function fetchQuestions() {
    try {
        const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
        const data = await res.json();
        quizdata = data.results.map((q) => {
            // Correct + wrong answers mixed
            const options = [...q.incorrect_answers];
            const correctIndex = Math.floor(Math.random() * (options.length + 1));
            options.splice(correctIndex, 0, q.correct_answer);

            return {
                question: q.question,
                options: options,
                correct: correctIndex,
            };
        });

        loadquiz(); // start quiz
    } catch (error) {
        console.error("Error fetching questions:", error);
        quationele.innerText = "Failed to load questions. Try again later.";
    }
}

// 🔹 Load question into UI
const loadquiz = () => {
    const { question, options } = quizdata[currentQuiz];
    quationele.innerHTML = question; // use innerHTML because API has HTML entities
    option_1.innerHTML = options[0];
    option_2.innerHTML = options[1];
    option_3.innerHTML = options[2];
    option_4.innerHTML = options[3];
};

function getselectedoption() {
    let answerelement = Array.from(answerele);
    return answerelement.findIndex((curoption) => curoption.checked);
}

const deselectanswer = () => {
    answerele.forEach((curelem) => (curelem.checked = false));
};

submitbtn.addEventListener("click", function () {
    const selectoptionindex = getselectedoption();
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
                <p>Congratulations on completing the quiz! 🎉</p>
                <button class="reload-button" onclick="location.reload()">Play Again</button>
            </div>`;
    }
});

// 🔹 Start quiz by fetching API questions
fetchQuestions();
