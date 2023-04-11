import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import TodoService from '../API/TodoService';
import { TodoList } from '../components/todoList/TodoList'
import { Select } from '../components/UI/select/Select';
import { Input } from '../components/UI/input/Input'
import { ITodo } from '../models/ITodo';
import '../css/todosPage.css';
import { useFetch } from '../hooks/useFetch';
import { useInfinitiePagination } from '../hooks/useInfinitiePagination';
import { Modal } from '../components/UI/modal/Modal';
import { Button } from '../components/UI/button/Button';
import { InputTypeEnum } from '../components/UI/input/InputTypeEnum';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '../components/UI/textarea/Textarea';
import { ButtonTypeEnum } from '../components/UI/button/ButtonTypeEnum';
import { Alert } from '../components/alert/Alert';
import { Switcher } from '../components/UI/switcher/Switcher';
import { TodoOptions } from '../components/UI/switcher/switcherEnums/TodoOptions';
import { AddPerformerModal } from '../components/addPerformerModal/AddPerformerModal';

import cfg from '../../config.json'

export const TodosPage: FC = () => {

    const parentRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLDivElement>(null);

    const [value, setValue] = useState<string>('');
    const [sort, setSort] = useState<string>('');
    const [isReverseOrder, setIsReverseOrder] = useState<boolean>(false);
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [page, setPage] = useState<number>(1);
    const [todoIdForDelete, setTodoIdForDelete] = useState<string>('');
    const [todosType, setTodosType] = useState<TodoOptions>(TodoOptions.OWN)

    const [addPerformerVisible, setAddPerformerVisible] = useState<boolean>(false);
    const [deleteAlertVisible, setDeleteAlertVisible] = useState<boolean>(false);

    const navigate = useNavigate();
    
    const {fetchData: fetchTodos, isLoading, error} = useFetch<ITodo>(async () => {
        const fetchedTodos: ITodo[] = await TodoService.getTodosByUserId(cfg.CURRENT_USER_ID)
        setTodos(fetchedTodos);
    });

    const sortedTodos: ITodo[] = useMemo(() => {
        if (sort) {
            const sorted: ITodo[] = 
            (sort !== 'isCompleted')
            ?
                [...todos].sort((a: ITodo, b: ITodo) => {
                    return a[sort].localeCompare(b[sort]);
                })
            :
                [...todos].sort((a: ITodo, b: ITodo) => {
                    return (a[sort] === b[sort]) ? 0 : a[sort] ? -1 : 1;
                })

            return !isReverseOrder ? sorted : sorted.reverse();
        }
        return todos;
    }, [todos, sort, isReverseOrder])


    const sortedAndSearchedTodos: ITodo[] = useMemo(() => {
        return sortedTodos.filter(todo => {
            return todo.title.toLowerCase().includes(value.toLowerCase());
        })
    }, [value, sortedTodos]);

    const sortedSearchedAndTypedTodos: ITodo[] = useMemo(() => {
        return sortedAndSearchedTodos.filter(todo => {
            switch (todosType) {
                case TodoOptions.COOPERATIVE:
                    return todo.cntOfUsers > 1;
                case TodoOptions.OWN:
                    return cfg.CURRENT_USER_ID === todo.userList[0];
                default: 
                    return todo
            }
        })
    }, [sortedAndSearchedTodos, todosType])

    useEffect(() => {
        fetchTodos();
    }, [page])


    async function completeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const todoId: string = e.target.dataset.todoid as string;
        const todo: ITodo = await TodoService.update(todoId, {isCompleted: e.target.checked});

        if(todo) {
            const updatedTodos: ITodo[] = todos.map(t => {
                if (t.id === todoId) {
                    const todoCopy: ITodo = {...t};
                    todoCopy.isCompleted = !t.isCompleted;
                    return todoCopy;
                }
                return t;
            })
            setTodos(updatedTodos);
        }
    }

    function editPerformersHandler() {
        setAddPerformerVisible(true);
    }

    async function updateHandler(e: React.MouseEvent<HTMLButtonElement>, titleText: string, bodyText: string) {
        const todoId: string = e.currentTarget.dataset.todoid as string;

        const updatedTodo: ITodo = await TodoService.update(todoId, {
            title: titleText,
            body: bodyText
        })

        if (updatedTodo) {
            const updatedTodoList: ITodo[] = todos.map(todo => {
                if (todo.id === todoId) {
                    const todoCopy: ITodo = {...todo};
                    todoCopy.title = titleText;
                    todoCopy.body = bodyText;
                    return todoCopy;
                }
                return todo;
            })
            setTodos(updatedTodoList)
        }
    }

    function deleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
        const todoId: string = e.currentTarget.dataset.todoid as string;
        setDeleteAlertVisible(true);
        setTodoIdForDelete(todoId);
    }

    async function deleteTodo() {
        //const todoForDelete: ITodo = TodoService.delete(userId, todoIdForDelete);
        if (true) {
            const updatedTodoList: ITodo[] = todos.filter(todo => {
                if (todo.id !== todoIdForDelete) {
                    return todo;
                }
            })
            setTodos(updatedTodoList)
        }
    }

    function createHandler(e: React.MouseEvent<HTMLButtonElement>) {
        navigate('/todos/createTodo');
    }

    function switcherChangeHandler(e: React.MouseEvent<HTMLDivElement>) {
        setTodosType(e.currentTarget.innerText as TodoOptions);
    }


    //-------------------------------------------------
    return (
    <div ref={parentRef}>

        <div className='todos-input'>
            <Input variant={InputTypeEnum.SEARCH} value={value} placeholder='Search' onChange={(e) => setValue(e.target.value)}/>

            <Select options={[
                {name: 'title', value: 'title'},
                {name: 'body', value: 'body'},
                {name: 'completed', value: 'isCompleted'},
                {name: 'date', value: 'creationDate'},
            ]}
            sortHandler={(e) => setSort(e.target.value)}
            orderHandler={(e) => setIsReverseOrder(e.target.checked)}
            />

            <Button id='addTodo' onClick={createHandler}>
                <div></div>
            </Button>
        </div>

        <Switcher 
            switchOptions={[TodoOptions.ALL ,TodoOptions.OWN, TodoOptions.COOPERATIVE]}
            defaultOption={todosType}
            onChange={switcherChangeHandler}
        />

        <TodoList todos={sortedSearchedAndTypedTodos} isLoading={isLoading} error={error}
            completeHandler={completeHandler}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            editPerformersHandler={editPerformersHandler}
        />
        <div ref={childRef}></div>


        <AddPerformerModal 
            isVisible={addPerformerVisible}
            setVisibility={() => setAddPerformerVisible(false)}
        />

        <Alert 
            body='Delete this todo?'
            okHandler={deleteTodo}
            isVisible={deleteAlertVisible}
            setAlertVisibility={() => setDeleteAlertVisible(false)}
        />

    </div>        
    )
}