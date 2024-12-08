import { useEffect, FC } from 'react';
import { themeChange } from 'theme-change';
import { themes } from './consts';

const ThemeSwitcher: FC = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="dropdown absolute z-10 top-[64px] right-0 drop-shadow-xl">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl max-h-60 overflow-y-auto"
      >
        {themes.map((theme) => (
          <li key={theme.id}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme.label}
              value={theme.value}
              data-set-theme={theme.value}
              data-act-class="ACTIVECLASS"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
