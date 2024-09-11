import styled, { keyframes, css } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const ShimmerEffect = css`
  background: linear-gradient(90deg, #f4f4f4 25%, #e0e0e0 50%, #f4f4f4 75%);
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: 4px;
`;

const SkeletonBox = styled.div<{ height?: string; width?: string }>`
  ${(props) => props.height && `height: ${props.height};`}
  ${(props) => props.width && `width: ${props.width};`}
  ${ShimmerEffect}
`;

export const SkeletonContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 8px;
  height: 500px;
`;
export const SkeletonTitle = styled(SkeletonBox).attrs({
  height: '30px',
  width: '50%',
})`
  margin-bottom: 20px;
`;

export const SkeletonChart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 400px; 
  margin-top: 20px;
  border-radius: 8px;
`;

export const SkeletonBar = styled(SkeletonBox).attrs<{ height: string }>({
  width: '3%',
})`
  height: ${(props) => props.height};
`;

export const SkeletonXAxis = styled(SkeletonBox).attrs({
  height: '10px',
  width: '100%',
})`
  margin-top: 10px;
`;

export const SkeletonYAxis = styled(SkeletonBox).attrs({
  height: '100%',
  width: '10px',
})`
  margin-right: 10px;
`;

export const SkeletonFilterSection = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SkeletonFilter = styled(SkeletonBox).attrs({
  height: '20px',
  width: '80%',
})`
  margin-bottom: 10px;
`;
