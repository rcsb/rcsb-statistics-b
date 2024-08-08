import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';  
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = lazy(() => import('./pages/home'));
const DistSourceOrgNat = lazy(() => import('./pages/dist-source-org-nat'));
const Summary = lazy(() => import('./pages/summary'));
const OtherStatistics = lazy(() => import('./pages/other-stats'));
const PdbDataSnapshot = lazy(() => import('./pages/pdb-data-snapshot'));

const NotFound = () => <div className="alert alert-danger" role="alert">Oops, looks like this page mutated! 🧬 Try going back to the homepage or double-checking the URL.</div>;

const routes = [
  { path: '/', element: <HomePage />, exact: true },
  { path: '/pdb-data-growth', element: <DistSourceOrgNat /> },
  { path: '/summary', element: <Summary /> },
  { path: '/other-statistics', element: <OtherStatistics /> },
  { path: '/pdb-data-snapshot', element: <PdbDataSnapshot /> }
];

const AppContent: React.FC = () => {
  return (
    <main className="container mt-5">
      <section className="row">
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((route, index) => (
              <Route 
                key={index} 
                path={route.path} 
                element={route.element} 
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </section>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router basename="/stats-b">
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
};

export default App;
