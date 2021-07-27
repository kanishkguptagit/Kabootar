import React, { Fragment, useEffect, useState } from 'react';

import BarGraphPoint from './BarGraphPoint';
import classes from '../styles/analytics.module.css';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';

export default function Analytics(props) {
	const [analytic, setAnalytic] = useState({ sent: 0, opened: 0, clicked: 0 });
	const [barData, setBarData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const url = process.env.REACT_APP_BACKEND + '/mails/analytics/' + props.mailId;
			const data = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + props.ctx.token,
				},
			}).then(r => r.json());

			setAnalytic({ sent: data.sent, opened: data.opened, clicked: data.opened });

			setLoading(false);
		};

		fetchData();
	}, [props.ctx.token, props.mailId, analytic.sent, analytic.opened, analytic.clicked]);

	useEffect(() => {
		const bar = [
			{ name: 'Total Mails', mails: analytic.sent },
			{ name: 'Opened', mails: analytic.opened },
			{ name: 'Clicked', mails: analytic.clicked },
		];

		setBarData(bar);
	}, [analytic]);

	return (
		<>
			{!loading && (
				<Fragment>
					<div className={`${classes.heading} ${classes.center_content}`}>Analytics</div>
					<div className={`${classes.center_content} ${classes.bar_graph}`}>
						<BarGraphPoint data={barData} />
					</div>
					<div className={classes.center_content}>
						<ul className={classes.list_items}>
							<li>Total Recipients = {analytic.sent}</li>
							<li>Total Opened = {analytic.opened}</li>
							<li>Total Clicked = {analytic.clicked}</li>
						</ul>
					</div>
				</Fragment>
			)}

			{loading && <LoadingSpinner />}
		</>
	);
}
