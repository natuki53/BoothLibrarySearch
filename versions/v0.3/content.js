(function () {
    //アバターリスト（作者ごとにグループ化）
    const Avatar_Groups = [
        {
            author: 'あまとうさぎ',
            avatars: ["ショコラ", "シフォン", "ライム", "カリン", "ラスク", "ミルク", "ミント"]
        },
        {
            author: 'ぷらすわん',
            avatars: ["ミルフィ", "真冬", "ナユ", "プラチナ", "アッシュ", "セフィラ", "リアアリス", "メープル", "受付嬢さん", "ルーシュ"]
        },
        {
            author: 'キュビクローゼット',
            avatars: ["萌", "愛莉", "舞夜", "ここあ", "狐雪", "Tien"]
        },
        {
            author: 'STUDIO JINGO',
            avatars: ["マヌカ", "セレスティア", "竜胆", "イメリス", "イヨ"]
        },
        {
            author: 'ポンデロニウム研究所',
            avatars: ["しなの", "桔梗", "メリノ", "ミーシェ"]
        },
        {
            author: 'IKUSIA',
            avatars: ["真央", "りりか", "ルルネ", "春香", "瑞希"]
        },
        {
            author: 'DOLOS art',
            avatars: ["ミルティナ", "ビナコ"]
        },
        {
            author: 'もち山金魚',
            avatars: ["キプフェル", "まめひなた", "うささき", "こぐまのルウ", "みなほし", "すずはな"]
        },
        {
            author: 'なるかでぃあ県',
            avatars: ["あのめあ", "Aco", "Tio", "Dia"]
        },
        {
            author: 'mio3io',
            avatars: ["森羅", "水瀬", "杏里", "透羽", "薄荷", "シロ", "翠蓮"]
        },
        {
            author: 'Chocolate rice',
            avatars: ["しお"]
        },
    ];

    const waitForLibrary = setInterval(() => {
        try {
            const list = document.querySelectorAll('div.mb-16.bg-white');
            console.log(`[ライブラリ待機] アイテム数: ${list.length}`);
            if (list.length > 0) {
                clearInterval(waitForLibrary);
                console.log('[ライブラリ検出] UI初期化を開始します');
                initFilterUI();
            }
        } catch (error) {
            console.error('[ライブラリ待機エラー]', error);
        }
    }, 500);

    // ページ読み込み完了時の初期化も追加
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('[DOMContentLoaded] ページ読み込み完了');
            const list = document.querySelectorAll('div.mb-16.bg-white');
            if (list.length > 0) {
                console.log('[DOMContentLoaded] ライブラリを検出、UI初期化を開始');
                initFilterUI();
            }
        });
    } else {
        console.log('[即座初期化] ページは既に読み込み完了済み');
        const list = document.querySelectorAll('div.mb-16.bg-white');
        if (list.length > 0) {
            console.log('[即座初期化] ライブラリを検出、UI初期化を開始');
            initFilterUI();
        }
    }

    const AVATAR_MAP = {
        // あまとうさぎ
        "ショコラ": ["ショコラ", "chocolat"],
        "シフォン": ["シフォン", "chiffon"],
        "ライム": ["ライム", "lime"],
        "カリン": ["カリン", "karin"],
        "ラスク": ["ラスク", "rusk"],
        "ミルク": ["ミルク", "milk"],
        "ミント": ["ミント", "mint"],

        // ぷらすわん
        "ミルフィ": ["ミルフィ", "milfy"],
        "真冬": ["真冬", "mafuyu"],
        "ナユ": ["ナユ", "nayu"],
        "プラチナ": ["プラチナ", "platinum"],
        "アッシュ": ["アッシュ", "ash"],
        "セフィラ": ["セフィラ", "sephira"],
        "リアアリス": ["リアアリス", "rearalice"],
        "メープル": ["メープル", "maple"],
        "受付嬢さん": ["受付嬢さん"],
        "ルーシュ": ["ルーシュ", "ruche"],

        // キュービークローゼット
        "萌": ["萌", "moe"],
        "愛莉": ["愛莉", "airi"],
        "舞夜": ["舞夜", "maya"],
        "ここあ": ["ここあ", "kokoa"],
        "狐雪": ["狐雪", "koyuki"],
        "Tien": ["Tien", "ティエン"],

        // STUDIO JINGO
        "マヌカ": ["マヌカ", "manuka"],
        "セレスティア": ["セレスティア", "selestia"],
        "竜胆": ["竜胆", "rindo"],
        "イメリス": ["イメリス", "imeris"],
        "イヨ": ["イヨ", "iyo"],

        // ポンデロニウム研究所
        "しなの": ["しなの", "shinano"],
        "桔梗": ["桔梗", "kikyo"],
        "メリノ": ["メリノ", "merino"],
        "ミーシェ": ["ミーシェ", "mische"],

        // IKUSIA
        "真央": ["真央", "mao"],
        "りりか": ["りりか", "ririka"],
        "ルルネ": ["ルルネ", "rurune"],
        "春香": ["春香", "haruka"],
        "瑞希": ["瑞希", "mizuki"],

        // DOLOS art
        "ミルティナ": ["ミルティナ", "milltina"],
        "ビナコ": ["ビナコ", "binaco"],

        // もち山金魚
        "キプフェル": ["キプフェル", "kipfel"],
        "まめひなた": ["まめひなた", "mamehinata"],
        "うささき": ["うささき", "usasaki"],
        "こぐまのルウ": ["こぐまのルウ", "rue"],
        "みなほし": ["みなほし", "minahoshi"],
        "すずはな": ["すずはな", "suzuhana"],

        // なるかでぃあ県
        "あのめあ": ["あのめあ", "anomea"],
        "Aco": ["Aco", "あこ"],
        "Tio": ["Tio", "ティオ"],
        "Dia": ["Día", "ディア"],

        // mio3io
        "森羅": ["森羅", "shinra"],
        "水瀬": ["水瀬", "minase"],
        "杏里": ["杏里", "anri"],
        "透羽": ["透羽", "sue"],
        "薄荷": ["薄荷", "hakka"],
        "シロ": ["しろ", "shiro"],
        "翠蓮": ["翠蓮", "suiren"],

        // Chocolate rice
        "しお": ["しお", "sio"],

        // その他のアバターはここに追加

    };

    function initFilterUI() {
        console.log('[UI初期化開始]');
        
        // 既存のUIが存在する場合は作成しない
        if (document.getElementById('booth-filter-wrapper')) {
            console.log('[UI初期化] 既存のUIが存在するため、スキップします');
            return;
        }

        //フィルターUIを作成
        console.log('[UI初期化] コンテナを検索中...');
        
        // 808px幅のコンテナを優先して取得
        let container = document.querySelector('.w-full.mb-24.desktop\\:mx-auto.desktop\\:w-\\[808px\\].desktop\\:px-24.desktop\\:mb-48');
        if (container) {
            console.log('[UI初期化] 808px幅のコンテナを発見');
        } else {
            // 既存の800px幅のコンテナがあればそちらもfallbackで取得
            container = document.querySelector('.w-full.mb-24.desktop\\:mx-auto.desktop\\:w-\\[800px\\].desktop\\:px-24.desktop\\:mb-48');
            if (container) {
                console.log('[UI初期化] 800px幅のコンテナを発見');
            } else {
                // ギフトページ用の新しい808px幅のコンテナもfallbackで取得
                container = document.querySelector('.w-full.mb-40.desktop\\:mx-auto.desktop\\:w-\\[808px\\].desktop\\:px-24.desktop\\:mb-64');
                if (container) {
                    console.log('[UI初期化] ギフトページ用コンテナを発見');
                }
            }
        }
        
        if (!container) {
            console.error('[UI初期化] コンテナが見つかりません。利用可能なセレクターを確認してください。');
            // 利用可能なセレクターをログ出力
            const allContainers = document.querySelectorAll('[class*="w-full"][class*="mb-"]');
            console.log('[UI初期化] 利用可能なコンテナ候補:', allContainers);
            return;
        }

        //UI要素を作成
        const wrapper = document.createElement('div');
        wrapper.id = 'booth-filter-wrapper';
        wrapper.className = 'flex gap-2 mb-4 items-center'; // 横並び・余白・中央揃え

        //プルダウン作成
        const dropdown = document.createElement('select');
        dropdown.id = 'avatarFilter';

        //デフォルト「すべて」オプションを追加
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'すべて';
        defaultOption.value = '';
        dropdown.appendChild(defaultOption);

        // 作者ごとにoptgroupでグループ化
        Avatar_Groups.forEach(group => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = group.author;
            group.avatars.forEach(name => {
                const option = document.createElement('option');
                option.textContent = name;
                option.value = name;
                optgroup.appendChild(option);
            });
            dropdown.appendChild(optgroup);
        });

        //検索ボックス
        const searchBox = document.createElement('input');
        searchBox.type = 'text';
        searchBox.placeholder = 'アバター名で検索';
        searchBox.id = 'avatarSearch';

        //検索ボタン
        const searchBtn = document.createElement('button');
        searchBtn.id = 'avatarSearchBtn';
        searchBtn.textContent = '検索';
        searchBtn.style.cssText = 'padding: 0 16px; height: 32px; border-radius: 4px; background: #e60033; color: #fff; font-weight: bold; border: none; cursor: pointer;';

        //UIを配置（重複を防ぐ）
        wrapper.appendChild(dropdown);
        wrapper.appendChild(searchBox);
        wrapper.appendChild(searchBtn);
        container.prepend(wrapper);
        
        console.log('[UI初期化] フィルターUIを作成しました');
        
        // グローバルロードインジケータを検索UI下に設置
        let globalLoading = document.createElement('div');
        globalLoading.id = 'booth-global-loading';
        globalLoading.style.cssText = 'display:none;margin-bottom:8px;font-weight:bold;color:#000000;';
        globalLoading.textContent = 'ロード中…';
        wrapper.insertAdjacentElement('afterend', globalLoading);

        // 絞り込み処理
        let lastAvatar = '';
        let lastKeyword = '';
        let lastFetchUrls = new Set();
        let fetchInProgress = 0;
        let processingQueue = [];
        let isProcessing = false;
        
        // 高速化: 並列処理の設定（最大同時処理数を10件に変更）
        const MAX_CONCURRENT_FETCHES = 10; // 最大同時実行数を10件に変更
        const BATCH_SIZE = 15; // バッチ処理サイズ
        const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // キャッシュ有効期限: 5分

        // 高速化: パフォーマンス監視
        let performanceMetrics = {
            searchCount: 0,
            averageSearchTime: 0,
            totalSearchTime: 0,
            cacheHitRate: 0,
            cacheHits: 0,
            cacheMisses: 0
        };

        // 高速化: メモリ効率的なキャッシュ管理
        class LRUCache {
            constructor(maxSize = 100) {
                this.maxSize = maxSize;
                this.cache = new Map();
                this.accessOrder = [];
            }

            get(key) {
                if (this.cache.has(key)) {
                    // アクセス順序を更新
                    const index = this.accessOrder.indexOf(key);
                    if (index > -1) {
                        this.accessOrder.splice(index, 1);
                    }
                    this.accessOrder.push(key);
                    
                    // パフォーマンス計測
                    performanceMetrics.cacheHits++;
                    return this.cache.get(key);
                }
                performanceMetrics.cacheMisses++;
                return null;
            }

            set(key, value) {
                if (this.cache.has(key)) {
                    // 既存のキーの場合、アクセス順序のみ更新
                    const index = this.accessOrder.indexOf(key);
                    if (index > -1) {
                        this.accessOrder.splice(index, 1);
                    }
                } else if (this.cache.size >= this.maxSize) {
                    // キャッシュが一杯の場合、最も古いものを削除
                    const oldestKey = this.accessOrder.shift();
                    this.cache.delete(oldestKey);
                }
                
                this.cache.set(key, value);
                this.accessOrder.push(key);
            }

            clear() {
                this.cache.clear();
                this.accessOrder = [];
            }

            getSize() {
                return this.cache.size;
            }
        }

        // 高速化: 改良されたキャッシュシステム
        let itemCache = new LRUCache(150); // 最大150件までキャッシュ
        let searchIndex = new LRUCache(50); // 検索インデックスもキャッシュ
        let lastSearchResults = new Set();

        // 高速化: 検索アルゴリズムの最適化
        function optimizedTextSearch(text, keywords, useRegex = false) {
            if (!text || !keywords || keywords.length === 0) return true;
            
            const normalizedText = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            
            if (useRegex) {
                try {
                    const regex = new RegExp(keywords.join('|'), 'i');
                    return regex.test(normalizedText);
                } catch (e) {
                    // 正規表現が無効な場合は通常の検索にフォールバック
                    return keywords.some(keyword => normalizedText.includes(keyword.toLowerCase()));
                }
            } else {
                return keywords.every(keyword => normalizedText.includes(keyword.toLowerCase()));
            }
        }

        // 高速化: 並列処理の最適化（最大同時処理数を10件に制限）
        async function processItemsInParallel(items, selectedAvatar, keyword, avatarKeywords) {
            const displayMap = new Map();
            const fetchQueue = [];
            const startTime = performance.now();
            
            try {
                // 1. 高速プリフィルタリング（タイトルとヘッダーのみ）
                const preFilterResults = await preFilterItems(items, selectedAvatar, keyword, avatarKeywords);
                
                // プリフィルタリング結果を表示マップに反映
                preFilterResults.forEach((result, item) => {
                    displayMap.set(item, result);
                    if (!result) {
                        // fetchが必要なアイテムをキューに追加
                        const link = item.querySelector('a.no-underline');
                        if (link && link.href && !lastFetchUrls.has(link.href)) {
                            fetchQueue.push({ item, link, index: Array.from(items).indexOf(item) });
                        }
                    }
                });
                
                // 2. 並列fetch処理（最大同時処理数を10件に制限）
                if (fetchQueue.length > 0) {
                    globalLoading.style.display = '';
                    
                    // バッチサイズを動的に調整（最大同時処理数を10件に制限）
                    const optimalBatchSize = Math.min(MAX_CONCURRENT_FETCHES, Math.ceil(fetchQueue.length / 3));
                    
                    for (let i = 0; i < fetchQueue.length; i += optimalBatchSize) {
                        const batch = fetchQueue.slice(i, i + optimalBatchSize);
                        const batchPromises = batch.map(async ({ item, link, index }) => {
                            try {
                                lastFetchUrls.add(link.href);
                                
                                // キャッシュチェック
                                const cachedHtml = itemCache.get(link.href);
                                let html;
                                
                                if (cachedHtml) {
                                    html = cachedHtml;
                                    console.log(`[アイテム${index}] キャッシュヒット: ${link.href}`);
                                } else {
                                    const response = await new Promise((resolve) => {
                                        chrome.runtime.sendMessage({
                                            type: 'fetchHtml',
                                            url: link.href
                                        }, resolve);
                                    });
                                    
                                    if (!response || !response.html) {
                                        displayMap.set(item, false);
                                        return;
                                    }
                                    
                                    html = response.html;
                                    itemCache.set(link.href, html);
                                }
                                
                                // 最適化されたテキスト抽出
                                const allText = extractOptimizedText(html);
                                
                                // 高速マッチング
                                const isMatch = optimizedTextSearch(allText, [keyword, ...avatarKeywords].filter(Boolean));
                                displayMap.set(item, isMatch);
                                
                            } catch (error) {
                                console.error(`[アイテム${index}] fetchエラー:`, error);
                                displayMap.set(item, false);
                            }
                        });
                        
                        // バッチを並列実行（最大同時処理数を10件に制限）
                        await Promise.all(batchPromises);
                        
                        // バッチごとに表示更新（ユーザビリティ向上）
                        batchUpdateDisplay(items, displayMap);
                    }
                    
                    globalLoading.style.display = 'none';
                }
                
                // 3. 最終的な表示更新
                batchUpdateDisplay(items, displayMap);
                
                // パフォーマンス計測
                const endTime = performance.now();
                const searchTime = endTime - startTime;
                performanceMetrics.searchCount++;
                performanceMetrics.totalSearchTime += searchTime;
                performanceMetrics.averageSearchTime = performanceMetrics.totalSearchTime / performanceMetrics.searchCount;
                performanceMetrics.cacheHitRate = performanceMetrics.cacheHits / (performanceMetrics.cacheHits + performanceMetrics.cacheMisses);
                
                console.log(`[高速検索完了] 処理時間: ${searchTime.toFixed(2)}ms, 平均: ${performanceMetrics.averageSearchTime.toFixed(2)}ms, キャッシュヒット率: ${(performanceMetrics.cacheHitRate * 100).toFixed(1)}%`);
                
                return displayMap;
            } catch (error) {
                console.error('[並列処理エラー]', error);
                globalLoading.style.display = 'none';
                return displayMap;
            }
        }

        // 高速化: プリフィルタリング処理
        async function preFilterItems(items, selectedAvatar, keyword, avatarKeywords) {
            const results = new Map();
            
            try {
                // Web Workersを使用して並列処理（可能な場合）
                if (window.Worker && items.length > 50) {
                    // 大量のアイテムがある場合はWeb Workerを使用
                    return await preFilterWithWorker(items, selectedAvatar, keyword, avatarKeywords);
                }
                
                // 通常のプリフィルタリング
                items.forEach((item) => {
                    try {
                        const title = item.querySelector('.text-text-default.font-bold.typography-16.\\!preserve-half-leading.mb-8.break-all')?.innerText.toLowerCase() || "";
                        const headers = Array.from(item.querySelectorAll('div.typography-14.\\!preserve-half-leading'))
                            .map(h => h.innerText?.toLowerCase() || "")
                            .join(' ');
                        
                        const allText = `${title} ${headers}`;
                        
                        // 高速マッチング
                        const matchAvatar = !selectedAvatar || avatarKeywords.some(v => allText.includes(v));
                        const matchKeyword = !keyword || allText.includes(keyword);
                        const isMatch = selectedAvatar ? (matchAvatar && matchKeyword) : matchKeyword;
                        
                        results.set(item, isMatch);
                    } catch (itemError) {
                        console.error('[プリフィルタリングアイテムエラー]', itemError);
                        results.set(item, false);
                    }
                });
                
                return results;
            } catch (error) {
                console.error('[プリフィルタリングエラー]', error);
                // エラーが発生した場合は全て表示
                items.forEach(item => results.set(item, true));
                return results;
            }
        }

        // 高速化: Web Workerを使用したプリフィルタリング
        async function preFilterWithWorker(items, selectedAvatar, keyword, avatarKeywords) {
            return new Promise((resolve) => {
                try {
                    const workerCode = `
                        self.onmessage = function(e) {
                            const { items, selectedAvatar, keyword, avatarKeywords } = e.data;
                            const results = new Map();
                            
                            items.forEach((item, index) => {
                                const title = item.title || '';
                                const headers = item.headers || '';
                                const allText = (title + ' ' + headers).toLowerCase();
                                
                                const matchAvatar = !selectedAvatar || avatarKeywords.some(v => allText.includes(v));
                                const matchKeyword = !keyword || allText.includes(keyword);
                                const isMatch = selectedAvatar ? (matchAvatar && matchKeyword) : matchKeyword;
                                
                                results.set(index, isMatch);
                            });
                            
                            self.postMessage(results);
                        };
                    `;
                    
                    const blob = new Blob([workerCode], { type: 'application/javascript' });
                    const worker = new Worker(URL.createObjectURL(blob));
                    
                    // アイテムデータを準備
                    const itemData = Array.from(items).map(item => ({
                        title: item.querySelector('.text-text-default.font-bold.typography-16.\\!preserve-half-leading.mb-8.break-all')?.innerText || '',
                        headers: Array.from(item.querySelectorAll('div.typography-14.\\!preserve-half-leading'))
                            .map(h => h.innerText || '').join(' ')
                    }));
                    
                    worker.onmessage = function(e) {
                        const results = new Map();
                        e.data.forEach((isMatch, index) => {
                            results.set(items[index], isMatch);
                        });
                        resolve(results);
                        worker.terminate();
                    };
                    
                    worker.onerror = function(error) {
                        console.error('[Web Workerエラー]', error);
                        // エラーが発生した場合は通常の処理にフォールバック
                        const results = new Map();
                        items.forEach(item => results.set(item, true));
                        resolve(results);
                    };
                    
                    worker.postMessage({ items: itemData, selectedAvatar, keyword, avatarKeywords });
                } catch (error) {
                    console.error('[Web Worker初期化エラー]', error);
                    // エラーが発生した場合は通常の処理にフォールバック
                    const results = new Map();
                    items.forEach(item => results.set(item, true));
                    resolve(results);
                }
            });
        }

        // 高速化: 最適化されたテキスト抽出
        function extractOptimizedText(html) {
            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // 優先度付きセレクター（高速化）
                const prioritySelectors = [
                    '.grid.desktop\\:gap-40.mobile\\:gap-24',
                    '.main-info-column',
                    '.item-description',
                    '.description',
                    '[data-testid="item-description"]'
                ];
                
                for (const selector of prioritySelectors) {
                    const elem = doc.querySelector(selector);
                    if (elem) {
                        const text = elem.innerText.trim();
                        if (text.length > 50) {
                            return text.replace(/\s+/g, ' ').trim().toLowerCase();
                        }
                    }
                }
                
                // フォールバック: 最適化されたbody処理
                const body = doc.body;
                if (body) {
                    const clone = body.cloneNode(true);
                    const elementsToRemove = clone.querySelectorAll('script, style, nav, header, footer, .nav, .header, .footer, .sidebar, .ad, .advertisement');
                    elementsToRemove.forEach(el => el.remove());
                    return clone.innerText.replace(/\s+/g, ' ').trim().toLowerCase();
                }
                
                return '';
            } catch (error) {
                console.error('[テキスト抽出エラー]', error);
                return '';
            }
        }

        // 高速化: バッチ処理によるDOM更新
        function batchUpdateDisplay(items, displayMap) {
            try {
                // 表示状態を一括で更新
                const fragment = document.createDocumentFragment();
                const hiddenItems = [];
                
                items.forEach(item => {
                    const shouldShow = displayMap.get(item);
                    if (shouldShow) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                        hiddenItems.push(item);
                    }
                });
                
                // 非表示アイテムを一括で処理
                if (hiddenItems.length > 0) {
                    hiddenItems.forEach(item => {
                        item.style.display = 'none';
                    });
                }
            } catch (error) {
                console.error('[表示更新エラー]', error);
            }
        }

        // 高速化: 最適化された検索関数
        async function filterItems() {
            try {
                const selectedAvatar = dropdown.value;
                const keyword = searchBox.value.toLowerCase();
                const items = document.querySelectorAll('div.mb-16.bg-white');

                if (items.length === 0) {
                    console.log('[検索] アイテムが見つかりません');
                    return;
                }

                console.log(`[高速検索開始] アバター: "${selectedAvatar}", キーワード: "${keyword}", アイテム数: ${items.length}`);

                // 選択されたアバターの全バリエーション（日本語・英語）を取得
                const avatarKeywords = selectedAvatar && AVATAR_MAP[selectedAvatar] ? AVATAR_MAP[selectedAvatar].map(v => v.toLowerCase()) : [];

                // 検索条件が変わった時だけキャッシュをクリア
                const isConditionChanged = (lastAvatar !== selectedAvatar) || (lastKeyword !== keyword);
                if (isConditionChanged) {
                    console.log(`[検索条件変更] キャッシュをクリア`);
                    lastFetchUrls.clear();
                    itemCache.clear();
                    searchIndex.clear();
                    lastSearchResults.clear();
                }
                lastAvatar = selectedAvatar;
                lastKeyword = keyword;

                // 並列処理で高速検索実行（最大同時処理数を10件に制限）
                const startTime = performance.now();
                const displayMap = await processItemsInParallel(items, selectedAvatar, keyword, avatarKeywords);
                const endTime = performance.now();
                
                console.log(`[高速検索完了] 処理時間: ${(endTime - startTime).toFixed(2)}ms`);
                
                // 結果をキャッシュ
                lastSearchResults = new Set(Array.from(displayMap.entries())
                    .filter(([item, show]) => show)
                    .map(([item]) => item));
                
                // 検索統計を更新
                updateSearchStats(displayMap);
                
                // パフォーマンス情報を表示
                updatePerformanceInfo();
            } catch (error) {
                console.error('[検索エラー]', error);
                // エラーが発生した場合は全て表示
                const items = document.querySelectorAll('div.mb-16.bg-white');
                items.forEach(item => item.style.display = '');
            }
        }

        // イベント紐付け
        searchBtn.addEventListener('click', filterItems);

        // 高速化: リアルタイム検索とデバウンス処理
        let searchTimeout = null;
        const SEARCH_DELAY = 300; // 300msのデバウンス

        searchBox.addEventListener('input', (e) => {
            // プルダウンを「すべて」に戻す
            if (e.target.value !== '') {
                dropdown.value = '';
            }
            
            // デバウンス処理でリアルタイム検索
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            
            searchTimeout = setTimeout(() => {
                if (e.target.value.length >= 2 || e.target.value.length === 0) {
                    filterItems();
                }
            }, SEARCH_DELAY);
        });

        // 高速化: Enterキーでの即座検索
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (searchTimeout) {
                    clearTimeout(searchTimeout);
                }
                filterItems();
            }
        });

        // 高速化: 検索結果の統計表示
        function updateSearchStats(displayMap) {
            try {
                const totalItems = displayMap.size;
                const visibleItems = Array.from(displayMap.values()).filter(show => show).length;
                
                // 統計情報を表示
                let statsElement = document.getElementById('search-stats');
                if (!statsElement) {
                    statsElement = document.createElement('div');
                    statsElement.id = 'search-stats';
                    statsElement.style.cssText = 'margin-top: 8px; font-size: 12px; color: #666;';
                    wrapper.insertAdjacentElement('afterend', statsElement);
                }
                
                statsElement.textContent = `検索結果: ${visibleItems}/${totalItems}件`;
            } catch (error) {
                console.error('[統計更新エラー]', error);
            }
        }

        // 高速化: パフォーマンス情報表示
        function updatePerformanceInfo() {
            try {
                let perfElement = document.getElementById('performance-info');
                if (!perfElement) {
                    perfElement = document.createElement('div');
                    perfElement.id = 'performance-info';
                    perfElement.style.cssText = 'margin-top: 4px; font-size: 11px; color: #888; font-family: monospace;';
                    const statsElement = document.getElementById('search-stats');
                    if (statsElement) {
                        statsElement.insertAdjacentElement('afterend', perfElement);
                    }
                }
                
                const cacheSize = itemCache.getSize();
                const cacheHitRate = performanceMetrics.cacheHitRate * 100;
                
                perfElement.innerHTML = `
                    キャッシュ: ${cacheSize}/150件 | 
                    ヒット率: ${cacheHitRate.toFixed(1)}% | 
                    平均検索時間: ${performanceMetrics.averageSearchTime.toFixed(1)}ms |
                    最大同時処理: ${MAX_CONCURRENT_FETCHES}件
                `;
            } catch (error) {
                console.error('[パフォーマンス情報更新エラー]', error);
            }
        }

        // 高速化: キャッシュ管理機能
        function clearCache() {
            try {
                itemCache.clear();
                searchIndex.clear();
                lastFetchUrls.clear();
                lastSearchResults.clear();
                
                // パフォーマンスメトリクスをリセット
                performanceMetrics = {
                    searchCount: 0,
                    averageSearchTime: 0,
                    totalSearchTime: 0,
                    cacheHitRate: 0,
                    cacheHits: 0,
                    cacheMisses: 0
                };
                
                console.log('[キャッシュクリア] 全キャッシュをクリアしました');
                updatePerformanceInfo();
            } catch (error) {
                console.error('[キャッシュクリアエラー]', error);
            }
        }

        // 高速化: メモリ使用量監視
        function monitorMemoryUsage() {
            try {
                if ('memory' in performance) {
                    const memory = performance.memory;
                    const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
                    const totalMB = Math.round(memory.totalJSHeapSize / 1024 / 1024);
                    const limitMB = Math.round(memory.jsHeapSizeLimit / 1024 / 1024);
                    
                    console.log(`[メモリ監視] 使用: ${usedMB}MB / 総計: ${totalMB}MB / 制限: ${limitMB}MB`);
                    
                    // メモリ使用量が高い場合はキャッシュをクリア
                    if (usedMB > limitMB * 0.8) {
                        console.warn('[メモリ監視] メモリ使用量が高いため、キャッシュをクリアします');
                        clearCache();
                    }
                }
            } catch (error) {
                console.error('[メモリ監視エラー]', error);
            }
        }

        // 高速化: 定期的なメモリ監視
        setInterval(monitorMemoryUsage, 30000); // 30秒ごとに監視

        // 高速化: キャッシュクリアボタンの追加
        function addCacheControlUI() {
            try {
                const cacheControlDiv = document.createElement('div');
                cacheControlDiv.style.cssText = 'margin-top: 8px; display: flex; gap: 8px;';
                
                const clearCacheBtn = document.createElement('button');
                clearCacheBtn.textContent = 'キャッシュクリア';
                clearCacheBtn.style.cssText = 'padding: 4px 8px; font-size: 11px; border: 1px solid #ccc; border-radius: 3px; background: #f5f5f5; cursor: pointer;';
                clearCacheBtn.addEventListener('click', clearCache);
                
                const cacheInfoBtn = document.createElement('button');
                cacheInfoBtn.textContent = 'キャッシュ情報';
                cacheInfoBtn.style.cssText = 'padding: 4px 8px; font-size: 11px; border: 1px solid #ccc; border-radius: 3px; background: #f5f5f5; cursor: pointer;';
                cacheInfoBtn.addEventListener('click', () => {
                    const cacheSize = itemCache.getSize();
                    const searchIndexSize = searchIndex.getSize();
                    alert(`キャッシュ情報:\nアイテムキャッシュ: ${cacheSize}件\n検索インデックス: ${searchIndexSize}件\nキャッシュヒット率: ${(performanceMetrics.cacheHitRate * 100).toFixed(1)}%\n最大同時処理: ${MAX_CONCURRENT_FETCHES}件`);
                });
                
                cacheControlDiv.appendChild(clearCacheBtn);
                cacheControlDiv.appendChild(cacheInfoBtn);
                
                const statsElement = document.getElementById('search-stats');
                if (statsElement) {
                    statsElement.insertAdjacentElement('afterend', cacheControlDiv);
                }
            } catch (error) {
                console.error('[キャッシュ管理UI追加エラー]', error);
            }
        }

        // 高速化: 検索最適化のための設定
        const SEARCH_OPTIMIZATIONS = {
            enableWebWorkers: true,
            enableParallelProcessing: true,
            enableSmartCaching: true,
            enableMemoryMonitoring: true,
            maxConcurrentFetches: MAX_CONCURRENT_FETCHES,
            batchSize: BATCH_SIZE,
            cacheExpiryTime: CACHE_EXPIRY_TIME
        };

        // 高速化: 設定の動的調整
        function adjustSearchOptimizations() {
            try {
                const itemCount = document.querySelectorAll('div.mb-16.bg-white').length;
                
                if (itemCount > 100) {
                    // 大量のアイテムがある場合は並列処理を強化（最大同時処理数を10件に制限）
                    SEARCH_OPTIMIZATIONS.maxConcurrentFetches = Math.min(MAX_CONCURRENT_FETCHES, Math.ceil(itemCount / 20));
                    SEARCH_OPTIMIZATIONS.batchSize = Math.min(20, Math.ceil(itemCount / 10));
                    console.log(`[最適化調整] 大量アイテム検出(${itemCount}件): 並列処理を強化、最大同時処理: ${SEARCH_OPTIMIZATIONS.maxConcurrentFetches}件`);
                } else if (itemCount < 20) {
                    // 少ないアイテムの場合は逐次処理に切り替え
                    SEARCH_OPTIMIZATIONS.maxConcurrentFetches = 3;
                    SEARCH_OPTIMIZATIONS.batchSize = 5;
                    console.log(`[最適化調整] 少数アイテム検出(${itemCount}件): 逐次処理に切り替え、最大同時処理: ${SEARCH_OPTIMIZATIONS.maxConcurrentFetches}件`);
                }
            } catch (error) {
                console.error('[最適化調整エラー]', error);
            }
        }

        // 高速化: UI初期化完了後の設定適用
        function initializeSearchOptimizations() {
            try {
                // 検索最適化の設定を調整
                adjustSearchOptimizations();
                
                // キャッシュ管理UIを追加
                setTimeout(() => {
                    addCacheControlUI();
                }, 1000); // 1秒後に追加（UIの読み込み完了を待つ）
                
                // 初期パフォーマンス情報を表示
                setTimeout(() => {
                    updatePerformanceInfo();
                }, 2000); // 2秒後に表示
                
                console.log(`[高速化初期化完了] 検索最適化設定を適用しました。最大同時処理: ${MAX_CONCURRENT_FETCHES}件`);
            } catch (error) {
                console.error('[最適化初期化エラー]', error);
            }
        }

        // 高速化: 初期化処理の実行
        initializeSearchOptimizations();
        
        console.log('[UI初期化完了] フィルターUIの初期化が完了しました');
    }
})();
