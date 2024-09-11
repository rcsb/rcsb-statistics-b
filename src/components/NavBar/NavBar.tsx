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
} from '../../styles/NavBarStyles';
import paths from '../../routes/paths';
import { FaCog } from 'react-icons/fa';
import { useModal } from '../../contexts/ModalContext';

const isActivePath = (locationPathname: string, basePath: string): boolean => {
  return locationPathname.startsWith(basePath);
};

const NavBar: React.FC = () => {
  const location = useLocation();
  const isDataGrowthActive = isActivePath(location.pathname, '/growth'); 
  const isDataDistributionActive = isActivePath(location.pathname, '/distribution');

  const { handleOpenModal } = useModal();

  return (
    <>
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
                  <DropdownItem as={Link} to={paths.PDB_DATA_GROWTH('overall-structures')}>
                    By Overall Structures
                  </DropdownItem>
                  <DropdownItem as={Link} to={paths.PDB_DATA_GROWTH('overall-small-molecules')}>
                    By Overall Small Molecules
                  </DropdownItem>
                  <DropdownItem as={Link} to={paths.PDB_DATA_GROWTH('experimental-method')}>
                    By Experimental Method
                  </DropdownItem>
                  <DropdownItem as={Link} to={paths.PDB_DATA_GROWTH('molecular-composition')}>
                    By Molecular Composition
                  </DropdownItem>
                  <DropdownItem as={Link} to={paths.PDB_DATA_GROWTH('assembly-symmetry')}>
                    By Assembly Symmetry
                  </DropdownItem>
                  <DropdownItem as={Link} to={paths.PDB_DATA_GROWTH('number-of-domains')}>
                    By Number of Domains
                  </DropdownItem>
                  <DropdownItem as={Link} to={paths.PDB_DATA_GROWTH('unique-protein-sequences')}>
                    By Unique Protein Sequences
                  </DropdownItem>
                </DropdownMenu>
              </NavDropdown>
              <NavDropdown className={`nav-item dropdown ${isDataDistributionActive ? 'active' : ''}`}>
                <DropdownToggle className={`nav-item nav-link dropdown-toggle ${location.pathname.startsWith('/distribution')  ? 'active' : ''}`} as="a">
                  Data Distribution
                   <span className="triangle" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu">
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('resolution')}>
                  By Resolution
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('r-free')}>
                  By R-free
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('molecular-weight-structure')}>
                  By Molecular Weight (Structure)
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('atom-count')}>
                  By Atom Count
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('residue-count')}>
                  By Residue Count
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('macromolecular-composition')}>
                  By Macromolecular Composition
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('source-organism-natural')}>
                  By Source Organism
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('taxonomy')}>
                  By Taxonomy
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('software')}>
                  By Processing Software
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('space-group')}>
                  By Space Groups
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('journal')}>
                  By Publication Journal
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('structural-genomics-centers')}>
                  By Structural Genomics Centers
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('enzyme-classification-name')}>
                  By Enzyme Classification
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('assembly-symmetry')}>
                  By Assembly Symmetry
                </DropdownItem>
                <DropdownItem as={Link} to={paths.PDB_DATA_DISTRIBUTION('scop-classification')}>
                  By SCOP Classification
                </DropdownItem>

                </DropdownMenu>
              </NavDropdown>
              <NavItem className={`nav-item ${location.pathname === paths.OTHER_STATISTICS ? 'active' : ''}`}>
                <NavLink as={Link} to={paths.OTHER_STATISTICS}>Other Statistics</NavLink>
              </NavItem>
              <NavItem className={`nav-item ${location.pathname === paths.PDB_DATA_SNAPSHOT ? 'active' : ''}`}>
                <NavLink as={Link} to={paths.PDB_DATA_SNAPSHOT}>PDB Data Snapshot</NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleOpenModal}>
                  <FaCog />
                </button>
              </NavItem>
            </ul>
          </NavbarCollapse>
        </div>
      </Navbar>
    </>
  );
};

export default NavBar;
