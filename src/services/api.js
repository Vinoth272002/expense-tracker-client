import axios from "axios";
import useAuth from "../store/useAuth";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config();

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post( `${BASE_URL}/auth/refresh-token`, {}, { withCredentials: true });
                
                const  { accessToken } = response.data;
                localStorage.setItem("token", accessToken);

                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (error) {
                useAuth.getState().logout();
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default api;