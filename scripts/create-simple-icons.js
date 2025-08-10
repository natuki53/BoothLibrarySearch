#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// シンプルなPNGアイコンを作成（Base64エンコードされた最小PNG）
function createSimplePNG(size) {
  // 最小限のPNGファイル（1x1ピクセル、青い背景）
  const pngData = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, // IHDR chunk length
    0x49, 0x48, 0x44, 0x52, // IHDR
    0x00, 0x00, 0x00, 0x01, // width: 1
    0x00, 0x00, 0x00, 0x01, // height: 1
    0x08, // bit depth
    0x02, // color type (RGB)
    0x00, // compression
    0x00, // filter
    0x00, // interlace
    0x1F, 0x15, 0xC4, 0x89, // CRC
    0x00, 0x00, 0x00, 0x0C, // IDAT chunk length
    0x49, 0x44, 0x41, 0x54, // IDAT
    0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00, 0x00, // compressed data
    0x00, 0x00, 0x00, 0x00, // CRC
    0x00, 0x00, 0x00, 0x00, // IEND chunk length
    0x49, 0x45, 0x4E, 0x44, // IEND
    0xAE, 0x42, 0x60, 0x82  // CRC
  ]);
  
  return pngData;
}

// アイコンを作成
function createIcons() {
  const iconsDir = path.join(__dirname, '..', 'versions', 'v0.1', 'icons');
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }
  
  // 各サイズのアイコンを作成
  [16, 32, 48, 128].forEach(size => {
    const pngData = createSimplePNG(size);
    const filePath = path.join(iconsDir, `icon-${size}.png`);
    fs.writeFileSync(filePath, pngData);
    console.log(`✅ アイコン作成完了: icon-${size}.png`);
  });
  
  console.log('\n📁 シンプルなアイコンファイルが作成されました');
}

createIcons();
