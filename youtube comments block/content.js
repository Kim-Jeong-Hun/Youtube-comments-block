console.log("YouTube Comments Blocker Loaded");

// 댓글 & 라이브 채팅 숨기는 함수
const hideCommentsAndLiveChat = () => {
    let commentsSection = document.querySelector('#comments'); // 일반 댓글
    let liveChat = document.querySelector('#chat'); // 라이브 채팅

    if (commentsSection) {
        commentsSection.style.display = 'none';
        console.log("Comments hidden");
    }

    if (liveChat) {
        liveChat.style.display = 'none';
        console.log("Live chat hidden");
    }
};

// DOM 변화 감지 (유튜브가 새 영상 로드할 때 실행)
const observer = new MutationObserver(() => {
    console.log("DOM changed, checking for comments...");
    hideCommentsAndLiveChat();
});

// 페이지의 body 요소를 감시 (새 콘텐츠가 로드될 때 실행)
observer.observe(document.body, { childList: true, subtree: true });

// 초기에 한 번 실행
hideCommentsAndLiveChat();
