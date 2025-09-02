import {describe, expect, test, afterEach} from "vitest";
import {render, cleanup} from "@testing-library/react";
import App from "./App.jsx";

describe("App", () => {
  afterEach(() => {
    cleanup();
  });

  test("Should initialize with no props without errors", () => {
    expect(() => { render(<App />) }).not.toThrow();
  });
});

