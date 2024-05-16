import React from 'react';
import type { PathRouteProps } from 'react-router-dom';

const isProduction = process.env.NODE_ENV === 'production';

const Home = React.lazy(() => import('@/lib/pages/home'));
const Demo = React.lazy(() => import('@/lib/pages/demo'));

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: isProduction ? <Home /> : <Demo />,
  },
  {
    path: '/demo',
    element: <Demo />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
