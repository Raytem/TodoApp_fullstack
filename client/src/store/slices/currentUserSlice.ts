import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { useAppSelector } from "../../hooks/redux";
import { login, logout, registration } from "../actionCreators/currentUserActions";

interface InitialStateInterface {
    isAuth: boolean;
    user: IUser;
    isLoading: boolean;
    error: string;
}

const initialState: InitialStateInterface = {
    isAuth: false,
    user: {} as IUser,
    isLoading: false,
    error: ''
}

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.isAuth = true;
            state.user = action.payload;
        },

        clearUser: (state) => {
            state.isAuth = false;
            state.user = {} as IUser;
        },

        fetching: (state) => {
            state.isLoading = true;
            state.error = '';
        },

        fetchingSuccess: (state) => {
            state.isLoading = false;
            state.error = '';
        },

        fetchingError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const {setUser, clearUser} = currentUserSlice.actions;
export const getCurrentUser = () => useAppSelector(state => state.currentUserReducer.user);
export const getIsAuth = () => useAppSelector(state => state.currentUserReducer.isAuth);