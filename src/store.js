import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchReducer from "./features/search/searchSlice.js";

const rootReducer = combineReducers({
  search: searchReducer
});

export function setupStore(preloadedState) {
  return configureStore({
    preloadedState,
    reducer: rootReducer
  });
}
