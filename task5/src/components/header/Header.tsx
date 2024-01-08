import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <>
      <div className="header">
        <NavLink to="/" className="header__logo">
          <p className="header__logo-title">Фильмы</p>
        </NavLink>
        <div className="header__author">
          <p className="header__author-text"> Екатерина Смолькина 6408 </p>
          <a className="header__git" href="https://github.com/smolkinakate17/tinkoff">
          https://github.com/smolkinakate17/tinkoff
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
