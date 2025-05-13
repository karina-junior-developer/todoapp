import styles from './TodoListBlock.module.css';
import PropTypes from 'prop-types';

export const TodoListBlock = ({
	title,
	requestDeleteTodo,
	isDeletingTodo,
	startEditing,
	isEditingTodo,
}) => {
	return (
		<>
			<span className={styles.spanTitle}>{title}</span>
			<div className={styles.buttons}>
				<button
					className={styles.deleteButton}
					onClick={requestDeleteTodo}
					disabled={isDeletingTodo}
				>
					Delete
				</button>
				<button
					className={styles.editButton}
					onClick={startEditing}
					disabled={isEditingTodo}
				>
					Edit
				</button>
			</div>
		</>
	);
};

TodoListBlock.PropTypes = {
	title: PropTypes.string,
	requestDeleteTodo: PropTypes.func,
	isDeletingTodo: PropTypes.bool,
	startEditing: PropTypes.func,
	isEditingTodo: PropTypes.bool,
};
