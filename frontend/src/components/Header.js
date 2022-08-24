import { Link } from "react-router-dom";

function Header({ path, text, children, handleLogout }) {
  return (
    <header className="header">
      {/* <img className="header__logo" src="<%=require('./images/logo.svg')%>" alt="логотип"> */}
      <div className="header__logo"></div>
      <div className="header__link-container">
        {children}
        <Link className="header__link" to={path} onClick={handleLogout}>
          {text}
        </Link>
      </div>
    </header>
  );
}

export default Header;
