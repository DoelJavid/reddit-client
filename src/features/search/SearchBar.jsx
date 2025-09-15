/**
  Search bar component that takes input to browse Reddit.

  @param {Object} props
  @param {string} query
  @param {(focused: boolean) => void} onFocusChange
  @param {(e: ChangeEvent) => void} onQueryChange
  @param {(query: string) => void} onSubmit
  @returns {JSX.element}
*/
function Search({query, onFocusChange, onQueryChange, onSubmit}) {
  return (
    <div className="search-bar">
      <input
        className="search-bar-input"
        name="search"
        type="text"
        value={query}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
        onKeyUp={e => {
          if (e.key === "Enter") {
            onSubmit(query);
          }
        }}
        onChange={onQueryChange}
      />
      <img className="search-icon" src="/public/icons/search.svg" alt="Search" />
    </div>
  );
}

export default Search;

