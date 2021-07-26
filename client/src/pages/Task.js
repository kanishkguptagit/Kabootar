import Layout from '../components/Layout';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TaskChart from '../components/TaskChart';

const DUMMY_DATA = [
	{
		id: 't1',
		date: 'Mon Jul 26 2021 - 1:11:55 PM',
		task: 'Hello World!! Assignment to complete henceforth',
	},
	{
		id: 't2',
		date: 'Mon Jul 26 2021 - 1:11:55 PM',
		task: 'Classes to attend and not to miss hello world!!',
	},
];

const useStyles = makeStyles({
	containerBox: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		textAlign: 'center',
        margin: '3%'
	},
	text: {
		flexShrink: 1,
		marginRight: '1%',
        width: '100%'
	},
	add: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		float: 'right',
	},
    button: {
        height: '100%',
        width: '',
    }
});

function Task() {
	const classes = useStyles();

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
					/>
				</div>
				<div className={classes.add}>
					<Button variant="outlined" size="large" color="primary" className={classes.button}>
						Add
					</Button>
				</div>
			</div>
			<TaskChart item={DUMMY_DATA} />
		</Layout>
	);
}

export default Task;
