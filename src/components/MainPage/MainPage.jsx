import styles from './MainPage.module.css';
import { NavLink } from 'react-router-dom';

export const MainPage = () => {
	return (
		<>
			<div className={styles.appPage}>
				<h1>
					<NavLink to="/app" className={styles.link}>
						To-do List Manager App
					</NavLink>
				</h1>
			</div>
		</>
	);
};
