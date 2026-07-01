import axios from "axios";

export const API_BASE = (import.meta.env.VITE_API_URL || "https://toyland-backend.onrender.com").replace(/\/$/, "");
export const API_URL = API_BASE.endsWith("/api") ? API_BASE : `${API_BASE}/api`;
export const IMAGE_BASE = API_BASE.replace(/\/api$/, "");

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const isAdminPage = window.location.pathname.startsWith("/admin");
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("token");
  const token = isAdminPage ? adminToken : userToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const imgUrl = (path) => {
  if (!path) return "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80";
  return path.startsWith("http") ? path : `${IMAGE_BASE}${path}`;
};

export default api;
