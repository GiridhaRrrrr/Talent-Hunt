// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, // Whether user is logged in
  userData: null, // User data from Appwrite
  loading: false, // Auth operation loading state
  error: null     // Auth error message
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set loading state
    authLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Handle login success
    logIn: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.loading = false;
      state.error = null;
    },
    
    // Handle logout
    logOut: (state) => {
      state.status = false;
      state.userData = null;
      state.loading = false;
      state.error = null;
    },
    
    // Handle auth errors
    authError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Update user data
    updateUserData: (state, action) => {
      state.userData = {
        ...state.userData,
        ...action.payload
      };
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { 
  authLoading, 
  logIn, 
  logOut, 
  authError, 
  updateUserData, 
  clearError 
} = authSlice.actions;

export default authSlice.reducer;