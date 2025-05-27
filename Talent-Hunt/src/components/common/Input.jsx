import React, { useState } from 'react';

const Input = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  autoComplete = 'off',
  minLength,
  maxLength,
  icon = null
}) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value;

  return (
    <div className={`relative mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={name} 
          className={`block text-sm transition-all duration-200 ease-in-out ${
            isActive 
              ? 'text-blue-600 transform -translate-y-6' 
              : 'text-gray-600'
          }`}
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full px-4 py-2 
            ${icon ? 'pl-10' : ''} 
            border rounded-lg transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;