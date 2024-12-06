import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Удачная Касса 🎉</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-ghost">Войти</button>
        <button className="btn btn-ghost">Зарегистрироваться</button>
      </div>
    </header>
  );
};

export default Header;
