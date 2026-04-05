import axios from "axios";
import { BASE_URL } from "./apiPaths";

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

      if (status === 401) {
        console.error("Unauthorized. Redirecting to login...");
        
        // Optional: clear invalid token
        // localStorage.removeItem("token");

        // Redirect to login page
        // window.location.href = "/";
      } else if (status === 500) {
        console.error("Server error. Please try again later.");
      }
    } 
    else if (err.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    } 
    else {
      console.error("Unexpected error:", err.message);
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
