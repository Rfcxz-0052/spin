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

    /*
    // 日期檢查功能
    const today = new Date();
    const day = today.getDate();
    const fifteenth = new Date(today.getFullYear(), today.getMonth(), 15);
    let cutoffDay = 15;

    if (fifteenth.getDay() === 6) cutoffDay = 17;
    else if (fifteenth.getDay() === 0) cutoffDay = 16;

    const message = document.getElementById("message");
    if (day < 1 || day > cutoffDay) {
        document.getElementById("myForm").style.display = "none";
        message.style.display = "block";
    } else {
        document.getElementById("myForm").style.display = "block";
        message.style.display = "none";
    }
    */
});
