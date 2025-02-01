console.log("YouTube Comments Blocker Loaded");

let commentsHidden = false;
let blockedKeywords = [];

// 댓글 & 라이브 채팅 숨기는 함수 
const hideCommentsAndLiveChat = () => {
    let commentsSection = document.querySelector('#comments');
    let liveChat = document.querySelector('#chat');
    let liveChatIframe = document.querySelector('ytd-live-chat-frame');

    console.log("현재 상태:", commentsHidden); // 디버깅용

    if (commentsSection) {
        // 키워드 필터링
        const comments = commentsSection.querySelectorAll('#content-text');
        comments.forEach(comment => {
            if (blockedKeywords.some(keyword => comment.textContent.includes(keyword))) {
                comment.closest('ytd-comment-thread-renderer').style.display = 'none';
            }
        });
        
        // 전체 댓글 섹션 표시/숨김
        commentsSection.style.display = commentsHidden ? 'none' : 'block';
    }

    if (liveChat) {
        liveChat.style.display = commentsHidden ? 'none' : 'block';
    }

    if (liveChatIframe) {
        liveChatIframe.style.display = commentsHidden ? 'none' : 'block';
    }
};

// 초기 상태 로드
chrome.storage.sync.get(['commentsHidden', 'blockedKeywords'], (result) => {
    commentsHidden = result.commentsHidden || false;
    blockedKeywords = result.blockedKeywords || [];
    hideCommentsAndLiveChat();
});

// DOM 변화 감지
const observer = new MutationObserver(() => {
    hideCommentsAndLiveChat();
});

observer.observe(document.body, { childList: true, subtree: true });

// 메시지 수신 처리
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleComments') {
        chrome.storage.sync.get('commentsHidden', (result) => {
            commentsHidden = result.commentsHidden;
            console.log("토글 후 상태:", commentsHidden); // 디버깅용
            hideCommentsAndLiveChat();
        });
    }
    return true;
});