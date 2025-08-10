// content.js のテスト

describe('Content Script', () => {
  beforeEach(() => {
    // 各テスト前にモックをリセット
    jest.clearAllMocks();
  });

  test('should have chrome runtime available', () => {
    expect(chrome.runtime).toBeDefined();
    expect(chrome.runtime.sendMessage).toBeDefined();
  });

  test('should have chrome storage available', () => {
    expect(chrome.storage).toBeDefined();
    expect(chrome.storage.local).toBeDefined();
  });

  test('should have DOM methods available', () => {
    expect(document.createElement).toBeDefined();
    expect(document.getElementById).toBeDefined();
    expect(document.querySelector).toBeDefined();
  });

  test('should have window methods available', () => {
    expect(window.addEventListener).toBeDefined();
    expect(window.postMessage).toBeDefined();
  });
});
