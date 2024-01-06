import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production'
//   // Add other middleware and configurations as needed
// });

// const persistor = persistStore(store);

// export { store, persistor };

const store = configureStore({
  reducer: rootReducer
  // Add other middleware and configurations as needed
});

export { store };
