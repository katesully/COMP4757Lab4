const http = require('http');
const url = require('url');

// Array to hold the dictionary
let dictionary = [];
let requestCount = 0;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const query = parsedUrl.query;

    // Handle CORS headers (for communication between different servers)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (parsedUrl.pathname === '/api/definitions' && method === 'GET') {
        // Retrieve definition
        const word = query.word;

        if (word) {
            requestCount++;
            const entry = dictionary.find(item => item.word.toLowerCase() === word.toLowerCase());
            if (entry) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    requestNumber: requestCount,
                    definition: entry.definition
                }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    requestNumber: requestCount,
                    message: `Word '${word}' not found!`
                }));
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Query parameter 'word' is required" }));
        }
    } else if (parsedUrl.pathname === '/api/definitions' && method === 'POST') {
        // Add a new definition
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            requestCount++;
            try {
                const { word, definition } = JSON.parse(body);

                if (!word || !definition || typeof word !== 'string' || typeof definition !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Both word and definition must be valid strings.' }));
                    return;
                }

                // Check if word already exists
                const existingEntry = dictionary.find(item => item.word.toLowerCase() === word.toLowerCase());
                if (existingEntry) {
                    res.writeHead(409, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        requestNumber: requestCount,
                        message: `Warning! Word '${word}' already exists.`
                    }));
                } else {
                    dictionary.push({ word, definition });
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        requestNumber: requestCount,
                        message: `New entry recorded: '${word}: ${definition}'`,
                        totalEntries: dictionary.length
                    }));
                }
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid JSON format' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

// Start the server
const port = 3000;  // or any other port
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
