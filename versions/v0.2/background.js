chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'fetchHtml' && message.url) {
        console.log('[background.js] fetch URL:', message.url); // デバッグ用にURLを表示
        
        // v0.1で成功しているシンプルなfetchパターン
        fetch(message.url)
            .then(response => {
                console.log('[background.js] fetch response status:', response.status);
                console.log('[background.js] fetch response type:', response.type);
                
                if (response.status >= 400) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                console.log('[background.js] HTML取得完了、長さ:', html.length);
                
                // v0.1と同じパターン: response.htmlを返す
                sendResponse({ html });
            })
            .catch((error) => {
                console.error('[background.js] fetchエラー:', error);
                console.error('[background.js] エラー詳細:', {
                    message: error.message,
                    stack: error.stack,
                    url: message.url
                });
                
                // エラーの種類に応じて適切なレスポンスを返す
                if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
                    console.log('[background.js] CORSまたはネットワークエラーが発生しました。');
                    sendResponse({ html: null });
                } else {
                    sendResponse({ html: null });
                }
            });
        
        // 非同期応答を明示
        return true;
    }
});
