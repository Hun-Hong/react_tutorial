import { useReducer } from "react";
import type { Memo, MemoState, MemoAction } from "./MemoTypes";

// id: string;
//   title: string;
//   content: string;
//   category: string;
//   isFavorite: boolean;
//   createdAt: Date;
//   updatedAt: Date;

// export interface MemoState {
//   memos: Memo[];
//   selectedMemo: Memo | null;
//   searchTerm: string;
//   selectedCategory: string;
//   categories: string[];
// }

function memoReducer(state: MemoState, action: MemoAction) {
  switch (action.type) {
    case 'add': {
      return {
        ...state,
        memos: [...state.memos,
        {
          id: Date.now(),
          title: action.title,
          content: action.content,
          category: action.category,
          isFavorite: false,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }]
      }
    }
    case 'modify': {
      return {
        ...state,
        memos: state.memos.map((memo) =>
          action.id === memo.id ?
            {
              ...memo,
              title: action.title,
              content: action.content,
              category: action.category,
              updatedAt: Date.now()
            } :
            memo)
      }
    }
    case 'delete': {
      return {
        ...state,
        memos: state.memos.filter((memo) =>
          memo.id !== action.id
        )
      }
    }
    case 'favorite': {
      return {
        ...state,
        memos: state.memos.map((memo) =>
          memo.id === action.id ?
            {
              ...memo,
              isFavorite: !memo.isFavorite
            } :
            memo)
      }
    }
    case 'filter': {
      return {
        ...state,
        selectedCategory: action.category
      }
    }
    case 'preview': {
      return {
        ...state,
        selectedMemo: action.id
      }
    }
    case 'search': {
      return {
        ...state,
        searchTerm: action.searchTerm
      }
    }
    default:
      return state
  }
}

function MemoProvider({})