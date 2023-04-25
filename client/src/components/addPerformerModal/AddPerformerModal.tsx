import React, { FC, useEffect, useMemo, useState } from 'react'
import UserService from '../../API/UserService';
import { InputTypeEnum } from '../UI/input/InputTypeEnum';
import { UserOptions } from '../UI/switcher/switcherEnums/UserOptions';
import { useFetch } from '../../hooks/useFetch';
import { IUser } from '../../models/IUser';
import { Input } from '../UI/input/Input';
import { Modal } from '../UI/modal/Modal'
import { Switcher } from '../UI/switcher/Switcher';
import { UserList } from '../userList/UserList';
import styles from './addPerformerModal.module.css'
import { getSelectedTodo, setSelectedTodo } from '../../store/slices/selectedTodoSlice';
import { getCurrentUser } from '../../store/slices/currentUserSlice';
import { todoApi } from '../../API/TodoService';
import { useAppDispatch } from '../../hooks/redux';
import { ITodo } from '../../models/ITodo';

interface AddPerformerModalProps {
    isVisible: boolean,
    setVisibility: () => void;
}

export const AddPerformerModal: FC<AddPerformerModalProps> = ({isVisible, setVisibility}) => {

    const selectedTodo = getSelectedTodo();
    const currentUser = getCurrentUser();

    const {data: fetchedTodos} = todoApi.useGetTodosByUserIdQuery(currentUser._id);
    const dispatch = useAppDispatch();

    const [api_addTodoByUserId, {}] = todoApi.useAddTodoByUserIdMutation();
    const [api_delTodoByUserId, {}] = todoApi.useDelTodoByUserIdMutation();

    const [users, setUsers] = useState<IUser[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [usersType, setUsersType] = useState<UserOptions>(UserOptions.CURRENT)
    
    let {fetchData: fetchUsers, isLoading, error} = useFetch(async () => {
        const fetchedUsers: IUser[] = await UserService.getAll();
        setUsers(fetchedUsers);
    })

    const searchedUsers: IUser[] = useMemo(() => {
        return users.filter(user => {
            if (searchValue !== '') {
                return user.nickName.toLowerCase().includes(searchValue.toLowerCase());
            }
            return users;
        })
    }, [users, searchValue])

    const searchedAndTypedUsers: IUser[] = useMemo(() => {
        return searchedUsers.filter(user => {
            switch (usersType) {
                case UserOptions.CURRENT:
                    return selectedTodo.userList.includes(user._id);
                default: 
                    return !selectedTodo.userList.includes(user._id);
            }
        })
    }, [searchedUsers, usersType])

    useEffect(() => {
        fetchUsers();
        const updatedSelectedTodo = fetchedTodos?.find(todo => todo.id === selectedTodo.id)
        if (updatedSelectedTodo) {
            dispatch(setSelectedTodo(updatedSelectedTodo))
        }
    }, [selectedTodo, fetchedTodos])

    function switcherChangeHandler(e: React.MouseEvent<HTMLDivElement>) {
        setUsersType(e.currentTarget.innerHTML as UserOptions);
    }

    async function addPerformerHandler(userId: string) {
        api_addTodoByUserId({userId, todoId: selectedTodo.id});
    }

    async function removePerformerHandler(userId: string) {
        api_delTodoByUserId({userId, todoId: selectedTodo.id});
        setUsers(searchedAndTypedUsers);
    }

    return (
        <Modal 
            title='Performers' 
            isVisible={isVisible} 
            maxWidth={'530px'}
            setVisibility={() => {
                setVisibility(); 
                setSearchValue('');
                setUsersType(UserOptions.CURRENT);
            }}
        >
            <div className={styles.addPerformerModal}>
                <Input 
                    variant={InputTypeEnum.SEARCH} 
                    placeholder='Search'
                    onChange={(e) => setSearchValue(e.target.value)}
                />

                {
                    currentUser._id === selectedTodo.userList[0]
                    ?
                        <Switcher 
                        switchOptions={[UserOptions.OTHER, UserOptions.CURRENT]}
                        defaultOption={usersType}
                        onChange={switcherChangeHandler}
                        style={{marginTop: '20px'}}
                        />
                    :
                        <div></div>
                }

                <div className={styles.userListDiv}>
                <UserList
                    users={searchedAndTypedUsers}
                    isLoading={isLoading}
                    error={error}
                    addPerformerHandler={addPerformerHandler}
                    removePerformerHandler={removePerformerHandler}
                />
                </div>
            </div>
        </Modal>
    )
}
