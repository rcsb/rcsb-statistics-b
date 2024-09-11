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

const ChartSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      <div style={{ width: '80%' }}>
        <SkeletonTitle />
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <SkeletonYAxis />
          <SkeletonChart>
            <SkeletonBar height="20%" />
            <SkeletonBar height="30%" />
            <SkeletonBar height="40%" />
            <SkeletonBar height="50%" />
            <SkeletonBar height="60%" />
            <SkeletonBar height="70%" />
            <SkeletonBar height="80%" />
            <SkeletonBar height="85%" />
            <SkeletonBar height="90%" />
            <SkeletonBar height="95%" />
            <SkeletonBar height="100%" />
          </SkeletonChart>
        </div>
        <SkeletonXAxis />
      </div>
      <SkeletonFilterSection>
        <SkeletonFilter />
        <SkeletonFilter />
        <SkeletonFilter />
      </SkeletonFilterSection>
    </SkeletonContainer>
  );
};

export default ChartSkeleton;
