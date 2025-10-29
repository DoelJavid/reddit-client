import Search from "../features/search/Search.jsx";

/**
  Header component. This component contains the search bar.
*/
function Header() {
  return (
    <header>
      <div className="logo">
        <img src="/icons/logo.svg" alt="" />
        <h1>reddit stats</h1>
      </div>
      <Search />
    </header>
  );
}

export default Header;

