import Search from "../features/search/Search.jsx";

/**
  Header component. This component contains the search bar.
*/
function Header() {
  return (
    <header>
      <h1 className="logo">reddit stats</h1>
      <Search />
    </header>
  );
}

export default Header;

