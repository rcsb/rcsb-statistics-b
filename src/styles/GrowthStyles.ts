import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateZ(0) scale(0.995);
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
