document.addEventListener("DOMContentLoaded", () => {
    let textarea = document.getElementById("badWords");

    // 저장된 비속어 목록 불러오기
    chrome.storage.sync.get("badWords", (data) => {
        if (data.badWords) {
            textarea.value = data.badWords.join("\n");
        }
    });

    // 저장 버튼 클릭 시 설정 저장
    document.getElementById("save").addEventListener("click", () => {
        let words = textarea.value.split("\n").map(word => word.trim()).filter(word => word.length > 0);
        chrome.storage.sync.set({ badWords: words }, () => {
            alert("설정이 저장되었습니다!");
        });
    });
});
