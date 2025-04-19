import { useState, useEffect, useRef, useCallback } from "react";
import { Search, MapPin, ChevronRight, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTranslation } from "../../context/TranslationContext";
import { useSearch } from "../../context/SearchContext";
import debounce from 'lodash/debounce';
import { trackEvent } from "../../utils/analytics";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// This component handles the map view changes
// It will update the map view when props change
const MapUpdater = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      duration: 1,
    });
  }, [center, zoom, map]);

  return null;
};

// Helper function to get a normalized score value from different possible score fields
const getScoreValue = (result) => {
  // Check for different possible score fields in the response
  if (typeof result.rank_fusion_score === 'number') {
    // rank_fusion_score appears to be between 0-1 already
    return result.rank_fusion_score;
  } else if (typeof result.vector_distance === 'number') {
    // vector_distance is lower = better, so invert (and normalize to 0-1)
    // assuming max distance is around 1.0
    return Math.max(0, 1 - result.vector_distance);
  } else if (typeof result.confidence === 'number') {
    // confidence is typically 0-1
    return result.confidence;
  } else if (typeof result.score === 'number') {
    // legacy score field, normalize if needed
    return result.score > 1 ? result.score / 100 : result.score;
  }
  // fallback
  return 0.5;
};

export const SearchDemo = () => {
  const { t } = useTranslation();
  // Use the search context
  const {
    searchResults,
    loading,
    error,
    rateLimitInfo,
    performSearch,
    clearSearchResults
  } = useSearch();

  const [query, setQuery] = useState("");
  const prevQueryRef = useRef(query);
  const [selectedResult, setSelectedResult] = useState(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.006]);
  const [mapZoom, setMapZoom] = useState(9);
  const mapRef = useRef(null);
  const debouncedSearchRef = useRef(null);

  // Create a debounced search function only once
  useEffect(() => {
    debouncedSearchRef.current = debounce(async (searchTerm: string) => {
      if (!searchTerm || searchTerm.trim().length < 2) {
        clearSearchResults();
        setSelectedResult(null);
        return;
      }

      try {
        await performSearch(searchTerm, { limit: 5 });
        trackEvent("demoSearch", { query: searchTerm });
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 500);

    // Clean up on unmount
    return () => {
      if (debouncedSearchRef.current?.cancel) {
        debouncedSearchRef.current.cancel();
      }
    };
  }, [performSearch, clearSearchResults]);

  // Only trigger search when query actually changes
  useEffect(() => {
    // Skip if query is the same as previous query
    if (query !== prevQueryRef.current && debouncedSearchRef.current) {
      debouncedSearchRef.current(query);
      prevQueryRef.current = query;
    }
  }, [query]);

  // Handle selecting a result
  const handleSelectResult = (result) => {
    setSelectedResult(result);
    setMapCenter([result.latitude, result.longitude]);
    setMapZoom(10);
  };

  // If search results update and we don't have a selection, select the first one
  useEffect(() => {
    if (searchResults?.length > 0 && !selectedResult) {
      handleSelectResult(searchResults[0]);
    }
  }, [searchResults, selectedResult]);

  // Handle query change
  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  // Handle clear
  const handleClear = () => {
    setQuery("");
    clearSearchResults();
    setSelectedResult(null);
    prevQueryRef.current = "";
  };

  // Display rate limit warning if close to limit
  const showRateLimitWarning = rateLimitInfo && rateLimitInfo.remaining < 5;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder={t("demo.searchPlaceholder")}
            className="w-full px-5 py-4 pl-12 text-gray-700 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all border border-gray-200 shadow-sm"
          />
          {loading ? (
            <Loader
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500 animate-spin"
              size={20}
            />
          ) : (
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500"
              size={20}
            />
          )}

          {query.length > 0 && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        {/* Rate limit warning */}
        {showRateLimitWarning && (
          <div className="p-3 text-sm bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-100">
            {`API rate limit: ${rateLimitInfo.remaining}/${rateLimitInfo.limit} requests remaining. Resets in ${Math.round((rateLimitInfo.resetAt - Date.now()) / 60000)} minutes.`}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-3 text-sm bg-red-50 text-red-600 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <AnimatePresence>
          {searchResults.length === 0 && query.length > 0 && !loading ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-gray-50 rounded-lg text-gray-600 text-center"
            >
              No results found for "{query}"
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {searchResults.map((result) => (
                <motion.div
                  key={result.id}
                  whileHover={{ y: -2 }}
                  onClick={() => handleSelectResult(result)}
                  className={`p-4 bg-white rounded-lg shadow-sm border transition-all cursor-pointer flex justify-between items-center ${
                    selectedResult?.id === result.id
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-gray-100 hover:border-yellow-200"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        selectedResult?.id === result.id
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <MapPin size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {result.city}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {result.state && `${result.state}, `}{result.country}
                      </p>
                      <div className="mt-1 text-xs text-gray-500 flex items-center">
                        <span>
                          {result.latitude.toFixed(4)}°,{" "}
                          {result.longitude.toFixed(4)}°
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm font-medium flex items-center mr-3">
                      <span
                        className={`inline-block w-8 h-8 rounded-full flex items-center justify-center ${
                          getScoreValue(result) > 0.8
                            ? "bg-green-100 text-green-800"
                            : getScoreValue(result) > 0.5
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {Math.round(getScoreValue(result) * 100)}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:col-span-3 rounded-xl overflow-hidden shadow-lg border border-gray-200 h-[500px]">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ width: "100%", height: "100%" }}
          zoomControl={false}
          ref={mapRef}
        >
          {/* This is the key component that updates the map view when centers or zoom changes */}
          <MapUpdater center={mapCenter} zoom={mapZoom} />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {searchResults.map((result) => (
            <Marker
              key={result.id}
              position={[result.latitude, result.longitude]}
              eventHandlers={{
                click: () => {
                  handleSelectResult(result);
                },
              }}
            >
              <Popup>
                <div className="font-semibold">{result.city}</div>
                <div className="text-sm text-gray-600">
                  {result.state && `${result.state}, `}{result.country}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};