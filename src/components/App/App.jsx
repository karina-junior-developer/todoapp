import {
	useRequestAddTodo,
	useRequestGetTodos,
	useSortTodos,
	useSearchTodos,
} from '../../hooks/index';
import { todosURL } from '../../constants/constants';
import styles from './App.module.css';
import { useState } from 'react';
import { SearchBlock } from '../SearchBlock/SearchBlock';
import { MainInputBlock } from '../MainInputBlock/MainInputBlock';
import { LoadingBlock } from '../LoadingBlock/LoadingBlock';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { TodoContext } from '../../contexts/TodoContext';

export const App = () => {
	const { todos, setTodos } = useContext(TodoContext); // for todos []
	const [refreshTodoItems, setRefreshTodoItems] = useState(false); // for updating todos

	const [originalTodos, setOriginalTodos] = useState([]); // for sorting - saving original []

	// General, main todo list data gathering - DONE
	const { isLoadingTodosData } = useRequestGetTodos(
		todosURL,
		setOriginalTodos,
		refreshTodoItems,
		setTodos,
	);

	// Add todo item to the list - DONE
	const {
		requestAddTodo,
		onKeyDownTodoTask,
		onChangeTodoTask,
		isAddingTodo,
		error,
		todoValue,
	} = useRequestAddTodo(todosURL, setRefreshTodoItems, refreshTodoItems);

	// Search - DONE
	const { onChangeSearchedValue, searchedTodoValue, foundValues } =
		useSearchTodos(todos);

	// Sort - DONE
	const { toSort, toDefaultPosition, isSorted } = useSortTodos(
		setTodos,
		todos,
		originalTodos,
	);

	return (
		<>
			<SearchBlock
				searchedTodoValue={searchedTodoValue}
				onChangeSearchedValue={onChangeSearchedValue}
				isSorted={isSorted}
				toDefaultPosition={toDefaultPosition}
				toSort={toSort}
			/>
			<div className={styles.mainBlock}>
				<MainInputBlock
					error={error}
					todoValue={todoValue}
					onChangeTodoTask={onChangeTodoTask}
					onKeyDownTodoTask={onKeyDownTodoTask}
					requestAddTodo={requestAddTodo}
					isAddingTodo={isAddingTodo}
				/>
				<div className={styles.todoSection}>
					{isLoadingTodosData ? (
						<LoadingBlock />
					) : (
						<ul>
							{(searchedTodoValue ? foundValues : todos).map(
								({ title, id }) => {
									const displayableTitle =
										title.length > 10
											? title.slice(0, 10) + '...'
											: title;
									return (
										<li key={id}>
											<span className={styles.spanTitle}>
												<NavLink
													to={`/task/${id}`}
													className={styles.link}
												>
													{displayableTitle}
												</NavLink>
											</span>
										</li>
									);
								},
							)}
						</ul>
					)}
				</div>
			</div>
		</>
	);
};
