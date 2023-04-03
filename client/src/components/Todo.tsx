import React, { FC, InputHTMLAttributes, ReactNode } from 'react'
import TodoService from '../API/TodoService'
import { ITodo } from '../models/ITodo'

interface todoItemProps {
    todo: ITodo
}

export const Todo: FC<todoItemProps> = ({todo}) => {

  async function checkboxChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedTodo: ITodo = await TodoService.update(todo.id, {isCompleted: e.target.checked});
    if (updatedTodo) {
      e.target.checked = updatedTodo.isCompleted;
    }
  }

  return (
    <div style={{border: '2px solid black', marginBottom: '15px', borderRadius: '15px', padding: '5px 25px', boxShadow: '0 0 12px -1px'}}>
        <input type='checkbox' checked={todo.isCompleted} 
          onChange={checkboxChangeHandler}
          style={{width: 30, height: 30}}
        />
        <h4 style={{textAlign: 'left'}}>{todo.title}</h4>
        <p style={{textAlign: 'left'}}>{todo.body}</p>
        {/* <button onClick={deleteHandler}>Delete</button> */}
    </div>
  )
}