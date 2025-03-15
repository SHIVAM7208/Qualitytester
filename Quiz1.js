const quizData = [
    {
        question: "Which Selenium WebDriver method would you use to switch control from the current window to a different window?",
        options: ["getWindowHandles", "switchToFrame", "getWindowHandle", "switchToWindow"],
        correct: "switchToWindow"
    },
    {
        question: "What must a developer do before initiating the target element inside nested iframes?",
        options: ["Switch to default frame", "Switch to parent frame", "Initiate switch to target frame", "Nested frames not supported"],
        correct: "Switch to parent frame"
    },
    {
        question: "How can a Selenium developer accept a popup message thrown by in-page JavaScript?",
        options: [
            "Initiate alert object and accept it",
            "Initiate accept with code snippet",
            "Initiate reject with code snippet",
            "Find alert element and close it"
        ],
        correct: "Initiate accept with code snippet"
    },
    {
        question: "How can a tester avoid an exception if an assert fails?",
        options: ["Use hard assert", "Use soft assert", "Use try-catch", "Both soft and hard assert"],
        correct: "Use soft assert"
    },
    {
        question: "Which method from Selenium WebDriver waits for a specific element to become visible?",
        options: ["findElement", "waitUntilVisible", "implicitWait", "explicitWait"],
        correct: "explicitWait"
    },
    {
        question: "After switching to a frame, what must be done before working with an element on the base page outside the frame?",
        options: [
            "Close the frame driver and initiate the driver again",
            "Quit the original driver and initiate the frame element",
            "Switch back to default content",
            "Include the base body tag in the XPath"
        ],
        correct: "Switch back to default content"
    },
    {
        question: "How can a Selenium developer select a dropdown element that is not accepting values through sendKeys?",
        options: [
            "Convert the dropdown element and select by visible text",
            "Convert the dropdown element and select by value",
            "Use driver.findElement"
        ],
        correct: "Convert the dropdown element and select by visible text"
    },
    {
        question: "What is the correct XPath to locate an element with a unique data-testid='login-button'?",
        options: [
            "//button[@data-testid='login-button']",
            "//button[data-testid='login-button']",
            "//button[contains(@data-testid,'login-button')]",
            "//button[contains(text(),'login-button')]"
        ],
        correct: "//button[@data-testid='login-button']"
    },
    {
        question: "What design pattern in Selenium is responsible for finding WebElements and performing operations on them?",
        options: [
            "WOP (Web Object Pattern)",
            "POM (Page Object Model)",
            "PDM (Page Design Model)",
            "DOM (Document Object Model)"
        ],
        correct: "POM (Page Object Model)"
    },
    {
        question: "To use the Gecko driver for Firefox versions starting with 48.x, what property needs to be set?",
        options: [
            "Set marionette to true",
            "Set marionette to false",
            "Set Firefox Profile to Legacy"
        ],
        correct: "Set marionette to true"
    },
    {
        question: "The average of 15 observations is 20. After correcting an error, what is the new average?",
        options: ["22", "28", "24"],
        correct: "24"
    },
    {
        question: "What will be the compound interest on $10,000 for 3 years at 4%, 5%, and 6% interest rates?",
        options: ["$1,600", "$1,625.5", "$2,000"],
        correct: "$1,625.5"
    },
    {
        question: "An article bought for $2000 was sold at a 60% loss. What was the selling price?",
        options: ["$600", "$700", "$800", "$900"],
        correct: "$800"
    },
    {
        question: "What is the ratio of work done by a man to a woman if 7 men and 9 women do twice the work of 4 men and 4 women?",
        options: ["2:1", "2:2", "1:1"],
        correct: "2:2"
    },
    {
        question: "A man weighing 148 lbs was replaced by another man, increasing the average weight of 15 men by 1.5 lbs. What is the weight of the new man?",
        options: ["160.5 lbs", "165.5 lbs", "170.5 lbs"],
        correct: "165.5 lbs"
    },
    {
        question: "An air conditioner was sold at a 20% profit. Had it been sold for $600 less, it would have incurred a 20% loss. What was its selling price for a 20% profit?",
        options: ["$1500", "$1800", "$2100"],
        correct: "$2100"
    },
    {
        question: "Which statement about the default method in Java is correct?",
        options: [
            "1 and 2",
            "1, 2, and 3",
            "1 and 3",
            "All 4 statements"
        ],
        correct: "1, 2, and 3"
    },
    {
        question: "What will be the output of the following Java code?",
        options: ["234", "24", "2", "246"],
        correct: "24"
    },
    {
        question: "What will be the output of this Java 8 code that iterates over a HashMap?",
        options: [
            "Key 1 Value 1, Key 2 Value 2",
            "Value 1 Key 1, Value 2 Key 2",
            "Key 1 Value 2, Key 2 Value 1"
        ],
        correct: "Key 1 Value 1, Key 2 Value 2"
    },
    {
        question: "Do the following interfaces correspond to SOLID principles?",
        options: [
            "Yes, they follow SOLID principles",
            "No, they do not follow the Single Responsibility Principle",
            "No, they do not follow the Liskov Principle"
        ],
        correct: "No, they do not follow the Single Responsibility Principle"
    }
];

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultContainer = document.getElementById('result');

// Shuffle function for options
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuiz() {
    quizContainer.innerHTML = '';
    quizData.forEach((quizItem, quizIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionTitle = document.createElement('h3');
        questionTitle.innerText = `${quizIndex + 1}. ${quizItem.question}`;
        questionDiv.appendChild(questionTitle);

        const optionsList = document.createElement('ul');
        optionsList.classList.add('options');

        const options = [...quizItem.options];
        shuffle(options);

        options.forEach(option => {
            const optionItem = document.createElement('li');
            optionItem.innerText = option;
            optionItem.addEventListener('click', () => selectOption(optionItem, quizItem.correct));
            optionsList.appendChild(optionItem);
        });

        questionDiv.appendChild(optionsList);
        quizContainer.appendChild(questionDiv);
    });
}

function selectOption(optionElement, correctAnswer) {
    const siblings = optionElement.parentNode.children;
    for (let sibling of siblings) {
        sibling.classList.remove('correct', 'incorrect');
    }

    if (optionElement.innerText === correctAnswer) {
        optionElement.classList.add('correct');
    } else {
        optionElement.classList.add('incorrect');
    }
}

function calculateScore() {
    const selectedOptions = document.querySelectorAll('.options li');
    let score = 0;

    selectedOptions.forEach(option => {
        if (option.classList.contains('correct')) {
            score++;
        }
    });

    resultContainer.innerHTML = `You got ${score} out of ${quizData.length} correct!`;
}

submitButton.addEventListener('click', calculateScore);

loadQuiz();


document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submit");
    const resultDiv = document.getElementById("result");
    const scorePopup = document.getElementById("scorePopup");
    const scoreText = document.getElementById("scoreText");
    const closePopup = document.getElementById("closePopup");

    // Example quiz logic: Calculate score

    // Show score pop-up
    function showPopup(score) {
        scoreText.textContent = `You scored: ${score} points!`;
        scorePopup.style.display = "flex"; // Show the pop-up
    }

    // Close the pop-up
    closePopup.addEventListener("click", () => {
        scorePopup.style.display = "none";
    });

    // Submit Button Logic
    submitBtn.addEventListener("click", function () {
        const score = calculateScore();
        resultDiv.innerText = `You scored ${score} points!`;
        showPopup(score); // Show score pop-up
    });
});