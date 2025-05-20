// src/store/searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { databaseServices } from "../services/appwrite";

// Async thunk for searching experts
export const searchExperts = createAsyncThunk(
  "search/searchExperts",
  async ({ domain, keywords = "" }, { rejectWithValue }) => {
    try {
      // Convert domain to slug format
      const domainSlug = domain.toLowerCase().replace(/\s+/g, '-');
      
      // Get the domain document
      const domainDoc = await databaseServices.getDomain(domainSlug);
      
      if (!domainDoc) {
        return [];
      }
      
      // Get expert IDs associated with this domain
      const expertIds = domainDoc.expertId || [];
      
      // Fetch all experts
      const experts = await Promise.all(
        expertIds.map(async (id) => {
          try {
            const expert = await databaseServices.getExpert(id);
            return expert;
          } catch (error) {
            console.error(`Error fetching expert ${id}:`, error);
            return null;
          }
        })
      );
      
      // Filter out nulls
      const validExperts = experts.filter(expert => expert !== null);
      
      // If keywords provided, filter and calculate relevance
      if (keywords) {
        const keywordArray = keywords.toLowerCase().split(',').map(k => k.trim());
        
        // Process each expert with keyword relevance
        const expertsWithScores = validExperts.map(expert => {
          const expertTechnologies = expert.technologies.map(tech => tech.toLowerCase());
          
          // Calculate keyword match
          const matchingKeywords = keywordArray.filter(keyword => 
            expertTechnologies.some(tech => tech.includes(keyword))
          );
          
          const keywordScore = matchingKeywords.length / keywordArray.length;
          
          // Calculate years of experience score
          const yearsScore = calculateExperienceScore(expert.companies);
          
          // Calculate final confidence score (0-100)
          const confidenceScore = Math.round((keywordScore * 0.6 + yearsScore * 0.4) * 100);
          
          return {
            ...expert,
            confidenceScore
          };
        });
        
        // Filter by minimum confidence and sort
        return expertsWithScores
          .filter(expert => expert.confidenceScore > 0)
          .sort((a, b) => b.confidenceScore - a.confidenceScore);
      }
      
      // If no keywords, just calculate base scores
      return validExperts.map(expert => ({
        ...expert,
        confidenceScore: calculateExperienceScore(expert.companies) * 100
      })).sort((a, b) => b.confidenceScore - a.confidenceScore);
    } catch (error) {
      return rejectWithValue(error.message || "Search failed");
    }
  }
);

// Helper function to calculate experience score
const calculateExperienceScore = (companies) => {
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
  
  // Cap at 10 years for score purposes (since we're looking for 10+ year experts)
  const cappedYears = Math.min(totalYears, 10);
  return cappedYears / 10; // 0-1 score
};

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