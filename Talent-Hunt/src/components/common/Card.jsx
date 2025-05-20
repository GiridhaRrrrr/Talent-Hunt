// src/components/common/Card/Card.jsx
import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hoverable = false, 
  onClick = null 
}) => {
  const baseClasses = "bg-white rounded-xl shadow-md overflow-hidden";
  const hoverClasses = hoverable ? "transition-all duration-300 hover:shadow-xl hover:-translate-y-1" : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;