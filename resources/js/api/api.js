/**
 * For sending authenticated requests add middleware auth
 * const res = await apiRequest({
 * url: "/users/me",
 * method: "GET",
 * useMiddleware: ["auth"]});
 *
 */
import axios from "axios";

// Base axios instance
const api = axios.create({
    baseURL: "/api/v1", // Versioned base
    withCredentials: true, // required for Sanctum
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Middleware registry
const middlewareRegistry = {
    auth: async (config) => {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Unauthorized");
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
        return config;
    },
};

// Response interceptor to shape response
api.interceptors.response.use(
    (res) => ({
        success: true,
        data: res.data,
        status: res.status,
        message: res.statusText,
    }),
    (err) => {
        const res = err.response;
        return Promise.resolve({
            success: false,
            data: null,
            status: res?.status ?? 500,
            message: res?.data?.message || "Something went wrong.",
            errors: res?.data?.errors ?? {},
        });
    }
);

// Core request function
export const apiRequest = async ({
    method = "GET",
    url,
    data = {},
    params = {},
    headers = {},
    signal = null, // for abort controller
    useMiddleware = ["auth"], // default to auth
}) => {
    try {
        let config = {
            method,
            url,
            data,
            params,
            headers,
            signal,
        };

        // Apply middlewares conditionally
        for (const mw of useMiddleware) {
            const fn = middlewareRegistry[mw];
            if (fn) config = await fn(config);
        }

        const response = await api.request(config);
        return response;
    } catch (err) {
        return err; // Already shaped by interceptor
    }
};
