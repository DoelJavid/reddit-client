import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchQuery } from "./searchSlice.js";
import SearchBar from "./SearchBar.jsx";
import SearchQueryList from "./SearchQueryList.jsx";

/**
  Search component used to navigate Reddit.

  @returns {JSX.element}
*/
function Search() {
  const dispatch = useDispatch();
  const [hasFocus, setHasFocus] = useState(false);
  const [query, setQuery] = useState("");

  /**
    Event handler to handle search submit.

    @param {string} query
  */
  const handleSubmit = (query) => {
    dispatch(searchQuery(query));
    setQuery("")
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

