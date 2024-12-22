import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { AsyncImportWrapper } from '../../features';
import { AnimatedPage } from '../../components';
import { LoadingPage } from '../../shared/UI';

// Предзагрузка основных страниц с приоритетами
const pageImports = {
  home: () => import('../../pages/HomePage' /* webpackChunkName: "home-page" */),
  signIn: () => import('../../pages/SignInPage' /* webpackChunkName: "auth-page" */),
  signUp: () => import('../../pages/SignUpPage' /* webpackChunkName: "auth-page" */),
  lotteries: () => import('../../pages/LotteriesPage' /* webpackChunkName: "lotteries-page" */),
  prizes: () => import('../../pages/PrizesPage' /* webpackChunkName: "prizes-page" */),
  settings: () => import('../../pages/SettingsPage' /* webpackChunkName: "settings-page" */)
};

// Предварительная загрузка критических страниц
if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(() => {
    // Высокий приоритет
    pageImports.home();
    pageImports.lotteries();
    
    // Средний приоритет
    setTimeout(() => {
      pageImports.signIn();
      pageImports.prizes();
    }, 3000);
    
    // Низкий приоритет
    setTimeout(() => {
      pageImports.signUp();
      pageImports.settings();
    }, 5000);
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
                importFunc={pageImports.home}
                fallback={<LoadingPage title="Загрузка HomePage..." />}
              />
          ),
        },
        {
          path: 'sign-in',
          element: (
            <AnimatedPage>
              <AsyncImportWrapper
                importFunc={pageImports.signIn}
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
                importFunc={pageImports.signUp}
                fallback={<LoadingPage title="Загрузка SignUpPage..." />}
              />
            </AnimatedPage>
          ),
        },
        {
          path: 'lotteries',
          element: (
              <AsyncImportWrapper
                importFunc={pageImports.lotteries}
                fallback={<LoadingPage title="Загрузка LotteriesPage..." />}
              />
          ),
        },
        {
          path: 'prizes',
          element: (
              <AsyncImportWrapper
                importFunc={pageImports.prizes}
                fallback={<LoadingPage title="Загрузка призов..." />}
              />
          ),
        },
        {
          path: 'settings',
          element: (
              <AsyncImportWrapper
                importFunc={pageImports.settings}
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
