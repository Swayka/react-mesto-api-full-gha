import headerLogo from '../images/logo.svg';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Место" />
      <Routes>
        <Route exact path="/" 
        element={<div className="header__info"> 
                    <p className="header__mail">{props.headerMail}</p>
                    <Link to="/sign-in" className="header__out-link" onClick={props.signOut}>Выйти
                    </Link>
                </div>}/>

        <Route path="/sign-in" 
        element={<Link to="/sign-up" className="header__sign-link">Регистрация</Link>} />
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__sign-link">Войти</Link>} />
      </Routes>
    </header>
  );
}

export default Header;