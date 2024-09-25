import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: .5;
    transform: translateZ(0) scale(0.999);
  }
  to {
    opacity: 1;
    transform: translateZ(0) scale(1);
  }
`;

export const FadeInContainer = styled.div`
  animation: ${fadeIn} .5s ease-in;
  will-change: opacity, transform;
`;

export const SearchApiContainer = styled.div` 
  display: flex;
  justify-content: flex-end;
`;

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e7e7e7;
  border-radius: 3px;
  padding: 3px 5px;

  & svg { 
    margin-right: 5px; 
  }
`;