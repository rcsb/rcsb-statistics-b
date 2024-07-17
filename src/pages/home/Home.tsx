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
    <ListGroup items={listItems} />
  </article>
  );
};

export default HomePage;