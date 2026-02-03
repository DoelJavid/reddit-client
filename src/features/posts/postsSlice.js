import { createSlice } from "@reduxjs/toolkit";

/**
  @typedef {{
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
  content: [{
      postLink: "https://www.reddit.com/r/godot/comments/1o6hv4b/godot_showcase_material_maker/",
      subreddit: "godot",
      heading: "Godot Showcase - Material Maker",
      thumbnail: "https://external-preview.redd.it/HiAakAPJwDeO9KvBFwWhsj-HD1Q3XS0tvxGwlCn450g.jpeg?auto=webp&s=f9528f737547d0801336b02b793fcc8d94dbc272",
      totalUpvotes: 91,
      totalDownvotes: 1,
      totalComments: 9
    },
    {
      postLink: "https://www.reddit.com/r/godot/comments/1obv796/dev_snapshot_godot_46_dev_2/",
      subreddit: "godot",
      heading: "Dev snapshot: Godot 4.6 dev 2",
      thumbnail: "https://external-preview.redd.it/-2_NbNHEDPoqpblabaLTenq3SNKFWn9nxfnQRcBuUGs.jpeg?auto=webp&s=99a5d1ad4ffae123c0c358d19eb372d5c05937cb",
      totalUpvotes: 205,
      totalDownvotes: 0,
      totalComments: 39
    },
    {
      postLink: "https://www.reddit.com/r/godot/r/godot/comments/1ogs85k/i_made_a_google_docs_clone_for_fun/",
      subreddit: "godot",
      heading: "I made a google docs clone for fun",
      thumbnail: "https://preview.redd.it/nv0djtlv2ixf1.png?auto=webp&s=46d052f3b2051b8f8d249083b17734cce0cca749",
      totalUpvotes: 701,
      totalDownvotes: 21,
      totalComments: 30
    },
    {
      postLink: "https://www.reddit.com/r/godot/comments/1ogvce5/unintentional_similarity/",
      subreddit: "godot",
      heading: "Unintentional similarity...",
      thumbnail: "https://external-preview.redd.it/cjdlbXZ2NjRwaXhmMTGVhfLu_NZawlrBkndL1zEcaVj7ByFYO6YXxaweoCgb.png?format=pjpg&auto=webp&s=487c8e7c8bd8d580777dc585fc31cb91588fd4d8",
      totalUpvotes: 125,
      totalDownvotes: 2,
      totalComments: 62
    }
  ],
  cache: {}
};

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

  @param {string} query
  @param {string} subreddit
  @returns {{
    type: string,
    payload: {
      query: string,
      subreddit: string
    }
  }}
*/
export const updatePosts = (query, subreddit = "") => ({
  type: "updatePosts",
  payload: {
    query,
    subreddit
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePosts: (state, { payload }) => {
      // Nothing much yet...
      console.log(
        `{ query: ${payload.query}, subreddit: ${payload.subreddit} }`
      );
    }
  }
});

export default postsSlice.reducer;
