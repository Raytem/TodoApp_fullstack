import React from 'react'
import { Button } from '../components/UI/button/Button'
import { Textarea } from '../components/UI/textarea/Textarea'
import { WhiteBlock } from '../components/UI/whiteBlock/WhiteBlock'
import { TextAreaTypeEnum } from '../components/UI/textarea/TextAreaTypeEnum'
import '../css/createTodoPage.css'
import { useNavigate } from 'react-router-dom'
import { ButtonTypeEnum } from '../components/UI/button/ButtonTypeEnum'

export const CreateTodoPage = () => {

  const navigate = useNavigate();

  return (
    <div className='createTodoDiv'>
      <WhiteBlock style={{flexBasis: '100%'}}>
        <h2>New Todo</h2>
        <form>
          <Textarea 
            placeholder='Title' 
            rows={1} 
            type={TextAreaTypeEnum.TITLE} 
          />
          <Textarea 
            placeholder='Body' 
            rows={5} 
            type={TextAreaTypeEnum.BODY}
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
              type='submit' 
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}>
              Create
            </Button>
          </div>
        </form>
      </WhiteBlock>
    </div>
  )
}
