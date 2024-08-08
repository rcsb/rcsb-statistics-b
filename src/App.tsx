import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';  
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = [
  { path: '/', element: lazy(() => import('./pages/home')), exact: true },
  { path: '/pdb-data-growth', element: lazy(() => import('./pages/pdb-data-growth')) },
  { path: '/summary', element: lazy(() => import('./pages/summary')) },
  { path: '/other-statistics', element: lazy(() => import('./pages/other-stats')) },
  { path: '/pdb-data-snapshot', element: lazy(() => import('./pages/pdb-data-snapshot')) }
];

const NotFound = () => (
  <div>
    Oops, looks like this page mutated! 🧬 Try going back to the Statistics homepage or double-checking the URL.
  </div>
);

const StatisticsAppContent: React.FC = () => {
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
                element={<route.element />} 
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
        <StatisticsAppContent />
      </Router>
    </ErrorBoundary>
  );
};

export default App;
