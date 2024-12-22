import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { AsyncImportWrapper } from '../../features';
import { AnimatedPage } from '../../components';
import { LoadingPage } from '../../shared/UI';

// Предзагрузка основных страниц
const HomePage = () => import('../../pages/HomePage');
const SignInPage = () => import('../../pages/SignInPage');
const SignUpPage = () => import('../../pages/SignUpPage');
const LotteriesPage = () => import('../../pages/LotteriesPage');
const PrizesPage = () => import('../../pages/PrizesPage');
const SettingsPage = () => import('../../pages/SettingsPage');

// Предварительная загрузка основных страниц
if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(() => {
    HomePage();
    SignInPage();
    LotteriesPage();
  });
}

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
                importFunc={HomePage}
                fallback={<LoadingPage title="Загрузка HomePage..." />}
              />
          ),
        },
        {
          path: 'sign-in',
          element: (
            <AnimatedPage>
              <AsyncImportWrapper
                importFunc={SignInPage}
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
                importFunc={SignUpPage}
                fallback={<LoadingPage title="Загрузка SignUpPage..." />}
              />
            </AnimatedPage>
          ),
        },
        {
          path: 'lotteries',
          element: (
              <AsyncImportWrapper
                importFunc={LotteriesPage}
                fallback={<LoadingPage title="Загрузка LotteriesPage..." />}
              />
          ),
        },
        {
          path: 'prizes',
          element: (
              <AsyncImportWrapper
                importFunc={PrizesPage}
                fallback={<LoadingPage title="Загрузка призов..." />}
              />
          ),
        },
        {
          path: 'settings',
          element: (
              <AsyncImportWrapper
                importFunc={SettingsPage}
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
