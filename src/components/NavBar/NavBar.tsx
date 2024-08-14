import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavLink,
  NavbarToggler,
  NavbarTogglerIcon,
  NavItem,
  NavbarCollapse,
  NavDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from './NavBarStyles';
import paths from '../../routes/paths';

const isActivePath = (locationPathname: string, basePath: string): boolean => {
  return locationPathname.startsWith(basePath);
};

const NavBar: React.FC = () => {
  const location = useLocation();
  const isDataGrowthActive = isActivePath(location.pathname, paths.PDB_DATA_GROWTH_BY_EXPERIMENTAL);
  const isDataDistributionActive = isActivePath(location.pathname, paths.PDB_DATA_DISTRIBUTION);

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
            <NavDropdown className={`nav-item dropdown ${isDataGrowthActive ? 'active' : ''}`}>
              <DropdownToggle className={`nav-item nav-link dropdown-toggle ${location.pathname.startsWith('/growth') ? 'active' : ''}`} as="a">
                Data Growth
                <span className="triangle" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu">
                <DropdownItem as={Link} to={paths.PDB_DATA_GROWTH_BY_EXPERIMENTAL}>
                  By Experimental Method
                </DropdownItem>
                <DropdownItem className="disabled" as={Link} to={paths.PDB_DATA_GROWTH_BY_MOLECULAR}>
                  By Molecular Composition
                </DropdownItem>
                <DropdownItem className="disabled" as={Link} to={paths.PDB_DATA_GROWTH_BY_ASSEMBLY}>
                  By Assembly Symmetry
                </DropdownItem>
                <DropdownItem className="disabled" as={Link} to={paths.PDB_DATA_GROWTH_BY_DOMAINS}>
                  By Number of Domains
                </DropdownItem>
                <DropdownItem className="disabled" as={Link} to={paths.PDB_DATA_GROWTH_BY_UNIQUE}>
                  By Unique Protein Sequences
                </DropdownItem>
              </DropdownMenu>
            </NavDropdown>
            <NavDropdown className={`nav-item dropdown ${isDataDistributionActive ? 'active' : ''}`}>
              <DropdownToggle className={`nav-item nav-link dropdown-toggle ${location.pathname === paths.PDB_DATA_DISTRIBUTION ? 'active' : ''}`} as="a">
                Data Distribution
                 <span className="triangle" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu">
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION}>
                  By Method and Molecular Type
                </DropdownItem>
                <DropdownItem className="disabled" as={Link} to={paths.PDB_DATA_DISTRIBUTION}>
                  By Source Organism
                </DropdownItem>
                <DropdownItem className="disabled" as={Link} to={paths.PDB_DATA_DISTRIBUTION}>
                  By Expression System
                </DropdownItem>
                <DropdownItem className="disabled" as={Link} to={paths.PDB_DATA_DISTRIBUTION}>
                  By Residue Count
                </DropdownItem>
              </DropdownMenu>
            </NavDropdown>
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
