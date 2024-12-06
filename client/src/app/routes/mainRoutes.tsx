import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Home, SignIn } from '../../pages';

export const MainRoutes = createBrowserRouter(
  [
    {
      errorElement: <div>Страница не найдена!</div>,
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'sign-in',
          element: <SignIn />,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
    },
  }
);
