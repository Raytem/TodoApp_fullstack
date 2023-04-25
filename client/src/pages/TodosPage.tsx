import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
// import TodoService from '../API/TodoService';
import { TodoList } from '../components/todoList/TodoList'
import { Select } from '../components/UI/select/Select';
import { Input } from '../components/UI/input/Input'
import { ITodo } from '../models/ITodo';
import '../css/todosPage.css';
import { Button } from '../components/UI/button/Button';
import { InputTypeEnum } from '../components/UI/input/InputTypeEnum';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../components/alert/Alert';
import { Switcher } from '../components/UI/switcher/Switcher';
import { TodoOptions } from '../components/UI/switcher/switcherEnums/TodoOptions';
import { AddPerformerModal } from '../components/addPerformerModal/AddPerformerModal';

import { getCurrentUser } from '../store/slices/currentUserSlice';
import { todoApi } from '../API/TodoService';

export const TodosPage: FC = () => {
	
	const currentUser = getCurrentUser();

	const parentRef = useRef<HTMLDivElement>(null);
	const childRef = useRef<HTMLDivElement>(null);

	const [value, setValue] = useState<string>('');
	const [sort, setSort] = useState<string>('');
	const [isReverseOrder, setIsReverseOrder] = useState<boolean>(false);
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [todoIdForDelete, setTodoIdForDelete] = useState<string>('');
	const [todosType, setTodosType] = useState<TodoOptions>(TodoOptions.OWN)

	const [addPerformerVisible, setAddPerformerVisible] = useState<boolean>(false);
	const [deleteAlertVisible, setDeleteAlertVisible] = useState<boolean>(false);

	const navigate = useNavigate();
	
	// const {fetchData: fetchTodos, isLoading, error} = useFetch<ITodo>(async () => {
	// 	if (currentUser._id) {
	// 		const fetchedTodos: ITodo[] = await TodoService.getTodosByUserId(currentUser._id)
	// 		setTodos(fetchedTodos);
	// 	}
	// });

	const {data: fetchedTodos, isLoading, error} = todoApi.useGetTodosByUserIdQuery(currentUser._id);
	const [api_deleteTodo] = todoApi.useDeleteTodoMutation();

	const sortedTodos: ITodo[] = useMemo(() => {
		if (sort) {
			let sorted: ITodo[];

			if (sort === 'isCompleted') {
				sorted = [...todos].sort((a: ITodo, b: ITodo) => {
					return (a[sort] === b[sort]) ? 0 : a[sort] ? -1 : 1;
				});
			} else if (sort === 'creationDate') {
				sorted = [...todos].sort((a, b) => a[sort] - b[sort]);
			} else {
				sorted = [...todos].sort((a: ITodo, b: ITodo) => {
					return a[sort].localeCompare(b[sort]);
				});
			}

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
					return currentUser._id === todo.userList[0];
				default: 
					return todo
			}
		})
	}, [sortedAndSearchedTodos, todosType])

	useEffect(() => {
		if (!isLoading) {
			setTodos(fetchedTodos as ITodo[]);
		}
	}, [fetchedTodos])

	function editPerformersHandler() {
		setAddPerformerVisible(true);
	}

	function deleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
		const todoId: string = e.currentTarget.dataset.todoid as string;
		setDeleteAlertVisible(true);
		setTodoIdForDelete(todoId);
	}

	function deleteTodo() {
		api_deleteTodo({todoId: todoIdForDelete, userId: currentUser._id});
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

		<TodoList 
			todos={sortedSearchedAndTypedTodos} 
			isLoading={isLoading} 
			error={error}
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