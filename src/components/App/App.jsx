import styles from './App.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
	const [todoItems, setTodoItems] = useState([]);
	const todosURL = 'https://jsonplaceholder.typicode.com/todos';

	useEffect(() => {
		fetch(todosURL)
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodoItems(loadedTodos);
			});
	}, [todosURL]);

	return (
		<div className={styles.mainBlock}>
			<h1>To-Do List </h1>
			<div className="inputAndButtonBlock">
				<input type="text" name="todo task" placeholder="Add your todo" />
				<button className={styles.addButton}>Add</button>
			</div>
			<div className={styles.todoListContainer}>
				<ul>
					{todoItems.map(({ title, id }) => {
						return <li key={id}> {title}</li>;
					})}
				</ul>
			</div>
		</div>
	);
};
