import { useState } from 'react';

export const useRequestDeleteTodo = (setRefreshTodoItems, refreshTodoItems, todosURL) => {
	const [isDeletingTodo, setIsDeletingTodo] = useState(false);

	const requestDeleteTodo = (id) => {
		setIsDeletingTodo(true);

		fetch(`${todosURL}/${id}`, {
			method: 'DELETE',
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error('Failed to delete todo');
				}
				console.log(`Todo ${id} deleted successfully`);
				setRefreshTodoItems(!refreshTodoItems);
			})
			.catch((err) => {
				console.error('Delete failed:', err.message);
			})
			.finally(() => setIsDeletingTodo(false));
	};

	return { requestDeleteTodo, isDeletingTodo };
};
