import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';  
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SettingsProvider } from '../src/contexts/SettingsContext';
import { ModalProvider} from '../src/contexts/ModalContext';
import { QueryProvider } from './contexts/QueryContext';
import GenericModal from './components/Modals/GenericModal';
import  ChartSkeleton from './components/BarChart/BarChartSkeleton';
import ErrorPage  from './components/ErrorPage/ErrorPage';


interface AppProps {
  basename: string;
}

const NotFound = () => (
  <ErrorPage 
      error={{ 
          name: 'NotFoundError',
          message: 'Oops, looks like this page mutated! 🧬 Try going back to the Statistics homepage or double-checking the URL.'
      }} 
  />
);

const StatisticsAppContent: React.FC = () => {
  return (
    <main className="container mt-5">
      <section className="row">
        <Navbar />
        <GenericModal />
        <Suspense fallback={(<ChartSkeleton />)}>
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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2, 
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
      },
      mutations: {
        retry: 2, 
      },
    },
  });

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <QueryProvider>
          <SettingsProvider>
            <Router basename={basename}>
              <ModalProvider>
                <StatisticsAppContent />
              </ModalProvider>
            </Router>
          </SettingsProvider>
        </QueryProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;

