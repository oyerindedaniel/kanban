'use client';

import { ColumnAllIncludes } from '@/types';
import { type Board } from '@prisma/client';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: GlobalService = {
  board: null,
  columns: null
};

type GlobalService = {
  board: Board | null;
  columns: Array<ColumnAllIncludes> | null;
};

type GlobalStatePayload<T extends keyof GlobalService> = {
  dataKey: T;
  data: GlobalService[T];
};

const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setGlobalState: <T extends keyof GlobalService>(
      state: GlobalService,
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
