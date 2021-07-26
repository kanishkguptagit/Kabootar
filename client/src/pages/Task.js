import { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

import TaskChart from '../components/TaskChart';
import Layout from '../components/Layout';
import useStyles from '../styles/Task';

function Task() {
	const classes = useStyles();

	const [todo, setTodo] = useState('');
	const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) ?? []);

	const todoHandler = event => {
		setTodo(event.target.value);
	};

	const onSubmitHandler = () => {
		const newDate = new Date();
		const month = newDate.toDateString();
		const time = newDate.toLocaleTimeString();

		const newTodo = {
			id: month + ' - ' + time,
			task: todo,
		};

		setTasks(prevTasks =>
			prevTasks && Array.isArray(prevTasks) ? [newTodo, ...prevTasks] : [newTodo]
		);

		setTodo('');
	};

	const onDeleteHandler = id => {
		setTasks(prevTasks => {
			return prevTasks?.filter(item => item.id !== id);
		});
	};

	const onEditHandler = id => {
		setTodo(tasks.find(item => item.id === id).task);
		onDeleteHandler(id);
	};

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	return (
		<Layout title={'Task'}>
			<div className={classes.containerBox}>
				<div className={classes.text}>
					<TextField
						id="outlined-multiline-static"
						label="Task"
						multiline
						placeholder="Add tasks here"
						fullWidth
						variant="outlined"
						onChange={todoHandler}
						value={todo}
					/>
				</div>
				<div className={classes.add}>
					<Button
						variant="outlined"
						size="large"
						color="primary"
						className={classes.button}
						disabled={todo.length <= 0}
						onClick={onSubmitHandler}>
						Add
					</Button>
				</div>
			</div>
			<TaskChart item={tasks} deleteHandler={onDeleteHandler} editHandler={onEditHandler} />
		</Layout>
	);
}

export default Task;
