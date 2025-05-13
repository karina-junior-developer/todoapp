import { useState } from 'react';

export const useSortTodos = (setTodos, todos, originalTodos) => {
	const [isSorted, setIsSorted] = useState(false); // for sorting - initial state

	const toSort = () => {
		const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
		setTodos(sortedTodos);
		setIsSorted(true);
	};

	const toDefaultPosition = () => {
		setTodos(originalTodos);
		setIsSorted(false);
	};

	return {
		toSort,
		toDefaultPosition,
		isSorted,
	};
};
