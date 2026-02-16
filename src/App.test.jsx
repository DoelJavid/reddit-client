import { describe, expect, test, afterEach } from "vitest";
import { cleanup, screen } from "@testing-library/react";
import App from "./App.jsx";
import { createFetchResponse, renderComponent } from "./test/utils.jsx";

describe("App", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should initialize with no props without errors", () => {
    expect(() => {
      renderComponent(<App />)
    }).not.toThrow();
  });

  test("Should contain 404 when searching an invalid route.", async () => {
    renderComponent(<App />, { searchQuery: "/b" });

    expect(await screen.findByText("404")).not.toBeNull();
  });

  test("Should not contain 404 when searching a valid route.", () => {
    renderComponent(<App />, { searchQuery: "/r/birds" });

    expect(screen.queryByText("404")).toBeNull();
  });
});

