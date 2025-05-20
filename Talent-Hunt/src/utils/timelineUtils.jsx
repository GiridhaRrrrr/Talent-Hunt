// src/utils/timelineUtils.js
/**
 * Sort company experiences by start date (most recent first)
 * @param {Array} companies - Array of company objects with startDate property
 * @returns {Array} - Sorted array of companies
 */
export const sortCompaniesByDate = (companies = []) => {
    return [...companies].sort((a, b) => {
      const dateA = new Date(a.startDate || '2000-01-01');
      const dateB = new Date(b.startDate || '2000-01-01');
      return dateB - dateA;
    });
  };
  
  /**
   * Calculate total years of experience from company data
   * @param {Array} companies - Array of company objects with startDate and endDate properties
   * @returns {number} - Total years of experience
   */
  export const calculateTotalExperience = (companies = []) => {
    if (!companies || companies.length === 0) return 0;
    
    const currentYear = new Date().getFullYear();
    let totalMonths = 0;
    
    // Track dates to avoid double counting overlapping employment periods
    const allMonths = new Set();
    
    companies.forEach(company => {
      if (company.startDate) {
        const startDate = new Date(company.startDate);
        const endDate = company.endDate ? new Date(company.endDate) : new Date();
        
        // Get all months in the employment period
        let current = new Date(startDate);
        while (current <= endDate) {
          const monthYearKey = `${current.getFullYear()}-${current.getMonth()}`;
          allMonths.add(monthYearKey);
          
          // Move to next month
          current.setMonth(current.getMonth() + 1);
        }
      }
    });
    
    // Count unique months
    totalMonths = allMonths.size;
    
    // Convert to years
    return Math.round(totalMonths / 12 * 10) / 10; // Round to 1 decimal place
  };
  
  /**
   * Check if a person has 10+ years of experience
   * @param {Array} companies - Array of company experiences
   * @returns {boolean} - True if 10+ years of experience
   */
  export const hasVeteranStatus = (companies = []) => {
    const totalYears = calculateTotalExperience(companies);
    return totalYears >= 10;
  };