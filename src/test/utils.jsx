import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../store";

/**
  A basic wrapper function that wraps the given React component around a
  provider element to allow for testing.

  @param {JSX.Element} Component
  @param {Object} props
  @param {Object} props.preloadedState
  @param {Object} props.store
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
    ...renderOptions
  } = {}
) {
  /**
    Wrapper component that's used for testing.

    @returns {JSX.Element}
  */
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      {children}
    </Provider>
  );

  return {
    store,
    ...render(Component, {wrapper: Wrapper, ...renderOptions})
  };
}

