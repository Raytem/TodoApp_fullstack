import axios from "axios";
import { ITodo } from "../models/ITodo";
import { ITodoForChange } from "../models/ITodoForChange";
import config from '../../config.json'
import { BaseQueryApi, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query'
import getToken from "../utils/getToken";
import { logout } from "../store/actionCreators/currentUserActions";
import cfg from '../../config.json'
import { AuthResponse } from "../models/AuthResponse";

interface UpdateTodoType {
    todoId: string;
    body: ITodoForChange;
}

interface CreateTodoType {
    userId: string;
    body: ITodoForChange;
}

interface DeleteTodoType {
    userId: string;
    todoId: string;
}

const baseQuery = fetchBaseQuery({ 
    baseUrl: config.API_URL,
    prepareHeaders: (headers) => {
        headers.set('Authorization', `Bearer ${getToken()}`);
        return headers;
    }
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const response = await axios.get<AuthResponse>(`${cfg.API_URL}/auth/refreshToken`, {withCredentials: true});
    if (response.data) {
      // store the new token
        localStorage.setItem('accessToken', response.data.accessToken);
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result
}

export const todoApi = createApi({
    reducerPath: 'todoApi',
    tagTypes: ['Post'],
    baseQuery: baseQueryWithReauth,
    
    endpoints: (build) => ({

        getTodosByUserId: build.query<ITodo[], string>({
            query: (userId) => ({
                url: `/users/${userId}/todos`,
            }),
            providesTags: result => ['Post']
        }),

        createTodo: build.mutation<ITodo, CreateTodoType>({
            query: ({userId, body}) => ({
                method: 'POST',
                url: `/todos/${userId}`,
                body: body
            }),
            invalidatesTags: ['Post']
        }),

        updateTodo: build.mutation<ITodo, UpdateTodoType>({
            query: ({todoId, body}) => ({
                method: 'PATCH',
                url: `/todos/${todoId}`,
                body: body
            }),
            invalidatesTags: ['Post']
        }),

        deleteTodo: build.mutation<ITodo, DeleteTodoType>({
            query: ({todoId, userId}) => ({
                method: 'DELETE',
                url: `/todos/${todoId}/${userId}`,
            }),
            invalidatesTags: ['Post']
        }),

        addTodoByUserId: build.mutation<ITodo, DeleteTodoType>({
            query: ({todoId, userId}) => ({
                method: 'PATCH',
                url: `/todos/${todoId}/${userId}`,
            }),
            invalidatesTags: ['Post']
        }),

        delTodoByUserId: build.mutation<ITodo, DeleteTodoType>({
            query: ({todoId, userId}) => ({
                method: 'PUT',
                url: `/todos/${todoId}/${userId}`,
            }),
            invalidatesTags: ['Post']
        })

    })
})
