// src/components/common/Button/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  type = 'button', 
  fullWidth = false, 
  disabled = false, 
  onClick, 
  className = '',
  icon = null
}) => {
  // Base classes
  const baseClasses = "flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 ease-in-out focus:outline-none";
  
  // Variant specific classes
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-800 text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
    secondary: "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:-translate-y-0.5 active:translate-y-0",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50"
  };
  
  // Size classes
  const sizeClasses = {
    small: "py-1.5 px-3 text-sm",
    medium: "py-2 px-4 text-base",
    large: "py-3 px-6 text-lg"
  };
  
  // Width class
  const widthClass = fullWidth ? "w-full" : "";
  
  // Disabled class
  const disabledClass = disabled ? "opacity-60 cursor-not-allowed hover:transform-none hover:shadow-none" : "cursor-pointer";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${widthClass} 
        ${disabledClass}
        ${className}
      `}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;