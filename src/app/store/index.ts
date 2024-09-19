import { configureStore } from '@reduxjs/toolkit';

import searchResultSliceReducer from '../../services/search-result-slice';

export const store = configureStore({
  reducer: {
    searchResult: searchResultSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
