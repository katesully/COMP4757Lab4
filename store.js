// store.js

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    const storeResult = document.getElementById('storeResult');

    submitBtn.addEventListener('click', () => {
        const word = document.getElementById('word').value.trim();
        const definition = document.getElementById('definition').value.trim();

        // Simple input validation: non-empty strings without numbers
        const wordValid = /^[A-Za-z\s]+$/.test(word);
        const definitionValid = /^[A-Za-z\s.,!?]+$/.test(definition);

        if (!word || !definition) {
            storeResult.textContent = "Both word and definition are required.";
            storeResult.style.color = 'red';
            return;
        }

        if (!wordValid || !definitionValid) {
            storeResult.textContent = "Invalid input. Please enter valid words and definitions without numbers.";
            storeResult.style.color = 'red';
            return;
        }

        const data = JSON.stringify({ word, definition });

        const xhr = new XMLHttpRequest();
        // Replace 'https://yourDomainName2.xyz' with your actual Server 2 URL
        xhr.open('POST', 'https://yourDomainName2.xyz/api/definitions', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 201 || xhr.status === 409) {
                const response = JSON.parse(xhr.responseText);
                storeResult.innerHTML = `<strong>${response.message}</strong><br>Total Entries: ${response.totalEntries || 'N/A'}`;
                storeResult.style.color = 'green';
            } else {
                const response = JSON.parse(xhr.responseText);
                storeResult.textContent = `Error: ${response.message}`;
                storeResult.style.color = 'red';
            }
        };

        xhr.onerror = function () {
            storeResult.textContent = 'Request failed. Please try again.';
            storeResult.style.color = 'red';
        };

        xhr.send(data);
    });
});
