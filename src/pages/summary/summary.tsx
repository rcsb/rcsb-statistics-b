import React from 'react';
import { Link } from 'react-router-dom';

const Summary: React.FC = () => {

  return (
    <main className="container mt-5">
      <section className="row">
        <article className="col-12">
          <div className="card">
            <div className="card-body">
                <h2>PDB Data Distribution by Experimental Method and Molecular Type</h2>
               
                <div>(data table goes here)</div>

                <Link to="/">All Statistics</Link>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Summary;