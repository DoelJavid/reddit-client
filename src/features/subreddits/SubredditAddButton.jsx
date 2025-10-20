import { useState } from "react";

/**
  Basic utility for creating subreddit buttons.

  @param {Object} props
  @param {string} props.topic
  @param {boolean} props.selected
  @param {(input: string) => void} props.onSubmit
  @returns JSX.Element
*/
function SubredditAddButton({onSubmit}) {
  const [active, setActive] = useState(false);
  const [subredditName, setSubredditName] = useState("r/");

  if (active) {
    const unfocusButton = () => {
      setSubredditName("r/");
      setActive(false);
    };

    return (
      <input
        className="subreddit-add-input"
        type="text"
        name="subredditInput"
        defaultValue="r/"
        value={subredditName}
        autoFocus

        onChange={e => {
          const { value } = e.target;
          const subredditPattern = /^r\/[a-zA-Z0-9]{0,21}$/;

          if (subredditPattern.test(value)) {
            setSubredditName(value);
          }
        }}
        onKeyDown={e => {
          const { value } = e.target;
          const blankSubredditPattern = /^r?\/?$/;

          switch (e.key) {
          case "Enter":
            if (!blankSubredditPattern.test(value)) {
              onSubmit(value);
            }

          case "Escape":
            e.preventDefault();
            unfocusButton();
          default:
          }
        }}
        onBlur={unfocusButton}
      />
    );
  } else {
    return (
      <input
        className="subreddit-add-btn"
        type="button"
        value="Add Subreddit"
        onClick={() => setActive(true)}
      />
    );
  }
}

export default SubredditAddButton;
