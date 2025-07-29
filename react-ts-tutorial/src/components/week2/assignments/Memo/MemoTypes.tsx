export interface Memo {
  id: string;
  title: string;
  content: string;
  category: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemoState {
  memos: Memo[];
  selectedMemo: Memo | null;
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
}

export type MemoAction =
  | { type: 'add', title: string, content: string, category: string }
  | { type: 'modify', id: string, title: string, content: string, category: string }
  | { type: 'delete', id: string }
  | { type: 'search', searchTerm: string }
  | { type: 'filter', category: string }
  | { type: 'favorite', id: string }
  | { type: 'preview', id: string }

