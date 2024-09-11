import { lazy } from 'react';
import paths from './paths';

const routes = [
  { path: paths.HOME, element: lazy(() => import('../pages/Home')), exact: true },
  { path: paths.PDB_DATA_GROWTH(':plotname'), element: lazy(() => import('../pages/PdbDataGrowth/Growth')) },
  { path: paths.PDB_DATA_DISTRIBUTION(':plotname'), element: lazy(() => import('../pages/PdbDataDistribution/Distribution')) },
  { path: paths.OTHER_STATISTICS, element: lazy(() => import('../pages/OtherStats')) },
  { path: paths.PDB_DATA_SNAPSHOT, element: lazy(() => import('../pages/PdbDataSnapshot')) }
];


export default routes;
