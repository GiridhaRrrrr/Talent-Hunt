// src/store/searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {databaseServices} from "../services/appwrite";

// Async thunk for searching experts
export const searchExperts = createAsyncThunk(
  "search/searchExperts",
  async ({ domain, keywords = "" }, { rejectWithValue }) => {
    try {
      // Create a search record
      await databaseServices.createSearch({ domain, keywords });
      
      // Get all experts first
      const expertsResponse = await databaseServices.listExperts();
      if (!expertsResponse || !expertsResponse.documents) {
        return [];
      }
      
      let allExperts = expertsResponse.documents;
      
      // Filter by domain if provided
      let filteredExperts = allExperts;
      if (domain) {
        filteredExperts = allExperts.filter(expert => 
          expert.domain && expert.domain.toLowerCase().includes(domain.toLowerCase())
        );
      }
      
      // If keywords provided, further filter and calculate relevance
      if (keywords) {
        const keywordArray = keywords.toLowerCase().split(',').map(k => k.trim());
        
        // Process each expert with keyword relevance
        const expertsWithScores = filteredExperts.map(expert => {
          const expertKeywords = expert.keywords 
            ? expert.keywords.toLowerCase().split(',').map(k => k.trim()) 
            : [];
          
          // Calculate keyword match
          const matchingKeywords = keywordArray.filter(keyword => 
            expertKeywords.some(k => k.includes(keyword) || keyword.includes(k))
          );
          
          const keywordScore = keywordArray.length > 0 
            ? matchingKeywords.length / keywordArray.length 
            : 0;
          
          // Calculate experience score (normalized to 0-1)
          const yearsScore = Math.min(expert.experienceYears || 0, 10) / 10;
          
          // Calculate final confidence score (0-100)
          const confidenceScore = Math.round((keywordScore * 0.6 + yearsScore * 0.4) * 100);
          
          return {
            ...expert,
            confidenceScore: Math.max(expert.confidence || 0, confidenceScore)
          };
        });
        
        // Filter by minimum confidence and sort
        return expertsWithScores
          .filter(expert => expert.confidenceScore > 0)
          .sort((a, b) => b.confidenceScore - a.confidenceScore);
      }
      
      // If no keywords, just sort by confidence
      return filteredExperts.map(expert => ({
        ...expert,
        confidenceScore: expert.confidence || 0
      })).sort((a, b) => b.confidenceScore - a.confidenceScore);
    } catch (error) {
      return rejectWithValue(error.message || "Search failed");
    }
  }
);

const initialState = {
  results: [],        // Search results
  loading: false,     // Loading state
  error: null,        // Error message
  lastSearch: {       // Last search parameters
    domain: "",
    keywords: ""
  }
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Clear search results
    clearResults: (state) => {
      state.results = [];
      state.error = null;
    },
    
    // Set a specific expert as favorited
    favoriteExpert: (state, action) => {
      const expertId = action.payload;
      const expert = state.results.find(exp => exp.$id === expertId);
      if (expert) {
        expert.favorited = !expert.favorited;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchExperts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchExperts.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
        state.lastSearch = action.meta.arg;
      })
      .addCase(searchExperts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Search failed";
      });
  }
});

export const { clearResults, favoriteExpert } = searchSlice.actions;

export default searchSlice.reducer;