import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, DistSourceOrgNat } from './pages';

function App() {

  const routes = [
    { path: "/", component: HomePage },
    { path: "/distribution-source-organism-natural", component: DistSourceOrgNat },
  ];


  return (
    <Router>
      <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.component />} />
      ))}
      </Routes>
    </Router>
  );
}

export default App;