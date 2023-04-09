import React, { FC } from 'react'
import { ITodo } from '../../models/ITodo'
import { ItemsNotFound } from '../itemsNotFound/ItemsNotFound'
import { Todo } from '../todo/Todo'
import { Loader } from '../UI/loader/Loader'

interface TodoListProps {
    todos: ITodo[],
    isLoading: boolean,
    error: Error | null,
    completeHandler: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>,
    editPerformersHandler: (e: React.MouseEvent<HTMLButtonElement>) => void,
    updateHandler: (e: React.MouseEvent<HTMLButtonElement>, titleText: string, bodyText: string) => Promise<void>,
    deleteHandler: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export const TodoList: FC<TodoListProps> = (
  {todos, isLoading, error, completeHandler, updateHandler, deleteHandler, editPerformersHandler}
) => {
  return (
    <>
        {
          (isLoading) 
          ?
            <Loader/>
          :
            (todos.length === 0 || error)
            ? 
              <ItemsNotFound/>
            :
              todos.map(todo =>
                <Todo key={todo.id} todo={todo}
                  completeHandler={completeHandler}
                  editPerformersHandler={editPerformersHandler}
                  updateHandler={updateHandler}
                  deleteHandler={deleteHandler}
                />
              )
        }
    </>
  )
}
