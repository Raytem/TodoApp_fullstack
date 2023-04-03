import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import TodoService from '../API/TodoService';
import { TodoList } from '../components/TodoList'
import { Select } from '../components/UI/select/Select';
import { Input } from '../components/UI/input/Input'
import { ITodo } from '../models/ITodo';
import '../css/todosPage.css';
import { useFetch } from '../hooks/useFetch';
import { useInfinitiePagination } from '../hooks/useInfinitiePagination';

export const TodosPage: FC = () => {

    const parentRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLDivElement>(null);

    const [value, setValue] = useState<string>('');
    const [sort, setSort] = useState<string>('');
    const [todos, setTodos] = useState<ITodo[]>([]);

    const [page, setPage] = useState<number>(1);

    // const intersected = useInfinitiePagination(parentRef, childRef, () => {
    //     console.log('message');
    // })
    
    const {fetchData: fetchTodos, isLoading, error} = useFetch<ITodo>(async () => {
        const fetchedTodos: ITodo[] = await TodoService.getAll()
        setTodos(fetchedTodos);
    });

    const sortedTodos: ITodo[] = useMemo(() => {
        if (sort) {
            return [...todos].sort((a: ITodo, b: ITodo) => {
                return a[sort].localeCompare(b[sort]);
            })
        }
        return todos;
    }, [todos, sort])

    const sortedAndSearchedTodos: ITodo[] = useMemo(() => {
        return sortedTodos.filter((todo: ITodo) => {
            return todo.title.toLowerCase().includes(value.toLowerCase());
        })
    }, [value, sortedTodos]);

    useEffect(() => {
        fetchTodos();
    }, [page])

    return (
    <div ref={parentRef}>
        <div className='todos-input'>
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder='Input todo title'/>
            <Select options={[
                {name: 'title', value: 'title'},
                {name: 'body', value: 'body'}
            ]}
            sortHandler={(e) => setSort(e.target.value)}
            />
        </div>

        <TodoList todos={sortedAndSearchedTodos} isLoading={isLoading} error={error}></TodoList>
        <div ref={childRef}></div>
    </div>        
    )
}