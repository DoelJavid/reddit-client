import {describe, expect, test, afterEach} from "vitest";
import {render, cleanup} from "@testing-library/react";
import Posts from "./Posts.jsx";
import Post from "./Post.jsx";
import { renderComponent } from "../../test/utils.jsx";

describe("Posts", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should initialize with no props without errors", () => {
    expect(() => { renderComponent(<Posts />) }).not.toThrow();
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
});

