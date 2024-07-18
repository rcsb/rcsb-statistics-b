import React, { lazy, Suspense } from 'react';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './components/NavBar';  
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = lazy(() => import('./pages/home'));
const DistSourceOrgNat = lazy(() => import('./pages/dist-source-org-nat'));
const Summary = lazy(() => import('./pages/summary'));
const OtherStatistics = lazy(() => import('./pages/other-stats'));
const PdbDataSnapshot = lazy(() => import('./pages/pdb-data-snapshot'));

const router = createMemoryRouter(
  [
    {
      path: '/',
      element: (
        <>
          <main className="container mt-5">
            <section className="row">
                <Navbar />
                <Suspense fallback={<div>Loading...</div>}>
                  <Outlet />
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
        }
      ]
    }
  ],
  { initialEntries: [location.pathname.replace("/stats-b", "") || '/'] }
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
