import { Outlet } from 'react-router-dom';

import './App.css';
import { Footer, Header } from '../components';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <Header />
        <Outlet />
      <Footer />
    </div>
  );
}

export default App;
