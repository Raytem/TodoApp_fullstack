import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { ITodo } from '../../models/ITodo'
import { IUser } from '../../models/IUser'
import { selectedTodoSelector } from '../../store/slices/selectedTodoSlice'
import { ItemsNotFound } from '../itemsNotFound/ItemsNotFound'
import { Loader } from '../UI/loader/Loader'
import { UserItem } from '../userItem/UserItem'

import cfg from '../../../config.json'
import { AnimatePresence, motion } from 'framer-motion'

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

						<AnimatePresence mode="popLayout">
						{
							users.map(user =>  
								<motion.li
									layout
									initial={{ scale: 0.9, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0.9, opacity: 0 }}
									transition={{ type: "just"}}
									key={user._id}
								>
										<UserItem
												key={user._id} 
												user={user}
												addPerformerHandler={addPerformerHandler}
												removePerformerHandler={removePerformerHandler}
										/>
								</motion.li>
							)
						}
				</AnimatePresence>
				</>  
		)
}
