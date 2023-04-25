import React, { useState } from 'react'
import { Button } from '../components/UI/button/Button'
import { Textarea } from '../components/UI/textarea/Textarea'
import { WhiteBlock } from '../components/UI/whiteBlock/WhiteBlock'
import { TextAreaTypeEnum } from '../components/UI/textarea/TextAreaTypeEnum'
import '../css/createTodoPage.css'
import { useNavigate } from 'react-router-dom'
import { ButtonTypeEnum } from '../components/UI/button/ButtonTypeEnum'
import { todoApi } from '../API/TodoService'
import { getCurrentUser } from '../store/slices/currentUserSlice'

interface NewTodo {
  title: string;
  body: string;
}

export const CreateTodoPage = () => {

  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState<NewTodo>({title: '', body: ''});

  const currentUser = getCurrentUser();
  const [createTodo, {isError: createError}] = todoApi.useCreateTodoMutation();

  const createTodoHandler = () => {
    if (newTodo.title !== '' && newTodo.body !== '') {
      createTodo({ userId: currentUser._id, body: newTodo });
      if (!createError) {
        navigate(-1);
      }
    }
  }

  return (
    <div className='createTodoDiv'>
      <WhiteBlock style={{flexBasis: '100%', margin: '30px 0'}}>
        <h2>New Todo</h2>
        <form>
          <Textarea 
            placeholder='Title' 
            rows={1} 
            type={TextAreaTypeEnum.TITLE} 
            value={newTodo.title}
            onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
          />
          <Textarea 
            placeholder='Body' 
            rows={5} 
            type={TextAreaTypeEnum.BODY}
            value={newTodo.body}
            onChange={(e) => setNewTodo({...newTodo, body: e.target.value})}
          />

          <div className='createTodo-buttons'>
            <Button variant={ButtonTypeEnum.RED} onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}>
                {'< Back'}
            </Button>
            <Button 
              variant={ButtonTypeEnum.BLUE} 
              onClick={(e) => {
                e.preventDefault();
                createTodoHandler();
              }}>
              Create
            </Button>
          </div>
        </form>
      </WhiteBlock>
    </div>
  )
}
