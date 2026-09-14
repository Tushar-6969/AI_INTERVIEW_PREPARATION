import axios from "axios";
import { BASE_URL } from "./apiPaths";
import { BACKEND_WAKE_MESSAGE } from "./errorMessages";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ===============================
// Request Interceptor
// ===============================
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

console.log(" token is ",accessToken)
    // Attach token only if it exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===============================
// Response Interceptor
// ===============================
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    // Global error handling
    if (err.response) {
      const status = err.response.status;
      const serverMessage = err.response?.data?.message || "";

      if (status === 401) {
        console.error("Unauthorized. Redirecting to login...");
        err.userMessage = serverMessage || "Your session has expired. Please log in again.";
      } else if (status === 500) {
        if (serverMessage.toLowerCase().includes("ai returned invalid json") || serverMessage.toLowerCase().includes("failed to generate")) {
          err.userMessage = "The AI service is currently unavailable. Please try again in a moment.";
        } else {
          err.userMessage = "Something went wrong on the server. Please try again.";
        }
      } else {
        err.userMessage = serverMessage || "Something went wrong. Please try again.";
      }
    } else if (err.code === "ECONNABORTED") {
      err.userMessage = BACKEND_WAKE_MESSAGE;
      console.error("Request timeout. Please try again.");
    } else {
      err.userMessage = "Something went wrong. Please try again.";
      console.error("Unexpected error:", err.message);
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
