import { combineReducers } from '@reduxjs/toolkit';
import UIServiceReducer from './slice/UI';

const rootReducer = combineReducers({
  UIService: UIServiceReducer
  // Add other feature reducers here
});

export default rootReducer;
