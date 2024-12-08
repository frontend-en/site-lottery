import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from '../';

const Header: React.FC = () => {
  return (
    <header className="navbar bg-base-100 shadow-md relative">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Удачная Касса 🎉
        </Link>
      </div>
      <div className="flex-none">
        <Link to="/sign-in">
          <button className="btn btn-ghost">Войти</button>
        </Link>
        <Link to="/sign-up">
          <button className="btn btn-ghost">Зарегистрироваться</button>
        </Link>
      </div>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
