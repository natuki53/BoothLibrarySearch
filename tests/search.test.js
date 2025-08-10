// 検索機能のテスト

// モックデータ
const mockItems = [
  { id: '1', name: 'VRChat Avatar 1', tags: ['avatar', 'vrchat', 'anime'] },
  { id: '2', name: 'VRChat Avatar 2', tags: ['avatar', 'vrchat', 'realistic'] },
  { id: '3', name: 'VRChat Avatar 3', tags: ['avatar', 'fantasy', 'magic'] },
  { id: '4', name: 'VRChat Avatar 4', tags: ['avatar', 'scifi', 'robot'] }
];

// 検索関数（実際の実装に合わせて調整）
function searchItems(items, searchTerm) {
  if (!searchTerm || searchTerm.trim() === '') {
    return items;
  }
  
  const term = searchTerm.toLowerCase().trim();
  return items.filter(item => 
    item.name.toLowerCase().includes(term) ||
    item.tags.some(tag => tag.toLowerCase().includes(term))
  );
}

// お気に入り機能（実際の実装に合わせて調整）
function addToFavorites(favorites, item) {
  if (!favorites.find(fav => fav.id === item.id)) {
    favorites.push(item);
  }
  return favorites;
}

function removeFromFavorites(favorites, itemId) {
  return favorites.filter(fav => fav.id !== itemId);
}

describe('Search Functionality', () => {
  test('should return all items when search term is empty', () => {
    const result = searchItems(mockItems, '');
    expect(result).toHaveLength(4);
  });

  test('should filter items by name', () => {
    const result = searchItems(mockItems, 'Avatar 1');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('VRChat Avatar 1');
  });

  test('should filter items by tags', () => {
    const result = searchItems(mockItems, 'anime');
    expect(result).toHaveLength(1);
    expect(result[0].tags).toContain('anime');
  });

  test('should handle case insensitive search', () => {
    const result = searchItems(mockItems, 'AVATAR');
    expect(result).toHaveLength(4);
  });

  test('should return empty array for no matches', () => {
    const result = searchItems(mockItems, 'nonexistent');
    expect(result).toHaveLength(0);
  });
});

describe('Favorites Functionality', () => {
  test('should add item to favorites', () => {
    const favorites = [];
    const newItem = { id: '123', name: 'Test Avatar' };
    
    const result = addToFavorites(favorites, newItem);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(newItem);
  });

  test('should not add duplicate items', () => {
    const favorites = [{ id: '123', name: 'Test Avatar' }];
    const duplicateItem = { id: '123', name: 'Test Avatar' };
    
    const result = addToFavorites(favorites, duplicateItem);
    expect(result).toHaveLength(1);
  });

  test('should remove item from favorites', () => {
    const favorites = [
      { id: '123', name: 'Test Avatar 1' },
      { id: '456', name: 'Test Avatar 2' }
    ];
    
    const result = removeFromFavorites(favorites, '123');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('456');
  });
});
