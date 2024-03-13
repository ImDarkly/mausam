import type { ReactNode } from 'react';

import { ThemeProvider } from '@/lib/components/theme-provider';

import Meta from './Meta';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider>
      <Meta />
      <div className="flex min-h-screen flex-col">
        <main className="wrapper">{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
