import React, { FC } from 'react'
import { ITodo } from '../../models/ITodo'
import { ItemsNotFound } from '../itemsNotFound/ItemsNotFound'
import { Todo } from '../todo/Todo'
import { Loader } from '../UI/loader/Loader'

interface TodoListProps {
    todos: ITodo[],
    isLoading: boolean,
    error: Error | null,
    completeHandler?: () => void,
    updateHandler?: () => void,
    deleteHandler?: () => void
}

export const TodoList: FC<TodoListProps> = ({todos, isLoading, error, completeHandler, updateHandler, deleteHandler}) => {
  return (
    <div>
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
                  updateHandler={updateHandler}
                  deleteHandler={deleteHandler}
                />
              )
        }
    </div>
  )
}
