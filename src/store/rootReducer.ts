import { combineReducers } from '@reduxjs/toolkit';
import GlobalServiceReducer from './slice/global';
import UIServiceReducer from './slice/ui';

const rootReducer = combineReducers({
  UIService: UIServiceReducer,
  GlobalService: GlobalServiceReducer
  // Add other feature reducers here
});

export default rootReducer;
