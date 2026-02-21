import Search from "../features/search/Search.jsx";

/**
  Header component. This component contains the search bar.
*/
function Header() {
  return (
    <header>
      <div className="logo">
        <img src="/icons/logo.svg" alt="Reddit Stats" />
        <p className="logo-text" aria-hidden="true">reddit stats</p>
      </div>
      <Search />
    </header>
  );
}

export default Header;

