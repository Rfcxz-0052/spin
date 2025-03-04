import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Use the default export for bodyParser

// POST route
app.post('/', async (req, res) => {
    try {
        const data = req.body;

        // Validate required fields
        if (!data.name || !data.phone || !data.unit || !data.email) {
            return res.status(400).json({ message: 'Incomplete form data!' });
        }

        const response = await fetch(
            'https://script.google.com/macros/s/AKfycbyz3LQowiTmk_9L2Qbb3F1TLqTs_gV1a0HCASIhTYeAF1rQm4SCEq6sZg_aSumYoE6cog/exec',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }
        );

        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error connecting to Google Apps Script' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
