import styled from 'styled-components';

export const Article = styled.article`
  width: 100%;
  margin: 0 auto;

  canvas {
    margin-left: -100px;
    max-width: 90%;
  }
`;

export const FullWidthCol = styled.div`
  width: 100%;
  padding: 0 15px;
`;

export const ColorBoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

export const ColorBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ColorBox = styled.div<{ bgColor: string }>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.bgColor};
  margin-right: 10px;
`;

export const BoxText = styled.div`
  font-size: 1.2rem;
`;
