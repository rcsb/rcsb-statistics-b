import React from 'react';
import { Link } from 'react-router-dom';

const Summary: React.FC = () => {

  return (
      <article className="col-12">
        <h4>PDB Data Distribution by Experimental Method and Molecular Type</h4>

        <div>(data table goes here)</div>

        {/* <Link to="/">All Statistics</Link> */}
      </article>
  );
};

export default Summary;