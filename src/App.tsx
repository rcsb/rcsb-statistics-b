import React, { lazy, Suspense} from 'react';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/home'));
const DistSourceOrgNat = lazy(() => import('./pages/dist-source-org-nat'));
const Summary = lazy(() => import('./pages/summary'));

const router = createMemoryRouter(
  [
    {
      path: '/',
      element: (
        <>
          <Outlet />
        </>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: '/distribution-source-organism-natural',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <DistSourceOrgNat />
            </Suspense>
          )
        },
        {
          path: '/summary',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Summary />
            </Suspense>
          )
        }
      ]
    }
  ],
  {initialEntries: [location.pathname.replace("/stats-b", "") || '/']}
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;