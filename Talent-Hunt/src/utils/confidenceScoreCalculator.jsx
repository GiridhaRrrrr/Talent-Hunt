/**
 * Calculate confidence score based on various factors
 * @param {Object} expert - Expert data object
 * @param {number} keywordRelevance - Keyword match score (0-1)
 * @returns {number} - Confidence score (0-100)
 */
export const calculateConfidenceScore = (expert, keywordRelevance = 0.5) => {
    if (!expert) return 0;
    
    // Weight factors
    const weights = {
      experience: 0.35,      // Years of experience
      keywordMatch: 0.25,    // Keyword relevance
      sourceDiversity: 0.20, // Number of different sources verifying experience
      profileCompleteness: 0.10, // How complete the profile is
      recentActivity: 0.10   // Recent activity in the field
    };
    
    // Calculate experience score (0-1)
    const experienceScore = calculateExperienceScore(expert.companies || []);
    
    // Calculate source diversity score (0-1)
    const sourceDiversityScore = calculateSourceDiversityScore(expert.sources || []);
    
    // Calculate profile completeness score (0-1)
    const profileCompletenessScore = calculateProfileCompletenessScore(expert);
    
    // Calculate recent activity score (0-1)
    const recentActivityScore = calculateRecentActivityScore(expert.companies || []);
    
    // Calculate final score
    const score = 
      experienceScore * weights.experience +
      keywordRelevance * weights.keywordMatch +
      sourceDiversityScore * weights.sourceDiversity +
      profileCompletenessScore * weights.profileCompleteness +
      recentActivityScore * weights.recentActivity;
    
    // Convert to 0-100 scale and round
    return Math.round(score * 100);
  };
  
  /**
   * Calculate experience score based on years of experience
   * @param {Array} companies - Array of company experiences
   * @returns {number} - Experience score (0-1)
   */
  export const calculateExperienceScore = (companies) => {
    if (!companies || companies.length === 0) return 0;
    
    const currentYear = new Date().getFullYear();
    let totalYears = 0;
    
    companies.forEach(company => {
      if (company.startDate) {
        const startYear = new Date(company.startDate).getFullYear();
        const endYear = company.endDate 
          ? new Date(company.endDate).getFullYear() 
          : currentYear;
        
        totalYears += endYear - startYear;
      }
    });
    
    // Cap at 15 years for score purposes
    const cappedYears = Math.min(totalYears, 15);
    
    // Calculate score (0-1)
    // 10 years is the threshold for veteran status (0.8 score)
    // 15+ years is maximum score (1.0)
    if (cappedYears < 10) {
      return (cappedYears / 10) * 0.8; // Linear scale up to 0.8 for <10 years
    } else {
      return 0.8 + ((cappedYears - 10) / 5) * 0.2; // 0.8-1.0 scale for 10-15 years
    }
  };
  
  /**
   * Calculate source diversity score based on number of different verification sources
   * @param {Array} sources - Array of source names
   * @returns {number} - Source diversity score (0-1)
   */
  export const calculateSourceDiversityScore = (sources) => {
    if (!sources || sources.length === 0) return 0;
    
    // Count unique sources
    const uniqueSources = new Set(sources);
    
    // Calculate score based on number of unique sources
    // 1 source = 0.3, 2 sources = 0.6, 3+ sources = 0.9, 5+ sources = 1.0
    const count = uniqueSources.size;
    
    if (count >= 5) return 1.0;
    if (count >= 3) return 0.9;
    if (count === 2) return 0.6;
    if (count === 1) return 0.3;
    
    return 0;
  };
  
  /**
   * Calculate profile completeness score
   * @param {Object} expert - Expert data object
   * @returns {number} - Profile completeness score (0-1)
   */
  export const calculateProfileCompletenessScore = (expert) => {
    if (!expert) return 0;
    
    // Fields to check for completeness
    const fields = [
      'name',
      'location',
      'bio',
      'email',
      'linkedin',
      'technologies'
    ];
    
    // Calculate completeness
    let completedFields = 0;
    
    fields.forEach(field => {
      if (expert[field]) {
        // Array fields should have at least one item
        if (Array.isArray(expert[field])) {
          if (expert[field].length > 0) {
            completedFields++;
          }
        } else {
          completedFields++;
        }
      }
    });
    
    // Companies field should have at least one item with startDate and title
    if (expert.companies && expert.companies.length > 0) {
      const hasCompleteCompany = expert.companies.some(
        company => company.startDate && company.title && company.name
      );
      
      if (hasCompleteCompany) {
        completedFields++;
      }
    }
    
    // Calculate score (0-1)
    return completedFields / (fields.length + 1);
  };
  
  /**
   * Calculate recent activity score based on recency of work
   * @param {Array} companies - Array of company experiences
   * @returns {number} - Recent activity score (0-1)
   */
  export const calculateRecentActivityScore = (companies) => {
    if (!companies || companies.length === 0) return 0;
    
    const currentYear = new Date().getFullYear();
    
    // Find the most recent end date (or current if still working)
    let mostRecentYear = 0;
    
    companies.forEach(company => {
      const endYear = company.endDate 
        ? new Date(company.endDate).getFullYear() 
        : currentYear;
      
      if (endYear > mostRecentYear) {
        mostRecentYear = endYear;
      }
    });
    
    // Calculate score based on recency
    // Current = 1.0, Within 1 year = 0.9, 2 years = 0.8, etc.
    const yearsSinceActive = currentYear - mostRecentYear;
    
    if (yearsSinceActive === 0) return 1.0;
    if (yearsSinceActive === 1) return 0.9;
    if (yearsSinceActive === 2) return 0.8;
    if (yearsSinceActive === 3) return 0.7;
    if (yearsSinceActive === 4) return 0.6;
    if (yearsSinceActive === 5) return 0.5;
    
    // Older than 5 years
    return Math.max(0, 0.5 - (yearsSinceActive - 5) * 0.1);
  };