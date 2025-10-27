import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchReducer from "./features/search/searchSlice.js";
import subredditsReducer from "./features/subreddits/subredditsSlice.js";
import postsReducer from "./features/posts/postsSlice.js";

const rootReducer = combineReducers({
  search: searchReducer,
  subreddits: subredditsReducer,
  posts: postsReducer
});

export function setupStore(preloadedState) {
  return configureStore({
    preloadedState,
    reducer: rootReducer
  });
}
