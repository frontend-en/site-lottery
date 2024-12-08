import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { MainRoutes } from './app';
import { store } from './store/store';

import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider
      router={MainRoutes}
      future={{
        v7_startTransition: true,
      }}
    />
  </Provider>
);
