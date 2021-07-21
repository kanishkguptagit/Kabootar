import { useEffect, useContext, useState } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Chart from '../components/dashboard/Chart';
import Deposits from '../components/dashboard/Deposits';
import Orders from '../components/dashboard/Orders';
import Layout from '../components/Layout';
import AuthContext from '../store/auth-context';
import layoutStyles from '../styles/Layout';

function createData(id, schedule, recipient, subject) {
	return { id, schedule, recipient, subject };
}

const capitalize = s => {
	if (s) return s[0].toUpperCase() + s.slice(1);
};

function Dashboard() {
	const classes = layoutStyles();
	const ctx = useContext(AuthContext);

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	const [loadedData, setLoadedData] = useState({
		enable: true,
		items: [],
	});

	const [name, setName] = useState('Dashboard');

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch('https://kabootar-mail.herokuapp.com/mails/dashboard', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + ctx.token,
				},
			}).then(r => r.json());

			if (!data || !data.result || !Array.isArray(data.result)) {
				setLoadedData({ enable: false, items: [] });
				return;
			}

			const results = data.result.map(res =>
				createData(res._id, res.scheduled, res.recipents?.toString(), res.subject)
			);

			setLoadedData({ enable: true, items: results });
		};

		const fetchName = async () => {
			const url = 'https://kabootar-mail.herokuapp.com/users/' + ctx.userId;
			const response = await fetch(url);

			const data = await response.json();

			const capName =
				capitalize(data.result.firstName) + ' ' + capitalize(data.result.lastName);

			setName(capName);
		};

		fetchData();
		fetchName();
	}, [ctx.token, setLoadedData, ctx.userId, setName]);

	return (
		<Layout title={name}>
			<Grid item xs={12} md={8} lg={9}>
				<Paper className={fixedHeightPaper}>
					<Chart />
				</Paper>
			</Grid>
			<Grid item xs={12} md={4} lg={3}>
				<Paper className={fixedHeightPaper}>
					<Deposits />
				</Paper>
			</Grid>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Orders item={loadedData.items} />
				</Paper>
			</Grid>
		</Layout>
	);
}

export default Dashboard;
