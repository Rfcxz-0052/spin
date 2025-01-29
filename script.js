document.addEventListener('DOMContentLoaded', function () {
    // 處理表單查詢
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const query = document.getElementById('query').value.trim();
            if (!query) {
                alert('請輸入查詢條件！');
                return;
            }
            try {
                const response = await fetch(`https://script.google.com/macros/s/AKfycbwnXnKBP1JFnsETmtUtIw5Pd6pUX8LluAHiaKjVq62gdxH_L0mvo_u7-QnsjztQPs6CTA/exec?query=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error('查詢失敗，請稍後再試！');
                }
                const data = await response.json();
                const resultDiv = document.getElementById('search-results');
                if (Array.isArray(data) && data.length > 0) {
                    let tableHTML = `<table border="1" style="width: 80%; border-collapse: collapse; text-align: center;"><thead><tr><th>欄位名稱</th>`;
                    const maxCols = data[0].length - 1;
                    for (let i = 1; i <= maxCols; i++) {
                        tableHTML += `<th>訂單${i}</th>`;
                    }
                    tableHTML += `</tr></thead><tbody>`;
                    data.forEach(row => {
                        tableHTML += `<tr><td>${row[0] || ''}</td>${row.slice(1).map(value => `<td>${value || ''}</td>`).join('')}</tr>`;
                    });
                    tableHTML += `</tbody></table>`;
                    resultDiv.innerHTML = tableHTML;
                } else {
                    resultDiv.innerHTML = '<p>無符合條件的結果。</p>';
                }
            } catch (error) {
                console.error('Error:', error);
                alert('查詢失敗，請稍後再試！');
            }
        });
    }

    // 查詢頁面的 "重新輸入" 按鈕處理
    const resetButton = document.querySelector('#search-form input[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function () {
            const resultDiv = document.getElementById('search-results');
            if (resultDiv) {
                resultDiv.innerHTML = '';
            }
        });
    }

    // 處理表單提交
    const form = document.getElementById('myForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            try {
                const response = await fetch('https://spin-sg6f.onrender.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                alert(result.message);
                form.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('Submission failed.');
            }
        });
    }

    // 表單僅於特定日期範圍開放
    const today = new Date();
    const day = today.getDate();
    const fifteenth = new Date(today.getFullYear(), today.getMonth(), 15);
    let cutoffDay = 15;
    if (fifteenth.getDay() === 6) cutoffDay = 17;
    if (fifteenth.getDay() === 0) cutoffDay = 16;

    const submitPage = document.getElementById('submit-page');
    if (submitPage && submitPage.style.display === 'block') {
        if (day < 1 || day > cutoffDay) {
            const form = document.getElementById('myForm');
            const message = document.getElementById('message');
            if (form) form.style.display = 'none';
            if (message) message.style.display = 'block';
        }
    }
});

// 顯示特定分類的商品，隱藏其他分類
function showCategory(categoryId) {
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.style.display = 'none';
    });
    document.getElementById(categoryId).style.display = 'block';
}