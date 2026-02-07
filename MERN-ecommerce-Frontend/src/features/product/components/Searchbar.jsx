import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getSearchSuggestionsAsync,
  getPopularSearchesAsync,
  clearSuggestions,
  setCurrentQuery,
  selectSuggestions,
  selectPopularSearches,
  selectSuggestionsStatus,
  selectCurrentQuery,
} from '../Searchslice';
import { MagnifyingGlassIcon, XMarkIcon, ClockIcon, FireIcon } from '@heroicons/react/24/outline';

export default function SearchBar({ placeholder = "Search for products, brands, categories..." }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const suggestions = useSelector(selectSuggestions);
  const popularSearches = useSelector(selectPopularSearches);
  const suggestionsStatus = useSelector(selectSuggestionsStatus);
  const currentQuery = useSelector(selectCurrentQuery);
  
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  // Load popular searches on mount
  useEffect(() => {
    dispatch(getPopularSearchesAsync());
  }, [dispatch]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (inputValue.trim().length >= 2) {
      debounceTimer.current = setTimeout(() => {
        dispatch(getSearchSuggestionsAsync(inputValue.trim()));
      }, 300);
    } else if (inputValue.trim().length === 0) {
      dispatch(clearSuggestions());
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [inputValue, dispatch]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  // Handle search submit
  const handleSearch = (query) => {
    const searchQuery = query || inputValue.trim();
    
    if (searchQuery) {
      dispatch(setCurrentQuery(searchQuery));
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'product' && suggestion.productId) {
      // Navigate to product detail
      navigate(`/product-detail/${suggestion.productId}`);
    } else {
      // Search by term
      setInputValue(suggestion.term);
      handleSearch(suggestion.term);
    }
    setShowSuggestions(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    const displaySuggestions = inputValue.trim() ? suggestions : popularSearches;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => 
        prev < displaySuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && displaySuggestions[selectedIndex]) {
        handleSuggestionClick(displaySuggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  // Clear search
  const handleClear = () => {
    setInputValue('');
    dispatch(clearSuggestions());
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Get icon for suggestion type
  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'brand':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-xs font-bold">B</span>
          </div>
        );
      case 'category':
        return (
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-purple-600 text-xs font-bold">C</span>
          </div>
        );
      case 'product':
        return null; // Will show product image
      default:
        return <ClockIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const displaySuggestions = inputValue.trim() ? suggestions : popularSearches;
  const showPopular = !inputValue.trim() && popularSearches.length > 0;

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
        />
        
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[500px] overflow-y-auto">
          {/* Loading State */}
          {suggestionsStatus === 'loading' && inputValue.trim() && (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Popular Searches Header */}
          {showPopular && (
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FireIcon className="w-5 h-5 text-orange-500" />
                Popular Searches
              </div>
            </div>
          )}

          {/* Suggestions List */}
          {displaySuggestions.length > 0 && (
            <ul className="py-2">
              {displaySuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                    index === selectedIndex
                      ? 'bg-indigo-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Icon or Thumbnail */}
                    {suggestion.type === 'product' && suggestion.thumbnail ? (
                      <img
                        src={suggestion.thumbnail}
                        alt={suggestion.term}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      getSuggestionIcon(suggestion.type)
                    )}

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {suggestion.term}
                      </p>
                      {suggestion.type === 'product' && (
                        <p className="text-xs text-gray-500 truncate">
                          {suggestion.brand} • {suggestion.category}
                        </p>
                      )}
                      {(suggestion.type === 'brand' || suggestion.type === 'category') && (
                        <p className="text-xs text-gray-500 capitalize">
                          {suggestion.type}
                        </p>
                      )}
                    </div>

                    {/* Arrow Icon */}
                    <div className="text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* No Results */}
          {displaySuggestions.length === 0 && 
           suggestionsStatus !== 'loading' && 
           inputValue.trim() && (
            <div className="p-8 text-center">
              <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">No suggestions found</p>
              <p className="text-xs text-gray-400 mt-1">
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}