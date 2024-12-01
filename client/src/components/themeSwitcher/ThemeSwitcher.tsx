
import { useEffect, FC } from 'react'
import { themeChange } from 'theme-change'

const themes = [
  {
    id: 'default-theme',
    label: 'Default',
    value: 'default',
  },
  {
    id: 'light',
    label: 'Light',
    value: 'light',
  },
  {
    id: 'retro',
    label: 'Retro',
    value: 'retro',
  },
  {
    id: 'dark',
    label: 'Dark',
    value: 'dark',
  },
  {
    id: 'cupcake',
    label: 'Cupcake',
    value: 'cupcake',
  },
  {
    id: 'bumblebee',
    label: 'Bumblebee',
    value: 'bumblebee',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    value: 'emerald',
  },
  {
    id: 'corporate',
    label: 'Corporate',
    value: 'corporate',
  },
  {
    id: 'synthwave',
    label: 'Synthwave',
    value: 'synthwave',
  },
  {
    id: 'valentine',
    label: 'Valentine',
    value: 'valentine',
  },
  {
    id: 'halloween',
    label: 'Halloween',
    value: 'halloween',
  },
  {
    id: 'garden',
    label: 'Garden',
    value: 'garden',
  },
  {
    id: 'forest',
    label: 'Forest',
    value: 'forest',
  },
  {
    id: 'aqua',
    label: 'Aqua',
    value: 'aqua',
  },
  {
    id: 'lofi',
    label: 'LoFi',
    value: 'lofi',
  },
  {
    id: 'pastel',
    label: 'Pastel',
    value: 'pastel',
  },
  {
    id: 'fantasy',
    label: 'Fantasy',
    value: 'fantasy',
  },
  {
    id: 'wireframe',
    label: 'Wireframe',
    value: 'wireframe',
  },
  {
    id: 'black',
    label: 'Black',
    value: 'black',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    value: 'luxury',
  },
  {
    id: 'dracula',
    label: 'Dracula',
    value: 'dracula',
  },
  {
    id: 'cmyk',
    label: 'CMYK',
    value: 'cmyk',
  },
  {
    id: 'autumn',
    label: 'Autumn',
    value: 'autumn',
  },
  {
    id: 'business',
    label: 'Business',
    value: 'business',
  },
  {
    id: 'acid',
    label: 'Acid',
    value: 'acid',
  },
  {
    id: 'lemonade',
    label: 'Lemonade',
    value: 'lemonade',
  },
  {
    id: 'night',
    label: 'Night',
    value: 'night',
  },
  {
    id: 'coffee',
    label: 'Coffee',
    value: 'coffee',
  },
  {
    id: 'winter',
    label: 'Winter',
    value: 'winter',
  },
  {
    id: 'dim',
    label: 'Dim',
    value: 'dim',
  },
  {
    id: 'nord',
    label: 'Nord',
    value: 'nord',
  },
  {
    id: 'sunset',
    label: 'Sunset',
    value: 'sunset',
  }
]

console.log(themes.length);

const ThemeSwitcher: FC = () => {

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="dropdown absolute z-10 right-28">

      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>

      <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl max-h-60 overflow-y-auto">
        {
          themes.map((theme) => (
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
          ))
        }
      </ul>

    </div>
  )
}

export default ThemeSwitcher