#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const version = process.argv[2] || 'v0.1';
const buildDir = path.join(__dirname, '..', 'dist', version);

console.log(`🔄 Chrome拡張機能の再読み込みヘルパー: ${version}`);

// ビルドディレクトリの存在確認
if (!fs.existsSync(buildDir)) {
  console.error(`❌ ビルドディレクトリが見つかりません: ${buildDir}`);
  console.log('💡 まず「npm run dev:build:v0.1」を実行してください');
  process.exit(1);
}

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

// Chrome拡張機能ページを開く
function openChromeExtensions() {
  const platform = process.platform;
  let command;
  
  if (platform === 'darwin') {
    // macOS
    command = 'open -a "Google Chrome" "chrome://extensions/"';
  } else if (platform === 'win32') {
    // Windows
    command = 'start chrome "chrome://extensions/"';
  } else {
    // Linux
    command = 'google-chrome "chrome://extensions/"';
  }
  
  console.log('🌐 Chrome拡張機能ページを開いています...');
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log('⚠️  Chromeを自動で開けませんでした。手動で開いてください。');
      console.log('💡 ブラウザで chrome://extensions/ にアクセスしてください。');
    } else {
      console.log('✅ Chrome拡張機能ページを開きました');
    }
    
    showReloadInstructions();
  });
}

// メイン処理
console.log(`📁 ビルドディレクトリ: ${buildDir}`);
console.log('✅ ビルドディレクトリが存在します');

// Chrome拡張機能ページを開く
openChromeExtensions();

console.log('\n💡 ヒント:');
console.log('- ファイルを変更した後は「npm run dev:build:v0.1」を実行');
console.log('- このスクリプトは「npm run reload:v0.1」で実行可能');
console.log('- 開発中は「npm run dev:build:v0.1」を実行してファイル監視を開始');
