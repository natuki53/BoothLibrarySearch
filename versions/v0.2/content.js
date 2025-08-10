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
            const keyword = searchBox.value.toLowerCase();
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

            items.forEach(item => {
                let title = item.querySelector('.text-text-default.font-bold')?.innerText.toLowerCase() || "";
                let fullText = title;

                // アバター名（日本語・英語）いずれかに一致するか
                const matchAvatar = !selectedAvatar || avatarKeywords.some(v => fullText.includes(v));
                const matchKeyword = !keyword || fullText.includes(keyword);
                const isMatch = selectedAvatar ? (matchAvatar && matchKeyword) : matchKeyword;

                if (isMatch) {
                    item.style.display = '';
                } else {
                    // タイトルでヒットしない場合はno-underlineクラスのURL先のmain-info-columnからも検索
                    const link = item.querySelector('a.no-underline');
                    if (link && link.href) {
                        // no-underlineリンクのテキストやhrefに目当ての文字列が含まれていればfetchしない
                        const linkText = link.innerText?.toLowerCase() || '';
                        const linkHref = link.href?.toLowerCase() || '';
                        const matchAvatarInLink = !selectedAvatar || avatarKeywords.some(v => linkText.includes(v) || linkHref.includes(v));
                        const matchKeywordInLink = !keyword || linkText.includes(keyword) || linkHref.includes(keyword);
                        const isMatchInLink = selectedAvatar ? (matchAvatarInLink && matchKeywordInLink) : matchKeywordInLink;
                        if (isMatchInLink) {
                            item.style.display = '';
                        } else if (isConditionChanged && !lastFetchUrls.has(link.href)) {
                            lastFetchUrls.add(link.href);
                            fetchInProgress++;
                            globalLoading.style.display = '';
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
                                console.log('[fetch debug] url:', link.href, '\n[fetch debug] 親要素テキスト:', allText);
                                const matchAvatarSub = !selectedAvatar || avatarKeywords.some(v => allText.includes(v));
                                const matchKeywordSub = !keyword || allText.includes(keyword);
                                const isMatchSub = selectedAvatar ? (matchAvatarSub && matchKeywordSub) : matchKeywordSub;
                                item.style.display = isMatchSub ? '' : 'none';
                            });
                            // 一旦非表示にしておく
                            item.style.display = 'none';
                        } else if (!isConditionChanged) {
                            // 検索条件が変わっていない場合はfetchしない
                            item.style.display = 'none';
                        }
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
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
