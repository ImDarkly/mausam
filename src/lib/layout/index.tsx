import type { ReactNode } from 'react';

import Meta from './Meta';

type LayoutProps = {
  children: ReactNode;
};

const isProduction = process.env.NODE_ENV === 'production';

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Meta />
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-600 to-blue-800">
        <main className={`${isProduction ? 'select-none' : ''} wrapper`}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
