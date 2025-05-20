import styles from './SearchBlock.module.css';
import PropTypes from 'prop-types';

export const SearchBlock = ({
	searchedTodoValue,
	onChangeSearchedValue,
	isSorted,
	toDefaultPosition,
	toSort,
}) => {
	return (
		<div className={styles.searchBlock}>
			<input
				className={styles.searchInput}
				type="text"
				name="searchBar"
				placeholder="Search for To-do task..."
				value={searchedTodoValue}
				onChange={onChangeSearchedValue}
			/>
			<button
				className={styles.sortButton}
				onClick={!isSorted ? () => toSort() : toDefaultPosition}
			>
				{!isSorted ? 'Sort' : 'Unsort'}
			</button>
		</div>
	);
};

SearchBlock.PropTypes = {
	searchedTodoValue: PropTypes.string,
	onChangeSearchedValue: PropTypes.func,
	isSorted: PropTypes.bool,
	toDefaultPosition: PropTypes.func,
	toSort: PropTypes.func,
};
