import React from 'react';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
	depositContext: {
		flex: 1,
	},
});

export default function Deposits(props) {
	const history = useHistory();

	const routeTask = event => {
		event.preventDefault();
		history.push('/task');
	};

	const classes = useStyles();
	return (
		<React.Fragment>
			<Title>Total Mails</Title>
			<Typography component="p" variant="h3">
				{props.items}
			</Typography>
			<Typography color="textSecondary" className={classes.depositContext}>
				on {props.date}
			</Typography>
			<div>
				<Link color="primary" href="/task" onClick={routeTask}>
					View Task
				</Link>
			</div>
		</React.Fragment>
	);
}
