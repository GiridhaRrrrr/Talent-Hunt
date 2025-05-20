// src/constants/apiEndpoints.js
/**
 * API endpoint paths
 */
const API_ENDPOINTS = {
    // Auth endpoints
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    GET_CURRENT_USER: '/auth/user',
    
    // Expert endpoints
    SEARCH_EXPERTS: '/experts/search',
    GET_EXPERT: (id) => `/experts/${id}`,
    CREATE_EXPERT: '/experts',
    UPDATE_EXPERT: (id) => `/experts/${id}`,
    DELETE_EXPERT: (id) => `/experts/${id}`,
    
    // Domain endpoints
    GET_DOMAINS: '/domains',
    GET_DOMAIN: (slug) => `/domains/${slug}`,
    CREATE_DOMAIN: '/domains',
    UPDATE_DOMAIN: (slug) => `/domains/${slug}`,
    DELETE_DOMAIN: (slug) => `/domains/${slug}`,
    
    // Verification endpoints
    VERIFY_EXPERIENCE: '/verify/experience',
  };
  
  export default API_ENDPOINTS;