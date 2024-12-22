import { FC, PropsWithChildren } from 'react';
import { Sidebar } from '../';

const Layout: FC<PropsWithChildren<{ sidebar?: boolean }>> = ({
  sidebar = true,
  children,
}) => {
  return (
    <div className="flex flex-col grow 2xl:max-w-[1440px] xl:max-w-[1024px]">
      <div className="flex flex-1">
        {sidebar && <Sidebar />}
        <main className="grow p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
