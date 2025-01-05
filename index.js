const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(bodyParser.json());

// POST 路由
app.post('/', async (req, res) => {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzMDf4bVTlFvt_7YpWOEUpFjJtVvEoxbnnFYYdi8RsaByVUBkWrWmXsdo6vAnwSrBDMvg/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body), // 將所有表單數據傳遞給 Google Apps Script
        });
        const result = await response.json();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to Google Apps Script' });
    }
});


// 啟動伺服器
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

