import Header from "./components/Header.jsx";
import Subreddits from "./features/subreddits/Subreddits.jsx";
import Posts from "./features/posts/Posts.jsx";

/**
  The root component for the application.

  @returns {JSX.element}
*/
function App() {
  return (
    <>
      <Header />
      <h1>Hello world!</h1>
      <Subreddits topics={[
        "r/foo",
        "r/bar",
        "r/baz"
      ]} />
      <Posts />
    </>
  );
}

export default App;

