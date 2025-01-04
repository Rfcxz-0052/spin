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
        const response = await fetch('https://script.google.com/macros/s/AKfycbwJUNSLK5B7JCr6GjGRSDN1S7g2SC170lDPOY658wDLCiOhksoZu1tbGC-6aFywvSotYA/exec', {
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
