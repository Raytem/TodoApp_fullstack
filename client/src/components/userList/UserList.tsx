import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { ITodo } from '../../models/ITodo'
import { IUser } from '../../models/IUser'
import { selectedTodoSelector } from '../../store/slices/selectedTodoSlice'
import { ItemsNotFound } from '../itemsNotFound/ItemsNotFound'
import { Loader } from '../UI/loader/Loader'
import { UserItem } from '../userItem/UserItem'

import './userList.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import cfg from '../../../config.json'

interface UserListProps {
    users: IUser[],
    isLoading: boolean,
    error: Error | null,
    addPerformerHandler: (userId: string) => Promise<void>,
    removePerformerHandler: (userId: string) => Promise<void>
}

export const UserList: FC<UserListProps> = (
    {users, isLoading, error, addPerformerHandler, removePerformerHandler}
) => {
 
    const selectedTodo = useSelector(selectedTodoSelector.getSelectedTodo);

    users = users.filter(user => user._id !== selectedTodo.userList[0]);

    return (
        <>

            {isLoading &&  <Loader/>}

            {(!isLoading && (error || users.length === 0)) && <ItemsNotFound/>}

            <TransitionGroup className='userList'>
                {
                    users.map(user => 
                        <CSSTransition
                            key={user._id}
                            timeout={500}
                            classNames={'user'}
                        >
                                <UserItem
                                key={user._id} 
                                user={user}
                                addPerformerHandler={addPerformerHandler}
                                removePerformerHandler={removePerformerHandler}
                            />
                        </CSSTransition>
                    )
                }
            </TransitionGroup>
        </>  
    )
}
