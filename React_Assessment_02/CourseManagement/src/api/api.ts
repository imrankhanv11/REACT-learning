import axios, { type InternalAxiosRequestConfig } from "axios";
import { PublicEndPoint } from "./endPoints"
import { Token } from "../common/enum/token";

const api = axios.create({
    baseURL: "http://localhost:5173/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {

        const isPublicEndPoint = Object.values(PublicEndPoint).some((url) =>
            config.url?.includes(url)
        );

        if (!isPublicEndPoint) {
            const token = localStorage.getItem(Token.accessToken);
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {

            originalRequest._retry = true;

            try {
                const refreshTokenLC = localStorage.getItem(Token.refreshToken);
                if (!refreshTokenLC) {
                    throw new Error("Refresh Token Not Found");
                }

                const response = await axios.post(
                    "http://localhost:5173/api/Account/Refresh",
                    { refreshToken: refreshTokenLC },
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );

                const newAccessTokenLC = response.data.AccessToken;
                const newRefreshTokenLC = response.data.RefreshToken;
                // const newExpireTimeLC = response.data.ExpiresAt;


                if (!newAccessTokenLC || !newRefreshTokenLC) {
                    throw new Error("Server 500 Error");
                }

                localStorage.setItem(Token.accessToken, newAccessTokenLC);
                localStorage.setItem(Token.refreshToken, newRefreshTokenLC);
                // localStorage.setItem("expireAt", newExpireTimeLC);

                originalRequest.headers.Authorization = `Bearer ${newAccessTokenLC}`;
                return api(originalRequest);

            } catch (err: any) {
                console.error("Refresh token failed:", err);
                localStorage.removeItem(Token.accessToken);
                localStorage.removeItem(Token.refreshToken);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);


export default api;