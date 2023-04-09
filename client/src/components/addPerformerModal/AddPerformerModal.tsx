import React, { FC, useEffect, useMemo, useState } from 'react'
import UserService from '../../API/UserService';
import { InputTypeEnum } from '../../enums/InputTypeEnum';
import { UserOptions } from '../../enums/switcherEnums/UserOptions';
import { useFetch } from '../../hooks/useFetch';
import { IUser } from '../../models/IUser';
import { Input } from '../UI/input/Input';
import { Modal } from '../UI/modal/Modal'
import { Switcher } from '../UI/switcher/Switcher';
import { UserList } from '../userList/UserList';
import styles from './addPerformerModal.module.css'
import config from '../../../config.json'
import { useSelector } from 'react-redux';
import { selectedTodoSelector } from '../../store/slices/selectedTodoSlice';

interface AddPerformerModalProps {
    isVisible: boolean,
    setVisibility: () => void;
}

export const AddPerformerModal: FC<AddPerformerModalProps> = ({isVisible, setVisibility}) => {

    const selectedTodo = useSelector(selectedTodoSelector.getSelectedTodo);

    const [users, setUsers] = useState<IUser[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [usersType, setUsersType] = useState<UserOptions>(UserOptions.CURRENT)
    
    let {fetchData: fetchUsers, isLoading, error} = useFetch(async () => {
        const fetchedUsers: IUser[] = await UserService.getAll();
        setUsers(fetchedUsers);
    })

    useEffect(() => {
        fetchUsers();
    }, [selectedTodo])

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

    function switcherChangeHandler(e: React.MouseEvent<HTMLDivElement>) {
        setUsersType(e.currentTarget.innerHTML as UserOptions);
    }

    async function addPerformerHandler(userId: string) {
        console.log(userId)
    }

    async function removePerformerHandler(userId: string) {
        console.log(userId)
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
                    config.CURRENT_USER_ID === selectedTodo.userList[0]
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
