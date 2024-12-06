import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="h-full w-64 bg-base-200 p-4 shadow-lg">
      <ul className="menu p-0">
        <li>
          <a href="/dashboard">Главная</a>
        </li>
        <li>
          <a href="/lotteries">Лотереи</a>
        </li>
        <li>
          <a href="/prizes">Призы</a>
        </li>
        <li>
          <a href="/settings">Настройки</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
