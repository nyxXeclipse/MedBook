import React from 'react';

const SkeletonLoader = ({ rows = 5 }) => {
  return (
    <div className="space-y-3 p-5" aria-label="Loading appointments">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="grid animate-pulse grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {Array.from({ length: 7 }).map((_, cell) => <div key={cell} className="h-8 rounded bg-slate-200"></div>)}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
