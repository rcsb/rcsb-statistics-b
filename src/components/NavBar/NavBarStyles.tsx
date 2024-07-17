import styled, { css } from 'styled-components';

const statsRootStyles = css`
  // background-color: lime;
  min-height: 30px;

  a {
    color: #333;
    &:hover {
      color: #555;
    }
    &.disabled {
      color: #ccc;
    }
  }

  .navbar-brand {
    height: 30px;
    padding: 5px 15px;
    color: #333;
    &:hover {
      color: #555;
    }
  }

  .nav-item.active a {
    font-weight: bold;
  }

  .navbar-toggle {
    border: none;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  }

  .icon-bar {
    display: block;
    width: 22px;
    height: 2px;
    background-color: #333;
    position: relative;
    top: 0;
    transition: all 0.3s ease;
    &:before, &:after {
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
  }

  .nav-item, {
    a {
      // background-color: orange;
      height: 30px;
      padding: 5px 15px;
    }
  }

  @media (max-width: 768px) {
    .collapse {
      background-color: #f8f9fa;
      padding: 1rem;
    }
  }
`;

export const Navbar = styled.nav`
  ${statsRootStyles}
`;

export const NavbarBrand = styled.a`
  ${statsRootStyles}
`;

export const NavLink = styled.a`
  ${statsRootStyles}
`;

export const NavbarToggler = styled.button`
  ${statsRootStyles}
`;

export const NavbarTogglerIcon = styled.span`
  ${statsRootStyles}
`;

export const NavItem = styled.li`
  ${statsRootStyles}
`;

export const NavbarCollapse = styled.div`
  ${statsRootStyles}
`;
