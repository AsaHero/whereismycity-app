import axios from "axios";
import AuthService from "./auth.service";
import { API_URL, DEMO_SEARCH_LIMIT } from "../constants/config";

class SearchService {
  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add auth header interceptor for authenticated requests
    this.axios.interceptors.request.use((config) => {
      // Only add token for non-demo endpoints
      if (!config.url?.includes("/search/demo")) {
        const token = AuthService.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    // Handle token expiration
    this.axios.interceptors.response.use(
      (response) => {
        // Extract and log rate limit info if available
        if (response.headers["x-ratelimit-limit"]) {
          this.rateLimitInfo = {
            limit: response.headers["x-ratelimit-limit"],
            remaining: response.headers["x-ratelimit-remaining"],
            reset: response.headers["x-ratelimit-reset"],
          };
          console.debug("Rate limit info:", this.rateLimitInfo);
        }
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Skip token refresh for demo endpoints
        if (originalRequest.url?.includes("/search/demo")) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = AuthService.getRefreshToken();
            if (!refreshToken) {
              AuthService.logout();
              return Promise.reject(error);
            }

            const response = await AuthService.refreshToken(refreshToken);

            if (response.access_token) {
              originalRequest.headers["Authorization"] =
                "Bearer " + response.access_token;
              return this.axios(originalRequest);
            }
          } catch (refreshError) {
            AuthService.logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async demoSearch(query, options = {}) {
    try {
      const params = {
        q: query,
        limit: options.limit || DEMO_SEARCH_LIMIT,
      };

      const response = await this.axios.get("/demo", { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async search(query, options = {}) {
    try {
      const params = {
        q: query,
        ...options,
      };

      const response = await this.axios.get("/api/v1/search", { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getDetails(cityId) {
    try {
      const response = await this.axios.get(`/api/v1/cities/${cityId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  getRateLimitInfo() {
    return this.rateLimitInfo || null;
  }

  handleError(error) {
    if (error.response) {
      // Extract standard error format from documentation
      const errorResponse = error.response.data;

      if (errorResponse.code && errorResponse.message) {
        return {
          status: error.response.status,
          code: errorResponse.code,
          message: errorResponse.message,
          details: errorResponse.details || null,
        };
      }

      // Fallback to general error format
      return {
        status: error.response.status,
        message: error.response.data.message || "An error occurred",
        errors: error.response.data.errors,
      };
    } else if (error.request) {
      return {
        status: 0,
        message: "No response from server",
        errors: null,
      };
    } else {
      return {
        status: 0,
        message: error.message,
        errors: null,
      };
    }
  }
}

export default new SearchService();
