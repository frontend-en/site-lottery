import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from '../';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar bg-base-100 shadow-md relative">
      <div className='flex items-center justify-between 2xl:max-w-[1440px] xl:max-w-[1024px] mx-auto w-full'>
        <div className="grow">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            HitTheTicket 🎉
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center">
          <Link to="/sign-in">
            <button className="btn btn-ghost">Войти</button>
          </Link>
          <Link to="/sign-up">
            <button className="btn btn-ghost mr-2">Зарегистрироваться</button>
          </Link>
          <ThemeSwitcher />
        </div>

        {/* Mobile burger menu */}
        <div className="md:hidden">
          <button 
            className="btn btn-ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              className="inline-block w-6 h-6 stroke-current"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Mobile menu dropdown */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg py-2 z-50">
              <Link to="/sign-in" className="block px-4 py-2 hover:bg-base-200">
                <button className="btn btn-ghost w-full justify-start">Войти</button>
              </Link>
              <Link to="/sign-up" className="block px-4 py-2 hover:bg-base-200">
                <button className="btn btn-ghost w-full justify-start">Зарегистрироваться</button>
              </Link>
              <div className="pl-7 py-2">
                <ThemeSwitcher />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
