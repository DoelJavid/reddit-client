import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { setupStore } from "./store.js";

const root = createRoot(document.getElementById("root"));

function renderApp() {
  root.render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

renderApp();

