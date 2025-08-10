// ビルドスクリプトのテスト

const fs = require('fs');
const path = require('path');

describe('Build Script', () => {
  const versionsDir = path.join(__dirname, '..', 'versions');
  const distDir = path.join(__dirname, '..', 'dist');

  test('should have versions directory', () => {
    expect(fs.existsSync(versionsDir)).toBe(true);
  });

  test('should have v0.1 directory', () => {
    const v01Dir = path.join(versionsDir, 'v0.1');
    expect(fs.existsSync(v01Dir)).toBe(true);
  });

  test('should have required files in v0.1', () => {
    const v01Dir = path.join(versionsDir, 'v0.1');
    const requiredFiles = [
      'manifest.json',
      'background.js',
      'content.js',
      'popup.html',
      'popup.js',
      'styles.css',
      'icon.png'
    ];

    requiredFiles.forEach(file => {
      const filePath = path.join(v01Dir, file);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  test('should have dist directory after build', () => {
    // ビルドが実行されている場合
    if (fs.existsSync(distDir)) {
      const v01DistDir = path.join(distDir, 'v0.1');
      expect(fs.existsSync(v01DistDir)).toBe(true);
    }
  });
});
