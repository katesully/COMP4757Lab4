// search.js

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchResult = document.getElementById('searchResult');

    searchBtn.addEventListener('click', () => {
        const word = document.getElementById('searchWord').value.trim();

        // Simple input validation: non-empty strings without numbers
        const wordValid = /^[A-Za-z\s]+$/.test(word);

        if (!word) {
            searchResult.textContent = "Word is required.";
            searchResult.style.color = 'red';
            return;
        }

        if (!wordValid) {
            searchResult.textContent = "Invalid input. Please enter a valid word without numbers.";
            searchResult.style.color = 'red';
            return;
        }

        const xhr = new XMLHttpRequest();
        // REPLACE
        xhr.open('GET', `https://yourDomainName2.xyz/api/definitions?word=${encodeURIComponent(word)}`, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                searchResult.innerHTML = `<strong>${word}:</strong> ${response.definition}<br>Request #${response.requestNumber}`;
                searchResult.style.color = 'green';
            } else if (xhr.status === 404) {
                const response = JSON.parse(xhr.responseText);
                searchResult.innerHTML = `Request #${response.requestNumber}, word '${word}' not found!`;
                searchResult.style.color = 'red';
            } else {
                const response = JSON.parse(xhr.responseText);
                searchResult.textContent = `Error: ${response.message}`;
                searchResult.style.color = 'red';
            }
        };

        xhr.onerror = function () {
            searchResult.textContent = 'Request failed. Please try again.';
            searchResult.style.color = 'red';
        };

        xhr.send();
    });
});
