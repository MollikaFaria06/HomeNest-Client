// src/api.js
import axios from "axios";
import { getAuth } from "firebase/auth";
import { auth } from "./firebase/firebase.config";

const api = axios.create({
  baseURL: "https://home-nest-server-silk.vercel.app", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Firebase JWT attach
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(); // Firebase JWT
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
