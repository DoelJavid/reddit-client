
/**
  Basic utility for creating subreddit buttons.

  @param {Object} props
  @param {string} props.topic
  @param {boolean} props.selected
  @param {(e: ClickEvent) => void} props.onSelectClick
  @param {(e: ClickEvent) => void} props.onRemoveClick
  @returns JSX.Element
*/
function SubredditButton({topic, selected, onSelectClick, onRemoveClick}) {
  return (
    <div className={"subreddit-btn-base" + (selected ? " selected" : "")}>
      <button
        className="subreddit-btn"
        onClick={onSelectClick}
      >
        {topic}
      </button>
      <button
        className="subreddit-remove-btn"
        aria-label="Remove topic."
        onClick={onRemoveClick}
      >
        <img src="/public/icons/remove-subreddit.svg"/>
      </button>
    </div>
  );
}

export default SubredditButton;

