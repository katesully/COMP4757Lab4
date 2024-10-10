/**
 * Date: 2024-10-09
 * Description: This file contains all the messages for the users module
 * Note: ChatGPT was used in this assignment for general debugging and method selection queries.
 */

// store.js

const API_URL = 'https://comp4757lab4.onrender.com';

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
            storeResult.textContent = messages.store.wordAndDefinitionRequired;
            storeResult.style.color = 'red';
            return;
        }

        if (!wordValid || !definitionValid) {
            storeResult.textContent = messages.store.invalidInput;
            storeResult.style.color = 'red';
            return;
        }

        const data = JSON.stringify({ word, definition });

        const xhr = new XMLHttpRequest();

        xhr.open('POST', `${API_URL}/api/definitions`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 201 || xhr.status === 409) {
                const response = JSON.parse(xhr.responseText);
                storeResult.innerHTML = `<strong>${response.message}</strong><br>${messages.store.entries}${response.totalEntries || 'N/A'}`;
                if (response.totalEntries) {
                    storeResult.style.color = 'green';
                } else {
                    storeResult.style.color = 'red';
                }
            } else {
                const response = JSON.parse(xhr.responseText);
                storeResult.textContent = `${messages.store.error}${response.message}`;
                storeResult.style.color = 'red';
            }
        };

        xhr.onerror = function () {
            storeResult.textContent = messages.store.requestFailed;
            storeResult.style.color = 'red';
        };

        xhr.send(data);
    });
});

