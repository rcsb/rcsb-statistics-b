const paths = {
  HOME: '/',
  PDB_DATA_GROWTH: (plotname: string) => `/growth/${plotname}`,
  PDB_DATA_DISTRIBUTION: (plotname: string) => `/distribution/${plotname}`,
  OTHER_STATISTICS: '/other-statistics',
  PDB_DATA_SNAPSHOT: '/pdb-data-snapshot',
};

export default paths;
