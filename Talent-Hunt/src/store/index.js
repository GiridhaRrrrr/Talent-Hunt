// src/store/index.js
import store from './store';
import { 
  logIn, 
  logOut, 
  authLoading, 
  authError, 
  updateUserData, 
  clearError as clearAuthError 
} from './authSlice';
import { 
  searchExperts, 
  clearResults, 
  favoriteExpert 
} from './searchSlice';
import { 
  fetchExpert, 
  createExpert, 
  updateExpert, 
  deleteExpert, 
  addToFavorites, 
  removeFromFavorites, 
  addToRecentlyViewed, 
  clearCurrentExpert, 
  clearError as clearExpertError 
} from './expertSlice';

// Export the store as default
export default store;

// Export all action creators
export {
  // Auth actions
  logIn,
  logOut,
  authLoading,
  authError,
  updateUserData,
  clearAuthError,
  
  // Search actions
  searchExperts,
  clearResults,
  favoriteExpert,
  
  // Expert actions
  fetchExpert,
  createExpert,
  updateExpert,
  deleteExpert,
  addToFavorites,
  removeFromFavorites,
  addToRecentlyViewed,
  clearCurrentExpert,
  clearExpertError
};