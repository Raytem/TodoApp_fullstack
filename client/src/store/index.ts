import { configureStore } from "@reduxjs/toolkit";
import selectedTodoSlice from "./slices/selectedTodoSlice";

const store = configureStore({
    reducer: selectedTodoSlice.reducer
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;