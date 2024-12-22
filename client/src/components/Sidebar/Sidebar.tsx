import { FC } from 'react';
import { Link } from 'react-router-dom';

const Sidebar: FC = () => {
  return (
    <aside className="h-full w-64 bg-base-200 p-4 shadow-lg">
      <ul className="menu p-0">
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/lotteries">Лотереи</Link>
        </li>
        <li>
          <Link to="/prizes">Призы</Link>
        </li>
        <li>
          <Link to="/settings">Настройки</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
