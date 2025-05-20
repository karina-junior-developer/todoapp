import styles from './MainInputBlock.module.css';
import PropTypes from 'prop-types';

export const MainInputBlock = ({
	error,
	todoValue,
	onChangeTodoTask,
	onKeyDownTodoTask,
	requestAddTodo,
	isAddingTodo,
}) => {
	return (
		<>
			<h1>To-Do List </h1>
			{error && <div className={styles.errorBlock}>{error}</div>}
			<div className={styles.inputAndButtonBlock}>
				<input
					className={styles.todoInput}
					type="text"
					name="todoTask"
					value={todoValue}
					onChange={onChangeTodoTask}
					placeholder="Add your To-do task"
					onKeyDown={onKeyDownTodoTask}
				/>
				<button
					className={styles.addButton}
					onClick={requestAddTodo}
					disabled={isAddingTodo}
				>
					Add
				</button>
			</div>
		</>
	);
};

MainInputBlock.PropTypes = {
	error: PropTypes.string,
	todoValue: PropTypes.string,
	onChangeTodoTask: PropTypes.func,
	onKeyDownTodoTask: PropTypes.func,
	requestAddTodo: PropTypes.func,
	isAddingTodo: PropTypes.bool,
};
