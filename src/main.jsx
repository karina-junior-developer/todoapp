import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import './index.css';
import { useState } from 'react';
import { TodoContext } from './contexts/TodoContext';
import { MainPage } from './components/MainPage/MainPage';
import { App } from './components/App/App';
import { Task } from './components/Task/Task';
import { NotFound } from './components/NotFound/NotFound';

const RootComponent = () => {
	const [todos, setTodos] = useState([]);
	const [refreshTodoItems, setRefreshTodoItems] = useState(false);

	return (
		<TodoContext.Provider
			value={{ todos, setTodos, refreshTodoItems, setRefreshTodoItems }}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/app" element={<App />}></Route>
					<Route path="/task/:id" element={<Task />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Routes>
			</BrowserRouter>
		</TodoContext.Provider>
	);
};

export default RootComponent;

const root = createRoot(document.getElementById('root'));

root.render(
	<StrictMode>
		<RootComponent />
	</StrictMode>,
);
