import Post from "./Post.jsx";
import { useSelector } from "react-redux";
import { getPosts } from "./postsSlice.js";

/**
  List component containing all Reddit posts to browse.

  @returns {JSX.element}
*/
function Posts() {
  const posts = useSelector(getPosts);

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

