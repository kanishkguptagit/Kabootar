import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

import Deposits from '../components/dashboard/Deposits';
import layoutStyles from '../styles/Layout';

export default function BlockDetail(props) {
	const classes = layoutStyles();

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const date = new Date();
	const showDate = date.toDateString().slice(4);

	return (
		<Grid item xs={12} md={4} lg={3}>
			<Paper className={fixedHeightPaper}>
				<Deposits items={props.items} date={showDate} />
			</Paper>
		</Grid>
	);
}
