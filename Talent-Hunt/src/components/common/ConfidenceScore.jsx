// src/components/common/ConfidenceScore/ConfidenceScore.jsx
import React from 'react';

const ConfidenceScore = ({ score }) => {
  // Determine color based on score
  const getColorClass = () => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };
  
  const getFillColorClass = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between mb-1">
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${getColorClass()}`}>
          {score}%
        </span>
        <span className="text-xs text-gray-500">Confidence</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${getFillColorClass()} transition-all duration-500 ease-out`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ConfidenceScore;