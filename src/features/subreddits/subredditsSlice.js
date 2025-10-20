import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTopic: null,
  topics: [
    "r/AskReddit",
    "r/pettyrevenge",
    "r/ProRevenge",
    "r/ihadastroke",
    "r/programming",
    "r/ProgrammerHumor"
  ]
};

/**
  For use in a call to the redux `dispatch()` function. Adds the given topic
  within the list of topics.

  @param {string} topic
  @returns {{
    type: string,
    payload: string
  }}
*/
export const addTopic = (topic) => ({
  type: "subreddits/addTopic",
  payload: topic
});

/**
  For use in a call to the redux `dispatch()` function. Removes the topic with
  the given name.

  @param {string} topic
  @returns {{
    type: string,
    payload: string
  }}
*/
export const removeTopic = (topic) => ({
  type: "subreddits/removeTopic",
  payload: topic
});

/**
  For use in a call to the redux `dispatch()` function. Sets the currently
  selected topic to the given topic.

  @param {string} topic
  @returns {{
    type: string,
    payload: string
  }}
*/
export const selectTopic = (topic) => ({
  type: "subreddits/selectTopic",
  payload: topic
})

/**
  A selector to be used with the redux `useSelector()` hook. Selects all
  topics within the topic list.
*/
export const getTopics = (state) => state.subreddits.topics;

/**
  A selector to be used with the redux `useSelector()` hook. Selects the
  currently selected topic.
*/
export const getSelectedTopic = (state) => state.subreddits.selectedTopic;

export const subredditsSlice = createSlice({
  name: "subreddits",
  initialState,
  reducers: {
    /**
      Action defiinition for `addTopic()`.

      @param {Object} state
      @param {{
        payload: string;
      }} action
    */
    addTopic: (state, { payload }) => {
      const repeatIdx = state.topics.findIndex(query => query ===
        payload);

      if (repeatIdx !== -1) {
        state.topics.splice(repeatIdx, 1);
        state.topics.push(payload);
      } else {
        state.topics.push(payload);
      }
    },

    /**
      Action defiinition for `removeTopic()`.

      @param {Object} state
      @param {{
        payload: string;
      }} action
    */
    removeTopic: (state, { payload }) => {
      const idx = state.topics.findIndex(query => query === payload);

      if (idx !== -1) {
        state.topics.splice(idx, 1);
      }
    },

    /**
      Action defiinition for `selectTopic()`.

      @param {Object} state
      @param {{
        payload: string;
      }} action
    */
    selectTopic: (state, { payload }) => {
      state.selectedTopic = payload
    }
  }
});

export default subredditsSlice.reducer;
