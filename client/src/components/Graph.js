import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

import Chart from '../components/dashboard/Chart';
import layoutStyles from '../styles/Layout';

function createData({ date, sent }) {
	return { date: date.slice(4, 10), sent };
}

export default function Graph(props) {
	const classes = layoutStyles();

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const graphData = props.items.map(createData);
	graphData.reverse();

	return (
		<Grid item xs={12} md={8} lg={9}>
			<Paper className={fixedHeightPaper}>
				{props.loading && <div className="centered">Analyzing...</div>}
				{!props.loading && <Chart data={graphData} />}
			</Paper>
		</Grid>
	);
}
