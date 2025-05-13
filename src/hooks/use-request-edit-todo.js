import { useState } from 'react';

export const useRequestEditTodo = (todosURL, setRefreshTodoItems, refreshTodoItems) => {
	const [isEditingTodo, setIsEditingTodo] = useState(false); // for adjustment process, process explanation - Process
	const [editedTodoValue, setEditedTodoValue] = useState(''); // for adjustment process, target.value - Value
	const [editedTodoId, setEditedTodoId] = useState(null); // for adjustment process - Id
	const [newError, setNewError] = useState(null); // for adjustment process - Error

	const startEditing = (id, title) => {
		setEditedTodoId(id);
		setEditedTodoValue(title);
		setIsEditingTodo(true);
	};

	const cancelEditing = () => {
		setEditedTodoId(null);
		setEditedTodoValue('');
		setIsEditingTodo(false);
		setNewError(null);
	};

	const editAndSaveTodo = (id) => {
		if (editedTodoValue.trim() === '') {
			setNewError('Value cannot be empty');
			return;
		}

		fetch(`${todosURL}/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: editedTodoValue,
			}),
		})
			.then((rawTodo) => rawTodo.json())
			.then((finalTodo) => {
				console.log('Todo successfully adjusted!', finalTodo);
				setNewError(null);
				setRefreshTodoItems(!refreshTodoItems);
			})
			.finally(() => cancelEditing());
	};

	const onChangeEditingTodoTask = (event) => {
		setNewError(null);
		setEditedTodoValue(event.target.value);
	};

	const onKeyDownEditingTask = (event, id) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			editAndSaveTodo(id);
		}
	};

	return {
		editedTodoValue,
		isEditingTodo,
		editedTodoId,
		newError,
		startEditing,
		cancelEditing,
		editAndSaveTodo,
		onChangeEditingTodoTask,
		onKeyDownEditingTask,
	};
};
