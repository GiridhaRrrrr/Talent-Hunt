import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, // Whether user is logged in
  userData: null, // User data from Appwrite
  loading: false, // For Loader
  error: null     // FOr error message
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    authLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    logIn: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.loading = false;
      state.error = null;
    },
    
    logOut: (state) => {
      state.status = false;
      state.userData = null;
      state.loading = false;
      state.error = null;
    },
    
    authError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    updateUserData: (state, action) => {
      state.userData = {
        ...state.userData,
        ...action.payload
      };
    },
    
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