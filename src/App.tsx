import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';  
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes';

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

interface AppProps {
  basename: string;
}

const App: React.FC<AppProps> = ({ basename }) => {
  return (
    <ErrorBoundary>
      <Router basename={basename}>
        <StatisticsAppContent />
      </Router>
    </ErrorBoundary>
  );
};

export default App;
