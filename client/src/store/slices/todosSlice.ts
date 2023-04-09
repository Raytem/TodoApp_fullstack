import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../models/ITodo";

type TodoState = {
    list: ITodo[];
}

const initialState: TodoState = {
    list: [],
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        add(action, payload: PayloadAction<ITodo>) {

        },
        remove(action, payload: PayloadAction<ITodo>) {

        },
        toggleComplete(action, payload: PayloadAction<ITodo>) {

        },
        addPerformer(action, payload: PayloadAction<ITodo>) {

        },
        removePerformer(action, payload: PayloadAction<ITodo>) {

        }
    }
})