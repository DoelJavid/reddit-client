import { createSlice } from "@reduxjs/toolkit";

const MAX_QUERIES = 4;

const initialState = {
  currentQuery: "",
  history: []
};

/**
  For use in a call to the redux `dispatch()` function. Sets the current query
  to the given query and adds the query to the query list.

  @param {string} query
  @returns {{
    type: string,
    payload: string
  }}
*/
export const searchQuery = (query) => ({
  type: "search/searchQuery",
  payload: query
});

/**
  A selector to be used with the redux `useSelector()` hook. Selects all
  queries within search history.
*/
export const getSearchHistory = (state) => state.search.history;

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    /**
      Action defiinition for `addQuery()`.

      @param {Object} state
      @param {{
        payload: string;
      }} action
    */
    searchQuery: (state, { payload }) => {
      state.currentQuery = payload;

      const repeatIdx = state.history.findIndex(
        query => query === payload
      );

      if (repeatIdx !== -1) {
        state.history.splice(repeatIdx, 1);
        state.history.unshift(payload);
      } else {
        state.history.unshift(payload);

        if (state.history > MAX_QUERIES) {
          state.history.pop();
        }
      }
    }
  }
});

export default searchSlice.reducer;
