import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  background-color: #f8f9fa; /* Light background */
  .navbar-brand {
    color: #333;
  }
  .nav-link {
    color: #333;
    &:hover {
      color: #555;
    }
    &.disabled {
      color: #ccc;
    }
  }
  .navbar-toggler {
    border-color: rgba(0, 0, 0, 0.1);
  }
  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,..."); /* SVG for toggler icon */
  }
  .nav-item.active .nav-link {
    font-weight: bold;
  }
  .collapse.navbar-collapse {
    @media (max-width: 991.98px) {
      background-color: #f8f9fa;
      padding: 1rem;
    }
  }
`;
