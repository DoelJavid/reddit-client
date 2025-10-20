import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  Basic list component containing all subreddits.

  @param {Object} props
  @param {string[]} props.topics
  @returns {JSX.element}
*/
function Subreddits() {
  const [addingTopic, setAddingTopic] = useState(false);
  const dispatch = useDispatch();
  const topics = useSelector(getTopics);
  const selectedTopic = useSelector(getSelectedTopic);

  return (
    <div className="topics-list">
      {topics && topics.map((topic, idx) =>
        <SubredditButton
          key={`topic_${idx}_${topic}`}
          topic={topic}
          selected={topic === selectedTopic}
          onSelectClick={e => {
            dispatch(selectTopic(topic));
          }}
          onRemoveClick={e => dispatch(removeTopic(topic))}
        />
      )}

      <SubredditAddButton onSubmit={input => dispatch(addTopic(input))} />
    </div>
  );
}

export default Subreddits;

