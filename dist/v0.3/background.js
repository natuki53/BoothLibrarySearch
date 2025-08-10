chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'fetchHtml' && message.url) {
        console.log('[background.js] fetch URL:', message.url); // デバッグ用にURLを表示
        fetch(message.url)
            .then(response => response.text())
            .then(html => {
                sendResponse({ html });
            })
            .catch(() => {
                sendResponse({ html: null });
            });
        // 非同期応答を明示
        return true;
    }
});
