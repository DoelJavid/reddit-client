import { useEffect, useId, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import SubredditButton from "./SubredditButton.jsx";
import SubredditAddButton from "./SubredditAddButton.jsx";
import {
  addTopic,
  removeTopic,
  selectTopic,
  getTopics,
  getSelectedTopic
} from "./subredditsSlice.js";

/**
  A custom hook that wraps around a given media query.

  Function definition found here:
  https://rogasper.com/blog/how-to-handle-media-queries-1764591646585

  @param {string} queryString
  @returns boolean
*/
function useMediaQuery(queryString) {
  const [queryMatches, setQueryMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(queryString);

    if (mediaQuery.matches !== queryMatches) {
      setQueryMatches(mediaQuery.matches);
    }

    const onMediaQueryChange = () => setQueryMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", onMediaQueryChange);

    return () => mediaQuery.removeEventListener("change", onMediaQueryChange);
  }, [queryMatches]);

  return queryMatches
}

/**
  Basic list component containing all subreddits.

  @param {Object} props
  @param {string[]} props.topics
  @returns {JSX.element}
*/
function Subreddits() {
  const [addingTopic, setAddingTopic] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 1380px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subredditMenuContentId = useId();
  const topics = useSelector(getTopics);
  const selectedTopic = useSelector(getSelectedTopic);

  return (
    <div className={"subreddit-list" + (collapsed ? " collapsed" : "")}>
      {
        isSmallScreen ?
        <button
          className="subreddit-list-collapse"
          aria-haspopup="menu"
          aria-expanded={!collapsed}
          aria-controls={subredditMenuContentId}
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? "Show" : "Hide"}
        </button> :
        ""
      }


      <div id={subredditMenuContentId} className="subreddit-list-content">
        {topics && topics.map((topic, idx) =>
          <SubredditButton
            key={`subreddit_${idx}_${topic}`}
            topic={topic}
            selected={topic === selectedTopic}
            onSelectClick={e => {
              dispatch(selectTopic(topic));
              navigate(`/${topic}`, { replace: true });
            }}
            onRemoveClick={e => dispatch(removeTopic(topic))}
          />
        )}

        <SubredditAddButton onSubmit={input => dispatch(addTopic(input))} />
      </div>
    </div>
  );
}

export default Subreddits;

