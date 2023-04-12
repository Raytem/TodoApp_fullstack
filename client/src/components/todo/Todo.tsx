import React, { FC, useRef, useState } from 'react'
import { ButtonTypeEnum } from '../UI/button/ButtonTypeEnum'
import { TextAreaTypeEnum } from '../UI/textarea/TextAreaTypeEnum'
import { ITodo } from '../../models/ITodo'
import { dateFormatter } from '../../utils/dateFormatter'
import { ReadMoreLess } from '../readMoreLess/ReadMoreLess'
import { Button } from '../UI/button/Button'
import { Textarea } from '../UI/textarea/Textarea'
import styles from './todo.module.css'
import { useDispatch } from 'react-redux'
import { setSelectedTodo } from '../../store/slices/selectedTodoSlice'

import cfg from '../../../config.json'

interface todoItemProps {
    todo: ITodo,
    completeHandler: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>,
    editPerformersHandler: (e: React.MouseEvent<HTMLButtonElement>) => void,
    updateHandler: (e: React.MouseEvent<HTMLButtonElement>, titleText: string, bodyText: string) => Promise<void>,
    deleteHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Todo: FC<todoItemProps> = (
  {todo, completeHandler, updateHandler, deleteHandler, editPerformersHandler}
) => {

  const dispatch = useDispatch();

  const [showMore, setShowMore] = useState<boolean>(false);
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);

  const title = useRef<HTMLHeadingElement>(null);
  const body = useRef<HTMLParagraphElement>(null);

  const [titleText, setTitleText] = useState<string>(todo.title);
  const [bodyText, setBodyText] = useState<string>(todo.body);

  const titleAreaHeight: number = title.current?.offsetHeight as number;
  const bodyAreaHeight: number = body.current?.offsetHeight as number;

  const charLimit: number = 420;

  return (
    <div className={styles.todo}>
      {
        (!isEditModeOn)
        ?
          <>
            <input className={styles.todo__checkbox} type='checkbox' 
              data-todoid={todo.id} 
              checked={todo.isCompleted} 
              onChange={completeHandler}
            />

            <div className={styles.todoInner}>
              <div className={styles.todoHeader}>
                <h4 ref={title}>{titleText}</h4>
                <div className={styles.todoHeader__creationDate}>
                  {dateFormatter(todo.createdAt)}
                </div>
              </div>

              <ReadMoreLess show={showMore} limit={charLimit}>
                <p ref={body} className={styles.todo__body}>{bodyText}</p>
              </ReadMoreLess>

              <div className={styles.todoCreatorInfo}>
                {
                  todo.cntOfUsers > 1
                    ? `Creator: ${todo.creator}, Performers: ${todo.cntOfUsers - 1}`
                    : `Creator: ${todo.creator}`
                }
              </div>

                <div className={styles.todoFooter}>
                <Button
                  variant={ButtonTypeEnum.BLUE}
                  data-todoid={todo.id}
                  onClick={(e) => {
                    editPerformersHandler(e);
                    dispatch(setSelectedTodo(todo));
                  }}
                  >
                    Performers
                </Button>
                {
                  todo.userList[0] === cfg.CURRENT_USER_ID 
                  ?
                    <div className={styles.todoRightButtons}>
                      <Button 
                        variant={ButtonTypeEnum.BLUE} 
                        onClick={(e) => {
                          setShowMore(true)
                          setIsEditModeOn(true);
                        }} 
                        data-todoid={todo.id}>
                          Edit
                      </Button>
                      <Button
                        variant={ButtonTypeEnum.RED}
                        onClick={deleteHandler}
                        data-todoid={todo.id}>
                          Delete
                      </Button>
                    </div>
                  :
                    <div></div>
                }
              </div>
            </div>
          </>
          
        :

          <>
            <input className={styles.todo__checkbox} type='checkbox' 
              data-todoid={todo.id}
              checked={todo.isCompleted} 
              onChange={completeHandler}
            />

            <div className={styles.todoInner}>
              <div className={styles.todoHeader}>
                <Textarea 
                  onChange={(e) => setTitleText(e.target.value)}
                  defaultValue={todo.title} 
                  type={TextAreaTypeEnum.TITLE} 
                  style={{height: `${titleAreaHeight}px`}}
                />
                <div className={styles.todoHeader__creationDate}>
                  {dateFormatter(todo.createdAt)}
                </div>
              </div>

              <Textarea
                onChange={(e) => setBodyText(e.target.value)}
                defaultValue={todo.body}
                type={TextAreaTypeEnum.BODY}
                style={{height: `${bodyAreaHeight}px`}}
              />

              <div className={styles.todoCreatorInfo}>
                {
                  todo.cntOfUsers > 1
                    ? `Creator: ${todo.creator}, Performers: ${todo.cntOfUsers - 1}`
                    : `Creator: ${todo.creator}`
                }
              </div>

              <div className={styles.todoFooter}>
                <Button
                  variant={ButtonTypeEnum.BLUE} 
                  data-todoid={todo.id}
                  onClick={(e) => {
                    editPerformersHandler(e);
                    dispatch(setSelectedTodo(todo));
                  }}
                  >
                    Performers
                </Button>
                <div className={styles.todoRightButtons}>
                  <Button 
                    variant={ButtonTypeEnum.BLUE} 
                    onClick={(e) => {
                      setIsEditModeOn(false)
                      updateHandler(e, titleText, bodyText)
                    }} 
                    data-todoid={todo.id}>
                      Ok
                  </Button>
                  <Button 
                    variant={ButtonTypeEnum.RED} 
                    onClick={deleteHandler} 
                    data-todoid={todo.id}>
                      Delete
                  </Button>
                </div>
              </div>
            </div>
          </>
      }
    </div>
  )
}