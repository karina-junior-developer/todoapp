import { createContext } from 'react';
export const TodoContext = createContext({
	todos: [],
	setTodos: () => {},
	refreshTodoItems: false,
	setRefreshTodoItems: () => {},
});
