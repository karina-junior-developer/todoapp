import { useState, useEffect } from 'react';

export const useRequestGetTodos = (
	todosURL,
	setOriginalTodos,
	refreshTodoItems,
	setTodos,
) => {
	const [isLoadingTodosData, setIsLoadingTodosData] = useState(false); // for taking todo list data from DB

	useEffect(() => {
		setIsLoadingTodosData(true);
		fetch(todosURL)
			.then((rowTodos) => rowTodos.json())
			.then((finalTodos) => {
				setTodos(finalTodos);
				setOriginalTodos(finalTodos);
			})
			.finally(() => setIsLoadingTodosData(false));
	}, [refreshTodoItems]);

	return { isLoadingTodosData };
};
