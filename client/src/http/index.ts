import axios from "axios";
import cfg from '../../config.json'
import getToken from "../utils/getToken";
import { config } from "react-transition-group";
import { AuthResponse } from "../models/AuthResponse";

const $api = axios.create({
    withCredentials: true,
    baseURL: cfg.API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${cfg.API_URL}/auth/refreshToken`, {withCredentials: true});
            localStorage.setItem('accessToken', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.error('Unauthorized')
        }
    }
    throw error;
})

export default $api;