import React from 'react';
import {
  SkeletonContainer,
  SkeletonTitle,
  SkeletonChart,
  SkeletonBar,
  SkeletonXAxis,
  SkeletonYAxis,
  SkeletonFilterSection,
  SkeletonFilter
} from '../../styles/SkeletonStyles';

const HorizontalChartSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      <div style={{ width: '80%' }}>
        <SkeletonTitle />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SkeletonXAxis />
          <SkeletonChart horizontal>
            <SkeletonBar width="20%" />
            <SkeletonBar width="30%" />
            <SkeletonBar width="40%" />
            <SkeletonBar width="50%" />
            <SkeletonBar width="60%" />
            <SkeletonBar width="70%" />
            <SkeletonBar width="80%" />
            <SkeletonBar width="85%" />
            <SkeletonBar width="90%" />
            <SkeletonBar width="95%" />
            <SkeletonBar width="100%" />
          </SkeletonChart>
          <SkeletonYAxis />
        </div>
      </div>
      <SkeletonFilterSection>
        <SkeletonFilter />
        <SkeletonFilter />
        <SkeletonFilter />
      </SkeletonFilterSection>
    </SkeletonContainer>
  );
};

export default HorizontalChartSkeleton;
