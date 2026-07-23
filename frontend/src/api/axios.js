import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/secret-admin-login";
    }

    return Promise.reject(
      error?.response?.data || {
        message: error?.message || "Something went wrong",
      }
    );
  }
);

export default api;