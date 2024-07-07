import { ColumnAllIncludes } from '@/types';
import { Board } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StateType = {
  board: Board | null;
  columns: ColumnAllIncludes[];
};

const initialState: StateType = {
  board: null,
  columns: []
};

const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<Board>) => {
      state.board = action.payload;
    },
    setColumns: (state, action: PayloadAction<ColumnAllIncludes[]>) => {
      state.columns = action.payload;
    },
    clearBoard: (state) => {
      state.board = null;
    },
    clearColumns: (state) => {
      state.columns = [];
    }
  }
});

export const { setBoard, setColumns, clearBoard, clearColumns } = globalStateSlice.actions;

export default globalStateSlice.reducer;
