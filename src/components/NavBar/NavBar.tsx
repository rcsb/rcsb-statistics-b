import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavLink,
  NavbarToggler,
  NavbarTogglerIcon,
  NavItem,
  NavbarCollapse
} from './NavBarStyles';

const NavBar: React.FC = () => {
  return (
    <Navbar className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <NavbarToggler
            className="navbar-toggle"
            type="button"
            data-toggle="collapse"
            data-target="#statsnavbarnav"
            aria-controls="statsnavbarnav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <NavbarTogglerIcon className="icon-bar" />
            <NavbarTogglerIcon className="icon-bar" />
            <NavbarTogglerIcon className="icon-bar" />
          </NavbarToggler>
          <NavbarBrand className="navbar-brand" href="#">
            <NavLink as={Link} to="/">RCSB Statistics</NavLink>
          </NavbarBrand>
        </div>
        <NavbarCollapse className="collapse navbar-collapse" id="statsnavbarnav">
          <ul className="nav navbar-nav">
            <NavItem className="nav-item active">
              <NavLink as={Link} to="/">About RCSB Statistics <span className="sr-only">(current)</span></NavLink>
            </NavItem>
            
            <NavItem className="nav-item">
              <NavLink as={Link} to="/distribution-source-organism-natural">Data Growth</NavLink>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink as={Link} to="/summary">Data Distribution</NavLink>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink as={Link} to="/">Other Statistics</NavLink>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink as={Link} to="/">PDB Data Snapshot</NavLink>
            </NavItem>
          </ul>
        </NavbarCollapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
