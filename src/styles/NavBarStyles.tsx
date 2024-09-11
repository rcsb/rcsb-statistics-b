import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Navbar = styled.nav`
  min-height: 30px;

  @media (max-width: 768px) {
    .collapse {
      background-color: #f8f9fa;
      padding: 1rem;
    }
  }
`;

export const NavbarBrand = styled.a`
  height: 30px;
  padding: 5px 15px;
  color: #333;

  &:hover {
    color: #555;
  }
`;

export const NavLink = styled(RouterLink)`

  color: #333;

  &:hover {
    color: #555;
  }

  &.active {
    font-weight: bold !important;
  }
`;

export const NavbarToggler = styled.button`
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

export const NavbarTogglerIcon = styled.span`
  display: block;
  width: 22px;
  height: 2px;
  background-color: #333;
  position: relative;
  top: 0;
  transition: all 0.3s ease;

  &:before,
  &:after {
    content: '';
    display: block;
    width: 22px;
    height: 2px;
    background-color: #333;
    position: absolute;
    transition: all 0.3s ease;
  }

  &:before {
    top: -6px;
  }

  &:after {
    top: 6px;
  }
`;

export const NavItem = styled.li`
  &.active > ${NavLink} {
    font-weight: bold !important;
  }

  a {
    height: 30px;
    padding: 5px 15px !important;
  }

  
  
  button {
    margin-top: 5px;
    padding: 0 !important;
  }
`;

export const NavbarCollapse = styled.div`
  @media (max-width: 768px) {
    background-color: #f8f9fa;
    padding: 1rem;
  }
`;

export const NavDropdown = styled(NavItem)`
  position: relative;

  &:hover .dropdown-menu {
    display: block !important;  /* Show dropdown on hover */
  }

  &:hover > ${NavLink} {
    font-weight: bold !important;  /* Enforce bold on hover */
  }

  .triangle {
    display: inline-block;
    width: 8px;
    aspect-ratio: 1;
    clip-path: polygon(0 0, 100% 0, 50% 70%);
    background-color: #000;
    margin-left: 8px;
    transition: transform 0.3s ease;
  }
  
  

  &:hover .triangle {
    transform: rotate(-90deg)
  }
`;

export const DropdownToggle = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;

  &.active {
    font-weight: bold !important;
  }
`;

export const DropdownMenu = styled.ul`
  display: none;  /* Hide by default */
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 14px;
  color: #333;
  text-align: left;
  list-style: none;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  flex-direction: column;
`;

export const DropdownItem = styled.li`
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  color: #333;
  white-space: nowrap;
  background: none;
  border: 0;
  cursor: pointer;
  display: block;
  width: 100%;

  &:hover {
    background-color: #f8f9fa;
  }

  ${NavLink} {
    color: inherit;
    text-decoration: none;
    display: block;
    width: 100%;
  }
`;
