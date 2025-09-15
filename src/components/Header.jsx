import Search from "../features/search/Search.jsx";

/**
  Header component. This component contains the search bar.
*/
function Header() {
  return (
    <header>
      <div>Reddit Minimal</div>
      <Search />
    </header>
  );
}

export default Header;

