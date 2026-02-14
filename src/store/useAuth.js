import { create } from "zustand";
import api from "../services/api";

const AUTH_URL = '/auth';

const useAuth = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,

    login: async (credentials) => {
        try {
            const response = await api.post(`${AUTH_URL}/login`, credentials);
            const { data, accessToken } = response.data;

            localStorage.setItem("token", accessToken);
            set({
                user: data,
                isAuthenticated: true
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    signup: async (userData) => {
        try {
            const response = await api.post( `${AUTH_URL}/register`, userData);
            const { data, accessToken } = response.data;

            localStorage.setItem("token", accessToken);
            set({
                user: data,
                isAuthenticated: true
            });

            return response.data;
        } catch (error) {
            throw(error);
        }
    },

    logout: async () => {
        try {
            await api.post(`${AUTH_URL}/logout`);
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            localStorage.removeItem("token");
            set({
                user: null,
                isAuthenticated: false
            })
        }
    },

    checkAuth: async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                set({
                    isAuthenticated: false,
                    loading: false
                });
                return;
            }

            const response = await api.get(`${AUTH_URL}/current-user`);
            const { data } = response.data;

            set({
                user: data,
                isAuthenticated: true,
                loading: false
            });
        } catch (error) {
            localStorage.removeItem("token");
            set({
                user: null,
                isAuthenticated: false,
                loading: false
            });
        }
    },

    setUser: (user) => set({
        user,
        isAuthenticated: !!user
    }),

    setLoading: (loading) => set({ loading })
}));

export default useAuth;