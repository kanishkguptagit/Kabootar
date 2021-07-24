import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

import Chart from '../components/dashboard/Chart';
import layoutStyles from '../styles/Layout';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';

export default function Graph(props) {
	const classes = layoutStyles();

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const graphData = [];

	props.items.map(item => {
		const newData = {
			date: item.date.toString().slice(4, 10),
			sent: item.sent,
		};		
		graphData.unshift(newData);
	});

	console.log(graphData);

	return (
		<Grid item xs={12} md={8} lg={9}>
			<Paper className={fixedHeightPaper}>
				{props.loading && (
					<div className="centered">
						<LoadingSpinner />
					</div>
				)}
				{!props.loading && <Chart data={graphData} />}
			</Paper>
		</Grid>
	);
}
