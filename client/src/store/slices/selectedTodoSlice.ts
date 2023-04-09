import { createSlice } from "@reduxjs/toolkit";
import { ITodo } from "../../models/ITodo";

interface initialStateInterface {
    selectedTodo: ITodo;
}

const initialState: initialStateInterface = {
    selectedTodo: {
        id: 'string',
        title: 'string',
        body: 'string',
        isCompleted: false,
        cntOfUsers: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        userList: [''],
        creator: 'string'
    }
}

const selectedTodoSlice = createSlice({
    name: 'selectedTodo',
    initialState: initialState,
    reducers: {
        setSelectedTodo: (state, action) => {
            state.selectedTodo = action.payload
        }
    }
})

export const selectedTodoSelector = {
    getSelectedTodo: (state: any) =>  state.selectedTodo
}

export const { setSelectedTodo } = selectedTodoSlice.actions;
export default selectedTodoSlice;
