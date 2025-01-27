// 切換填寫和查詢表單內容
function showPage(page) {
    document.getElementById('submit-page').style.display = page === 'submit' ? 'block' : 'none';
    document.getElementById('search-page').style.display = page === 'search' ? 'block' : 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    // 查詢功能
    document.getElementById('search-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = document.getElementById('query').value;

        try {
            const response = await fetch(`${scriptURL}?query=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('資料查詢失敗');
            const data = await response.json();

            const resultDiv = document.getElementById('search-results');
            resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('查詢失敗，請稍後再試');
        }
    });

    // 表單提交功能
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

// 顯示特定分類的商品，隱藏其他分類
function showCategory(categoryId) {
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.style.display = 'none';
    });
    document.getElementById(categoryId).style.display = 'block';
}