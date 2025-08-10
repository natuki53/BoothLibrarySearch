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

        function filterItems() {
            const selectedAvatar = dropdown.value;
            const keyword = searchBox.value.toLowerCase().trim(); // trim()を追加
            const items = document.querySelectorAll('div.mb-16.bg-white');

            // 選択されたアバターの全バリエーション（日本語・英語）を取得
            const avatarKeywords = selectedAvatar && AVATAR_MAP[selectedAvatar] ? AVATAR_MAP[selectedAvatar].map(v => v.toLowerCase()) : [];

            // 検索条件が変わった時だけfetchを許可
            const isConditionChanged = (lastAvatar !== selectedAvatar) || (lastKeyword !== keyword);
            if (isConditionChanged) {
                lastFetchUrls.clear();
            }
            lastAvatar = selectedAvatar;
            lastKeyword = keyword;

            console.log('[filterItems] 検索開始:', { selectedAvatar, keyword, keywordLength: keyword.length, avatarKeywords, isConditionChanged });

                    // 非同期処理を同期的に実行するための関数
        const processItemsSequentially = async () => {
            for (let index = 0; index < items.length; index++) {
                    const item = items[index];
                    console.log(`[item ${index}] 処理開始`);
                    
                    // タイトル検索（正確なクラス指定）
                    let title = item.querySelector('.text-text-default.font-bold.typography-16.\\!preserve-half-leading.mb-8.break-all')?.innerText.toLowerCase() || "";
                    let fullText = title;

                    // 詳細情報検索（typography-14クラス）
                    const detailInfo = item.querySelector('.typography-14.\\!preserve-half-leading');
                    if (detailInfo) {
                        fullText += ' ' + detailInfo.innerText.toLowerCase();
                    }

                    console.log(`[item ${index}] タイトル: "${title}", 詳細: "${detailInfo?.innerText || ''}", 全文: "${fullText}"`);

                    // アバター名（日本語・英語）いずれかに一致するか
                    const matchAvatar = !selectedAvatar || avatarKeywords.some(v => fullText.includes(v));
                    
                    // キーワード検索（アバター選択時も含む）
                    const matchKeyword = !keyword || fullText.includes(keyword);
                    
                    // 検索条件の判定を改善
                    let isMatch = false;
                    if (selectedAvatar && keyword) {
                        // アバター選択 + キーワード入力: 両方に一致
                        isMatch = matchAvatar && matchKeyword;
                    } else if (selectedAvatar && !keyword) {
                        // アバター選択 + キーワード未入力: アバター名のみに一致
                        isMatch = matchAvatar;
                    } else if (!selectedAvatar && keyword) {
                        // アバター未選択 + キーワード入力: キーワードのみに一致
                        isMatch = matchKeyword;
                    } else {
                        // 両方未選択: すべて表示
                        isMatch = true;
                    }

                    console.log(`[item ${index}] マッチ結果:`, { matchAvatar, matchKeyword, isMatch, selectedAvatar, keyword });

                    if (isMatch) {
                        item.style.display = '';
                        console.log(`[item ${index}] タイトル/詳細でヒット - 表示`);
                        continue; // 次のアイテムへ
                    }

                    // タイトルと詳細情報でヒットしない場合は、typography-14 !preserve-half-leadingクラスから検索
                    const typographyElements = item.querySelectorAll('.typography-14.\\!preserve-half-leading');
                    if (typographyElements.length > 0) {
                        console.log(`[item ${index}] typography-14要素を発見:`, typographyElements.length, '個');
                        
                        let isMatchInTypography = false;
                        
                        // 各typography要素を順次チェック
                        for (let typoIndex = 0; typoIndex < typographyElements.length; typoIndex++) {
                            const typoElement = typographyElements[typoIndex];
                            const typoText = typoElement.innerText.toLowerCase();
                            
                            console.log(`[item ${index}] typography要素${typoIndex + 1}:`, typoText.substring(0, 100) + '...');
                            
                            const matchAvatarInTypography = !selectedAvatar || avatarKeywords.some(v => typoText.includes(v));
                            const matchKeywordInTypography = !keyword || typoText.includes(keyword);
                            
                            let isMatchInThisTypo = false;
                            if (selectedAvatar && keyword) {
                                // アバター選択 + キーワード入力: 両方に一致
                                isMatchInThisTypo = matchAvatarInTypography && matchKeywordInTypography;
                            } else if (selectedAvatar && !keyword) {
                                // アバター選択 + キーワード未入力: アバター名のみに一致
                                isMatchInThisTypo = matchAvatarInTypography;
                            } else if (!selectedAvatar && keyword) {
                                // アバター未選択 + キーワード入力: キーワードのみに一致
                                isMatchInThisTypo = matchKeywordInTypography;
                            } else {
                                // 両方未選択: すべて表示
                                isMatchInThisTypo = true;
                            }
                            
                            console.log(`[item ${index}] typography要素${typoIndex + 1}のマッチ結果:`, { 
                                matchAvatarInTypography, 
                                matchKeywordInTypography, 
                                isMatchInThisTypo 
                            });
                            
                            if (isMatchInThisTypo) {
                                isMatchInTypography = true;
                                console.log(`[item ${index}] typography要素${typoIndex + 1}でヒット`);
                                break; // 一つでもヒットすれば十分
                            }
                        }
                        
                        if (isMatchInTypography) {
                            item.style.display = '';
                            console.log(`[item ${index}] typography-14でヒット - 表示`);
                            continue; // 次のアイテムへ
                        }
                    }

                    // typography-14でもヒットしない場合は、mt-16クラスから検索
                    const headerInfo = item.querySelector('div.mt-16');
                    if (headerInfo) {
                        const headerText = headerInfo.innerText.toLowerCase();
                        const matchAvatarInHeader = !selectedAvatar || avatarKeywords.some(v => headerText.includes(v));
                        
                        // キーワード検索（アバター選択時も含む）
                        const matchKeywordInHeader = !keyword || headerText.includes(keyword);
                        
                        let isMatchInHeader = false;
                        if (selectedAvatar && keyword) {
                            // アバター選択 + キーワード入力: 両方に一致
                            isMatchInHeader = matchAvatarInHeader && matchKeywordInHeader;
                        } else if (selectedAvatar && !keyword) {
                            // アバター選択 + キーワード未入力: アバター名のみに一致
                            isMatchInHeader = matchAvatarInHeader;
                        } else if (!selectedAvatar && keyword) {
                            // アバター未選択 + キーワード入力: キーワードのみに一致
                            isMatchInHeader = matchKeywordInHeader;
                        } else {
                            // 両方未選択: すべて表示
                            isMatchInHeader = true;
                        }
                        
                        console.log(`[item ${index}] ヘッダー検索:`, { headerText, matchAvatarInHeader, matchKeywordInHeader, isMatchInHeader, selectedAvatar, keyword });
                        
                        if (isMatchInHeader) {
                            item.style.display = '';
                            console.log(`[item ${index}] ヘッダーでヒット - 表示`);
                            continue; // 次のアイテムへ
                        }
                    }

                    // ヘッダーでもヒットしない場合は、no-underlineクラスのURL先から検索
                    const link = item.querySelector('a.no-underline');
                    if (link && link.href) {
                        console.log(`[item ${index}] ヘッダーでヒットせず、fetch実行:`, link.href);
                        
                        if (isConditionChanged && !lastFetchUrls.has(link.href)) {
                            // 最後の手段としてfetchを実行
                            lastFetchUrls.add(link.href);
                            fetchInProgress++;
                            globalLoading.style.display = '';
                            
                            // fetch開始前に一旦非表示にする
                            item.style.display = 'none';
                            
                            console.log(`[item ${index}] fetch開始:`, link.href);
                            
                            try {
                                // v0.1の成功パターン: chrome.runtime.sendMessageを使用
                                chrome.runtime.sendMessage({
                                    type: 'fetchHtml',
                                    url: link.href
                                }, function(response) {
                                    fetchInProgress--;
                                    if (fetchInProgress <= 0) {
                                        globalLoading.style.display = 'none';
                                    }
                                    
                                    // ロード中インジケータを削除
                                    const loadingElem = item.querySelector('.booth-loading-indicator');
                                    if (loadingElem) loadingElem.remove();
                                    
                                    if (!response || !response.html) {
                                        item.style.display = 'none';
                                        return;
                                    }
                                    
                                    // v0.1と同じHTML解析ロジック
                                    const parser = new DOMParser();
                                    const doc = parser.parseFromString(response.html, 'text/html');
                                    
                                    // grid.desktop:gap-40.mobile:gap-24親要素を優先的に検索
                                    let allText = '';
                                    const gridElem = doc.querySelector('.grid.desktop\\:gap-40.mobile\\:gap-24');
                                    if (gridElem) {
                                        allText = gridElem.innerText.toLowerCase();
                                    } else {
                                        const targetElem = doc.querySelector('.autolink.break-words.typography-16.whitespace-pre-line')
                                            || doc.querySelector('.break-words.js-autolink.\\!m-0.\\!p-0.whitespace-pre-line.typography-14.desktop\\:typography-16');
                                        if (targetElem && targetElem.parentElement) {
                                            allText = targetElem.parentElement.innerText.toLowerCase();
                                        } else if (targetElem) {
                                            allText = targetElem.innerText.toLowerCase();
                                        }
                                    }
                                    
                                    console.log(`[item ${index}] fetch後の検索テキスト（v0.1と同じ解析）:`, allText);
                                    
                                    // アバターキーワードの詳細ログ
                                    if (selectedAvatar) {
                                        console.log(`[item ${index}] 選択されたアバター: "${selectedAvatar}"`);
                                        console.log(`[item ${index}] アバターキーワード:`, avatarKeywords);
                                        const avatarMatches = avatarKeywords.map(v => ({
                                            keyword: v,
                                            found: allText.includes(v),
                                            position: allText.indexOf(v)
                                        }));
                                        console.log(`[item ${index}] アバターキーワードの一致詳細:`, avatarMatches);
                                    }
                                    
                                    // キーワードの詳細ログ
                                    if (keyword) {
                                        console.log(`[item ${index}] 入力されたキーワード: "${keyword}"`);
                                        const keywordFound = allText.includes(keyword);
                                        const keywordPosition = allText.indexOf(keyword);
                                        console.log(`[item ${index}] キーワードの一致詳細:`, { keyword, found: keywordFound, position: keywordPosition });
                                    }
                                    
                                    // 検索条件の判定をより厳密に実行
                                    const matchAvatarSub = !selectedAvatar || avatarKeywords.some(v => allText.includes(v));
                                    const matchKeywordSub = !keyword || allText.includes(keyword);
                                    
                                    console.log(`[item ${index}] 基本一致判定:`, { 
                                        selectedAvatar: !!selectedAvatar, 
                                        keyword: !!keyword,
                                        matchAvatarSub, 
                                        matchKeywordSub,
                                        avatarKeywords: selectedAvatar ? avatarKeywords : 'なし',
                                        searchKeyword: keyword || 'なし'
                                    });
                                    
                                    // 検索条件の組み合わせによる最終判定
                                    let isMatchSub = false;
                                    if (selectedAvatar && keyword) {
                                        // アバター選択 + キーワード入力: 両方に一致する必要
                                        isMatchSub = matchAvatarSub && matchKeywordSub;
                                        console.log(`[item ${index}] アバター選択+キーワード入力: 両方一致が必要`, { matchAvatarSub, matchKeywordSub, isMatchSub });
                                    } else if (selectedAvatar && !keyword) {
                                        // アバター選択 + キーワード未入力: アバター名のみに一致
                                        isMatchSub = matchAvatarSub;
                                        console.log(`[item ${index}] アバター選択のみ: アバター名一致が必要`, { matchAvatarSub, isMatchSub });
                                    } else if (!selectedAvatar && keyword) {
                                        // アバター未選択 + キーワード入力: キーワードのみに一致
                                        isMatchSub = matchKeywordSub;
                                        console.log(`[item ${index}] キーワード入力のみ: キーワード一致が必要`, { matchKeywordSub, isMatchSub });
                                    } else {
                                        // 両方未選択: すべて表示
                                        isMatchSub = true;
                                        console.log(`[item ${index}] 両方未選択: すべて表示`, { isMatchSub });
                                    }
                                    
                                    console.log(`[item ${index}] fetch後のマッチ結果:`, { matchAvatarSub, matchKeywordSub, isMatchSub, selectedAvatar, keyword });
                                    
                                    // 確実に表示/非表示を設定（fetch後の最終判定）
                                    if (isMatchSub) {
                                        item.style.display = '';
                                        console.log(`[item ${index}] fetch後の表示状態: 表示（一致）`);
                                    } else {
                                        item.style.display = 'none';
                                        console.log(`[item ${index}] fetch後の表示状態: 非表示（不一致）`);
                                    }
                                    
                                    // デバッグ用：表示されているアイテムの確認
                                    if (isMatchSub) {
                                        console.log(`[item ${index}] 表示されるアイテムの詳細:`, {
                                            title: title,
                                            hasAvatarMatch: selectedAvatar ? matchAvatarSub : 'N/A',
                                            hasKeywordMatch: keyword ? matchKeywordSub : 'N/A',
                                            finalDecision: '表示'
                                        });
                                    }
                                });
                                
                                // ロード中インジケータを追加
                                const loadingIndicator = document.createElement('div');
                                loadingIndicator.className = 'booth-loading-indicator';
                                loadingIndicator.textContent = '読み込み中...';
                                loadingIndicator.style.cssText = `
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%, -50%);
                                    background: rgba(0, 0, 0, 0.8);
                                    color: white;
                                    padding: 8px 16px;
                                    border-radius: 4px;
                                    font-size: 12px;
                                    z-index: 1000;
                                `;
                                item.style.position = 'relative';
                                item.appendChild(loadingIndicator);
                                
                            } catch (error) {
                                console.error(`[item ${index}] chrome.runtime.sendMessageエラー:`, error);
                                fetchInProgress--;
                                if (fetchInProgress <= 0) {
                                    globalLoading.style.display = 'none';
                                }
                                item.style.display = 'none';
                                continue; // 次のアイテムへ
                            }
                        } else if (!isConditionChanged) {
                            // 検索条件が変わっていない場合はfetchしない
                            item.style.display = 'none';
                        }
                    } else {
                        console.log(`[item ${index}] no-underlineリンクなし - 非表示`);
                        item.style.display = 'none';
                    }
                    
                    console.log(`[item ${index}] 処理完了`);
                }
                
                console.log('すべてのアイテムの処理が完了しました');
            };
            
            // 非同期処理を開始
            processItemsSequentially();
        }

        // イベント紐付け
        searchBtn.addEventListener('click', filterItems);

        // 検索ボックス入力時にプルダウンを「すべて」に戻す
        searchBox.addEventListener('input', () => {
            if (searchBox.value !== '') {
                dropdown.value = '';
            }
        });

        // プルダウン選択時にキーワード検索を制御
        dropdown.addEventListener('change', () => {
            if (dropdown.value !== '') {
                // アバターが選択されている場合
                searchBox.placeholder = 'アバター名とキーワードの両方に一致するアイテムを検索';
                searchBox.disabled = false; // 検索ボックスを有効化
                searchBox.style.opacity = '1'; // 視覚的に有効化
                searchBox.style.cursor = 'text';
            } else {
                // 「すべて」が選択されている場合
                searchBox.placeholder = 'アバター名で検索';
                searchBox.disabled = false; // 検索ボックスを有効化
                searchBox.style.opacity = '1'; // 視覚的に有効化
                searchBox.style.cursor = 'text';
            }
        });
    }
})();
