// 顯示特定分類的商品，隱藏其他分類
function showCategory(categoryId) {
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.style.display = 'none';
    });
    document.getElementById(categoryId).style.display = 'block';
}

// 現有程式碼：處理表單提交
    const form = document.getElementById('myForm');
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

    /*
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