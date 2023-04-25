import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { selectedTodoSlice } from "./slices/selectedTodoSlice";
import { currentUserSlice } from "./slices/currentUserSlice";
import { todoApi } from "../API/TodoService";

const rootReducer = combineReducers({
    selectedTodoReducer: selectedTodoSlice.reducer,
    currentUserReducer: currentUserSlice.reducer,
    [todoApi.reducerPath]: todoApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({serializableCheck: false}).concat(todoApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];