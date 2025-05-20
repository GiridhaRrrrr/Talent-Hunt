// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import searchReducer from "./searchSlice";
import expertReducer from "./expertSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    expert: expertReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for Appwrite objects
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;