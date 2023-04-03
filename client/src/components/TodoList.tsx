import React, { FC } from 'react'
import { ITodo } from '../models/ITodo'
import { Todo } from './Todo'
import { Loader } from './UI/loader/Loader'

interface TodoListProps {
    todos: ITodo[],
    isLoading: boolean,
    error: Error | null
}

export const TodoList: FC<TodoListProps> = ({todos, isLoading, error}) => {
  return (
    <div>
        {
          isLoading 
          ?
            <Loader/>
          :
            todos.length === 0 || error
            ? 
              <h3 style={{textAlign: 'center'}}>No todo's found by this title</h3>
            :
              todos.map(todo =>
                <Todo key={todo.id} todo={todo}/>
              )
        }
    </div>
  )
}
