// Array to store flashcards
var flashcards = [];

// Score variable
var score = 0;

// Function to add a new flashcard
function addFlashcard() {
    var question = prompt("Enter the question:");
    var answer = prompt("Enter the answer:");

    if (question && answer) {
        flashcards.push({ question: question, answer: answer });
        renderFlashcards();
    } else {
        alert("Please enter both question and answer.");
    }
}

// Function to render flashcards
function renderFlashcards() {
    var flashcardContainer = document.getElementById("flashcard-container");
    flashcardContainer.innerHTML = "";

    flashcards.forEach(function(flashcard, index) {
        var card = document.createElement("div");
        card.classList.add("flashcard");
        card.textContent = "Flashcard " + (index + 1);
        card.addEventListener("click", function() {
            showQuiz(index);
        });
        flashcardContainer.appendChild(card);
    });
}

// Function to show quiz
function showQuiz(index) {
    var quizContainer = document.getElementById("quiz-container");
    var questionElement = document.getElementById("question");
    var answerElement = document.getElementById("answer");
    var scoreElement = document.getElementById("score");

    questionElement.textContent = flashcards[index].question;
    answerElement.value = "";
    scoreElement.textContent = "Score: " + score;

    document.getElementById("flashcard-container").style.display = "none";
    document.getElementById("add-flashcard-btn").style.display = "none";
    document.getElementById("start-quiz-btn").style.display = "none";
    quizContainer.style.display = "block";

    document.getElementById("submit-answer-btn").onclick = function() {
        var userAnswer = answerElement.value.trim().toLowerCase();
        var correctAnswer = flashcards[index].answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            score++;
            scoreElement.textContent = "Score: " + score;
        }

        if (index < flashcards.length - 1) {
            index++;
            showQuiz(index);
        } else {
            alert("Quiz completed! Your score is: " + score);
            resetQuiz();
        }
    };
}

// Function to reset quiz
function resetQuiz() {
    score = 0;
    document.getElementById("flashcard-container").style.display = "flex";
    document.getElementById("add-flashcard-btn").style.display = "inline-block";
    document.getElementById("start-quiz-btn").style.display = "inline-block";
    document.getElementById("quiz-container").style.display = "none";
}

// Event listeners for buttons
document.getElementById("add-flashcard-btn").addEventListener("click", addFlashcard);
document.getElementById("start-quiz-btn").addEventListener("click", function() {
    if (flashcards.length === 0) {
        alert("Please add flashcards before starting the quiz.");
    } else {
        showQuiz(0);
    }
});

// Initial rendering of flashcards
renderFlashcards();
