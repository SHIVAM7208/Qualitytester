// script.js

async function loadComponent(id, file, callback) {
    try {
        const response = await fetch(file);
        if (response.ok) {
            document.getElementById(id).innerHTML = await response.text();
            if (callback) callback(); // Execute callback after content loads
        } else {
            console.error(`Failed to load ${file}`);
        }
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    // Load header first, then set up event listeners
    await loadComponent("header", "/components/header.html", setupHeaderLinks);
    await loadComponent("footer", "/components/footer.html");
    await loadComponent("footer1", "/components/footer1.html");
    await loadComponent("ad-bar", "/components/ad-bar.html");

    // Scroll-to-top button functionality
    document.getElementById("scrollToTopBtn")?.addEventListener("click", scrollToTop);

    // Other functionalities
    document.getElementById('submitButton')?.addEventListener('click', submitForm);
    document.getElementById('Wcompleted')?.addEventListener('click', handleWaits);
    document.getElementById('downloadPDFBtn')?.addEventListener('click', downloadPDF);
    document.getElementById('autocomplete')?.addEventListener('click', setupAutoSuggestion);
    document.getElementById('mousehover')?.addEventListener('mouseenter', setupHoverMenu);
document.getElementById('goToTop')?.addEventListener('click', setupScrollToTop);
document.getElementById('reloadPage')?.addEventListener('click', setupPageReload);

});

// ✅ Use Event Delegation for Navigation Links
function setupHeaderLinks() {
    document.getElementById("header").addEventListener("click", function (event) {
        const target = event.target.closest("a.nav-link"); // Ensure it is a navigation link
        if (target && target.href) {
            event.preventDefault(); // Prevent default anchor behavior
            window.location.href = target.getAttribute("href"); // Redirect manually
        }
    });
}

/**
 * Dynamically loads an HTML component into an element by ID
 * @param {string} elementId - The ID of the target element
 * @param {string} filePath - The path to the HTML file to load
 * @param {function} [callback] - Optional callback function after the component is loaded
 */
function loadComponent(elementId, filePath, callback) {
    const element = document.getElementById(elementId);
    if (element) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
                return response.text();
            })
            .then(data => {
                element.innerHTML = data;
                if (callback) callback();
            })
            .catch(console.error);
    }
}

/**
 * Toggle visibility of the Scroll to Top button
 */
function toggleScrollToTopButton() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (scrollToTopBtn) {
        const shouldDisplay = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;
        scrollToTopBtn.style.display = shouldDisplay ? "block" : "none";
    }
}

/**
 * Scroll the window to the top smoothly
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Validates the login form
 */
function validateForm() {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
    const usernamePattern = /^[A-Za-z]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Clear previous messages
    message.innerHTML = "";

    if (!usernamePattern.test(userName)) {
        message.innerHTML = "Username should only contain alphabets.";
        document.getElementById("forgotPassword").style.display = "none";
        return false;
    }

    if (!passwordPattern.test(password)) {
        message.innerHTML = "Password must contain at least 8 characters, including both letters and numbers.";
        document.getElementById("forgotPassword").style.display = "block";
        return false;
    }

    if (password === "selenium") {
        message.innerHTML = `Welcome, ${userName}! Let's learn Selenium together.`;
        document.getElementById("forgotPassword").style.display = "none";
    } else {
        message.innerHTML = "Incorrect password.";
        document.getElementById("forgotPassword").style.display = "block";
    }
}

/**
 * Submits the form and displays a thank you message
 */
function submitForm() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const message = `Thank You! Welcome ${firstName} ${lastName}, let's learn Selenium together`;
    document.getElementById('thankYouMessage').innerText = message;
}

/**
 * Handles the waits functionality for the registration form
 */
document.getElementById('Wcompleted').addEventListener('click', function() {
    const fields = [
        document.getElementById('Wusername').value,
        document.getElementById('email').value,
        document.getElementById('password').value,
        document.getElementById('phone').value,
        document.getElementById('address').value
    ];

    const filledFieldsCount = fields.filter(field => field !== '').length;
    let delayTime = filledFieldsCount * 5000; // 5 seconds per field

    if (filledFieldsCount > 0) {
        document.getElementById('WsubmitBtn').style.display = 'none'; // Hide submit button initially
        document.getElementById('delayDisplay').textContent = `Delay: ${delayTime / 1000} seconds...`;
        const startTime = new Date();

        setTimeout(function() {
            document.getElementById('WsubmitBtn').style.display = 'inline-block'; // Show submit button after delay

            // Display current time when the submit button appears
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            const elapsedTime = (now - startTime) / 1000;
            document.getElementById('timeDisplay').textContent = `Submit button visible after ${elapsedTime} seconds at: ${timeString}`;
        }, delayTime);
    } else {
        alert('Please fill at least one field!');
    }
});


/**
 * Download a PDF version of the Selenium Cheatsheet
 */
function downloadPDF() {
    const element = document.getElementById('content');
    html2pdf().from(element).set({
        filename: 'Selenium_Cheatsheet.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'in', format: 'letter', compressPDF: true }
    }).save();
}

/**
 * Helper functions for validation
 */
function isValidMobileNumber(number) {
    return /^[0-9]{10}$/.test(number);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidDOB(dob) {
    return new Date(dob) < new Date();
}
function toggle(element) {
    // Toggle 'open' class
    element.parentNode.classList.toggle('open');
  }
  function displayAlert() {
    const name = document.querySelector('input[placeholder="Enter Your Name"]').value;
    if (name) {
        alert(`Selenium is your, ${name}!`);
    } else {
        alert('are you ready to learn selenium.');
    }
}

function displayConfirm() {
    const name = document.querySelector('input[placeholder="Enter Your Name"]').value;
    if (name) {
        confirm(`Is your name ${name}?`);
    } else {
        confirm('Please enter your name.');
    }
}

function setupAutoSuggestion() {
    const languages = [
        "JavaScript", "Python", "Java", "C#", "C++", "Ruby", "Swift", "Go", "Kotlin", "Rust",
        "PHP", "TypeScript", "Perl", "Scala", "Haskell", "Lua", "Dart", "Objective-C", "R", "Elixir",
        "Clojure", "F#", "Shell", "Bash", "SQL", "HTML", "CSS", "MATLAB", "Groovy", "VHDL"
    ];

    const inputField = document.getElementById("autocomplete");
    const suggestionBox = document.createElement("ul");

    function createSuggestionBox() {
        suggestionBox.setAttribute("id", "suggestion-list");
        suggestionBox.style.position = "absolute";
        suggestionBox.style.border = "1px solid #ccc";
        suggestionBox.style.listStyle = "none";
        suggestionBox.style.padding = "5px";
        suggestionBox.style.width = inputField.offsetWidth + "px";
        suggestionBox.style.backgroundColor = "#fff";
        suggestionBox.style.zIndex = "1000";
        suggestionBox.style.display = "none";
        inputField.parentNode.appendChild(suggestionBox);
    }

    function updateSuggestions() {
        const query = inputField.value.toLowerCase();
        suggestionBox.innerHTML = "";
        if (!query) {
            suggestionBox.style.display = "none";
            return;
        }

        const filteredLanguages = languages.filter(lang => lang.toLowerCase().includes(query));
        filteredLanguages.forEach(lang => {
            const item = document.createElement("li");
            item.textContent = lang;
            item.style.padding = "5px";
            item.style.cursor = "pointer";
            item.addEventListener("click", function () {
                inputField.value = lang;
                suggestionBox.style.display = "none";
            });
            suggestionBox.appendChild(item);
        });

        suggestionBox.style.display = filteredLanguages.length > 0 ? "block" : "none";
    }

    function hideSuggestions(event) {
        if (event.target !== inputField) {
            suggestionBox.style.display = "none";
        }
    }

    createSuggestionBox();
    inputField.addEventListener("input", updateSuggestions);
    document.addEventListener("click", hideSuggestions);
}
function setupHoverMenu() {
    const hoverMenu = document.getElementById("hoverMenu");
    if (hoverMenu) {
        hoverMenu.style.display = "block";

        hoverMenu.addEventListener("mouseleave", () => {
            setTimeout(() => {
                hoverMenu.style.display = "none";
            }, 500);
        });
    }
}

function setupScrollToTop(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupPageReload(event) {
    event.preventDefault();
    location.reload();
}
