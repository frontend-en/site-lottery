import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';
import { LoadingPage } from '../../shared/UI';

// Ленивая загрузка компонентов
const AnimatedPage = lazy(() => 
  import('../../components').then(module => ({ default: module.AnimatedPage }))
);

// Предзагрузка основных страниц с приоритетами
const pageImports = {
  home: lazy(() => 
    import('../../pages/HomePage' /* webpackChunkName: "home-page" */)
      .then(module => ({ default: module.default }))
  ),
  signIn: lazy(() => 
    import('../../pages/SignInPage' /* webpackChunkName: "auth-page" */)
      .then(module => ({ default: module.default }))
  ),
  signUp: lazy(() => 
    import('../../pages/SignUpPage' /* webpackChunkName: "auth-page" */)
      .then(module => ({ default: module.default }))
  ),
  lotteries: lazy(() => 
    import('../../pages/LotteriesPage' /* webpackChunkName: "lotteries-page" */)
      .then(module => ({ default: module.default }))
  ),
  prizes: lazy(() => 
    import('../../pages/PrizesPage' /* webpackChunkName: "prizes-page" */)
      .then(module => ({ default: module.default }))
  ),
  settings: lazy(() => 
    import('../../pages/SettingsPage' /* webpackChunkName: "settings-page" */)
      .then(module => ({ default: module.default }))
  )
};

// Предварительная загрузка критических страниц
if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Высокий приоритет
    const prefetchHighPriority = () => {
      const links = ['home', 'lotteries'].map(page => 
        import(`../../pages/${page}Page`)
      );
      return Promise.all(links);
    };

    // Средний приоритет
    const prefetchMediumPriority = () => {
      const links = ['signIn', 'prizes'].map(page => 
        import(`../../pages/${page}Page`)
      );
      return Promise.all(links);
    };

    // Низкий приоритет
    const prefetchLowPriority = () => {
      const links = ['signUp', 'settings'].map(page => 
        import(`../../pages/${page}Page`)
      );
      return Promise.all(links);
    };

    // Выполняем предзагрузку с учетом приоритетов
    prefetchHighPriority()
      .then(() => new Promise(resolve => setTimeout(resolve, 3000)))
      .then(prefetchMediumPriority)
      .then(() => new Promise(resolve => setTimeout(resolve, 2000)))
      .then(prefetchLowPriority)
      .catch(() => {
        // Игнорируем ошибки предзагрузки
      });
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
            <Suspense fallback={<LoadingPage title="Загрузка HomePage..." />}>
              <pageImports.home />
            </Suspense>
          ),
        },
        {
          path: 'sign-in',
          element: (
            <Suspense fallback={<LoadingPage title="Загрузка SignInPage..." />}>
              <AnimatedPage>
                <pageImports.signIn />
              </AnimatedPage>
            </Suspense>
          ),
        },
        {
          path: 'sign-up',
          element: (
            <Suspense fallback={<LoadingPage title="Загрузка SignUpPage..." />}>
              <AnimatedPage>
                <pageImports.signUp />
              </AnimatedPage>
            </Suspense>
          ),
        },
        {
          path: 'lotteries',
          element: (
            <Suspense fallback={<LoadingPage title="Загрузка LotteriesPage..." />}>
              <pageImports.lotteries />
            </Suspense>
          ),
        },
        {
          path: 'prizes',
          element: (
            <Suspense fallback={<LoadingPage title="Загрузка призов..." />}>
              <pageImports.prizes />
            </Suspense>
          ),
        },
        {
          path: 'settings',
          element: (
            <Suspense fallback={<LoadingPage title="Загрузка настроек..." />}>
              <pageImports.settings />
            </Suspense>
          ),
        },
        {
          path: 'loading',
          element: <LoadingPage title="Загрузка..." />,
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
    },
  }
);
