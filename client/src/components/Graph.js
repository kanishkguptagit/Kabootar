import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

import Chart from '../components/dashboard/Chart';
import layoutStyles from '../styles/Layout';

export default function Graph() {
	const classes = layoutStyles();

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<Grid item xs={12} md={8} lg={9}>
			<Paper className={fixedHeightPaper}>
				<Chart />
			</Paper>
		</Grid>
	);
}
