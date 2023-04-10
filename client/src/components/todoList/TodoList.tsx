import React, { FC, useRef } from 'react'
import { ITodo } from '../../models/ITodo'
import { ItemsNotFound } from '../itemsNotFound/ItemsNotFound'
import { Todo } from '../todo/Todo'
import { Loader } from '../UI/loader/Loader'
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import styles from './todoList.module.css';
import './todoList.css'

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
      {isLoading &&  <Loader/>}

      {(!isLoading && (error || todos.length === 0)) && <ItemsNotFound/>}
    
      <TransitionGroup>
        {
          todos.map(todo =>
            <CSSTransition
              key={todo.id}
              timeout={500}
              classNames='todo'
            >
              <Todo
                key={todo.id} 
                todo={todo}
                completeHandler={completeHandler}
                editPerformersHandler={editPerformersHandler}
                updateHandler={updateHandler}
                deleteHandler={deleteHandler}
              />
            </CSSTransition>
          )
        }
      </TransitionGroup>
    </>
  )
}
