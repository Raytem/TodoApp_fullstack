import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITodo } from "../../models/ITodo";
import { useAppSelector } from "../../hooks/redux";

interface initialStateInterface {
    selectedTodo: ITodo;
}

const initialState: initialStateInterface = {
    selectedTodo: {
        id: '',
        title: '',
        body: '',
        isCompleted: false,
        cntOfUsers: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        userList: [''],
        creator: ''
    }
}

export const selectedTodoSlice = createSlice({
    name: 'selectedTodo',
    initialState: initialState,
    reducers: {
        setSelectedTodo: (state, action: PayloadAction<ITodo>) => {
            state.selectedTodo = action.payload
        }
    }
})

export const { setSelectedTodo } = selectedTodoSlice.actions;
export const getSelectedTodo = () => useAppSelector(state => state.selectedTodoReducer.selectedTodo);