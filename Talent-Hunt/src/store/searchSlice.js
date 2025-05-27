import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { databaseServices } from "../services/appwrite";
import { fetchLiveExperts } from "../constants/expertFetcher";

export const searchExperts = createAsyncThunk(
  "search/searchExperts",
  async ({ domain, keywords = "" }, { rejectWithValue }) => {
    try {
      const normalizedDomain = domain.trim().toLowerCase();
      const normalizedKeywords = keywords.trim().toLowerCase();

      //Create a search record and search model
      await databaseServices.createSearch({ domain: normalizedDomain, keywords: normalizedKeywords });

      //Query Appwrite for experts with matching domain and keywords
      const expertsResponse = await databaseServices(normalizedDomain, normalizedKeywords);

      if (expertsResponse.documents.length === 0) {
        //If not found, fetch from web ie make the api calls our main part
        const liveResults = await fetchLiveExperts({ domain: normalizedDomain, keywords: normalizedKeywords });
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

      //Process found experts with keyword matching
      const keywordArray = normalizedKeywords.split(',').map(k => k.trim()).filter(Boolean);

      const expertsWithScores = expertsResponse.documents.map((expert) => {
        const expertKeywords = expert.keywords
          ? expert.keywords.toLowerCase().split(',').map(k => k.trim())
          : [];

        const matchingKeywords = keywordArray.filter((keyword) =>
          expertKeywords.some(k => k.includes(keyword) || keyword.includes(k))
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
