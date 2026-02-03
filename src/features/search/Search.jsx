import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { searchQuery } from "./searchSlice.js";
import SearchBar from "./SearchBar.jsx";
import SearchQueryList from "./SearchQueryList.jsx";

/**
  Search component used to navigate Reddit.

  @returns {JSX.element}
*/
function Search() {
  const [hasFocus, setHasFocus] = useState(false);
  const [query, setQuery] = useState("");
  const { subreddit } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
    Event handler to handle search submit.

    @param {string} query
  */
  const handleSubmit = (query) => {
    dispatch(searchQuery(query));
    setQuery("");
    navigate(`?q=${query}`);
  };

  return (
    <div className="search">
      <SearchBar
        query={query}
        onFocusChange={focused => setHasFocus(focused)}
        onQueryChange={e => setQuery(e.target.value)}
        onSubmit={handleSubmit}
      />
      <SearchQueryList
        query={query}
        enabled={hasFocus}
        onEntryClick={handleSubmit}
      />
    </div>
  );
}

export default Search;

