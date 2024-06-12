import React from 'react';
import { Link } from 'react-router-dom';

const DistSourceOrgNat: React.FC = () => {
  return (
    <main className="container mt-5">
      <section className="row">
        <article className="col-12">
          <div className="card">
            <div className="card-body">
              <h3>PDB Statistics: PDB Data Distribution by Natural Source Organism</h3>
              <Link to="/">Return Home</Link>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default DistSourceOrgNat;