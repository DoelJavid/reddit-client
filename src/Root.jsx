import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router";
import Header from "./components/Header.jsx";
import Subreddits from "./features/subreddits/Subreddits.jsx";
import Posts from "./features/posts/Posts.jsx";
import NotFound from "./components/NotFound.jsx"

/**
  The root component for the application.

  @param {Object} props
  @param {boolean} props.notFound
  @returns {JSX.element}
*/
function Root({notFound}) {
  const { subreddit } = useParams();
  const [ searchParams ] = useSearchParams();
  const query = searchParams.get("q");

  if (notFound) {
    return (
      <>
        <Header />
        <Subreddits topics={[
          "r/foo",
          "r/bar",
          "r/baz"
        ]} />
        <NotFound />
      </>
    );
  }

  return (
    <>
      <Header />
      <h1>Hello world!</h1>
      <Subreddits topics={[
        "r/foo",
        "r/bar",
        "r/baz"
      ]} />
      <Posts query={query} subreddit={subreddit} />
    </>
  );
}

export default Root;

