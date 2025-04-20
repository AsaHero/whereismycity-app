// src/services/contact.service.js
import axios from "axios";
import { API_URL } from "../constants/config";

class ContactService {
  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async sendMessage(contactData) {
    try {
      const response = await this.axios.post("/contacts/send", {
        name: contactData.name,
        email: contactData.email,
        company: contactData.company,
        message: contactData.message,
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
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

export default new ContactService();
