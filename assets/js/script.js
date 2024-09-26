const API_KEY = "UaAUn710LT0TtNcIl9Pa3nnAcdc";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

//______________________________________To check if the key is valid

document.getElementById("status").addEventListener("click", e => getStatus(e));

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`; // Add the API key as a query parameter
    try {
        const response = await fetch(queryString); // Await the fetch call
        const data = await response.json(); // Parse response as JSON

        if (response.ok) {
            displayStatus(data); // Display the status if response is OK
        } else {
            throw new Error(data.error || "An error occurred while checking API status.");
        }
    } catch (error) {
        console.error("Error fetching API status:", error.message);
    }
}

function displayStatus(data) {
    const titleModal = document.getElementById("resultsModalTitle");
    titleModal.innerText = "Your API Key Status:";

    const contentModal = document.getElementById("results-content");
    contentModal.innerText = `Your key is valid until: ${data.expiry}`;
    resultsModal.show();
}

//______________________________________To run the JS code check

document.getElementById("submit").addEventListener("click", e => postForm(e));

async function postForm(e) {
    e.preventDefault(); // Prevent form from submitting and reloading the page

    const form = new FormData(document.getElementById("checksform")); // Capture form data
    form.append("api_key", API_KEY); // Add API key to form data

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: form, // Use the form data directly in the body
        });

        const data = await response.json(); // Parse response as JSON

        if (response.ok) {
            displayErrors(data); // Display errors or response if successful
        } else {
            throw new Error(data.error || "An error occurred while checking your code.");
        }
    } catch (error) {
        console.error("Error submitting form:", error.message);
    }
}