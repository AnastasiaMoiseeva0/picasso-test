import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postApi } from '../../shared/api';

const rootReducer = combineReducers({
  [postApi.reducerPath]: postApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMidleware) =>
    getDefaultMidleware().concat(postApi.middleware),
});
