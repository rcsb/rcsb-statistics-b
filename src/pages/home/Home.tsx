import React from 'react';
import ListGroup from '../../components/ListGroup';

const HomePage: React.FC = () => {
  const listItems = [
    { text: 'by Natural Source Organism', link: '/distribution-source-organism-natural' },
    { text: 'by Experimental Method and Molecular Type', link: '/distribution-source-organism-natural' },
  ];

  return (
    <main className="container mt-5">
      <section className="row">
        <article className="col-12">
          <div className="card">
            <div className="card-body">
              <h1>PDB Statistics 2024</h1>
              <ListGroup items={listItems} />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default HomePage;