#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const version = process.argv[2];

if (!version) {
  console.error('使用方法: node scripts/release.js <version>');
  console.error('例: node scripts/release.js v0.3.0');
  process.exit(1);
}

// バージョン形式の検証
if (!/^v\d+\.\d+(\.\d+)?$/.test(version)) {
  console.error('エラー: バージョンは vX.Y または vX.Y.Z の形式である必要があります');
  console.error('例: v0.3 または v0.3.0');
  process.exit(1);
}

// バージョンディレクトリの存在確認
const versionDir = path.join(__dirname, '..', 'versions', version);
if (!fs.existsSync(versionDir)) {
  console.error(`エラー: バージョン ${version} のディレクトリが存在しません: ${versionDir}`);
  process.exit(1);
}

try {
  console.log(`🚀 リリース ${version} を開始します...`);
  
  // 現在のブランチを確認
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  if (currentBranch !== 'main' && currentBranch !== 'master') {
    console.warn(`⚠️  警告: 現在のブランチは ${currentBranch} です。main/masterブランチでのリリースを推奨します。`);
  }
  
  // 変更があるかチェック
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  if (status.trim()) {
    console.error('エラー: コミットされていない変更があります。先にコミットしてください。');
    process.exit(1);
  }
  
  // 最新のコミットをプル
  console.log('📥 最新の変更をプルしています...');
  execSync('git pull origin ' + currentBranch, { stdio: 'inherit' });
  
  // ビルド
  console.log(`🔨 バージョン ${version} をビルドしています...`);
  execSync(`npm run build:${version}`, { stdio: 'inherit' });
  
  // 変更をコミット
  console.log('💾 ビルド結果をコミットしています...');
  execSync('git add dist/', { stdio: 'inherit' });
  execSync(`git commit -m "Build ${version} for release"`, { stdio: 'inherit' });
  
  // プッシュ
  console.log('📤 変更をプッシュしています...');
  execSync('git push origin ' + currentBranch, { stdio: 'inherit' });
  
  // タグを作成
  console.log(`🏷️  タグ ${version} を作成しています...`);
  execSync(`git tag ${version}`, { stdio: 'inherit' });
  
  // タグをプッシュ
  console.log('📤 タグをプッシュしています...');
  execSync(`git push origin ${version}`, { stdio: 'inherit' });
  
  console.log(`✅ リリース ${version} が完了しました！`);
  console.log(`📦 GitHub Actionsが自動でリリースを作成します`);
  console.log(`🔗 https://github.com/${process.env.GITHUB_REPOSITORY || 'your-repo'}/releases`);
  
} catch (error) {
  console.error('❌ リリース中にエラーが発生しました:', error.message);
  process.exit(1);
}
