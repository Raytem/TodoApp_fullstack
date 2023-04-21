import React, { Dispatch, FC, SetStateAction, useRef } from 'react'
import { ITodo } from '../../models/ITodo'
import { ItemsNotFound } from '../itemsNotFound/ItemsNotFound'
import { Todo } from '../todo/Todo'
import { Loader } from '../UI/loader/Loader'
import { AnimatePresence, motion } from 'framer-motion'

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
    
        <AnimatePresence mode="popLayout">
            {
              todos.map(todo => 
                <motion.li
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "just"}}
                  key={todo.id}
                >
                  <Todo
                    key={todo.id} 
                    todo={todo}
                    completeHandler={completeHandler}
                    editPerformersHandler={editPerformersHandler}
                    updateHandler={updateHandler}
                    deleteHandler={deleteHandler}
                  />
                </motion.li>
              )
            }
        </AnimatePresence>
    </>
  )
}
