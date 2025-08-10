module.exports = {
  // テスト環境
  testEnvironment: 'jsdom',
  
  // テストファイルのパターン
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],
  
  // カバレッジレポート
  collectCoverageFrom: [
    'versions/**/*.js',
    'src/**/*.js',
    '!**/node_modules/**'
  ],
  
  // テストのタイムアウト
  testTimeout: 10000,
  
  // セットアップファイル
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};
