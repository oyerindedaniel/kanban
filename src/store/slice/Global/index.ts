import { type Board, type Column, type SubTask, type Task } from '@prisma/client';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type globalService = {
  board: Board | null;
  columns: Array<
    Column & {
      tasks: Array<Task & { subTasks: Array<SubTask> }>;
    }
  > | null;
};

const initialState: globalService = {
  board: null,
  columns: null
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
