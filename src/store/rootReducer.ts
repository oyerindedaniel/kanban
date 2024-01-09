import { combineReducers } from '@reduxjs/toolkit';
import UIServiceReducer from './slice/UI';
import GlobalServiceReducer from './slice/Global';

const rootReducer = combineReducers({
  UIService: UIServiceReducer,
  GlobalService: GlobalServiceReducer
  // Add other feature reducers here
});

export default rootReducer;
