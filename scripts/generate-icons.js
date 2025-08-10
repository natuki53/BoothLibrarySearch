#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// アイコンサイズの配列
const sizes = [16, 32, 48, 128];

// アイコン生成用のSVGテンプレート
function generateSVG(size) {
  const padding = Math.floor(size * 0.1);
  const innerSize = size - (padding * 2);
  
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#4A90E2"/>
  <rect x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}" fill="white" rx="2"/>
  <text x="${size/2}" y="${size/2 + size/8}" font-family="Arial, sans-serif" font-size="${Math.floor(size/3)}" 
        text-anchor="middle" fill="#4A90E2" font-weight="bold">B</text>
</svg>`;
}

// アイコンを生成
function generateIcons() {
  const iconsDir = path.join(__dirname, '..', 'versions', 'v0.1', 'icons');
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }
  
  sizes.forEach(size => {
    const svg = generateSVG(size);
    const filePath = path.join(iconsDir, `icon-${size}.png`);
    
    // SVGをPNGに変換する代わりに、SVGファイルとして保存
    const svgPath = path.join(iconsDir, `icon-${size}.svg`);
    fs.writeFileSync(svgPath, svg);
    console.log(`✅ アイコン生成完了: icon-${size}.svg`);
  });
  
  console.log('\n📁 アイコンファイルが生成されました:');
  console.log(`   場所: ${iconsDir}`);
  console.log('\n⚠️  注意: SVGファイルをPNGに変換するには、');
  console.log('   画像編集ソフトやオンラインツールを使用してください。');
}

// 実行
generateIcons();
