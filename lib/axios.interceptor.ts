import { useLogoutMutation } from "@/hooks/mutate/auth";
import useUserStore from "@/storage/use-userstore";
import { AxiosError, AxiosRequestConfig } from "axios";
import { Api, refreshToken } from "./api";




interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _isRetry?: boolean;
}



let isRefreshing = false;
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (error: unknown) => void;
}[] = [];


const processQueue = (error?: unknown) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(true);
        }
    });
    failedQueue = [];
};



Api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (
            error.response?.status === 401 &&
            !originalRequest?._isRetry
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => Api(originalRequest));
            }

            originalRequest._isRetry = true;
            isRefreshing = true;

            try {
                await refreshToken();
                processQueue();
                return Api(originalRequest);
            } catch (err) {
                const userStore = useUserStore.getState();
                processQueue(err);

                // 🚪 LOGOUT FLOW (important)
                // clear storage, navigate to login
                const { mutate } = useLogoutMutation();
                mutate();
                userStore.clearAuth();

                console.error("Refresh token failed", err);

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);