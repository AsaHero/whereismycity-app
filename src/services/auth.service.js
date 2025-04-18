// src/services/auth.service.js
import axios from "axios";
import { API_URL } from "../constants/config";

class AuthService {
  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add interceptor to handle token expiration
    this.axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = this.getRefreshToken();
            if (!refreshToken) {
              this.logout();
              return Promise.reject(error);
            }

            const response = await this.refreshToken(refreshToken);

            if (response.access_token) {
              this.setTokens(response.access_token, response.refresh_token);
              this.axios.defaults.headers.common["Authorization"] =
                "Bearer " + response.access_token;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.access_token;

              return this.axios(originalRequest);
            }
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  setAuthHeader(token) {
    if (token) {
      this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.axios.defaults.headers.common["Authorization"];
    }
  }

  async register(userData) {
    try {
      const response = await this.axios.post("/auth/register", {
        email: userData.email,
        password: userData.password,
        name: userData.name,
      });

      if (response.data.access_token) {
        this.setTokens(response.data.access_token, response.data.refresh_token);
        this.setAuthHeader(response.data.access_token);
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(credentials) {
    try {
      const response = await this.axios.post("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      if (response.data.access_token) {
        this.setTokens(response.data.access_token, response.data.refresh_token);
        this.setAuthHeader(response.data.access_token);
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async refreshToken(refreshToken) {
    try {
      const response = await this.axios.post("/auth/refresh", {
        refresh_token: refreshToken,
      });

      return response.data;
    } catch (error) {
      this.logout();
      throw this.handleError(error);
    }
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.setAuthHeader(null);
  }

  isAuthenticated() {
    // Use the instance method directly
    const token = this.getAccessToken();
    return !!token;
  }

  static isAuthenticated() {
    // Static version for direct calls
    const token = localStorage.getItem("accessToken");
    return !!token;
  }

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  static getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  static getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  setTokens(accessToken, refreshToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        status: error.response.status,
        message: error.response.data.message || "An error occurred",
        errors: error.response.data.errors,
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        status: 0,
        message: "No response from server",
        errors: null,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        status: 0,
        message: error.message,
        errors: null,
      };
    }
  }
}

export default new AuthService();
