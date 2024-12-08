import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { AsyncImportWrapper } from '../../features';

export const MainRoutes = createBrowserRouter(
  [
    {
      errorElement: <div>Страница не найдена!</div>,
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: (
            <AsyncImportWrapper
              importFunc={() => import('../../pages/HomePage')}
              fallback={<div>Loading HomePage...</div>}
            />
          ),
        },
        {
          path: 'sign-in',
          element: (
            <AsyncImportWrapper
              importFunc={() => import('../../pages/SignInPage')}
              fallback={<div>Loading SignInPage...</div>}
            />
          ),
        },
        {
          path: 'sign-up',
          element: (
            <AsyncImportWrapper
              importFunc={() => import('../../pages/SignUpPage')}
              fallback={<div>Loading SignUpPage...</div>}
            />
          ),
        },
        {
          path: 'lotteries',
          element: (
            <AsyncImportWrapper
              importFunc={() => import('../../pages/LotteriesPage')}
              fallback={<div>Loading LotteriesPage...</div>}
            />
          ),
        },
        {
          path: 'prizes',
          element: (
            <AsyncImportWrapper
              importFunc={() => import('../../pages/PrizesPage')}
              fallback={<div>Loading PrizesPage...</div>}
            />
          ),
        },
        {
          path: 'settings',
          element: (
            <AsyncImportWrapper
              importFunc={() => import('../../pages/SettingsPage')}
              fallback={<div>Loading SettingsPage...</div>}
            />
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    } as any,
  }
);
