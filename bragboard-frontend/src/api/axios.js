import axios from "axios";

// Create an axios instance
const API = axios.create({
  baseURL: "https://bragboard-backend-voce.onrender.com", // ✅ changed this line only
});

// Add JWT token automatically to all requests if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;