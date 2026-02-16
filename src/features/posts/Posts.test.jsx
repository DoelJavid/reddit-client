import {describe, expect, test, afterEach} from "vitest";
import {render, cleanup} from "@testing-library/react";
import Posts from "./Posts.jsx";
import Post from "./Post.jsx";
import { createFetchResponse, renderComponent } from "../../test/utils.jsx";

describe("Posts", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should initialize with no props without errors", () => {
    expect(() => { renderComponent(<Posts />) }).not.toThrow();
  });

  test("Should fetch to '{root}/api/' if no query or subreddit is given.", () => {
    renderComponent(<Posts />);

    const firstArg = fetch.mock.lastCall[0];

    expect(fetch).toHaveBeenCalled();
    expect(firstArg).toMatch(/\/api/);
  });

  test("Should fetch to '{root}/api/r/:subreddit' if subreddit is defined.", () => {
    renderComponent(<Posts subreddit="askreddit" />);

    const firstArg = fetch.mock.lastCall[0];

    expect(fetch).toHaveBeenCalled();
    expect(firstArg).toMatch(/\/api\/r\/askreddit/);
  });

  test("Should fetch to '{root}/api/?q=' if query is defined.", () => {
    renderComponent(<Posts query="dogs" />);

    const firstArg = fetch.mock.lastCall[0];

    expect(fetch).toHaveBeenCalled();
    expect(firstArg).toMatch(/\/api\/.*\?q=dogs/);
  });

  test("Should fetch to '{root}/api/r/:subreddit/?q=' if both subreddit and query is defined.", () => {
    renderComponent(<Posts subreddit="askreddit" query="dogs" />);

    const firstArg = fetch.mock.lastCall[0];

    expect(fetch).toHaveBeenCalled();
    expect(firstArg).toMatch(/\/api\/r\/askreddit\/.*\?q=dogs/);
  });
});

describe("Post", () => {
  test("Should initialize with no props without errors", () => {
    expect(() => { renderComponent(<Post />) }).not.toThrow();
  });

  test("Should contain an element with the class `.post-thumbnail` if the thumbnail is defined.", () => {
    // Below is a picture of a banana.
    const thumbnailUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpurepng.com%2Fpublic%2Fuploads%2Flarge%2Fpurepng.com-bananabananafruitside-vieworganic-481521306381lqons.png&f=1&nofb=1&ipt=2849d0424ead360ad0b48e2cf48086b9092ec67d83ce4aa280fe3a919fb2ed8b";
    const { container } = renderComponent(<Post thumbnail={thumbnailUrl} />);
    const imageTag = container.querySelector(".post-thumbnail");

    expect(imageTag).not.toBeNull();
  });

  test("Should contain no `.post-thumbnail` if the thumbnail is not defined.", () => {
    const { container } = renderComponent(<Post />);
    const imageTag = container.querySelector(".post-thumbnail");

    expect(imageTag).toBeNull();
  });
})

