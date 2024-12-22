import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AnimatedPage from './AnimatedPage';

const AnimatedRoutes: FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <AnimatedPage key={location.pathname}>
        <Outlet />
      </AnimatedPage>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
