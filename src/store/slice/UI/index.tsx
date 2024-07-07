import { localStorageName } from '@/config';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

let localStorageState;
if (typeof window !== 'undefined') {
  localStorageState = localStorage.getItem(localStorageName);
}

type UIPayload = {
  theme: 'light' | 'dark' | 'system';
  isSideBarOpen: boolean;
};

interface UIState {
  UI: UIPayload;
}

const initialState: UIState = localStorageState
  ? {
      UI: { ...JSON.parse(localStorageState) }
    }
  : {
      UI: {
        isSideBarOpen: true
      }
    };

const UIServiceSlice = createSlice({
  name: 'UIService',
  initialState,
  reducers: {
    updateUI: (state, action: PayloadAction<Partial<UIPayload>>) => {
      if (state.UI) {
        state.UI = { ...state.UI, ...action.payload };
        localStorage.setItem(localStorageName, JSON.stringify(state.UI));
      }
    }
  }
});

export const { updateUI } = UIServiceSlice.actions;

export default UIServiceSlice.reducer;
