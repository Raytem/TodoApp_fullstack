import axios from "axios";
import { AppDispatch } from ".."
import AuthService from "../../API/AuthService"
import { clearUser, currentUserSlice, setUser } from "../slices/currentUserSlice";
import { AuthResponse } from "../../models/AuthResponse";
import cfg from '../../../config.json'

export const registration = (nickName: string, email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(currentUserSlice.actions.fetching());
        const response = await AuthService.registration(nickName, email, password);
        dispatch(currentUserSlice.actions.fetchingSuccess())
        
        localStorage.setItem('accessToken', response.data.accessToken);
        dispatch(setUser(response.data.user));
    } catch (e: any) {
        dispatch(currentUserSlice.actions.fetchingError(e.message));
    }
}

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(currentUserSlice.actions.fetching());
        const response = await AuthService.login(email, password);
        dispatch(currentUserSlice.actions.fetchingSuccess())
        
        localStorage.setItem('accessToken', response.data.accessToken);
        dispatch(setUser(response.data.user));
    } catch (e: any) {
        dispatch(currentUserSlice.actions.fetchingError(e.message));
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(currentUserSlice.actions.fetching());
        await AuthService.logout();
        dispatch(currentUserSlice.actions.fetchingSuccess())

        localStorage.removeItem('accessToken');
        dispatch(clearUser());
    } catch (e: any) {
        dispatch(currentUserSlice.actions.fetchingError(e.message));
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(currentUserSlice.actions.fetching());
        const response = await axios.get<AuthResponse>(`${cfg.API_URL}/auth/refreshToken`, {withCredentials: true});
        dispatch(currentUserSlice.actions.fetchingSuccess())
        dispatch(setUser(response.data.user));
    } catch (e: any) {
        dispatch(currentUserSlice.actions.fetchingError(e.message));
    }
}