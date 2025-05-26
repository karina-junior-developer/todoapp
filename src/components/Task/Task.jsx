import styles from './Task.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import { useRequestDeleteTodo, useRequestEditTodo } from '../../hooks/index';
import { todosURL } from '../../constants/constants';

export const Task = () => {
	const { refreshTodoItems, setRefreshTodoItems, todos, setTodos } =
		useContext(TodoContext);

	const { requestDeleteTodo, isDeletingTodo } = useRequestDeleteTodo(
		setRefreshTodoItems,
		refreshTodoItems,
		todosURL,
	);

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
	} = useRequestEditTodo(todosURL, setRefreshTodoItems, refreshTodoItems, setTodos);

	const navigate = useNavigate();
	const [isDeleted, setIsDeleted] = useState(false);
	const [todoTaskFromServer, setTodoTaskFromServer] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { id } = useParams();
	const numericId = Number(id);

	//getting task from server
	useEffect(() => {
		if (!todos || todos.length === 0) {
			setIsLoading(true);
			fetch(`${todosURL}/${id}`)
				.then((response) => response.json())
				.then((data) => {
					if (!data || !data.id) {
						throw new Error('Task not found');
					}
					setTodoTaskFromServer(data);
				})
				.catch((error) => {
					console.error(error);
					setTodoTaskFromServer(null);
				})
				.finally(() => setIsLoading(false));
		}
	}, [id, todos]);

	const existingTask = todos.find((todoTask) => String(todoTask.id) === id);
	const task = existingTask || todoTaskFromServer;

	if (isLoading) {
		return <div className={styles.loading}>Loading...</div>;
	}

	if (!task) {
		return <div className={styles.taskNotFound}>Task not found</div>;
	}

	const handleDelete = async () => {
		await requestDeleteTodo(numericId);
		setIsDeleted(true);
	};

	const goToTasksListPage = () => {
		console.log('click!');
		navigate(-1);
	};

	return (
		<>
			{isEditingTodo && editedTodoId === numericId ? (
				<div className={styles.editingBlock}>
					{newError && <div className={styles.newErrorBlock}>{newError}</div>}

					<div className={styles.inputAndButtonsEditingBlock}>
						<input
							className={styles.editingInput}
							type="text"
							name="editedTodoTask"
							value={editedTodoValue}
							onChange={onChangeEditingTodoTask}
							onKeyDown={(event) => onKeyDownEditingTask(event, task.id)}
						/>
						<div className={styles.editingButtons}>
							<button
								onClick={() => editAndSaveTodo(task.id)}
								className={styles.saveButton}
							>
								Save
							</button>
							<button
								onClick={cancelEditing}
								className={styles.cancelButton}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className={styles.taskBlock}>
					{isDeleted ? (
						<div className={styles.successBlock}>
							<div className={styles.successButtonBlock}>
								<button
									className={styles.backButton}
									onClick={goToTasksListPage}
								>
									Back
								</button>
							</div>
							<div>
								<span className={styles.spanTitle}>
									Task successfully deleted!
								</span>
							</div>
						</div>
					) : (
						<div className={styles.firstBlock}>
							<div className={styles.backButtonBlock}>
								<button
									className={styles.backButton}
									onClick={goToTasksListPage}
								>
									Back
								</button>
							</div>

							<div className={styles.deleteAndEditBlock}>
								<span className={styles.spanTitle}>{task.title}</span>
								<div className={styles.buttons}>
									<button
										className={styles.deleteButton}
										onClick={handleDelete}
										disabled={isDeletingTodo}
									>
										Delete
									</button>
									<button
										className={styles.editButton}
										onClick={() => startEditing(task.id, task.title)}
										disabled={isEditingTodo}
									>
										Edit
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};
