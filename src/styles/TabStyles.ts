import styled from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 10px;
  background-color: ${(props) => (props.active ? '#808080' : '#f0f0f0')};
  border: 1px solid #a9a9a9;
  color: ${(props) => (props.active ? '#fff' : '#808080')};
  cursor: pointer;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  &:focus {
    outline: none;
  }
`;

export const TabContent = styled.div`
  padding: 20px;
  border: 1px solid #a9a9a9;
  margin-top: -1px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;