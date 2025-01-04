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
        // 將請求轉發至 Google Apps Script Web App
        const response = await fetch('https://script.google.com/macros/s/AKfycbww29X-4o2n3_93xry509c9FFVOLtQ4YGZdGLpBlS7QxoUOuXj_sl_VvScFweCHs3OwCQ/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });

        // 獲取 Google Apps Script 的回應
        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error connecting to Google Apps Script' });
    }
});

// 啟動伺服器
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

