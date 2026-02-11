import useUserStore from "@/storage/use-userstore";
import axios from "axios";
import { Platform } from "react-native";

export const API_BASE_URL = Platform.OS === "ios" ? process.env.EXPO_PUBLIC_API_URL_IOS : process.env.EXPO_PUBLIC_API_URL_ANDROID

export const Api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

// Attach token to every request
Api.interceptors.request.use(async (config) => {
    const accessToken = useUserStore.getState().token;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Handle 401 — attempt token refresh, retry once
Api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refreshToken();
                return Api(originalRequest);
            } catch {
                useUserStore.getState().clearAuth();
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export const refreshToken = async (): Promise<void> => {
    await axios.post(
        `${API_BASE_URL}/users/refresh`,
        {},
        {
            withCredentials: true,
        }
    );
};



