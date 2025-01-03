import { useEffect, FC, useState } from 'react';
import { themeChange } from 'theme-change';
import { themes } from './consts';

const ThemeSwitcher: FC = () => {
  const [currentTheme, setCurrentTheme] = useState<string>('');

  useEffect(() => {
    themeChange(false);
    // Get initial theme
    const htmlElement = document.documentElement;
    const theme = htmlElement.getAttribute('data-theme') || 'night';
    setCurrentTheme(theme);
  }, []);

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
  };

  return (
    <div className="dropdown drop-shadow-xl">
      <div tabIndex={0} role="button" className="">
        {/* Иконка переключения темы */}
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <title>Switch theme</title>
          <desc>Created with Sketch.</desc>
          <g id="🔍-Product-Icons" stroke="white" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="ic_fluent_dark_theme_24_filled" fill="#212121" fillRule="nonzero">
              <path d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20 L12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z" id="🎨-Color"></path>
            </g>
          </g>
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
              checked={currentTheme === theme.value}
              onChange={() => handleThemeChange(theme.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;