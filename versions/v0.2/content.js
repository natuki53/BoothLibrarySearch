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
        const list = document.querySelectorAll('div.mb-16.bg-white');
        if (list.length > 0) {
            clearInterval(waitForLibrary);
            initFilterUI();
        }
    }, 500);

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
        //フィルターUIを作成
        // 808px幅のコンテナを優先して取得
        let container = document.querySelector('.w-full.mb-24.desktop\\:mx-auto.desktop\\:w-\\[808px\\].desktop\\:px-24.desktop\\:mb-48');
        if (!container) {
            // 既存の800px幅のコンテナがあればそちらもfallbackで取得
            container = document.querySelector('.w-full.mb-24.desktop\\:mx-auto.desktop\\:w-\\[800px\\].desktop\\:px-24.desktop\\:mb-48');
        }
        if (!container) {
            // ギフトページ用の新しい808px幅のコンテナもfallbackで取得
            container = document.querySelector('.w-full.mb-40.desktop\\:mx-auto.desktop\\:w-\\[808px\\].desktop\\:px-24.desktop\\:mb-64');
        }
        if (!container) return;

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

        //UIを配置
        wrapper.appendChild(dropdown);
        wrapper.appendChild(searchBox);
        wrapper.appendChild(searchBox);
        wrapper.appendChild(searchBtn);
        container.prepend(wrapper);
        
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

        // アイテムを一つ一つ順番に処理する関数
        async function processItemSequentially(item, selectedAvatar, keyword, avatarKeywords) {
            console.log(`[処理開始] アイテム: ${item.querySelector('.text-text-default.font-bold')?.innerText || 'タイトルなし'}`);
            
            // 1. タイトル検索
            let title = item.querySelector('.text-text-default.font-bold')?.innerText.toLowerCase() || "";
            let fullText = title;
            
            console.log(`[タイトル検索] タイトル: "${title}"`);
            
            // アバター名（日本語・英語）いずれかに一致するか
            const matchAvatar = !selectedAvatar || avatarKeywords.some(v => fullText.includes(v));
            const matchKeyword = !keyword || fullText.includes(keyword);
            const isMatch = selectedAvatar ? (matchAvatar && matchKeyword) : matchKeyword;
            
            if (isMatch) {
                console.log(`[タイトル検索] ヒット: タイトルで一致`);
                item.style.display = '';
                return true;
            }
            
            console.log(`[タイトル検索] ヒットなし: 次の検索へ`);
            
            // 2. ヘッダー検索（no-underlineリンクのテキストとhref）
            const link = item.querySelector('a.no-underline');
            if (link && link.href) {
                const linkText = link.innerText?.toLowerCase() || '';
                const linkHref = link.href?.toLowerCase() || '';
                
                console.log(`[ヘッダー検索] リンクテキスト: "${linkText}"`);
                console.log(`[ヘッダー検索] リンクURL: "${linkHref}"`);
                
                const matchAvatarInLink = !selectedAvatar || avatarKeywords.some(v => linkText.includes(v) || linkHref.includes(v));
                const matchKeywordInLink = !keyword || linkText.includes(keyword) || linkHref.includes(keyword);
                const isMatchInLink = selectedAvatar ? (matchAvatarInLink && matchKeywordInLink) : matchKeywordInLink;
                
                if (isMatchInLink) {
                    console.log(`[ヘッダー検索] ヒット: リンク情報で一致`);
                    item.style.display = '';
                    return true;
                }
                
                console.log(`[ヘッダー検索] ヒットなし: fetchが必要`);
                
                // 3. fetchが必要な場合のみ実行
                if (!lastFetchUrls.has(link.href)) {
                    lastFetchUrls.add(link.href);
                    fetchInProgress++;
                    globalLoading.style.display = '';
                    
                    console.log(`[fetch開始] URL: ${link.href}`);
                    
                    try {
                        const response = await new Promise((resolve) => {
                            chrome.runtime.sendMessage({
                                type: 'fetchHtml',
                                url: link.href
                            }, resolve);
                        });
                        
                        fetchInProgress--;
                        if (fetchInProgress <= 0) {
                            globalLoading.style.display = 'none';
                        }
                        
                        if (!response || !response.html) {
                            console.log(`[fetch結果] エラーまたはHTMLなし`);
                            item.style.display = 'none';
                            return false;
                        }
                        
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(response.html, 'text/html');
                        
                        // より多くのテキストを取得するための改善された要素選択
                        let allText = '';
                        let textSources = [];
                        
                        // 1. 優先度1: メインコンテンツエリア
                        const mainContentSelectors = [
                            '.grid.desktop\\:gap-40.mobile\\:gap-24',
                            '.main-info-column',
                            '.item-description',
                            '.description',
                            '[data-testid="item-description"]'
                        ];
                        
                        for (const selector of mainContentSelectors) {
                            const elem = doc.querySelector(selector);
                            if (elem) {
                                const text = elem.innerText.trim();
                                if (text.length > 50) { // 十分な長さのテキストのみ
                                    allText += text + ' ';
                                    textSources.push(`優先度1(${selector}): ${text.length}文字`);
                                    break; // 最初に見つかった要素を使用
                                }
                            }
                        }
                        
                        // 2. 優先度2: 一般的なテキスト要素
                        if (allText.length < 100) {
                            const textElements = doc.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6');
                            let combinedText = '';
                            for (const elem of textElements) {
                                const text = elem.innerText.trim();
                                if (text.length > 10 && text.length < 1000) { // 適切な長さのテキスト
                                    combinedText += text + ' ';
                                }
                            }
                            if (combinedText.length > allText.length) {
                                allText = combinedText;
                                textSources.push(`優先度2(一般的要素): ${combinedText.length}文字`);
                            }
                        }
                        
                        // 3. 優先度3: 特定のクラスを持つ要素
                        if (allText.length < 100) {
                            const specificSelectors = [
                                '.autolink.break-words.typography-16.whitespace-pre-line',
                                '.break-words.js-autolink.\\!m-0.\\!p-0.whitespace-pre-line.typography-14.desktop\\:typography-16',
                                '.typography-16',
                                '.typography-14'
                            ];
                            
                            for (const selector of specificSelectors) {
                                const elem = doc.querySelector(selector);
                                if (elem) {
                                    const text = elem.innerText.trim();
                                    if (text.length > allText.length) {
                                        allText = text;
                                        textSources.push(`優先度3(${selector}): ${text.length}文字`);
                                    }
                                }
                            }
                        }
                        
                        // 4. フォールバック: body全体から不要な要素を除外
                        if (allText.length < 50) {
                            const body = doc.body;
                            if (body) {
                                // スクリプト、スタイル、ナビゲーション等を除外
                                const clone = body.cloneNode(true);
                                const elementsToRemove = clone.querySelectorAll('script, style, nav, header, footer, .nav, .header, .footer, .sidebar');
                                elementsToRemove.forEach(el => el.remove());
                                
                                const fallbackText = clone.innerText.trim();
                                if (fallbackText.length > allText.length) {
                                    allText = fallbackText;
                                    textSources.push(`フォールバック(body): ${fallbackText.length}文字`);
                                }
                            }
                        }
                        
                        // テキストの正規化
                        allText = allText.replace(/\s+/g, ' ').trim().toLowerCase();
                        
                        console.log(`[fetch結果] URL: ${link.href}`);
                        console.log(`[fetch結果] テキストソース: ${textSources.join(', ')}`);
                        console.log(`[fetch結果] 取得テキスト長: ${allText.length}文字`);
                        console.log(`[fetch結果] 取得テキスト: ${allText.substring(0, 500)}...`);
                        
                        const matchAvatarSub = !selectedAvatar || avatarKeywords.some(v => allText.includes(v));
                        const matchKeywordSub = !keyword || allText.includes(keyword);
                        const isMatchSub = selectedAvatar ? (matchAvatarSub && matchKeywordSub) : matchKeywordSub;
                        
                        if (isMatchSub) {
                            console.log(`[fetch結果] ヒット: 本文で一致 (テキスト長: ${allText.length}文字)`);
                        } else {
                            console.log(`[fetch結果] ヒットなし: 完全に不一致 (テキスト長: ${allText.length}文字)`);
                        }
                        
                        item.style.display = isMatchSub ? '' : 'none';
                        return isMatchSub;
                        
                    } catch (error) {
                        console.error(`[fetchエラー] URL: ${link.href}`, error);
                        fetchInProgress--;
                        if (fetchInProgress <= 0) {
                            globalLoading.style.display = 'none';
                        }
                        item.style.display = 'none';
                        return false;
                    }
                } else {
                    console.log(`[fetchスキップ] 既に処理済み: ${link.href}`);
                    item.style.display = 'none';
                    return false;
                }
            } else {
                console.log(`[ヘッダー検索] リンクなし: 非表示`);
                item.style.display = 'none';
                return false;
            }
        }

        // キュー処理関数
        async function processQueue() {
            if (isProcessing || processingQueue.length === 0) return;
            
            isProcessing = true;
            console.log(`[キュー処理開始] 残りアイテム数: ${processingQueue.length}`);
            
            while (processingQueue.length > 0) {
                const { item, selectedAvatar, keyword, avatarKeywords } = processingQueue.shift();
                await processItemSequentially(item, selectedAvatar, keyword, avatarKeywords);
                
                // 少し待機してから次のアイテムを処理
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            isProcessing = false;
            console.log(`[キュー処理完了] 全アイテム処理完了`);
        }

        function filterItems() {
            const selectedAvatar = dropdown.value;
            const keyword = searchBox.value.toLowerCase();
            const items = document.querySelectorAll('div.mb-16.bg-white');

            console.log(`[検索開始] アバター: "${selectedAvatar}", キーワード: "${keyword}"`);

            // 選択されたアバターの全バリエーション（日本語・英語）を取得
            const avatarKeywords = selectedAvatar && AVATAR_MAP[selectedAvatar] ? AVATAR_MAP[selectedAvatar].map(v => v.toLowerCase()) : [];

            // 検索条件が変わった時だけfetchを許可
            const isConditionChanged = (lastAvatar !== selectedAvatar) || (lastKeyword !== keyword);
            if (isConditionChanged) {
                console.log(`[検索条件変更] 前回のキャッシュをクリア`);
                lastFetchUrls.clear();
                processingQueue = [];
            }
            lastAvatar = selectedAvatar;
            lastKeyword = keyword;

            // キューをクリアして新しいアイテムを追加
            processingQueue = [];
            
            items.forEach((item, index) => {
                console.log(`[アイテム${index + 1}] キューに追加`);
                processingQueue.push({ item, selectedAvatar, keyword, avatarKeywords });
            });

            // キュー処理を開始
            processQueue();
        }

        // イベント紐付け
        searchBtn.addEventListener('click', filterItems);

        // 検索ボックス入力時にプルダウンを「すべて」に戻す
        searchBox.addEventListener('input', () => {
            if (searchBox.value !== '') {
                dropdown.value = '';
            }
        });
    }
})();
