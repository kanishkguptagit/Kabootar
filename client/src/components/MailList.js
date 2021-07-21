import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Orders from '../components/dashboard/Orders';
import layoutStyles from '../styles/Layout';

export default function MailList(props) {
	const classes = layoutStyles();

	return (
		<Grid item xs={12}>
			<Paper className={classes.paper}>
				<Orders item={props.items} />
			</Paper>
		</Grid>
	);
}
