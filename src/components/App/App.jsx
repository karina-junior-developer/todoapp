import {
	useRequestAddTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestEditTodo,
	useSortTodos,
	useSearchTodos,
} from '../../hooks/index';
import { todosURL } from '../../constants/constants';
import styles from './App.module.css';
import { useState } from 'react';
import { SearchBlock } from '../SearchBlock/SearchBlock';
import { MainInputBlock } from '../MainInputBlock/MainInputBlock';
import { LoadingBlock } from '../LoadingBlock/LoadingBlock';
import { EditInputBlock } from '../EditInputBlock/EditInputBlock';
import { TodoListBlock } from '../TodoListBlock/TodoListBlock';

export const App = () => {
	const [todos, setTodos] = useState([]); // for todos []
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

	// Delete todo task from the list - DONE
	const { requestDeleteTodo, isDeletingTodo } = useRequestDeleteTodo(
		setRefreshTodoItems,
		refreshTodoItems,
		todosURL,
	);

	// Edit todo task - DONE
	const {
		editedTodoValue,
		isEditingTodo,
		editedTodoId,
		newError,
		startEditing,
		cancelEditing,
		editAndSaveTodo,
		onChangeEditingTodoTask,
		onKeyDownEditingTask,
	} = useRequestEditTodo(todosURL, setRefreshTodoItems, refreshTodoItems);

	// Search - DONE
	const { onChangeSearchedValue, foundValues, searchedTodoValue } =
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
									return (
										<li key={id}>
											{isEditingTodo && editedTodoId === id ? (
												<EditInputBlock
													newError={newError}
													editedTodoValue={editedTodoValue}
													onChangeEditingTodoTask={
														onChangeEditingTodoTask
													}
													onKeyDownEditingTask={(event) =>
														onKeyDownEditingTask(event, id)
													}
													editAndSaveTodo={() =>
														editAndSaveTodo(id)
													}
													cancelEditing={cancelEditing}
												/>
											) : (
												<TodoListBlock
													title={title}
													requestDeleteTodo={() =>
														requestDeleteTodo(id)
													}
													isDeletingTodo={isDeletingTodo}
													startEditing={() =>
														startEditing(id, title)
													}
													isEditingTodo={isEditingTodo}
												/>
											)}
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
