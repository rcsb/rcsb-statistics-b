import React, { lazy, Suspense } from 'react';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './components/NavBar';  
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import useSyncGlobalRouter from './hooks/useRouterSync';

const HomePage = lazy(() => import('./pages/home'));
const DistSourceOrgNat = lazy(() => import('./pages/dist-source-org-nat'));
const Summary = lazy(() => import('./pages/summary'));
const OtherStatistics = lazy(() => import('./pages/other-stats'));
const PdbDataSnapshot = lazy(() => import('./pages/pdb-data-snapshot'));

const RouteHandler = () => {
  // Synchronize router globally
  useSyncGlobalRouter({ basename: '/stats-b' });

  return (
    <Outlet />
  );
}

const router = createMemoryRouter(
  [
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <main className="container mt-5">
            <section className="row">
                <Suspense fallback={<div>Loading...</div>}>
                  <RouteHandler />
                </Suspense>
            </section>
          </main>
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
        },
        {
          path: '/other-statistics',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <OtherStatistics />
            </Suspense>
          )
        },
        {
          path: '/pdb-data-snapshot',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <PdbDataSnapshot />
            </Suspense>
          )
        },
        {
          path: '/pdb-data-growth',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <PdbDataSnapshot />
            </Suspense>
          )
        }
      ]
    }
  ],
  { initialEntries: [window.location.pathname.replace("/stats-b", "") || '/'] }
);

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
