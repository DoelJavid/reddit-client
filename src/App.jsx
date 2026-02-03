import { Routes, Route } from "react-router";
import Root from "./Root.jsx";

/**
  Contains all routes of the application.

  @returns {JSX.element}
*/
function App() {
  return (
    <Routes>
      <Route index element={<Root />} />
      <Route path="r/:subreddit" element={<Root />} />
      <Route path="*" element={<Root notFound />} />
    </Routes>
  );
}

export default App;

