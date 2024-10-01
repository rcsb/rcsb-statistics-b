import styled from 'styled-components';

export const ColorGrid = styled.div`
  display: flex;
  margin-left: 10px;
`;

export const ColorBox = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  margin-right: 1px;
  border-radius: 2px;
  cursor: pointer;
  position: relative;

  &:last-child {
    margin-right: 0;
  }
`;

export const ColorSchemeContainer = styled.label`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  width: 100%;
`;

export const SchemeName = styled.span`
  margin-left: 5px;
  min-width: 130px;
  text-transform: capitalize;
  margin-right: 10px;
`;

export const RadioInput = styled.input`
  margin-right: 10px;
`;

export const Popover = styled.div<{ top: number; left: number }>`
  position: absolute;
  z-index: 2;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

export const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
