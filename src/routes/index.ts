import { lazy } from 'react';
import paths from './paths';

const routes = [
  { path: paths.HOME, element: lazy(() => import('../pages/Home')), exact: true },
  { path: paths.PDB_DATA_GROWTH_OVERALL_STRUCTURES, element: lazy(() => import('../pages/PdbDataGrowth/OverallStructures'))},
  { path: paths.PDB_DATA_GROWTH_OVERALL_SMALL_MOLECULES, element: lazy(() => import('../pages/PdbDataGrowth/OverallSmallMolecules')) },
  { path: paths.PDB_DATA_GROWTH_BY_EXPERIMENTAL, element: lazy(() => import('../pages/PdbDataGrowth/ExperimentalMethod')) },
  { path: paths.PDB_DATA_GROWTH_BY_MOLECULAR, element: lazy(() => import('../pages/PdbDataGrowth/MolecularComposition')) },
  { path: paths.PDB_DATA_GROWTH_BY_ASSEMBLY, element: lazy(() => import('../pages/PdbDataGrowth/AssemblySymmetry')) },
  { path: paths.PDB_DATA_GROWTH_BY_DOMAINS, element: lazy(() => import('../pages/PdbDataGrowth/NumberOfDomains')) },
  { path: paths.PDB_DATA_GROWTH_BY_UNIQUE, element: lazy(() => import('../pages/PdbDataGrowth/UniqueProteinSequences')) },
  { path: paths.PDB_DATA_GROWTH2(':plotname'), element: lazy(() => import('../pages/PdbDataGrowth2/Growth')) },
  { path: paths.PDB_DATA_DISTRIBUTION, element: lazy(() => import('../pages/PdbDataDistribution')) },
  { path: paths.OTHER_STATISTICS, element: lazy(() => import('../pages/OtherStats')) },
  { path: paths.PDB_DATA_SNAPSHOT, element: lazy(() => import('../pages/PdbDataSnapshot')) }
];


export default routes;
