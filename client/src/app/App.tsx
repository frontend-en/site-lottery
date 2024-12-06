import { Outlet } from 'react-router-dom';
import { ThemeSwitcher } from '../components';

import './App.css';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <ThemeSwitcher />
      <Outlet />
    </div>
  );
}

export default App;
