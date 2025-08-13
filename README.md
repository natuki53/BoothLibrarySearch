# 🎭 Booth Library Search for VRChat

VRChatでBoothのライブラリを検索するための**ブラウザ拡張機能**です。

[![Chrome](https://img.shields.io/badge/Chrome-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chrome.google.com/)
[![Edge](https://img.shields.io/badge/Edge-0078D7?style=for-the-badge&logo=microsoft-edge&logoColor=white)](https://www.microsoft.com/edge/)
[![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=firefox-browser&logoColor=white)](https://www.mozilla.org/firefox/)

## ✨ 主な機能

- **🎯 アバター選択による絞り込み**
  - 「マヌカ」「ミルフィ」などアバターから選択するだけ！
  - 対応している衣装や髪型などを一発で見つけられます

- **🌐 多言語対応**
  - 日本語・英語の両対応
  - 「ショコラ」も「chocolat」も同じ扱いで検索！

- **🔍 キーワード検索**
  - 「アクセサリー」など自由に入力して検索
  - お気に入り機能でよく使うアイテムを保存

## 🚀 インストール方法

### 1. ダウンロード
- [GitHubリリース](https://github.com/natuki53/BoothLibrarySearch/releases)から最新版をダウンロード
- または、このリポジトリをクローン

### 2. 拡張機能の追加
1. ダウンロードしたZipファイルを展開
2. ブラウザで `chrome://extensions/` を開く
3. 「デベロッパーモード」を有効にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. 展開したフォルダを選択

## 📖 使用方法

1. **VRChatのアバター選択画面を開く**
2. **拡張機能のアイコンをクリック**
3. **アバターを選択またはキーワードを入力**
4. **結果からお気に入りに追加または選択**

> 💡 **注意**: アバター名で判別しているため、"フルセットの個別購入"や"共通素体"は判別できません

## 🏗️ ファイル構成

### 📁 バージョン別ファイル
```
versions/
├── v0.1/          # 初期リリース
├── v0.2/          # 検索精度向上
└── v0.3/          # 高速化
```

各バージョンディレクトリには以下が含まれます：
- `manifest.json`     - 拡張機能の設定ファイル
- `popup.html`        - ポップアップ画面
- `popup.js`          - ポップアップのロジック
- `content.js`        - ページに注入されるスクリプト
- `background.js`     - バックグラウンドスクリプト
- `styles.css`        - スタイルシート
- `icon.png`          - 拡張機能のアイコン

### 🛠️ 開発用ファイル
- `src/`              - 共通ソースコード
- `scripts/`          - ビルドスクリプト
- `docs/`             - ドキュメント
- `tests/`            - テストファイル

## 🧪 動作環境

- ✅ Chrome
- ✅ Edge  
- ✅ Firefox

## 🔧 開発

このプロジェクトはバージョン別の開発をサポートしています。

### バージョン別開発

```bash
# 特定バージョンをビルド
npm run build:v0.1

# 新しいバージョンを作成
mkdir versions/v0.4
cp -r versions/v0.1/* versions/v0.4/
```

詳細な開発ガイドは [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) を参照してください。

## 📝 更新履歴

- **2025/7/7** - v0.1 ベータ版リリース
- **2025/8/11** - v0.2 検索精度の向上
- **最新版** - v0.3 高速化

## 📋 利用規約

- **禁止事項**: ありません
- **改変**: プログラムを改変して使用していただいても問題ありません
- **非公式ツール**: この拡張機能は非公式ツールです
- **自己責任**: 将来的に正常に動作しなくなる可能性があります

> 💬 **フィードバック**: 変更した場所などDMで教えてくれると喜びます！

## 🔗 リンク

- **BOOTH**: [もふまじっくもふまじっく](https://mofumagic.booth.pm/items/7150269)
- **GitHub**: [natuki53/BoothLibrarySearch](https://github.com/natuki53/BoothLibrarySearch)

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

---

<div align="center">

**🎉 このツールがお役に立てれば幸いです！**

VRChatでBoothのライブラリを快適に検索しましょう ✨

</div>
