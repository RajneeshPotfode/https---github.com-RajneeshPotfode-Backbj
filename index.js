const express = require('express');
const bodyParser = require('body-parser');
const atob = require('atob');
const app = express();

app.use(bodyParser.json());

// Helper Functions
const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const extractFileData = (fileB64) => {
    if (!fileB64) return { file_valid: false, file_mime_type: null, file_size_kb: null };
    try {
        const decodedFile = atob(fileB64);
        const fileSizeKb = Math.round((decodedFile.length / 1024) * 100) / 100; // Convert to KB
        return { file_valid: true, file_mime_type: "application/octet-stream", file_size_kb: fileSizeKb };
    } catch {
        return { file_valid: false, file_mime_type: null, file_size_kb: null };
    }
};

// Routes
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const userId = "john_doe_17091999"; // Example
    const email = "john@xyz.com";
    const rollNumber = "ABCD123";

    const numbers = [];
    const alphabets = [];
    let highestLowercase = null;

    data.forEach((item) => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (isNaN(item)) {
            alphabets.push(item);
            if (item >= 'a' && item <= 'z') {
                if (!highestLowercase || item > highestLowercase) highestLowercase = item;
            }
        }
    });

    const primesFound = numbers.some((num) => isPrime(Number(num)));
    const fileData = extractFileData(file_b64);

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
        is_prime_found: primesFound,
        ...fileData,
    });
});

app.get('/bfhl', (req, res) => {
    res.send(`<h1>hello</h1>`);
    res.status(200).json({ operation_code: 1 });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
