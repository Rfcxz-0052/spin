const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwIHg-7rLz8f3g9U2gUrAUQid-Hf5bq6JR9NmMcCe1NA9t7tN6oLzA9cJ_5IjjxCAHMEA/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });
        const result = await response.json();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to Google Apps Script' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
