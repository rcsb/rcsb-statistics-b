// src/components/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { StyledNavbar } from './NavBarStyles';

const NavBar: React.FC = () => {
  return (
    <StyledNavbar>
      <div className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="#">RCSB Statistics</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">About RCSB Statistics <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/distribution-source-organism-natural">Data Growth</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/summary">Data Distribution</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    </StyledNavbar>
  );
};

export default NavBar;
