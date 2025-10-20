import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchReducer from "./features/search/searchSlice.js";
import subredditsReducer from "./features/subreddits/subredditsSlice.js";

const rootReducer = combineReducers({
  search: searchReducer,
  subreddits: subredditsReducer
});

export function setupStore(preloadedState) {
  return configureStore({
    preloadedState,
    reducer: rootReducer
  });
}
