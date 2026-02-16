import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
  @typedef {{
    author: string;
    dateMade: Date;
    postLink: string;
    subreddit: string;
    heading: string;
    thumbnail: string;
    totalUpvotes: number;
    totalDownvotes: number;
    totalComments: number;
  }} Post
*/

// Note to future self: Use the query string `?raw_json=1` when implementing
// the Reddit API.
//
// Like this:
// https://www.reddit.com/${query}.json?raw_json=1
// https://www.reddit.com/r/${subreddit}/${query}.json?raw_json=1

const initialState = {
  loading: true,
  content: [],
  cache: {}
};

/**
  A selector to be used with the redux `useSelector()` hook. Selects the post
  cache.

  @returns {{
    dateMade: Date
    data: Post[];
  }[]}
*/
export const getPostCache = (state) => state.posts.cache;

/**
  A selector to be used with the redux `useSelector()` hook. Selects all
  posts within the current state.

  @returns {Post[]}
*/
export const getPosts = (state) => state.posts.content;

// TODO: Make `updatePosts()` a thunk.
/**
  For use in a call to the redux `dispatch()` function. Changes the content of
  the current posts.
*/
export const updatePosts = createAsyncThunk(
  "posts/updatePosts", async ({ query, subreddit = "" }, thunkApi) => {
    const uriEncodedQuery = encodeURIComponent(query);
    const baseUrl = `${window.location.origin}/api`;
    const subredditUrl = subreddit && `/r/${subreddit}`;
    const queryUrl = query ?
      `/search/.json?q=${uriEncodedQuery}&type=link&raw_json=1` :
      "\/.json?type=link&raw_json=1";

    const fetchUrl = `${baseUrl}${subredditUrl}${queryUrl}`;
    const cacheKey = `${query}${subreddit && `@${subreddit}`}`;
    const postCache = getPostCache(thunkApi.getState());

    // Attempt to grab data from cache.
    // Note: Date.now() is measured in milliseconds. Therefore, dividing by
    // 3,600,000 will grant the difference in hours.
    if (
      postCache[cacheKey] &&
      (Date.now() - postCache[cacheKey].dateMade) / 3600000 < 3
    ) {
      return {
        data: postCache[cacheKey].data,
        cacheKey
      };
    }

    // If no entry within the cache exists, attempt to fetch the data from Reddit.
    try {
      const postData = await fetch(fetchUrl);
      const postJson = await postData.json();
      const parsedData = postJson.data.children.map(({ data }) => {
        return {
          author: data.author,
          dateMade: new Date(data.created),
          lastEdited: new Date(data.edited),
          postLink: data.url,
          subreddit: data.subreddit,
          heading: data.title,
          thumbnail: data.preview
            && data.preview.images
            && data.preview.images[0].source.url,
          totalUpvotes: data.ups,
          totalDownvotes: Math.round(data.ups / data.upvote_ratio),
          totalComments: data.num_comments
        };
      });

      return {
        data: parsedData,
        cacheKey
      };
    } catch (err) {
      thunkApi.rejectWithValue(err);
    };
  });

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(updatePosts.pending, (state) => {
      state.loading = true;
    })
    .addCase(updatePosts.fulfilled, (state, { payload }) => {
      if (typeof payload === "object") {
        state.content = payload.data;
        state.cache[payload.cacheKey] = {
          data: payload.data,
          dateMade: Date.now()
        };
      }
      state.loading = false;
    })
    .addCase(updatePosts.rejected, (state, { payload }) => {
      console.error(payload);
      state.loading = false;
    });
  }
});

export default postsSlice.reducer;
