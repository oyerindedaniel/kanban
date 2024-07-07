import { combineReducers } from '@reduxjs/toolkit';
import GlobalServiceReducer from './slice/globalSlice';
import UIServiceReducer from './slice/uiSlice';

const rootReducer = combineReducers({
  UIService: UIServiceReducer,
  GlobalService: GlobalServiceReducer
  // Add other feature reducers here
});

export default rootReducer;
