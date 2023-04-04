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

export const TodosPage: FC = () => {

    const parentRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLDivElement>(null);

    const [value, setValue] = useState<string>('');
    const [sort, setSort] = useState<string>('');
    const [isReverseOrder, setIsReverseOrder] = useState<boolean>(false);
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    
    const {fetchData: fetchTodos, isLoading, error} = useFetch<ITodo>(async () => {
        const fetchedTodos: ITodo[] = await TodoService.getAll()
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

            return isReverseOrder ? sorted : sorted.reverse();
        }
        return todos;
    }, [todos, sort, isReverseOrder])


    const sortedAndSearchedTodos: ITodo[] = useMemo(() => {
        return sortedTodos.filter((todo: ITodo) => {
            return todo.title.toLowerCase().includes(value.toLowerCase());
        })
    }, [value, sortedTodos]);


    useEffect(() => {
        fetchTodos();
    }, [page])


    async function completeHandler() {

    }

    async function updateHandler() {
        
    }

    async function deleteHandler() {
        
    }


    return (
    <div ref={parentRef}>

        <div className='todos-input'>
            <Input value={value} placeholder='Search' onChange={(e) => setValue(e.target.value)}/>

            <Select options={[
                {name: 'title', value: 'title'},
                {name: 'body', value: 'body'},
                {name: 'completed', value: 'isCompleted'},
                {name: 'date', value: 'creationDate'},
            ]}
            sortHandler={(e) => setSort(e.target.value)}
            orderHandler={(e) => setIsReverseOrder(e.target.checked)}
            />

            <Button id='addTodo' onClick={() => setCreateModalVisible(true)}>
                <div></div>
            </Button>
        </div>

        <TodoList todos={sortedAndSearchedTodos} isLoading={isLoading} error={error}
            completeHandler={completeHandler}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
        />
        <div ref={childRef}></div>


        <Modal isVisible={createModalVisible} setVisible={() => setCreateModalVisible(false)}>
            <form action="">
                <Input name='title' placeholder='title'></Input>
                <textarea name='body' style={{width: '100%', minHeight: '100px'}}></textarea>
                <button>Create</button>
            </form>
        </Modal>

    </div>        
    )
}