document.addEventListener("DOMContentLoaded", () => {
    let toggle = document.getElementById("toggleBlock");

    // 기존 설정 불러오기
    chrome.storage.sync.get("blockComments", (data) => {
        toggle.checked = data.blockComments || false;
    });

    // 스위치 변경 감지
    toggle.addEventListener("change", () => {
        chrome.storage.sync.set({ blockComments: toggle.checked });
        chrome.tabs.reload(); // 변경 즉시 적용
    });

    // 옵션 페이지 열기 버튼
    document.getElementById("openOptions").addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
    });
});
