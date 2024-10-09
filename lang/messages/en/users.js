/**
 * Date: 2024-10-09
 * Description: This file contains all the messages for the users module
 * Note: ChatGPT was used in this assignment for general debugging and method selection queries.
 */

const messages = {
    notFound: "Word '%1' not found.",
    wordRequired: "Query parameter 'word' is required",
    validStrings: 'Both word and definition must be valid strings.',
    warningExists: "Request #%1: Warning! Word '%1' already exists.",
    newEntry: "Request #%1:<br> New entry recorded:",
    invalidFormat: 'Invalid JSON format',
    invalidPath: "Path Not Found"
};

module.exports = messages;