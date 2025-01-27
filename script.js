//切換填寫和查詢表單內容
function showPage(page) {
    document.getElementById('submit-page').style.display = page === 'submit' ? 'block' : 'none';
    document.getElementById('search-page').style.display = page === 'search' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form'); // 獲取查詢表單
    if (searchForm) {
        searchForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // 阻止表單的默認提交行為
            
            const query = document.getElementById('query').value.trim(); // 獲取輸入的查詢條件
            if (!query) {
                alert('請輸入查詢條件！');
                return;
            }

            try {
                // 將查詢條件作為參數附加到 Apps Script 的 URL
                const response = await fetch(`${"https://script.google.com/macros/s/AKfycbyL_HMo9bu_3iE0VT0YggBF7KfPv0OEwnqFAYHJ5k_JF11IsafjyEpCIcrdtndARja4TA/exec"}?query=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error('查詢失敗，請稍後再試！');
                }

                const data = await response.json(); // 將返回的資料解析為 JSON
                const resultDiv = document.getElementById('search-results'); // 獲取顯示結果的區域

                // 根據返回的資料更新結果顯示
                if (Array.isArray(data) && data.length > 0) {
                    // 生成表格
                    const headers = [
                        '時間', '姓名', '聯絡方式', '所屬單位', 'Email', 
                        '2B 鉛筆', 'HB 鉛筆', '雙頭油性筆_紅', '雙頭油性筆_藍', '雙頭油性筆_黑',
                        '簽字筆1.0mm_紅', '簽字筆1.0mm_藍', '簽字筆1.0mm_黑',
                        '原子筆(刻字)_紅', '原子筆(刻字)_藍', '原子筆(刻字)_黑', 
                        '細字簽字筆0.5mm_紅', '細字簽字筆0.5mm_藍', '細字簽字筆0.5mm_黑', 
                        '白板筆_紅', '白板筆_藍', '白板筆_黑', 
                        '白板筆補充液_紅', '白板筆補充液_藍', '白板筆補充液_黑', 
                        '美工刀', '板擦', '橡皮擦',
                        'SDI修正帶 橘色', 'SDI修正帶 藍色', 'SDI修正帶 綠色', 
                        'SDI修正帶替芯 橘色', 'SDI修正帶替芯 藍色', 'SDI修正帶替芯 綠色', 
                        '打印台紅色', '打印台藍色', '打印台黑色', 
                        '打印水紅色', '打印水藍色', '打印水黑色', 
                        '印泥', '利百代 明色朱液', '自動印章補充液紅色', '自動印章補充液藍色', '自動印章補充液黑色', 
                        '便利貼小', '便利貼中', '便利貼大', '日期戳', '號碼機油', 
                        '釘書機', '釘書針3號', '釘書針10號', '三角迴紋針', '圖釘', 
                        '膠水', '口紅膠', '封箱膠帶', '透明膠帶-大', '透明膠帶-小', 									
                        '雙面膠帶', '橡皮圈大', '橡皮圈小', 
                        '長尾夾小', '長尾夾中', '長尾夾大', 
                        '自黏標籤小', '自黏標籤中', '自黏標籤大', 
                        '粉筆 白色', '粉筆 黃色', '粉筆 紅色', '粉筆 綠色', 
                        '電池3號', '電池4號', '衛生紙', 
                        'Double A A4影印紙', 'QUALITY A4影印紙', '備註'
                    ];
                    
                    let tableHTML = `<table border="1" style="width: 100%; border-collapse: collapse; text-align: center;"><thead><tr>`;
                    headers.forEach(header => {
                        tableHTML += `<th>${header}</th>`;
                    });
                    tableHTML += `</tr></thead><tbody>`;
                    
                    data.forEach(item => {
                        tableHTML += `<tr>`;
                        headers.forEach(header => {
                            tableHTML += `<td>${item[header] || ''}</td>`;
                        });
                        tableHTML += `</tr>`;
                    });
                    tableHTML += `</tbody></table>`;
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

// 顯示特定分類的商品，隱藏其他分類
function showCategory(categoryId) {
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.style.display = 'none';
    });
    document.getElementById(categoryId).style.display = 'block';
}