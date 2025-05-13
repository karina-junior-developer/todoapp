import { useState } from 'react';

export const useSearchTodos = (todos) => {
	const [searchedTodoValue, setSearchedTodoValue] = useState(''); // for searching bar target.value

	const onChangeSearchedValue = (event) => {
		setSearchedTodoValue(event.target.value);
	};

	const foundValues = todos.filter(({ title }) => {
		return title.toLowerCase().includes(searchedTodoValue.toLowerCase());
	});

	return { onChangeSearchedValue, foundValues, searchedTodoValue };
};
