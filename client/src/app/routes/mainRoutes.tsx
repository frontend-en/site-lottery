import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import {
  HomePage,
  SignInPage,
  LotteriesPage,
  PrizesPage,
  SettingsPage,
  SignUpPage,
} from '../../pages';

export const MainRoutes = createBrowserRouter(
  [
    {
      errorElement: <div>Страница не найдена!</div>,
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'sign-in',
          element: <SignInPage />,
        },
        {
          path: 'sign-up',
          element: <SignUpPage />,
        },
        {
          path: 'lotteries',
          element: <LotteriesPage />,
        },
        {
          path: 'prizes',
          element: <PrizesPage />,
        },
        {
          path: 'settings',
          element: <SettingsPage />,
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
