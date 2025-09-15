import { useDispatch, useSelector } from "react-redux";
import { getSearchHistory } from "./searchSlice.js";

/**
  List component that displays recently used queries that are currently cached.

  @param {Object} props
  @param {boolean} props.enabled
  @param {string} props.query
  @param {(query: string) => void} props.onEntryClick
  @returns {JSX.element}
*/
function SearchQueryList({enabled, query, onEntryClick}) {
  if (!enabled) {
    return <></>;
  }

  const dispatch = useDispatch();
  const searchHistory = useSelector(getSearchHistory);

  return (
    <div className="search-queries">
      {searchHistory.map((query, idx) =>
        <button
          key={`${query}_${idx}`}
          className="search-query-entry"
          onClick={e => onEntryClick(query)}
        >
          {query}
        </button>
      )}
    </div>
  );
}

export default SearchQueryList;

