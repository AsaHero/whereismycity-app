// src/context/SearchContext.js
import React, { createContext, useState, useContext } from "react";
import SearchService from "../services/search.service";
import { useAuth } from "./AuthContext";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [rateLimitInfo, setRateLimitInfo] = useState(null);

  // Store the authentication status
  const [userIsAuthenticated] = useState(isAuthenticated());

  const performSearch = async (query, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const results = await SearchService.demoSearch(query, options);

      setSearchResults(results.locations || []);

      // Check for rate limit info
      const rateLimit = SearchService.getRateLimitInfo();
      if (rateLimit) {
        setRateLimitInfo(rateLimit);
      }

      // Add to recent searches
      if (query.trim()) {
        setRecentSearches((prev) => {
          const newSearches = [
            { query, timestamp: new Date().toISOString() },
            ...prev.filter((item) => item.query !== query),
          ].slice(0, 5);
          return newSearches;
        });
      }

      return results;
    } catch (err) {
      setError(err.message || "Search failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCityDetails = async (cityId) => {
    setLoading(true);
    setError(null);
    try {
      const details = await SearchService.getDetails(cityId);
      setSelectedCity(details);
      return details;
    } catch (err) {
      setError(err.message || "Failed to get city details");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearSearchResults = () => {
    setSearchResults([]);
    setSelectedCity(null);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const value = {
    searchResults,
    loading,
    error,
    recentSearches,
    selectedCity,
    rateLimitInfo,
    performSearch,
    getCityDetails,
    clearSearchResults,
    clearRecentSearches,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === null) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export default SearchContext;
