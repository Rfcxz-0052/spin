document.addEventListener('DOMContentLoaded', function () {
    // 切換填寫和查詢表單內容
    function showPage(page) {
        document.getElementById('submit-page').style.display = page === 'submit' ? 'block' : 'none';
        document.getElementById('search-page').style.display = page === 'search' ? 'block' : 'none';
    }

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
                const response = await fetch(`${"https://script.google.com/macros/s/AKfycbxlai9HEUQJbCLluY2vjthO_g_J_Yt44B1uud2ylS5ScBB3Xb7CwkMspIGQQrReipj3pg/exec"}?query=${encodeURIComponent(query)}`);
                if (!response.ok) throw new Error('查詢失敗，請稍後再試！');
                const data = await response.json();
                const resultDiv = document.getElementById('search-results');
                if (Array.isArray(data) && data.length > 0) {
                    const rows = data.map(item => `
                        <tr>
                            <td>${item['時間'] || ''}</td>
                            <td>${item['姓名'] || ''}</td>
                            <td>${item['聯絡方式'] || ''}</td>
                            <td>${item['所屬單位'] || ''}</td>
                            <td>${item['email'] || ''}</td>
                            <td>${item['2B 鉛筆'] || ''}</td>
                            <td>${item['HB 鉛筆'] || ''}</td>
                            <td>${item['雙頭油性筆_紅'] || ''}</td>
                            <td>${item['雙頭油性筆_藍'] || ''}</td>
                            <td>${item['雙頭油性筆_黑'] || ''}</td>
                            <td>${item['簽字筆1.0mm_紅'] || ''}</td>
                            <td>${item['簽字筆1.0mm_藍'] || ''}</td>
                            <td>${item['簽字筆1.0mm_黑'] || ''}</td>
                            <td>${item['原子筆(刻字)_紅'] || ''}</td>
                            <td>${item['原子筆(刻字)_藍'] || ''}</td>
                            <td>${item['原子筆(刻字)_黑'] || ''}</td>
                            <td>${item['細字簽字筆0.5mm_紅'] || ''}</td>
                            <td>${item['細字簽字筆0.5mm_藍'] || ''}</td>								
                            <td>${item['細字簽字筆0.5mm_黑'] || ''}</td>
                            <td>${item['白板筆_紅'] || ''}</td>
                            <td>${item['白板筆_藍'] || ''}</td>
                            <td>${item['白板筆_黑'] || ''}</td>
                            <td>${item['白板筆補充液_紅'] || ''}</td>
                            <td>${item['白板筆補充液_藍'] || ''}</td>
                            <td>${item['白板筆補充液_黑'] || ''}</td>
                            <td>${item['美工刀'] || ''}</td>
                            <td>${item['板擦'] || ''}</td>
                            <td>${item['橡皮擦'] || ''}</td>
                            <td>${item['SDI修正帶 橘色'] || ''}</td>
                            <td>${item['SDI修正帶 藍色'] || ''}</td>
                            <td>${item['SDI修正帶 綠色'] || ''}</td>
                            <td>${item['SDI修正帶替芯 橘色'] || ''}</td>
                            <td>${item['SDI修正帶替芯 藍色'] || ''}</td>
                            <td>${item['SDI修正帶替芯 綠色'] || ''}</td>
                            <td>${item['打印台紅色'] || ''}</td>
                            <td>${item['打印台藍色'] || ''}</td>
                            <td>${item['打印台黑色'] || ''}</td>
                            <td>${item['打印水紅色'] || ''}</td>
                            <td>${item['打印水藍色'] || ''}</td>
                            <td>${item['打印水黑色'] || ''}</td>
                            <td>${item['印泥'] || ''}</td>
                            <td>${item['利百代 明色朱液'] || ''}</td>
                            <td>${item['自動印章補充液紅色'] || ''}</td>
                            <td>${item['自動印章補充液藍色'] || ''}</td>
                            <td>${item['自動印章補充液黑色'] || ''}</td>
                            <td>${item['便利貼小'] || ''}</td>
                            <td>${item['便利貼中'] || ''}</td>
                            <td>${item['便利貼大'] || ''}</td>
                            <td>${item['日期戳'] || ''}</td>
                            <td>${item['號碼機油'] || ''}</td>
                            <td>${item['釘書機'] || ''}</td>
                            <td>${item['釘書針3號'] || ''}</td>
                            <td>${item['釘書針10號'] || ''}</td>
                            <td>${item['三角迴紋針'] || ''}</td>
                            <td>${item['圖釘'] || ''}</td>
                            <td>${item['剪刀'] || ''}</td>
                            <td>${item['膠水'] || ''}</td>
                            <td>${item['口紅膠'] || ''}</td>								
                            <td>${item['封箱膠帶'] || ''}</td>
                            <td>${item['透明膠帶-大'] || ''}</td>
                            <td>${item['透明膠帶-小'] || ''}</td>
                            <td>${item['雙面膠帶'] || ''}</td>
                            <td>${item['橡皮圈大'] || ''}</td>
                            <td>${item['橡皮圈小'] || ''}</td>
                            <td>${item['長尾夾小'] || ''}</td>	
                            <td>${item['長尾夾中'] || ''}</td>
                            <td>${item['長尾夾大'] || ''}</td>
                            <td>${item['自黏標籤小'] || ''}</td>
                            <td>${item['自黏標籤中'] || ''}</td>
                            <td>${item['自黏標籤大'] || ''}</td>
                            <td>${item['粉筆 白色'] || ''}</td>	
                            <td>${item['粉筆 黃色'] || ''}</td>	
                            <td>${item['粉筆 紅色'] || ''}</td>
                            <td>${item['粉筆 綠色'] || ''}</td>
                            <td>${item['電池3號'] || ''}</td>
                            <td>${item['電池4號'] || ''}</td>
                            <td>${item['衛生紙'] || ''}</td>
                            <td>${item['Double A A4影印紙'] || ''}</td>	
                            <td>${item['QUALITY A4影印紙'] || ''}</td>	
                            <td>${item['備註'] || ''}</td>
                        </tr>`).join('');
                    resultDiv.innerHTML = `<table><tbody>${rows}</tbody></table>`;
                } else {
                    resultDiv.innerHTML = '<p>無符合條件的結果。</p>';
                }
            } catch (error) {
                console.error('Error:', error);
                alert('查詢失敗，請稍後再試！');
            }
        });
    }

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

    // 預設顯示第一個分類
    function showCategory(categoryId) {
        document.querySelectorAll('.category').forEach(category => {
            category.style.display = 'none';
        });
        const category = document.getElementById(categoryId);
        if (category) category.style.display = 'block';
    }
    showCategory('category1');
});
