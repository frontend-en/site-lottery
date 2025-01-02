import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from '../';

const Header: FC = () => {
  return (
    <header className="navbar bg-base-100 shadow-md relative">
      <div className='flex items-center justify-between 2xl:max-w-[1440px] xl:max-w-[1024px] mx-auto w-full'>
        <div className="grow">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            HitTheTicket 🎉
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/sign-in">
            <button className="btn btn-ghost">Войти</button>
          </Link>
          <Link to="/sign-up">
            <button className="btn btn-ghost mr-2">Зарегистрироваться</button>
          </Link>
          <ThemeSwitcher />
        </div>
  
      </div>
    </header>
  );
};

export default Header;
