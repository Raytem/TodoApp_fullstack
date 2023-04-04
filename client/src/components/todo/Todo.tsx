import React, { FC, InputHTMLAttributes, ReactNode } from 'react'
import TodoService from '../../API/TodoService'
import { ITodo } from '../../models/ITodo'
import { dateFormatter } from '../../utils/dateFormatter'
import { Button } from '../UI/button/Button'
import styles from './todo.module.css'

interface todoItemProps {
    todo: ITodo
    completeHandler?: () => void,
    updateHandler?: () => void,
    deleteHandler?: () => void
}

export const Todo: FC<todoItemProps> = ({todo, completeHandler, updateHandler, deleteHandler}) => {

  return (
    <div className={styles.todo}>

        <input className={styles.todo__checkbox} type='checkbox' 
          checked={todo.isCompleted} 
          onChange={completeHandler}
        />

      <div className={styles.todoInner}>

        <div className={styles.todoHeader}>
          <h4>{todo.title}</h4>
          <div className={styles.todoHeader__creationDate}>{dateFormatter(todo.creationDate)}</div>
        </div>

        <p className={styles.todo__body}>{todo.body}</p>

        <div className={styles.todoFooter}>
          <Button>Add Performer</Button>
          <div className={styles.todoRightButtons}>
            <Button>Edit</Button>
            <Button onClick={deleteHandler}>Delete</Button>
          </div>
        </div>

      </div>
    </div>
  )
}