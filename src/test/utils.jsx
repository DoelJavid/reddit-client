import { render } from "@testing-library/react";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { setupStore } from "../store";
import sampleData from "./sample-data"

/**
  Mock implementation for `fetch()`.
*/
global.fetch = vi.fn(() => sampleData);

// Solution found here:
// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
});

/**
  A basic wrapper function that wraps the given React component around a
  provider element to allow for testing.

  @param {JSX.Element} Component
  @param {Object} props
  @param {Object} props.preloadedState
  @param {Object} props.store
  @param {string} props.searchQuery
  @param {any[]} props.renderOptions
  @returns {{
    store: Object,
    RenderResult<>
  }}
*/
export function renderComponent(
  Component,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    searchQuery = "/",
    ...renderOptions
  } = {}
) {
  /**
    Wrapper component that's used for testing.

    @returns {JSX.Element}
  */
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[searchQuery]}>
        {children}
      </MemoryRouter>
    </Provider>
  );

  return {
    store,
    ...render(Component, {wrapper: Wrapper, ...renderOptions})
  };
}

export function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

