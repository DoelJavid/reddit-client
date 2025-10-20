import {describe, expect, test, afterEach} from "vitest";
import {render, cleanup} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderComponent } from "../../test/utils.jsx";
import Subreddits from "./Subreddits.jsx";

describe("Subreddits", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should initialize with no props without errors", () => {
    expect(() => { renderComponent(<Subreddits />) }).not.toThrow();
  });

  test("Should contain a list of '.subreddit-btn-base' elements.", () => {
    const { container } = renderComponent(<Subreddits />);

    const topicElements = container.querySelectorAll(".subreddit-btn-base");

    expect(topicElements.length).toBeDefined();
    expect(topicElements.length).toBeGreaterThan(0);
  });

  test("The currently selected topic should have the class '.selected'.", async () => {
    const { container } = renderComponent(<Subreddits />);
    const user = userEvent.setup();
    const subredditBtn = container.querySelector(".subreddit-btn");

    await user.click(subredditBtn);

    const selectedSubreddit = container.querySelector(".subreddit-btn-base.selected");
    expect(selectedSubreddit).not.toBeNull();
  });

  test("Should have the ability to add subreddits through the `.subreddit-add-btn`.", async () => {
    const { container, getByText } = renderComponent(<Subreddits />);
    const user = userEvent.setup();
    const newSubredditName = "testing12324t";
    const subredditAddBtn = container.querySelector(".subreddit-add-btn");

    await user.click(subredditAddBtn);

    const keyCommand = newSubredditName + "[Enter]";
    await user.keyboard(keyCommand);

    const fullSubredditName = "r/" + newSubredditName;
    const newSubreddit = getByText(fullSubredditName);
    expect(newSubreddit).not.toBeNull();
  });

  test("When selected, the `.subreddit-add-btn` should be replaced with a `.subreddit-add-input`.", async () => {
    const { container, getByText } = renderComponent(<Subreddits />);
    const user = userEvent.setup();
    let subredditAddBtn = container.querySelector(".subreddit-add-btn");

    await user.click(subredditAddBtn);

    subredditAddBtn = container.querySelector(".subreddit-add-btn");
    const subredditInput = container.querySelector(".subreddit-add-input");
    expect(subredditAddBtn).toBeNull();
    expect(subredditInput).not.toBeNull();
  });

  test("Should have the ability to remove subreddits through the `.subreddit-remove-btn`.", async () => {
    const { container, getByText } = renderComponent(<Subreddits />);
    const user = userEvent.setup();
    const firstBtn = container.querySelector(".subreddit-btn-base");
    const removeBtn = firstBtn.querySelector(".subreddit-remove-btn");

    await user.click(removeBtn);

    expect(firstBtn.parentElement).toBeNull();
  });

  test("Should contain no text when submitted aside from 'r/'.", async () => {
    const { container, getByText } = renderComponent(<Subreddits />);
    const user = userEvent.setup();
    const subredditAddBtn = container.querySelector(".subreddit-add-btn");

    await user.click(subredditAddBtn);
    await user.keyboard("testing12324t[Enter]");
    await user.click(subredditAddBtn);

    const subredditInput = container.querySelector(".subreddit-add-input");
    expect(subredditInput).not.toBeNull();
    expect(subredditInput.value).toMatch(/^r\/$/);
  });
});

