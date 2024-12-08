import { FC, PropsWithChildren } from 'react';
import { Header, Sidebar, Footer } from '../';

const Layout: FC<PropsWithChildren<{ sidebar?: boolean }>> = ({
  sidebar = true,
  children,
}) => {
  return (
    <div className="flex flex-col min-h-screen 2xl:min-w-[1440px] xl:min-w-[1024px]">
      <Header />
      <div className="flex flex-1">
        {sidebar && <Sidebar />}
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
