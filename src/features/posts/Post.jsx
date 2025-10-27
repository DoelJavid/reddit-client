/**
  A singular post component showing all information of a single Reddit post.

  @param {Object} props
  @param {string} props.postLink
  @param {string} props.heading
  @param {string} props.thumbnailSrc
  @param {string} props.thumbnailAlt
  @param {number} props.totalUpvotes
  @param {number} props.totalDownvotes
  @returns {JSX.element}
*/
function Post({
  postLink,
  subreddit,
  heading,
  author,
  thumbnail,
  totalUpvotes,
  totalDownvotes
}) {
  return (
    <a className="post" href={postLink} target="_blank">
      <h2 className="post-heading">{heading || "Untitled"}</h2>
      {author && <p className="post-author">Posted by {author}</p>}
      {thumbnail && <img className="post-thumbnail" src={thumbnail || ""} alt="" />}

      <div className="post-stats">
        <div className="stats-column">
          <img src="/icons/upvote.svg" alt="Upvotes:" />
          <p>{totalUpvotes || 0}</p>
        </div>
        <div className="stats-column">
          <img src="/icons/downvote.svg" alt="Downvotes:" />
          <p>{totalDownvotes || 0}</p>
        </div>
        <div className="stats-column">
          <img src="/icons/reply.svg" alt="Replies:" />
          <p>{totalDownvotes || 0}</p>
        </div>
      </div>
    </a>
  );
}

export default Post;

