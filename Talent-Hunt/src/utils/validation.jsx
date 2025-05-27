/**
 * Email validation using a regular expression
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Password validation - at least 8 characters, with at least one number and one letter
   * @param {string} password - Password to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  export const isValidPassword = (password) => {
    return password.length >= 8 && /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
  };
  
  /**
   * Validate form data
   * @param {Object} data - Form data object
   * @param {Array} requiredFields - Array of required field names
   * @returns {Object} - { isValid: boolean, errors: Object }
   */
  export const validateForm = (data, requiredFields = []) => {
    const errors = {};
    let isValid = true;
  
    // Check required fields
    requiredFields.forEach(field => {
      if (!data[field] || data[field].trim() === '') {
        errors[field] = `${field} is required`;
        isValid = false;
      }
    });
  
    // Check email format if email is present
    if (data.email && !isValidEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
  
    // Check password format if password is present
    if (data.password && !isValidPassword(data.password)) {
      errors.password = 'Password must be at least 8 characters with at least one number and one letter';
      isValid = false;
    }
  
    // Check password confirmation if both password and confirmPassword are present
    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
  
    return { isValid, errors };
  };