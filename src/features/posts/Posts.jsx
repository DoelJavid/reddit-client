import Post from "./Post.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePosts } from "./postsSlice.js";

/**
  List component containing all Reddit posts to browse.

  @param {Object} props
  @param {string} query
  @param {string} subreddit
  @returns {JSX.element}
*/
function Posts({query, subreddit}) {
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePosts(query, subreddit));
  }, [query, subreddit]);

  return (
    <div className="post-list">
      {posts && posts.map(
        post => <Post
          postLink={post.postLink}
          subreddit={post.subreddit}
          heading={post.heading}
          author={post.author}
          thumbnail={post.thumbnail}
          totalUpvotes={post.totalUpvotes}
          totalDownvotes={post.totalDownvotes}
        />
      )}
    </div>
  );
}

export default Posts;

