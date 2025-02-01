const toggleButton = document.getElementById('toggleButton');
const keywordsInput = document.getElementById('keywordsInput');
const saveKeywordsButton = document.getElementById('saveKeywordsButton');

// chrome.storage.sync를 사용하여 데이터 로드
chrome.storage.sync.get(['blockedKeywords', 'commentsHidden'], (result) => {
    const keywords = result.blockedKeywords || [];
    keywordsInput.value = keywords.join(', ');
    
    const isHidden = result.commentsHidden || false;
    toggleButton.textContent = isHidden ? '댓글/채팅 보이기' : '댓글/채팅 숨기기';
});

// 키워드 저장
saveKeywordsButton.addEventListener('click', () => {
    const newKeywords = keywordsInput.value.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0);
    chrome.storage.sync.set({ blockedKeywords: newKeywords }, () => {
        alert('키워드가 저장되었습니다!');
    });
});

// 토글 버튼
toggleButton.addEventListener('click', () => {
    chrome.storage.sync.get('commentsHidden', (result) => {
        const isHidden = !result.commentsHidden;
        chrome.storage.sync.set({ commentsHidden: isHidden }, () => {
            toggleButton.textContent = isHidden ? '댓글/채팅 보이기' : '댓글/채팅 숨기기';
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleComments' });
            });
        });
    });
});