#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chokidar = require('fs').watch || require('fs').watch;

const version = process.argv[2] || 'v0.1';
const sourceDir = path.join(__dirname, '..', 'versions', version);
const buildDir = path.join(__dirname, '..', 'dist', version);

console.log(`🚀 開発モード開始: ${version}`);
console.log(`📁 監視中: ${sourceDir}`);
console.log(`📦 出力先: ${buildDir}`);

// Chrome拡張機能の再読み込み手順を表示
function showReloadInstructions() {
  console.log('\n📋 Chrome拡張機能の再読み込み手順:');
  console.log('1. Chromeで chrome://extensions/ を開く');
  console.log('2. 開発者モードを有効にする');
  console.log('3. 「パッケージ化されていない拡張機能を読み込む」をクリック');
  console.log(`4. フォルダ「${buildDir}」を選択`);
  console.log('5. 変更後は拡張機能の「🔄」ボタンをクリックして再読み込み');
  console.log('\n💡 ショートカット: Ctrl+R (Windows/Linux) または Cmd+R (Mac)');
}

// 初期ビルド
function build() {
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  function copyFiles(source, dest) {
    if (fs.statSync(source).isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      const files = fs.readdirSync(source);
      files.forEach(file => {
        copyFiles(path.join(source, file), path.join(dest, file));
      });
    } else {
      fs.copyFileSync(source, dest);
      console.log(`✅ コピー完了: ${path.basename(source)}`);
    }
  }

  try {
    copyFiles(sourceDir, buildDir);
    console.log(`🎉 ビルド完了: ${version} -> ${buildDir}`);
    console.log(`🔄 Chrome拡張機能を再読み込みしてください！`);
    
    // 再読み込み手順を表示
    showReloadInstructions();
    
  } catch (error) {
    console.error('❌ ビルド失敗:', error);
  }
}

// 初期ビルド実行
build();

// ファイル変更監視
console.log('\n👀 ファイル変更を監視中... (Ctrl+C で終了)');

// シンプルなファイル監視（Node.js標準機能）
try {
  const watcher = fs.watch(sourceDir, { recursive: true }, (eventType, filename) => {
    if (filename && !filename.startsWith('.')) {
      console.log(`\n🔄 ファイル変更検出: ${filename}`);
      build();
    }
  });
  
  console.log('✅ ファイル監視開始');
} catch (error) {
  console.log('⚠️  ファイル監視が利用できません。手動でビルドしてください。');
}

// 終了時の処理
process.on('SIGINT', () => {
  console.log('\n👋 開発モードを終了します');
  process.exit(0);
});
