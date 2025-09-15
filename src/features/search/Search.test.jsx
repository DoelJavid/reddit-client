import { describe, expect, test, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderComponent } from "../../test/utils.jsx"
import Search from "./Search.jsx";

describe("Search", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should initialize with no props without errors", () => {
    expect(() => { renderComponent(<Search />) }).not.toThrow();
  });

  test("Should have an input element with the class 'search-bar-input'", async () => {
    const { container } = renderComponent(<Search />);

    const searchBar = container.querySelector(".search-bar-input");

    expect(searchBar).not.toBeNull();
    expect(searchBar.nodeName).toStrictEqual("INPUT");
  });

  test("Should display an element with the class 'search-queries' if selected", async () => {
    const { container } = renderComponent(<Search />);
    const user = userEvent.setup();
    const searchBar = container.querySelector(".search-bar-input");
    await user.click(searchBar);

    const searchQueries = container.querySelector(".search-queries");

    expect(searchQueries).not.toBeNull();
  });

  test("Submitting input should clear the 'search-bar-input'", async () => {
    const { container } = renderComponent(<Search />);
    const user = userEvent.setup();

    const searchBar = container.querySelector(".search-bar-input");
    await user.click(searchBar);

    await userEvent.type(searchBar, "Testing 1, 2, 3...{Enter}");

    expect(searchBar.value).toBe("");
  });

  test("Should hide the 'search-queries' element if not selected", async () => {
    const { container } = renderComponent(<Search />);

    const searchQueries = container.querySelector(".search-queries");

    expect(searchQueries).toBeNull();
  });

  test("The 'search-queries' element should contain previously searched queries", async () => {
    const { container, getByText } = renderComponent(<Search />);
    const user = userEvent.setup();

    const searchBar = container.querySelector(".search-bar-input");
    await user.click(searchBar);
    let searchQueries = container.querySelector(".search-queries");

    await userEvent.type(searchBar, "foo{Enter}");
    await user.click(searchBar);
    await userEvent.type(searchBar, "foo");

    expect(searchQueries).not.toBeNull();
    expect(getByText("foo")).toBeDefined();
  });
});

