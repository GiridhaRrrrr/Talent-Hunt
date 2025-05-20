// src/utils/slugify.js
/**
 * Convert a string to a URL-friendly slug
 * @param {string} text - Text to convert to slug
 * @returns {string} - URL-friendly slug
 */
export const slugify = (text) => {
    if (!text) return '';
    
    return text
      .toString()
      .toLowerCase()
      .trim()
      // Replace spaces with hyphens
      .replace(/\s+/g, '-')
      // Remove special characters
      .replace(/[^\w\-]+/g, '')
      // Replace multiple hyphens with single hyphen
      .replace(/\-\-+/g, '-')
      // Remove leading and trailing hyphens
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };
  
  /**
   * Create a unique slug with a timestamp appended
   * @param {string} text - Base text for slug
   * @returns {string} - Unique slug
   */
  export const createUniqueSlug = (text) => {
    const timestamp = new Date().getTime().toString(36);
    return `${slugify(text)}-${timestamp}`;
  };