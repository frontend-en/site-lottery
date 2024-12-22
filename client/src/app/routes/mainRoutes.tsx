import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { AsyncImportWrapper } from '../../features';
import { AnimatedPage } from '../../components';
import { LoadingPage } from '../../shared/UI';

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
                fallback={<LoadingPage title="Загрузка HomePage..." />}
              />
          ),
        },
        {
          path: 'sign-in',
          element: (
            <AnimatedPage>
              <AsyncImportWrapper
                importFunc={() => import('../../pages/SignInPage')}
                fallback={<LoadingPage title="Загрузка SignInPage..." />}
              />
            </AnimatedPage>
          ),
        },
        {
          path: 'sign-up',
          element: (
            <AnimatedPage>
              <AsyncImportWrapper
                importFunc={() => import('../../pages/SignUpPage')}
                fallback={<LoadingPage title="Загрузка SignUpPage..." />}
              />
            </AnimatedPage>
          ),
        },
        {
          path: 'lotteries',
          element: (
              <AsyncImportWrapper
                importFunc={() => import('../../pages/LotteriesPage')}
                fallback={<LoadingPage title="Загрузка LotteriesPage..." />}
              />
          ),
        },
        {
          path: 'prizes',
          element: (
              <AsyncImportWrapper
                importFunc={() => import('../../pages/PrizesPage')}
                fallback={<LoadingPage title="Загрузка призов..." />}
              />
          ),
        },
        {
          path: 'settings',
          element: (
              <AsyncImportWrapper
                importFunc={() => import('../../pages/SettingsPage')}
                fallback={<LoadingPage title="Загрузка настроек..." />}
              />
          ),
        },
        {
          path: 'loading',
          element: <LoadingPage title="Загрузка настроек..." />,
        }
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
