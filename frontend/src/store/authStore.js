import { create } from "zustand";
import axios from "axios";

const API_URL = "https://library-fyft.onrender.com/api";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: false,

  // Signup function
  signup: async (username, email, password) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
      });

      set({
        user: response.data.user,
        message: response.data.message || "Signup successful",
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error signing up",
      });
      throw error;
    }
  },

  // Sign in Function
  signin: async (email, password) => {
    set({ isLoading: true, message: null, error: null });
  
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      }); 
  
      const { user, message } = response.data;
  
      set({ user, isLoading: false, message });
      return { user, message };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error Logging in",
      });
  
      throw error;
    }
  },

  // Fetch data function
  fetchUser: async () => {
    set({ fetchingUser: true });
    try {
      const response = await axios.get(`${API_URL}/fetch-user`);
      set({ user: response.data.user, fetchingUser: false });
    } catch (error) {
      set({ user: null, fetchingUser: false });
    }
  },

  // Logout function
  logout: async () => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${API_URL}/logout`);

      const {message} = response.data;

      set({ message, isLoading: false, user: null, error: null });

      return { message };
    } catch (error) {
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error logging out",
      });

      throw error;
    }
    }
}));
