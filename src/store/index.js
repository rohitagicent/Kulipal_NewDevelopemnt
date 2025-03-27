import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

// Reducers
import authReducer from './authReducer';
// import customerReducer from './customerReducer';
// import vendorReducer from './vendorReducer';

// Configure persistence
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'] // Only persist auth
};

const rootReducer = combineReducers({
  auth: authReducer,
//   customer: customerReducer,
//   vendor: vendorReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
