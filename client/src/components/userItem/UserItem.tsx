import React, { FC, ReactNode } from 'react'
import { ButtonTypeEnum } from '../UI/button/ButtonTypeEnum'
import { ITodo } from '../../models/ITodo'
import { IUser } from '../../models/IUser'
import { Button } from '../UI/button/Button'
import styles from './userItem.module.css'

import config from '../../../config.json'
import { useAppSelector } from '../../hooks/redux'
import { getSelectedTodo } from '../../store/slices/selectedTodoSlice'
import { getCurrentUser } from '../../store/slices/currentUserSlice'

interface UserItemProps {
    user: IUser,
    addPerformerHandler: (userId: string) => Promise<void>,
    removePerformerHandler: (userId: string) => Promise<void>
}

export const UserItem: FC<UserItemProps> = ({user, addPerformerHandler, removePerformerHandler}) => {

  const selectedTodo = getSelectedTodo();
  const currentUser = getCurrentUser();

  return (
    <div className={styles.userItemContainer}>
      <h4>{user.nickName}</h4>
      {
        currentUser._id === selectedTodo.userList[0]
        ?
          <div className={styles.buttons}>
            {
              selectedTodo.userList.includes(user._id)
              ?
                <Button
                  variant={ButtonTypeEnum.RED}
                  onClick={() => removePerformerHandler(user._id)}
                >
                  –
                </Button>
              :
                <Button 
                  variant={ButtonTypeEnum.BLUE}
                  onClick={() => addPerformerHandler(user._id)}
                >
                  +
                </Button>
            }
          </div>
        :
          <div></div>
      }
    </div>
  )
}
