/**
 * Date: 2024-10-09
 * Description: This file contains all the messages for the users module
 * Note: ChatGPT was used in this assignment for general debugging and method selection queries.
 */

// search.js

const API_URL = 'https://comp4757lab4.onrender.com'; 

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchResult = document.getElementById('searchResult');

    searchBtn.addEventListener('click', () => {
        const word = document.getElementById('searchWord').value.trim();

        // Simple input validation: non-empty strings without numbers
        const wordValid = /^[A-Za-z\s]+$/.test(word);

        if (!word) {
            searchResult.textContent = messages.search.wordRequired;
            searchResult.style.color = 'red';
            return;
        }

        if (!wordValid) {
            searchResult.textContent = messages.search.invalidInput;
            searchResult.style.color = 'red';
            return;
        }

        const xhr = new XMLHttpRequest();
        // REPLACE
        xhr.open('GET', `${API_URL}/api/definitions?word=${encodeURIComponent(word)}`, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                searchResult.innerHTML = `<strong>${word}:</strong> ${response.definition}<br>${messages.search.request}${response.requestNumber}`;
                searchResult.style.color = 'green';
            } else if (xhr.status === 404) {
                const response = JSON.parse(xhr.responseText);
                searchResult.innerHTML = `${messages.search.request}${response.requestNumber}, ` + messages.search.notFound.replace('%1', word);
                searchResult.style.color = 'red';
            } else {
                const response = JSON.parse(xhr.responseText);
                searchResult.textContent = `${messages.search.error}${response.message}`;
                searchResult.style.color = 'red';
            }
        };

        xhr.onerror = function () {
            searchResult.textContent = messages.search.requestFailed;
            searchResult.style.color = 'red';
        };

        xhr.send();
    });
});
