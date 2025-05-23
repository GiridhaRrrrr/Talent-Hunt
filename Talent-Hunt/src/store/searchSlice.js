// src/store/searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { databaseServices } from "../services/appwrite";
import { fetchLiveExperts } from "../constants/expertFetcher";

// Async thunk for searching experts
export const searchExperts = createAsyncThunk(
  "search/searchExperts",
  async ({ domain, keywords = "" }, { rejectWithValue }) => {
    try {
      // Step 1: Create a search record
      await databaseServices.createSearch({ domain, keywords });

      // Step 2: Try to get experts from Appwrite
      const expertsResponse = await databaseServices.listExperts();
      if (!expertsResponse || !expertsResponse.documents) {
        return [];
      }

      let allExperts = expertsResponse.documents;

      // Step 3: Filter by domain
      let filteredExperts = allExperts;
      if (domain) {
        filteredExperts = allExperts.filter((expert) =>
          expert.domain && expert.domain.toLowerCase().includes(domain.toLowerCase())
        );
      }

      // Step 4: If domain exists but no keyword matches, fallback to live search
      const hasLocalMatches = filteredExperts.length > 0;
      const keywordArray = keywords.toLowerCase().split(',').map(k => k.trim()).filter(Boolean);

      if (!hasLocalMatches) {
        const liveResults = await fetchLiveExperts({ domain, keywords });
        const savedResults = [];
        for (const expert of liveResults) {
          try {
            const saved = await databaseServices.createExpert(expert);
            savedResults.push({ ...saved, confidenceScore: expert.confidence || 0 });
          } catch (err) {
            console.error("Failed to save expert:", expert.name, err);
          }
        }
        return savedResults.sort((a, b) => b.confidenceScore - a.confidenceScore);
      }

      // Step 5: Apply keyword scoring if keywords exist
      if (keywords) {
        const expertsWithScores = filteredExperts.map((expert) => {
          const expertKeywords = expert.keywords
            ? expert.keywords.toLowerCase().split(',').map((k) => k.trim())
            : [];

          const matchingKeywords = keywordArray.filter((keyword) =>
            expertKeywords.some((k) => k.includes(keyword) || keyword.includes(k))
          );

          const keywordScore = keywordArray.length > 0
            ? matchingKeywords.length / keywordArray.length
            : 0;

          const yearsScore = Math.min(expert.experienceYears || 0, 10) / 10;

          const confidenceScore = Math.round((keywordScore * 0.6 + yearsScore * 0.4) * 100);

          return {
            ...expert,
            confidenceScore: Math.max(expert.confidence || 0, confidenceScore)
          };
        });

        return expertsWithScores
          .filter((expert) => expert.confidenceScore > 0)
          .sort((a, b) => b.confidenceScore - a.confidenceScore);
      }

      // Step 6: No keywords, return by confidence
      return filteredExperts.map((expert) => ({
        ...expert,
        confidenceScore: expert.confidence || 0
      })).sort((a, b) => b.confidenceScore - a.confidenceScore);
    } catch (error) {
      return rejectWithValue(error.message || "Search failed");
    }
  }
);

const initialState = {
  results: [],
  loading: false,
  error: null,
  lastSearch: {
    domain: "",
    keywords: ""
  }
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearResults: (state) => {
      state.results = [];
      state.error = null;
    },
    favoriteExpert: (state, action) => {
      const expertId = action.payload;
      const expert = state.results.find((exp) => exp.$id === expertId);
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
