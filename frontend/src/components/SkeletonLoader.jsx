import React from 'react';

const SkeletonLoader = ({ rows = 5 }) => {
  return (
    <div className="skeleton-container">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="skeleton-row">
          <div className="skeleton-cell skeleton-name"></div>
          <div className="skeleton-cell skeleton-doctor"></div>
          <div className="skeleton-cell skeleton-date"></div>
          <div className="skeleton-cell skeleton-badge"></div>
          <div className="skeleton-cell skeleton-fee"></div>
          <div className="skeleton-cell skeleton-status"></div>
          <div className="skeleton-cell skeleton-actions"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
