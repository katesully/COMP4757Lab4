/**
 * Author: Charlie Zhang
 * Date: 2024-10-01
 * Description: This file contains all the messages for the users module
 * Note: ChatGPT was used in this assignment for general debugging and method selection queries.
 */

const messages = {
    search: {
        wordRequired: 'Word is required.',
        invalidInput: 'Invalid input. Please enter a valid word without numbers.',
        request: "Request #",
        notFound: "word '%1' not found.",
        error: "Error: ",
        requestFailed: 'Request failed. Please try again.'
    },
    store: {
        wordAndDefinitionRequired: 'Both word and definition are required.',
        invalidInput: 'Invalid input. Please enter valid words and definitions without numbers.',
        requestFailed: 'Request failed. Please try again.',
        entries: 'Total Entries: ',
        error: "Error: ",
        requestFailed: 'Request failed. Please try again.'
    }
};