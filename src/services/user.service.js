// src/services/user.service.js
import axios from "axios";
import AuthService from "./auth.service";
import { API_URL } from "../constants/config";

class UserService {
  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add auth header interceptor
    this.axios.interceptors.request.use((config) => {
      const token = AuthService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Reuse auth service's error handling interceptor
    this.axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

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

  async getProfile() {
    try {
      const response = await this.axios.get("/profile");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateProfile(userData) {
    try {
      // Use a single PATCH endpoint for all profile updates
      const response = await this.axios.patch("/profile", userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
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

export default new UserService();
