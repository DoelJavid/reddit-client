import { describe, expect, test, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import App from "./App.jsx";
import { renderComponent } from "./test/utils.jsx";

describe("App", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should initialize with no props without errors", () => {
    expect(() => { renderComponent(<App />) }).not.toThrow();
  });
});

