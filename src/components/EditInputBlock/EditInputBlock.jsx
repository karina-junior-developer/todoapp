import styles from './EditInputBlock.module.css';
import PropTypes from 'prop-types';

export const EditInputBlock = ({
	newError,
	editedTodoValue,
	onChangeEditingTodoTask,
	onKeyDownEditingTask,
	editAndSaveTodo,
	cancelEditing,
}) => {
	return (
		<div className={styles.editingBlock}>
			{newError && <div className={styles.newErrorBlock}>{newError}</div>}

			<div className={styles.inputAndButtonsEditingBlock}>
				<input
					className={styles.editingInput}
					type="text"
					name="editedTodoTask"
					value={editedTodoValue}
					onChange={onChangeEditingTodoTask}
					onKeyDown={onKeyDownEditingTask}
				/>
				<div className={styles.editingButtons}>
					<button onClick={editAndSaveTodo} className={styles.saveButton}>
						Save
					</button>
					<button onClick={cancelEditing} className={styles.cancelButton}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

EditInputBlock.PropTypes = {
	newError: PropTypes.string,
	editedTodoValue: PropTypes.string,
	onChangeEditingTodoTask: PropTypes.func,
	onKeyDownEditingTask: PropTypes.func,
	editAndSaveTodo: PropTypes.func,
	cancelEditing: PropTypes.func,
};
