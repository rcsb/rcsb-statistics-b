import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavLink,
  NavbarToggler,
  NavbarTogglerIcon,
  NavItem,
  NavbarCollapse
} from './NavBarStyles';
import paths from '../../routes/paths';

const NavBar: React.FC = () => {
  const location = useLocation();

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
            <NavItem className={`nav-item ${location.pathname === paths.HOME ? 'active' : ''}`}>
              <NavLink as={Link} to={paths.HOME}>About RCSB Statistics <span className="sr-only">(current)</span></NavLink>
            </NavItem>
            <NavItem className={`nav-item ${location.pathname === paths.PDB_DATA_GROWTH ? 'active' : ''}`}>
              <NavLink as={Link} to={paths.PDB_DATA_GROWTH}>Data Growth</NavLink>
            </NavItem>
            <NavItem className={`nav-item ${location.pathname === paths.PDB_DATA_DISTRIBUTION ? 'active' : ''}`}>
              <NavLink as={Link} to={paths.PDB_DATA_DISTRIBUTION}>Data Distribution</NavLink>
            </NavItem>
            <NavItem className={`nav-item ${location.pathname === paths.OTHER_STATISTICS ? 'active' : ''}`}>
              <NavLink as={Link} to={paths.OTHER_STATISTICS}>Other Statistics</NavLink>
            </NavItem>
            <NavItem className={`nav-item ${location.pathname === paths.PDB_DATA_SNAPSHOT ? 'active' : ''}`}>
              <NavLink as={Link} to={paths.PDB_DATA_SNAPSHOT}>PDB Data Snapshot</NavLink>
            </NavItem>
          </ul>
        </NavbarCollapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
