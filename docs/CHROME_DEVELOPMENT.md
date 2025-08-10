# Chrome拡張機能の開発手順

## 🚀 開発環境のセットアップ

### 1. 開発用ビルドの開始
```bash
npm run dev:build:v0.1
```

これにより、`versions/v0.1/` のファイルが `dist/v0.1/` にコピーされ、ファイル変更を監視します。

### 2. Chrome拡張機能の読み込み

1. Chrome で `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `dist/v0.1/` フォルダを選択

### 3. 開発サイクル

```
1. コードを編集 (versions/v0.1/ 内)
2. ファイルを保存
3. 自動で dist/v0.1/ にコピー
4. Chrome拡張機能を再読み込み
5. 動作確認
6. 1に戻る
```

## 🔄 拡張機能の再読み込み方法

### 方法1: 拡張機能ページから
- `chrome://extensions/` で該当拡張機能の「再読み込み」ボタンをクリック

### 方法2: キーボードショートカット
- 拡張機能ページで拡張機能にフォーカスして `R` キーを押す

### 方法3: 右クリックメニュー
- 拡張機能アイコンを右クリック → 「拡張機能を再読み込み」

## 🧪 テストしながら開発

### 自動テスト実行
```bash
npm run dev:test
```

### 手動テスト実行
```bash
npm test
```

## 📁 ファイル構造

```
versions/v0.1/          # 開発用ソースコード
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── styles.css
└── icon.png

dist/v0.1/              # Chrome用ビルドファイル
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── styles.css
└── icon.png
```

## 🐛 デバッグ方法

### Background Script のデバッグ
1. `chrome://extensions/` で拡張機能の「詳細」をクリック
2. 「バックグラウンドページを検証」をクリック
3. DevTools が開き、コンソールログやブレークポイントを設定可能

### Content Script のデバッグ
1. 拡張機能が動作するページで右クリック → 「検証」
2. DevTools のコンソールでログを確認
3. Sources タブでブレークポイントを設定可能

### Popup のデバッグ
1. 拡張機能アイコンを右クリック → 「検証」
2. ポップアップ用のDevToolsが開く

## ⚠️ 注意事項

- `dist/` フォルダは自動生成されるため、直接編集しない
- ソースコードは必ず `versions/v0.1/` 内で編集
- ファイル保存後、Chrome拡張機能の再読み込みが必要
- 開発中は `npm run dev:build:v0.1` を継続実行

## 🎯 次のステップ

1. 開発用ビルドを開始
2. Chrome拡張機能を読み込み
3. コードを編集・保存
4. 自動ビルド確認
5. 拡張機能を再読み込み
6. 動作確認
7. 必要に応じてテスト実行
