import styled from 'styled-components';

export const Label = styled.label`
  display: block;
  font-size: 1.2em;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: 300px;
  padding: 0.5em;
  font-size: 1em;
  border-radius: 4px;
  margin-bottom: 1em;
`;

export const SectionContainer = styled.div`
  flex: 1;
  margin: 0 20px 10px 0;
  max-width: 350px;
  min-height: 200px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to top, white, transparent);
  }
`;

export const SectionHeader = styled.h5`
  background-color: #f0f0f0;
  padding: 10px;
  margin: 0;
`;