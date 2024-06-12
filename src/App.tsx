import React, { Suspense } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import('./pages/home'));
const DistSourceOrgNat = React.lazy(() => import('./pages/dist-source-org-nat'));

const routes = [
  { path: "/", component: HomePage },
  { path: "/distribution-source-organism-natural", component: DistSourceOrgNat },
];

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
