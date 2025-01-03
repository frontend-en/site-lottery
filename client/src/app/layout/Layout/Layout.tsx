import { FC, PropsWithChildren } from 'react';
import { Sidebar } from '../';

const Layout: FC<PropsWithChildren<{ sidebar?: boolean }>> = ({
  sidebar = true,
  children,
}) => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Основной контейнер с максимальной шириной и центрированием */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-full md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1440px]">
        <div className="flex min-h-screen flex-col">
          {/* Основной контент */}
          <div className="flex flex-1 flex-col lg:flex-row">
            {/* Сайдбар для больших экранов */}
            {sidebar && (
              <aside className="hidden lg:block lg:w-64 shrink-0 border-r border-base-200">
                <div className="sticky top-0 py-6 pr-4">
                  <Sidebar />
                </div>
              </aside>
            )}

            {/* Мобильный сайдбар */}
            {sidebar && (
              <div className="lg:hidden">
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-base-100 border-t border-base-200">
                  <Sidebar />
                </div>
              </div>
            )}

            {/* Основной контент */}
            <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
