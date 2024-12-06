import { FC, PropsWithChildren } from 'react';
import { Header, Sidebar, Footer } from '../';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
