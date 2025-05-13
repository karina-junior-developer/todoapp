import { useState } from 'react';

export const useRequestDeleteTodo = (setRefreshTodoItems, refreshTodoItems, todosURL) => {
	const [isDeletingTodo, setIsDeletingTodo] = useState(false); // for deleting process

	const requestDeleteTodo = (id) => {
		setIsDeletingTodo(true);

		fetch(`${todosURL}/${id}`, {
			method: 'DELETE',
		})
			.then((rawTodo) => rawTodo.json())
			.then((finalTodo) => {
				console.log('Todo deleted', finalTodo);
				setRefreshTodoItems(!refreshTodoItems);
			})
			.finally(() => setIsDeletingTodo(false));
	};
	return { requestDeleteTodo, isDeletingTodo };
};
