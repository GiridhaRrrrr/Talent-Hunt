// src/utils/formatting.js
/**
 * Format a date string to a readable format
 * @param {string} dateString - ISO date string
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
    if (!dateString) return 'Present';
    
    const defaultOptions = {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    return new Date(dateString).toLocaleDateString('en-US', mergedOptions);
  };
  
  /**
   * Calculate duration between two dates in years and months
   * @param {string} startDate - Start date string
   * @param {string} endDate - End date string (optional, defaults to current date)
   * @returns {string} - Formatted duration string
   */
  export const calculateDuration = (startDate, endDate) => {
    if (!startDate) return 'Unknown duration';
    
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    
    const totalMonths = years * 12 + months;
    const displayYears = Math.floor(totalMonths / 12);
    const displayMonths = totalMonths % 12;
    
    let duration = '';
    
    if (displayYears > 0) {
      duration += `${displayYears} ${displayYears === 1 ? 'year' : 'years'}`;
    }
    
    if (displayMonths > 0 || displayYears === 0) {
      if (duration) duration += ', ';
      duration += `${displayMonths} ${displayMonths === 1 ? 'month' : 'months'}`;
    }
    
    return duration;
  };
  
  /**
   * Format a number with commas as thousands separators
   * @param {number} number - Number to format
   * @returns {string} - Formatted number string
   */
  export const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  /**
   * Truncate a string to a specified length and add ellipsis
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} - Truncated text
   */
  export const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    
    return text.substring(0, maxLength) + '...';
  };