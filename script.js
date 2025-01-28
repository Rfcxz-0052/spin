// 切換填寫和查詢表單內容
function showPage(page) {
    document.getElementById('submit-page').style.display = page === 'submit' ? 'block' : 'none';
    document.getElementById('search-page').style.display = page === 'search' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwhn0Uz0XG5mAU9LN14EMZDIXYre5iQEaBDITENWVAthbsL8b33P4cvFuer5ttD3AGxBA/exec";
    const searchForm = document.getElementById('search-form'); // 獲取查詢表單
    const resultDiv = document.getElementById('search-results'); // 顯示結果的區域

    if (searchForm) {
        searchForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // 阻止表單的默認提交行為
            
            const query = document.getElementById('query').value.trim(); // 獲取輸入的查詢條件
            if (!query) {
                alert('請輸入查詢條件！');
                return;
            }

            try {
                // 顯示加載提示
                resultDiv.innerHTML = '<p>加載中...</p>';

                // 向 Apps Script 發送請求
                const response = await fetch(`${SCRIPT_URL}?query=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error('查詢失敗，請稍後再試！');
                }

                const data = await response.json(); // 解析返回的 JSON 資料

                // 根據返回的資料更新結果顯示
                if (Array.isArray(data) && data.length > 0) {
                    let tableHTML = `
                        <table id="result-table" class="result-table" border="1">
                            <thead>
                                <tr>
                    `;
                
                    // 表格標題行
                    data[0].forEach(header => {
                        tableHTML += `<th>${header || ''}</th>`;
                    });
                
                    tableHTML += `</tr></thead><tbody>`;
                
                    // 表格內容行
                    data.slice(1).forEach(row => {
                        tableHTML += '<tr>';
                        row.forEach(cell => {
                            tableHTML += `<td>${cell || ''}</td>`;
                        });
                        tableHTML += '</tr>';
                    });
                
                    tableHTML += `</tbody></table>`;
                    resultDiv.innerHTML = tableHTML; // 顯示結果表格
                } else {
                    resultDiv.innerHTML = '<p>無符合條件的結果。</p>';
                }
                
            } catch (error) {
                console.error('Error:', error); // 在控制台顯示錯誤訊息
                alert('查詢失敗，請稍後再試！');
            }
        });
    }
});

// 處理表單提交
document.addEventListener('DOMContentLoaded', function () {
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

            // 提交成功後清空並重置表單
            form.reset();

        } catch (error) {
            console.error('Error:', error);
            alert('Submission failed.');
        }
        });
    }
});

/*表單僅於每月1日至15日開放填寫,如15日當天為星期六日,則順延至下個星期一
document.addEventListener("DOMContentLoaded", function () {
const today = new Date();
const day = today.getDate();
const form = document.getElementById("myForm");
const message = document.getElementById("message");

// 計算本月 15 日的日期
const fifteenth = new Date(today.getFullYear(), today.getMonth(), 15);
let cutoffDay = 15;

// 如果 15 日是週六或週日，順延至 17 日
if (fifteenth.getDay() === 6) {
    cutoffDay = 17; // 週六 -> 順延至 17 日
} else if (fifteenth.getDay() === 0) {
    cutoffDay = 16; // 週日 -> 順延至 17 日
}

// 檢查當前日期是否在開放範圍內
if (day < 1 || day > cutoffDay) {
    form.style.display = "none"; // 隱藏表單
    message.style.display = "block"; // 顯示提示訊息
}
});
*/

// 預設顯示第一個分類
showCategory('category1');
// 顯示特定分類的商品，隱藏其他分類
function showCategory(categoryId) {
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.style.display = 'none';
    });
    document.getElementById(categoryId).style.display = 'block';
}