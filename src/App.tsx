import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';  
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface AppProps {
  basename: string;
}

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

const App: React.FC<AppProps> = ({ basename }) => {
  // Set up the Query Client with global defaults
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2, 
        refetchOnWindowFocus: false, // Disable refetching when window regains focus
        staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      },
      mutations: {
        retry: 2, 
      },
    },
  });

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router basename={basename}>
          <StatisticsAppContent />
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
