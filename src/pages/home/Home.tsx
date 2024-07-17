import React from 'react';
import ListGroup from '../../components/ListGroup';

const HomePage: React.FC = () => {
  const listItems = [
    { text: 'by Experimental Method and Molecular Type', link: '/summary' },
    { text: 'by Natural Source Organism', link: '/distribution-source-organism-natural' },
  ];

  return (
  <article className="col-12">
    <h3>PDB Statistics 2024. </h3>

    <p>These statistics are generated using Web Services and represent the current holdings of the archive. wwPDB hosts statistics on PDB Data Deposited and Data Downloaded. The statistics can be divided into 2 major types: data growth and data distribution. Each of these statistics Options for each type are accessible from the statistics top menu. The data snapshot for current major types of data is available.</p>
        
    <ListGroup items={listItems} />
  </article>
  );
};

export default HomePage;