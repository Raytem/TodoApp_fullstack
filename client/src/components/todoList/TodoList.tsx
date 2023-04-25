import React, { Dispatch, FC, SetStateAction, useRef } from 'react'
import { ITodo } from '../../models/ITodo'
import { ItemsNotFound } from '../itemsNotFound/ItemsNotFound'
import { Todo } from '../todo/Todo'
import { Loader } from '../UI/loader/Loader'
import { AnimatePresence, motion } from 'framer-motion'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'

interface TodoListProps {
    todos: ITodo[],
    isLoading: boolean,
    error: FetchBaseQueryError | SerializedError | undefined,
    deleteHandler: (e: React.MouseEvent<HTMLButtonElement>) => void,
    editPerformersHandler: () => void
}

export const TodoList: FC<TodoListProps> = (
  {todos, isLoading, error, deleteHandler, editPerformersHandler}
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
                    deleteHandler={deleteHandler}
                    editPerformersHandler={editPerformersHandler}
                  />
                </motion.li>
              )
            }
        </AnimatePresence>
    </>
  )
}
