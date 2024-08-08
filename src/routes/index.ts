import { lazy } from 'react';
import paths from './paths';

const routes = [
  { path: paths.HOME, element: lazy(() => import('../pages/Home')), exact: true },
  { path: paths.PDB_DATA_GROWTH, element: lazy(() => import('../pages/PdbDataGrowth')) },
  { path: paths.PDB_DATA_DISTRIBUTION, element: lazy(() => import('../pages/PdbDataDistribution')) },
  { path: paths.OTHER_STATISTICS, element: lazy(() => import('../pages/other-stats')) },
  { path: paths.PDB_DATA_SNAPSHOT, element: lazy(() => import('../pages/pdb-data-snapshot')) }
];

export default routes;
