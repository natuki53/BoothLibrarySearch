#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const version = process.argv[2] || 'v0.1';
const sourceDir = path.join(__dirname, '..', 'versions', version);
const buildDir = path.join(__dirname, '..', 'dist', version);

console.log(`Building version: ${version}`);

// ビルドディレクトリを作成
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// ファイルをコピー
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
    console.log(`Copied: ${source} -> ${dest}`);
  }
}

try {
  copyFiles(sourceDir, buildDir);
  console.log(`Build completed for ${version} in ${buildDir}`);
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
