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
        const data = req.body;

        // 確認資料是否包含必要字段
        if (!data.name || !data.phone || !data.unit || !data.email) {
            return res.status(400).json({ message: 'Incomplete form data!' });
        }

        const response = await fetch('https://script.google.com/macros/s/AKfycbyPeLhOM-ZkTDyQ2VOGkGJTRUEmJn4QipflDFetcVeelogxmBwPfK8VlJbTM-4WutKEWw/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error connecting to Google Apps Script' });
    }
});


