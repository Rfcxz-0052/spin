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
            'https://script.google.com/macros/s/AKfycbwq0a4vAf2j3lH9NnvKujQxv9amYp6sHRwf33WJ_HhfdF41nyHkJZXfhzWOsdSff_YIxQ/exec',
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

const { google } = require('googleapis');

async function readSheet() {
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const SPREADSHEET_ID = '1D_rGNEsvYOeB0liO6SpAZK435p0ICe-RFGixYjX1dDI'; // 替換為你的試算表 ID
    const range = 'test!A1:Z1000'; // 替換為你的工作表範圍

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
    });

    console.log('讀取的內容:', response.data.values);
}

readSheet().catch(console.error);
