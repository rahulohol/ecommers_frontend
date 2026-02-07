import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../admin/components/axios';

// ============================================
// API CALLS
// ============================================

// Search products with full results
export const searchProductsAsync = createAsyncThunk(
  'search/searchProducts',
  async ({ query, filter = {}, sort = {}, cursor = null }) => {
    let queryString = `q=${encodeURIComponent(query)}`;
    
    // Add filters
    for (let key in filter) {
      if (filter[key].length > 0) {
        queryString += `&${key}=${filter[key].join(',')}`;
      }
    }
    
    // Add sorting
    for (let key in sort) {
      queryString += `&${key}=${sort[key]}`;
    }
    
    // Add cursor for pagination
    if (cursor) {
      queryString += `&cursor=${cursor}`;
    }
    
    const response = await API.get(`/products/search?${queryString}`);
    const data = await response.data;
    return data;
  }
);

// Get search suggestions
export const getSearchSuggestionsAsync = createAsyncThunk(
  'search/getSuggestions',
  async (query) => {
    const response = await API.get(
      `/products/search/suggestions?q=${encodeURIComponent(query)}`
    );
    const data = await response.data;
    return data;
  }
);

// Get popular searches
export const getPopularSearchesAsync = createAsyncThunk(
  'search/getPopular',
  async () => {
    const response = await API.get('/products/search/popular');
    const data = await response.data;
    return data;
  }
);

// ============================================
// INITIAL STATE
// ============================================

const initialState = {
  searchResults: [],
  suggestions: [],
  popularSearches: [],
  currentQuery: '',
  nextCursor: null,
  hasMore: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  suggestionsStatus: 'idle',
  error: null,
};

// ============================================
// SLICE
// ============================================

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.currentQuery = '';
      state.nextCursor = null;
      state.hasMore = false;
      state.error = null;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
    setCurrentQuery: (state, action) => {
      state.currentQuery = action.payload;
    },
    resetSearch: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== SEARCH PRODUCTS =====
      .addCase(searchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        // If cursor exists, append results (infinite scroll)
        if (action.meta.arg.cursor) {
          state.searchResults = [...state.searchResults, ...action.payload.products];
        } else {
          // New search, replace results
          state.searchResults = action.payload.products;
        }
        
        state.nextCursor = action.payload.nextCursor;
        state.hasMore = action.payload.hasMore;
        state.currentQuery = action.payload.searchTerm;
        state.error = null;
      })
      .addCase(searchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // ===== SEARCH SUGGESTIONS =====
      .addCase(getSearchSuggestionsAsync.pending, (state) => {
        state.suggestionsStatus = 'loading';
      })
      .addCase(getSearchSuggestionsAsync.fulfilled, (state, action) => {
        state.suggestionsStatus = 'succeeded';
        state.suggestions = action.payload.suggestions;
      })
      .addCase(getSearchSuggestionsAsync.rejected, (state, action) => {
        state.suggestionsStatus = 'failed';
        state.suggestions = [];
      })
      
      // ===== POPULAR SEARCHES =====
      .addCase(getPopularSearchesAsync.fulfilled, (state, action) => {
        state.popularSearches = action.payload.popular;
      });
  },
});

// ============================================
// ACTIONS & SELECTORS
// ============================================

export const { 
  clearSearchResults, 
  clearSuggestions, 
  setCurrentQuery,
  resetSearch 
} = searchSlice.actions;

export const selectSearchResults = (state) => state.search.searchResults;
export const selectSuggestions = (state) => state.search.suggestions;
export const selectPopularSearches = (state) => state.search.popularSearches;
export const selectCurrentQuery = (state) => state.search.currentQuery;
export const selectSearchStatus = (state) => state.search.status;
export const selectSuggestionsStatus = (state) => state.search.suggestionsStatus;
export const selectSearchNextCursor = (state) => state.search.nextCursor;
export const selectSearchHasMore = (state) => state.search.hasMore;
export const selectSearchError = (state) => state.search.error;

export default searchSlice.reducer;