import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Board } from '@/types';

type globalService = {
  boards: Array<Board> | null;
  activeBoard: Board | null;
};

const initialState: globalService = {
  boards: null,
  activeBoard: null
};

type GlobalStatePayload<T extends keyof globalService> = {
  dataKey: T;
  data: globalService[T];
};

const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setGlobalState: <T extends keyof globalService>(
      state: globalService,
      action: PayloadAction<GlobalStatePayload<T>>
    ) => {
      const { dataKey, data } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state[dataKey] = data;
    }
  }
});

export const { setGlobalState } = globalStateSlice.actions;

export default globalStateSlice.reducer;
