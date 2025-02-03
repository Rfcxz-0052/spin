// 切換填寫和查詢表單內容
function showPage(page) {
    document.getElementById('submit-page').style.display = page === 'submit' ? 'block' : 'none';
    document.getElementById('search-page').style.display = page === 'search' ? 'block' : 'none';
}

// 處理表單查詢
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
                const response = await fetch(`${"https://script.google.com/macros/s/AKfycbwnXnKBP1JFnsETmtUtIw5Pd6pUX8LluAHiaKjVq62gdxH_L0mvo_u7-QnsjztQPs6CTA/exec"}?query=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error('查詢失敗，請稍後再試！');
                }

                const data = await response.json(); // 將返回的資料解析為 JSON
                const resultDiv = document.getElementById('search-results'); // 獲取顯示結果的區域

                // 根據返回的資料更新結果顯示
                if (Array.isArray(data) && data.length > 0) {
                    // 動態生成表格，垂直展開資料
                    let tableHTML = `
                        <table border="1" style="width: 80%; border-collapse: collapse; text-align: center;">
                            <thead>
                                <tr>
                                    <th>欄位名稱</th>
                    `;

                    // 根據返回資料的列動態生成對應的表頭
                    const maxCols = data[0].length - 1; // 除去欄位名稱
                    for (let i = 1; i <= maxCols; i++) {
                        tableHTML += `<th>訂單${i}</th>`;
                    }

                    tableHTML += `</tr></thead><tbody>`;

                    // 生成表格的每一行
                    data.forEach(row => {
                        tableHTML += `
                            <tr>
                                <td>${row[0] || ''}</td> <!-- 顯示欄位名稱 -->
                                ${row.slice(1).map(value => `<td>${value || ''}</td>`).join('')}
                            </tr>
                        `;
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


// 查詢頁面的 "重新輸入" 按鈕處理
document.addEventListener('DOMContentLoaded', function () {
    const resetButton = document.querySelector('#search-form input[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function () {
            const resultDiv = document.getElementById('search-results');
            if (resultDiv) {
                resultDiv.innerHTML = ''; // 清空查詢結果
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const quantities = document.querySelectorAll("input[type='number']");
    const totalAmountElement = document.getElementById("totalAmount");

    if (!totalAmountElement) {
        console.error("找不到 #totalAmount,請檢查 HTML");
        return;
    }

    function updateTotal() {
        let total = 0;
        quantities.forEach((input) => {
            const quantity = parseInt(input.value) || 0; // 獲取數量
            const item = input.closest(".item_01"); // 找到最近的商品容器

            if (!item) {
                console.error("找不到 .item_01,請檢查 HTML 結構");
                return;
            }

            const priceElements = item.querySelectorAll(".price"); // 找到所有價格標籤
            const inputs = item.querySelectorAll("input[type='number']"); // 找到所有數量輸入框
            
            // 確保價格和數量對應
            inputs.forEach((inputField, index) => {
                if (inputField === input) {
                    const priceElement = priceElements[index]; // 取得對應價格
                    if (priceElement) {
                        const price = parseInt(priceElement.dataset.price); // 取得單價
                        total += quantity * price; // 計算金額
                    }
                }
            });
        });

        totalAmountElement.textContent = total; // 更新總金額
    }

    // 綁定事件監聽
    quantities.forEach((input) => {
        input.addEventListener("input", updateTotal);
    });

        // **監聽表單提交事件**
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // 避免預設提交，確保可以顯示提示框
        alert("表單成功提交！"); // 顯示成功提示（可選）
        
        // **重置所有輸入框數值**
        quantities.forEach((input) => {
            input.value = ""; // 清空數量
        });

        // **重置總金額**
        totalAmountElement.textContent = "0";
    });

    updateTotal(); // 初始化計算
});

// 處理表單提交
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('myForm');
    const totalAmountElement = document.getElementById("totalAmount");
    const quantities = document.querySelectorAll("input[type='number']");

    if (form && totalAmountElement) {
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

                // **提交成功後清空數量輸入框**
                quantities.forEach((input) => {
                    input.value = ""; // 清空數量
                });

                // **重置總金額**
                totalAmountElement.textContent = "0";

                // **清空並重置表單**
                form.reset();

            } catch (error) {
                console.error('Error:', error);
                alert('Submission failed.');
            }
        });
    }
});


/*表單僅於每月1日至15日開放填寫,如15日當天為星期六日,則順延至下個星期一,只作用在submit-page 分頁
document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const day = today.getDate();
    const form = document.getElementById("myForm");
    const message = document.getElementById("message");
    const submitPage = document.getElementById("submit-page");

    // 計算本月 15 日的日期
    const fifteenth = new Date(today.getFullYear(), today.getMonth(), 15);
    let cutoffDay = 15;

    // 如果 15 日是週六或週日，順延至下週一
    if (fifteenth.getDay() === 6) {
        cutoffDay = 17; // 週六 -> 順延至 17 日
    } else if (fifteenth.getDay() === 0) {
        cutoffDay = 16; // 週日 -> 順延至 16 日
    }

    // 只在 submit-page 顯示時檢查開放範圍
    if (submitPage.style.display === 'block') {
        // 檢查當前日期是否在開放範圍內
        if (day < 1 || day > cutoffDay) {
            form.style.display = "none"; // 隱藏表單
            message.style.display = "block"; // 顯示提示訊息
        }
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