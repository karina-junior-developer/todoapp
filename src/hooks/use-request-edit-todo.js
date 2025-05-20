import { useState } from 'react';

export const useRequestEditTodo = (
	todosURL,
	setRefreshTodoItems,
	refreshTodoItems,
	setTodos,
) => {
	const [isEditingTodo, setIsEditingTodo] = useState(false); // for adjustment process - Process
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

	const editAndSaveTodo = async (id) => {
		if (editedTodoValue.trim() === '') {
			setNewError('Value cannot be empty');
			return;
		}

		try {
			const response = await fetch(`${todosURL}/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({ title: editedTodoValue }),
			});

			if (!response.ok) {
				throw new Error(`Failed to save. Status: ${response.status}`);
			}

			const updatedTodo = await response.json();
			console.log('Updated todo:', updatedTodo);

			setTodos((prevTodos) =>
				prevTodos.map((todo) =>
					todo.id === id ? { ...todo, title: updatedTodo.title } : todo,
				),
			);

			setNewError(null);
			cancelEditing();
		} catch (err) {
			console.error('Save failed due to following error:', err);
			setNewError('Could not save the todo. Please try again later.');
		}
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
